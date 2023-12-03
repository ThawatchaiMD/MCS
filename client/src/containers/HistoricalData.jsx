import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  Box,
  Typography,
  Tab,
  Tabs,
  Card,
  CardContent,
  styled,
  Divider,
} from "@mui/material";

import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

//import { DataGrid } from "@mui/x-data-grid";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";

import Paper from "@mui/material/Paper";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import SearchIcon from "@mui/icons-material/Search";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Checkbox from "@mui/material/Checkbox";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function getFullName(params) {
  return `${params.row.firstName || ""} ${params.row.lastName || ""}`;
}

// const columns = [
//   { field: "timestamp", headerName: "Data Time", width: 200 },
//   { field: "data1", headerName: "Device 1", width: 130 },
//   { field: "data2", headerName: "Device 2", width: 130 },
//   { field: "data3", headerName: "Device 3", width: 130 },
// ];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon" },
  { id: 2, lastName: "Lannister", firstName: "Cersei" },
  { id: 3, lastName: "Lannister", firstName: "Jaime" },
  { id: 4, lastName: "Stark", firstName: "Arya" },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys" },
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Historical data",
    },
  },
};

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport csvOptions={{ allColumns: true}} />
    </GridToolbarContainer>
  );
}

const HistoricalData = () => {

  const [value, setValue] = useState(0);
  const [value1, setValue1] = useState();

  const [gender, setGender] = useState("false");

  const [devicesSelect, setDevicesSelect] = useState([]);
  const [deviceSelected1, setDeviceSelected1] = useState();
  const [deviceSelected2, setDeviceSelected2] = useState();
  const [deviceSelected3, setDeviceSelected3] = useState();

  const [dataSelect, setDataSelect] = useState([]);
  const [dataSelected1, setDataSelected1] = useState();
  const [dataSelected2, setDataSelected2] = useState();
  const [dataSelected3, setDataSelected3] = useState();

  const [nameDataSelected1, setNameDataSelected1] = useState();
  const [nameDataSelected2, setNameDataSelected2] = useState();
  const [nameDataSelected3, setNameDataSelected3] = useState();

  const [startTime, setStartTime] = useState(
    dayjs().format("DD/MM/YYYY HH:mm")
  );
  const [endTime, setEndTime] = useState(dayjs().format("DD/MM/YYYY HH:mm"));

  const [orderBy, setOrderBy] = useState("ASC");

  const [data1, setData1] = useState();
  const [data2, setData2] = useState();
  const [data3, setData3] = useState();
  const [timestamp, setTimestamp] = useState();

  const [dataTable, setDataTable] = useState([]);

  const dateFormatter = (timestamp) => {
    return dayjs(timestamp).format("DD/MM/YYYY HH:mm");
  };

  let columns = [
    { field: "timestamp", headerName: "Data Time", width: 200 }
  ];

  let data = {
    labels: timestamp,
    datasets: [
      {
        label: "-",
      }
    ],
  };
  
  if (deviceSelected1 != undefined && dataSelected1 != undefined ){
     data = {
    labels: timestamp,
    datasets: [
      {
        label: dataSelected1 + "-" + nameDataSelected1,
        data: data1,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      }
    ],
  };

  columns = [
    { field: "timestamp", headerName: "Data Time", width: 200 },
    { field: "data1", headerName: dataSelected1 + "-" + nameDataSelected1, width: 130 }
  ];
}

if (deviceSelected1 != undefined && dataSelected1 != undefined && deviceSelected2 != undefined && dataSelected2 != undefined ){
       data = {
      labels: timestamp,
      datasets: [
        {
          label: dataSelected1 + "-" + nameDataSelected1,
          data: data1,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: dataSelected2 + "-" + nameDataSelected2,
          data: data2,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        }
      ],
    };

    columns = [
      { field: "timestamp", headerName: "Data Time", width: 200 },
      { field: "data1", headerName: dataSelected1 + "-" + nameDataSelected1, width: 130 },
      { field: "data2", headerName: dataSelected2 + "-" + nameDataSelected2, width: 130 }
    ];
  }

  if (deviceSelected1 != undefined && dataSelected1 != undefined && deviceSelected2 != undefined && dataSelected2 != undefined && deviceSelected3 != undefined && dataSelected3 != undefined){
      data = {
      labels: timestamp,
      datasets: [
        {
          label: dataSelected1 + "-" + nameDataSelected1,
          data: data1,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: dataSelected2 + "-" + nameDataSelected2,
          data: data2,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
        {
          label: dataSelected3 + "-" + nameDataSelected3,
          data: data3,
          borderColor: "rgb(128, 255, 0)",
          backgroundColor: "rgba(128, 255, 0, 0.5)",
        },
      ],
    };

    columns = [
      { field: "timestamp", headerName: "Data Time", width: 200 },
      { field: "data1", headerName: dataSelected1 + "-" + nameDataSelected1, width: 130 },
      { field: "data2", headerName: dataSelected2 + "-" + nameDataSelected2, width: 130 },
      { field: "data3", headerName: dataSelected3 + "-" + nameDataSelected3, width: 130 },
    ];
  }

  

  useEffect(() => {
    Axios.get("http://119.59.105.226:3333/historicaldata")

      .then((response) => {
        response.data.map((val) => {
          setDevicesSelect(val.deviceName);
          setDataSelect(val.data);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const getReport = () => {
    Axios.get("http://119.59.105.226:3333/historicaldata", {
      params: {
        deviceSelected1: deviceSelected1,
        deviceSelected2: deviceSelected2,
        deviceSelected3: deviceSelected3,
        dataSelected1: dataSelected1,
        dataSelected2: dataSelected2,
        dataSelected3: dataSelected3,
        startTime: startTime,
        endTime: endTime,
        orderBy: orderBy,
      },
    }).then((response) => {
      response.data.map((val) => {
        setData1(val.data1);
        setData2(val.data2);
        setData3(val.data3);
        setTimestamp(val.timestamp);
        setDataTable(val.dataTable);
      });
    });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid item xs={6} md={2.5}>
          <Item>
            <Typography sx={styles.pageTitle} variant="h6">
              Data Select
            </Typography>
            <Typography sx={{ ml: 1 }} variant="h6">
              Device 1
            </Typography>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={devicesSelect}
              sx={{ width: 180, ml: 1, mt: 1 }}
              clearOnEscape
              onChange={(event, value) =>value ? (setDeviceSelected1(value.uuid), setNameDataSelected1(value.label)) : (setDeviceSelected1(event.target.value), setNameDataSelected1(event.target.value))}
              
              // onChange={(event, newValue) => {
              //   setDeviceSelected1(newValue.uuid);
              // }}
              renderInput={(params) => <TextField {...params} label="Device" />}
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={dataSelect}
              sx={{ width: 180, ml: 1, mt: 1 }}
              clearOnEscape
              onChange={(event, value) =>value ? setDataSelected1(value.label) : setDataSelected1(event.target.value)}
              // onChange={(event, newValue) => {
              //   setDataSelected1(newValue.label);
              // }}
              renderInput={(params) => <TextField {...params} label="Data" />} 
            />
            <Divider sx={{ mt: 2 }} />
            <Typography sx={{ ml: 1, mt: 2 }} variant="h6">
              Device 2
            </Typography>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={devicesSelect}
              sx={{ width: 180, ml: 1, mt: 1 }}
              clearOnEscape
              onChange={(event, value) =>value ? (setDeviceSelected2(value.uuid), setNameDataSelected2(value.label)) : (setDeviceSelected2(event.target.value), setNameDataSelected2(event.target.value))}
              // onChange={(event, newValue) => {
              //   setDeviceSelected2(newValue.uuid);
              // }}
              renderInput={(params) => <TextField {...params} label="Device" />}
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={dataSelect}
              sx={{ width: 180, ml: 1, mt: 1 }}
              clearOnEscape
              onChange={(event, value) =>value ? setDataSelected2(value.label) : setDataSelected2(event.target.value)}
              // onChange={(event, newValue) => {
              //   setDataSelected2(newValue.label);
              // }}
              renderInput={(params) => <TextField {...params} label="Data" />}
            />
            <Divider sx={{ mt: 2 }} />
            <Typography sx={{ ml: 1, mt: 2 }} variant="h6">
              Device 3
            </Typography>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={devicesSelect}
              sx={{ width: 180, ml: 1, mt: 1 }}
              clearOnEscape
              onChange={(event, value) =>value ? (setDeviceSelected3(value.uuid), setNameDataSelected3(value.label)) : (setDeviceSelected3(event.target.value), setNameDataSelected3(event.target.value))}
              // onChange={(event, newValue) => {
              //   setDeviceSelected3(newValue.uuid);
              // }}
              renderInput={(params) => <TextField {...params} label="Device" />}
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={dataSelect}
              sx={{ width: 180, ml: 1, mt: 1 }}
              clearOnEscape
              onChange={(event, value) =>value ? setDataSelected3(value.label) : setDataSelected3(event.target.value)}
              // onChange={(event, newValue) => {
              //   setDataSelected3(newValue.label);
              // }}
              renderInput={(params) => <TextField {...params} label="Data" />}
            />
            <Divider sx={{ mt: 2 }} />
          </Item>
        </Grid>

        <Grid container xs={12} md={9} sx={{ ml: 1 }}>
          <Grid item xs={12} md={12}>
            <Item>
              <Box sx={{ padding: 3 }}>
                <Box sx={{ float: "left" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DateTimePicker"]}>
                      <DateTimePicker
                        label="Start Time"
                        ampm={false}
                        inputFormat="YYYY/MM/DD hh:mm"
                        sx={{ width: 100 }}
                        onChange={(newValue) => setStartTime(newValue)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Box>
                <Box>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DateTimePicker"]}>
                      <DateTimePicker
                        label="End Time"
                        sx={{ width: 100, ml: 3 }}
                        ampm={false}
                        inputFormat="YYYY/MM/DD hh:mm"
                        onChange={(newValue) => setEndTime(newValue)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Box>

                <Box>
                  <Typography
                    sx={{ mt: 3, display: "inline-block" }}
                    variant="h6"
                  >
                    Sort
                  </Typography>
                  <Box sx={{ mt: 1, ml: 1, display: "inline-block" }}>
                    <Button
                      sx={{
                        fontSize: 13,
                      }}
                      variant="contained"
                      onClick={() => setOrderBy("ASC")}
                    >
                      Ascending
                    </Button>
                    <Button
                      sx={{
                        ml: 1,
                        fontSize: 13,
                      }}
                      variant="contained"
                      onClick={() => setOrderBy("DESC")}
                    >
                      Decending
                    </Button>
                    <Button
                      sx={{ ml: 5, fontSize: 13 }}
                      variant="contained"
                      color="success"
                      endIcon={<SearchIcon />}
                      onClick={getReport}
                    >
                      Search
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Item>
          </Grid>
          <Grid item xs={12} md={12} sx={{ mt: 1 }}>
            <Item>
              <Box sx={{ padding: 3 }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    <Tab label="chart" {...a11yProps(0)} />
                    <Tab label="table" {...a11yProps(1)} />
                  </Tabs>
                </Box>

                <TabPanel value={value} index={0}>
                  <Line options={options} data={data} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <Box sx={{ height: 800, width: "100%" }}>
                    <DataGrid
                      rows={dataTable} columns={columns}
                      checkboxSelection
                      components={{
                        Toolbar: CustomToolbar,
                      }}
                    />
                  </Box>
                </TabPanel>
              </Box>
            </Item>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HistoricalData;

/**
 * @type {import("@mui/material").SxProps}
 */

const styles = {
  pageTitle: {
    mb: 2,
    mt: 1,
  },
  columnsContainer: {
    columns: "280px 3",
    maxWidth: "100%",
  },
  item: {
    mb: 2,
  },
};
