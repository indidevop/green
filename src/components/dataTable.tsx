import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 50 },
  {
    field: "userId",
    headerName: "User ID",
    type: "number",
    width: 90,
    editable: true,
  },
  {
    field: "title",
    headerName: "Title",
    width: 150,
    editable: true,
    renderCell: (params) => <div>{capitalizeFirstLetter(params.value)}</div>,
  },
  {
    field: "body",
    headerName: "Body",
    width: 800,
    renderCell: (params) => <div>{capitalizeFirstLetter(params.value)}</div>,
  },
];

export default function DataGridDemo() {
  const [rows, setrows] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      })
      .then((data) => {
        setrows(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    return () => {};
  }, []);
  return (
    <Box sx={{ height: 400, width: "100%", backgroundColor: "white" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        rowHeight={58}
      />
    </Box>
  );
}
