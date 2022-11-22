import React, { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Link from "next/link";
import moment from "moment";

import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import {
  get_draft_auctions,
  remove_auction_by_id,
} from "../../http_requests/httpreq";
import { useUserContext } from "../../contexts/UserContext";

import DraftAuctionTable from "./SortingTable";

const styleRemove = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LiveAuctionsTable = () => {
  const { user } = useUserContext();
  const [rows, setRows] = useState([]);
  const [deleteData, setDeleteData] = useState();

  const [SnackbarDel, setSnackbarDel] = useState(false);

  const handleCloseSnackDel = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarDel(false);
  };

  //delete modal
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const handleOpenDeleteModal = (data) => () => {
    setOpenDeleteModal(true);
    setDeleteData(data.row.original);
  };

  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const fetchData = useCallback(async () => {
    const res = await get_draft_auctions(user.id);
    setRows(res.data.data);
  }, []);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  //remove draft
  const handleRemoveDraft = (e) => {
    remove_auction_by_id(deleteData).then((res) => {
      if (res.data.success === 1) {
        setSnackbarDel(true);
        setOpenDeleteModal(false);
      }

      fetchData();
    });
  };

  return (
    <div>
      <Snackbar
        open={SnackbarDel}
        autoHideDuration={3000}
        onClose={handleCloseSnackDel}
      >
        <Alert
          onClose={handleCloseSnackDel}
          severity="success"
          sx={{ width: "100%", background: "#F88379" }}
        >
          Draft has been deleted!
        </Alert>
      </Snackbar>

      <Modal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleRemove}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ color: "#599f22" }}
          >
            Do you want to remove this draft ?
          </Typography>

          <div
            style={{
              marginTop: "40px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ margin: "auto" }}>
              <Button
                style={{
                  textTransform: "none",
                  color: "gray",
                  marginRight: "50px",
                }}
                onClick={handleCloseDeleteModal}
              >
                Cancel
              </Button>
              <Button
                onClick={handleRemoveDraft}
                style={{ textTransform: "none", color: "red" }}
              >
                Remove
              </Button>
            </div>
          </div>
        </Box>
      </Modal>

      <div
        style={{
          fontWeight: 700,
          color: "#599f22",
          fontSize: "25px",
          paddingBottom: "40px",
        }}
      >
        Draft Auctions
      </div>
      <DraftAuctionTable handleDelete={handleOpenDeleteModal} row={rows} />
    </div>
  );
};

export default LiveAuctionsTable;

{
  /* <div
style={{
  fontWeight: 700,
  color: "#599f22",
  fontSize: "25px",
  paddingBottom: "40px",
}}
>
Draft Auctions
</div>
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
    width: "16.67%",
    fontSize: "14px",
    fontWeight: "600",
    justifyContent: "space-between",
    marginRight: "30px",
  }}
>
  Title
</div>

<div
  style={{
    height: "40px",
    display: "flex",
    alignItems: "center",
    width: "16.67%",
    fontSize: "14px",
    fontWeight: "600",
    justifyContent: "space-between",
  }}
>
  Category
</div>

<div
  style={{
    height: "40px",
    display: "flex",
    alignItems: "center",
    width: "16.67%",
    fontSize: "14px",
    fontWeight: "600",
    justifyContent: "space-between",
  }}
>
  Quantity
</div>

<div
  style={{
    height: "40px",
    display: "flex",
    alignItems: "center",
    width: "16.67%",
    fontSize: "14px",
    fontWeight: "600",
    justifyContent: "space-between",
  }}
>
  Product Condition
</div>

<div
  style={{
    height: "40px",
    display: "flex",
    alignItems: "center",
    width: "16.67%",
    fontSize: "14px",
    fontWeight: "600",
    justifyContent: "space-between",
  }}
>
  Created At
</div>

<div
  style={{
    height: "40px",
    display: "flex",
    alignItems: "center",
    width: "16.67%",
    fontSize: "14px",
    fontWeight: "600",
    justifyContent: "space-between",
    textAlign: "center",
  }}
>
  <div style={{ margin: "auto" }}>Action</div>
</div>
</div> */
}

// {rows?.length > 0 ? (
// rows?.map((data, index) => (
//   <div
//     key={index}
//     style={{
//       width: "100%",
//       height: "40px",
//       marginTop: "25px",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "space-between",
//     }}
//   >
//     <div
//       style={{
//         height: "40px",
//         display: "flex",
//         alignItems: "center",
//         width: "16.67%",
//         fontSize: "14px",
//         marginRight: "30px",
//         justifyContent: "space-between",
//       }}
//     >
//       {data?.title}
//     </div>

//     <div
//       style={{
//         height: "40px",
//         display: "flex",
//         alignItems: "center",
//         width: "16.67%",
//         fontSize: "14px",

//         justifyContent: "space-between",
//       }}
//     >
//       {data?.category}
//     </div>

//     <div
//       style={{
//         height: "40px",
//         display: "flex",
//         alignItems: "center",
//         width: "16.67%",
//         fontSize: "14px",

//         justifyContent: "space-between",
//       }}
//     >
//       {data?.quantity}
//     </div>

//     <div
//       style={{
//         height: "40px",
//         display: "flex",
//         alignItems: "center",
//         width: "16.67%",
//         fontSize: "14px",

//         justifyContent: "space-between",
//       }}
//     >
//       {data?.product_condition}
//     </div>

//     <div
//       style={{
//         height: "40px",
//         display: "flex",
//         alignItems: "center",
//         width: "16.67%",
//         fontSize: "14px",

//         justifyContent: "space-between",
//       }}
//     >
//       {moment(data?.created_at).format("lll") }
//     </div>

//     <div
//       style={{
//         height: "40px",
//         display: "flex",
//         alignItems: "center",
//         width: "16.67%",
//         fontSize: "14px",

//         justifyContent: "space-between",
//       }}
//     >
//       <div
//         style={{
//           margin: "auto",
//           display: "flex",
//           justifyContent: "space-around",
//         }}
//       >
//         <Link
//           href={{
//             pathname: `/auctions/edit`,
//             query: {
//               id: data.id, // pass the id
//             },
//           }}
//         >
//           <Button style={{ textTransform: "none" }}>Edit</Button>
//         </Link>
//         <Button
//           onClick={handleOpenDeleteModal({ data })}
//           style={{ textTransform: "none", color: "red" }}
//         >
//           Remove
//         </Button>
//       </div>
//     </div>
//   </div>
// ))
// ) : (
// <div
//   style={{
//     color: "black",
//     textAlign: "center",
//     width: "100%",
//     marginTop: "50px",
//     fontSize: "20px",
//     fontWeight: 600,
//     color: "gray",
//   }}
// >
//   No Data
// </div>
// )}

// import React, { useEffect, useState } from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import { get_draft_auctions } from "../../http_requests/httpreq";
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
//     field: "original_retail_price",
//     headerName: "Original Retail Price",
//     width: 130,
//     flex: 1,
//   },
// ];

// export default function SubmittedAuctionsTable() {
//   const [rows, setRows] = useState([]);
//   const { user } = useUserContext();

//   useEffect(() => {
//     const getData = async () => {
//       const res = await get_draft_auctions(user.id);
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
