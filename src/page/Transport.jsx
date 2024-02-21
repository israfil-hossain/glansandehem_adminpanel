// External Import
import React, { Fragment, useState } from "react";

//icons
import { FiDownload } from "react-icons/fi";

// Internal Import
import DefaultTable from "../components/common/DefaultTable";

import userData from "../constants/Data/dashboardData";

import { orangeMoney } from "../assets/images/icons";

import { earnings, months } from "../constants/Data/constantsData";
import { userHeading } from "../constants/TableColumns/userHeadings";
import { getCurrentMonth } from "../utils/CommonFunction";
import { CommonSelect, CommonButton } from "../components/common/ui";
import { FaCartArrowDown, FaLuggageCart } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import AddSchedule from "../components/Transport/AddSchedule";
import { transportHeading } from "../constants/TableColumns/transportHeadings";
import transportData from "../constants/Data/transportData";

const Transport = () => {
  const currentMonth = getCurrentMonth();
  const [selectedOption, setSelectedOption] = useState(currentMonth);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Fragment>
      <div className="">
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
              <FaCartArrowDown className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="flex flex-col ">
              <h2 className="text-xl font-bold font-sans">25</h2>
              <p className="text-sm text-gray-300">Total Transport Order</p>
            </div>
          </div>
          <div className="p-4 flex border border-[#ef779d] rounded-xl space-x-4 bg-white">
            <div className="p-3 border border-[#fab9ce] shadow-md rounded-xl">
              <FaLuggageCart className="w-5 h-5 text-[#fab9ce]" />
            </div>
            <div className="flex flex-col ">
              <h2 className="text-xl font-bold font-sans">23</h2>
              <p className="text-sm text-gray-300">Pending Order</p>
            </div>
          </div>
          <div
            className="p-4 flex bg-primary justify-center border border-primary rounded-xl hover:cursor-pointer hover:border-blue-500"
            onClick={handleOpen}
          >
            <div className="flex flex-col items-center ">
              <FaCalendarDays className="w-5 h-5 " />
              <h2 className="text-lg font-bold font-sans">
                Change pickup availability
              </h2>
            </div>
          </div>
        </div>

        <div className="">
          <div className="mt-0">
            <div className="flex justify-between space-x-5 bg-white border-primary  border border-b-0 rounded-t-lg p-2">
              <div className="p-1 text-lg font-semibold font-sanse">Pickup</div>
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
                headings={transportHeading}
                data={transportData}
                disablePagination={false}
                size={size}
                setSize={setSize}
                page={page}
                setPage={setPage}
              />
            </div>
            <AddSchedule open={open} onClose={handleClose} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Transport;
