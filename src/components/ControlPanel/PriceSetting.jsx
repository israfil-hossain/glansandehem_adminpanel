import React, { useState } from "react";
import AddCondition from "./AddCondition";
import DefaultTable from "../common/DefaultTable";
import { useQuery } from "@tanstack/react-query";
import { API } from "../../api/endpoints";
import { MdAdd, MdDelete, MdModeEditOutline } from "react-icons/md";
import { CommonButton } from "../common/ui";
import { cleaningPriceHeadings } from "../../constants/TableColumns/headings";

const PriceSetting = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [cleaningPriceData, setCleaningPriceData] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setCleaningPriceData("");
    setOpen(false);
  };

  // get Cleaning Price Data ....
  const {
    data: CleaningPriceData = {},
    isLoading: CleaningPriceLoading,
    refetch: CleaningPriceRefetch,
  } = useQuery([API.GetAllCleaningPrice]);


  const handleCouponEdit = (items) =>{
    setCleaningPriceData(items);
    setOpen(true); 
  }
   // Coupon Action
   const CleaningActions = [
    {
      icon: <MdModeEditOutline color="white" size={16} />,
      tooltip: "Edit",
      handler: handleCouponEdit,
      bgColor: "bg-blue-500",
      hoverColor: "hover:bg-blue-700",
    },
//     {
//       icon: <MdDelete color="white" size={16} />,
//       tooltip: "Delete",
//       handler: handleCouponDelete,
//       bgColor: "bg-red-500",
//       hoverColor: "hover:bg-red-700",
//     },
  ];

  return (
    <div className="border border-primary rounded-lg p-5 bg-white">
      <div className="flex justify-between ">
        <p className="lg:text-lg md:text-md xs:text-sm font-semibold ">
          Cleaner Price Settings
        </p>
        <CommonButton
          text="Add"
          className="bg-primary hover:bg-secondary text-gray-200"
          icon={<MdAdd />}
          onClick={handleOpen}
        />
      </div>
      <div className="mt-4 pb-3 ">
        <DefaultTable
          isLoading={CleaningPriceLoading}
          headings={cleaningPriceHeadings}
          data={CleaningPriceData?.data}
          disablePagination={true}
          size={size}
          setSize={setSize}
          page={page}
          setPage={setPage}
          actionIcons={CleaningActions}
        />
      </div>
      <AddCondition
        open={open}
        onClose={handleClose}
        refetch={CleaningPriceRefetch}
        data={cleaningPriceData}
      />
    </div>
  );
};

export default PriceSetting;
