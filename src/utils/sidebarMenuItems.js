import React from "react";

/* Menu Icons */
import DashboardIcon from "@mui/icons-material/Dashboard";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import PersonIcon from "@mui/icons-material/Person";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { FaCoins } from "react-icons/fa";

export const menu = [
  {
    icon: <DashboardIcon />,
    title: "Dashboard",
    to: "/",
    onActive: "",
  },
  // {
  //   icon: <SearchIcon />,
  //   title: "Search",
  //   to: "/search",
  //   onActive: "search",
  // },
  {
    icon: <AddShoppingCartIcon />,
    title: "For Buyer",
    onActive: "buyer",
    items: [
      {
        title: "All Bids",
        to: "/buyer/bidded",
        onActive: "bidded",
      },
      {
        title: "Favourite Auctions",
        to: "/buyer/favourite",
        onActive: "favourite",
      },
    ],
  },

  {
    icon: <AttachMoneyIcon />,
    title: "For Seller",
    onActive: "auctions",
    items: [
      {
        title: "New Auction",
        to: "/auctions/new",
        onActive: "new",
      },
      {
        title: "Live Auctions",
        to: "/auctions/live",
        onActive: "live",
      },
      {
        title: "Sumbitted Auctions",
        to: "/auctions/submitted",
        onActive: "submitted",
      },
      {
        title: "Draft Auctions",
        to: "/auctions/draft",
        onActive: "draft",
      },
    ],
  },
  // {
  //   icon: <SettingsSuggestIcon />,
  //   title: "System",
  //   to: "/system",
  //   onActive: "system",
  // },
  {
    icon: <PersonIcon />,
    title: "Account Details",

    items: [
      // {
      //   title: "Technical Analysis",
      //   icon: <SettingsSuggestIcon />,
      // },
      {
        title: "Profile",
        to: "/profile",
        onActive: "profile",
      },
      {
        title: "Business Profile",
        to: "/profile/business_profile",
        onActive: "business_profile",
      },
    ],
  },
];
