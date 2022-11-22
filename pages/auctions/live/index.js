import React from "react";
import Head from "next/head";
import LiveAuctionsTable from "../../../src/components/LiveAuctionsTable/LiveAuctionsTable";

const AllAuctions = () => {
  return (
    <div>
      <Head>
        <title>Live Auctions</title>
        <meta name="Live Auctions" content="Live Auctions" />
        <link rel="icon" href="/LogoMini.png" />
      </Head>
      <div
        style={{
          fontSize: "25px",
          fontWeight: 600,
          color: "#599f22",
          marginBottom: "35px",
        }}
      >
        Live Auctions
      </div>
      <LiveAuctionsTable />
    </div>
  );
};

export default AllAuctions;
