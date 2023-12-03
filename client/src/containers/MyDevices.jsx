import { useEffect, useState } from "react";
import Axios from "axios";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import IconButton from '@mui/material/IconButton';
import ArticleIcon from '@mui/icons-material/Article';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Link } from "react-router-dom";

const columns = [
  {
    field: "id",
    headerName: "Device ID",
    headerAlign: "center",
    align: "center",
    minWidth: 80,
    flex: 1,
  },
  {
    field: "deviceName",
    headerName: "Device Name",
    headerAlign: "center",
    align: "center",
    minWidth: 200,
    flex: 1,
  },
  {
    field: "installation",
    headerName: "Installation Date",
    headerAlign: "center",
    align: "center",
    minWidth: 155,
    flex: 1,
  },
  {
    field: "sn",
    headerName: "S/N Number",
    headerAlign: "center",
    align: "center",
    minWidth: 155,
    flex: 1,
  },
  {
    field: "band",
    headerName: "Band",
    headerAlign: "center",
    align: "center",
    minWidth: 155,
    flex: 1,
  },
  {
    field: "energytotal",
    headerName: "Energy Total (kWh)",
    headerAlign: "center",
    type: "number",
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
        <IconButton component={Link} to="/realtime" state={{device:params.row.deviceName, id:params.row.id}} aria-label="delete" size="large" >
          <ArticleIcon fontSize="inherit" />
        </IconButton>
        <IconButton component={Link} to="/editdeviceinfo" state={{device:params.row.deviceName}} aria-label="delete" size="large">
          <BorderColorIcon fontSize="inherit" />
        </IconButton>
      </Box>
    ),
  },
];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport csvOptions={{ allColumns: true}} />
    </GridToolbarContainer>
  );
}


const MyDevices = () => {

  const [mydevice, setMydevice] = useState([]);

  useEffect(() => {
    Axios.get("http://119.59.105.226:3333/mydevice")
      .then((response) => {
        response.data.map((val) => {
          setMydevice(val.myDevice);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  

  return (
    <Box>
      <Typography sx={styles.pageTitle} variant="h6">
        My Devices
      </Typography>
      <DataGrid
        rows={mydevice}
        columns={columns}
        pageSize={25}
        rowsPerPageOptions={[25]}
        autoHeight
        rowHeight={70}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </Box>
  );
}

export default MyDevices;

/**
 * @type {import("@mui/material").SxProps}
 */

const styles = {
  pageTitle: {
    mb: 2
  },
  Column: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
};
