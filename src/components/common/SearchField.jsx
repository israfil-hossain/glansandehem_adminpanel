import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function CustomSearchField({ name = "", onChange = () => {} }) {
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);

    return () => {
      clearTimeout(delayDebounceFn);
    };
  }, [value]);

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  return (
    <Paper
      component="form"
      width={{
        lg: 320,
        xs: "100%",
        sm: "100%",
        md: 250,
      }}
      sx={{
        borderRadius: 4,
        boxShadow: 0,
        p: "2px 4px",
        mb: "8px",
        display: "flex",
        alignItems: "center",
        width: { xs: "100%", sm: "100%", lg: 400, md: 300 },
        backgroundColor: "white",
        "&:hover": {
          backgroundColor: "#FDFDC6",
        },
      }}
    >
      <IconButton type="button" sx={{ p: "8px" }} aria-label="search">
        <FiSearch />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={`${name}`}
        value={value}
        onChange={handleChange}
        inputProps={{ "aria-label": "Search Information " }}
      />
    </Paper>
  );
}
