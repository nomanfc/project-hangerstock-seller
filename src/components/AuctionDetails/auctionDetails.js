import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReactImageMagnify from "react-image-magnify";
import { get_auction_details_by_aid } from "../../http_requests/httpreq.js";

import TableManifest from "./tableManifest";

const auctionDetails = (props) => {
  const router = useRouter();
  const [details, setAucData] = useState();

  const [expanded, setExpanded] = React.useState("panel1");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const [expanded2, setExpanded2] = React.useState("panel2");
  const handleChange2 = (panel) => (event, newExpanded) => {
    setExpanded2(newExpanded ? panel : false);
  };

  const [expanded3, setExpanded3] = React.useState("panel3");
  const handleChange3 = (panel) => (event, newExpanded) => {
    setExpanded3(newExpanded ? panel : false);
  };

  const fetchData = useCallback(async () => {
    const data = await get_auction_details_by_aid(router.query.id);
    setAucData(data.data.data);
  }, []);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  return (
    <div style={{ width: "90%", margin: "auto" }}>
      <div
        style={{
          fontWeight: 700,
          color: "#599f22",
          fontSize: "25px",
          paddingBottom: "40px",
        }}
      >
        Auction Details
      </div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{ background: "#DEECD3" }}
        >
          <Typography>Product Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div
            style={{
              width: "98%",
              marginTop: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "14px",
              fontFamily: "Nunito Sans",

              margin: "15px auto auto auto",
            }}
          >
            <div
              style={{
                width: "20%",
                textAlign: "right",
              }}
            >
              Category
            </div>
            :
            <div
              style={{
                width: "70%",
              }}
            >
              {details?.product_details?.category}
            </div>
          </div>

          <div
            style={{
              width: "98%",
              marginTop: "20px",
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              margin: "15px auto auto auto",
              fontSize: "14px",
              fontFamily: "Nunito Sans",
            }}
          >
            <div
              style={{
                width: "20%",
                textAlign: "right",
              }}
            >
              Cosmetic condtion
            </div>
            :
            <div
              style={{
                width: "70%",
              }}
            >
              {details?.product_details?.cosmetic_condition}
            </div>
          </div>

          <div
            style={{
              width: "98%",
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              margin: "15px auto auto auto",
              fontSize: "14px",
              fontFamily: "Nunito Sans",
            }}
          >
            <div
              style={{
                width: "20%",
                textAlign: "right",
              }}
            >
              Product condition
            </div>
            :
            <div
              style={{
                width: "70%",
              }}
            >
              {details?.product_details?.product_condition}
            </div>
          </div>

          <div
            style={{
              width: "98%",
              marginTop: "20px",
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              margin: "15px auto auto auto",
              fontSize: "14px",
              fontFamily: "Nunito Sans",
            }}
          >
            <div
              style={{
                width: "20%",
                textAlign: "right",
              }}
            >
              Inventory type
            </div>
            :
            <div
              style={{
                width: "70%",
              }}
            >
              {details?.product_details?.inventory_type}
            </div>
          </div>

          <div
            style={{
              width: "98%",
              marginTop: "20px",
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              margin: "15px auto auto auto",
              fontSize: "14px",
              fontFamily: "Nunito Sans",
            }}
          >
            <div
              style={{
                width: "20%",
                textAlign: "right",
              }}
            >
              Quantity
            </div>
            :
            <div
              style={{
                width: "70%",
              }}
            >
              {details?.product_details?.quantity}
            </div>
          </div>
          <div
            style={{
              width: "98%",
              marginTop: "20px",
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              margin: "15px auto auto auto",
              fontSize: "14px",
              fontFamily: "Nunito Sans",
            }}
          >
            <div
              style={{
                width: "20%",
                textAlign: "right",
              }}
            >
              Packing details
            </div>
            :
            <div
              style={{
                width: "70%",
              }}
            >
              {details?.product_details?.packaging_details}
            </div>
          </div>
          <div
            style={{
              width: "98%",
              marginTop: "20px",
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              margin: "15px auto auto auto",
              fontSize: "14px",
              fontFamily: "Nunito Sans",
            }}
          >
            <div
              style={{
                width: "20%",
                textAlign: "right",
              }}
            >
              Original Reatail Price
            </div>
            :
            <div
              style={{
                width: "70%",
              }}
            >
              {details?.product_details?.original_retail_price}
            </div>
          </div>
          <div
            style={{
              width: "98%",
              marginTop: "20px",
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              margin: "15px auto auto auto",
              fontSize: "14px",
              fontFamily: "Nunito Sans",
            }}
          >
            <div
              style={{
                width: "20%",
                textAlign: "right",
              }}
            >
              Description
            </div>
            :
            <div
              style={{
                width: "70%",
              }}
            >
              {details?.product_details?.description}
            </div>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded2 === "panel2"}
        onChange={handleChange2("panel2")}
        style={{ marginTop: "20px" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{ background: "#DEECD3" }}
        >
          <Typography>Manifest</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableManifest dataTable={router.query.id} />
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded3 === "panel3"}
        onChange={handleChange3("panel3")}
        style={{ marginTop: "20px" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{ background: "#DEECD3" }}
        >
          <Typography>Shipping Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div
            style={{
              width: "98%",
              marginTop: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "14px",
              fontFamily: "Nunito Sans",

              margin: "15px auto auto auto",
            }}
          >
            <div
              style={{
                width: "20%",
                textAlign: "right",
              }}
            >
              Shipping Type
            </div>
            :
            <div
              style={{
                width: "70%",
              }}
            >
              {details?.shipping_details?.shipping_type}
            </div>
          </div>

          <div
            style={{
              width: "98%",
              marginTop: "20px",
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              margin: "15px auto auto auto",
              fontSize: "14px",
              fontFamily: "Nunito Sans",
            }}
          >
            <div
              style={{
                width: "20%",
                textAlign: "right",
              }}
            >
              Shipping Cost
            </div>
            :
            <div
              style={{
                width: "70%",
              }}
            >
              {details?.shipping_details?.shipping_cost}
            </div>
          </div>

          <div
            style={{
              width: "98%",
              marginTop: "20px",
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              margin: "15px auto auto auto",
              fontSize: "14px",
              fontFamily: "Nunito Sans",
            }}
          >
            <div
              style={{
                width: "20%",
                textAlign: "right",
              }}
            >
              Ship From
            </div>
            :
            <div
              style={{
                width: "70%",
              }}
            >
              {details?.shipping_details?.ship_from}
            </div>
          </div>

          <div
            style={{
              width: "98%",
              marginTop: "20px",
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              margin: "15px auto auto auto",
              fontSize: "14px",
              fontFamily: "Nunito Sans",
            }}
          >
            <div
              style={{
                width: "20%",
                textAlign: "right",
              }}
            >
              Ship To
            </div>
            :
            <div
              style={{
                width: "70%",
              }}
            >
              {details?.shipping_details?.ship_to}
            </div>
          </div>

          <div
            style={{
              width: "98%",
              marginTop: "20px",
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              margin: "15px auto auto auto",
              fontSize: "14px",
              fontFamily: "Nunito Sans",
            }}
          >
            <div
              style={{
                width: "20%",
                textAlign: "right",
              }}
            >
              Freight Type
            </div>
            :
            <div
              style={{
                width: "70%",
              }}
            >
              {details?.shipping_details?.freight_name}
            </div>
          </div>
          <div
            style={{
              width: "98%",
              marginTop: "20px",
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              margin: "15px auto auto auto",
              fontSize: "14px",
              fontFamily: "Nunito Sans",
            }}
          >
            <div
              style={{
                width: "20%",
                textAlign: "right",
              }}
            >
              Shipping Notes
            </div>
            :
            <div
              style={{
                width: "70%",
              }}
            >
              {details?.shipping_details?.shipping_note}
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default auctionDetails;
