import React, { useState } from "react";
import DefaultTable from "../common/DefaultTable";
import { earningHeadings } from "../../constants/TableColumns/earningHeadings";
import { useQuery } from "@tanstack/react-query";
import { API } from "../../api/endpoints";
import CsvDownloader from "react-csv-downloader";
import DateRangePicker from "../common/DateRangePicker";
import { CommonButton } from "../common/ui";

const EarningsTable = ({ id }) => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [paymentFromDate, setPaymentFromDate] = useState(null);
  const [endPaymentDate, setEndPaymentDate] = useState(null);

  const [filter, setFilter] = useState({
    PaymentFromDate: null,
    PaymentToDate: null,
  });

  const constructUrl = () => {
    let url = `${API.GetAllCleaningBooking}?Page=${page}&PageSize=${size}`;

    if (id) {
      url += `&BookingUserId=${id}`;
    }
    if (filter.PaymentFromDate) {
      url += `&PaymentFromDate=${filter.PaymentFromDate}`;
    }
    if (filter.PaymentToDate) {
      url += `&PaymentToDate=${filter.PaymentToDate}`;
    }

    return url;
  };

  const {
    data: bookingData = {},
    isLoading: bookingLoading,
    refetch,
  } = useQuery([constructUrl()]);

  const downloadData = bookingData?.data?.map((item) => ({
    fullName: item?.bookingUser?.fullName,
    phoneNumber: item?.bookingUser?.phoneNumber,
    address: item?.bookingUser?.address,
    pidNumber: item?.bookingUser?.pidNumber,
    email: item?.bookingUser?.email,
    bookingStatus: item?.bookingStatus,
    cleaningDate: item?.cleaningDate,
    cleaningDuration: item?.cleaningDuration,
    cleaningPrice: item?.cleaningPrice,
    discountAmount: item?.discountAmount,
    paymentStatus: item?.paymentStatus,
    additionalCharges: item?.additionalCharges,
    remarks: item?.remarks,
    suppliesCharges: item?.suppliesCharges,
    totalAmount: item?.totalAmount,
    totalPaid: item?.paymentReceive?.totalPaid,
    vatAmount: item?.vatAmount,
  }));

  const headers = [
    { displayName: "Full Name", id: "fullName" },
    { displayName: "Phone Number", id: "phoneNumber" },
    { displayName: "Address ", id: "address" },
    { displayName: "PID Number", id: "pidNumber" },
    { displayName: "Email", id: "email" },
    { displayName: "Booking Status", id: "bookingStatus" },
    { displayName: "Cleaning Date", id: "cleaningDate" },
    { displayName: "Cleaning Duration", id: "cleaningDuration" },
    { displayName: "Cleaning Price", id: "cleaningPrice" },
    { displayName: "Discount Amount", id: "discountAmount" },
    { displayName: "Payment Status", id: "paymentStatus" },
    { displayName: "Additional Charges", id: "additionalCharges" },
    { displayName: "Remarks", id: "remarks" },
    { displayName: "Supplies Charges", id: "suppliesCharges" },
    { displayName: "Total Amount", id: "totalAmount" },
    { displayName: "Total Paid", id: "totalPaid" },
    { displayName: "VAT Amount", id: "vatAmount" },
  ];

  const handleSort = () => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      PaymentFromDate: paymentFromDate,
      PaymentToDate: endPaymentDate,
    }));

    refetch();
  };

  const handleReset = () => {
    setPaymentFromDate("");
    setEndPaymentDate("");

    setFilter((prevFilter) => ({
      ...prevFilter,
      PaymentFromDate: null,
      PaymentToDate: null,
    }));
  };

  return (
    <div className="mt-5">
      <div className="lg:px-8 w-full bottom-5 bg-white border  p-4 rounded-lg shadow-lg mb-4">
        <div className="flex lg:flex-row flex-col justify-between w-full ">
          <div className="flex items-center lg:flex-row flex-col  w-full space-x-4">
            <p className="py-2 text-[16px] font-medium">
              Search By Payment DateRange
            </p>
            <DateRangePicker
              setStartDate={setPaymentFromDate}
              startDate={paymentFromDate}
              setEndDate={setEndPaymentDate}
              endDate={endPaymentDate}
            />
          </div>
          <div className="items-center  flex justify-center mt-4 space-x-5">
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
              onClick={() => handleSort()}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between space-x-5 bg-white border-primary  border border-b-0 rounded-t-lg p-2">
        <div className="p-1 text-lg font-semibold font-sanse">
          Transaction History
        </div>
        <div className="flex p-1 space-x-2">
          <div className="flex justify-center items-center">
            <CsvDownloader
              filename="earning-booking"
              extension=".csv"
              columns={headers}
              datas={downloadData}
              text="DOWNLOAD CSV"
              className="bg-primary px-4 py-1 rounded-md text-[12px] font-semibold"
            />
          </div>
        </div>
      </div>
      <div className="border-primary border">
        <DefaultTable
          isLoading={bookingLoading}
          headings={earningHeadings}
          data={bookingData || []}
          disablePagination={false}
          size={size}
          setSize={setSize}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default EarningsTable;
