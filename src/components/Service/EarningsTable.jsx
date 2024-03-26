import React, { useState } from 'react'
import DefaultTable from '../common/DefaultTable'
import { earningHeadings } from '../../constants/TableColumns/earningHeadings'
import { useQuery } from "@tanstack/react-query";
import { API } from '../../api/endpoints';
import CsvDownloader from "react-csv-downloader";


const EarningsTable = ({id}) => {
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);

    const endpoint = id 
    ? `${API.GetAllCleaningBooking}?Page=${page}&PageSize=${size}&BookingUserId=${id}`
    : `${API.GetAllCleaningBooking}?Page=${page}&PageSize=${size}`;
   
    const { data: bookingData = {}, isLoading: bookingLoading } = useQuery([
        endpoint
      ]);

    const downloadData = bookingData?.data?.map((item) => ({
        fullName: item?.bookingUser?.fullName,
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

      
  return (
    <div className="mt-5">
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
  )
}

export default EarningsTable