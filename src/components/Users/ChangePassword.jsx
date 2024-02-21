import React, {Fragment, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
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
import { toast } from "react-toastify";
import { Progress } from "../common/Progress";
import signupValidationSchema from "../../utils/validation/signupValidation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BiLockAlt } from "react-icons/bi";
import UserService from "../../service/UserService";
import passwordValidationSchema from "../../utils/validation/passwordValidation";

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
const ChangePassword = ({ open, onClose, data, fetchData }) => {
  const handleResetAndClose = (resetForm) => {
    onClose();
    fetchData();
    resetForm();
  };
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };



  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      //api call
      setIsLoading(true);
      const response = await UserService.addUser(values);
      if (response.status === 200) {
        const responseData = response.data;
        if (responseData.error) {
          toast.error(responseData.error.message);
          const errorData = responseData.error;
          if (errorData.errors) {
            const errors = Object.keys(errorData.errors).reduce((acc, key) => {
              acc[key] = errorData.errors[key].msg;
              return acc;
            }, {});
            console.log(errors);
            setErrors(errors);
          }
        } else {
          toast.success("Successfully Add User ");
          onClose();
          fetchData();
          setIsLoading(false)
        }
        setSubmitting(false);
      }
    } catch (err) {
      if (err.response) {
        const errorData = err.response.data;
        toast.error(errorData.message);
        if (errorData.errors) {
          const errors = Object.keys(errorData.errors).reduce((acc, key) => {
            acc[key] = errorData.errors[key].msg;
            return acc;
          }, {});
          console.log(errors);
          setErrors(errors);
        } else {
          toast.error("Something went wrong");
        }
      } else {
        toast.error("Something went wrong");
      }
    }
  };
  
  const handleUpdate = async (values, { setSubmitting, setErrors }) => {
    try {
      //api call
      const response = await UserService.updateUser(data._id, values);
      if (response.status === 200) {
        toast.success("Successfully Update Password ");
        setSubmitting(false);
        onClose();
        fetchData();
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
      setErrors(err);
      setSubmitting(false);
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
                password:"",
              }}
              validationSchema={passwordValidationSchema}
              onSubmit={data ? handleUpdate : handleSubmit}
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
                      Changes Password
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
                    <Chip label="Password" />
                  </Divider>
                  
                    <div className="mt-3">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <div className="mt-1">
                        <div className="relative">
                          <Field
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            placeholder="Enter your Password"
                            autoComplete="current-password"
                            value={values.password}
                            onChange={handleChange}
                            error={touched.password && errors.password}
                            className={`appearance-none block w-full px-3 py-2 border border-gray-300 
                      rounded-md shadow-sm placeholder-gray-400 
                      focus:ring-yellow-500 focus:border-yellow-500 focus:ring-1 sm:text-sm ${
                        touched.password && errors.password
                          ? "border-red-500"
                          : ""
                      }`}
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center px-2"
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                        <ErrorMessage
                          name="password"
                          component="p"
                          className="mt-2 text-sm text-red-600"
                        />
                      </div>
                    </div>
               

                  <div className="mt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    >
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        {isLoading ? (
                          <Progress />
                        ) : (
                          <BiLockAlt
                            className="h-5 w-5 text-gray-600 group-hover:text-yellow-400"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                      Change Password
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

export default ChangePassword;
