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
    key: "name",
    render: (value, item) => (
      <div className="flex space-x-2 xs:w-40  items-center">
        {item?.subscribedUser?.profilePicture ? (
          <img
            src={item?.subscribedUser?.profilePicture}
            alt="User"
            style={{ width: 30, height: 30, borderRadius: "50%" }}
          />
        ) : (
          <div className="bg-gray-200 rounded-full flex justify-center items-center p-2">
            <FaUser size={14} />
          </div>
        )}

        <p>{item?.subscribedUser?.fullName}</p>
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
        <p>{item?.subscribedUser?.phoneNumber}</p>
      </div>
    ),
  },
  {
    label: "EMAIL",
    key: "email",
    className: "custom-class",
    render: (value, item) => (
      <div className="flex space-x-2 items-center w-auto overflow-hidden">
        <CiMail className="" size={14} />
        <p className="overflow-x-auto w-full">{item?.subscribedUser?.email}</p>
      </div>
    ),
  },
  {
    label: "Booking Status",
    key: "x",
    render: (value, item) => (
      <div className="flex space-x-2 w-16">
        <p
          className={`px-3 py-1 text-[12px] w-[115px] ${
            item?.currentBooking?.bookingStatus === "BookingCancelled"
              ? "bg-red-300"
              : item?.currentBooking?.bookingStatus === "BookingServed"
              ? "bg-blue-500"
              : item?.currentBooking?.bookingStatus === "BookingCompleted"
              ? "bg-[#a5f9a9a2]"
              : "bg-primary"
          } rounded-lg`}
        >
          {item?.currentBooking?.bookingStatus === "BookingCancelled"
            ? "Cancelled"
            : item?.currentBooking?.bookingStatus === "BookingServed"
            ? "Served"
            : item?.currentBooking?.bookingStatus === "BookingCompleted"
            ? "Completed"
            : "Processing"}
        </p>
      </div>
    ),
  },
  {
    label: "Payment Status",
    key: "x",
    render: (value, item) => (
      <div className="flex space-x-2 w-16">
        <p
          className={`px-3 py-1 text-[12px] w-[115px] ${
            item?.currentBooking?.paymentStatus === "PaymentCompleted"
              ? "bg-[#a5f9a9a2] "
              : "bg-red-300" // Use the intended background color for confirmed bookings
          } rounded-lg`}
        >
          {item?.currentBooking?.paymentStatus === "PaymentCompleted"
            ? "Complete"
            : "Pending"}
        </p>
      </div>
    ),
  },

  {
    label: "Service Date",
    key: "dateJoined",
    className: "custom-class",
    render: (value, item) => (
      <div className="flex space-x-2 w-28">
        <img
          src={calender}
          alt="calender"
          style={{ width: 20, height: 20, borderRadius: "50%" }}
        />
        <p>{formatDateString(item?.currentBooking?.cleaningDate)}</p>
      </div>
    ),
  },
  {
    label: "Next Schedule Date",
    key: "nextSchedule",
    className: "custom-class",
    render: (value, item) => (
      <div className="flex space-x-2 w-28">
        <img
          src={calender}
          alt="calender"
          style={{ width: 20, height: 20, borderRadius: "50%" }}
        />
        <p>{formatDateString(item?.nextScheduleDate)}</p>
      </div>
    ),
  },
];

export { userHeading };
