import React from "react";
import Head from "next/head";
import FavouriteAuctions from "../../../src/components/Buyer/Favourite/Favourite";

const AllAuctions = () => {
  return (
    <div>
      <Head>
        <title>Favourite Auctions</title>
        <meta name="Favourite Auctions" content="Favourite Auctions" />
        <link rel="icon" href="/LogoMini.png" />
      </Head>
      <FavouriteAuctions />
    </div>
  );
};

export default AllAuctions;
