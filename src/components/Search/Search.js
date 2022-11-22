import React, { useState, useEffect } from "react";
import FilterSection from "./FilterSection";
import { useUserContext } from "../../contexts/UserContext";

const Search = () => {
  const [show, setShow] = useState(true);
  const user = useUserContext();
  const handleClickDismiss = (e) => {
    setShow(false);
  };

  return (
    <div>
      <h1>{user.first_name}</h1>
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

      <div style={{ marginTop: "30px" }}>
        <FilterSection />
      </div>
    </div>
  );
};

export default Search;
