import { Box } from "@mui/material";
import React from "react";
import { loader } from "../../assets";


export const CommonProgress = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyItems: "center",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height:"100%"
      }}
    >
      <Box
        sx={{
          opacity: 1,
          marginTop:"100px",
          
          alignItems: "center",
        
        }}
      >
        <img
          src={loader}
          alt="loader"
          className="lg:w-[200px] xs:w-[150px] lg:h-[200px] xs:h-[150px] justify-center"
        />
      </Box>
    </Box>
  );
};
