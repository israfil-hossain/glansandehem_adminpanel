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
import { Field, Form, Formik } from "formik";
import React, { Fragment, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiLockAlt } from "react-icons/bi";
import { toast } from "react-toastify";
import signupValidationSchema from "../../utils/validation/signupValidation";
import { Progress } from "../common/Progress";
import { useCreate, useUpdate } from "../../hooks";
import { API } from "../../api/endpoints";
import usePatch from "../../hooks/usePatch";

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
const AddUser = ({ open, onClose, data, refetch }) => {
  const handleResetAndClose = (resetForm) => {
    onClose();
    resetForm();
  };

  // Update Mutation ....
  const { mutateAsync: updateMutate, isLoading: updateLoading } = usePatch({
    endpoint: API.UpdateProfile, // Replace with your actual API endpoint
    onSuccess: (data) => {
      toast.success("Profile Information Update Successfully !");
      refetch();
      onClose();
    },
    onError: (error) => {
      // Handle update error, e.g., display an error message
   
      toast.error("Something went wrong !");
    },
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await updateMutate(values);
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
                  fullName: data ? data?.fullName : "",
                  email: data ? data?.email : "",
                  phoneNumber: data ? data?.phoneNumber : "",
                  address: data ? data?.address : "",
                }}
                validationSchema={signupValidationSchema}
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
                        {data ? "Update " : "Add "}User Information
                      </Typography>
                      <div style={{}}>
                        <IconButton
                          aria-label="edit"
                          onClick={() => handleResetAndClose(resetForm)}
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
                      <Chip label="Information" />
                    </Divider>
                    <div className="">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        User Name
                      </label>
                      <div className="mt-1 ">
                        <Field
                          type="text"
                          name="fullName"
                          id="fullName"
                          autoComplete="fullName"
                          value={values.fullName}
                          placeholder="Enter your Name"
                          onChange={handleChange}
                          error={touched.fullName && errors.fullName}
                          className={`appearance-none block w-full px-3 py-2 border border-gray-300 
                                    rounded-md shadow-sm placeholder-gray-400 
                                    focus:ring-green-500 focus:border-green-500 focus:ring-1 sm:text-sm ${
                                      touched.fullName && errors.fullName
                                        ? "border-red-500"
                                        : ""
                                    }`}
                        />
                        {touched.fullName && errors.fullName && (
                          <p className="mt-2 text-sm text-red-600 ">
                            {errors.fullName}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mt-3">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <div className="mt-1">
                        <Field
                          type="email"
                          name="email"
                          id="email"
                          autoComplete="email"
                          value={values.email}
                          placeholder="Enter your Email Address"
                          onChange={handleChange}
                          error={touched.email && errors.email}
                          className={`appearance-none block w-full px-3 py-2 border border-gray-300 
                                    rounded-md shadow-sm placeholder-gray-400 
                                    focus:ring-green-500 focus:border-green-500 focus:ring-1 sm:text-sm ${
                                      touched.email && errors.email
                                        ? "border-red-500"
                                        : ""
                                    }`}
                        />
                        {touched.email && errors.email && (
                          <p className="mt-2 text-sm text-red-600 ">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mt-3">
                      <label
                        htmlFor="mobile"
                        className="block text-sm font-medium text-gray-700"
                      >
                        PhoneNumber
                      </label>
                      <div className="mt-1">
                        <Field
                          type="mobile"
                          name="phoneNumber"
                          id="phoneNumber"
                          autoComplete="phoneNumber"
                          value={values.phoneNumber}
                          placeholder="Enter your Phone Number Number"
                          onChange={handleChange}
                          error={touched.phoneNumber && errors.phoneNumber}
                          className={`appearance-none block w-full px-3 py-2 border border-gray-300 
                                    rounded-md shadow-sm placeholder-gray-400 
                                    focus:ring-green-500 focus:border-green-500 focus:ring-1 sm:text-sm ${
                                      touched.phoneNumber && errors.phoneNumber
                                        ? "border-red-500"
                                        : ""
                                    }`}
                        />
                        {touched.phoneNumber && errors.phoneNumber && (
                          <p className="mt-2 text-sm text-red-600 ">
                            {errors.phoneNumber}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-3">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Address
                      </label>
                      <div className="mt-1">
                        <Field
                          type="text"
                          name="address"
                          id="address"
                          autoComplete="address"
                          value={values.address}
                          placeholder="Enter your Address"
                          onChange={handleChange}
                          error={touched.address && errors.address}
                          className={`appearance-none block w-full px-3 py-2 border border-gray-300 
                                    rounded-md shadow-sm placeholder-gray-400 
                                    focus:ring-green-500 focus:border-green-500 focus:ring-1 sm:text-sm ${
                                      touched.address && errors.address
                                        ? "border-red-500"
                                        : ""
                                    }`}
                        />
                        {touched.address && errors.address && (
                          <p className="mt-2 text-sm text-red-600 ">
                            {errors.address}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                      >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                          {updateLoading ? (
                            <Progress />
                          ) : (
                            <BiLockAlt
                              className="h-5 w-5 text-gray-600 group-hover:text-yellow-400"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                        Update Information
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

export default AddUser;
