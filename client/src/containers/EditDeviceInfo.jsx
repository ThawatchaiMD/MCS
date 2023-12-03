import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";

const EditDeviceInfo = () => {
  const [installData, setInstallData] = useState("");
  const [SNNumber, setSNNumber] = useState("");
  const [band, setBand] = useState("");
  const [series, setSeries] = useState("");
  const [remark, setRemark] = useState("");

  const location = useLocation();

  const device = location.state.device;
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("http://119.59.105.226:3333/editdeviceinfo", {
      params: { device: device },
    })
      .then((response) => {
        response.data.map((val) => {
          setInstallData(val.installation_data);
          setSNNumber(val.sn_number);
          setBand(val.band);
          setSeries(val.series);
          setRemark(val.remark);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const updatedeviceinfo = () => {
    Axios.get("http://119.59.105.226:3333/editdeviceinfo", {
      params: {
        installData: installData,
        SNNumber: SNNumber,
        band: band,
        series: series,
        remark: remark,
        device: device,
      },
    }).then((response) => {
      navigate('/mydevices')
    });
  };


  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <h3 className="mb-4">Edit device information</h3>

      <div className="mb-3">
        <TextField
          id="outlined-controlled"
          label="Installation Data"
          value={installData}
          onChange={(event) => {
            setInstallData(event.target.value);
          }}
        />
      </div>
      <div className="mb-3">
        <TextField
          id="outlined-uncontrolled"
          label="S/N Number"
          value={SNNumber}
          onChange={(event) => {
            setSNNumber(event.target.value);
          }}
        />
      </div>
      <div className="mb-3">
        <TextField
          id="outlined-uncontrolled"
          label="Band of meter"
          value={band}
          onChange={(event) => {
            setBand(event.target.value);
          }}
        />
      </div>
      <div className="mb-3">
        <TextField
          id="outlined-uncontrolled"
          label="Series of meter"
          value={series}
          onChange={(event) => {
            setSeries(event.target.value);
          }}
        />
      </div>
      <div className="mb-3">
        <TextField
          id="outlined-uncontrolled"
          label="Remark"
          value={remark}
          onChange={(event) => {
            setRemark(event.target.value);
          }}
        />
      </div>
      <Button
        sx={{ ml: 5, fontSize: 13 }}
        variant="contained"
        color="warning"
        endIcon={<EditIcon />}
        onClick={updatedeviceinfo}
      >
        Update
      </Button>
    </Box>
  );
};

export default EditDeviceInfo;
