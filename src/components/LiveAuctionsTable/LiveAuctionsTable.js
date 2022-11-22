import React, { useState, useEffect, useCallback } from "react";
import Button from "@mui/material/Button";
import { useUserContext } from "../../contexts/UserContext";
import Box from "@mui/material/Box";
import moment from "moment";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Link from "next/link";
import {
  get_live_auctions,
  get_all_bids_by_aid,
} from "../../http_requests/httpreq";

import LiveSortingTable from "./SortingTable";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll",
};

function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? h + (h == 1 ? "h " : "h ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? "m " : "m ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? "s" : "s") : "";
  return hDisplay + " " + mDisplay;
}

const LiveAuctionsTable = () => {
  const { user } = useUserContext();
  const [rows, setRows] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const [allBids, setAllBids] = useState();

  const fetchData = useCallback(async () => {
    const res = await get_live_auctions(user.id);
    setRows(res.data.data);
  }, []);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  const handleModalData = (data) => () => {
    setOpen(true);
    get_all_bids_by_aid(data.row.original.id).then((res) => {
      setAllBids(res.data.data);
    });
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              borderBottom: "1px solid  	#DCDCDC",
              paddingBottom: "10px",
              width: "100%",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                height: "40px",
                display: "flex",
                alignItems: "center",
                width: "30%",
                fontSize: "14px",
                fontWeight: "600",
                justifyContent: "space-between",
              }}
            >
              Name
            </div>

            <div
              style={{
                height: "40px",
                display: "flex",
                alignItems: "center",
                width: "30%",
                fontSize: "14px",
                fontWeight: "600",
                justifyContent: "space-between",
              }}
            >
              <div style={{ margin: "auto" }}> Bid Amount</div>
            </div>

            <div
              style={{
                height: "40px",
                display: "flex",
                alignItems: "center",
                width: "30%",
                fontSize: "14px",
                fontWeight: "600",
                justifyContent: "space-between",
              }}
            >
              <div style={{ margin: "auto" }}>Posted At</div>
            </div>
          </div>

          {allBids?.map((data, index) => (
            <div
              key={index}
              style={{
                paddingBottom: "10px",
                width: "100%",
                height: "40px",
                display: "flex",
                marginTop: "25px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  width: "30%",
                  fontSize: "14px",

                  justifyContent: "space-between",
                }}
              >
                {data?.first_name + " " + data?.last_name}
              </div>

              <div
                style={{
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  width: "30%",
                  fontSize: "14px",

                  justifyContent: "space-between",
                }}
              >
                <div style={{ margin: "auto" }}>{data?.bid_amount}</div>
              </div>

              <div
                style={{
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  width: "30%",
                  fontSize: "14px",

                  justifyContent: "space-between",
                }}
              >
                <div style={{ margin: "auto" }}>
                  {moment(data?.created_at)?.format("LL")}
                </div>
              </div>
            </div>
          ))}
        </Box>
      </Modal>

      <LiveSortingTable handleModal={handleModalData} row={rows} />
    </>
  );
};

export default LiveAuctionsTable;

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
//           width: "16.67%",
//           fontSize: "14px",
//           marginRight: "30px",
//           justifyContent: "space-between",
//         }}
//       >
//         {data?.title}
//       </div>

//       <div
//         style={{
//           height: "40px",
//           display: "flex",
//           alignItems: "center",
//           width: "16.67%",
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
//           width: "16.67%",
//           fontSize: "14px",

//           justifyContent: "space-between",
//         }}
//       >
//         {data?.bid_count}
//       </div>

//       <div
//         style={{
//           height: "40px",
//           display: "flex",
//           alignItems: "center",
//           width: "16.67%",
//           fontSize: "14px",

//           justifyContent: "space-between",
//         }}
//       >
//         {data?.max_bid}
//       </div>

//       <div
//         style={{
//           height: "40px",
//           display: "flex",
//           alignItems: "center",
//           width: "16.67%",
//           fontSize: "14px",

//           justifyContent: "space-between",
//         }}
//       >
//         {secondsToHms(data?.bid_ends_in_second)}
//       </div>

//       <div
//         style={{
//           height: "40px",
//           display: "flex",
//           alignItems: "center",
//           width: "16.67%",
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
//           <Button
//             style={{ textTransform: "none" }}
//             onClick={handleModalData({ data })}
//           >
//             All Bids
//           </Button>

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
// import { get_live_auctions } from "../../http_requests/httpreq";
// import { useUserContext } from "../../contexts/UserContext";

// const columns = [
//   { field: "title", headerName: "Title", width: 170, flex: 1 },
//   { field: "category", headerName: "Category", width: 130, flex: 1 },
//   { field: "bid_count", headerName: "Bid Count", width: 130, flex: 1 },
//   {
//     field: "max_bid",
//     headerName: "Maximum Bid Amount",
//     // type: "number",
//     width: 90,
//     flex: 1,
//     valueGetter: (params) => {
//       return params.row.max_bid || "N/A";
//     },
//   },
//   {
//     field: "bid_ends_in_second",
//     headerName: "Bid Ends In",
//     width: 130,
//     flex: 1,
//     valueGetter: (params) => {
//       return params.row.bid_ends_in_second / 60 >= 60
//         ? Math.fround(
//             parseFloat(params.row.bid_ends_in_second / 60 / 60)
//           ).toFixed(2) + " hours"
//         : parseFloat(params.row.bid_ends_in_second / 60).toFixed(2) + " mins";
//     },
//   },
// ];

// export default function LiveAuctionsTable() {
//   const [rows, setRows] = useState([]);
//   const { user } = useUserContext();

//   useEffect(() => {
//     const getData = async () => {
//       const res = await get_live_auctions(user.id);
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
