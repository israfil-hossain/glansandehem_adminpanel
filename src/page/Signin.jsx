import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { Fragment, useState } from "react";
import { BiLockAlt } from "react-icons/bi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import adminAPI from "../api/adminAPI";
import { Progress } from "../components/common/Progress";
import { setAccessToken, setRefreshToken } from "../utils/localStorageUtils";
import signinValidationSchema from "../utils/validation/signinValidation";
import { API } from "../api/endpoints";
import { logo } from "../assets";

const Signin = () => {
  let navigate = useNavigate();
  const queryClient = useQueryClient();
  const { state } = useLocation();

  const initialValues = {
    username: "",
    password: "",
  };
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const { mutateAsync: signInMutationAsync, isLoading: isSigninLoading } =
    useMutation((payload) => adminAPI.post(API.AdminSignIn, payload));

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    const payload = {
      email: values.username,
      password: values.password,
    };

    signInMutationAsync(payload)
      .then((response) => {
        if (response.data.data) {
     
          setAccessToken(response.data.data?.accessToken);
          setRefreshToken(response.data.data?.refreshToken);
          toast.success("Successfully login");
          queryClient.resetQueries();
          if (state?.authSuccessRedirect) {
            navigate(state?.authSuccessRedirect, {
              replace: true,
            });
          } else {
            navigate("/");
          }
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "Something went Wrong!");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Fragment>
      <div className="lg:h-[100vh] md:h-[80vh] lg:bg-indigo-50 flex flex-col justify-center items-center ">
        <div className="  flex-row hidden lg:flex">
        <div
          className="
        bg-gradient-to-r from-primary via-secondary-500 to-indigo-600 hover:from-indigo-600
        hover:via-secondary-400 hover:to-primary 
        
        py-8 lg:min-h-[350px]  lg:w-[400px] px-4  sm:rounded-l-lg sm:px-10 shadow-md hover:shadow-lg"
        >
          <div className="flex flex-col items-center  h-full text-center  justify-center ">
            <img
              alt="logo"
              src={logo}
              width="250px"
              height="200px "
              className="items-center mt-5"
            />
            <p className="text-white leading-12 mt-5 text-3xl items-center text-center">
              Welcome to GlansandeHem
            </p>
          </div>
        </div>
          <div className="bg-white py-8 lg:min-h-[350px]  lg:w-[400px] px-4 shadow-md sm:rounded-r-lg sm:px-10 hover:shadow-lg">
            <div className="mb-6 sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="text-center text-3xl font-extrabold text-gray-900">
                Sign In
              </h2>
            </div>
            <div>
              <Formik
                initialValues={initialValues}
                validationSchema={signinValidationSchema}
                onSubmit={handleSubmit}
              >
                {({ values, handleChange, errors, touched, isSubmitting }) => (
                  <Form>
                    <div>
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email Address
                      </label>
                      <div className="mt-1">
                        <Field
                          type="email"
                          name="username"
                          id="username"
                          autoComplete="email"
                          value={values.username}
                          placeholder="Enter your Email Address"
                          onChange={handleChange}
                          error={touched.username && errors.username}
                          className={`appearance-none block w-full px-3 py-2 border border-gray-300 
                                    rounded-md shadow-sm placeholder-gray-400 
                                    focus:ring-green-500 focus:border-green-500 focus:ring-1 sm:text-sm ${
                                      touched.username && errors.username
                                        ? "border-red-500"
                                        : ""
                                    }`}
                        />
                        {touched.username && errors.username && (
                          <p className="mt-2 text-sm text-red-600 ">
                            {errors.username}
                          </p>
                        )}
                      </div>
                    </div>
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
                        <Link to="/forgotpassword">
                          <p className="pt-3 text-blue-400 hover:text-blue-700">
                            forgot password ?
                          </p>
                        </Link>
                      </div>
                    </div>
                    <div className="mt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                      >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                          {isSigninLoading ? (
                            <Progress />
                          ) : (
                            <BiLockAlt
                              className="h-5 w-5 text-gray-600 group-hover:text-yellow-400"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                        Sign in
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
              <div className=" pt-5 ">
                {/* <Link to="/signup">
                  <span className="font-medium text-yellow-600 hover:text-yellow-700">
                    {"Don't Have an account? please Signup here"}
                  </span>
                </Link> */}
              </div>
            </div>
          </div>
        </div>

        <div className=" lg:hidden bg-white w-96 px-6 py-8 mt-5 shadow-md rounded-lg  hover:shadow-lg">
          <div className="  flex justify-center items-center w-full mb-5">
            <div className="w-40 h-20 rounded-md ">
              <img src={logo} alt="" className="" />
            </div>
          </div>
          <div className="mb-6 ">
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              Sign In
            </h2>
          </div>
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={signinValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, handleChange, errors, touched, isSubmitting }) => (
                <Form>
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </label>
                    <div className="mt-1">
                      <Field
                        type="email"
                        name="username"
                        id="username"
                        autoComplete="email"
                        value={values.username}
                        placeholder="Enter your Email Address"
                        onChange={handleChange}
                        error={touched.username && errors.username}
                        className={`appearance-none block w-full px-3 py-2 border border-gray-300 
                                    rounded-md shadow-sm placeholder-gray-400 
                                    focus:ring-green-500 focus:border-green-500 focus:ring-1 sm:text-sm ${
                                      touched.username && errors.username
                                        ? "border-red-500"
                                        : ""
                                    }`}
                      />
                      {touched.username && errors.username && (
                        <p className="mt-2 text-sm text-red-600 ">
                          {errors.username}
                        </p>
                      )}
                    </div>
                  </div>
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
                      <Link to="/forgotpassword">
                        <p className="pt-3 text-blue-400 hover:text-blue-700">
                          forgot password ?
                        </p>
                      </Link>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    >
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        {isSigninLoading ? (
                          <Progress />
                        ) : (
                          <BiLockAlt
                            className="h-5 w-5 text-gray-600 group-hover:text-yellow-400"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                      Sign Login
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
            <div className="pt-5">
              {/* <Link to="/signup">
                <span className="font-medium text-yellow-600 hover:text-yellow-700">
                  {"Don't Have an account? please Signup here "}
                </span>
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Signin;
