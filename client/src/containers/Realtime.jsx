import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useLocation } from "react-router-dom";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

import Avatar from "@mui/material/Avatar";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Realtime() {
  const [realtime, setRealtime] = useState([]);
  const [deviceInfo, setDeviceInfo] = useState([]);
 
  useEffect(() => {
    const interval = setInterval(async () => {
      Axios.get("http://119.59.105.226:3333/realtime", {
      params: { device: location.state.device },
    })
      .then((response) => {
        //setRealtime(response.data)
        response.data.map((val) => {
          setRealtime(val.realtime);
          setDeviceInfo(val.deviceInfo)
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, 10000);
    Axios.get("http://119.59.105.226:3333/realtime", {
      params: { device: location.state.device },
    })
      .then((response) => {
        //setRealtime(response.data)
        response.data.map((val) => {
          setRealtime(val.realtime);
          setDeviceInfo(val.deviceInfo)
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  
  console.log(deviceInfo)
  const location = useLocation();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={6} md={4}>
          <Item>
            <Box sx={{ padding: 2 }}>
              <Avatar
                sx={{ width: 140, height: 140, float: "left" }}
                variant="square"
              >
                N
              </Avatar>
              <Box sx={{ float: "right",}}>
                Meter ID
                <Box sx={styles.textboxDetail}>{location.state.id}</Box>
                Meter Name
                <Box sx={styles.textboxDetail}>{location.state.device}</Box>
              </Box>
              <Box sx={{mt:25}}>
                Installation Data
              </Box>
               <Box sx={styles.textboxDetail}>{deviceInfo.installation_data}</Box>
              S/N Number
              <Box sx={styles.textboxDetail}>{deviceInfo.sn_number}</Box>
              Band of meter
              <Box sx={styles.textboxDetail}>{deviceInfo.band}</Box>
              Series of meter
              <Box sx={styles.textboxDetail}>{deviceInfo.series}</Box>
              Remark
              <Box sx={styles.textboxDetail}>{deviceInfo.remark}</Box>
            </Box>
          </Item>
        </Grid>
        <Grid item xs={6} md={8}>
          <Item>
            <Box sx={{ padding: 3  }}>
              <Typography sx={styles.pageTitle} variant="h5">
              Real-time data
              </Typography>
              <div>Current (A)</div>
              L1
              <Box sx={styles.textbox}>{realtime.current_l1}</Box>
              L2
              <Box sx={styles.textbox}>{realtime.current_l2}</Box>
              L3
              <Box sx={styles.textbox}>{realtime.current_l3}</Box>
              AVG
              <Box sx={styles.textbox}>{realtime.current_avg}</Box>
              <div>Voltage (V)</div>
              L1
              <Box sx={styles.textbox}>{realtime.voltage_l1}</Box>
              L2
              <Box sx={styles.textbox}>{realtime.voltage_l2}</Box>
              L3
              <Box sx={styles.textbox}>{realtime.voltage_l3}</Box>
              AVG
              <Box sx={styles.textbox}>{realtime.voltage_avg}</Box>
              <div>Active Power (kW)</div>
              L1
              <Box sx={styles.textbox}>{realtime.activepower_l1}</Box>
              L2
              <Box sx={styles.textbox}>{realtime.activepower_l2}</Box>
              L3
              <Box sx={styles.textbox}>{realtime.activepower_l3}</Box>
              AVG
              <Box sx={styles.textbox}>{realtime.activepower_avg}</Box>
              <div>Reactive Power (kVar)</div>
              L1
              <Box sx={styles.textbox}>{realtime.reactivepower_l1}</Box>
              L2
              <Box sx={styles.textbox}>{realtime.reactivepower_l2}</Box>
              L3
              <Box sx={styles.textbox}>{realtime.reactivepower_l3}</Box>
              AVG
              <Box sx={styles.textbox}>{realtime.reactivepower_avg}</Box>
              <div>Total Energy (kWh)</div>
              L1
              <Box sx={styles.textbox}>{realtime.totalenergy_l1}</Box>
              L2
              <Box sx={styles.textbox}>{realtime.totalenergy_l2}</Box>
              L3
              <Box sx={styles.textbox}>{realtime.totalenergy_l3}</Box>
              TOTAL
              <Box sx={styles.textbox}>{realtime.totalenergy_sum}</Box>
              <div>Power Factor</div>
              L1
              <Box sx={styles.textbox}>{realtime.powerfactor_l1}</Box>
              L2
              <Box sx={styles.textbox}>{realtime.powerfactor_l2}</Box>
              L3
              <Box sx={styles.textbox}>{realtime.powerfactor_l3}</Box>
              AVG
              <Box sx={styles.textbox}>{realtime.powerfactor_avg}</Box>
            </Box>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Realtime;

/**
 * @type {import("@mui/material").SxProps}
 */

const styles = {
  pageTitle: {
    mb: 2,
  },
  textbox: {
    height: 35,
    width: 90,
    display: "inline-block",
    p: 1,
    mx: 1,
    ml: 1,
    mr:2,
    mt: 2,
    mb: 3,
    bgcolor: (theme) =>
      theme.palette.mode === "dark" ? "#101010" : "grey.100",
    color: (theme) => (theme.palette.mode === "dark" ? "grey.300" : "grey.800"),
    border: "1px solid",
    borderColor: (theme) =>
      theme.palette.mode === "dark" ? "grey.800" : "grey.300",
    borderRadius: 2,
    fontSize: "0.875rem",
    fontWeight: "700",
    textAlign: "center",
  },
  textboxDetail: {
    height: 40,
    width: "80%",
    p: 1,
    mx: 1,
    ml: 2,
    mr: 4,
    mt: 1,
    mb: 3,
    bgcolor: (theme) =>
      theme.palette.mode === "dark" ? "#101010" : "grey.100",
    color: (theme) => (theme.palette.mode === "dark" ? "grey.300" : "grey.800"),
    border: "1px solid",
    borderColor: (theme) =>
      theme.palette.mode === "dark" ? "grey.800" : "grey.300",
    borderRadius: 2,
    fontSize: "0.875rem",
    fontWeight: "700",
    textAlign: "center",
  },
};
