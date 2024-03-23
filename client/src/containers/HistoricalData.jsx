import React, { useState, useMemo, useEffect, useRef } from "react";
import Axios from "axios";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Modal from "../components/Modal";
import ArticleIcon from "@mui/icons-material/Article";
import { DataGrid } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import { useReactToPrint } from 'react-to-print'

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

function HistoricalData() {
  const [historical, setHistorical] = useState({});
  const [historicalDetail, setHistoricalDetail] = useState({});
  const [error, setError] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const componentRef = useRef()

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'MCS+',
    pageStyle: '@page { margin-top: 20mm; margin-bottom: 20mm; }'
  })

  // const filteredRows = useMemo(() => {
  //   if (!searchTerm) return historical;

  //   if (historical.length > 0) {
  //     const attributes = Object.keys(historical[0]);

  //     const list = [];

  //     for (const current of historical) {
  //       for (const attribute of attributes) {
  //         if (attribute === "id") {
  //           continue;
  //         }
  //         const value = current[attribute];
  //         console.log(value)
  //         if (value && value.toLowerCase() === searchTerm.toLowerCase()) {
  //           const found = historical.find((row) => row.id === current.id);
  //           if (found) {
  //             list.push(found);
  //           }
  //         }
  //       }
  //     }
  //     return list;
  //   }

  //   return [];
  // }, [searchTerm, historical]);

  const filteredRows = useMemo(() => {
    if (!searchTerm) return historical;

    if (historical.length > 0) {
      const list = [];

      for (const current of historical) {
        for (const key in current) {
          if (key === "id") {
            continue;
          }
          const value = current[key];
          if (typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())) {
            list.push(current);
            break;
          }
        }
      }
      return list;
    }

    return [];
  }, [searchTerm, historical]);



  useEffect(() => {

    Axios.get("http://127.0.0.1:1880/historical")

      .then((response) => {
        setHistorical(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleHistoricalDetail = async (item) => {
    try {
      await Axios
        .get(
          "http://127.0.0.1:1880/historical/detail/" + item.id
        )
        .then((res) => {
          setHistoricalDetail(res.data[0])
          if (res.data[0].error !== null){
            setError(res.data[0].error)
          }
          console.log(res.data[0])
        })
        .catch((err) => {
          throw err.response.data;
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const columns = [
    { field: "id", headerAlign: "center", align: "center" },
    {
      field: "protocol",
      headerName: "Protocol",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "machine_type",
      headerName: "Machine",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "serial_no",
      headerName: "Serial NO",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "name",
      headerName: "Name",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "donation_number",
      headerName: "Donation NO",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "timestamp",
      headerName: "Start",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      align: "center",
      width: 150,
      renderCell: (params) => (
        <Box sx={styles.Column}>
          <IconButton
            onClick={(e) => handleHistoricalDetail(params)}
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            size="large"
          >
            <ArticleIcon fontSize="inherit" />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <>
      <Box>
        <Box sx={{ flexGrow: 1 }}>
          <Box>
            <Box sx={{ width: "99%" }}>
              <div className="container mt-4">
                <div className="row">
                  <div className="col-6">
                    <h5 className="card-title mt-5">Historical Procedure</h5>
                  </div>
                  <div className="col-6">
                    <div className="mb-2">Label</div>
                    <input
                      type="search"
                      className="form-control rounded w-100"
                      placeholder="Search"
                      aria-label="Search"
                      aria-describedby="search-addon"
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="container mt-2">
                <div className="row">
                  <div className="col-12">
                    <div
                      className="mt-3"
                      style={{ height: 600, width: "100%" }}
                    >
                      <DataGrid
                        sx={{ ml: 2 }}
                        rows={filteredRows}
                        columns={columns}
                        disableSelectionOnClick
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Box>
          </Box>
        </Box>
      </Box>
      <Modal id="exampleModal" title="Historical Detail" modalSize="modal-xl" >
        <div ref={componentRef} >
          <div className="row">
            <div className="col-12">
              <div class="card border rounded-4 border-success">
                <div class="card-body">
                  <h5 className="card-title mt-2 text-success">
                    Donation Information
                  </h5>
                  <div className="row">
                    <div className="col-4">
                      <div>
                        <div className="row">
                          <div className="col-5">
                            <h6>Serial NO</h6>
                          </div>
                          <div className="col-7">{historicalDetail.serial_no}</div>
                        </div>
                      </div>
                      <div>
                        <div className="row">
                          <div className="col-5">
                            <h6>Machine Type</h6>
                          </div>
                          <div className="col-7">{historicalDetail.machine_type}</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div>
                        <div className="row">
                          <div className="col-4">
                            <h6>Protocol</h6>
                          </div>
                          <div className="col-8">{historicalDetail.protocol}</div>
                        </div>
                      </div>
                      <div>
                        <div className="row">
                          <div className="col-4">
                            <h6>Revision</h6>
                          </div>
                          <div className="col-8">{historicalDetail.revision}</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div>
                        <div className="row">
                          <div className="col-5">
                            <h6>Date/Time</h6>
                          </div>
                          <div className="col-7">{historicalDetail.timestamp}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="mt-2">
                <div className="row">
                  <div className="col-12">
                    <div className="card border rounded-4 border-success">
                      <div className="card-body">
                        <h5 className="card-title text-success">
                          Donation And Operator
                        </h5>
                        <div className="mt-4">
                          <div className="row">
                            <div className="col-6">
                              <h6>Donation Number</h6>
                            </div>
                            <div className="col-6">{historicalDetail.donation_number}</div>
                          </div>
                        </div>
                        <div>
                          <div className="row">
                            <div className="col-6">
                              <h6>Donor</h6>
                            </div>
                            <div className="col-6">{historicalDetail.donor}</div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-6">
                            <h6>Venipuncture Operator</h6>
                          </div>
                          <div className="col-6">{historicalDetail.venipuncture_operator}</div>
                        </div>
                        <div className="row">
                          <div className="col-6">
                            <h6>Sex</h6>
                          </div>
                          <div className="col-6">{historicalDetail.sex}</div>
                        </div>
                        <div className="row">
                          <div className="col-6">
                            <h6>Hight</h6>
                          </div>
                          <div className="col-6">{historicalDetail.hight}</div>
                        </div>
                        <div className="row">
                          <div className="col-6">
                            <h6>Weight</h6>
                          </div>
                          <div className="col-6">{historicalDetail.weight}</div>
                        </div>
                        <div className="row">
                          <div className="col-6">
                            <h6>Blood Volume</h6>
                          </div>
                          <div className="col-6">{historicalDetail.blood_volume}</div>
                        </div>
                        <div className="row">
                          <div className="col-6">
                            <h6>HCT</h6>
                          </div>
                          <div className="col-6">{historicalDetail.hct}</div>
                        </div>
                        {/* <div className="row">
                          <div className="col-6">
                            <h6>PLT</h6>
                          </div>
                          <div className="col-6"></div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <div className="row">
                  <div className="col-12">
                    <div className="card border rounded-4 border-success">
                      <div className="card-body">
                        <h5 className="card-title text-success">
                          Disposable used
                        </h5>
                        <table class="table table-bordered text-center mt-4">
                          <thead className="table-secondary">
                            <tr>
                              <th scope="col" className="h7">
                                List No.
                              </th>
                              <th scope="col">Lot No.</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{historicalDetail.disposable_list}</td>
                              <td>{historicalDetail.disposable_lot}</td>
                            </tr>
                          </tbody>
                        </table>
                        <div>
                          <div className="row">
                            <div className="col-6">
                              <h6>Installation Operator</h6>
                            </div>
                            <div className="col-6">{historicalDetail.installation_operator}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <div className="row">
                  <div className="col-12">
                    <div className="card border rounded-4 border-success">
                      <div className="card-body">
                        <h5 className="card-title text-success">
                          Anticoagulant used
                        </h5>
                        <table class="table table-bordered text-center mt-4">
                          <thead className="table-secondary">
                            <tr>
                              <th scope="col">List No.</th>
                              <th scope="col">Lot No.</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{historicalDetail.anticoagulant_list_1}</td>
                              <td>{historicalDetail.anticoagulant_lot_1}</td>
                            </tr>
                            <tr>
                              <td>{historicalDetail.anticoagulant_list_2}</td>
                              <td>{historicalDetail.anticoagulant_lot_2}</td>
                            </tr>
                          </tbody>
                        </table>
                        <div>
                          <div className="row">
                            <div className="col-6">
                              <h6>Verification Operator</h6>
                            </div>
                            <div className="col-6">{historicalDetail.verification_operator}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="row mt-4">
                <div className="col-12">
                  <div className="card border rounded-4 border-success">
                    <div className="card-body">
                      <h5 className="card-title text-success">Remark</h5>
                      <div className="row mt-2">
                        <div className="col-12">
                          <div className="card border rounded-4 border-dark">
                            <div className="card-body">
                              <div style={{ hight: 100 }}>-</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
            <div className="col-6">
              <div className="mt-2">
                <div className="row">
                  <div className="col-12">
                    <div className="card border rounded-4 border-success">
                      <div className="card-body">
                        <h5 className="card-title text-success">
                          Disposable used
                        </h5>
                        <table class="table table-bordered text-center table-sm">
                          <thead className="table-secondary">
                            <tr>
                              <th scope="col">Description</th>
                              <th scope="col">Value</th>
                              <th scope="col">Unit</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* <tr>
                              <td>Sex</td>
                              <td>{historicalDetail.sex}</td>
                            </tr>
                            <tr>
                              <td>Hight</td>
                              <td>{historicalDetail.hight}</td>
                              <td>cm</td>
                            </tr>
                            <tr>
                              <td>Weight</td>
                              <td>{historicalDetail.weight}</td>
                              <td>kg</td>
                            </tr>
                            <tr>
                              <td>Blood Volume</td>
                              <td>{historicalDetail.blood_volume}</td>
                              <td>ml</td>
                            </tr>
                            <tr>
                              <td>HCT</td>
                              <td>{historicalDetail.hct}</td>
                              <td>%</td>
                            </tr>
                            <tr>
                              <td>PLT</td>
                              <td>250</td>
                              <td>10e3</td>
                            </tr> */}
                            <tr>
                              <td>Volume Processed</td>
                              <td>{historicalDetail.volume_processed}</td>
                              <td>ml</td>
                            </tr>
                            <tr>
                              <td>AC Volume Used</td>
                              <td>{historicalDetail.ac_volume_used}</td>
                              <td>ml</td>
                            </tr>
                            <tr>
                              <td>Collection Time</td>
                              <td>{historicalDetail.collection_time}</td>
                              <td>min</td>
                            </tr>
                            <tr>
                              <td>Number of Cycles</td>
                              <td>{historicalDetail.number_of_cycles}</td>
                              <td></td>
                            </tr>
                            <tr>
                              <td>NaCL Volume Used</td>
                              <td>{historicalDetail.nacl_volume_used}</td>
                              <td>ml</td>
                            </tr>
                            <tr>
                              <td>PRP Volume</td>
                              <td>0</td>
                              <td>ml</td>
                            </tr>
                            <tr>
                              <td>AC in Plasma</td>
                              <td>{historicalDetail.ac_in_plasma}</td>
                              <td>ml</td>
                            </tr>
                            <tr>
                              <td>AC in Platelets</td>
                              <td>{historicalDetail.ac_in_platelets}</td>
                              <td>ml</td>
                            </tr>
                            <tr>
                              <td>AC in RBC</td>
                              <td>0</td>
                              <td>ml</td>
                            </tr>
                            <tr>
                              <td>Plasma Volume</td>
                              <td>{historicalDetail.plasma_volume}</td>
                              <td>ml</td>
                            </tr>
                            <tr>
                              <td>RBC Volume</td>
                              <td>0</td>
                              <td>ml</td>
                            </tr>
                            <tr>
                              <td>RBC Additive Vol</td>
                              <td>0</td>
                              <td>ml</td>
                            </tr>
                            <tr>
                              <td>RBC Product Vol</td>
                              <td>0</td>
                              <td>ml</td>
                            </tr>
                            <tr>
                              <td>Platelets Volume</td>
                              <td>{historicalDetail.platelets_volume}</td>
                              <td>ml</td>
                            </tr>
                            <tr>
                              <td>Plt Additive Vol</td>
                              <td>{historicalDetail.plt_additive_vol}</td>
                              <td>ml</td>
                            </tr>
                            <tr>
                              <td>Plt Product Vol</td>
                              <td>{historicalDetail.plt_product_vol}</td>
                              <td>ml</td>
                            </tr>
                            <tr>
                              <td>Estimated Yield</td>
                              <td>{historicalDetail.estimated_yield}</td>
                              <td>10e1</td>
                            </tr>
                            <tr>
                              <td>Target Yield</td>
                              <td>{historicalDetail.target_yield}</td>
                              <td>10e1</td>
                            </tr>
                            <tr>
                              <td>Plt Pre-Count</td>
                              <td>{historicalDetail.plt_pre_count}</td>
                              <td>10e3</td>
                            </tr>
                            <tr>
                              <td>Plt Post-Count</td>
                              <td>{historicalDetail.plt_post_count}</td>
                              <td>10e3</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-12">
              <div className="card border rounded-4 border-success">
                <div className="card-body">
                  <h5 className="card-title text-success">
                    Error
                  </h5>
                  <table class="table table-bordered text-center table-sm">
                    <thead className="table-secondary">
                      <tr>
                        <th scope="col">Code</th>
                        <th scope="col">Timestamp</th>
                        <th scope="col">Notice</th>
                        <th scope="col">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      { error.map((item) => (
                          <tr>
                            <td>{item.code}</td>
                            <td>{item.timestamp}</td>
                            <td>{item.title}</td>
                            <td>{item.detail}</td>
                          </tr>
                        ))
                        }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-end mt-2">
          <button type="button" className="btn btn-success" style={{ marginRight: 5 }} onClick={handlePrint}>Print</button>
          <button type="button" className="btn btn-success" data-bs-dismiss="modal">Close</button>
        </div>

      </Modal>
    </>
  );
}

export default HistoricalData;

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
