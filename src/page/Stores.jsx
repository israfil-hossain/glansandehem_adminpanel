//External Import
import { Box, Breadcrumbs } from "@mui/material";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

//Internal Import
import PackageBreadcrumb from "../components/common/PackageBreadcrumb";

import { RiStore2Line } from "react-icons/ri";
import CustomSearchField from "../components/common/SearchField";
import StoreCard from "../components/common/StoreCard";

import { months } from "../constants/Data/constantsData";
import { getCurrentMonth } from "../utils/CommonFunction";
import { CommonSelect } from "../components/common/ui";

const Stores = () => {
  const currentMonth = getCurrentMonth();
  const [selectedOption, setSelectedOption] = useState(currentMonth);

  return (
    <Fragment>
      <div>
        <PackageBreadcrumb>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="grey" href="/category">
              <Box sx={{ justifyContent: "center", display: "flex" }}>
                <RiStore2Line size={23} className="min-w-max text-primary" />
                <span className="text-primary ">&nbsp;Stores </span>
              </Box>
            </Link>
          </Breadcrumbs>
        </PackageBreadcrumb>
        <div className="flex justify-between ">
          <div className="p-1 text-lg font-semibold font-sanse">
            <CustomSearchField />
          </div>
          <div className="p-1">
            <CommonSelect
              labelId={"months-select"}
              id={"months-select-id"}
              options={months}
              value={selectedOption}
              setSelect={setSelectedOption}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-5 md:grid-cols-2  grid-cols-1 mt-5">
          <StoreCard />
          <StoreCard />
          <StoreCard />
          <StoreCard />
        </div>
      </div>
    </Fragment>
  );
};

export default Stores;
