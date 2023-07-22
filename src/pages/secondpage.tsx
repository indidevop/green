import CollapsibleTable from "../components/collapseTable";
import DataGridDemo from "../components/dataTable";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@mui/material";

const secondpage = () => {
  const navigate = useNavigate();

  const clickHandler = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    if (localStorage.getItem("data") == null) {
      alert("Please fill the form first !");
      navigate("/");
    }

    return () => {};
  }, []);

  return (
    <>
      <div style={{ marginBottom: "5vh" }}>
        <Button variant="contained" color="error" onClick={clickHandler}>
          LogOut
        </Button>
      </div>

      <DataGridDemo />
      <br />
      <br />
      <CollapsibleTable />
    </>
  );
};

export default secondpage;
