import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import {
  get_submitted_auctions,
  publish_bid,
  unpublish_bid,
} from "../../http_requests/httpreq";
import { useUserContext } from "../../contexts/UserContext";

const Gmv = () => {
  const { user } = useUserContext();
  const [rows, setRows] = useState([]);

  const fetchData = useCallback(async () => {
    const res = await get_submitted_auctions(user.id);
    setRows(res.data.data);
  }, []);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  return (
    <div
      style={{
        width: "100%",
        background: "#FFFFFF",
        borderRadius: "10px",
        marginTop: "100px",
        boxShadow: `rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em`,
      }}
    >
      <div>
        <div
          style={{
            width: "100%",
            borderRadius: "10px 10px 0 0",
            padding: "20px 50px",
            background: "#DEECD3",
            color: "green",
            display: "flex",
            justifyContent: "space-between",
            fontWeight:700,
          }}
        >
          <span> Submitted Auctions</span>
          <span>
            Total : <span style={{marginLeft:"10px"}}> {rows?.length} </span>
          </span>
        </div>
      </div>

      <div style={{ margin: "30px 50px" }}>
        <div
          style={{
            width: "100%",
            padding: "5px 30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "14px",
            background: "#FFFFFF",
            color: "#444444",
            marginBottom: "10px",
            fontWeight: "700",
            borderBottom: "1px solid rgba(67, 71, 85, 0.27)",
          }}
        >
          <div style={{ marginRight: "10px", width: "20%" }}>Title</div>
          <div
            style={{ marginRight: "10px", width: "20%", textAlign: "center" }}
          >
            Category
          </div>
          <div
            style={{ marginRight: "10px", width: "20%", textAlign: "center" }}
          >
            Quantity
          </div>
          <div
            style={{ marginRight: "10px", width: "20%", textAlign: "center" }}
          >
            Opening Bid
          </div>
          <div
            style={{ marginRight: "10px", width: "20%", textAlign: "center" }}
          >
            Submitted At
          </div>
        </div>

        <div
          className="scroll"
          style={{
            height: "250px",
            overflowY: "scroll",
            background: "#FFFFFF",
            color: "#666666",
          }}
        >
          {rows?.map((data, index) => (
            <div
              key={index}
              style={{
                width: "100%",
                padding: "5px 30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                borderBottom: "1px solid rgba(67, 71, 85, 0.27) ",
              }}
            >
              <div
                style={{ marginRight: "10px", width: "20%", fontSize: "13px" }}
              >
                {data?.title}
              </div>
              <div
                style={{
                  marginRight: "10px",
                  width: "20%",
                  fontSize: "13px",
                  textAlign: "center",
                }}
              >
                {data?.category}
              </div>
              <div
                style={{
                  marginRight: "10px",
                  width: "20%",
                  fontSize: "13px",
                  textAlign: "center",
                }}
              >
                {data?.quantity}
              </div>
              <div
                style={{
                  marginRight: "10px",
                  width: "20%",
                  fontSize: "13px",
                  textAlign: "center",
                }}
              >
                {data?.opening_bid_amount}
              </div>
              <div
                style={{
                  marginRight: "10px",
                  width: "20%",
                  fontSize: "13px",
                  textAlign: "center",
                }}
              >
                {moment(data?.submitted_at).format("LL")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gmv;
