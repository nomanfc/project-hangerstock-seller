import React, { useState, useEffect } from "react";
import Image from "next/image";

import Random from "../../icons/random.png";
import Video from "../../icons/video.png";

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

const Help = () => {
  const size = useWindowSize();
  return (
    <div
      style={{
        width: "100%",
        height: "fit-content",
        background: "#FFFFFF",
        borderRadius: "10px",
        boxShadow: `rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em`,
      }}
    >
      <div
        style={{
          width: "100%",
          borderRadius: "10px 10px 0 0",
          padding: "20px 30px",
          background: "#BDD9A7",
          color: "green",
        }}
      >
        Need help getting started
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
        <div
          style={{
            height: "300px",
            alignItems: "center",
            width: size.width <= 1200 ? "100%" : "48%",
            marginBottom: size.width <= 1200 ? "30px" : "0px",
          }}
        >
          <div style={{ padding: "5px 30px", color: "#666666" }}>
            Read selling basic
          </div>
          <div style={{ padding: "5px 30px", width: "80%",cursor:"pointer" }}>
            <Image  src={Random} alt="HangerStock" />
          </div>
        </div>

        <div
          style={{
            height: "300px",
            alignItems: "center",
            width: size.width <= 1200 ? "100%" : "48%",
            marginBottom: size.width <= 1200 ? "10px" : "0px",
          }}
        >
          <div style={{ padding: "5px 30px", color: "#666666" }}>
            How to Submit an Auction?
          </div>
          <div style={{ padding: "5px 30px", width: "80%" , cursor:"pointer"}}>
            <Image  src={Video} alt="HangerStock" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
