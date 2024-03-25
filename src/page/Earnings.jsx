// External Import
import { Box, Breadcrumbs } from "@mui/material";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

//icons
import { FiCheckCircle, FiDownload } from "react-icons/fi";
import { MdOutlinePayments } from "react-icons/md";

// Internal Import
import IncomeAreaChart from "../components/Dashboard/IncomeAreaChart";
import DefaultTable from "../components/common/DefaultTable";
import PackageBreadcrumb from "../components/common/PackageBreadcrumb";

import CsvDownloader from "react-csv-downloader";

import {
  orangeMoney,
} from "../assets/images/icons";

import { earnings, months } from "../constants/Data/constantsData";
import { userHeading } from "../constants/TableColumns/userHeadings";
import { getCurrentMonth } from "../utils/CommonFunction";
import { CommonSelect, CommonButton } from "../components/common/ui";
import { useQuery } from "@tanstack/react-query";
import { API } from "../api/endpoints";
import { earningHeadings } from "../constants/TableColumns/earningHeadings";

const Earnings = () => {
  const currentMonth = getCurrentMonth();
  const [earning, setEarnings] = useState("week");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  // GetAllCleaningBooking
  const {
    data: dashboardData = {},
    isLoading: dashboardLoading,
    refetch: dashboardRefetch,
  } = useQuery([API.Dashboard]);

  const { data: bookingData = {}, isLoading: bookingLoading } = useQuery([
    API.GetAllCleaningBooking + `?Page=${page}&PageSize=${size}`,
  ]);

  const handleChange = (event) => {
    setEarnings(event.target.value);
  };


  const downloadData = bookingData?.data?.map((item) => ({
    fullName: item?.bookingUser?.fullName,
    email: item?.bookingUser?.email,
    bookingStatus: item?.bookingStatus,
    cleaningDate: item?.cleaningDate,
    cleaningDuration: item?.cleaningDuration,
    cleaningPrice: item?.cleaningPrice,
    discountAmount: item?.discountAmount,
    paymentStatus: item?.paymentStatus,
    additionalCharges: item?.additionalCharges,
    remarks: item?.remarks,
    suppliesCharges: item?.suppliesCharges,
    totalAmount: item?.totalAmount,
    totalPaid: item?.paymentReceive?.totalPaid,
    vatAmount: item?.vatAmount,
  }));

  // console.log("Download Data", downloadData);

  const headers = [
    { displayName: "Full Name", id: "fullName" },
    { displayName: "Email", id: "email" },
    { displayName: "Booking Status", id: "bookingStatus" },
    { displayName: "Cleaning Date", id: "cleaningDate" },
    { displayName: "Cleaning Duration", id: "cleaningDuration" },
    { displayName: "Cleaning Price", id: "cleaningPrice" },
    { displayName: "Discount Amount", id: "discountAmount" },
    { displayName: "Payment Status", id: "paymentStatus" },
    { displayName: "Additional Charges", id: "additionalCharges" },
    { displayName: "Remarks", id: "remarks" },
    { displayName: "Supplies Charges", id: "suppliesCharges" },
    { displayName: "Total Amount", id: "totalAmount" },
    { displayName: "Total Paid", id: "totalPaid" },
    { displayName: "VAT Amount", id: "vatAmount" },
  ];


  return (
    <Fragment>
      <div className="">
        <PackageBreadcrumb>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="grey" href="/category">
              <Box sx={{ justifyContent: "center", display: "flex" }}>
                <MdOutlinePayments
                  size={23}
                  className="min-w-max text-[#020a38]"
                />
                <span className="text-[#020a38]">&nbsp; Earnings </span>
              </Box>
            </Link>
            {/* <Typography color="grey">sdfgh</Typography> */}
          </Breadcrumbs>
        </PackageBreadcrumb>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1  gap-5 pb-10">
          <div className="p-4 flex border border-[#FDB3CA] rounded-xl space-x-4 bg-white">
            <div className="p-3 border border-[#FDB3CA] shadow-md rounded-xl">
              <img src={orangeMoney} className="" alt="redmoney" />
            </div>
            <div className="flex flex-col ">
              <h2 className="text-xl font-bold font-sans">
                {dashboardData?.data?.totalEarnings} kr
              </h2>
              <p className="text-sm text-gray-300">Total Earnings</p>
            </div>
          </div>

          <div className="p-4 flex border border-[#37CF02] rounded-xl space-x-4 bg-white">
            <div className="p-3 border border-[#90f06d] shadow-md rounded-xl">
              <FiCheckCircle size={28} className="text-[#37CF02]" />
            </div>
            <div className="flex flex-col ">
              <h2 className="text-xl font-bold font-sans">
                {dashboardData?.data?.totalActiveBookings}
              </h2>
              <p className="text-sm text-gray-300">Active Booking</p>
            </div>
          </div>
        </div>

        <div className="">
          <div className="border border-primary  p-5 rounded-lg ">
            <div className="flex justify-between">
              <p className="text-[16px] font-bold font-sans">Earnings</p>
              <Box sx={{ minWidth: 120 }}>
                <CommonSelect
                  label="Earnings"
                  labelId={"earning-label"}
                  id={"earning-label-id"}
                  options={earnings}
                  value={earning}
                  onChange={handleChange}
                />
              </Box>
            </div>
            <div className="h-full">
              <p>Use in Future...</p>
              <IncomeAreaChart slot={earning} height={200} />
            </div>
          </div>
          <div className="mt-5">
            <div className="flex justify-between space-x-5 bg-white border-primary  border border-b-0 rounded-t-lg p-2">
              <div className="p-1 text-lg font-semibold font-sanse">
                Transaction History
              </div>
              <div className="flex p-1 space-x-2">
                <div className="flex justify-center items-center">
                  <CsvDownloader
                    filename="earning-booking"
                    extension=".csv"
                    columns={headers}
                    datas={downloadData}
                    text="DOWNLOAD CSV"
                    className="bg-primary px-4 py-1 rounded-md text-[12px] font-semibold"
                  />
                 
                </div>
              </div>
            </div>
            <div className="border-primary border">
              <DefaultTable
                isLoading={bookingLoading}
                headings={earningHeadings}
                data={bookingData || []}
                disablePagination={false}
                size={size}
                setSize={setSize}
                page={page}
                setPage={setPage}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Earnings;
