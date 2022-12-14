import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import EditAuction from "../../../src/components/EditAuction/EditAuction";

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

const Edit = () => {
  const size = useWindowSize();

  return (
    <>
      <Head>
        <title>Seller Auction History</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/LogoMini.png" />
      </Head>

      <div>
        <div style={{ marginTop: "10px", maxWidth: "80%", margin: "auto" }}>
          <div
            style={{
              fontWeight: 700,
              color: "#599f22",
              fontSize: "25px",
              paddingBottom: "40px",
            }}
          >
            Edit Auctions
          </div>
          <EditAuction />
        </div>
      </div>
    </>
  );
};

export default Edit;
