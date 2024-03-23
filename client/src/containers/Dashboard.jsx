import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  Box,
  Typography,
} from "@mui/material";

import HistoricalData from './HistoricalData'

// tabpanel
import PropTypes from "prop-types";

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

function Dashboard() {

  // useEffect(() => {

  //   Axios.get("http://127.0.0.1:1880/historical")

  //     .then((response) => {
  //       setHistorical(response.data);
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }, []);

  // const handleHistoricalDetail = async (item) => {
  //   try {
  //     await Axios
  //       .get(
  //         "http://127.0.0.1:1880/historical/detail/" + item.id
  //       )
  //       .then((res) => {
  //         setHistoricalDetail(res.data[0])
  //         console.log(res.data[0])
  //       })
  //       .catch((err) => {
  //         throw err.response.data;
  //       });
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
  
  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <Box>
          <Box sx={{ width: "99%" }}>
            <div className="container mt-4">
              <div className="row"  >
                <div className="col-3">
                  <div class="card rounded-4" style={{ background: `rgb(248, 255, 252`, boxShadow: `0px 2px 2px #9E9E9E` }}>
                    <div class="card-body">
                      <h6 className="card-title">Disposable Used</h6>
                      <div className="text-end text-success"> 20,000 tags</div>
                    </div>
                  </div>
                </div>
                <div className="col-3">
                  <div class="card rounded-4" style={{ background: `rgb(248, 255, 252`, boxShadow: `0px 2px 2px #9E9E9E` }}>
                    <div class="card-body">
                      <h6 className="card-title">Disposable Used</h6>
                      <div className="text-end text-success">20,000 tags </div>
                    </div>
                  </div>
                </div>
                <div className="col-3">
                  <div class="card rounded-4" style={{ background: `rgb(248, 255, 252`, boxShadow: `0px 2px 2px #9E9E9E` }}>
                    <div class="card-body">
                      <h6 className="card-title">Disposable Used</h6>
                      <div className="text-end text-success">20,000 tags </div>
                    </div>
                  </div>
                </div>
                <div className="col-3">
                  <div class="card rounded-4" style={{ background: `rgb(248, 255, 252`, boxShadow: `0px 2px 2px #9E9E9E` }}>
                    <div class="card-body">
                      <h6 className="card-title">Disposable Used</h6>
                      <div className="text-end text-success">20,000 tags </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <HistoricalData />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;

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
