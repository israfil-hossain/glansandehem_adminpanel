//External Import
import { Box, Breadcrumbs } from "@mui/material";
import React, { Fragment, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  MdCancel,
  MdMiscellaneousServices,
  MdRemoveRedEye,
} from "react-icons/md";
import { FaFilter } from "react-icons/fa6";

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
import { useDelete } from "../hooks";
import DateRangePicker from "../components/common/DateRangePicker";
import { CommonButton } from "../components/common/ui";

const Service = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [serviceDate, setServiceDate] = useState(null);
  const [endServiceDate, setEndServiceDate] = useState(null);
  const [cleaningDate, setCleaningDate] = useState(null);
  const [endCleaningDate, setEndCleaningDate] = useState(null);
  const [emailSearch, setEmailSearch] = useState("");
  const [Frequency, setFrequency] = React.useState(null);
  const [filter, setFilter] = useState({
    OnlyInactive: false,
    OrderByNextScheduleDate: true,
    FromDate: null,
    ToDate: null,
    ScheduleFromDate: null,
    ScheduleToDate: null,
  });

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const constructUrl = () => {
    let url = `${API.GetAllSubscription}?Page=${page}&PageSize=${size}`;

    if (filter.OnlyInactive) {
      url += `&OnlyInactive=${filter.OnlyInactive}`;
    }
    if (filter.FromDate) {
      url += `&FromDate=${filter.FromDate}`;
    }
    if (filter.ToDate) {
      url += `&ToDate=${filter.ToDate}`;
    }
    if (filter.ScheduleFromDate) {
      url += `&ScheduleFromDate=${filter.ScheduleFromDate}`;
    }
    if (filter.ScheduleToDate) {
      url += `&ScheduleToDate=${filter.ScheduleToDate}`;
    }

    return url;
  };

  const {
    data: allService = {},
    isLoading: allServiceLoading,
    refetch: serviceRefetch,
  } = useQuery([constructUrl()]);

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

  const { mutateAsync: cancelMutate, isLoading: cancelLoading } = useDelete({
    endpoint: API.CancelSubscription, // Replace with your actual API endpoint
    onSuccess: (data) => {
      toast.success("Subscription Cancel SuccessFully !");
      serviceRefetch();
    },
    onError: (error) => {
      toast.error("Something went wrong !");
    },
  });
  const deleteEntry = useDelete({
    endpoint: API.CancelSubscription, // Define the endpoint to delete from
    onSuccess: () => {
      toast.success("Subscription Cancel SuccessFully !");
      serviceRefetch();
    },
    onError: (error) => {
      // Handle errors (e.g., display an error message)
    },
  });

  const handleDelete = (items) => {
    if (items?._id) {
      cancelConfirmation().then((result) => {
        if (result.isConfirmed) {
          deleteEntry.mutateAsync(items?._id);
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

  const handleSort = (type) => {
    if (type === "active") {
      setFilter((prevFilter) => ({
        ...prevFilter,
        OnlyInactive: false,
      }));
    } else if (type === "inactive") {
      setFilter((prevFilter) => ({
        ...prevFilter,
        OnlyInactive: true,
      }));
    } else if (type === "service") {
      setFilter((prevFilter) => ({
        ...prevFilter,
        FromDate: serviceDate,
        ToDate: endServiceDate,
        ScheduleFromDate: cleaningDate,
        ScheduleToDate: endCleaningDate,
      }));
    } else {
      setFilter((prevFilter) => ({
        ...prevFilter,
        OrderByNextScheduleDate: !prevFilter.OrderByNextScheduleDate,
      }));
    }

    serviceRefetch();
  };

  const handleReset = () => {
    setServiceDate("");
    setEndServiceDate("");
    setCleaningDate("");
    setEndCleaningDate("");

    setFilter((prevFilter) => ({
      ...prevFilter,
      OnlyInactive: false,
      OrderByNextScheduleDate: null,
      FromDate: null,
      ToDate: null,
      ScheduleFromDate: null,
      ScheduleToDate: null,
    }));
  };

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
          <div className="flex justify-end mb-4">
            {/* <CustomSearchField name={emailSearch} onChange={setEmailSearch} /> */}

            <div className="p-1 ">
              <button
                className="py-2 bg-[#020a38] text-white rounded-lg px-4 mb-2"
                onClick={handleOpen}
              >
                Add Service
              </button>
            </div>
          </div>
          <div className="lg:px-10 w-full bottom-5 bg-white border  p-4 rounded-lg shadow-lg mb-4">
            <div className="flex space-x-5 px-2 items-center">
              <p className="py-2  text-[#020038]  text-[18px] cursor-pointer font-bold">
                Subscriber :{" "}
              </p>
              <p
                className="py-2 underline text-blue-400 text-[18px] cursor-pointer font-bold"
                onClick={() => handleSort("active")}
              >
                Active
              </p>
              <p
                className="py-2 underline text-red-400 text-[18px] font-bold cursor-pointer"
                onClick={() => handleSort("inactive")}
              >
                InActive
              </p>
            </div>

            <div className="grid lg:grid-cols-2 grid-cols-1">
              <div className="">
                <p className="py-2 text-[14px] font-medium">
                  Search By Service DateRange
                </p>
                <DateRangePicker
                  setStartDate={setServiceDate}
                  startDate={serviceDate}
                  setEndDate={setEndServiceDate}
                  endDate={endServiceDate}
                />
              </div>

              <div className="">
                <p className="py-2 text-[14px] font-medium">
                  Search By Next Schedule DateRange
                </p>
                <DateRangePicker
                  setStartDate={setCleaningDate}
                  startDate={cleaningDate}
                  setEndDate={setEndCleaningDate}
                  endDate={endCleaningDate}
                />
              </div>
            </div>
            <div className="items-center w-full flex justify-center mt-4 space-x-5">
              <CommonButton
                text="Reset"
                type="submit"
                className="border border-primary bg-red-400 text-white hover:bg-purple-950 w-24 flex justify-center items-center"
                onClick={() => handleReset()}
              />
              <CommonButton
                text="Search"
                type="submit"
                className="border border-primary bg-purple-900 text-white hover:bg-purple-950 w-24 flex justify-center items-center"
                onClick={() => handleSort("service")}
              />
            </div>
          </div>
          <div className=" border border-primary bg-white rounded-lg p-0">
            <Box sx={{ width: "100%" }}>
              <div
                sx={{ borderBottom: 1, borderColor: "divider" }}
                className="flex justify-between items-center"
              >
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
              </div>
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
                  handleSort={handleSort}
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
