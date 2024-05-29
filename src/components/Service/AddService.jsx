import React, { Fragment, useState } from "react";
import { CommonButton, CommonInputText, CommonSelect } from "../common/ui";

import { ErrorMessage, Field, Formik, Form } from "formik";
import { toast } from "react-toastify";

import { useQuery } from "@tanstack/react-query";
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
import addServiceValidation from "../../validations/control_validations/AddServiceValidation";
import { Duration } from "../../utils/CommonFunction";
import usePatch from "../../hooks/usePatch";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(utc);
dayjs.extend(advancedFormat);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  width: "90%",
  maxWidth: "550px",
  maxHeight: "90vh", // Set your desired maximum height
  overflowY: "auto",
  bgcolor: "background.paper",
  border: "2px solid #F7FDFF",
  borderRadius: "10px",
  boxShadow: `3px 2px 3px 1px rgba(0, 0, 0, 0.2)`,
  p: 4,
};
const AddService = ({ data, refetch, open, onClose }) => {
  const [coupon, setCoupon] = useState("");
  const [couponCodeValue, setCouponCode] = useState(null);

  // get subscription Frequency data...
  const {
    data: subscriptionFrequency = {},
    isLoading: cleaningFrequencyLoading,
  } = useQuery([API.GetAllCleaningPrice]);

  // Create Mutation ....
  const { mutateAsync: createmutate, isLoading: createLoading } = useCreate({
    endpoint: API.ADDCleaningSubscription, // Replace with your actual API endpoint
    onSuccess: (data) => {
      toast.success("Add Service Successfully !");
      refetch();
      onClose();
      setCoupon("");
      setCouponCode(null);
    },
    onError: (error) => {
      // Handle update error, e.g., display an error message
      console.error("Update failed", error);
      toast.error("Something went wrong !");
    },
  });

  // Update Mutation ....
  const { mutateAsync: updateMutate, isLoading: updateLoading } = usePatch({
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

  // Verify Coupon Mutation ...
  const { mutateAsync: verifyCoupon, isLoading: couponLoading } = useCreate({
    endpoint: API.VerifyCoupon, // Replace with your actual API endpoint

    onSuccess: async (data) => {
      toast.success("Coupon is Verifyed !");
      setCouponCode(data?.data?.data?._id);
    },
    onError: (error) => {
      toast.error("Coupon is UnVerified !");
    },
  });

  const handleCoupon = async () => {
    const payload = {
      couponCode: coupon,
    };
    if(coupon.length > 0 ){
      await verifyCoupon(payload);
    }
    
  };

  // Handle Submit Function .....
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      let payload = {
        ...values,
        areaInSquareMeters: Number(values?.areaInSquareMeters),
        cleaningCoupon: couponCodeValue,
        startDate: dayjs(values?.startDate),
      };

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

  const currentDateTimeLocal = dayjs().format("YYYY-MM-DDTHH:mm");

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
                  userFullName: data ? data?.userFullName : "",
                  userEmail: data ? data?.userEmail : "",
                  userPhoneNumber: "",
                  userPidNumber: "",
                  areaInSquareMeters: null,
                  postalCode: null,
                  address: "",
                  cleaningDurationInHours: null,
                  subscriptionFrequency: "",
                  startDate: "",
                  hasCats: false,
                  hasDogs: false,
                  hasOtherPets: false,
                }}
                validationSchema={addServiceValidation}
                onSubmit={handleSubmit}
              >
                {({
                  values,
                  handleChange,
                  errors,
                  touched,
                  isSubmitting,
                  resetForm,
                  setFieldValue,
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
                        {data ? "Update " : "Add "} Service
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
                      <Chip label="Service" />
                    </Divider>

                    <div className="mt-4 pb-3">
                      {/* Full Name  */}
                      <div>
                        <Field
                          name="userFullName"
                          id="userFullName"
                          label="Full Name"
                          type="text"
                          placeholder="Type here"
                          component={CommonInputText}
                          onChange={handleChange}
                          value={values.userFullName}
                          error={touched.userFullName && errors.userFullName}
                          className={`appearance-none  block
                            ${
                              touched.userFullName && errors.userFullName
                                ? "border-red-500"
                                : ""
                            }`}
                        />
                        <ErrorMessage
                          name="userFullName"
                          component="div"
                          className="mt-2 text-sm text-red-600"
                        />
                      </div>

                      {/* Email  */}
                      <div>
                        <Field
                          name="userEmail"
                          id="userEmail"
                          label="Email"
                          type="email"
                          placeholder="Type here"
                          component={CommonInputText}
                          onChange={handleChange}
                          value={values.userEmail}
                          error={touched.userEmail && errors.userEmail}
                          className={`appearance-none  block
                            ${
                              touched.userEmail && errors.userEmail
                                ? "border-red-500"
                                : ""
                            }`}
                        />
                        <ErrorMessage
                          name="userEmail"
                          component="div"
                          className="mt-2 text-sm text-red-600"
                        />
                      </div>

                      {/* PhoneNumber  */}
                      <div>
                        <Field
                          name="userPhoneNumber"
                          id="userPhoneNumber"
                          label="Phone Number"
                          type="text"
                          placeholder="Type here"
                          component={CommonInputText}
                          onChange={handleChange}
                          value={values.userPhoneNumber}
                          error={
                            touched.userPhoneNumber && errors.userPhoneNumber
                          }
                          className={`appearance-none  block
                            ${
                              touched.userPhoneNumber && errors.userPhoneNumber
                                ? "border-red-500"
                                : ""
                            }`}
                        />
                        <ErrorMessage
                          name="userPhoneNumber"
                          component="div"
                          className="mt-2 text-sm text-red-600"
                        />
                      </div>

                      {/* PID Number  */}
                      <div>
                        <Field
                          name="userPidNumber"
                          id="userPidNumber"
                          label="PID Number"
                          type="text"
                          placeholder="Type here"
                          component={CommonInputText}
                          onChange={handleChange}
                          value={values.userPidNumber}
                          error={touched.userPidNumber && errors.userPidNumber}
                          className={`appearance-none  block
                            ${
                              touched.userPidNumber && errors.userPidNumber
                                ? "border-red-500"
                                : ""
                            }`}
                        />
                        <ErrorMessage
                          name="userPidNumber"
                          component="div"
                          className="mt-2 text-sm text-red-600"
                        />
                      </div>

                      <div>
                        <Field
                          name="areaInSquareMeters"
                          id="areaInSquareMeters"
                          label="Area in Square Meter"
                          autoComplete="areaInSquareMeters"
                          type="number"
                          placeholder="Type here"
                          component={CommonInputText}
                          onChange={(e) => {
                            const newValue = e.target.value;
                            setFieldValue("areaInSquareMeters", newValue);
                            setFieldValue(
                              "cleaningDurationInHours",
                              Duration(newValue)
                            );
                          }}
                          value={values.areaInSquareMeters}
                          error={
                            touched.areaInSquareMeters &&
                            errors.areaInSquareMeters
                          }
                          className={`appearance-none  block
                            ${
                              touched.areaInSquareMeters &&
                              errors.areaInSquareMeters
                                ? "border-red-500"
                                : ""
                            }`}
                        />
                        <ErrorMessage
                          name="areaInSquareMeters"
                          component="div"
                          className="mt-2 text-sm text-red-600"
                        />
                      </div>

                      {/* Cleaning Duration  */}
                      <div className="mb-6">
                        <label
                          className="mb-1 block text-sm font-semibold "
                          htmlFor="cleaning-duration"
                        >
                          Cleaning Duration IN Hours
                        </label>
                        <Field
                          as="select"
                          name="cleaningDurationInHours"
                          className={`appearance-none block w-full px-3 py-3 border border-gray-300 
                                    rounded-md shadow-sm placeholder-gray-400 
                                    focus:ring-green-500 focus:border-green-500 focus:ring-1 sm:text-sm ${
                                      touched.cleaningDurationInHours &&
                                      errors.cleaningDurationInHours
                                        ? "border-red-500"
                                        : ""
                                    }`}
                          onChange={(e) => {
                            const newValue = e.target.value;
                            setFieldValue("cleaningDurationInHours", newValue);
                          }}
                          value={values.cleaningDurationInHours}
                        >
                          <option
                            value={values.cleaningDurationInHours}
                            disabled
                            hidden
                          >
                            {values.cleaningDurationInHours
                              ? values.cleaningDurationInHours +
                                ` hours (recommendation)`
                              : "Select cleaning duration"}
                          </option>
                          <option value="2">2 </option>
                          <option value="2.5">2.5 </option>
                          <option value="3">3 </option>
                          <option value="3.5">3.5 </option>
                          <option value="4">4 </option>
                          <option value="4.5">4.5 </option>
                          <option value="5">5 </option>
                          <option value="5.5">5.5 </option>
                          <option value="6">6 </option>
                          <option value="6.5">6.5 </option>
                          <option value="7">7 </option>
                          <option value="7.5">7.5 </option>
                          <option value="8">8 </option>
                        </Field>
                      </div>

                      <div>
                        <Field
                          name="postalCode"
                          id="postalCode"
                          label="Postal Code "
                          type="number"
                          placeholder="Type here"
                          component={CommonInputText}
                          onChange={handleChange}
                          value={values.postalCode}
                          error={touched.postalCode && errors.postalCode}
                          className={`appearance-none  block
                            ${
                              touched.postalCode && errors.postalCode
                                ? "border-red-500"
                                : ""
                            }`}
                        />
                        <ErrorMessage
                          name="postalCode"
                          component="div"
                          className="mt-2 text-sm text-red-600"
                        />
                      </div>

                      <div>
                        <Field
                          name="address"
                          id="address"
                          label="Address"
                          type="text"
                          placeholder="Type here"
                          component={CommonInputText}
                          onChange={handleChange}
                          value={values.address}
                          error={touched.address && errors.address}
                          className={`appearance-none  block
                            ${
                              touched.address && errors.address
                                ? "border-red-500"
                                : ""
                            }`}
                        />
                        <ErrorMessage
                          name="address"
                          component="div"
                          className="mt-2 text-sm text-red-600"
                        />
                      </div>

                      {/* Cleaning Price  */}
                      <div>
                        <p className="text-sm font-bold py-2">
                          Select Cleaning Price
                        </p>
                        {cleaningFrequencyLoading ? (
                          <div className="items-center flex justify-center w-full h-24">
                            <Progress />
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {subscriptionFrequency?.data?.map((item, i) => (
                              <div
                                key={i}
                                className={`bg-gray-100 h-24 items-center  cursor-pointer   rounded-lg  overflow-hidden ${
                                  values?.subscriptionFrequency ===
                                  item?.subscriptionFrequency
                                    ? "border-2 border-black"
                                    : "border"
                                }`}
                                onClick={async () => {
                                  await setFieldValue(
                                    "subscriptionFrequency",
                                    item?.subscriptionFrequency
                                  );
                                }}
                              >
                                {item?.subscriptionFrequency ===
                                  "EveryTwoWeeks" && (
                                  <div className="flex items-end justify-end  ">
                                    <p className="  rounded-bl-full bg-tertiary rounded-tl-sm rounded-tr-48 mr-[0.2px]   bg-secondprimary px-4 py-1 text-center text-[12px] font-bold text-white">
                                      Most Popular
                                    </p>
                                  </div>
                                )}

                                <div className="flex items-center justify-between p-4">
                                  <div className="flex flex-col items-start justify-start">
                                    <p
                                      className={` ${
                                        values.subscriptionFrequency ===
                                        item.subscriptionFrequency
                                          ? "text-md font-bold"
                                          : "text-sm font-normal"
                                      }`}
                                      htmlFor={item.subscriptionFrequency}
                                    >
                                      {item.subscriptionFrequency ===
                                      "EveryTwoWeeks"
                                        ? " Every Two Weeks"
                                        : item.subscriptionFrequency ===
                                          "EveryWeek"
                                        ? "Every Week"
                                        : item.subscriptionFrequency ===
                                          "EveryFourWeeks"
                                        ? "Every Four Weeks"
                                        : "One Time Only"}
                                    </p>
                                    <span className="text-sm">
                                      {item.subscriptionPrice * 2} kr/h{" "}
                                    </span>
                                  </div>
                                  <span className="items-end text-lg font-semibold">
                                    {item.subscriptionPrice} kr/h
                                  </span>
                                </div>
                              </div>
                            ))}

                            {errors.cleaningPrice && touched.cleaningPrice && (
                              <div className="text-red-500">
                                {errors.cleaningPrice}
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Start Date  */}
                      <div>
                        <Field
                          id="date-time"
                          type="datetime-local"
                          name="startDate"
                          className={`py-3 px-5 border w-full mt-3 mb-3 rounded-lg  ${
                            touched.startDate && errors.startDate
                              ? "border-red-500"
                              : ""
                          }`}
                          min={currentDateTimeLocal}
                          value={dayjs(values.startDate).format(
                            "YYYY-MM-DDTHH:mm"
                          )}
                          onChange={(e) => {
                            const localDate = dayjs(e.target.value);
                            const utcDate = localDate
                              .utc()
                              .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
                            setFieldValue("startDate", utcDate);
                            // setFormData({ ...formData, startDate: utcDate });
                          }}
                        />

                        <ErrorMessage
                          name="startDate"
                          component="div"
                          className="mt-2 text-sm text-red-600"
                        />
                      </div>

                      <div className="flex justify-between ">
                        <div className="border py-2 px-2 rounded-lg flex items-center justify-center space-x-2">
                          <p className="text-[12px] font-semibold">
                            Has Cats ?
                          </p>
                          <Field
                            type="checkbox"
                            name="hasCats"
                            id="hasCats"
                            label="Has Cats?"
                            checked={values.hasCats}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="border py-2 px-2 rounded-lg flex items-center justify-center space-x-2">
                          <p className="text-[12px] font-semibold">
                            Has Dogs ?
                          </p>
                          <Field
                            type="checkbox"
                            name="hasDogs"
                            id="hasDogs"
                            label="Has Dogs?"
                            checked={values.hasDogs}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="border py-2 px-2 rounded-lg flex items-center justify-center space-x-2">
                          <p className="text-[12px] font-semibold">
                            Has Others Pets?
                          </p>
                          <Field
                            type="checkbox"
                            name="hasOtherPets"
                            id="hasOtherPets"
                            label="Has Other Pets?"
                            checked={values.hasOtherPets}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="mt-6 flex items-center space-x-2">
                        <input
                          className="flex-1 border py-2 px-4 rounded-lg "
                          placeholder={"Gift Coupon"}
                          onChange={(e) => setCoupon(e.target.value)}
                        />
                        <div
                          className="shrink-0 flex py-2 border px-3 rounded-lg bg-black text-white justify-center items-center cursor-pointer"
                          onClick={handleCoupon}
                        >
                          {couponLoading && (
                            <div className="pr-2">
                              <Progress />
                            </div>
                          )}
                          Apply
                        </div>
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

export default AddService;
