import { FaUser } from "react-icons/fa";
import { calender, profile } from "../../assets/images/icons";
import { formatDateString } from "../../utils/CommonFunction";
import { CiMail } from "react-icons/ci";
import { logo } from "../../assets";


const topUserHeader = [
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
    label: "Total Booking",
    key: "totalBookingCount",
    className: "custom-class",
    render: (value, item) => (
      <div className="flex space-x-2 items-center w-20 overflow-hidden">
        
        <p className="overflow-x-auto w-full">{value}</p>
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
        <p className="overflow-x-auto w-full">{item?.bookingUser?.email}</p>
      </div>
    ),
  },
  {
    label: "Joined Date",
    key: "x",
    className: "custom-class",
    render: (value, item) => (
      <div className="flex space-x-2 w-28">
        <img
          src={calender}
          alt="calender"
          style={{ width: 20, height: 20, borderRadius: "50%" }}
        />
        <p>{formatDateString(item?.bookingUser?.dateJoined)}</p>
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

export {
  topUserHeader,
  permissionHeadings,
  conditionHeadings,
  couponHeadings,
  cleaningPriceHeadings,
  suppliesHeadings,
};
