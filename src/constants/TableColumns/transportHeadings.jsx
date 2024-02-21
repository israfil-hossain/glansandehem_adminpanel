import { CiMail,CiLocationOn, CiPhone } from "react-icons/ci";
import { calender } from "../../assets/images/icons";
import {
  convertToTitleCase,
  formatDateString,
} from "../../utils/CommonFunction";

const transportHeading = [
  {
    label: "NAME",
    key: "fullName",
    render: (value, item) => (
      <div className="flex space-x-2 xs:w-40">
        <img
          src={item.image}
          alt="User"
          style={{ width: 30, height: 30, borderRadius: "50%" }}
        />
        <p>{value}</p>
      </div>
    ),
  },
  {
    label: "EMAIL",
    key: "email",
    className: "custom-class",
    render: (value) => (
      <div className="flex space-x-2 items-center">
        <CiMail className="" size={14} />
        <p>{value}</p>
      </div>
    ),
  },
  {
    label: "PHONE",
    key: "phone",
    className: "custom-class",
    render: (value) => (
      <div className="flex space-x-2  items-center w-32">
        <CiPhone className="" size={15} />
        <p>{value}</p>
      </div>
    ),
  },
  {
    label: "Address",
    key: "address",
    render: (value) => (
      <div className="flex space-x-2  items-center w-32">
      
        <CiLocationOn  size={15}/>
        <p>{value}</p>
      </div>
    ),
  },
  {
    label: "Status",
    key: "status",
    render: (value) => (
      <div className="flex space-x-2  items-center w-32">
        <p className={`px-3 py-1 ${value === "pending" ? "bg-[#dde1028a]" : "bg-[#a5f9a9a2]"}  rounded-lg `}>
            {value}
        </p>
      </div>
    ),
  },
  

  {
    label: "Date AND TIME",
    key: "date_time",
    className: "custom-class",
    render: (value) => (
      <div className="flex space-x-2">
        <img
          src={calender}
          alt="calender"
          style={{ width: 20, height: 20, borderRadius: "50%" }}
        />
        <p>{formatDateString(value)}</p>
      </div>
    ),
  },
];

export { transportHeading };
