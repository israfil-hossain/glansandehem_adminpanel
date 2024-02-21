import { CiMail, CiPhone } from "react-icons/ci";
import { calender, profile } from "../../assets/images/icons";
import {
  convertToTitleCase,
  formatDateString,
} from "../../utils/CommonFunction";
import { FaUser } from "react-icons/fa";

const userHeading = [
  {
    label: "NAME",
    key: "fullName",
    render: (value, item) => (
      <div className="flex space-x-2 xs:w-40  items-center">
        {item?.profile ? (
          <img
            src={item?.profile}
            alt="User"
            style={{ width: 30, height: 30, borderRadius: "50%" }}
          />
        ) : (
          <div className="bg-gray-200 rounded-full flex justify-center items-center p-2">
            <FaUser size={14} />
          </div>
        )}

        <p>{value}</p>
      </div>
    ),
  },
  {
    label: "ROLE",
    key: "role",
    className: "custom-class",
    render: (value) => (
      <div className="text-sm font-normal">
        <p
          className={`${
            value === "space owners" ? "bg-[#f8f8cd]" : "bg-[#CDF8D8]"
          } rounded-lg p-1 text-center`}
        >
          {convertToTitleCase(value)}
        </p>
      </div>
    ),
  },
  {
    label: "PHONE",
    key: "phoneNumber",
    className: "custom-class",
    render: (value) => (
      <div className="flex space-x-2  items-center w-32">
        <CiPhone className="" size={15} />
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
    label: "JOINED",
    key: "dateJoined",
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

export { userHeading };
