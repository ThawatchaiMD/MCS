import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  Avatar,
  Box,
  Card,
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

const Popoverdashboard1 = () => {
  const [showButton, setShowButton] = useState(true);

  const [power, setPower] = useState(null);
  const [energy, setEnergy] = useState(null);

  const [anchorEl1, setAnchorEl1] = useState(null);

  const handleClick1 = (event) => {
    Axios.get(import.meta.env.VITE_API_KEY + "/dashboard", {
      params: { deviceName: "S101" },
    })
      .then((response) => {
        //setRealtime(response.data)
        response.data.map((val) => {
          setPower(val.activepower_avg);
          setEnergy(val.totalenergy_sum);
          console.log(val);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setAnchorEl1(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl1(null);
  };

  const open1 = Boolean(anchorEl1);

  const id1 = open1 ? "simple-popover-1" : undefined;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1600) {
        setShowButton(false);
      } else {
        setShowButton(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {showButton && (
        <Box>
          <Button
            variant="outlined"
            sx={{
              position: "absolute",
              top: "23%",
              left: "13.8%",
              width: "80px",
              height: "50px",
            }}
            aria-describedby={id1}
            onClick={handleClick1}
          />

          <Popover
            id={id1}
            open={open1}
            anchorEl={anchorEl1}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <Box sx={{ p: 2 }}>
              <Typography
                variant="body1"
                sx={{ color: "neutral.normal", ml: 4, mr: 4 }}
              >
                Processing Process
              </Typography>
              <Typography variant="body2" sx={{ ml: 2 }}>
                X101
              </Typography>
              <Box sx={{ float: "left", mt: 2 }}>
                <Typography variant="body2" sx={{ color: "neutral.normal" }}>
                  Power
                </Typography>
                <Typography variant="body2" sx={{ color: "neutral.normal" }}>
                  Total Energy
                </Typography>
              </Box>
              <Box sx={{ float: "right", mt: 2 }}>
                <Typography variant="body2" sx={{ color: "neutral.normal" }}>
                  {power} kw
                </Typography>
                <Typography variant="body2" sx={{ color: "neutral.normal" }}>
                  {energy} kw
                </Typography>
              </Box>
              <Box sx={{ mt: 9 }}>
                <Typography
                  variant="body1"
                  sx={{ color: "neutral.normal", float: "left", mt: 1, ml: 4 }}
                >
                  Detail
                </Typography>
                <IconButton
                  sx={{ float: "right" }}
                  component={Link}
                  to="/realtime"
                  state={{ device: "S101", id: 3 }}
                  aria-label="delete"
                  size="large"
                >
                  <ArticleIcon fontSize="inherit" />
                </IconButton>
              </Box>
            </Box>
          </Popover>
        </Box>
      )}
    </div>
  );
};

export default Popoverdashboard1;
