//External Import
import { Box, Breadcrumbs } from "@mui/material";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";

//icons
import { AiOutlineControl } from "react-icons/ai";
import { MdAdd, MdDelete, MdModeEditOutline } from "react-icons/md";

//Internal Imports
import DefaultTable from "../components/common/DefaultTable";
import PackageBreadcrumb from "../components/common/PackageBreadcrumb";

//Headings ...
import {
  conditionHeadings,
  couponHeadings,
} from "../constants/TableColumns/headings";

//ui imports
import { CommonButton, CommonSelect } from "../components/common/ui";

//hooks and API endpoints
import Coupon from "../components/ControlPanel/Coupon";
import PriceSetting from "../components/ControlPanel/PriceSetting";
import Supplies from "../components/ControlPanel/Supplies";

const ControlPanel = () => {
  return (
    <Fragment>
      <div className=" ">
        <PackageBreadcrumb>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="grey" href="/category">
              <Box sx={{ justifyContent: "center", display: "flex" }}>
                <AiOutlineControl
                  size={23}
                  className="min-w-max text-[#020a38]"
                />
                <span className="text-[#020a38] ">&nbsp; ControlPanel </span>
              </Box>
            </Link>
            {/* <Typography color="grey">sdfgh</Typography> */}
          </Breadcrumbs>
        </PackageBreadcrumb>
        <div className="px-4  ">
          <div className="mb-5">
            {/* Add Coupon */}
            <Coupon />
          </div>
          <div className="grid lg:grid-cols-12 grid-cols-1 gap-6 xs:grid-cols-1">
            <div className="space-y-5 col-span-8">
              {/* Cleaner Price Settings */}
              <PriceSetting />
            </div>
            <div className="col-span-4">
              <Supplies />
            </div>
          </div>
        </div>
        {/* Add New Condition  */}
        {/*  */}
      </div>
    </Fragment>
  );
};

export default ControlPanel;
