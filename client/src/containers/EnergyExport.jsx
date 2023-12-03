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
import Chart from "chart.js/auto";
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

import { Bar } from "react-chartjs-2";

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
      text: "Total Energy",
    },
  },
};

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport csvOptions={{ allColumns: true }} />
    </GridToolbarContainer>
  );
}

const EnergyExport = () => {
  const [value, setValue] = useState(0);
  const [value1, setValue1] = useState();

  const [gender, setGender] = useState("false");

  const [startTime, setStartTime] = useState(
    dayjs().format("DD/MM/YYYY HH:mm")
  );
  const [endTime, setEndTime] = useState(dayjs().format("DD/MM/YYYY HH:mm"));

  const [orderBy, setOrderBy] = useState("ASC");

  const [dataChart, setDataChart] = useState();
  const [device, setDevice] = useState();

  const [dataTable, setDataTable] = useState([]);

  let columns = [
    { field: "deviceName", headerName: "Device Name", width: 200 },
    { field: "data2", headerName: "Min Energy", width: 130 },
    { field: "data3", headerName: "Max Energy", width: 130 },
    { field: "data1", headerName: "Total Energy", width: 130 },
  ];

  let data = {
    labels: device,
    datasets: [
      {
        label: "Total Energy",
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1,
        data: dataChart
      },
    ],
  };

  const getReport = () => {
    Axios.get("http://119.59.105.226:3333/energyexport", {
      params: {
        startTime: startTime,
        endTime: endTime,
        orderBy: orderBy,
      },
    }).then((response) => {
      response.data.map((val) => {
        setDataChart(val.dataChart);
        setDevice(val.device);
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
        <Grid container xs={12} md={12} sx={{ ml: 1 }}>
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
                  <Box sx={{ mt: 2, display: "inline-block" }}>
                    <Button
                      sx={{ fontSize: 13 }}
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
                  <Bar options={options} data={data} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <Box sx={{ height: 800, width: "100%" }}>
                    <DataGrid
                      rows={dataTable}
                      columns={columns}
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

export default EnergyExport;

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
