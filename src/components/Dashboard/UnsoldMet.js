import React from "react";


const UnSoldMet = () => {
  return (
    <div
      style={{
        width: "100%",     
        height: "100%",
        background: "#FFFFFF",
        borderRadius: "10px",
        boxShadow:`rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em`
      }}
    >
      <div
        style={{
          width: "100%",        
          borderRadius: "10px 10px 0 0",
          padding: "20px 30px",
          background: "#BDD9A7",
          color:"green"
        }}
      >
        Unsold Metrics
      </div>

      <div
        style={{
          width: "100%",
          padding: "5px 30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "14px",
          background: "#FFFFFF",
          color:"#444444",
          marginTop:"5px",
          borderBottom:"1px solid rgba(67, 71, 85, 0.27)",
        }}
      >
        <div style={{ marginRight: "10px", width: "25%" }}>Auction ID</div>
        <div style={{ marginRight: "10px", width: "25%", textAlign: "center" }}>
          Ending on
        </div>
        <div style={{ marginRight: "10px", width: "25%", textAlign: "center" }}>
          Title
        </div>
        <div style={{ marginRight: "10px", width: "25%", textAlign: "center" }}>
          Bid amount
        </div>
      </div>

      <div
        className="scroll"
        style={{
          maxHeight: "290px",
          marginTop: "5px",
          overflowY: "scroll",
          background: "#FFFFFF",
          color:"#666666"
        }}
      >
        <div
          style={{
            width: "100%",
            padding: "5px 30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor:"pointer",
            borderBottom:"1px solid rgba(67, 71, 85, 0.27) "
          }}
        >
          <div style={{ marginRight: "10px", width: "25%", fontSize: "13px" }}>
            Auc1235
          </div>
          <div
            style={{
              marginRight: "10px",
              width: "25%",
              fontSize: "13px",
              textAlign: "center",
            }}
          >
            22/03/22
          </div>
          <div
            style={{
              marginRight: "10px",
              width: "25%",
              fontSize: "13px",
              textAlign: "center",
            }}
          >
            Auction title
          </div>
          <div
            style={{
              marginRight: "10px",
              width: "25%",
              fontSize: "13px",
              textAlign: "center",
            }}
          >
            12,000
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnSoldMet;
