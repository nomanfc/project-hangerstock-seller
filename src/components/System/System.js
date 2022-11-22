import React, { useState, useEffect } from "react";
import AccountInfo from "./AccountInfo";
import BillingInfo from "./BillingInfo";
import SubscriptionInfo from "./SubscriptionInfo";

const System = () => {
  const [show, setShow] = useState(true);

  const handleClickDismiss = (e) => {
    setShow(false);
  };

  return (
    <div>
      <div
        style={{
          padding: "15px 30px",
          width: "100%",
          fontSize: "14px",
          background: "rgba(255, 99, 71, 0.3)",
          color: "#599f22",
          display: show ? "block" : "none",
          textAlign: "justify",
        }}
      >
        Have a question? contact{" "}
        <span style={{ fontWeight: "bold" }}>
          sellersupport@hangerstock.com
        </span>{" "}
        for any seller related issue.{" "}
        <span style={{ fontWeight: "bold" }}>Please Note:</span> Starting
        September 20th, auction submitted before 4 pm EST will be posted on the
        marketplace the following business day.{" "}
        <span
          style={{ cursor: "pointer", color: "blue" }}
          onClick={handleClickDismiss}
        >
          Dismiss
        </span>
      </div>

      <div
        style={{
          background: "#BDD9A7",
          padding: "10px 0px",
          marginTop: "30px",
          textAlign: "center",
          color: "#2D5011",
          fontSize:"20px"
        }}
      >
        My Account
      </div>

      <div style={{ marginTop: "30px" }}>
        <AccountInfo />
      </div>

      <div style={{ marginTop: "40px" }}>
        <BillingInfo />
      </div>

      <div style={{ marginTop: "40px" }}>
        <SubscriptionInfo />
      </div>
    </div>
  );
};

export default System;
