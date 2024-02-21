import React, { Fragment, useState } from "react";
import { CommonButton, CommonInputText, CommonSelect } from "../common/ui";
import { isLargeScreen } from "../../utils/CommonFunction";
import { Status } from "../../constants/Data/constantsData";
import { ErrorMessage, Field, Formik, Form, FieldArray } from "formik";
import { toast } from "react-toastify";

import { Progress } from "../common/Progress";
import { BiLockAlt } from "react-icons/bi";
import { useCreate, useUpdate } from "../../hooks";
import { API } from "../../api/endpoints";
import {
  Backdrop,
  Box,
  Chip,
  Divider,
  Fade,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { AiOutlineCloseCircle } from "react-icons/ai";
import scheduleValidationSchema from "../../validations/schedule_validations/ScheduleValidation";

const AddSchedule = ({ data, refetch, open, onClose }) => {
  const isLarge = isLargeScreen();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: {},
    bgcolor: "background.paper",
    border: "2px solid #F7FDFF",
    borderRadius: "10px",
    boxShadow: `3px 2px 3px 1px rgba(0, 0, 0, 0.2)`,
    maxHeight: '95vh', // Set your desired maximum height
    overflowY: 'auto', 
    p: 4,
  };
  const initialValues = {
    schedule: [
      { day: "Saturday", startTime: "", endTime: "", isActive: false },
      { day: "Sunday", startTime: "", endTime: "", isActive: false },
      { day: "Monday", startTime: "", endTime: "", isActive: false },
      { day: "Tuesday", startTime: "", endTime: "", isActive: false },
      { day: "Wednesday", startTime: "", endTime: "", isActive: false },
      { day: "Thursday", startTime: "", endTime: "", isActive: false },
      { day: "Friday", startTime: "", endTime: "", isActive: false },
    ],
  };

  const { mutate: createmutate, isLoading: createLoading } = useCreate({
    endpoint: API.StorageConditionCreate, // Replace with your actual API endpoint
    onSuccess: (data) => {
      toast.success("Add Condition Successfully !");
      refetch();
      onClose();
    },
    onError: (error) => {
      // Handle update error, e.g., display an error message
      console.error("Update failed", error);
      toast.error("Something went wrong !");
    },
  });
  const { mutate: updateMutate, isLoading: updateLoading } = useUpdate({
    endpoint: API.StorageConditionCreate, // Replace with your actual API endpoint
    onSuccess: (data) => {
      toast.success("Add Condition Successfully !");
      refetch();
      onClose();
    },
    onError: (error) => {
      // Handle update error, e.g., display an error message
      console.error("Update failed", error);
      toast.error("Something went wrong !");
    },
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      let payload = { ...values };
      console.log("Payload", values);
      
        // await createmutate(payload);
   
      setSubmitting(false);
      resetForm();
    } catch (e) {
      setSubmitting(true);
      console.log("Error during Create ", e);
    }
  };

  return (
    <Fragment>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={false}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div>
              <Formik
                initialValues={initialValues}
                // validationSchema={scheduleValidationSchema}
                onSubmit={handleSubmit}
            
              >
                {({
                  values,
                  handleChange,
                  errors,
                  touched,
                  isSubmitting,
                  resetForm,
                  handleBlur,
                }) => (
                  <Form>
                    {/* <>{JSON.stringify(values)}</> */}
                    <Box
                      sx={{
                        pb: 0,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="h5" component="h5">
                        {data ? "Update " : "Add "} Schedule
                      </Typography>
                      <div style={{}}>
                        <IconButton
                          aria-label="edit"
                          onClick={() => {
                            onClose();
                            resetForm();
                          }}
                        >
                          <AiOutlineCloseCircle
                            sx={{
                              color: "#ff4a68",
                              height: "22px",
                              width: "22px",
                            }}
                            className="text-red-400 hover:text-600"
                          />
                        </IconButton>
                      </div>
                    </Box>
                    <Divider sx={{ mb: 2 }}>
                      <Chip label="Schedule" />
                    </Divider>

                    <div className="mt-4 pb-3">
                      <FieldArray
                        name="schedule"
                        render={({ push, remove }) => (
                          <div>
                            {values.schedule.map((day, index) => (
                              <div
                                key={index}
                                className="border border-primary rounded-xl p-2 mb-3 py-4 flex flex-row justify-between items-center"
                              >
                                <div className="pr-10">
                                  <label className="flex items-center ">
                                    <Field
                                      type="checkbox"
                                      name={`schedule.${index}.isActive`}
                                      className="w-4 h-4 mx-3 "
                                    />
                                    <span className="">{day?.day}</span>
                                  </label>
                                </div>
                                <div>
                                  {day.isActive && (
                                    <div className="flex flex-row justify-between space-x-4">
                                      <div clasName="flex flex-col ">
                                        <div className="text-sm text-gray-700 mb-2">
                                          <label
                                            htmlFor={`schedule.${index}.startTime`}
                                          >
                                            Start Time
                                          </label>
                                        </div>
                                        <Field
                                          type="time"
                                          name={`schedule.${index}.startTime`}
                                          className="border rounded-lg px-2 py-2"
                                        />
                                        <ErrorMessage
                                          name={`schedule.${index}.startTime`}
                                        />
                                      </div>

                                      <div className="flex flex-col">
                                        <div className="text-sm text-gray-700 mb-2">
                                          <label
                                            htmlFor={`schedule.${index}.endTime`}
                                          >
                                            End Time
                                          </label>
                                        </div>
                                        <Field
                                          type="time"
                                          name={`schedule.${index}.endTime`}
                                          className="border rounded-lg px-2 py-2"
                                        />
                                        <ErrorMessage
                                          name={`schedule.${index}.endTime`}
                                        />
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}

                            <div className="flex justify-center space-x-5 mt-5">
                              <CommonButton
                                text="reset"
                                type="reset"
                                className="border border-primary hover:bg-gray-100 w-24 flex justify-center items-center"
                                onClick={() => resetForm()}
                              />

                              <button
                                type="submit"
                                disabled={isSubmitting}
                                className="group relative w-40 flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-[#cacc57] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                              >
                                {/* <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                  {isSubmitting ? (
                                    <Progress />
                                  ) : (
                                    <BiLockAlt
                                      className="h-5 w-5 text-gray-600 group-hover:text-gray-800"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span> */}
                                {data?._id ? "Update Changes" : "Save Changes"}
                              </button>
                            </div>
                          </div>
                        )}
                      />
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </Box>
        </Fade>
      </Modal>
    </Fragment>
  );
};

export default AddSchedule;
