import React, { useState } from "react";
import DefaultTable from "../common/DefaultTable";
import { CommonButton } from "../common/ui";
import { MdAdd, MdDelete, MdModeEditOutline } from "react-icons/md";
import AddCoupon from "./AddCoupon";
import { useQuery } from "@tanstack/react-query";
import { API } from "../../api/endpoints";
import { useDelete } from "../../hooks";
import { toast } from "react-toastify";
import { suppliesHeadings } from "../../constants/TableColumns/headings";
import { deleteConfirmation } from "../common/Toast/DeleteConfirmation";
import AddSupplies from "./AddSupplies";

const Supplies = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [supplies, setSuppliesData] = useState("");
  const [open, setOpen] = useState(false);

  // Function for Coupon ....
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // get Coupon Data ....
  const {
    data: suppliesData = {},
    isLoading: SupplieLoading,
    refetch: SuppliesRefetch,
  } = useQuery([API.SuppliesCharge]);


  // Delte Mutation ....
  const CouponDeleteEndpoint = API.DeleteCoupon;

  const deleteEntry = useDelete({
    endpoint: CouponDeleteEndpoint, // Define the endpoint to delete from
    onSuccess: () => {
      toast.success("Delete Successfull !");
      SuppliesRefetch();
    },
    onError: (error) => {
      // Handle errors (e.g., display an error message)
    },
  });

  const handleCouponEdit = (item) => {
    setSuppliesData(item);
    handleOpen();
  };

  // Coupon Action
  const SuppliesAction = [
    {
      icon: <MdModeEditOutline color="white" size={16} />,
      tooltip: "Edit",
      handler: handleCouponEdit,
      bgColor: "bg-blue-500",
      hoverColor: "hover:bg-blue-700",
    },
  ];

  return (
    <div className="border border-primary rounded-lg p-5 bg-white">
      <div className="flex justify-between ">
        <p className="lg:text-lg md:text-md xs:text-sm font-semibold ">
          Supplies Price
        </p>
      </div>
      <div className="mt-4 py-5 flex justify-between rounded-lg px-5 space-x-2 items-center border">
        <p className="text-lg font-medium font-sans">Supplies Charge is : </p>
        <p className="text-lg font-medium font-sans">
          {suppliesData?.data?.suppliesCharge}
        </p>
        <div
          className="bg-blue-500 cursor-pointer hover:bg-blue-600 p-1 rounded-md flex items-center px-3"
          onClick={() => {
            setSuppliesData(suppliesData?.data);
            handleOpen();
          }}
        >
          {" "}
          <MdModeEditOutline color="white" size={16} />{" "}
          <span className="text-white pl-2 ">edit</span>
        </div>
      </div>
      <AddSupplies
        open={open}
        onClose={handleClose}
        refetch={SuppliesRefetch}
        data={supplies}
      />
    </div>
  );
};

export default Supplies;
