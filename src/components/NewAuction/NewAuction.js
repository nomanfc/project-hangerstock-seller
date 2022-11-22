import React, { useState, useEffect, useMemo, useCallback } from "react";

import Router from "next/router";
import Link from "next/link";
import { Document, Page, pdfjs } from "react-pdf";
import countryList from "react-select-country-list";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import Button from "@mui/material/Button";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import FeedIcon from "@mui/icons-material/Feed";
import GavelIcon from "@mui/icons-material/Gavel";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import { Select as SelectM } from "@mui/material";
import { BsFillInfoCircleFill } from "react-icons/bs";
import InfoIcon from "@mui/icons-material/Info";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "react-phone-input-2/lib/style.css";
import { useUserContext } from "../../contexts/UserContext";
//api reqs
import {
  get_categories,
  get_categories_by_id,
  get_inventories,
  get_conditions,
  get_regions,
  get_countries,
  get_states,
  get_freights,
  create_postdetails,
  create_postdetails_mobile,
  create_postshipping,
  create_postbidding,
  create_postmanifest,
  create_upload_one,
  create_upload_two,
  create_upload_three,
  create_upload_four,
  submit_post_auctioin,
} from "../../http_requests/httpreq";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return windowSize;
}

const styleInfoMedia = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 10,
};

const styleInfoCell = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "90vh",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

