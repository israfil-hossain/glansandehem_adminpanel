import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const DateRangePicker = ({startDate,setStartDate,endDate,setEndDate}) => {
  

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
    if (newValue > endDate) {
      setEndDate(null);
    }
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{ display: 'flex' }}>
        <TextField
          label="Start Date"
          value={startDate}
          onChange={(event) => handleStartDateChange(event.target.value)}
          type="date"
          sx={{ marginRight: 1,width:200,marginTop:1}}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="End Date"
          value={endDate}
          onChange={(event) => handleEndDateChange(event.target.value)}
          type="date"
          sx={{ marginRight: 1,width:200,marginTop:1}}
          InputLabelProps={{ shrink: true }}
          disabled={!startDate}
        />
      </div>
    </LocalizationProvider>
  );
};

export default DateRangePicker;
