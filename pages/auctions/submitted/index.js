import React from "react";
import Head from "next/head";
import SubmittedAuctionsTable from "../../../src/components/SubmittedAuctionsTable/SubmittedAuctionsTable";

const AllAuctions = () => {
  return (
    <>
      <Head>
        <title>Submitted Auctions</title>
        <meta name="Submitted Auctions" content="Submitted Auctions" />
        <link rel="icon" href="/LogoMini.png" />
      </Head>
      <SubmittedAuctionsTable />
    </>
  );
};

export default AllAuctions;
