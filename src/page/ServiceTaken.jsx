import React, { Fragment, useState } from "react";
import PackageBreadcrumb from "../components/common/PackageBreadcrumb";
import { Box, Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import { MdEdit, MdMiscellaneousServices, MdPets } from "react-icons/md";
import { useParams } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { toast } from "react-toastify";

// Modal Component
import AddTime from "../components/Service/AddTime";
import AdditionalFee from "../components/Service/AditionalFee";

//endpoint
import { API } from "../api/endpoints";

//query
import { useQuery } from "@tanstack/react-query";
import GridCard from "../components/common/ui/GridCard";
import { formatDatewithTime } from "../utils/CommonFunction";
import usePatch from "../hooks/usePatch";
import { Progress } from "../components/common/Progress";
import { CommonProgress } from "../components/common/CommonProgress";
import AddService from "../components/Service/AddService";
import EditService from "../components/Service/EditService";
import EarningsTable from "../components/Service/EarningsTable";

const ServiceTaken = () => {
  const [open, setOpen] = useState(false);
  const [aopen, setAOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const { id } = useParams();

  let url = API.GetSubscriptionByID + `/${id}`;
  const {
    data: serviceData = {},
    isLoading: serviceLoading,
    refetch: serviceRefetch,
  } = useQuery([url]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleAdditionOpen = () => {
    setAOpen(true);
  };

  const handleAdditionClose = () => {
    setAOpen(false);
  };

  //Call Booking Update API
  const [isEnabled, setIsEnabled] = useState(false);

  const { mutateAsync: updateMutate, isLoading: updateLoading } = usePatch({
    endpoint:
      API.MarkedServe + `/${serviceData?.data?.currentBooking?._id}`, // Replace with your actual API endpoint
    onSuccess: (data) => {
      toast.success("Booking  Confirmed Successfully !");
      serviceRefetch();
    },
    onError: (error) => {
      // Handle update error, e.g., display an error message
      toast.error(error?.response?.data?.message);
    },
  });

  const handleChange = (event) => {
    setIsEnabled(event.target.checked);
    const payload = {
      markAsServed: event.target.checked,
    };
    updateMutate(payload); // Call the mutation to update the API
  };

  const handleServiceOpen = () => {
    setServiceOpen(true);
  };
  const handleServiceClose = () => {
    setServiceOpen(false);
  };

  if (serviceLoading) {
    return <CommonProgress />;
  }
  return (
    <Fragment>
      <PackageBreadcrumb>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="grey" href="">
            <Box sx={{ justifyContent: "center", display: "flex" }}>
              <MdMiscellaneousServices
                size={23}
                className="min-w-max text-gray-700"
              />
              <span className=" ">&nbsp;Services </span>
            </Box>
          </Link>
        </Breadcrumbs>
      </PackageBreadcrumb>

      <div className="mt-0">
        <div className="bg-white rounded-lg py-5 px-5">
          <p className="text-lg font-bold text-tertiary ">
            Subscription User Information{" "}
          </p>
          <div className="grid lg:grid-cols-2 grid-cols-1 bg-white mt-5 gap-5">
            <div>
              <GridCard
                title={"User Name"}
                value={serviceData?.data?.subscribedUser?.fullName}
              />
              <GridCard
                title={"Email "}
                value={serviceData?.data?.subscribedUser?.email}
              />
              <GridCard
                title={"Contact Number"}
                value={serviceData?.data?.subscribedUser?.phoneNumber}
              />
            </div>
            <div>
              <GridCard
                title={"Service Register Date"}
                value={formatDatewithTime(serviceData?.data?.subscribedUser?.dateJoined)}
              />
              <GridCard
                title={"Address"}
                value={serviceData?.data?.subscribedUser?.address}
              />
              <GridCard
                title={"Postal Code"}
                value={serviceData?.data?.postalCode}
              />
              <GridCard
                title={"Personal ID Number "}
                value={serviceData?.data?.subscribedUser?.pidNumber}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg py-5 px-5 mt-5">
          <div className="flex justify-between items-center">
            <p className="text-lg font-bold text-tertiary ">
              Subscription Details{" "}
            </p>
            <div className="p-1">
              <button
                className="py-2 bg-[#020a38] text-white rounded-lg px-4 mb-2"
                onClick={handleServiceOpen}
              >
                Edit Details
              </button>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 grid-cols-1 bg-white mt-5 gap-5 ">
            <div>
              <GridCard
                title={"Service Taken"}
                value={serviceData?.data?.subscriptionFrequency}
              />
              <GridCard
                title={"Cleaning Duration "}
                value={serviceData?.data?.cleaningDurationInHours + " Hours"}
              />
              <div className="flex space-x-2 items-center ">
                <GridCard
                  title={"Cleaning Date and Time "}
                  value={formatDatewithTime(serviceData?.data?.currentBooking?.cleaningDate)}
                />
                <div
                  className="cursor-pointer  flex space-x-3 text-center items-center rounded-md border w-24 h-10 px-3 py-1 shadow-sm bg-gray-50 hover:bg-indigo-50"
                  onClick={handleOpen}
                >
                  <MdEdit
                    size={18}
                    className="w-6 h-6 text-indigo-600 bg-gray-300 rounded-full p-1"
                  />
                  <p className="text-sm text-indigo-600 ">Edit</p>
                </div>
              </div>

              <GridCard
                title={"Area in SquareMete "}
                value={`${serviceData?.data?.areaInSquareMeters}  m2`}
              />
              <GridCard
                title={"Address"}
                value={serviceData?.data?.subscribedUser?.address}
              />
            </div>
            <div>
              <GridCard
                title={"Personal ID Number "}
                value={serviceData?.data?.subscribedUser?.pidNumber}
              />
              <GridCard
                title={"Has Dogs"}
                value={serviceData?.data?.hasDogs ? "YES" : "NO"}
              />
              <GridCard
                title={"Has Cats"}
                value={serviceData?.data?.hasCats ? "YES" : "NO"}
              />
              <GridCard
                title={"Has Other Pets"}
                value={serviceData?.data?.hasOtherPets ? "YES" : "NO"}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg py-5 px-5 mt-5">
          <p className="text-lg font-bold text-tertiary ">Booking Details </p>
          <div className="grid lg:grid-cols-2 grid-cols-1 bg-white mt-5 gap-5 ">
            <div>
              <GridCard
                title={"Cleaning Duration"}
                value={
                  serviceData?.data?.currentBooking?.cleaningDuration + " Hour"
                }
              />
              <GridCard
                title={"Cleaning Price"}
                value={serviceData?.data?.currentBooking?.cleaningPrice + " kr"}
              />
              <div className="flex space-x-2 items-center ">
                <GridCard
                  title={"Additional Charge"}
                  value={
                    serviceData?.data?.currentBooking?.additionalCharges + " kr"
                  }
                />
                <div
                  className="cursor-pointer  flex space-x-3 text-center items-center rounded-md border w-24 h-10 px-3 py-1 shadow-sm bg-gray-50 hover:bg-indigo-50"
                  onClick={handleAdditionOpen}
                >
                  <MdEdit
                    size={18}
                    className="w-6 h-6 text-indigo-600 bg-gray-300 rounded-full p-1"
                  />
                  <p className="text-sm text-indigo-600 ">Add </p>
                </div>
              </div>
              <GridCard
                title={"Additional Charge Description"}
                value={serviceData?.data?.currentBooking?.remarks || "N/A"}
              />

              <GridCard
                title={"Discount Amount "}
                value={`${serviceData?.data?.currentBooking?.discountAmount}  kr`}
              />
              <GridCard
                title={"VAT"}
                value={serviceData?.data?.currentBooking?.vatAmount + " kr"}
              />
            </div>
            <div>
              <GridCard
                title={"Supplies Charge"}
                value={
                  serviceData?.data?.currentBooking?.suppliesCharges + " kr"
                }
              />
              {serviceData?.data?.currentBooking?.paymentStatus ===
              "PaymentCompleted" ? (
                <GridCard
                  title={"Total PAID"}
                  value={serviceData?.data?.currentBooking?.totalAmount + " kr"}
                />
              ) : (
                <GridCard
                  title={"Total DUE"}
                  value={serviceData?.data?.currentBooking?.totalAmount + " kr"}
                />
              )}

              <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 px-5 mt-8">
                <div className="flex  space-x-5 items-center">
                  <p className=" py-1 bg-slate-200  px-4 rounded-lg">
                    Payment Status :{" "}
                  </p>
                  <p
                    className={`px-3 py-1 text-[12px] font-semibold ${
                      serviceData?.data?.currentBooking?.paymentStatus ===
                      "PaymentCompleted"
                        ? "bg-[#a5f9a9a2] "
                        : "bg-red-300" // Use the intended background color for confirmed bookings
                    } rounded-lg`}
                  >
                    {serviceData?.data?.currentBooking?.paymentStatus ===
                    "PaymentCompleted"
                      ? "Paid"
                      : "Pending"}
                  </p>
                </div>

                <div className="flex  space-x-5 items-center">
                  <p className=" py-1 bg-slate-200  px-3 rounded-lg">
                    Booking Status :{" "}
                  </p>
                  <p
                    className={`px-3 py-1 text-[12px] font-semibold ${
                      serviceData?.data?.currentBooking?.bookingStatus ===
                      "BookingCancelled"
                        ? "bg-red-300"
                        : serviceData?.data?.currentBooking?.bookingStatus ===
                          "BookingServed"
                        ? "bg-blue-500"
                        : serviceData?.data?.currentBooking?.bookingStatus ===
                          "BookingCompleted"
                        ? "bg-[#a5f9a9a2]" // Use the intended background color for confirmed bookings
                        : "bg-primary"
                    } rounded-lg`}
                  >
                    {serviceData?.data?.currentBooking?.bookingStatus ===
                    "BookingCancelled"
                      ? "Cancelled"
                      : serviceData?.data?.currentBooking?.bookingStatus ===
                        "BookingServed"
                      ? "Served"
                      : serviceData?.data?.currentBooking?.bookingStatus ===
                        "BookingCompleted"
                      ? "Completed" // Use the intended background color for confirmed bookings
                      : "Processing"}
                  </p>
                </div>
              </div>
              {serviceData?.data?.currentBooking?.bookingStatus ===
                "BookingInitiated" && (
                <div className="flex space-x-5  w-96 items-center mt-5 py-2 mx-5 px-5 bg-pink-50 rounded-lg">
                  <p>Confirmed Booking For This User : </p>
                  <FormGroup>
                    <FormControlLabel
                      disabled={false}
                      control={
                        <Switch checked={isEnabled} onChange={handleChange} />
                      }
                      label="Confirmed"
                    />
                  </FormGroup>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="px-10 py-5 bg-white mt-8">
        <EarningsTable id={ serviceData?.data?.subscribedUser?._id} />
      </div>
      <AddTime
        open={open}
        onClose={handleClose}
        refetch={serviceRefetch}
        data={serviceData?.data}
      />
      <AdditionalFee
        open={aopen}
        onClose={handleAdditionClose}
        refetch={serviceRefetch}
        data={serviceData?.data}
      />

      <EditService
        open={serviceOpen}
        onClose={handleServiceClose}
        refetch={serviceRefetch}
        data={serviceData?.data}
      />
    </Fragment>
  );
};

export default ServiceTaken;
