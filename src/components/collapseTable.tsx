import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TablePagination from "@mui/material/TablePagination";
import departments from "../assets/departments.json";

function Row(props) {
  const { row, selectedDepartments, setSelectedDepartments } = props;
  const [open, setOpen] = React.useState(false);

  const handleParentDepartmentSelection = () => {
    if (!selectedDepartments.includes(row.department)) {
      setSelectedDepartments((prev) => [
        ...prev,
        row.department,
        ...row.sub_departments,
      ]);
    } else {
      setSelectedDepartments((prev) =>
        prev.filter(
          (dept) =>
            dept !== row.department && !row.sub_departments.includes(dept)
        )
      );
    }
  };

  const handleSubDepartmentSelection = (subDept) => {
    setSelectedDepartments((prev) => {
      if (prev.includes(subDept)) {
        return prev.filter((dept) => dept !== subDept);
      } else {
        return [...prev, subDept];
      }
    });
  };

  const isParentChecked = row.sub_departments.every((subDept) =>
    selectedDepartments.includes(subDept)
  );

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          <Checkbox
            checked={isParentChecked}
            indeterminate={
              selectedDepartments.includes(row.department) && !isParentChecked
            }
            onChange={handleParentDepartmentSelection}
          />
          {row.department}
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  {row.sub_departments.map((historyRow) => (
                    <TableRow key={historyRow}>
                      <TableCell component="th" scope="row">
                        <Checkbox
                          checked={selectedDepartments.includes(historyRow)}
                          onChange={() =>
                            handleSubDepartmentSelection(historyRow)
                          }
                        />
                        {historyRow}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
  const [selectedDepartments, setSelectedDepartments] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 5;

  const handleChangePage = (event,newPage) => {
    setPage(newPage);
  };

  const paginatedDepartments = departments.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Department</b>
              </TableCell>
              <TableCell>
                <b>Sub Departments</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedDepartments.map((row) => (
              <Row
                key={row.key}
                row={row}
                selectedDepartments={selectedDepartments}
                setSelectedDepartments={setSelectedDepartments}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        style={{backgroundColor:'white'}}
        rowsPerPageOptions={[5]}
        component="div"
        count={departments.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </React.Fragment>
  );
}
