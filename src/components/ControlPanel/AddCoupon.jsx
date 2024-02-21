import React, { Fragment, useState } from "react";
import { CommonButton, CommonInputText, CommonSelect } from "../common/ui";

import { Status } from "../../constants/Data/constantsData";
import { ErrorMessage, Field, Formik, Form } from "formik";
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
import addCouponValidationSchema from "../../validations/control_validations/AddCouponValidation";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  width: "450px",
  bgcolor: "background.paper",
  border: "2px solid #F7FDFF",
  borderRadius: "10px",
  boxShadow: `3px 2px 3px 1px rgba(0, 0, 0, 0.2)`,
  p: 4,
};
const AddCoupon = ({ data, refetch, open, onClose }) => {
  const [status, setStatus] = useState(data ? data?.isActive : true);

  // Create Mutation ....
  const { mutate: createmutate, isLoading: createLoading } = useCreate({
    endpoint: API.StorageConditionCreate, // Replace with your actual API endpoint
    onSuccess: (data) => {
      toast.success("Add Coupon Successfully !");
      refetch();
      onClose();
    },
    onError: (error) => {
      // Handle update error, e.g., display an error message
      console.error("Update failed", error);
      toast.error("Something went wrong !");
    },
  });

  // Update Mutation ....
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

  // Handle Submit Function .....
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      let payload = { ...values, status };
      console.log("Payload", payload);
      if (data?._id) {
        await updateMutate(payload);
      } else {
        await createmutate(payload);
      }
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
                initialValues={{
                  couponCode: data ? data?.couponCode : "",
                  discountPrice: data ? data?.discountPrice : "",
                  maxPrice: data ? data?.maxPrice : "",
                }}
                validationSchema={addCouponValidationSchema}
                onSubmit={handleSubmit}
              >
                {({
                  values,
                  handleChange,
                  errors,
                  touched,
                  isSubmitting,
                  resetForm,
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
                        {data ? "Update " : "Add "} Coupon Settings
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
                      <Chip label="Settings" />
                    </Divider>

                    <div className="mt-4 pb-3">
                      <div>
                        <Field
                          name="couponCode"
                          id="couponCode"
                          label="Coupon Code"
                          placeholder="Type here"
                          component={CommonInputText}
                          onChange={handleChange}
                          value={values.couponCode}
                          error={touched.couponCode && errors.couponCode}
                          className={`appearance-none  block
                            ${
                              touched.couponCode && errors.couponCode
                                ? "border-red-500"
                                : ""
                            }`}
                        />
                        <ErrorMessage
                          name="couponCode"
                          component="div"
                          className="mt-2 text-sm text-red-600"
                        />
                      </div>
                      <div>
                        <Field
                          name="discountPrice"
                          id="discountPrice"
                          label="Discount Price"
                          placeholder="Type here"
                          type="number"
                          component={CommonInputText}
                          onChange={handleChange}
                          value={values.discountPrice}
                          error={touched.discountPrice && errors.discountPrice}
                          className={`appearance-none  block
                            ${
                              touched.discountPrice && errors.discountPrice
                                ? "border-red-500"
                                : ""
                            }`}
                        />
                        <ErrorMessage
                          name="discountPrice"
                          component="div"
                          className="mt-2 text-sm text-red-600"
                        />
                      </div>
                      <div>
                        <Field
                          name="maxPrice"
                          id="maxPrice"
                          label="Max Price"
                          placeholder="Type here"
                          type="number"
                          component={CommonInputText}
                          onChange={handleChange}
                          value={values.maxPrice}
                          error={touched.maxPrice && errors.maxPrice}
                          className={`appearance-none  block
                            ${
                              touched.maxPrice && errors.maxPrice
                                ? "border-red-500"
                                : ""
                            }`}
                        />
                        <ErrorMessage
                          name="maxPrice"
                          component="div"
                          className="mt-2 text-sm text-red-600"
                        />
                      </div>

                      <div>
                        <Field
                          id="status-label-id"
                          name="status"
                          label="Status"
                          labelId="status-label-id"
                          setSelect={setStatus}
                          options={Status}
                          component={CommonSelect}
                          value={status}
                          width={387}
                        />
                      </div>
                    </div>

                    <div className="flex  justify-center space-x-5 mt-5">
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
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                          {createLoading || updateLoading ? (
                            <Progress />
                          ) : (
                            <BiLockAlt
                              className="h-5 w-5 text-gray-600 group-hover:text-gray-800"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                        {data?._id ? "Update Changes" : "Save Changes"}
                      </button>
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

export default AddCoupon;