const NewAuction = () => {
  const { user } = useUserContext();
  const windowWidth = useWindowSize();
  const [imagePreview1, setImagePreView1] = useState(true);
  const [imagePreview2, setImagePreView2] = useState(false);
  const [imagePreview3, setImagePreView3] = useState(false);
  const [imagePreview4, setImagePreView4] = useState(false);
  //user and auction id
  const [submit_ids, setSubmit_ids] = useState({ user_id: parseInt(user?.id) });
  const [success, setSuccess] = useState(false);
  const [submitButton, setSubmitButton] = useState(false);

  //media info modal
  const [openMediaInfo, setOpenMediaInfo] = React.useState(false);
  const handleOpenMediaInfo = () => setOpenMediaInfo(true);
  const handleCloseMediaInfo = () => setOpenMediaInfo(false);

  const handleClose = () => {
    setOpen(false);
  };

  //cellinfo modal
  //media info modal
  const [openCellInfo, setOpenCellInfo] = React.useState(false);
  const handleOpenCellInfo = () => setOpenCellInfo(true);
  const handleCloseCellInfo = () => setOpenCellInfo(false);

  //auction___id
  const [auctionId, setAuctionId] = useState({ auction_id: "" });
  const [userId, setUserId] = useState(1);

  //steps control
  const [productinfo, setproductinfo] = useState(true);
  const [shippinginfo, setshippinginfo] = useState(false);
  const [manifest, setmanifest] = useState(false);
  const [bidinfo, setbidinfo] = useState(false);
  const [mediafiles, setmediafiles] = useState(false);

  //images upload
  const [file1, setFile1] = useState();
  const [file2, setFile2] = useState();
  const [file3, setFile3] = useState();
  const [file4, setFile4] = useState();

  //disable upload button
  const [dis1, setDis1] = useState(false);
  const [dis2, setDis2] = useState(false);
  const [dis3, setDis3] = useState(false);
  const [dis4, setDis4] = useState(false);

  const Upload = "Upload";
  const Uploaded = "Uploaded";

  const handlePreview1 = (e) => {
    setImagePreView1(true);
    setImagePreView2(false);
    setImagePreView3(false);
    setImagePreView4(false);
  };

  const handlePreview2 = (e) => {
    setImagePreView1(false);
    setImagePreView2(true);
    setImagePreView3(false);
    setImagePreView4(false);
  };

  const handlePreview3 = (e) => {
    setImagePreView1(false);
    setImagePreView2(false);
    setImagePreView3(true);
    setImagePreView4(false);
  };

  const handlePreview4 = (e) => {
    setImagePreView1(false);
    setImagePreView2(false);
    setImagePreView3(false);
    setImagePreView4(true);
  };

  // const handleCancel1 =(e)=>{
  //   setFile1()
  // }

  // const handleCancel2 =(e)=>{

  // }

  // const handleCancel3 =(e)=>{

  // }

  // const handleCancel4 =(e)=>{

  // }

  const handleFile1Change = (e) => {
    setFile1({ [e.target.name]: e.target.files[0] });
    pic1.src = URL.createObjectURL(e.target.files[0]);
    pic5.src = URL.createObjectURL(e.target.files[0]);
  };

  //submit upload images
  const handleFile1Upload = () => {
    const formData1 = new FormData();
    formData1.append("image", file1.upload1);
    formData1.append("is_large", "1");
    formData1.append("auction_id", auctionId.auction_id);

    create_upload_one(formData1).then((response) => {
      if (response.data.success === 1) {
        setDis1(true);
      }
    });
  };

  const handleFile2Change = (e) => {
    // console.log(e.target.files[0])
    setFile2({ [e.target.name]: e.target.files[0] });
    pic2.src = URL.createObjectURL(e.target.files[0]);
    pic6.src = URL.createObjectURL(e.target.files[0]);
  };
  
  const handleFile2Upload = () => {
    const formData2 = new FormData();
    formData2.append("image", file2.upload2);
    formData2.append("is_large", "0");
    formData2.append("auction_id", auctionId.auction_id);

    create_upload_two(formData2).then((response) => {
      if (response.data.success === 1) {
        setDis2(true);
      }
    });
  };

  const handleFile3Change = (e) => {
    // console.log(e.target.files[0])
    setFile3({ [e.target.name]: e.target.files[0] });
    pic7.src = URL.createObjectURL(e.target.files[0]);
    pic3.src = URL.createObjectURL(e.target.files[0]);
  };
  const handleFile3Upload = () => {
    const formData3 = new FormData();
    formData3.append("image", file3.upload3);
    formData3.append("is_large", "0");
    formData3.append("auction_id", auctionId.auction_id);

    create_upload_three(formData3).then((response) => {
      if (response.data.success === 1) {
        setDis3(true);
      }
    });
  };

  const handleFile4Change = (e) => {
    // console.log(e.target.files[0])
    setFile4({ [e.target.name]: e.target.files[0] });
    pic8.src = URL.createObjectURL(e.target.files[0]);
    pic4.src = URL.createObjectURL(e.target.files[0]);
  };
  const handleFile4Upload = () => {
    const formData4 = new FormData();
    formData4.append("image", file4.upload4);
    formData4.append("is_large", "0");
    formData4.append("auction_id", auctionId.auction_id);

    create_upload_four(formData4).then((response) => {
      if (response.data.success === 1) {
        setDis4(true);
      }
    });
  };

  //post auction step 1 Category
  const [category, setCategory] = useState();
  const [categoryName, setCategoryName] = useState();
  const [cate, setCate] = useState();

  //post auction step 1 Inventory
  const [inventory, setInventory] = useState();
  const [inventoryName, setInventoryName] = useState();
  const [inv, setInv] = useState();

  //post auction step 1 Condition
  const [condition, setCondition] = useState();
  const [conditionName, setConditionName] = useState();
  const [con, setCon] = useState();

  //post auction step 1 region
  const [region, setRegion] = useState();
  const [regionName, setRegionName] = useState();
  const [reg, setReg] = useState();

  //post auction step 1 country
  const [country, setCountry] = useState();
  const [countryName, setCountryName] = useState();
  const [coun, setCoun] = useState();

  //post auction step 1 state
  const [states, setStates] = useState();
  const [stateName, setStateName] = useState();
  const [sta, setSta] = useState();

  //post auction step 2 freights type
  const [freight, setFreight] = useState();
  const [freightName, setFreightName] = useState();
  const [fre, setFre] = useState();

  //post auction step 2 shipping type
  const [ship, setShip] = useState();
  const [shipName, setShipName] = useState();
  const [shi, setShi] = useState();

  const handleChangeShippingType = (e) => {
    setShi(e.target.value);
    setShippingDetails({
      ...shippingDetails,
      [e.target.name]: e.target.value,
    });
  };

  //post auction step 4 bid duration
  const [duration, setDuration] = useState();
  const handleDurationChange = (e) => {
    setDuration(e.target.value);
    setBidDetails({
      ...bidDetails,
      [e.target.name]: e.target.value,
    });
  };

  //product details create
  const [productDetails, setProductDetails] = useState({
    user_id: parseInt(user?.id),
  });
  const [productDetailsMobile, setProductDetailsMobile] = useState({
    user_id: parseInt(user?.id),
    auction_id: parseInt(auctionId?.auction_id),
  });
  const [shippingDetails, setShippingDetails] = useState({
    user_id: parseInt(user?.id),
    auction_id: parseInt(auctionId?.auction_id),
  });
  const [manifestDetails, setManifestDetails] = useState({
    user_id: parseInt(user?.id),
    auction_id: parseInt(auctionId?.auction_id),
  });
  const [bidDetails, setBidDetails] = useState({
    user_id: parseInt(user?.id),
    auction_id: parseInt(auctionId?.auction_id),
  });
  const [mediaDetails, setMediaDetails] = useState({});

  //Manifest details
  const [countManifest, setCountManifest] = useState([
    {
      category: "",
      description: "dd",
      quantity: "",
      retail_per_unit: "",
      total_retail: "",
      unit_per_cost: "",
      manufacturer: "",
      model: "",
      mobile_grading: "",
      auction_id: parseInt(auctionId.auction_id),
    },
  ]);

  const [countM, setCountM] = useState(1);

  const handleAuctionManifest = (e) => {
    if (countManifest[countManifest.length - 1].description) {
      setCountM(0);
      setCountManifest([
        ...countManifest,
        {
          category: "",
          description: "dd",
          quantity: "",
          retail_per_unit: "",
          total_retail: "",
          unit_per_cost: "",
          manufacturer: "",
          model: "",
          mobile_grading: "",
          auction_id: parseInt(auctionId.auction_id),
        },
      ]);
    }
  };

  //get categories
  const fetchData = useCallback(async () => {
    const data = await get_categories();
    setCategory(data.data.data);
  }, []);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  const handleChangeCate = (event) => {
    setCate(event.target.value);

    setProductDetails({
      ...productDetails,
      category_id: event.target.value,
    });

    setTimeout(() => {
      get_categories_by_id(event.target.value).then((res) => {
        setCategoryName(res.data.data.category_name);
        setManifestDetails({
          ...manifestDetails,
          category: res.data.data.category_name,
        });
      });
    }, [500]);
  };

  //get inventories
  const fetchDataInv = useCallback(async () => {
    const data = await get_inventories();
    setInventory(data.data.data);
  }, []);

  useEffect(() => {
    fetchDataInv().catch(console.error);
  }, [fetchDataInv]);

  const handleChangeInv = (event) => {
    setInv(event.target.value);
    setProductDetails({
      ...productDetails,
      inventory_type_id: event.target.value,
    });
  };

  //get condition
  const fetchDataCon = useCallback(async () => {
    const data = await get_conditions();
    setCondition(data.data.data);
  }, []);

  useEffect(() => {
    fetchDataCon().catch(console.error);
  }, [fetchDataCon]);

  const handleChangeCon = (event) => {
    setCon(event.target.value);
    setProductDetails({
      ...productDetails,
      condition_id: event.target.value,
    });
  };

  //get Region
  const fetchDataReg = useCallback(async () => {
    const data = await get_regions();
    setRegion(data.data.data);
  }, []);

  useEffect(() => {
    fetchDataReg().catch(console.error);
  }, [fetchDataReg]);

  const handleChangeReg = (event) => {
    setReg(event.target.value);

    setProductDetails({
      ...productDetails,
      region_id: event.target.value,
    });

    setTimeout(() => {
      get_countries(event.target.value).then(
        (res) => {
          setCountry(res.data.data);
        },
        [500]
      );
    });
  };

  //get Country
  const handleChangeCoun = (event) => {
    setCoun(event.target.value);
    setProductDetails({
      ...productDetails,
      country_id: event.target.value,
    });

    setTimeout(() => {
      get_states(event.target.value).then(
        (res) => {
          setStates(res.data.data);
        },
        [500]
      );
    });
  };

  //get states
  const handleChangeSta = (event) => {
    setSta(event.target.value);
    setProductDetails({
      ...productDetails,
      state_id: event.target.value,
    });
  };

  //get freights
  const fetchDataFre = useCallback(async () => {
    const data = await get_freights();
    setFreight(data.data.data);
  }, []);

  useEffect(() => {
    fetchDataFre().catch(console.error);
  }, [fetchDataFre]);

  const handleChangeFre = (event) => {
    setFre(event.target.value);

    setShippingDetails({
      ...shippingDetails,
      freight_type_id: event.target.value,
    });
  };

  //product details
  const handle_Product_Info = (e) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handle_Product_Info_Mobile = (e) => {
    setProductDetailsMobile({
      ...productDetailsMobile,
      [e.target.name]: e.target.value,
    });
  };

  //Shipping details
  const handle_Shipping_Info = (e) => {
    setShippingDetails({
      ...shippingDetails,
      [e.target.name]: e.target.value,
    });
  };

  //bid info
  const handle_Bid_Info = (e) => {
    setDuration(e.target.value);
    setBidDetails({
      ...bidDetails,
      [e.target.name]: e.target.value,
    });
  };

  //manifest cahnages
  const handleManifestChange = (i, e) => {
    let countManifests = [...countManifest];
    countManifests[i][e.target.name] = e.target.value;
    countManifests[i].auction_id = auctionId.auction_id;
    setCountManifest(countManifests);
  };

  const handleRemoveManifest = (i) => {
    let countManifests = [...countManifest];
    countManifests.splice(i, 1);
    setCountManifest(countManifests);
  };

  const handleProductinfo = () => {
    setproductinfo(true);
    setshippinginfo(false);
    setmanifest(false);
    setbidinfo(false);
    setmediafiles(false);
  };

  const handleShippinginfo = () => {
    if (
      productDetails.title &&
      productDetails.category_id &&
      productDetails.region_id &&
      productDetails.country_id
    ) {
      create_postdetails(productDetails).then((res) => {
        if (res.data.id > 0) {
          setAuctionId({
            ...auctionId,
            auction_id: parseInt(res.data.id),
          });

          setProductDetailsMobile({
            ...productDetailsMobile,
            auction_id: parseInt(res.data.id),
          });

          setSubmit_ids({
            ...submit_ids,
            auction_id: parseInt(res.data.id),
          });

          setShippingDetails({
            ...shippingDetails,
            auction_id: parseInt(res.data.id),
          });

          setManifestDetails({
            ...manifestDetails,
            auction_id: parseInt(res.data.id),
          });

          setBidDetails({
            ...bidDetails,
            auction_id: parseInt(res.data.id),
          });

          setproductinfo(false);
          setshippinginfo(true);
          setmanifest(false);
          setbidinfo(false);
          setmediafiles(false);
        }
      });
    }
  };

  const handleShippinginfoSave = () => {
    if (
      productDetails.title &&
      productDetails.category_id &&
      productDetails.region_id &&
      productDetails.country_id
    ) {
      create_postdetails(productDetails).then((res) => {
        if (res.data.id > 0) {
          setAuctionId({
            ...auctionId,
            auction_id: parseInt(res.data.id),
          });

          setProductDetailsMobile({
            ...productDetailsMobile,
            auction_id: parseInt(res.data.id),
          });

          setSubmit_ids({
            ...submit_ids,
            auction_id: parseInt(res.data.id),
          });

          setShippingDetails({
            ...shippingDetails,
            auction_id: parseInt(res.data.id),
          });

          setManifestDetails({
            ...manifestDetails,
            auction_id: parseInt(res.data.id),
          });

          setBidDetails({
            ...bidDetails,
            auction_id: parseInt(res.data.id),
          });

          Router.push("/auctions/draft");
        }
      });
    }
  };

  const handleManifest = () => {
    if (categoryName === "mobile" || categoryName === "Mobile") {
      create_postdetails_mobile(productDetailsMobile);
    }

    if (
      shippingDetails.ship_from &&
      shippingDetails.ship_to &&
      shippingDetails.freight_type_id &&
      shippingDetails.shipping_type
    ) {
      create_postshipping(shippingDetails).then((res) => {
        if (res.data.success === 1) {
          setproductinfo(false);
          setshippinginfo(false);
          setmanifest(true);
          setbidinfo(false);
          setmediafiles(false);
        }
      });
    }
  };

  const handleManifestSave = () => {
    if (categoryName === "mobile" || categoryName === "Mobile") {
      create_postdetails_mobile(productDetailsMobile);
    }

    if (
      shippingDetails.ship_from &&
      shippingDetails.ship_to &&
      shippingDetails.freight_type_id &&
      shippingDetails.shipping_type
    ) {
      create_postshipping(shippingDetails).then((res) => {
        if (res.data.success === 1) {
          Router.push("/auctions/draft");
        }
      });
    }
  };

  const handleBidinfo = () => {
    for (var i = 0; i < countManifest.length; i++) {
      create_postmanifest(countManifest[i]).then((found) => {
        // console.log(found);
      });
    }

    setproductinfo(false);
    setshippinginfo(false);
    setmanifest(false);
    setbidinfo(true);
    setmediafiles(false);
  };

  const handleBidinfoSave = () => {
    for (var i = 0; i < countManifest.length; i++) {
      create_postmanifest(countManifest[i]).then((found) => {
        // console.log(found);
        Router.push("/auctions/draft");
      });
    }
  };

  const handleMediafiles = () => {
    if (bidDetails.opening_bid_amount && bidDetails.duration_days) {
      create_postbidding(bidDetails).then((res) => {
        if (res.data.success === 1) {
          setproductinfo(false);
          setshippinginfo(false);
          setmanifest(false);
          setbidinfo(false);
          setmediafiles(true);
        }
      });
    }
  };

  const handleMediafilesSave = () => {
    if (bidDetails.opening_bid_amount && bidDetails.duration_days) {
      create_postbidding(bidDetails).then((res) => {
        if (res.data.success === 1) {
          Router.push("/auctions/draft");
        }
      });
    }
  };

  const handleSubmitAuctions = () => {
    submit_post_auctioin(submit_ids).then((res) => {
      if (res.data.success === 1) {
        setSuccess(true);
        setSubmitButton(true);
        setTimeout(() => {
          setSuccess(false);
          Router.push("/auctions/submitted");
        }, 5000);
      }
    });
  };

  const options = useMemo(() => countryList().getData(), []);

  useEffect(() => {
    function reportWindowSize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", reportWindowSize);
    return () => window.removeEventListener("resize", reportWindowSize);
  }, []);

  const customStyles = {
    control: (base, state) => ({
      ...base,
      height: "40px",
    }),

    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      background: "#FFFFFF",
      zIndex: 1,
    }),

    menu: (base) => ({
      ...base,
      background: "#FFFFFF",
      zIndex: 100,
    }),
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      <Modal
        open={openCellInfo}
        onClose={handleCloseCellInfo}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleInfoCell}>
          <iframe
            src="https://docs.google.com/viewerng/viewer?url=https://main.hangerstock.com/api/auction/media/file/auction-id-1::large-0::3d7771776f6cc2c4b93ea3f069c9c6ec&embedded=true"
            // src="https://main.hangerstock.com/api/auction/media/file/auction-id-1::large-0::3d7771776f6cc2c4b93ea3f069c9c6ec"
            frameborder="0"
            height="100%"
            width="100%"
          ></iframe>
        </Box>
      </Modal>

      <Modal
        open={openMediaInfo}
        onClose={handleCloseMediaInfo}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleInfoMedia}>
          <h2 style={{ color: "#599f22" }}>Upload Conditions</h2>
          <div style={{ marginTop: "20px" }}>
            <div>
              <h4>PRODUCT IMAGE</h4>
              <div style={{ color: "gray" }}>
                The product image is your first impression to buyers and one of
                the most important elements of your listing.
              </div>
            </div>

            <div style={{ marginTop: "20px" }}>
              <h4>IMAGE REQUIREMENTS</h4>
              <ul style={{ color: "gray", marginLeft: "18px" }}>
                <li>Use a white background</li>
                <li>Show the entire product</li>
                <li>Your product should be the focus of the image</li>
                <li>Avoid words, logos and watermarks on the image</li>
              </ul>
            </div>

            <div
              style={{
                background: "#DEECD3",
                color: "#599f22",
                padding: "20px 30px",
                marginTop: "20px",
                display: "flex",
                fontWeight: "600",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  background: "#DEECD3",
                  color: "#599f22",
                  display: "flex",
                  fontWeight: "600",
                  alignItems: "center",
                }}
              >
                <EmojiObjectsIcon
                  style={{ fontSize: "20px", marginRight: "10px" }}
                />
                Don't have a professional product image?
              </div>

              <a
                style={{
                  borderBottom: "1px solid blue",
                  color: "blue",
                  fontWeight: "400",
                  fontSize: "14px",
                  marginLeft: "25px",
                }}
                href="#"
              >
                We can help you to make retail ready image
              </a>
            </div>
          </div>
        </Box>
      </Modal>

      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Auction has been submitted for admin approval"
        action={action}
      />

      <div style={{ width: "100%" }}>
        <div
          style={{
            margin: "15px auto",
          }}
        >
          <div
            style={{
              margin: "50px auto",
              display: "flex",
            }}
          >
            <div
              style={{
                height: "fit-content",
                width: "fit-content",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={{ marginRight: "10px" }}>
                <FeedIcon
                  style={{
                    color: productinfo ? "#599f22" : "gray",
                    fontSize: "20px",
                  }}
                />
              </div>
              <div
                style={{
                  color: productinfo ? "#599f22" : "gray",
                  fontSize: "13px",
                  fontWeight: "600",
                  marginRight: "15px",
                  display: "flex",
                }}
              >
                <span
                  style={{
                    display: windowWidth.width < 800 ? "none" : "block",
                  }}
                >
                  Product Info
                </span>

                <ArrowRightIcon />
              </div>
            </div>

            <div
              style={{
                height: "fit-content",
                width: "fit-content",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={{ marginRight: "10px" }}>
                <LocalShippingIcon
                  style={{
                    color: shippinginfo ? "#599f22" : "gray",
                    fontSize: "20px",
                  }}
                />
              </div>
              <div
                style={{
                  color: shippinginfo ? "#599f22" : "gray",
                  fontSize: "13px",
                  fontWeight: "600",
                  marginRight: "15px",
                  display: "flex",
                }}
              >
                <span
                  style={{
                    display: windowWidth.width < 800 ? "none" : "block",
                  }}
                >
                  Shipping Info
                </span>

                <ArrowRightIcon />
              </div>
            </div>

            <div
              style={{
                height: "fit-content",
                width: "fit-content",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={{ marginRight: "10px" }}>
                <FactCheckIcon
                  style={{
                    color: manifest ? "#599f22" : "gray",
                    fontSize: "20px",
                  }}
                />
              </div>
              <div
                style={{
                  color: manifest ? "#599f22" : "gray",
                  fontSize: "13px",
                  fontWeight: "600",
                  marginRight: "15px",
                  display: "flex",
                }}
              >
                <span
                  style={{
                    display: windowWidth.width < 800 ? "none" : "block",
                  }}
                >
                  Auction Manifest
                </span>

                <ArrowRightIcon />
              </div>

              <div
                style={{
                  height: "fit-content",
                  width: "fit-content",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div style={{ marginRight: "10px" }}>
                  <GavelIcon
                    style={{
                      color: bidinfo ? "#599f22" : "gray",
                      fontSize: "20px",
                    }}
                  />
                </div>
                <div
                  style={{
                    color: bidinfo ? "#599f22" : "gray",
                    fontSize: "13px",
                    fontWeight: "600",
                    marginRight: "15px",
                    display: "flex",
                  }}
                >
                  <span
                    style={{
                      display: windowWidth.width < 800 ? "none" : "block",
                    }}
                  >
                    Bid Info
                  </span>

                  <ArrowRightIcon />
                </div>
              </div>

              <div
                style={{
                  height: "fit-content",
                  width: "fit-content",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div style={{ marginRight: "10px" }}>
                  <PermMediaIcon
                    style={{
                      color: mediafiles ? "#599f22" : "gray",
                      fontSize: "20px",
                    }}
                  />
                </div>
                <div
                  style={{
                    color: mediafiles ? "#599f22" : "gray",
                    fontSize: "13px",
                    fontWeight: "600",
                    marginRight: "15px",
                    display: "flex",
                  }}
                >
                  <span
                    style={{
                      display: windowWidth.width < 800 ? "none" : "block",
                    }}
                  >
                    Media Files
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: productinfo ? "block" : "none" }}>
            <div
              style={{
                width: "100%",
                height: "fit-content",
                borderRadius: "10px",
                margin: "10px auto 20px auto",
                boxShadow:
                  "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
              }}
            ></div>
            <div
              style={{
                width: "100%",
                height: "fit-content",
                borderRadius: "10px",
                margin: "10px auto",
                boxShadow:
                  "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
              }}
            >
              <div
                style={{
                  padding: "20px 35px",
                  width: "100%",
                  background: "#DEECD3",
                  fontSize: "18px",
                  borderRadius: "10px 10px 0px 0px",
                }}
              >
                Product Informations
              </div>

              <div
                style={{
                  padding: "30px 35px",
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: windowWidth.width < 800 ? "column" : "row",
                  }}
                >
                  <div
                    style={{
                      width: windowWidth.width < 800 ? "100%" : "47%",
                    }}
                  >
                    <FormControl fullWidth size="small" style={{}}>
                      <InputLabel id="demo-simple-select-label">
                        Region
                      </InputLabel>
                      <SelectM
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={reg || ""}
                        label="Region"
                        onChange={handleChangeReg}
                      >
                        {region?.map((data, index) => (
                          <MenuItem value={data?.id} key={index}>
                            {data?.name}
                          </MenuItem>
                        ))}
                      </SelectM>
                    </FormControl>

                    <TextField
                      size="small"
                      fullWidth
                      id="outlined-basic"
                      label="Title"
                      name="title"
                      onChange={handle_Product_Info}
                      variant="outlined"
                      style={{ marginTop: "10px" }}
                    />

                    <FormControl
                      fullWidth
                      size="small"
                      style={{ marginTop: "10px" }}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Category
                      </InputLabel>
                      <SelectM
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={cate || ""}
                        label="Category"
                        onChange={handleChangeCate}
                      >
                        {category?.map((data, index) => (
                          <MenuItem value={data?.id} key={index}>
                            {data?.category_name}
                          </MenuItem>
                        ))}
                      </SelectM>
                    </FormControl>

                    <TextField
                      style={{ marginTop: "10px" }}
                      size="small"
                      fullWidth
                      id="outlined-basic"
                      label="Quantity"
                      name="quantity"
                      onChange={handle_Product_Info}
                      variant="outlined"
                    />

                    <div style={{}}>
                      <TextField
                        style={{
                          marginTop: "10px",
                          display:
                            categoryName === "mobile" ||
                            categoryName === "Mobile"
                              ? "block"
                              : "none",
                        }}
                        size="small"
                        fullWidth
                        id="outlined-basic"
                        label="Cellphone Grade"
                        name="cell_phone_grade"
                        onChange={handle_Product_Info_Mobile}
                        variant="outlined"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <InfoIcon
                                onClick={handleOpenCellInfo}
                                style={{
                                  cursor: "pointer",
                                  color: "orange",
                                  fontSize: "20px",
                                }}
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </div>

                    {/* <TextField
                      style={{ marginTop: "10px" }}
                      size="small"
                      fullWidth
                      id="outlined-basic"
                      label="Cosmetic Condition"
                      name="cosmetic_condition"
                      onChange={handle_Product_Info}
                      variant="outlined"
                    /> */}

                    {/* <TextField
                      style={{ marginTop: "10px" }}
                      type="number"
                      size="small"
                      fullWidth
                      id="outlined-basic"
                      label="Original Retail Price"
                      name="original_retail_price"
                      onChange={handle_Product_Info}
                      variant="outlined"
                    /> */}

                    <TextField
                      style={{
                        marginTop: "10px",
                        display:
                          categoryName === "mobile" || categoryName === "Mobile"
                            ? "block"
                            : "none",
                      }}
                      size="small"
                      fullWidth
                      id="outlined-basic"
                      label="Manufacturer"
                      name="manufacturer"
                      onChange={handle_Product_Info_Mobile}
                      variant="outlined"
                    />

                    <TextField
                      style={{
                        marginTop: "10px",
                        display:
                          categoryName === "mobile" || categoryName === "Mobile"
                            ? "block"
                            : "none",
                      }}
                      size="small"
                      fullWidth
                      id="outlined-basic"
                      label="Carrier"
                      name="carrier"
                      onChange={handle_Product_Info_Mobile}
                      variant="outlined"
                    />
                  </div>

                  <div
                    style={{
                      width: windowWidth.width < 800 ? "100%" : "47%",
                      marginTop: windowWidth.width < 800 ? "10px" : "0px",
                    }}
                  >
                    <FormControl fullWidth size="small" style={{}}>
                      <InputLabel id="demo-simple-select-label">
                        Country
                      </InputLabel>
                      <SelectM
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={coun || ""}
                        label="Country"
                        onChange={handleChangeCoun}
                      >
                        {country?.map((data, index) => (
                          <MenuItem value={data?.id} key={index}>
                            {data?.name}
                          </MenuItem>
                        ))}
                      </SelectM>
                    </FormControl>

                    <FormControl
                      fullWidth
                      size="small"
                      style={{ marginTop: "10px" }}
                    >
                      <InputLabel id="demo-simple-select-label">
                        State
                      </InputLabel>
                      <SelectM
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sta || ""}
                        label="Country"
                        onChange={handleChangeSta}
                      >
                        {states?.map((data, index) => (
                          <MenuItem value={data?.id} key={index}>
                            {data?.name}
                          </MenuItem>
                        ))}
                      </SelectM>
                    </FormControl>

                    <FormControl
                      fullWidth
                      size="small"
                      style={{ marginTop: "10px" }}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Inventory Type
                      </InputLabel>
                      <SelectM
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={inv || ""}
                        label="Inventory Type"
                        onChange={handleChangeInv}
                      >
                        {inventory?.map((data, index) => (
                          <MenuItem key={index} value={data?.id}>
                            {data?.inventory_name}
                          </MenuItem>
                        ))}
                      </SelectM>
                    </FormControl>

                    <FormControl
                      fullWidth
                      size="small"
                      style={{ marginTop: "10px" }}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Condition type
                      </InputLabel>
                      <SelectM
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={con || ""}
                        label="Condition type"
                        onChange={handleChangeCon}
                      >
                        {condition?.map((data, index) => (
                          <MenuItem key={index} value={data.id}>
                            {data.condition_name}
                          </MenuItem>
                        ))}
                      </SelectM>
                    </FormControl>

                    <TextField
                      style={{
                        marginTop: "10px",
                        display:
                          categoryName === "mobile" || categoryName === "Mobile"
                            ? "block"
                            : "none",
                      }}
                      size="small"
                      fullWidth
                      id="outlined-basic"
                      label="Item#"
                      name="model"
                      onChange={handle_Product_Info_Mobile}
                      variant="outlined"
                    />

                    <TextField
                      style={{
                        marginTop: "10px",
                        display:
                          categoryName === "mobile" || categoryName === "Mobile"
                            ? "block"
                            : "none",
                      }}
                      size="small"
                      fullWidth
                      id="outlined-basic"
                      label="Memory"
                      name="memory"
                      onChange={handle_Product_Info_Mobile}
                      variant="outlined"
                    />
                  </div>
                </div>
                <div
                  style={{
                    width: "100%",
                  }}
                >
                  <TextField
                    style={{ marginTop: "10px" }}
                    size="small"
                    fullWidth
                    id="outlined-basic"
                    label="Packaging Details"
                    name="packaging_details"
                    onChange={handle_Product_Info}
                    variant="outlined"
                  />

                  <TextField
                    style={{ marginTop: "10px" }}
                    size="small"
                    fullWidth
                    id="outlined-basic"
                    label="Product Description"
                    name="description"
                    multiline
                    rows={4}
                    onChange={handle_Product_Info}
                    variant="outlined"
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                width: windowWidth.width < 1200 ? "100%" : "100%",
                margin: "auto",
                paddingBottom: "150px",
              }}
            >
              <Button
                onClick={handleShippinginfo}
                style={{
                  width: windowWidth.width < 1200 ? "100%" : "100%",
                  padding: "10px 100px",
                  background: "#599f22",
                  color: "#FFFFFF",
                  textTransform: "none",
                  marginTop: "10px",
                }}
              >
                Save and next
              </Button>

              <div
                onClick={handleShippinginfoSave}
                style={{
                  width: "fit-content",
                  margin: "10px auto",
                }}
              >
                <Button
                  style={{
                    color: "#599f22",
                    width: "fit-content",
                    margin: "auto",
                    textTransform: "none",
                    borderRadius: "none",
                  }}
                >
                  Save and Complete Later
                </Button>
              </div>
            </div>
          </div>

          <div style={{ display: shippinginfo ? "block" : "none" }}>
            {" "}
            <div
              style={{
                width: "100%",
                height: "fit-content",
                borderRadius: "10px",
                margin: "50px auto 20px auto",
                boxShadow:
                  "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
              }}
            >
              <div
                style={{
                  padding: "20px 35px",
                  width: "100%",
                  background: "#DEECD3",
                  fontSize: "18px",
                  borderRadius: "10px 10px 0px 0px",
                }}
              >
                Shipping Information
              </div>

              <div
                style={{
                  padding: "30px 35px",
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: windowWidth.width < 800 ? "column" : "row",
                  }}
                >
                  <div
                    style={{
                      width: windowWidth.width < 800 ? "100%" : "47%",
                    }}
                  >
                    <TextField
                      size="small"
                      fullWidth
                      id="outlined-basic"
                      label="Shiping From"
                      name="ship_from"
                      onChange={handle_Shipping_Info}
                      variant="outlined"
                    />

                    <FormControl
                      fullWidth
                      size="small"
                      style={{ marginTop: "10px" }}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Shipping Type
                      </InputLabel>
                      <SelectM
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={shi || ""}
                        label="Shipping Type"
                        name="shipping_type"
                        onChange={handleChangeShippingType}
                      >
                        <MenuItem value="Air">Air</MenuItem>
                        <MenuItem value="Ocean">Ocean</MenuItem>
                      </SelectM>
                    </FormControl>
                  </div>

                  <div
                    style={{
                      width: windowWidth.width < 800 ? "100%" : "47%",
                      marginTop: windowWidth.width < 800 ? "10px" : "0px",
                    }}
                  >
                    <TextField
                      size="small"
                      fullWidth
                      id="outlined-basic"
                      label="Shiping To"
                      name="ship_to"
                      onChange={handle_Shipping_Info}
                      variant="outlined"
                    />

                    <FormControl
                      fullWidth
                      size="small"
                      style={{ marginTop: "10px" }}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Freight Type
                      </InputLabel>
                      <SelectM
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={fre || ""}
                        label="Freight Type"
                        name="freight_type_id"
                        onChange={handleChangeFre}
                      >
                        {freight?.map((data, index) => (
                          <MenuItem value={data.id}>
                            {data.freight_name}
                          </MenuItem>
                        ))}
                      </SelectM>
                    </FormControl>
                  </div>
                </div>
                <div
                  style={{
                    width: "100%",
                  }}
                >
                  <TextField
                    style={{ marginTop: "10px" }}
                    size="small"
                    fullWidth
                    id="outlined-basic"
                    label="Shipping Cost"
                    name="shipping_cost"
                    onChange={handle_Shipping_Info}
                    variant="outlined"
                  />
                </div>
                <div
                  style={{
                    width: "100%",
                  }}
                >
                  <TextField
                    style={{ marginTop: "10px" }}
                    size="small"
                    fullWidth
                    id="outlined-basic"
                    label="Shipping Note"
                    name="shipping_note"
                    multiline
                    rows={4}
                    onChange={handle_Shipping_Info}
                    variant="outlined"
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                width: windowWidth.width < 1200 ? "100%" : "100%",
                margin: "auto",
                paddingBottom: "150px",
              }}
            >
              <Button
                onClick={handleManifest}
                style={{
                  width: windowWidth.width < 1200 ? "100%" : "100%",
                  padding: "10px 100px",
                  background: "#599f22",
                  color: "#FFFFFF",
                  textTransform: "none",
                  marginTop: "10px",
                }}
              >
                Save and next
              </Button>

              <div
                onClick={handleManifestSave}
                style={{
                  width: "fit-content",
                  margin: "10px auto",
                }}
              >
                <Button
                  style={{
                    color: "#599f22",
                    width: "fit-content",
                    margin: "auto",
                    textTransform: "none",
                    borderRadius: "none",
                  }}
                >
                  Save and Complete Later
                </Button>
              </div>
            </div>
          </div>
          <div style={{ display: manifest ? "block" : "none" }}>
            {" "}
            <div
              style={{
                width: "100%",
                height: "fit-content",
                borderRadius: "10px",
                margin: "50px auto 20px auto",
                boxShadow:
                  "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
              }}
            >
              <div
                style={{
                  padding: "20px 35px",
                  width: "100%",
                  background: "#DEECD3",
                  fontSize: "18px",
                  borderRadius: "10px 10px 0px 0px",
                }}
              >
                Auction Manifest
              </div>

              <form onSubmit={handleBidinfo}>
                {countManifest.map((element, index) => (
                  <div
                    style={{
                      padding: "30px 35px",
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection:
                          windowWidth.width < 800 ? "column" : "row",
                      }}
                    >
                      <div
                        style={{
                          width: windowWidth.width < 800 ? "100%" : "47%",
                        }}
                      >
                        <FormControl fullWidth size="small" style={{}}>
                          <InputLabel id="demo-simple-select-label">
                            Category
                          </InputLabel>
                          <SelectM
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Category"
                            name="category"
                            onChange={(e) => handleManifestChange(index, e)}
                          >
                            <MenuItem value={categoryName}>
                              {categoryName}
                            </MenuItem>
                          </SelectM>
                        </FormControl>

                        <TextField
                          style={{ marginTop: "10px" }}
                          size="small"
                          fullWidth
                          id="outlined-basic"
                          label="Retail Per Unit"
                          name="retail_per_unit"
                          onChange={(e) => handleManifestChange(index, e)}
                          variant="outlined"
                        />

                        <TextField
                          style={{
                            marginTop: "10px",
                          }}
                          size="small"
                          fullWidth
                          id="outlined-basic"
                          label="Manufacturer"
                          name="manufacturer"
                          onChange={(e) => handleManifestChange(index, e)}
                          variant="outlined"
                        />
                      </div>

                      <div
                        style={{
                          width: windowWidth.width < 800 ? "100%" : "47%",
                          marginTop: windowWidth.width < 800 ? "10px" : "0px",
                        }}
                      >
                        <TextField
                          size="small"
                          fullWidth
                          id="outlined-basic"
                          label="Quantity"
                          name="quantity"
                          onChange={(e) => handleManifestChange(index, e)}
                          variant="outlined"
                        />

                        <TextField
                          style={{ marginTop: "10px" }}
                          size="small"
                          fullWidth
                          id="outlined-basic"
                          label="Unit Per Cost"
                          name="unit_per_cost"
                          onChange={(e) => handleManifestChange(index, e)}
                          variant="outlined"
                        />

                        <TextField
                          style={{
                            marginTop: "10px",
                          }}
                          size="small"
                          fullWidth
                          id="outlined-basic"
                          label="Itam#"
                          name="model"
                          onChange={(e) => handleManifestChange(index, e)}
                          variant="outlined"
                        />
                      </div>
                    </div>

                    <div
                      style={{
                        width: "100%",
                      }}
                    >
                      <TextField
                        style={{
                          marginTop: "10px",
                        }}
                        size="small"
                        fullWidth
                        id="outlined-basic"
                        label="Product Condition"
                        name="product_condition"
                        onChange={(e) => handleManifestChange(index, e)}
                        variant="outlined"
                      />

                      <TextField
                        style={{
                          marginTop: "10px",
                          display:
                            categoryName === "mobile" ||
                            categoryName === "Mobile"
                              ? "block"
                              : "none",
                        }}
                        size="small"
                        fullWidth
                        id="outlined-basic"
                        label="Mobile Grading"
                        name="mobile_grading"
                        onChange={(e) => handleManifestChange(index, e)}
                        variant="outlined"
                      />
                    </div>

                    <div
                      style={{
                        width: "100%",
                      }}
                    >
                      <TextField
                        style={{ marginTop: "10px" }}
                        size="small"
                        fullWidth
                        id="outlined-basic"
                        label="Total Retail"
                        name="total_retail"
                        onChange={(e) => handleManifestChange(index, e)}
                        variant="outlined"
                      />

                      <TextField
                        style={{ marginTop: "10px" }}
                        size="small"
                        fullWidth
                        id="outlined-basic"
                        label="Description"
                        name="description"
                        multiline
                        rows={4}
                        onChange={(e) => handleManifestChange(index, e)}
                        variant="outlined"
                      />
                    </div>

                    {index && index === countManifest.length - 1 ? null : (
                      <Button
                        onClick={handleAuctionManifest}
                        variant="outlined"
                        style={{
                          display: countManifest.length >= 2 ? "none" : "block",
                          cursor: "pointer",
                          width:
                            windowWidth.width < 1200 ? "100%" : "fit-content",
                          padding:
                            windowWidth.width < 1200 ? "5px" : "5px 100px",
                          fontSize: "14px",
                          margin: "25px auto 0px auto",
                          textTransform: "none",
                          color: "#599f22",
                        }}
                      >
                        Add New
                      </Button>
                    )}
                    {index && index === countManifest.length - 1 ? (
                      <div
                        style={{
                          width: windowWidth.width < 1200 ? "100%" : "70%",
                          display: "flex",
                          flexDirection:
                            windowWidth.width < 1200 ? "column" : "row",
                          margin: "25px auto 0px auto",
                        }}
                      >
                        <Button
                          variant="outlined"
                          onClick={handleAuctionManifest}
                          style={{
                            display: countM === 1 ? "none" : "block",
                            cursor: "pointer",
                            width:
                              windowWidth.width < 1200 ? "100%" : "fit-content",
                            padding:
                              windowWidth.width < 1200 ? "5px" : "5px 100px",
                            fontSize: "14px",
                            margin:
                              windowWidth.width < 1200 ? "10px auto" : "auto",

                            textTransform: "none",
                            color: "#599f22",
                          }}
                        >
                          Add New
                        </Button>

                        <Button
                          variant="outlined"
                          style={{
                            cursor: "pointer",
                            width:
                              windowWidth.width < 1200 ? "100%" : "fit-content",
                            padding:
                              windowWidth.width < 1200 ? "5px" : "5px 100px",
                            padding: "5px 100px",
                            fontSize: "14px",
                            margin:
                              windowWidth.width < 1200 ? "10px auto" : "auto",
                            textTransform: "none",
                            color: "#ff002f",
                          }}
                          onClick={() => handleRemoveManifest(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : null}
                  </div>
                ))}
              </form>
            </div>
            <div
              style={{
                width: windowWidth.width < 1200 ? "100%" : "100%",
                margin: "auto",
                paddingBottom: "150px",
              }}
            >
              <Button
                onClick={handleBidinfo}
                type="submit"
                style={{
                  width: windowWidth.width < 1200 ? "100%" : "100%",
                  padding: "10px 100px",
                  background: "#599f22",
                  color: "#FFFFFF",
                  textTransform: "none",
                  marginTop: "10px",
                }}
              >
                Save and next
              </Button>

              <div
                onSubmit={handleBidinfoSave}
                style={{
                  width: "fit-content",
                  margin: "10px auto",
                }}
              >
                <Button
                  style={{
                    color: "#599f22",
                    width: "fit-content",
                    margin: "auto",
                    textTransform: "none",
                    borderRadius: "none",
                  }}
                >
                  Save and Complete Later
                </Button>
              </div>
            </div>
          </div>

          <div style={{ display: bidinfo ? "block" : "none" }}>
            <div
              style={{
                width: "100%",
                height: "fit-content",
                borderRadius: "10px",
                margin: "10px auto",
                boxShadow:
                  "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
              }}
            >
              <div
                style={{
                  padding: "20px 35px",
                  width: "100%",
                  background: "#DEECD3",
                  fontSize: "18px",
                  borderRadius: "10px 10px 0px 0px",
                }}
              >
                Bid Information
              </div>

              <div
                style={{
                  padding: "30px 35px",
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: windowWidth.width < 800 ? "column" : "row",
                  }}
                >
                  <div
                    style={{
                      width: windowWidth.width < 800 ? "100%" : "47%",
                    }}
                  >
                    <TextField
                      size="small"
                      fullWidth
                      id="outlined-basic"
                      label="Opening Bid Amount"
                      name="opening_bid_amount"
                      onChange={handle_Bid_Info}
                      variant="outlined"
                    />
                  </div>

                  <div
                    style={{
                      width: windowWidth.width < 800 ? "100%" : "47%",
                      marginTop: windowWidth.width < 800 ? "10px" : "0px",
                    }}
                  >
                    <FormControl fullWidth size="small">
                      <InputLabel id="demo-simple-select-label">
                        Duration (days)
                      </InputLabel>
                      <SelectM
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={duration || ""}
                        label="Duration (days)"
                        onChange={handle_Bid_Info}
                        name="duration_days"
                      >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                        <MenuItem value={7}>7</MenuItem>
                        <MenuItem value={8}>8</MenuItem>
                        <MenuItem value={9}>9</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={11}>11</MenuItem>
                        <MenuItem value={12}>12</MenuItem>
                        <MenuItem value={13}>13</MenuItem>
                        <MenuItem value={14}>14</MenuItem>
                      </SelectM>
                    </FormControl>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                width: windowWidth.width < 1200 ? "100%" : "100%",
                margin: "auto",
                paddingBottom: "150px",
              }}
            >
              <Button
                onClick={handleMediafiles}
                style={{
                  width: windowWidth.width < 1200 ? "100%" : "100%",
                  padding: "10px 100px",
                  background: "#599f22",
                  color: "#FFFFFF",
                  textTransform: "none",
                  marginTop: "10px",
                }}
              >
                Save and next
              </Button>
              <div
                onClick={handleMediafilesSave}
                style={{
                  width: "fit-content",
                  margin: "10px auto",
                }}
              >
                <Button
                  style={{
                    color: "#599f22",
                    width: "fit-content",
                    margin: "auto",
                    textTransform: "none",
                    borderRadius: "none",
                  }}
                >
                  Save and Complete Later
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: mediafiles ? "block" : "none" }}>
          <div
            style={{
              width: "100%",
              height: "fit-content",

              borderRadius: "10px",
              margin: "10px auto",
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
            }}
          >
            <div
              style={{
                padding: "20px 35px",
                width: "100%",
                background: "#DEECD3",
                fontSize: "18px",
                borderRadius: "10px 10px 0px 0px",
                display: "flex",
                alignItems: "center",
              }}
            >
              Media Files
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={handleOpenMediaInfo}
              >
                <BsFillInfoCircleFill
                  style={{
                    cursor: "pointer",
                    marginLeft: "40px",
                    fontSize: "18px",
                    color: "#599f22",
                  }}
                />{" "}
                <span
                  style={{
                    fontSize: "14px",
                    marginLeft: "5px",
                    fontWeight: 600,
                    fontStyle: "italic",
                    color: "#599f22",
                  }}
                >
                  See Upload Rules
                </span>
              </span>
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  padding: "30px 35px",
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  width: "500px",
                  color: "#808080",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",

                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ width: "250px" }}>
                    <div style={{ width: "100%", color: "#599f22" }}>
                      Default Image
                    </div>
                    <TextField
                      fullWidth
                      disabled={dis1 ? true : false}
                      name="upload1"
                      type="file"
                      onChange={handleFile1Change}
                      style={{
                        marginTop: "10px",
                        color: "#808080",
                        width: "100%",
                        marginRight: windowWidth.width < 1200 ? "auto" : "50px",
                      }}
                    />

                    <Button
                      fullWidth
                      onClick={handleFile1Upload}
                      disabled={dis1 ? true : false}
                      style={{
                        padding: "10px 100px",
                        background: "#599f22",
                        opacity: dis1 ? 0.6 : 1,
                        color: "#FFFFFF",
                        textTransform: "none",
                        marginTop: "10px",
                      }}
                    >
                      {dis1 ? Uploaded : Upload}
                    </Button>
                  </div>

                  <img
                    id="pic1"
                    onClick={handlePreview1}
                    style={{
                      boxShadow:
                        "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
                      width: "100px",
                      height: "100px",
                      objectFit: "fill",
                      cursor: "pointer",
                    }}
                  ></img>
                </div>

                <div
                  style={{
                    width: "100%",
                  }}
                >
                  <div style={{ marginTop: "25px", color: "#599f22" }}>
                    Other Images
                  </div>

                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",

                      justifyContent: "space-between",
                      marginTop: "15px",
                    }}
                  >
                    <div style={{ width: "250px" }}>
                      <TextField
                        disabled={dis2 ? true : false}
                        name="upload2"
                        type="file"
                        onChange={handleFile2Change}
                        style={{
                          marginTop: "10px",
                          color: "#808080",
                          width: "100%",
                          marginRight:
                            windowWidth.width < 1200 ? "auto" : "50px",
                        }}
                      />

                      <Button
                        fullWidth={windowWidth.width < 1200 ? true : false}
                        onClick={handleFile2Upload}
                        disabled={dis2 ? true : false}
                        style={{
                          padding: "10px 100px",
                          background: "#599f22",
                          opacity: dis2 ? 0.6 : 1,
                          color: "#FFFFFF",
                          textTransform: "none",
                          marginTop: "10px",
                        }}
                      >
                        {dis2 ? Uploaded : Upload}
                      </Button>
                    </div>

                    <img
                      id="pic2"
                      onClick={handlePreview2}
                      style={{
                        boxShadow:
                          "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
                        width: "100px",
                        height: "100px",
                        cursor: "pointer",
                        objectFit: "fill",
                      }}
                    ></img>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",

                      justifyContent: "space-between",
                      marginTop: "15px",
                    }}
                  >
                    <div style={{ width: "250px" }}>
                      <TextField
                        disabled={dis3 ? true : false}
                        name="upload3"
                        type="file"
                        onChange={handleFile3Change}
                        style={{
                          marginTop: "10px",
                          color: "#808080",
                          width: "100%",
                          marginRight:
                            windowWidth.width < 1200 ? "auto" : "50px",
                        }}
                      />

                      <Button
                        fullWidth={windowWidth.width < 1200 ? true : false}
                        onClick={handleFile3Upload}
                        disabled={dis3 ? true : false}
                        style={{
                          padding: "10px 100px",
                          background: "#599f22",
                          opacity: dis3 ? 0.6 : 1,
                          color: "#FFFFFF",
                          textTransform: "none",
                          marginTop: "10px",
                        }}
                      >
                        {dis3 ? Uploaded : Upload}
                      </Button>
                    </div>

                    <img
                      id="pic3"
                      onClick={handlePreview3}
                      style={{
                        boxShadow:
                          "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
                        width: "100px",
                        height: "100px",
                        cursor: "pointer",
                        objectFit: "fill",
                      }}
                    ></img>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",

                      justifyContent: "space-between",
                      marginTop: "15px",
                    }}
                  >
                    <div style={{ width: "250px" }}>
                      <TextField
                        disabled={dis4 ? true : false}
                        name="upload4"
                        type="file"
                        onChange={handleFile4Change}
                        style={{
                          marginTop: "10px",
                          color: "#808080",
                          width: "100%",
                          marginRight:
                            windowWidth.width < 1200 ? "auto" : "50px",
                        }}
                      />

                      <Button
                        fullWidth={windowWidth.width < 1200 ? true : false}
                        onClick={handleFile4Upload}
                        disabled={dis4 ? true : false}
                        style={{
                          padding: "10px 100px",
                          background: "#599f22",
                          opacity: dis4 ? 0.6 : 1,
                          color: "#FFFFFF",
                          textTransform: "none",
                          marginTop: "10px",
                        }}
                      >
                        {dis4 ? Uploaded : Upload}
                      </Button>
                    </div>

                    <img
                      id="pic4"
                      onClick={handlePreview4}
                      style={{
                        width: "100px",
                        height: "100px",
                        cursor: "pointer",
                        objectFit: "fill",
                        boxShadow:
                          "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
                      }}
                    ></img>
                  </div>
                </div>
              </div>

              <img
                id="pic5"
                style={{
                  width: "600px",
                  height: "400px",
                  display: imagePreview1 ? "block" : "none",
                  margin: "auto",
                  boxShadow:
                    "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
                  objectFit: "fill",
                }}
              ></img>

              <img
                id="pic6"
                style={{
                  display: imagePreview2 ? "block" : "none",
                  width: "600px",
                  height: "400px",
                  margin: "auto",
                  boxShadow:
                    "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
                  objectFit: "fill",
                }}
              ></img>

              <img
                id="pic7"
                style={{
                  display: imagePreview3 ? "block" : "none",
                  width: "600px",
                  height: "400px",
                  margin: "auto",
                  boxShadow:
                    "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
                  objectFit: "fill",
                }}
              ></img>

              <img
                id="pic8"
                style={{
                  display: imagePreview4 ? "block" : "none",
                  width: "600px",
                  height: "400px",
                  margin: "auto",
                  boxShadow:
                    "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
                  objectFit: "fill",
                }}
              ></img>
            </div>
          </div>
          <div
            style={{
              width: windowWidth.width < 1200 ? "100%" : "100%",
              margin: "auto",
              paddingBottom: "150px",
            }}
          >
            <Button
              onClick={handleSubmitAuctions}
              disabled={submitButton ? true : false}
              style={{
                width: windowWidth.width < 1200 ? "100%" : "100%",
                padding: "10px 100px",
                background: "#599f22",
                color: "#FFFFFF",
                textTransform: "none",
                marginTop: "10px",
                opacity: submitButton ? 0.6 : 1,
              }}
            >
              {success ? "Submitted" : "Submit"}
            </Button>

            <Link href="/auctions/draft">
              <div
                style={{
                  width: "fit-content",
                  margin: "10px auto",
                }}
              >
                <Button
                  style={{
                    color: "#599f22",
                    width: "fit-content",
                    margin: "auto",
                    textTransform: "none",
                    borderRadius: "none",
                  }}
                >
                  Save and Complete Later
                </Button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewAuction;
