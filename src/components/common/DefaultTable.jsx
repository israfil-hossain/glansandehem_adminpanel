import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import React, { Fragment } from "react";

import CommonTooltip from "./CommonTooltip";
import { CommonSelect } from "./ui";
import { nodata } from "../../assets";

const DefaultTable = ({
  headings,
  data,
  isLoading,
  actionIcons,
  size,
  setSize,
  page,
  setPage,
  disablePagination,
  children,
  actionLabel,
  // scrollToTopOnAction,
}) => {
  const pages = [
    { label: "10", value: 10 },
    { label: "20", value: 20 },
    { label: "50", value: 50 },
    { label: "100", value: 100 },
  ];
 

  return (
    <Fragment>
      <TableContainer
        component={Paper}
        sx={{
          padding: "0px 0px",
          borderRadius: "10px",
          fontSize: "1.1rem",
          width: "100%",
        }}
      >
        <Table
          className="primary-table-bordered table-bordered table-hover"
          sx={{ borderRadius: "20px" }}
        >
          <TableHead>
            <TableRow>
              <TableCell>SL</TableCell>
              {headings?.map((heading, index) => (
                <TableCell
                  key={index}
                  className={heading?.className}
                  style={heading?.style}
                >
                  {heading?.label}
                </TableCell>
              ))}
              {actionIcons && (
                <TableCell align="center" style={{ width: "5%" }}>
                  {actionLabel ? actionLabel : "Action"}
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          {isLoading ? (
            <TableBody>
              {Array.from(Array(10)).map((_, index) => (
                <TableRow key={index}>
                  {headings.map((column, colIndex) => (
                    <TableCell key={colIndex}>
                      <Skeleton />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              {data?.data?.length === 0 || data?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={headings?.length + 1}
                    className="w-full flex justify-center items-center  "
                  >
                    <div className="w-full  rounded-lg h-40 flex flex-col justify-center items-center ">
                      <img src={nodata} alt="nodata" className="w-16 h-16" />
                      <p className="text-sm py-2 font-normal">No Data Found !</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                (data?.data || data)?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{(page - 1) * size + index + 1}</TableCell>
                    {headings?.map((heading, colIndex) => (
                      <TableCell key={colIndex} className={heading.className}>
                        {heading.render
                          ? heading.render(item[heading.key], item)
                          : item[heading.key]}
                      </TableCell>
                    ))}
                    {actionIcons && (
                      <TableCell>
                        <div className="flex space-x-2 justify-center items-center">
                          {actionIcons?.map((action, index) => (
                            <CommonTooltip key={index} text={action.tooltip}>
                              <button
                                key={index}
                                onClick={() => {
                                  action.handler(item);
                                  // scrollToTopOnAction();
                                }}
                                className={`p-1 rounded-md shadow-lg hover:shadow-xl hover:shadow-gray-400 ${action.bgColor} 
                               ${action.hoverColor}`}
                              >
                                {action?.icon}
                              </button>
                            </CommonTooltip>
                          ))}
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
              {children}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {(data?.data?.length > 0 || data?.length > 0) && !disablePagination && (
        <div className="bg-white flex w-full justify-between px-4 py-4 ">
          <CommonSelect
            label="Page"
            id="page-select-id"
            labelId="page-select"
            options={pages}
            value={size}
            setSelect={(value) => {
              setSize(value);
              setPage(1);
            }}
          />

          <div className="flex justify-center items-center">
            <Pagination
              count={data?.totalPages}
              page={page}
              onChange={(event, value) => setPage(value)}
              className="bg-[#cff6cc] p-2 rounded-lg "
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default DefaultTable;
