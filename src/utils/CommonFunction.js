import { useMediaQuery, useTheme } from "@mui/material";

import { months } from "../constants/Data/constantsData";
import dayjs from "dayjs";
import { deleteConfirmation } from "../components/common/Toast/DeleteConfirmation";
import { useDelete } from "../hooks";

const getCurrentMonth = () => {
  let currentDate = new Date();
  let currentMonthIndex = currentDate.getMonth();
  let currentMonthName = months[currentMonthIndex];

  return currentMonthName.value;
};

const isLargeScreen = () => {
  let theme = useTheme();
  let isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  return isLargeScreen;
};

const formatDateString = (date) => {
  return !!date ? dayjs(date).format("DD MMM, YYYY") : "";
};

export const formatDatewithTime = (date) => {
  return !!date ? dayjs(date).format("DD MMM, YYYY HH:mm:ss") : "";
}

export const convertToTitleCase = (str = "") => {
  if (typeof str !== "string") return str;

  return str
    .toLowerCase()
    .replace(/(?:^|_)([a-z])/g, (_, group) => ` ${group.toUpperCase()}`)
    .replace(/_/g, " ");
};

export const Duration = (size) => {
  if (size < 40) {
    return 2;
  } else if (size >= 41 && size <= 60) {
    return 2.5;
  } else if (size >= 61 && size <= 79) {
    return 3;
  } else if (size >= 80 && size <= 100) {
    return 3.5;
  } else if (size >= 101 && size <= 119) {
    return 4;
  } else if (size >= 120 && size <= 150) {
    return 4.5;
  } else if (size >= 151 && size <= 175) {
    return 5;
  } else if (size >= 176 && size <= 195) {
    return 5.5;
  } else if (size >= 196 && size <= 215) {
    return 6;
  } else if (size >= 216 && size <= 235) {
    return 6.5;
  } else if (size >= 236 && size <= 255) {
    return 7;
  } else if (size >= 256 && size <= 285) {
    return 7.5;
  } else if (size >= 286) {
    return 8;
  }
};


export { formatDateString, getCurrentMonth, isLargeScreen };
