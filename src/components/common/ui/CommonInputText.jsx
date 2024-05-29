import React from "react";
import { formatDatewithTime } from "../../../utils/CommonFunction";

export default function CommonInputText({
  name,
  label,
  placeholder,
  value,
  onChange,
  className,
  textformat = "text",
  error,
  ...rest
}) {
  return (
    <div className={`mb-4 mt-4 `}>
      {label && (
        <label
          htmlFor={label}
          className="block text-gray-700 text-sm font-semibold mb-2"
        >
          {label}
        </label>
      )}
      {textformat === "rich" && (
        <textarea
          name={name}
          className={`border border-gray-300  ${className} bg-[#ffffff] rounded-xl py-2 px-3 w-full focus:outline-none focus:ring-1 focus:border-yellow-500 `}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...rest}
        />
      )}
      {textformat === "date_time"&& (
        <input
          type="text"
          name={name}
          className={`border border-gray-300  ${className}  bg-[#E7E9E2] rounded-xl py-2 px-3 w-full focus:outline-none focus:ring-1 focus:border-yellow-500 `}
          placeholder={placeholder}
          value={value}
        
          onChange={onChange}
          {...rest}
        />
      )}
      {textformat === "datetime-local"&& (
        <input
          type="datetime-local"
          name={name}
          className={`border border-gray-300  ${className}  bg-[#ffffff] rounded-xl py-2 px-3 w-full focus:outline-none focus:ring-1 focus:border-yellow-500 `}
          placeholder={placeholder}
          value={value}
         
          onChange={onChange}
          {...rest}
        />
      )}
      {textformat === "checkbox" && (
        <input
          type="checkbox"
          name={name}
          className={` `}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...rest}
        />
      )}
      {textformat === "text" && (
        <input
          type="text"
          name={name}
          className={`border border-gray-300  ${className}  bg-[#ffffff] rounded-xl py-2 px-3 w-full focus:outline-none focus:ring-1 focus:border-yellow-500 `}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...rest}
        />
      )}
    </div>
  );
}
