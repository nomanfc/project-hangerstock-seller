import React, { useState, useEffect, useCallback } from "react";
import Button from "@mui/material/Button";
import { useUserContext } from "../../../contexts/UserContext";
import Box from "@mui/material/Box";
import moment from "moment";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Link from "next/link";
import {
  get_live_auctions,
  get_all_bids_by_aid,
  bidded_auction_by_id,
  get_favt_auction_by_uid,
  remove_favt_auction_by_aid,
} from "../../../http_requests/httpreq.js";

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

const FavouriteAuctions = () => {
  const { user } = useUserContext();
  const [rows, setRows] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const [allBids, setAllBids] = useState();

  const fetchData = useCallback(async () => {
    const res = await get_favt_auction_by_uid(user.id);
    setRows(res.data.id);
  }, []);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  const handleModalData = (data) => () => {
    setOpen(true);
    get_all_bids_by_aid(data.row.original.auction_id).then((res) => {
      setAllBids(res.data.data);
    });
  };

  const handleRemove = (data) => (e) => {
    remove_favt_auction_by_aid(data.row.original.id).then((res) => {
      if (res.data.success === 1) {
        fetchData();
      }
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
      <div
        style={{
          fontWeight: 700,
          color: "#599f22",
          fontSize: "25px",
          paddingBottom: "40px",
        }}
      >
        Favourite Auctions
      </div>
      <LiveSortingTable
        remove={handleRemove}
        handleModal={handleModalData}
        row={rows}
      />
    </>
  );
};

export default FavouriteAuctions;
