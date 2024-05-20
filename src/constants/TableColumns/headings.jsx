import { FaUser } from "react-icons/fa";
import { calender, profile } from "../../assets/images/icons";
import { formatDateString, formatTime, getDayName } from "../../utils/CommonFunction";
import { CiMail } from "react-icons/ci";
import dayjs from "dayjs";

const upcomingHeading = [
  {
    label: "NAME",
    key: "x",
    render: (value, item) => (
      <div className="flex space-x-2 xs:w-40  items-center">
        <p>{item?.subscribedUser?.fullName}</p>
      </div>
    ),
  },
  {
    label: "EMAIL",
    key: "email",
    className: "custom-class",
    render: (value, item) => (
      <div className="flex space-x-2 items-center ">
        <CiMail className="" size={14} />
        <p className="overflow-x-auto w-full">{item?.subscribedUser?.email}</p>
      </div>
    ),
  },

  {
    label: "Phone Number",
    key: "x",
    render: (value, item) => (
      <div className="flex space-x-2 xs:w-40  items-center">
        <p>{item?.subscribedUser?.phoneNumber}</p>
      </div>
    ),
  },
  {
    label: "Address",
    key: "x",
    render: (value, item) => (
      <div className="w-32 items-center">
        <p>{item?.subscribedUser?.address}</p>
        <p className="text-[12px] font-normal">Postal Code: {item?.postalCode}</p>
        <p className="text-[12px] font-normal">PID: {item?.subscribedUser?.pidNumber}</p>
      </div>
    ),
  },
  {
    label: "Area",
    key: "x",
    render: (value, item) => (
      <div className="flex items-center w-16">
        <p>{item?.areaInSquareMeters} m<sup>2</sup></p>
      </div>
    ),
  },
  {
    label: "Frequency",
    key: "x",
    render: (value, item) => (
      <div className="flex space-x-2 xs:w-40  items-center">
        <p>{item?.subscriptionFrequency}</p>
      </div>
    ),
  },
  {
    label: "Next Schedule Date",
    key: "nextScheduleDate",
    className: "custom-class",
    render: (value, item) => (
      <div className="flex flex-col space-x-2 items-center w-32 overflow-hidden bg-purple-300 text-center rounded-lg py-1">
        <p className="overflow-x-auto w-full">{formatDateString(item?.currentBooking?.cleaningDate)}</p>
        <p>{getDayName(value)}</p>
      </div>
    ),
  },
  {
    label: "Booking Time Range",
    key: "nextScheduleDate",
    className: "custom-class",
    render: (value, item) => (
      <div className="flex space-x-2 items-center w-32 overflow-hidden bg-green-300 text-center rounded-lg py-1">
        <p className="overflow-x-auto w-full">
          {formatTime(dayjs(item?.currentBooking?.cleaningDate))} {" - "}
          {formatTime(
            dayjs(item?.currentBooking?.cleaningDate).add(
              item?.cleaningDurationInHours,
              "hour"
            )
          )}
        </p>
      </div>
    ),
  },

];

const permissionHeadings = [
  {
    label: "NAME",
    key: "name",
    className: "custom-class",
    render: (value, item) => (
      <div className="flex space-x-2">
        <img
          src={item.image}
          alt="User"
          style={{ width: 30, height: 30, borderRadius: "50%" }}
        />
        <p>{value}</p>
      </div>
    ),
  },
];

const conditionHeadings = [
  {
    label: "Cleaning NAME",
    key: "cleaningName",
    className: "custom-class",
  },
  {
    label: "Cleaning Price",
    key: "cleaningPrice",
    className: "custom-class",
  },
  {
    label: "STATUS",
    key: "isActive",
    className: "custom-class",
    render: (value) => (
      <div className="text-sm font-normal">
        <p
          className={`${
            value === true ? "bg-[#CDF8D8]" : "bg-[#fcbab1]"
          } w-28 rounded-lg p-1 text-center`}
        >
          {value ? "Active" : "Inactive"}
        </p>
      </div>
    ),
  },
];

const couponHeadings = [
  {
    label: "Coupon Name",
    key: "couponCode",
    className: "custom-class",
  },
  {
    label: "Discount Percentage",
    key: "discountPercentage",
    className: "custom-class",
  },
  {
    label: "Maximum Discount",
    key: "maximumDiscount",
    className: "custom-class",
  },
  {
    label: "STATUS",
    key: "isActive",
    className: "custom-class",
    render: (value) => (
      <div className="text-sm font-normal">
        <p
          className={`${
            value === true ? "bg-[#CDF8D8]" : "bg-[#fcbab1]"
          } w-28 rounded-lg p-1 text-center`}
        >
          {value ? "Active" : "Inactive"}
        </p>
      </div>
    ),
  },
];

const suppliesHeadings = [
  {
    label: "Supplies Charge",
    key: "suppliesCharge",
    className: "custom-class",
  },
];

const cleaningPriceHeadings = [
  {
    label: "Price Name",
    key: "subscriptionFrequency",
    className: "custom-class",
  },
  {
    label: "Cleaning Price",
    key: "subscriptionPrice",
    className: "custom-class",
  },
  {
    label: "Description",
    key: "description",
    className: "custom-class",
  },
  {
    label: "STATUS",
    key: "isActive",
    className: "custom-class",
    render: (value) => (
      <div className="text-sm font-normal">
        <p
          className={`${
            value === true ? "bg-[#CDF8D8]" : "bg-[#fcbab1]"
          } w-28 rounded-lg p-1 text-center`}
        >
          {value ? "Active" : "Inactive"}
        </p>
      </div>
    ),
  },
];


const paymentHeadings = [
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
       
        <p>{item?.bookingUser?.phoneNumber}</p>
      </div>
    ),
  },
  
  {
    label: "EMAIL",
    key: "email",
    className: "custom-class",
    render: (value, item) => (
      <div className="flex space-x-2 items-center  ">
        
        <p className="">{item?.bookingUser?.email}</p>
      </div>
    ),
  },
  
  {
    label: "Payment Amount",
    key: "x",
    className: "custom-class",
    render: (value, item) => (
      <div className="space-y-2 items-center w-36 ">
        <p className="text-[10px] font-semibold">Total Amount Paid : {item?.paymentReceive?.totalPaid} Kr</p>
        <p className="text-[10px] ">Supplies Charge: {item?.suppliesCharges} Kr</p>
        <p className="text-[10px] ">Additional Charges  : {item?.additionalCharges} Kr</p>
      </div>
    ),
  },
  {
    label: "Total Paid",
    key: "x",
    className: "custom-class",
    render: (value, item) => (
      <div className="space-y-2 items-center w-16 text-center py-1 rounded-lg bg-yellow-300">
        <p className="text-[10px] font-semibold">{item?.paymentReceive?.totalPaid} Kr</p>
       
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
    label: "Payment Date",
    key: "cleaningDate",
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

export {
  paymentHeadings,
  upcomingHeading,
  permissionHeadings,
  conditionHeadings,
  couponHeadings,
  cleaningPriceHeadings,
  suppliesHeadings,
};
