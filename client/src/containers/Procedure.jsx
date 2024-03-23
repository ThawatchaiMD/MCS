import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
    Box,
    Typography,
} from "@mui/material";

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
                <Box>
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



function Procedure() {
    const [machine, setMachine] = useState([]);
    //   const [monthToMonth, setMonthToMonth] = useState();

    useEffect(() => {
        const interval = setInterval(async () => {
            await Axios.get("http://127.0.0.1:1880/procedure")

                .then((response) => {
                    setMachine(response.data)
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }, 1000);

        Axios.get("http://127.0.0.1:1880/procedure")

            .then((response) => {
                setMachine(response.data)
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    return (


        <div className="container mt-5">
            <h4 className="text-success">Central Monitoring</h4>
            {machine.length > 0
                ? machine.map((item) => (
                    <div className="row border rounded-4 border-success p-5 mt-5">
                        <div className="col-3">
                            <div className="mb-5">
                                <span class="h5">Machine Name</span>
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <span className="text-success h5">{item.serial}</span>
                            </div>

                            {item.status.code === 1000
                                ? 
                                    <div className="row align-items-center">
                                        <div className="col-4 align-items-center">
                                            <i class="fa-solid fa-circle-check text-success fa-4x"></i>
                                        </div>
                                        <div className="col-8">
                                            <h5>READY TO GO</h5>
                                        </div>
                                    </div>
                                : 
                                    <div className="row align-items-center">
                                        <div className="col-4">
                                        <i class="fa-solid fa-circle-exclamation text-danger fa-4x"></i>
                                        </div>
                                        <div className="col-8">
                                            <h5 className="text-danger">{item.status.code}</h5>
                                            <h5 className="text-danger">{item.status.title}</h5>
                                            <h6 className="text-secondary">{item.status.detail}</h6>
                                        </div>
                                    </div>}

                            <div className="mt-5">
                                <span class="h5">Revision</span>
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <span className="text-success h5">{item.revision}</span>
                            </div>
                            <div className="mt-2">
                                <span class="h5">Card Protocol</span>
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <span className="text-success h5">{item.protocol}</span>
                            </div>
                        </div>
                        <div className="col-9">
                            <div className="row">
                                <div className="mb-4">
                                    <span class="h5">Working Status</span>
                                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <span class="h5">Cycle</span>
                                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <span className="text-success h5">{(item.numberOfCycle) + 1}</span>
                                </div>
                                <div className="col-4">
                                    <div className="row align-items-center">
                                        <div className="col-6">
                                            <div>Machine State</div>
                                        </div>
                                        <div className="col-6">
                                            <div class="card border rounded-4" style={{ height: 45 }}>
                                                <div className="card-body">
                                                    <div>{item.machineState}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-2 align-items-center">
                                        <div className="col-6">
                                            <div>Machine SubState</div>
                                        </div>
                                        <div className="col-6">
                                            <div class="card border rounded-4" style={{ height: 45 }}>
                                                <div className="card-body">
                                                    <div>{item.machineSupState}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-2 align-items-center">
                                        <div className="col-6">
                                            <div>Machine Pump State</div>
                                        </div>
                                        <div className="col-6">
                                            <div class="card border rounded-4" style={{ height: 45 }}>
                                                <div className="card-body">
                                                    <div>{item.machinePumpState}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="row mt-2 align-items-center">
                                        <div className="col-6">
                                            <div>PRP Volume</div>
                                        </div>
                                        <div className="col-6">
                                            <div class="card border rounded-4" style={{ height: 45 }}>
                                                <div className="card-body">
                                                    <div>{item.prpVolume}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                                <div className="col-4">
                                    <div className="row align-items-center">
                                        <div className="col-6">
                                            <div>Pump Speed</div>
                                        </div>
                                        <div className="col-6">
                                            <div class="card border rounded-4" style={{ height: 45 }}>
                                                <div className="card-body">
                                                    <div>{item.pumpSpeed}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-2 align-items-center">
                                        <div className="col-6">
                                            <div>Estimated Volume</div>
                                        </div>
                                        <div className="col-6">
                                            <div class="card border rounded-4" style={{ height: 45 }}>
                                                <div className="card-body">
                                                    <div>{item.estimatedVolume}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-2 align-items-center">
                                        <div className="col-6">
                                            <div>Current Volume</div>
                                        </div>
                                        <div className="col-6">
                                            <div class="card border rounded-4" style={{ height: 45 }}>
                                                <div className="card-body">
                                                    <div>{item.currentVolume}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="row align-items-center">
                                        <div className="col-6">
                                            <div>Plasma Volume</div>
                                        </div>
                                        <div className="col-6">
                                            <div class="card border rounded-4" style={{ height: 45 }}>
                                                <div className="card-body">
                                                    <div>{item.plasmaVolume}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-2 align-items-center">
                                        <div className="col-6">
                                            <div>Platelet Volume</div>
                                        </div>
                                        <div className="col-6">
                                            <div class="card border rounded-4" style={{ height: 45 }}>
                                                <div className="card-body">
                                                    <div>{item.plateletVolume}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-2 align-items-center">
                                        <div className="col-6">
                                            <div>Volume Processed</div>
                                        </div>
                                        <div className="col-6">
                                            <div class="card border rounded-4" style={{ height: 45 }}>
                                                <div className="card-body">
                                                    <div>{item.volumeProcessed}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
                : ""}
        </div>
    );
}

export default Procedure;

