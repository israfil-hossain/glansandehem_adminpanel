import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PopupModal from "./PopupModal";

const Card = ({
  image,
  title,
  number,
  title2,
  link,
  desc,
  disabled,
  height,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  if (!disabled) {
    return (
      <Link to={link}>
        <motion.div
          className={`cursor-pointer transition max-w-[300px]  duration-500 ease-in-out rounded-lg bg-white h-[250px] items-center text-center justify-center flex flex-col shadow-md backdrop-filter backdrop-blur-sm border
            border-emerald-200 hover:shadow-sm hover:shadow-emerald-600`}
          whileHover={{ scale: 1.03 }}
        >
          <div className="pb-4 pt-2 blur-0 flex justify-center items-center rounded-md t w-full mb-1">
            <img
              src={image}
              alt=""
              className="shadow-sm  shadow-emerald-700 w-32 h-32 mt-4 border-[3px]  border-emerald-700 object-fill rounded-full "
            />
          </div>
          <div className="w-[250px]  border-b-2 border-solid border-slate-200 py-1"></div>
          <div className="p-2  flex flex-col  mb-2 h-[60%]">
          
            <span className="text-emerald-900 font-sans font-bold lg:text-[16px] xs:text-[14px] sm:text-[14px] md:text-[14px]">
              {title}
            </span>

            <span className="text-black text-[12px] py-2">
              🌟 {number} {title2}
            </span>
            {desc ? (
              <span className="text-[12px] text-gray-500 px-4 mb-5 font-normal font-sans">
                {"💡"}
                {desc.split(" ").slice(0, 10).join(" ")}
              </span>
            ) : (
              ""
            )}
          </div>
        </motion.div>
      </Link>
    );
  }
  return (
    <>
      <div
        className="relative"
        title="Attempt this question please buy Subscription account"
        onClick={() => setIsModalOpen(true)}
      >
        <motion.div
          className={`cursor-pointer max-w-[300px] 
          h-[250px]  transition duration-500 ease-in-out rounded-lg bg-white  items-center text-center justify-center  flex flex-col  
      shadow-md  backdrop-filter backdrop-blur-sm border border-red-400 hover:shadow-md hover:shadow-emerald-700 ${
        disabled ? "opacity-60  bg-gray-600" : ""
      }`}
          whileHover={{ scale: 1.02 }}
        >
           <div className="blur-0 flex justify-center items-center rounded-md t w-full mb-1 pb-4 pt-2">
            <img
              src={image}
              alt=""
              className="shadow-sm  shadow-emerald-700 w-32 h-32 mt-4 border-[3px]  border-emerald-700 object-fill rounded-full "
            />
          </div>
          <div className=" w-[250px] border-b-2 border-solid border-slate-200 py-1"></div>
          <div className="p-2  flex flex-col  mb-2 h-[60%]">
            <span className="text-emerald-900 font-sans font-bold lg:text-[16px] xs:text-[14px] sm:text-[14px] md:text-[14px]">
              {title}
            </span>

            <span className="text-black text-[12px] py-2">
              🌟 {number} {title2}
            </span>
            {desc ? (
              <span className="text-[12px] text-gray-500 px-4 mb-3 font-normal font-sans">
                {"💡"}
                {desc.split(" ").slice(0, 15).join(" ")}
              </span>
            ) : (
              ""
            )}
          </div>
        </motion.div>
      </div>
      {isModalOpen && <PopupModal isOpen={isModalOpen} onClose={closeModal} />}
    </>
  );
};

export default Card;
