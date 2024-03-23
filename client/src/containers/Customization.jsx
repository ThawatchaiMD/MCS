import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Box, Typography, Tab, Tabs, Card, CardContent } from "@mui/material";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import TreeView from "@mui/lab/TreeView";

import IconButton from "@mui/material/IconButton";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import TableChartIcon from "@mui/icons-material/TableChart";
import SearchIcon from "@mui/icons-material/Search";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";

const dateFormatter = date => {
  return dayjs(date).format("YYYY-MM-DD HH:mm");
};

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

const Customization = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [deviceSelected1, setDeviceSelected1] = useState("device1");

  const [arrHour, setArrHour] = useState([])
  const [arr7day, setArr7day] = useState([])
  const [arr30day, setArr30day] = useState([])
 
  // useEffect(() => {
  //   Axios.get("http://119.59.105.226:3333/charttotalenergypeak")

  //     .then((response) => {
  //       response.data.map((val) => {
  //         setArrHour(val.arrHour);
  //         setArr7day(val.arr7day)
  //         setArr30day(val.arr30day)
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }, []);


  return (
    <Box>
      {/* <Box sx={styles.columnsContainer}>
        <Card sx={styles.item}>
          <CardContent>
            <Typography
              sx={{ padding: 3, display: "inline-block" }}
              variant="cardTitle"
            >
              Chart / Table
            </Typography>

            <Autocomplete
              disablePortal
              id="combo-box-demo"
              // options={devicesSelect}
              sx={{ width: 300, display: "inline-block" }}
              clearOnEscape
              onChange={(event, newValue) => {
                setDeviceSelected1(newValue.uuid);
              }}
              renderInput={(params) => <TextField {...params} label="Device" />}
            />

            <Button
              sx={{ display: "inline-block", mt: 3, ml:4}}
              variant="contained"
              color="success"
              endIcon={<SearchIcon />}
            >
              Search
            </Button>
          </CardContent>
        </Card>
      </Box> */}
      {/* <Grid>
        <Box>
          <Box sx={{ width: "99%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                // value={value}
                // onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Past 24 Hr" {...a11yProps(0)} />
                <Tab label="Past 7 Days" {...a11yProps(1)} />
                <Tab label="Past 30 Days" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <ResponsiveContainer width="100%" height={500} className="mt-4">
              <LineChart
                  width={500}
                  height={300}
                  data={arrHour}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="datetime"
                    axisLine={false}
                    tickLine={false}
                    padding={{ left: 20, right: 20 }}
                    fontSize="0.75rem"
                    angle="90"
                    interval={0}
                    tickMargin={50}
                    height={110}
                    tickFormatter={dateFormatter}
                  />
                  <YAxis />
                  <Tooltip labelFormatter = {dateFormatter}/>
                  <Legend />
                  <Line type="monotone" dataKey="peak" fill="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <ResponsiveContainer width="100%" height={500} className="mt-4">
                <LineChart
                  width={500}
                  height={300}
                  data={arr7day}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="datetime"
                    axisLine={false}
                    tickLine={false}
                    padding={{ left: 20, right: 20 }}
                    fontSize="0.75rem"
                    angle="90"
                    interval={0}
                    tickMargin={50}
                    height={110}
                    tickFormatter={dateFormatter}
                  />
                  <YAxis />
                  <Tooltip  labelFormatter = {dateFormatter}/>
                  <Legend/>
                  <Line type="monotone" dataKey="peak" fill="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <ResponsiveContainer width="100%" height={500} className="mt-4">
              <LineChart
                  width={500}
                  height={300}
                  data={arr30day}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="datetime"
                    axisLine={false}
                    tickLine={false}
                    padding={{ left: 20, right: 20 }}
                    fontSize="0.75rem"
                    angle="90"
                    interval={0}
                    tickMargin={50}
                    height={110}
                    tickFormatter={dateFormatter}
                  />
                  <YAxis />
                  <Tooltip labelFormatter = {dateFormatter}/>
                  <Legend />
                  <Line type="monotone" dataKey="peak" fill="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </TabPanel>
          </Box>
        </Box>
      </Grid> */}
    </Box>
  );
};

export default Customization;

/**
 * @type {import("@mui/material").SxProps}
 */

const styles = {
  pageTitle: {
    mb: 2,
  },
  columnsContainer: {
    columns: "500*1",
    maxWidth: "100%",
  },
  item: {
    mb: 2,
  },
};
