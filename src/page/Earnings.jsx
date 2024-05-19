// External Import
import { Box, Breadcrumbs } from "@mui/material";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

//icons
import { FiCheckCircle, FiDownload } from "react-icons/fi";
import { MdCancel, MdOutlinePayments } from "react-icons/md";

// Internal Import
import IncomeAreaChart from "../components/Dashboard/IncomeAreaChart";
import DefaultTable from "../components/common/DefaultTable";
import PackageBreadcrumb from "../components/common/PackageBreadcrumb";

import CsvDownloader from "react-csv-downloader";

import { orangeMoney } from "../assets/images/icons";

import { earnings, months } from "../constants/Data/constantsData";
import { getCurrentMonth } from "../utils/CommonFunction";
import { CommonSelect, CommonButton } from "../components/common/ui";
import { useQuery } from "@tanstack/react-query";
import { API } from "../api/endpoints";
import { earningHeadings } from "../constants/TableColumns/earningHeadings";
import EarningsTable from "../components/Service/EarningsTable";
import { FaFilter } from "react-icons/fa6";
import DateRangePicker from "../components/common/DateRangePicker";

const Earnings = () => {
  const currentMonth = getCurrentMonth();
  const [earning, setEarnings] = useState("week");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  // GetAllCleaningBooking
  const {
    data: dashboardData = {},
    isLoading: dashboardLoading,
    refetch: dashboardRefetch,
  } = useQuery([API.Dashboard]);

  const handleChange = (event) => {
    setEarnings(event.target.value);
  };

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
          {/* <div className="border border-primary  p-5 rounded-lg ">
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
          </div> */}
          {/* <div className="flex justify-between ">
            <div className="p-1 flex lg:flex-row flex-col lg:justify-between justify-start  items-center">
              <div className="flex w-24 space-x-2 items-center relative ml-5">
                <div
                  className="flex w-24 space-x-2 items-center cursor-pointer"
                  onClick={() => toggleMenu()}
                >
                  <p className="text-sm font-bold ">Filter By</p>{" "}
                  {menuVisible ? (
                    <MdCancel size={20} className="min-w-max text-red-500" />
                  ) : (
                    <FaFilter size={20} className="min-w-max text-[#020a38]" />
                  )}
                </div>
                {menuVisible && (
                  <div className="absolute -left-5 lg:px-10  bottom-5 bg-white border h-96 z-10 lg:w-[600px] top-6   p-4 rounded-lg shadow-lg">
                    <div className="grid lg:grid-cols-3 grid-cols-1 px-2">
                      <p className="py-2 underline text-blue-400 text-[14px] font-medium cursor-pointer">
                        Active Subscriber
                      </p>
                      <p className="py-2 underline text-blue-400 text-[14px] font-medium cursor-pointer">
                        InActive Subscriber
                      </p>
                      <p className="py-2 underline text-blue-400 text-[14px] font-medium">
                        Order By NextSchedule
                      </p>
                    </div>

                    <div>
                      <div className="my-4">
                        <p className="py-2 text-[14px] font-medium">
                          Search By Service DateRange
                        </p>
                        <DateRangePicker />
                      </div>

                      <div className="my-4">
                        <p className="py-2 text-[14px] font-medium">
                          Search By Service DateRange
                        </p>
                        <DateRangePicker />
                      </div>
                      <div className="items-center w-full flex justify-center mt-8 space-x-5">
                      <CommonButton
                        text="Search"
                        type="submit"
                        className="border border-primary bg-purple-900 text-white hover:bg-purple-950 w-24 flex justify-center items-center"
                        // onClick={() => resetForm()}
                      />
                      <CommonButton
                        text="Reset"
                        type="reset"
                        className="border border-primary bg-red-400 text-white hover:bg-red-600 w-24 flex justify-center items-center"
                        // onClick={() => resetForm()}
                      />
                      </div>
                      
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div> */}

          <EarningsTable />
        </div>
      </div>
    </Fragment>
  );
};

export default Earnings;
