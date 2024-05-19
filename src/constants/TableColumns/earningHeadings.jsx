import { CiMail, CiPhone } from "react-icons/ci";
import { calender, profile } from "../../assets/images/icons";
import {
  formatDateString,
} from "../../utils/CommonFunction";

const earningHeadings = [
  {
    label: "NAME",
    key: "x",
    render: (value, item) => (
      <div className="flex space-x-2 xs:w-40  items-center">
        <p>{item?.bookingUser?.fullName}</p>
      </div>
    ),
  },
  
  {
    label: "PHONE",
    key: "phoneNumber",
    className: "custom-class",
    render: (value, item) => (
      <div className="flex space-x-2  items-center w-28">
        <CiPhone className="" size={15} />
        <p>{item?.bookingUser?.phoneNumber}</p>
      </div>
    ),
  },
  {
    label: "Address",
    key: "address",
    className: "custom-class",
    render: (value, item) => (
      <div className="flex space-x-2  items-center w-28">
        <p>{item?.bookingUser?.address}</p>
      </div>
    ),
  },
  {
    label: "PID",
    key: "pidNumber",
    className: "custom-class",
    render: (value, item) => (
      <div className="flex space-x-2  items-center w-28">
        <p>{item?.bookingUser?.pidNumber}</p>
      </div>
    ),
  },
  {
    label: "EMAIL",
    key: "email",
    className: "custom-class",
    render: (value, item) => (
      <div className="flex space-x-2 items-center  ">
        <CiMail className="" size={14} />
        <p className="">{item?.bookingUser?.email}</p>
      </div>
    ),
  },
  {
    label: "Cleaning Information",
    key: "x",
    className: "custom-class",
    render: (value, item) => (
      <div className="space-y-2 items-center w-44 ">
        <p className="text-[10px] ">Cleaning Duration : {item?.cleaningDuration}</p>
        <p className="text-[10px] ">Cleaning Price : {item?.cleaningPrice} Kr</p>
        <p className="text-[10px] ">Discount Amount : {item?.discountAmount} Kr</p>
      </div>
    ),
  },
  {
    label: "Payment Information",
    key: "x",
    className: "custom-class",
    render: (value, item) => (
      <div className="space-y-2 items-center w-44 ">
        <p className="text-[10px] font-semibold">Total Amount Paid : {item?.paymentReceive?.totalPaid} Kr</p>
        <p className="text-[10px] ">Supplies Charge: {item?.suppliesCharges} Kr</p>
        <p className="text-[10px] ">Additional Charges  : {item?.additionalCharges} Kr</p>
      </div>
    ),
  },
  {
    label: "Booking Status",
    key: "bookingStatus",
    render: (value, item) => (
      <div className="flex space-x-2 w-16">
        <p
          className={`px-3 py-1 text-[12px] w-[115px] ${
            value === "BookingCancelled"
              ? "bg-red-300"
              : value === "BookingServed"
              ? "bg-blue-500"
              : value === "BookingCompleted"
              ? "bg-[#a5f9a9a2]"
              : "bg-primary"
          } rounded-lg`}
        >
          {value === "BookingCancelled"
            ? "Cancelled"
            : value === "BookingServed"
            ? "Served"
            : value === "BookingCompleted"
            ? "Completed"
            : "Processing"}
        </p>
      </div>
    ),
  },
  {
    label: "Payment Status",
    key: "paymentStatus",
    render: (value, item) => (
      <div className="flex space-x-2 w-16">
        <p
          className={`px-3 py-1 text-[12px] w-[115px] ${
            value === "PaymentCompleted"
              ? "bg-[#a5f9a9a2] "
              : "bg-red-300" // Use the intended background color for confirmed bookings
          } rounded-lg`}
        >
          {value === "PaymentCompleted"
            ? "Complete"
            : "Pending"}
        </p>
      </div>
    ),
  },

  {
    label: "Service Date",
    key: "cleaningDate",
    className: "custom-class",
    render: (value, item) => (
      <div className="flex space-x-2 w-36">
        <img
          src={calender}
          alt="calender"
          style={{ width: 20, height: 20, borderRadius: "50%" }}
        />
        <p>{formatDateString(value)}</p>
      </div>
    ),
  },
  {
    label: "Payment Date",
    key: "x",
    className: "custom-class",
    render: (value, item) => (
      <div className="flex space-x-2 w-36">
        <img
          src={calender}
          alt="calender"
          style={{ width: 20, height: 20, borderRadius: "50%" }}
        />
        <p>{formatDateString(item?.paymentReceive?.paymentDate)}</p>
      </div>
    ),
  },
];

export { earningHeadings };
