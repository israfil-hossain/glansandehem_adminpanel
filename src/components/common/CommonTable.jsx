import React, { useState } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  IconButton,
  Skeleton,
} from "@mui/material";

const CommonTable = ({
  columns = [],
  data = [],
  isLoading = false,
  fetchData, // You can add a function here to fetch data
  id,
  actionIcons = [],
  onActionClick,
  Paginate,
  serial,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  console.log("Data", data);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table
        id={id}
        sx={{ minWidth: 300, marginBottom: "50px", borderRadius: "25px",borderRadius:"10px",}}
        aria-label="dynamic table"
      >
        <TableHead
          sx={{
            borderRadius: "20px",
          }}
        >
          <TableRow>
            { serial && <TableCell>ID</TableCell> }
            {columns?.map((column, index) => (
              <TableCell
                key={index}
                sx={{
                  textAlign: "center",
                  color: "#5D5D5D",
                  fontSize: "12px",
                  fontWeight: "600",
                  fontFamily: "sans-serif",
                  width: column?.width,
                }}
              >
                {column.label}
              </TableCell>
            ))}
            {actionIcons.length > 0 && <TableCell>Action</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading
            ? Array.from(Array(10)).map((_, index) => (
                <TableRow key={index}>
                  {columns.map((column, colIndex) => (
                    <TableCell key={colIndex}>
                      <Skeleton />
                    </TableCell>
                  ))}
                  {actionIcons.map((icon, iconIndex) => (
                    <TableCell key={iconIndex}>
                      <IconButton>
                        <Skeleton variant="circle" width={40} height={40} />
                      </IconButton>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, dataIndex) => (
                  <TableRow key={item.id}>
                    {columns.map((column, colIndex) => (
                      <TableCell key={colIndex}
                      sx={{
                        textAlign: "center",
                        color: "#787777",
                        fontSize: "10px",
                        fontWeight: "600",
                        fontFamily: "sans-serif",
                        width: column?.width,
                      }}>
                        {column.render
                          ? column.render(item[column.id], item)
                          : item[column.id]}
                      </TableCell>
                    ))}
                    {actionIcons.map((icon, iconIndex) => (
                      <TableCell key={iconIndex}>
                        <IconButton
                          onClick={() =>
                            onActionClick && onActionClick(icon, dataIndex)
                          }
                        >
                          {icon}
                        </IconButton>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
        </TableBody>
      </Table>
      {Paginate && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ background: "linear-gradient(to right, #05E38A, #94FBCE)" }}
        />
      )}
    </TableContainer>
  );
};

export default CommonTable;
