import React from "react";
import { profile } from "../../assets";

import { IoSend } from "react-icons/io5";
import { CommonInputText } from "../common/ui";


const Chat = () => {
  return (
    <div className="w-full h-[82vh] flex flex-col justify-between ">
      <div className="flex space-x-2 border-b border-primary pb-5 px-4 ">
        <img src={profile} alt="profile" className="w-12 h-12 rounded-full" />
        <div>
          <p className="text-[16px] text-gray-800">Cody Fisher </p>
          <p className="text-[12px] text-gray-400">
            Ut enim ad minima veniam st.
          </p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto px-4 scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-200">
        <div className="px-4 py-8">
          <div className="flex gap-3">
            <div className="w-12 h-12 rounded-full bg-rose-400 p-0.5">
              <img
                src="https://pbs.twimg.com/profile_images/1397151839850729475/1FvqSN6H_400x400.jpg"
                alt="user"
                className="h-full w-full object-cover rounded-full"
              />
            </div>

            <div className="text-sm p-5 w-[75%] bg-slate-600 text-slate-100 rounded-lg relative before:absolute before:content-[''] before:w-3 before:h-3 before:bg-slate-600 before:rotate-45 before: before:-left-1 before:top-4">
              <p>Hi There!</p>
              <p>
                Looking to get Started? I can help answer to your personal
                questions!
              </p>
            </div>
          </div>
        </div>

        <div className="px-4 py-8">
          <div className="flex items-center justify-end gap-3">
          <div className="text-sm p-5 w-[75%] bg-slate-600 text-slate-100 rounded-lg relative ">
            <p>Hi There!</p>
            <p>
              Looking to get Started? I can help answer your personal
              questions!
            </p>
          </div>
          </div>
        </div>
      </div>

      <div className="flex space-x-3 px-5">
        <CommonInputText placeholder={"Type here"} className="w-full " />
        <button>
          <IoSend
            size={50}
            className="text-white bg-primary hover:bg-[#b8b242] p-2 rounded-full "
          />
        </button>
      </div>
    </div>
  );
};

export default Chat;
