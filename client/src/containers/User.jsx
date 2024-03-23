import { useEffect, useState } from "react";
import Axios from "axios";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Link } from "react-router-dom";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { useNavigate } from "react-router-dom";

const User = () => {
  let navigate = useNavigate();
  const [user, setUser] = useState([]);

  const columns = [
    {
      field: "id",
      headerName: "User ID",
      headerAlign: "center",
      align: "center",
      minWidth: 80,
      flex: 1,
    },
    {
      field: "first_name",
      headerName: "First Name",
      headerAlign: "center",
      align: "center",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "last_name",
      headerName: "Last Name",
      headerAlign: "center",
      align: "center",
      minWidth: 155,
      flex: 1,
    },
    {
      field: "username",
      headerName: "Email",
      headerAlign: "center",
      align: "center",
      minWidth: 155,
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      align: "center",
      minWidth: 200,
      flex: 1,
      renderCell: (params) => (
        <Box sx={styles.Column}>
          <IconButton
            size="large"
            onClick={(e) => deleteUser(e, params.row.id)}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Box>
      ),
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await Axios.get(import.meta.env.VITE_APP_API + "/user/list")
        .then((response) => {
          console.log(response.data);
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = (e, row) => {
    Axios.get(import.meta.env.VITE_APP_API + "/user/remove", {
      params: {
        id: row,
      },
    }).then((response) => {
      fetchData();
    });
  };

  const addUser = (event) => {
    navigate("/register");
  };

  return (
    <div className="App container" >
      <Typography sx={styles.pageTitle} variant="h5">
        User
      </Typography>
      <Button
        variant="contained"
        endIcon={<PersonAddAltOutlinedIcon />}
        sx={{
          mb: 2,
          float: "light",
        }}
        color="success"
        onClick={addUser}
      >
        Add User
      </Button>
      <DataGrid
        rows={user}
        columns={columns}
        pageSize={25}
        rowsPerPageOptions={[25]}
        autoHeight
        rowHeight={70}
        disableSelectionOnClick
      />
    </div>
  );
};

export default User;

/**
 * @type {import("@mui/material").SxProps}
 */

const styles = {
  pageTitle: {
    mt: 4,
    mb: 2,
  },
  Column: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
