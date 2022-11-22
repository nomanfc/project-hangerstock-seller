import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const SubscriptionInfo = () => {
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
          Subscription Information
        </div>

        <div style={{ padding: "30px 30px" , background:"#FFFFFF", borderRadius: "0px 0px 10px 10px" ,}}>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              color: "#666666",
              fontSize: "15px",
              marginBottom: "10px",
            }}
          >
            <div style={{ width: "40%" }}>Plan Code/Name</div>
            <div style={{ width: "55%" }}>Basic Subscription Plan</div>
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              color: "#666666",
              fontSize: "15px",
              marginBottom: "10px",
            }}
          >
            <div style={{ width: "40%" }}>Subscription Status</div>
            <div style={{ width: "55%" }}>Expired</div>
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              color: "#666666",
              fontSize: "15px",
              marginBottom: "10px",
            }}
          >
            <div style={{ width: "40%" }}>Plan Information</div>
            <div style={{ width: "55%" }}>$99 a month/ $20 Listing Fee</div>
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              color: "#666666",
              fontSize: "15px",
              marginBottom: "10px",
            }}
          >
            <div style={{ width: "40%" }}>Joined</div>
            <div style={{ width: "55%" }}>2021-09-28 15:05</div>
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              color: "#666666",
              fontSize: "15px",
              marginBottom: "10px",
            }}
          >
            <div style={{ width: "40%" }}>Billing Address</div>
            <div style={{ width: "55%" }}>870 Crenshaw Blve £306, 9005</div>
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              color: "#666666",
              fontSize: "15px",
              marginBottom: "10px",
            }}
          >
            <div style={{ width: "40%" }}>Credit Card Type</div>
            <div style={{ width: "55%" }}>VISA</div>
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              color: "#666666",
              fontSize: "15px",
              marginBottom: "10px",
            }}
          >
            <div style={{ width: "40%" }}>Credit Card Number</div>
            <div style={{ width: "55%" }}>30000</div>
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              color: "#666666",
              fontSize: "15px",
              marginBottom: "10px",
            }}
          >
            <div style={{ width: "40%" }}>Expiration Date</div>
            <div style={{ width: "55%" }}>10/2026</div>
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              marginTop: "30px",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              style={{
                width: "fit-content",
                color: "#FFFFFF",
                background: "#599f22",
                margin: "auto",
                textTransform: "none",
              }}
            >
              Cancel Subscription
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionInfo;
