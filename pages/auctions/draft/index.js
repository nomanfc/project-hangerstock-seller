import React from "react";
import Head from "next/head";
import DraftAuctionsTable from "../../../src/components/DraftAuctionsTable/DraftAuctionsTable";

const AllAuctions = () => {
  return (
    <div>
      <Head>
        <title>Draft Auctions</title>
        <meta name="Draft Auctions" content="Draft Auctions" />
        <link rel="icon" href="/LogoMini.png" />
      </Head>
      <DraftAuctionsTable />
    </div>
  );
};

export default AllAuctions;
