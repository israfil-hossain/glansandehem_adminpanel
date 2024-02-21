import React from "react";
import { FaRegStar } from "react-icons/fa";
import { PiMapPin } from "react-icons/pi";
import { FaHeart } from "react-icons/fa6";
import { profile } from "../../assets";

const StoreCard = ({ data }) => {
  return (
    <div className="w-[400px] h-[320px] relative ">
      <div className="w-[400px] h-[320px]  left-0 top-0 absolute items-center justify-center flex bg-white rounded-3xl shadow border border-yellow-400">
        <img
          className="w-full px-3 pt-2 top-[5px] absolute rounded-3xl"
          src="https://via.placeholder.com/364x194"
        />
      </div>

      <div className="w-32 h-[37px] p-2 left-[244px] top-[24px] absolute bg-white rounded-lg justify-around items-center  inline-flex">
        <div className="justify-start items-center gap-1 flex">
          <FaRegStar className="text-yellow-500" />
          <div className="text-zinc-800 text-sm font-semibold font-sanse leading-[21px]">
            4.8
          </div>
        </div>
        <div className="text-gray-400 text-xs font-medium font-sanse leading-[14px]">
          345 reviews
        </div>
      </div>

      <div className="w-[292px] h-[21px] left-[16px] top-[258px] absolute justify-start items-center gap-2 inline-flex">
        <PiMapPin />
        <div className="text-gray-400 text-[12px] font-medium font-sanse leading-[18px]">
          Chodkiewicza Karola 111, Chorzów 41-506
        </div>
      </div>
      <div className="w-[364px] h-[27px] left-[16px] top-[287px] absolute">
        <div className="left-0 top-[3px] absolute text-zinc-800 text-sm font-medium font-sanse leading-[21px]">
          Access 24/7
        </div>
        <div className="w-[76px] h-[27px] left-[288px] top-0 absolute justify-start items-center gap-1 inline-flex">
          <div className="text-zinc-800 text-lg font-extrabold font-sanse leading-[27px]">
            $74
          </div>
          <div className="text-gray-400 text-xs font-medium font-sanse leading-[18px]">
            /month
          </div>
        </div>
      </div>
      <div className="w-[364px] h-6 left-[16px] top-[226px] absolute">
        <div className="w-6 h-6 left-[340px] top-0 absolute">
          {" "}
          <FaHeart size={24} className="text-red-500" />
        </div>
        <div className="left-0 top-0 absolute text-zinc-800 text-base font-semibold font-sanse leading-normal">
          Diamond field storage
        </div>

        <div className="w-[58px] h-[22px] left-[266px] top-[1px] absolute">
          <img
            className="w-[22px] h-[22px] left-[36px] top-0 absolute rounded-full border border-white"
            src="https://via.placeholder.com/22x22"
          />
          <img
            className="w-[22px] h-[22px] left-[24px] top-0 absolute rounded-full border border-white"
            src="https://via.placeholder.com/22x22"
          />
          <img
            className="w-[22px] h-[22px] left-[12px] top-0 absolute rounded-full border border-white"
            src="https://via.placeholder.com/22x22"
          />
          <img
            className="w-[22px] h-[22px] left-0 top-0 absolute rounded-full border border-white"
            src="https://via.placeholder.com/22x22"
          />
        </div>
      </div>
      <div className="w-[105px] h-[34px] px-4 py-2 left-[24px] top-[24px] absolute bg-cyan-200 rounded-lg justify-center items-center gap-2 inline-flex">
        <img className="w-[18px] h-[18px] rounded-full" src={profile} />
        <div className="text-zinc-800 text-xs font-semibold font-sanse leading-[18px]">
          Certified
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
