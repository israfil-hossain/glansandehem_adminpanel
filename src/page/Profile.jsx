//External Import
import { Box, Breadcrumbs } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { toast } from "react-toastify";

import { BiEdit, BiLockAlt } from "react-icons/bi";
import { FaEye, FaEyeSlash, FaUserAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

// Internal Import
import PackageBreadcrumb from "../components/common/PackageBreadcrumb";

import AddUser from "../components/Users/AddUser";
import CommonButton from "../components/common/ui/CommonButton";
import { useAuthUserContext } from "../context/AuthUserProvider";

// Validation Import
import { passwordValidation } from "../validations";
import { API } from "../api/endpoints";
import { Progress } from "../components/common/Progress";
import useCreate from "../hooks/useCreate";

const Profile = () => {
  const { userData } = useAuthUserContext();

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);

 

  const updateMutation = useCreate({
    endpoint: API.ChangePassword, // Replace with your actual API endpoint
    onSuccess: (data) => {
      toast.success("Password Changed Successfully !");
    },
    onError: (error) => {
      // Handle update error, e.g., display an error message
   
      toast.error("Something went wrong !");
    },
  });
  const { isLoading, error, } = updateMutation;

  const togglePasswordVisibility = (field) => {
    switch (field) {
      case "OldPassword":
        setShowOldPassword(!showOldPassword);
        break;
      case "newPassword":
        setShowNewPassword(!showNewPassword);
        break;
      case "retypePassword":
        setShowRetypePassword(!showRetypePassword);
        break;
      default:
        break;
    }
  };

  return (
    <Fragment>
      <div>
        <PackageBreadcrumb>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="grey" href="/">
              <Box sx={{ justifyContent: "center", display: "flex" }}>
                <FaUserAlt size={23} className="min-w-max text-[#020a38]" />
                &nbsp; Profile
              </Box>
            </Link>
          </Breadcrumbs>
        </PackageBreadcrumb>

        <div className="mt-10">
          <div className="lg:flex  justify-around  lg:space-x-4 lg:space-y-0 space-y-5 rounded-md px-4 py-4 w-full ">
            <ProfileSection userData={userData} handleOpen={handleOpen} />

            <div className="lg:w-1/2  rounded-xl px-4 w-full  py-4 bg-white">
              <div>
                <Formik
                  initialValues={{
                    oldPassword: "",
                    newPassword: "",
                    retypePassword: "",
                  }}
                  validationSchema={passwordValidation}
                  onSubmit={async (values, { setSubmitting, resetForm }) => {
                    try {
                      await updateMutation.mutate(values);
                
                      // Only resetForm and setSubmitting if the mutation was successful
                      if (updateMutation.isSuccess) {
                        resetForm();
                        setSubmitting(false);
                      
                      }
                    } catch (error) {
                      // Handle any errors during the mutation
                      console.error('Error during mutation:', error);
                    }
                
                  }}
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
                        <p>Changes Password</p>
                      </Box>

                      <div className="mt-5 px-5">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Old Password
                        </label>
                        <div className="mt-1">
                          <div className="relative">
                            <Field
                              // type={showPassword ? "text" : "password"}
                              name="oldPassword"
                              id="olePassword"
                              type={showOldPassword ? "text" : "password"}
                              placeholder="Enter Old Password"
                              autoComplete="current-password"
                              value={values.oldPassword}
                              onChange={handleChange}
                              error={touched.oldPassword && errors.oldPassword}
                              className={`appearance-none block w-full px-3 py-2 border border-gray-300 
                            rounded-xl shadow-sm placeholder-gray-400 
                            focus:ring-yellow-500 focus:border-yellow-500 focus:ring-1 sm:text-sm ${
                              touched.oldPassword && errors.oldPassword
                                ? "border-red-500"
                                : ""
                            }`}
                            />
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 flex items-center px-2"
                              onClick={() =>
                                togglePasswordVisibility("OldPassword")
                              }
                            >
                              {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                          </div>
                          <ErrorMessage
                            name="OldPassword"
                            component="p"
                            className="mt-2 text-sm text-red-600"
                          />
                        </div>
                      </div>

                      <div className="mt-5 px-5">
                        <label
                          htmlFor="newPassword"
                          className="block text-sm font-medium text-gray-700"
                        >
                          New Password
                        </label>
                        <div className="mt-1">
                          <div className="relative">
                            <Field
                              // type={showPassword ? "text" : "password"}
                              name="newPassword"
                              id="newPassword"
                              type={showNewPassword ? "text" : "password"}
                              placeholder="Enter New Password"
                              autoComplete="current-password"
                              value={values.newPassword}
                              onChange={handleChange}
                              error={touched.newPassword && errors.newPassword}
                              className={`appearance-none block w-full px-3 py-2 border border-gray-300 
                            rounded-xl shadow-sm placeholder-gray-400 
                            focus:ring-yellow-500 focus:border-yellow-500 focus:ring-1 sm:text-sm ${
                              touched.newPassword && errors.newPassword
                                ? "border-red-500"
                                : ""
                            }`}
                            />
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 flex items-center px-2"
                              onClick={() =>
                                togglePasswordVisibility("newPassword")
                              }
                            >
                              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                          </div>
                          <ErrorMessage
                            name="newPassword"
                            component="p"
                            className="mt-2 text-sm text-red-600"
                          />
                        </div>
                      </div>

                      <div className="mt-5 px-5">
                        <label
                          htmlFor="retypePassword"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Retype New Password
                        </label>
                        <div className="mt-1">
                          <div className="relative">
                            <Field
                              name="retypePassword"
                              id="retypePassword"
                              placeholder="Retype New Password"
                              type={showRetypePassword ? "text" : "password"}
                              autoComplete="current-password"
                              value={values.retypePassword}
                              onChange={handleChange}
                              error={
                                touched.retypePassword && errors.retypePassword
                              }
                              className={`appearance-none block w-full px-3 py-2 border border-gray-300 
                            rounded-xl shadow-sm placeholder-gray-400 
                            focus:ring-yellow-500 focus:border-yellow-500 focus:ring-1 sm:text-sm ${
                              touched.retypePassword && errors.retypePassword
                                ? "border-red-500"
                                : ""
                            }`}
                            />
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 flex items-center px-2"
                              onClick={() =>
                                togglePasswordVisibility("retypePassword")
                              }
                            >
                              {showRetypePassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                          </div>
                          <ErrorMessage
                            name="retypePassword"
                            component="p"
                            className="mt-2 text-sm text-red-600"
                          />
                        </div>
                      </div>

                      <div className="my-8 flex justify-around item-center w-full ">
                        <CommonButton
                          text="reset"
                          type="reset"
                          className="border border-primary hover:bg-gray-100 w-40 flex justify-center items-center"
                          onClick={() => resetForm()}
                        />

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="group relative w-80 flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-[#cacc57] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            {isLoading ? (
                              <Progress />
                            ) : (
                              <BiLockAlt
                                className="h-5 w-5 text-gray-600 group-hover:text-gray-800"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                          Save Changes
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>

          <AddUser
            data={userData}
            open={open}
            onClose={handleClose}
            // fetchData={fetchData}
          />
        </div>
      </div>
    </Fragment>
  );
};

const ProfileSection = ({ handleOpen, userData }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    uploadImage(file);
  };
  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      // Replace 'PUT_API_ENDPOINT' with the actual API endpoint URL for image upload
      await UserService.UploadImage(userData?._id, formData);
      toast.success("Profile Image Upload Successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  return (
    <div className="lg:w-1/2 rounded-xl px-6 py-4 bg-white">
      <div className="w-full">
        <MdEdit
          className="cursor-pointer w-10 h-10 rounded-full bg-primary hover:bg-[#bbbd53] px-2 py-2 text-white mr-2 float-right"
          onClick={handleOpen}
        />
      </div>
      <div className="text-xl text-gray-800 font-semibold font-sans p-4 mb-5">
        Personal Information
      </div>
      <div className="lg:flex space-x-4">
        <div className=" px-4   w-full ">
          <div className="py-3 mb-5 flex items-center border bg-gray-200 rounded-lg space-x-3 px-3 font-semibold  text-gray-700 font-sans text-lg">
            <p>Name :</p>
            <span className="  ">{userData?.fullName}</span>
          </div>

          <div className="py-3 mb-5 flex items-center border bg-gray-200 rounded-lg space-x-3 px-3 font-semibold  font-sans text-lg">
            <p className="w-14">Email :</p>
            <span className="lg:text-lg ">{userData?.email}</span>
          </div>

          <div className="py-3 flex border bg-gray-200 rounded-lg space-x-3 px-3 font-semibold  font-sans text-lg">
            <p>Address :</p>
            <span className="">{userData?.address}</span>
          </div>
        </div>

        <div className="py-4 flex justify-center items-center relative">
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="profileImage"
              className="w-48 h-48 rounded-full border border-emerald-500"
            />
          ) : (
            <div className="w-48 h-48 rounded-full border border-emerald-500 bg-gray-200 flex justify-center items-center">
              <img
                src={
                  userData?.profilePicture
                    ? userData?.profilePicture
                    : "https://res.cloudinary.com/dpc1nydxn/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1685778058/Flowentech/about2_ap8hdw.jpg"
                }
                alt="profileImage"
                className="w-48 h-48 rounded-full border border-emerald-500"
              />
            </div>
          )}
          <div className="flex space-x-2 text-sm mt-0">
            <label htmlFor="imageUpload">
              <BiEdit className="text-[#2c858d] w-8 h-8 -ml-4 cursor-pointer" />
            </label>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
