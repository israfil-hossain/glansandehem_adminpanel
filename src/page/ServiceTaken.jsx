import React, { Fragment, useState } from "react";
import PackageBreadcrumb from "../components/common/PackageBreadcrumb";
import { Box, Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import { RiStore2Line } from "react-icons/ri";
import { MdEdit, MdMiscellaneousServices, MdPets } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import AddCoupon from "../components/ControlPanel/AddCoupon";
import AddTime from "../components/Service/AddTime";
import AdditionalFee from "../components/Service/AditionalFee";
import { useParams } from 'react-router-dom';

const ServiceTaken = () => {
  const [open, setOpen] = useState(false);
  const [aopen, setAOpen] = useState(false);
  const { id } = useParams();

  console.log({id})

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

      <div className="mt-10">
        <div className="flex lg:flex-row flex-col  justify-between ">
          <div className="flex justify-start space-x-10 my-2 w-full items-center">
            <p className="flex justify-center items-center rounded-xl h-8 bg-indigo-500 px-4 text-sm text-white text-center ">
              Service Taken{" "}
            </p>
            <h2 className="mb-3 text-4xl font-bold text-blue-900">
              Every Week{" "}
            </h2>
          </div>
          <div className="flex  justify-start space-x-10 my-2 w-full lg:items-center ">
            <div className="items-center flex flex-col justify-center">
              <p className="flex justify-center items-center rounded-xl h-8 bg-indigo-500 px-4 text-sm text-white text-center ">
                User Cleaning Time{" "}
              </p>
              <div
                className="cursor-pointer flex space-x-3 text-center items-center rounded-md border mt-3  px-3 py-1 shadow-sm bg-gray-50 hover:bg-indigo-50"
                onClick={handleOpen}
              >
                <MdEdit
                  size={18}
                  className="w-6 h-6 text-indigo-600 bg-gray-300 rounded-full p-1"
                />
                <p className="text-sm text-indigo-600 ">Edit</p>
              </div>
            </div>
            <div>
              <div>
                <h2 className="mb-3 lg:text-2xl text-lg font-bold text-blue-900">
                  3.5 Hours
                </h2>
                <div>
                  <span className="bg-indigo-100 rounded-lg font-sans text-lg font-semibold px-2 py-1 text-blue-900 mr-2">
                    Date :
                  </span>

                  <span className="mb-3 lg:text-2xl text-lg font-bold text-blue-900">
                    1/25/2024
                  </span>
                </div>
                <div className="my-4">
                  <span className="bg-orange-200 rounded-lg font-sans text-lg font-semibold px-2 py-1 text-blue-900 mr-2">
                    Time :
                  </span>

                  <span className="mb-3 lg:text-2xl text-lg font-bold text-blue-900">
                    2 : 04
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-gray-200 flex justify-start space-x-10 border-t py-4">
          <div className="flex items-center space-x-1">
            {/* <CheckIcon className='h-5 w-5 text-green-500' /> */}
            <span className="text-gray-700 text-sm font-medium">Have Pets</span>
          </div>
          <div className="flex items-center space-x-1">
            {/* <PawPrintIcon className='text-gray-700 h-5 w-5' /> */}
            <MdPets size={17} className="text-indigo-400" />
            <span className="text-gray-700 text-sm font-medium">Cats</span>
          </div>
        </div>

        <div className="border-gray-200 border-t pt-4">
          <div className="rounded-lg bg-slate-100 p-5 ">
            <div className="flex justify-between">
              <span className="text-gray-700 text-sm">
                Cleaning 648 kr/h x 3.5 h
              </span>
              <span className="text-gray-900 text-sm font-medium">
                2,268 kr
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-700 text-sm">
                Eco-friendly cleaning supplies
              </span>
              <span className="text-gray-900 text-sm font-medium">49 kr</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-700 text-sm font-medium">
                Before RUT deduction
              </span>
              <span className="text-gray-900 text-sm font-medium">
                2,317 kr
              </span>
            </div>

            <div className="flex items-center justify-end w-full mt-5 py-2">
              <button
                className="bg-blue-800 hover:bg-blue-700 text-white text-sm normal px-4 py-2 rounded-xl"
                onClick={handleAdditionOpen}
              >
                + Add Aditional Fee
              </button>
            </div>

            <div className="flex justify-between pt-2">
              <span className="text-gray-800 text-sm font-medium font-sans">
                Additional Fees 1:{" "}
              </span>
              <span className="text-xl font-medium text-blue-800 font-sans">
                1,183 kr
              </span>
            </div>
            <hr />
            <div className="flex justify-between pt-2">
              <span className="text-gray-800 text-sm font-medium font-sans">
                Additional Fees 2:{" "}
              </span>
              <span className="text-xl font-semibold text-blue-800 font-sans">
                1,183 kr
              </span>
            </div>
            <hr />

            <div className="flex justify-between pt-2">
              <span className="text-gray-800 text-lg font-bold font-sans">
                TOTAL PAID :{" "}
              </span>
              <span className="text-2xl font-bold text-blue-800 font-sans">
                1,183 kr
              </span>
            </div>
            <hr />

            <div className="flex justify-between pt-5">
              <span className=" text-lg font-bold text-red-500">
                DUE PAYMENT
              </span>
              <div className="flex space-x-5 justify-center items-center ">
                <span className="text-2xl font-bold text-red-500">500 kr</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddTime open={open} onClose={handleClose} refetch={""} data={""} />
      <AdditionalFee
        open={aopen}
        onClose={handleAdditionClose}
        refetch={""}
        data={""}
      />
    </Fragment>
  );
};

export default ServiceTaken;
