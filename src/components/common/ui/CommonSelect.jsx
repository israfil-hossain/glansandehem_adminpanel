import React from "react";
import { FormControl,Select, MenuItem } from "@mui/material";

const CommonSelect = ({
  label,
  options,
  value,
  setSelect,
  labelId,
  id,
  border,
  width,
  disabled,
  
}) => {
  
  const handleChange = (event) => {
    setSelect(event.target.value);
  };
  return (
    <div>
      {label ? (
        <div>
          <p className="block text-gray-700 text-sm font-semibold mb-2">{label}</p>
        </div>
      ) : (
        ""
      )}
      <FormControl
        sx={{
          m: 0,
          minWidth: width !== undefined ? width : 120,
          background: "#ffffff",
          borderRadius: 3,
          border: border !== undefined ? border : "none", // Set border to "none" if not provided
        }}
        size="small"
        style={{ border: border !== undefined ? border : "none" }} // Set border to "none" if not provided
      >
        <Select
          labelId={labelId}
          id={id}
          value={value}
          onChange={handleChange}
          label={label}
          disabled={disabled}
          sx={{
            backgroundColor: "#E7E9E2",
            borderRadius: 3,
            boxShadow: 0,
            ".MuiOutlinedInput-notchedOutline": {
              border: border !== undefined ? border : "none",
            },
          }}
        >
          {options?.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default CommonSelect;
