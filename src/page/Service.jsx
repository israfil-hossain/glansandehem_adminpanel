//External Import
import { Box, Breadcrumbs } from "@mui/material";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import {
  MdCancel,
  MdMiscellaneousServices,
  MdRemoveRedEye,
} from "react-icons/md";

//query 
import { useQuery } from "@tanstack/react-query";

//Internal Import
import PackageBreadcrumb from "../components/common/PackageBreadcrumb";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import DefaultTable from "../components/common/DefaultTable";
import CustomSearchField from "../components/common/SearchField";

// headings 
import { userHeading } from "../constants/TableColumns/userHeadings";

// endpoint 
import { API } from "../api/endpoints";
import { useNavigate } from "react-router-dom";

//component 
import AddService from "../components/Service/AddService";

//hook
import usePatch from "../hooks/usePatch";

//calcen function 
import { cancelConfirmation } from "../components/common/Toast/DeleteConfirmation";

import { toast } from "react-toastify";


const Service = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [emailSearch, setEmailSearch] = useState("");
  const [Frequency, setFrequency] = React.useState(null);
  const [id,setId] = useState("")


  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  let url =
    API.GetAllSubscription + `?Page=${page}&PageSize=${size}`
  if(Frequency){
    url += `&Frequency=${Frequency}`
  }
  const {
    data: allService = {},
    isLoading: allServiceLoading,
    refetch: serviceRefetch,
  } = useQuery([url]);

  // `/api/User/GetAll?UserRole=${Frequency}&Page=${page}&PageSize=${size}&Email=${emailSearch}`

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

 

  const handleChange = (event, newValue) => {
    setFrequency(newValue);
  };

  const handleView = (items) => {
    navigate(`/service-taken/${items?._id}`);
  };

  const { mutateAsync: cancelMutate, isLoading: cancelLoading } = usePatch({
    endpoint: API.CancelSubscription+`/${id}`, // Replace with your actual API endpoint
    onSuccess: (data) => {
      toast.success("Subscription Cancel SuccessFully !");
      serviceRefetch();
    },
    onError: (error) => {
   
      toast.error("Something went wrong !");
    },
  });

  const handleDelete = (items) => {
    if (items?._id) {
      cancelConfirmation().then((result) => {
        if (result.isConfirmed) {
          setId(items?._id);
          cancelMutate();
        }
      });
    }
  };
  const conditionActions = [
    {
      icon: <MdRemoveRedEye color="white" size={16} />,
      tooltip: "View",
      handler: handleView,
      bgColor: "bg-blue-500",
      hoverColor: "hover:bg-blue-700",
    },

    {
      icon: <MdCancel color="white" size={16} />,
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
                <MdMiscellaneousServices
                  size={23}
                  className="min-w-max text-[#020a38]"
                />
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
              <button
                className="py-2 bg-[#020a38] text-white rounded-lg px-4 mb-2"
                onClick={handleOpen}
              >
                Add Service
              </button>
            </div>
          </div>
          <div className=" border border-primary bg-white rounded-lg p-0">
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={Frequency}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="All" value={""} />
                  <Tab label="Every Week" value={"EveryWeek"} />
                  <Tab label="Every Second Week" value={"EveryTwoWeeks"} />
                  <Tab label="Every Fourth Week" value={"EveryFourWeeks"} />
                  <Tab label="One Time User" value={"OneTimeOnly"} />
                </Tabs>
              </Box>
              <Box sx={{ p: 0 }}>
                <DefaultTable
                  isLoading={allServiceLoading}
                  headings={userHeading}
                  data={allService || []}
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
      <AddService
        open={open}
        onClose={handleClose}
        refetch={serviceRefetch}
        data={""}
      />
    </Fragment>
  );
};

export default Service;
