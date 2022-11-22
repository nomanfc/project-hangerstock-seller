import React, { useState, useEffect, useCallback } from "react";
import Button from "@mui/material/Button";
import moment from "moment";
import Link from "next/link";
import SubmittedSortTable from "./SortingTable";

import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import {
  get_submitted_auctions,
  publish_bid,
  unpublish_bid,
} from "../../http_requests/httpreq";
import { useUserContext } from "../../contexts/UserContext";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SubmittedAuctionsTable = () => {
  const { user } = useUserContext();
  const [rows, setRows] = useState([]);

  const [SnackbarPublish, setSnackbarPublish] = useState(false);
  const [SnackbarUnPub, setSnackbarUnPub] = useState(false);

  const handleCloseSnackPub = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarPublish(false);
  };

  const handleCloseSnackUnPub = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarUnPub(false);
  };

  const fetchData = useCallback(async () => {
    const res = await get_submitted_auctions(user.id);
    setRows(res.data.data);
  }, []);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  const handlePublish = (data) => () => {
    publish_bid(data.row.original.id).then((res) => {
      if (res.data.success === 1) {
        setSnackbarPublish(true);
      }
      fetchData();
    });
  };

  const handleUnpublish = (data) => () => {
    unpublish_bid(data.row.original.id).then((res) => {
      if (res.data.success === 1) {
        setSnackbarUnPub(true);
      }
      fetchData();
    });
  };

  return (
    <div>
      <Snackbar
        open={SnackbarPublish}
        autoHideDuration={3000}
        onClose={handleCloseSnackPub}
      >
        <Alert
          onClose={handleCloseSnackPub}
          severity="success"
          sx={{ width: "100%" }}
        >
          Auction has been published!
        </Alert>
      </Snackbar>

      <Snackbar
        open={SnackbarUnPub}
        autoHideDuration={3000}
        onClose={handleCloseSnackUnPub}
      >
        <Alert
          onClose={handleCloseSnackUnPub}
          severity="warning"
          sx={{ width: "100%" }}
        >
          Auction has been Unpublished!
        </Alert>
      </Snackbar>

      <div
        style={{
          fontWeight: 700,
          color: "#599f22",
          fontSize: "25px",
          paddingBottom: "40px",
        }}
      >
        Submitted Auctions
      </div>
      <SubmittedSortTable
        handlePub={handlePublish}
        handleUnPub={handleUnpublish}
        row={rows}
      />
    </div>
  );
};

export default SubmittedAuctionsTable;

// {rows?.length > 0 ? (
//   rows?.map((data, index) => (
//     <div
//       key={index}
//       style={{
//         width: "100%",
//         height: "40px",
//         marginTop: "25px",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between",
//       }}
//     >
//       <div
//         style={{
//           height: "40px",
//           display: "flex",
//           alignItems: "center",
//           width: "14.28%",
//           fontSize: "14px",
//           justifyContent: "space-between",
//           marginRight: "30px",
//         }}
//       >
//         {data?.title}
//       </div>

//       <div
//         style={{
//           height: "40px",
//           display: "flex",
//           alignItems: "center",
//           width: "14.28%",
//           fontSize: "14px",

//           justifyContent: "space-between",
//         }}
//       >
//         {data?.category}
//       </div>

//       <div
//         style={{
//           height: "40px",
//           display: "flex",
//           alignItems: "center",
//           width: "14.28%",
//           fontSize: "14px",
//           justifyContent: "space-between",
//         }}
//       >
//         {data?.quantity}
//       </div>

//       <div
//         style={{
//           height: "40px",
//           display: "flex",
//           alignItems: "center",
//           width: "14.28%",
//           fontSize: "14px",

//           justifyContent: "space-between",
//         }}
//       >
//         {data?.product_condition}
//       </div>

//       <div
//         style={{
//           height: "40px",
//           display: "flex",
//           alignItems: "center",
//           width: "14.28%",
//           fontSize: "14px",

//           justifyContent: "space-between",
//         }}
//       >
//         {data?.opening_bid_amount}
//       </div>

//       <div
//         style={{
//           height: "40px",
//           display: "flex",
//           alignItems: "center",
//           width: "14.28%",
//           fontSize: "14px",

//           justifyContent: "space-between",
//         }}
//       >
//         {moment(data?.submitted_at).format("lll")}
//       </div>

//       <div
//         style={{
//           height: "40px",
//           display: "flex",
//           alignItems: "center",
//           width: "14.28%",
//           fontSize: "14px",

//           justifyContent: "space-between",
//         }}
//       >
//         <div
//           style={{
//             margin: "auto",
//             display: "flex",
//             justifyContent: "space-around",
//           }}
//         >
//           <Link
//             href={{
//               pathname: `/auctions/details`,
//               query: {
//                 id: data.id, // pass the id
//               },
//             }}
//           >
//             <Button style={{ textTransform: "none" }}>Details</Button>
//           </Link>

//           {data?.is_published === 1 ? (
//             <Button
//               onClick={handleUnpublish({ data })}
//               style={{
//                 textTransform: "none",
//                 color: "red",
//               }}
//             >
//               Unpublish
//             </Button>
//           ) : (
//             <Button
//               onClick={handlePublish({ data })}
//               style={{
//                 textTransform: "none",
//                 color: "#599f22",
//               }}
//             >
//               Publish
//             </Button>
//           )}
//         </div>
//       </div>
//     </div>
//   ))
// ) : (
//   <div
//     style={{
//       color: "black",
//       textAlign: "center",
//       width: "100%",
//       marginTop: "50px",
//       fontSize: "20px",
//       fontWeight: 600,
//       color: "gray",
//     }}
//   >
//     No Data
//   </div>
// )}

// import React, { useEffect, useState } from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import { get_submitted_auctions } from "../../http_requests/httpreq";
// import { useUserContext } from "../../contexts/UserContext";

// const columns = [
//   { field: "title", headerName: "Title", width: 170, flex: 1 },
//   { field: "category", headerName: "Category", width: 130, flex: 1 },
//   { field: "quantity", headerName: "Quantity", width: 130, flex: 1 },
//   {
//     field: "product_condition",
//     headerName: "Product Condition",
//     width: 130,
//     flex: 1,
//   },
//   {
//     field: "opening_bid_amount",
//     headerName: "Opening Bid Amount",
//     width: 130,
//     flex: 1,
//   },

//   {
//     field: "submitted_at",
//     headerName: "Submitted At",
//     width: 130,
//     flex: 1,
//     valueGetter: (params) => {
//       const datetime = new Date(params.row.submitted_at);
//       return (
//         datetime.getUTCDate() +
//         "/" +
//         (datetime.getUTCMonth() + 1) +
//         "/" +
//         datetime.getUTCFullYear() +
//         "  at  " +
//         datetime.getUTCHours() +
//         ":" +
//         datetime.getUTCMinutes()
//       );
//     },
//   },
// ];

// export default function SubmittedAuctionsTable() {
//   const [rows, setRows] = useState([]);
//   const { user } = useUserContext();

//   useEffect(() => {
//     const getData = async () => {
//       const res = await get_submitted_auctions(user.id);
//       return res.data.data;
//     };
//     getData()
//       .then((auctions) => auctions && setRows(auctions))
//       .catch();
//   }, []);

//   return (
//     <div style={{ height: 400, width: "100%" }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         pageSize={5}
//         rowsPerPageOptions={[5]}
//         checkboxSelection
//       />
//     </div>
//   );
// }
