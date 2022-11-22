import axios from "axios";
import { BASE_URL } from "../constants/constant";

const API = axios.create({ baseURL: BASE_URL });

// const APICP = axios.create({ baseURL: BASE_URL });
// const APIMV = axios.create({ baseURL: BASE_URL });

// API.interceptors.request.use((req) => {
//   if (localStorage.getItem("profile")) {
//     req.headers.Authorization = `Bearer ${
//       JSON.parse(localStorage.getItem("profile")).data.token
//     }`;
//   }
//   return req;
// });

// APICP.interceptors.request.use((req) => {
//   if (localStorage.getItem("profile2")) {
//     req.headers.Authorization = `Bearer ${
//       JSON.parse(localStorage.getItem("profile2")).token
//     }`;
//   }

//   return req;
// });

// APIMV.interceptors.request.use((req) => {
//   if (localStorage.getItem("OTPDETOKEN")) {
//     req.headers.Authorization = `Bearer ${
//       JSON.parse(localStorage.getItem("OTPDETOKEN")).token
//     }`;
//   }

//   return req;
// });

// APICP.interceptors.request.use((request) => {
//   if (localStorage.getItem("profilechangepass")) {
//     request.headers.Authorization = `Bearer ${
//       JSON.parse(localStorage.getItem("profilechangepass")).token
//     }`;
//   }
//   return request;
// });

//*****************seller admin*****************

// Login
export const login_user = (email, password) => {
  return API.post("/api/user/login", {
    email,
    password,
  });
};
//get user profile by user_id
export const get_user_by_id = (user_id) =>
  API.post("/api/user/get/id", { id: parseInt(user_id) });

//get business profile by user_id
export const get_business_profile_by_id = (user_id) =>
  API.post("/api/user/business/profile/get/user_id", {
    user_id: parseInt(user_id),
  });

// get addresses by user_id
export const get_address_by_user_id = (user_id) =>
  API.post("/api/user/address/get/all", {
    user_id: parseInt(user_id),
  });

// Change Password
export const change_password = (id, old_password, new_password) =>
  API.post("/api/user/change/password", {
    old_password,
    new_password,
    id: parseInt(id),
  });

// Create New Address
export const create_new_address = (data, user_id) =>
  API.post("/api/user/address/create", {
    user_id: parseInt(user_id),
    ...data,
  });

// Update Address
export const update_address = (data, id, user_id) =>
  API.post("/api/user/address/update", {
    ...data,
    id: parseInt(id),
    user_id: parseInt(user_id),
  });

// Set as default Address
export const set_as_default_address = (id, user_id) =>
  API.post("/api/user/address/default", {
    is_default: 1,
    id: parseInt(id),
    user_id: parseInt(user_id),
  });

// Get All Countries
export const get_all_countries = () => API.get("/api/country/get");

// Get All States
export const get_all_states = () => API.get("/api/state/get/all");

// Get States By Country
export const get_states_by_country = (countryId) =>
  API.get(`/api/state/by/country/${countryId}`);

// Get All Business Types
export const get_all_business_types = () => API.get("/api/business/type/get");

// Get All Address Types
export const get_all_address_types = () => API.get("/api/address/type/get");

//Update Business Profie
export const update_business_profile = (data, id, user_id) =>
  API.post("/api/user/business/profile/update", data);

//Get Live Auctions
export const get_live_auctions = (user_id) =>
  API.post("/api/auction/user/live", { user_id: parseInt(user_id) });

//Get Submitted Auctions
export const get_submitted_auctions = (user_id) =>
  API.post("/api/auction/user/submitted", { user_id: parseInt(user_id) });

//Get Draft Auctions
export const get_draft_auctions = (user_id) =>
  API.post("/api/auction/user/draft", { user_id: parseInt(user_id) });

//Get Published/Unpublished Auctions
export const publish_unpublish_auctions = (user_id, auction_id) =>
  API.post("/api/auction/update/is_published", {
    user_id: parseInt(user_id),
    auction_id: parseInt(auction_id),
  });

//Get Approved/Denied Auctions
export const approve_deny_auctions = (user_id, auction_id) =>
  API.post("/api/auction/update/is_approved", {
    user_id: parseInt(user_id),
    auction_id: parseInt(auction_id),
  });

/* ********************************************************* */
/* Noman */
/* ********************************************************** */
//update publish status
export const publish_bid = (auction_id) =>
  API.post("/api/auction/update/is_published", {
    is_published: parseInt(1),
    auction_id: parseInt(auction_id),
  });

export const unpublish_bid = (auction_id) =>
  API.post("/api/auction/update/is_published", {
    is_published: parseInt(0),
    auction_id: parseInt(auction_id),
  });

