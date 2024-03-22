import React from "react";

const GridCard = ({title,value}) => {
  return (
    <div className="grid grid-cols-12 w-full bg-blue-50 rounded-lg px-4 py-2 mx-2 my-2 ">
      <h2 className="col-span-4 font-semibold text-[14px]">{title}</h2>
      <p className="col-span-1">:</p>
      <h2 className="col-span-6 text-lg font-normal font-sans text-[14px]">{value}</h2>
    </div>
  );
};

export default GridCard;
