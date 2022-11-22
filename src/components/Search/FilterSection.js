import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Pagination from "@mui/material/Pagination";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return windowSize;
}

const FilterSection = () => {
  const size = useWindowSize();

  const [age, setAge] = React.useState("");
  const [age2, setAge2] = React.useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(8);

  const indexOfLastPage = currentPage * postPerPage;
  const indexOfFirstPage = indexOfLastPage - postPerPage;
  const currentAuctions = 20;

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleChange2 = (event) => {
    setAge2(event.target.value);
  };

  return (
    <div style={{ height: "fit-content", width: "100%" }}>
      <div
        style={{
          background: "#DEECD3",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <div
          style={{
            width: "30%",
            display: size.width < 700 ? "none" : "block",
            padding: "20px 0px",
            fontSize: "20px",
            fontWeight: "400",
          }}
        >
          Sales
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row-reverse",
            width: size.width < 700 ? "100%" : "60%",
            fontSize: "14px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: "15px" }}> Export to :</span>
            <span>
              <FormControl>
                <Select
                  size="small"
                  value={age}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  style={{ width: "fit-content", background: "#FFFFFF" }}
                >
                  <MenuItem value="">
                    <em style={{ fontSize: "14px" }}>Select</em>
                  </MenuItem>
                  <MenuItem value={10}>CSV</MenuItem>
                  <MenuItem value={20}>PDF</MenuItem>
                </Select>
              </FormControl>
            </span>

            <span style={{ marginLeft: "15px" }}>
              <Button
                style={{
                  background: "#599f22",
                  color: "#FFFFFF",
                  textTransform: "none",
                }}
                variant="contained"
              >
                Export
              </Button>
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          height: "fit-content",
          display: "flex",
          marginTop: "40px",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: size.width < 700 ? "column" : "row",
        }}
      >
        <div
          style={{
            width: size.width < 700 ? "100%" : "25%",
            margin: "15px 0px",
          }}
        >
          <TextField
            fullWidth
            size="small"
            id="outlined-basic"
            label="Order"
            variant="outlined"
            style={{ background: "#FFFFFF" }}
          />
        </div>
        <div
          style={{
            width: size.width < 700 ? "100%" : "25%",
            margin: "15px 0px",
          }}
        >
          <TextField
            fullWidth
            size="small"
            id="outlined-basic"
            label="Auction ID"
            variant="outlined"
            style={{ background: "#FFFFFF" }}
          />
        </div>
        <div
          style={{
            width: size.width < 700 ? "100%" : "25%",
            margin: "15px 0px",
          }}
        >
          <TextField
            fullWidth
            size="small"
            id="outlined-basic"
            label="Auction"
            variant="outlined"
            style={{ background: "#FFFFFF" }}
          />
        </div>
      </div>

      <div
        style={{
          width: "100%",
          height: "fit-content",
          marginTop: "40px",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: size.width < 700 ? "column" : "row",
        }}
      >
        <div
          style={{
            width: size.width < 700 ? "100%" : "25%",
            margin: "15px 0px",
          }}
        >
          <div style={{ marginBottom: "10px" }}>Auction End</div>
          <TextField
            fullWidth
            InputLabelProps={{
              shrink: true,
              FormLabelClasses: {
                root: {
                  "&:focused": {
                    color: "white",
                  },
                },
                focused: "true",
              },
            }}
            type="date"
            size="small"
            id="outlined-basic"
            label="From"
            variant="outlined"
            style={{ background: "#FFFFFF" }}
          />

          <TextField
            fullWidth
            type="date"
            InputLabelProps={{
              shrink: true,
              FormLabelClasses: {
                root: {
                  "&:focused": {
                    color: "white",
                  },
                },
                focused: "true",
              },
            }}
            size="small"
            id="outlined-basic"
            label="To"
            variant="outlined"
            style={{ background: "#FFFFFF", marginTop: "10px" }}
          />
        </div>
        <div
          style={{
            width: size.width < 700 ? "100%" : "25%",
            margin: "15px 0px",
          }}
        >
          <div style={{ marginBottom: "10px" }}>Customer</div>
          <TextField
            fullWidth
            InputLabelProps={{
              shrink: true,
              FormLabelClasses: {
                root: {
                  "&:focused": {
                    color: "white",
                  },
                },
                focused: "true",
              },
            }}
            type="date"
            size="small"
            id="outlined-basic"
            label="From"
            variant="outlined"
            style={{ background: "#FFFFFF" }}
          />
        </div>
        <div
          style={{
            width: size.width < 700 ? "100%" : "25%",
            margin: "15px 0px",
          }}
        >
          <div style={{ marginBottom: "10px" }}>Status</div>
          <div style={{ width: "100%" }}>
            <Select
              size="small"
              fullWidth
              value={age2}
              onChange={handleChange2}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              style={{ background: "#FFFFFF" }}
            >
              <MenuItem value="">
                <em style={{ fontSize: "14px" }}>Select</em>
              </MenuItem>
              <MenuItem value={10}>CSV</MenuItem>
              <MenuItem value={20}>PDF</MenuItem>
            </Select>
          </div>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          height: "fit-content",
          display: "flex",
          marginTop: "40px",
          justifyContent: "space-between",
          flexDirection: size.width < 700 ? "column" : "row",
        }}
      >
        <div
          style={{
            width: size.width < 700 ? "100%" : "25%",
            margin: "15px 0px",
          }}
        >
          <div style={{ marginBottom: "10px" }}>Date Paid</div>
          <TextField
            fullWidth
            InputLabelProps={{
              shrink: true,
              FormLabelClasses: {
                root: {
                  "&:focused": {
                    color: "white",
                  },
                },
                focused: "true",
              },
            }}
            type="date"
            size="small"
            id="outlined-basic"
            label="From"
            variant="outlined"
            style={{ background: "#FFFFFF" }}
          />

          <TextField
            fullWidth
            type="date"
            InputLabelProps={{
              shrink: true,
              FormLabelClasses: {
                root: {
                  "&:focused": {
                    color: "white",
                  },
                },
                focused: "true",
              },
            }}
            size="small"
            id="outlined-basic"
            label="To"
            variant="outlined"
            style={{ background: "#FFFFFF", marginTop: "10px" }}
          />
        </div>
        <div
          style={{
            width: size.width < 700 ? "100%" : "25%",
            margin: "15px 0px",
          }}
        >
          <div style={{ marginBottom: "10px" }}>Date Close</div>
          <TextField
            fullWidth
            InputLabelProps={{
              shrink: true,
              FormLabelClasses: {
                root: {
                  "&:focused": {
                    color: "white",
                  },
                },
                focused: "true",
              },
            }}
            type="date"
            size="small"
            id="outlined-basic"
            label="From"
            variant="outlined"
            style={{ background: "#FFFFFF" }}
          />

          <TextField
            fullWidth
            type="date"
            InputLabelProps={{
              shrink: true,
              FormLabelClasses: {
                root: {
                  "&:focused": {
                    color: "white",
                  },
                },
                focused: "true",
              },
            }}
            size="small"
            id="outlined-basic"
            label="To"
            variant="outlined"
            style={{ background: "#FFFFFF", marginTop: "10px" }}
          />
        </div>
        <div
          style={{
            width: size.width < 700 ? "100%" : "25%",
            margin: "15px 0px",
          }}
        >
          <div style={{ marginBottom: "10px" }}>Career</div>
          <TextField
            fullWidth
            InputLabelProps={{
              shrink: true,
              FormLabelClasses: {
                root: {
                  "&:focused": {
                    color: "white",
                  },
                },
                focused: "true",
              },
            }}
            type="date"
            size="small"
            id="outlined-basic"
            label="From"
            variant="outlined"
            style={{ background: "#FFFFFF" }}
          />

          <TextField
            fullWidth
            type="date"
            InputLabelProps={{
              shrink: true,
              FormLabelClasses: {
                root: {
                  "&:focused": {
                    color: "white",
                  },
                },
                focused: "true",
              },
            }}
            size="small"
            id="outlined-basic"
            label="To"
            variant="outlined"
            style={{ background: "#FFFFFF", marginTop: "10px" }}
          />
        </div>
      </div>

      <div
        style={{
          width: "100%",
          height: "fit-content",
          display: "flex",
          alignItems: "center",
          marginTop: "40px",
          justifyContent: "space-between",
          flexDirection: size.width < 700 ? "column" : "row",
        }}
      >
        <div
          style={{
            width: size.width < 700 ? "100%" : "25%",
            margin: "15px 0px",
          }}
        >
          <TextField
            fullWidth
            size="small"
            id="outlined-basic"
            label="Tracking"
            variant="outlined"
            style={{ background: "#FFFFFF" }}
          />
        </div>
        <div
          style={{
            width: size.width < 700 ? "100%" : "25%",
            margin: "15px 0px",
          }}
        >
          <TextField
            fullWidth
            size="small"
            id="outlined-basic"
            label="SKU"
            variant="outlined"
            style={{ background: "#FFFFFF" }}
          />
        </div>
        <div
          style={{
            width: size.width < 700 ? "100%" : "25%",
            margin: "15px 0px",
          }}
        >
          <TextField
            fullWidth
            size="small"
            id="outlined-basic"
            label="Lot ID"
            variant="outlined"
            style={{ background: "#FFFFFF" }}
          />
        </div>
      </div>

      <div
        style={{
          width: "100%",
          height: "fit-content",
          display: "flex",
          marginTop: "40px",
          justifyContent: "space-between",
          flexDirection: size.width < 700 ? "column" : "row",
        }}
      >
        <div
          style={{
            width: size.width < 700 ? "100%" : "25%",
            margin: "15px 0px",
          }}
        >
          <div style={{ marginBottom: "10px" }}>Customer Company</div>
          <TextField
            fullWidth
            size="small"
            id="outlined-basic"
            label="Customer Company"
            variant="outlined"
            style={{ background: "#FFFFFF" }}
          />
        </div>
        <div
          style={{
            width: size.width < 700 ? "100%" : "25%",
            margin: "15px 0px",
          }}
        >
          <div style={{ marginBottom: "10px" }}>Seller payment ref.</div>
          <TextField
            fullWidth
            size="small"
            id="outlined-basic"
            label="Seller Payment Ref. Num."
            variant="outlined"
            style={{ background: "#FFFFFF" }}
          />
        </div>
        <div
          style={{
            width: size.width < 700 ? "100%" : "25%",
            margin: "15px 0px",
          }}
        >
          <div style={{ marginBottom: "10px" }}>Date Shipped</div>
          <TextField
            fullWidth
            type="date"
            size="small"
            id="outlined-basic"
            label="From"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
              FormLabelClasses: {
                root: {
                  "&:focused": {
                    color: "white",
                  },
                },
                focused: "true",
              },
            }}
            style={{ background: "#FFFFFF" }}
          />

          <TextField
            fullWidth
            type="date"
            size="small"
            id="outlined-basic"
            label="To"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
              FormLabelClasses: {
                root: {
                  "&:focused": {
                    color: "white",
                  },
                },
                focused: "true",
              },
            }}
            style={{ background: "#FFFFFF", marginTop: "10px" }}
          />
        </div>
      </div>

      <div
        style={{
          width: "100%",
          height: "fit-content",
          display: "flex",
          marginTop: "40px",
          justifyContent: "space-between",
          flexDirection: size.width < 700 ? "column" : "row",
        }}
      >
        <div
          style={{
            width: size.width < 700 ? "100%" : "25%",
            margin: "15px 0px",
          }}
        >
          <div style={{ marginBottom: "10px" }}>BID</div>
          <TextField
            fullWidth
            size="small"
            id="outlined-basic"
            label="SKU"
            variant="outlined"
            style={{ background: "#FFFFFF" }}
          />

          <TextField
            fullWidth
            size="small"
            id="outlined-basic"
            label="LOT"
            variant="outlined"
            style={{ background: "#FFFFFF", marginTop: "10px" }}
          />
        </div>
        <div
          style={{
            width: size.width < 700 ? "100%" : "25%",
            margin: "15px 0px",
          }}
        >
          <div style={{ marginBottom: "10px" }}>Winning Amount</div>
          <TextField
            fullWidth
            size="small"
            id="outlined-basic"
            label="From"
            variant="outlined"
            style={{ background: "#FFFFFF" }}
          />

          <TextField
            fullWidth
            size="small"
            id="outlined-basic"
            label="To"
            variant="outlined"
            style={{ background: "#FFFFFF", marginTop: "10px" }}
          />
        </div>
        <div
          style={{
            width: size.width < 700 ? "100%" : "25%",
            margin: "15px 0px",
          }}
        >
          <div style={{ marginBottom: "10px" }}>Shipping Amount</div>
          <TextField
            fullWidth
            size="small"
            id="outlined-basic"
            label="From"
            variant="outlined"
            style={{ background: "#FFFFFF" }}
          />

          <TextField
            fullWidth
            size="small"
            id="outlined-basic"
            label="To"
            variant="outlined"
            style={{ background: "#FFFFFF", marginTop: "10px" }}
          />
        </div>
      </div>

      <div
        style={{
          width: "100%",
          height: "fit-content",
          display: "flex",
          marginTop: "40px",
          justifyContent: "space-between",
          flexDirection: size.width < 700 ? "column" : "row",
        }}
      >
        <div
          style={{
            width: size.width < 700 ? "100%" : "25%",
            margin: "15px 0px",
          }}
        >
          <div style={{ marginBottom: "10px" }}>Shipping Type</div>
          <TextField
            fullWidth
            size="small"
            id="outlined-basic"
            label="Type"
            variant="outlined"
            style={{ background: "#FFFFFF" }}
          />
        </div>
        <div
          style={{
            width: size.width < 700 ? "100%" : "25%",
            margin: "15px 0px",
          }}
        >
          <div style={{ marginBottom: "10px" }}>TAX Amount</div>
          <TextField
            fullWidth
            size="small"
            id="outlined-basic"
            label="From"
            variant="outlined"
            style={{ background: "#FFFFFF" }}
          />

          <TextField
            fullWidth
            size="small"
            id="outlined-basic"
            label="To"
            variant="outlined"
            style={{ background: "#FFFFFF", marginTop: "10px" }}
          />
        </div>
        <div
          style={{
            width: size.width < 700 ? "100%" : "25%",
            margin: "15px 0px",
          }}
        >
          <div style={{ marginBottom: "10px" }}>Units</div>
          <TextField
            fullWidth
            size="small"
            id="outlined-basic"
            label="Units"
            variant="outlined"
            style={{ background: "#FFFFFF" }}
          />
        </div>
      </div>

      <div
        style={{
          width: "100%",
          height: "fit-content",
          display: "flex",
          marginTop: "40px",
          justifyContent: "space-between",
          flexDirection: size.width < 700 ? "column" : "row",
        }}
      >
        <div
          style={{
            width: size.width < 700 ? "100%" : "25%",
            margin: "15px 0px",
          }}
        >
          <div style={{ marginBottom: "10px" }}>Price/Unit</div>
          <TextField
            fullWidth
            size="small"
            id="outlined-basic"
            label="From"
            variant="outlined"
            style={{ background: "#FFFFFF" }}
          />

          <TextField
            fullWidth
            size="small"
            id="outlined-basic"
            label="To"
            variant="outlined"
            style={{ background: "#FFFFFF", marginTop: "10px" }}
          />
        </div>
        <div
          style={{
            width: size.width < 700 ? "100%" : "25%",
            margin: "15px 0px",
          }}
        >
          <div style={{ marginBottom: "10px" }}>VAT NO.</div>
          <TextField
            fullWidth
            size="small"
            id="outlined-basic"
            label="VAT no."
            variant="outlined"
            style={{ background: "#FFFFFF" }}
          />
        </div>

        <div
          style={{
            width: size.width < 700 ? "100%" : "25%",
            margin: "15px 0px",
          }}
        >
          <div style={{ marginBottom: "10px", display: "none" }}>
            TAX Amount
          </div>
          <TextField
            fullWidth
            size="small"
            id="outlined-basic"
            label="From"
            variant="outlined"
            style={{ background: "#FFFFFF", display: "none" }}
          />

          <TextField
            fullWidth
            size="small"
            id="outlined-basic"
            label="To"
            variant="outlined"
            style={{
              background: "#FFFFFF",
              marginTop: "10px",
              display: "none",
            }}
          />
        </div>
      </div>

      <div
        style={{
          width: "100%",
          height: "350px",
          background: "#FFFFFF",
          borderRadius: "10px",
          marginTop: "40px",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
        }}
      ></div>

      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          margin: "40px auto",
          position: "relative",
        }}
      >
        <Pagination
          count={Math.ceil(10 / postPerPage)}
          variant="outlined"
          onChange={handlePageChange}
          showFirstButton
          showLastButton
          shape="rounded"
          style={{ margin: "auto" }}
        />
      </div>
    </div>
  );
};

export default FilterSection;
