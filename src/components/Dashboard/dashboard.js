import React, { useEffect, useState, useCallback } from "react";
import AuctionComp from "./AuctionComp";
import Gmv from "./Gmv";
import AuctionSummary from "./AuctionSummary";
import UnSoldMet from "./UnsoldMet";
import AuctionMet from "./AuctionMet";
import CancelOrder from "./CancelOrder";
import RelistedOrder from "./Relisted";
import Help from "./Help";



function useWindowSize() {
  const [rows, setRows] = useState([]);
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

const Dashboard = () => {
  const size = useWindowSize();
  return (
    <div style={{ minHeight: "100vh", marginTop: "10px" }}>
      <AuctionComp />

      <div
        style={{
          marginTop: "30px",
          height: "fit-content",
          display: "flex",
          alignItems: "center",
          flexDirection: size.width <= 1200 ? "column" : "row",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            height: "360px",
            display: "flex",
            alignItems: "center",
            width: size.width <= 1200 ? "100%" : "100%",
            marginBottom: size.width <= 1200 ? "30px" : "0px",
          }}
        >
          <Gmv />
        </div>

        {/* <div
          style={{
            height: "360px",
            display: "flex",
            alignItems: "center",
            width: size.width <= 1200 ? "100%" : "48%",
          }}
        >
          <AuctionSummary />
        </div> */}
      </div>

      <div
        style={{
          marginTop: "30px",
          height: "fit-content",
          display: "flex",
          alignItems: "center",
          flexDirection: size.width <= 1200 ? "column" : "row",
          justifyContent: "space-between",
        }}
      >
        {/* <div
          style={{
            height: "360px",
            display: "flex",
            alignItems: "center",
            width: size.width <= 1200 ? "100%" : "48%",
            marginBottom: size.width <= 1200 ? "30px" : "0px",
          }}
        >
          <UnSoldMet />
        </div> */}

        {/* <div
          style={{
            height: "360px",
            display: "flex",
            alignItems: "center",
            width: size.width <= 1200 ? "100%" : "48%",
          }}
        >
          <AuctionMet />
        </div> */}
      </div>

      <div
        style={{
          marginTop: "30px",
          height: "fit-content",
          display: "flex",
          alignItems: "center",
          flexDirection: size.width <= 1200 ? "column" : "row",
          justifyContent: "space-between",
        }}
      >
        {/* <div
          style={{
            height: "360px",
            display: "flex",
            alignItems: "center",
            width: size.width <= 1200 ? "100%" : "48%",
            marginBottom: size.width <= 1200 ? "30px" : "0px",
          }}
        >
          <CancelOrder />
        </div> */}

        {/* <div
          style={{
            height: "360px",
            display: "flex",
            alignItems: "center",
            width: size.width <= 1200 ? "100%" : "48%",
          }}
        >
          <RelistedOrder />
        </div> */}
      </div>

      {/* <div style={{ marginTop: "30px" }}>
        <Help />
      </div> */}
    </div>
  );
};

export default Dashboard;
