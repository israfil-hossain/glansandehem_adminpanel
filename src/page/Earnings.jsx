// External Import
import { Box, Breadcrumbs } from "@mui/material";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

//icons
import { FiDownload } from "react-icons/fi";
import { MdOutlinePayments } from "react-icons/md";

// Internal Import
import IncomeAreaChart from "../components/Dashboard/IncomeAreaChart";
import DefaultTable from "../components/common/DefaultTable";
import PackageBreadcrumb from "../components/common/PackageBreadcrumb";

import userData from "../constants/Data/dashboardData";

import {
  greenMoney,
  orangeMoney,
  redMoney,
  yellowMoney,
} from "../assets/images/icons";

import { earnings, months } from "../constants/Data/constantsData";
import { userHeading } from "../constants/TableColumns/userHeadings";
import { getCurrentMonth } from "../utils/CommonFunction";
import { CommonSelect,CommonButton } from "../components/common/ui";

const Earnings = () => {
  const currentMonth = getCurrentMonth();
  const [earning, setEarnings] = useState("week");
  const [selectedOption, setSelectedOption] = useState(currentMonth);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

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
                  className="min-w-max text-gray-700"
                />
                <span className="text-gray-700 ">&nbsp; Earnings </span>
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
              <h2 className="text-xl font-bold font-sans">$257,34.45</h2>
              <p className="text-sm text-gray-300">Total Earnings</p>
            </div>
          </div>
          <div className="p-4 flex border border-primary rounded-xl space-x-4 bg-white">
            <div className="p-3 border border-primary shadow-md rounded-xl">
              <img src={yellowMoney} className="" alt="redmoney" />
            </div>
            <div className="flex flex-col ">
              <h2 className="text-xl font-bold font-sans">$3000</h2>
              <p className="text-sm text-gray-300">Earnings This Month</p>
            </div>
          </div>
          <div className="p-4 flex border border-[#ef779d] rounded-xl space-x-4 bg-white">
            <div className="p-3 border border-[#fab9ce] shadow-md rounded-xl">
              <img src={redMoney} className="" alt="redmoney" />
            </div>
            <div className="flex flex-col ">
              <h2 className="text-xl font-bold font-sans">$45,678.00</h2>
              <p className="text-sm text-gray-300">Withdraw Money</p>
            </div>
          </div>
          <div className="p-4 flex border border-[#37CF02] rounded-xl space-x-4 bg-white">
            <div className="p-3 border border-[#90f06d] shadow-md rounded-xl">
              <img src={greenMoney} className="" alt="redmoney" />
            </div>
            <div className="flex flex-col ">
              <h2 className="text-xl font-bold font-sans">$5080.78</h2>
              <p className="text-sm text-gray-300">Available Balance</p>
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
              <IncomeAreaChart slot={earning} height={200} />
            </div>
          </div>
          <div className="mt-5">
            <div className="flex justify-between space-x-5 bg-white border-primary  border border-b-0 rounded-t-lg p-2">
              <div className="p-1 text-lg font-semibold font-sanse">
                Transaction History
              </div>
              <div className="flex p-1 space-x-2">
                <CommonSelect
                  labelId={"months-select"}
                  id={"months-select-id"}
                  options={months}
                  value={selectedOption}
                  setSelect={setSelectedOption}
                />
                <CommonSelect
                  labelId={"months-select"}
                  id={"months-select-id"}
                  options={months}
                  value={selectedOption}
                  setSelect={setSelectedOption}
                />
                <div className="flex justify-center items-center">
                  <CommonButton
                    className="bg-primary hover:bg-secondary"
                    text={"Download Csv"}
                    icon={<FiDownload />}
                  />
                </div>
              </div>
            </div>
            <div className="border-primary border">
              <DefaultTable
                isLoading={false}
                headings={userHeading}
                data={userData?.spaceOwners}
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
