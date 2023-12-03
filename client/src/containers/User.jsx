import { useEffect, useState } from "react";
import Axios from "axios";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import ArticleIcon from "@mui/icons-material/Article";
import DeleteIcon from '@mui/icons-material/Delete';
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
      field: "fname",
      headerName: "First Name",
      headerAlign: "center",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "lname",
      headerName: "Last Name",
      headerAlign: "center",
      minWidth: 155,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      headerAlign: "center",
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
            onClick = {(e) => deleteUser(e, params.row.id)}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            component={Link}
            to="/editdeviceinfo"
            state={{ device: params.row }}
            size="large"
          >
            <BorderColorIcon fontSize="inherit" />
          </IconButton>
        </Box>
      ),
    },
  ];

  useEffect(() => {
    Axios.get("http://119.59.105.226:3333/user")
      .then((response) => {
        response.data.map((val) => {
          setUser(val.user);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const deleteUser = (e, row) => {
    Axios.get("http://119.59.105.226:3333/deleteuser", {
      params: {
        id:row
      },
    }).then((response) => {
      response.data.map((val) => {
        setUser(val.user);
      });
    });
  };

  const addUser = (event) => {
    navigate("/register");
  };

  return (
    <Box>
      <Typography sx={styles.pageTitle} variant="h5">
        User
      </Typography>
      <Button
        variant="contained"
        endIcon={<PersonAddAltOutlinedIcon />}
        sx={{
          mb: 2,
        }}
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
      />
    </Box>
  );
};

export default User;

/**
 * @type {import("@mui/material").SxProps}
 */

const styles = {
  pageTitle: {
    mb: 2,
  },
  Column: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
