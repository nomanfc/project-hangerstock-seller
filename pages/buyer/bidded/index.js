import React from "react";
import Head from "next/head";
import BiddedAuctions from "../../../src/components/Buyer/Bidded/Bidded.js";

const AllAuctions = () => {
  return (
    <div>
      <Head>
        <title>Bidded Auctions</title>
        <meta name="Bidded Auctions" content="Bidded Auctions" />
        <link rel="icon" href="/LogoMini.png" />
      </Head>
      <BiddedAuctions />
    </div>
  );
};

export default AllAuctions;
