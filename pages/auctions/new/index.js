import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import NewAuction from "../../../src/components/NewAuction/NewAuction";

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

const Hiostory = () => {
  const size = useWindowSize();

  return (
    <>
      <Head>
        <title>Create New Auction</title>
        <meta name="Create New Auction" content="Create New Auction" />
        <link rel="icon" href="/LogoMini.png" />
      </Head>

      <div>
        <div style={{ marginTop: "10px", maxWidth: "90%", margin: "auto" }}>
          <div
            style={{
              fontWeight: 700,
              color: "#599f22",
              fontSize: "25px",
              paddingBottom: "40px",
            }}
          >
            Create New Auction
          </div>
          <NewAuction />
        </div>
      </div>
    </>
  );
};

export default Hiostory;
