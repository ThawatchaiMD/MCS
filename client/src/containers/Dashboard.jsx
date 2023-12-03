import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  Box,
  Card,
  Tab,
  Tabs,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ArticleIcon from "@mui/icons-material/Article";
import CircleIcon from "@mui/icons-material/Circle";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList } from "react-window";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

import Popoverdashboard1 from "../components/Popoverdashboard1";
import Popoverdashboard2 from "../components/Popoverdashboard2";
import Customization from "./Customization";

// tabpanel
import PropTypes from "prop-types";
import dayjs from "dayjs";

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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Dashboard() {
  const [maxpeak, setMaxpeak] = useState();
  const [peakTime, setPeakTime] = useState();
  const [sumDay, setSumDay] = useState();
  const [sumMonth, setSumMonth] = useState();
  const [dayToDay, setDayToDay] = useState();
  const [monthToMonth, setMonthToMonth] = useState();

  useEffect(() => {
    const interval = setInterval(async () => {
      await Axios.get("http://119.59.105.226:3333/dashboardtotal")

        .then((response) => {
          response.data.map((val) => {
            if (val.maxpeak.length > 0) {
              setMaxpeak(val.maxpeak[0].peak);
              setPeakTime(val.maxpeak[0].datetime);
            }
            setSumDay(val.sumday);
            setSumMonth(val.summonth);
            setDayToDay(val.daytoday), setMonthToMonth(val.monthtomonth);
            console.log(val);
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }, 10000);

    Axios.get("http://119.59.105.226:3333/dashboardtotal")

      .then((response) => {
        response.data.map((val) => {
          if (val.maxpeak.length > 0) {
            setMaxpeak(val.maxpeak[0].peak);
            setPeakTime(val.maxpeak[0].datetime);
          }
          setSumDay(val.sumday);
          setSumMonth(val.summonth);
          setDayToDay(val.daytoday), setMonthToMonth(val.monthtomonth);
          console.log("1");
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  // tabpanel
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);

  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl1(null);
    setAnchorEl2(null);
  };

  const open1 = Boolean(anchorEl1);
  const open2 = Boolean(anchorEl2);
  const id1 = open1 ? "simple-popover-1" : undefined;
  const id2 = open2 ? "simple-popover-2" : undefined;

  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <Box>
          <Box sx={{ width: "99%" }}>
            <Typography variant="h6">Floor Diagram</Typography>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Floor 1" {...a11yProps(0)} />
                <Tab label="SMDB2.1" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={12}>
                  <Item>
                    <Box sx={styles.contrainerlayoutplan}>
                      <Box>
                        <img
                          src="public/HTC.jpg"
                          alt="abc"
                          height="auto"
                          width="100%"
                          id="image-section"
                        />
                      </Box>
                      <Popoverdashboard1  />
                    </Box>
                  </Item>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={12}>
                  <Item>
                    <Box sx={styles.contrainerlayoutplan}>
                      <Box>
                        <img
                          src="public/HTC.jpg"
                          alt="abc"
                          height="auto"
                          width="100%"
                          id="image-section"
                        />
                      </Box>
                      <Popoverdashboard2 />
                    </Box>
                  </Item>
                </Grid>
              </Grid>
            </TabPanel>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;

/**
 * @type {import("@mui/material").SxProps}
 */

const styles = {
  pageTitle: {
    mb: 2,
  },
  columnsContainer: {
    columns: "280px 3",
    maxWidth: "100%",
  },
  item: {
    mb: 2,
  },
  contrainerlayoutplan: {
    position: "relative",
    //display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
