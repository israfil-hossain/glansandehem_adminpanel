import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { MdClose } from "react-icons/md";
import { subscribe } from "../../assets";
import UserService from "../../service/UserService";

function PopupModal({ isOpen, onClose }) {
  const [data, setData] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await UserService.getSubscription();
    setData(res?.data[0]?.subscription);
  };
  const modalStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const contentStyle = {
    width: 550, // Set your desired width here
    height: "auto", // Set your desired height here
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "16px",
    position: "relative",
  };
  const closeIconStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    cursor: "pointer",
    color: "red",
  };
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      style={modalStyle}
    >
      <Box sx={contentStyle}>
        <MdClose size={24} onClick={onClose} style={closeIconStyle} />

        <div className="w-full flex justify-center items-center ">
          <img src={subscribe} alt="subscriber" className="w-60 h-60 " />
        </div>
        <div className="flex flex-col w-full justify-center items-center ">
          <span className="text-[24px] text-center pb-2 font-sans font-bold inline-block bg-gradient-to-r from-purple-400 to-emerald-700 text-transparent bg-clip-text">
            For Subscription
          </span>
          <div className="flex flex-col w-full pb-5">
            {data ? <div dangerouslySetInnerHTML={{ __html: data }} /> : ""}
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default PopupModal;
