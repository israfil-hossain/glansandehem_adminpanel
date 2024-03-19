import React, { useState } from "react";
import DefaultTable from "../common/DefaultTable";
import { CommonButton } from "../common/ui";
import { MdAdd, MdDelete, MdModeEditOutline } from "react-icons/md";
import AddCoupon from "./AddCoupon";
import { useQuery } from "@tanstack/react-query";
import { API } from "../../api/endpoints";
import { useDelete } from "../../hooks";
import { toast } from "react-toastify";
import { couponHeadings } from "../../constants/TableColumns/headings";
import { deleteConfirmation } from "../common/Toast/DeleteConfirmation";

const Coupon = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [coupondata, setCouponData] = useState("");
  const [Copen, setCOpen] = useState(false);

  // Function for Coupon ....
  const handleCouponOpen = () => {
    setCOpen(true);
  };
  const handleCouponClose = () => {
    setCOpen(false);
  };

  // get Coupon Data ....
  const {
    data: CouponData = {},
    isLoading: CouponLoading,
    refetch: CouponRefetch,
  } = useQuery([API.GetAllCoupon]);

  // Delte Mutation ....
  const CouponDeleteEndpoint = API.DeleteCoupon;

  const deleteEntry = useDelete({
    endpoint: CouponDeleteEndpoint, // Define the endpoint to delete from
    onSuccess: () => {
        toast.success("Delete Successfull !");
        CouponRefetch();
    },
    onError: (error) => {
      // Handle errors (e.g., display an error message)
    },
  });

  const handleCouponEdit = (item) => {
    setCouponData(item);
    handleCouponOpen();
  };

  const handleCouponDelete = (item) => {
    if (item?._id) {
      deleteConfirmation().then((result) => {
        if (result.isConfirmed) {
            deleteEntry.mutateAsync(item?._id);
          
        }
      });
    }
  };

  // Coupon Action
  const CouponconditionActions = [
    {
      icon: <MdModeEditOutline color="white" size={16} />,
      tooltip: "Edit",
      handler: handleCouponEdit,
      bgColor: "bg-blue-500",
      hoverColor: "hover:bg-blue-700",
    },
    {
      icon: <MdDelete color="white" size={16} />,
      tooltip: "Delete",
      handler: handleCouponDelete,
      bgColor: "bg-red-500",
      hoverColor: "hover:bg-red-700",
    },
  ];

  return (
    <div className="border border-primary rounded-lg p-5 bg-white">
      <div className="flex justify-between ">
        <p className="lg:text-lg md:text-md xs:text-sm font-semibold ">
          Add Coupon
        </p>
        <CommonButton
          text="Add"
          className="bg-primary hover:bg-secondary text-gray-200"
          icon={<MdAdd />}
          onClick={handleCouponOpen}
        />
      </div>
      <div className="mt-4 pb-3 ">
        <DefaultTable
          isLoading={CouponLoading}
          headings={couponHeadings}
          data={CouponData?.data}
          disablePagination={false}
          size={size}
          setSize={setSize}
          page={page}
          setPage={setPage}
          actionIcons={CouponconditionActions}
        />
      </div>
      <AddCoupon
        open={Copen}
        onClose={handleCouponClose}
        refetch={CouponRefetch}
        data={coupondata}
      />
    </div>
  );
};

export default Coupon;
