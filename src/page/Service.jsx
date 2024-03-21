//External Import
import { Box, Breadcrumbs } from "@mui/material";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

//Internal Import
import { FaUserAlt } from "react-icons/fa";
import PackageBreadcrumb from "../components/common/PackageBreadcrumb";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useQuery } from "@tanstack/react-query";
import DefaultTable from "../components/common/DefaultTable";
import CustomSearchField from "../components/common/SearchField";

import { months } from "../constants/Data/constantsData";
import { userHeading } from "../constants/TableColumns/userHeadings";
import { getCurrentMonth } from "../utils/CommonFunction";
import { CommonSelect } from "../components/common/ui";
import { MdDelete, MdMiscellaneousServices, MdModeEditOutline, MdRemoveRedEye } from "react-icons/md";
import { API } from "../api/endpoints";
import { useNavigate } from 'react-router-dom';
import AddService from "../components/Service/AddService";

const Service = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [emailSearch, setEmailSearch] = useState("");
  const [roleTab, setRoleTab] = React.useState("");
  const currentMonth = getCurrentMonth();

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const subscriptionEndpoint = API.GetAllSubscription + `?Page=${page}&PageSize=${size}`;
  const { data: allService = {}, isLoading: allServiceLoading,refetch:serviceRefetch} = useQuery([
    subscriptionEndpoint
  ]);
  // `/api/User/GetAll?UserRole=${roleTab}&Page=${page}&PageSize=${size}&Email=${emailSearch}`

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  console.log({allService})

  const handleChange = (event, newValue) => {
    setRoleTab(newValue);
  };

  const handleView = (items) =>{
    console.log({items})
    navigate(`/service-taken/${items?._id}`)
    
  }
  const handleEdit = (items) =>{
  }
  const handleDelete = (items) =>{
  }
  const conditionActions = [
    {
      icon: <MdRemoveRedEye  color="white" size={16} />,
      tooltip: "View",
      handler: handleView,
      bgColor: "bg-blue-500",
      hoverColor: "hover:bg-blue-700",
    },
    {
      icon: <MdModeEditOutline color="white" size={16} />,
      tooltip: "Edit",
      handler: handleEdit,
      bgColor: "bg-blue-500",
      hoverColor: "hover:bg-blue-700",
    },
    {
      icon: <MdDelete color="white" size={16} />,
      tooltip: "Delete",
      handler: handleDelete,
      bgColor: "bg-red-500",
      hoverColor: "hover:bg-red-700",
    },
  ];

  return (
    <Fragment>
      <div>
        <PackageBreadcrumb>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="grey" href="/">
              <Box sx={{ justifyContent: "center", display: "flex" }}>
                <MdMiscellaneousServices  size={23} className="min-w-max text-[#020a38]" />
                &nbsp; <span className="text-[#020a38]">Service</span>
              </Box>
            </Link>
          </Breadcrumbs>
        </PackageBreadcrumb>

        <div className="">
          <div className="flex justify-between ">
            <div className="p-1 text-lg font-semibold font-sanse">
              {/* <CustomSearchField name={emailSearch} onChange={setEmailSearch} /> */}
            </div>
            <div className="p-1">
              <button className="py-2 bg-[#020a38] text-white rounded-lg px-4 mb-2" onClick={handleOpen}>Add Service</button>
            </div>
          </div>
          <div className=" border border-primary bg-white rounded-lg p-0">
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={roleTab}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="All" value={""} />
                  <Tab label="Every Week" value={"week"} />
                  <Tab label="Every Second Week" value={"secondweek"} />
                  <Tab label="Every Fourth Week" value={"fourthweek"} />
                  <Tab label="One Time User" value={"onetime"} />
                </Tabs>
              </Box>
              <Box sx={{ p: 0 }}>
                <DefaultTable
                  isLoading={allServiceLoading}
                  headings={userHeading}
                  data={allService?.data || []}
                  disablePagination={false}
                  size={size}
                  setSize={setSize}
                  page={page}
                  setPage={setPage}
                  actionIcons={conditionActions}
                />
              </Box>
            </Box>
          </div>
        </div>
      </div>
      <AddService open={open} onClose={handleClose} refetch={serviceRefetch} data={""} />
    </Fragment>
  );

  
};

export default Service;

