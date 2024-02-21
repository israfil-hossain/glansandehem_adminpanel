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

export const convertToTitleCase = (str = "") => {
  if (typeof str !== "string") return str;

  return str
    .toLowerCase()
    .replace(/(?:^|_)([a-z])/g, (_, group) => ` ${group.toUpperCase()}`)
    .replace(/_/g, " ");
};



export { formatDateString, getCurrentMonth, isLargeScreen };
