import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const AccountInfo = () => {
  return (
    <div>
      <div
        style={{
          maxWidth: "900px",
          height: "fit-content",
          margin: "auto",
          borderRadius: "10px",
          boxShadow: `rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em`,
        }}
      >
        <div
          style={{
            background: "#BDD9A7",
            color: "#2D5011",
            padding: "10px 30px",
            borderRadius: "10px 10px 0px 0px",
          }}
        >
          Account Information
        </div>

        <div style={{ padding: "30px 30px", background:"#FFFFFF", borderRadius: "0px 0px 10px 10px" , }}>
          <TextField
            id="outlined-basic"
            label="User Name"
            variant="outlined"
            fullWidth
            size="small"
            sx={{ marginBottom: "18px" }}
          />
          <TextField
            id="outlined-basic"
            label="Full Name"
            variant="outlined"
            fullWidth
            size="small"
            sx={{ marginBottom: "18px" }}
          />
          <TextField
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            fullWidth
            size="small"
            sx={{ marginBottom: "18px" }}
          />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            fullWidth
            size="small"
            sx={{ marginBottom: "18px" }}
          />
          <TextField
            id="outlined-basic"
            label="Current Password"
            variant="outlined"
            fullWidth
            size="small"
            sx={{ marginBottom: "18px" }}
          />
          <TextField
            id="outlined-basic"
            label="New Password"
            variant="outlined"
            fullWidth
            size="small"
            sx={{ marginBottom: "18px" }}
          />
          <TextField
            id="outlined-basic"
            label="Confirm Password"
            variant="outlined"
            fullWidth
            size="small"
          />

          <div
            style={{
              width: "100%",
              display: "flex",
              marginTop:"30px",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              style={{
                width: "fit-content",
                color: "#FFFFFF",
                background: "#599f22",
                margin:'auto',
                textTransform:"none"
              }}
            >
              Save Information
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