//get categories
export const get_categories = () =>
  API.post(`/api/auction/product/category/get`);

export const get_categories_by_id = (cate_id) =>
  API.post(`/api/auction/product/category/get/id`, {
    id: parseInt(cate_id),
  });

//get inventory
export const get_inventories = () =>
  API.post(`/api/auction/product/inventory/type/get`);

//get condition
export const get_conditions = () =>
  API.post(`/api/auction/product/condition/get`);

//get regions
export const get_regions = () => API.get(`/api/region/get/all`);

//get country by region
export const get_countries = (region_id) =>
  API.get(`/api/country/by/region/${region_id}`);

//get states by country
export const get_states = (state_id) =>
  API.get(`/api/state/by/country/${state_id}`);

//get freight type
export const get_freights = () =>
  API.post(`/api/auction/product/freight/type/get`);

//create auction: post details
export const create_postdetails = (postDetails) =>
  API.post(`/api/auction/create`, postDetails);

//create auction: post details mobile
export const create_postdetails_mobile = (postDetailsMobile) =>
  API.post(`/api/auction/details/mobile/create`, postDetailsMobile);

export const create_postshipping = (shippingDetails) =>
  API.post(`/api/auction/details/shipping/create`, shippingDetails);

export const create_postmanifest = (countManifest) =>
  API.post(`/api/auction/details/manifest/create`, countManifest);

export const create_postbidding = (bidDetails) =>
  API.post(`/api/auction/details/bid/create`, bidDetails);

export const create_upload_one = (formData1) =>
  API.post(`/api/auction/media/file/upload`, formData1);

export const create_upload_two = (formData2) =>
  API.post(`/api/auction/media/file/upload`, formData2);

export const create_upload_three = (formData3) =>
  API.post(`/api/auction/media/file/upload`, formData3);

export const create_upload_four = (formData4) =>
  API.post(`/api/auction/media/file/upload`, formData4);

//final submit api
export const submit_post_auctioin = (submit_ids) =>
  API.post(`/api/auction/update/is_submitted`, submit_ids);

//get all bids by auction_id
export const get_all_bids_by_aid = (id) =>
  API.post(`/api/user/auction/bid/id`, { auction_id: parseInt(id) });

//get bid details by auction_id
export const get_draft_details_by_aid = (id) =>
  API.post(`/api/auction/get/id`, { auction_id: parseInt(id) });

//update product details
export const update_post_details = (postDetails) =>
  API.post(`/api/auction/update`, postDetails);

//update product detailsMobile
export const update_post_details_mobile = (productDetailsMobile) =>
  API.post(`/api/auction/details/mobile/update`, productDetailsMobile);

//update shipping details
export const update_shipping_details = (shippingDetails) =>
  API.post(`/api/auction/details/shipping/update`, shippingDetails);

//update manifest
export const update_postmanifest = (countManifest) =>
  API.post(`/api/auction/details/manifest/update`, countManifest);

//Delete manifest
export const remove_postmanifest = (countManifest) =>
  API.post(`/api/auction/details/manifest/remove`, {
    auction_id: countManifest.auction_id,
    id: countManifest.id,
  });

//Update Bid details
export const update_bid_details = (bidDetails) =>
  API.post(`/api/auction/details/bid/update`, bidDetails);

//remove draft
export const remove_auction_by_id = (deleteData) =>
  API.post(`/api/auction/remove`, {
    user_id: parseInt(deleteData.user_id),
    id: parseInt(deleteData.id),
  });

//buyer bidded auctions
export const bidded_auction_by_id = (id) =>
  API.post(`/api/user/bid/all/user_id`, {
    user_id: parseInt(id),
  });

//post BID
export const post_bid = (bid_data) =>
  API.post(`${BASE_URL}/api/user/auction/bid/create`, {
    user_id: parseInt(bid_data.user_id),
    auction_id: parseInt(bid_data.auction_id),
    bid_amount: bid_data.bid_amount,
  });

//get bid details by auction_id
export const get_auction_details_by_aid = (id) =>
  API.get(`/api/auction/full/details/get/${id}`);

//get favourite auction
export const get_favt_auction_by_uid = (id) =>
  API.post(`api/user/favorite/auction/all`, { user_id: id });

//remove favourite
export const remove_favt_auction_by_aid = (id) =>
  API.post(`api/user/favorite/auction/remove`, { id: id });

// check favourite
export const get_favt_status_by_uid_aid = (check) =>
  API.post(`/api/user/favorite/auction/check`, check);

//get all settings
export const get_settings = () => API.get(`${BASE_URL}/api/app/setting`);
