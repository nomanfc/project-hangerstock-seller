import React, { useState, useEffect } from "react";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";

import SendIcon from "@mui/icons-material/Send";

/* Material Alerts */
import Alert from "@mui/material/Alert";

import {
  get_all_countries,
  get_address_by_user_id,
  get_states_by_country,
  get_all_business_types,
  update_business_profile,
} from "../../http_requests/httpreq";

const BusinessProfileForm = ({ content, onSubmit }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [addresses, setAddressses] = useState([]);
  const [businessTypes, setBusinessTypes] = useState([]);

  // Business Info Input Value State
  const [legalBusiness, setLegalBusiness] = useState(content?.name || "");
  const [registerNo, setRegisterNo] = useState(content?.register_no || "");
  const [countryId, setCountryId] = useState(content?.country_id || null);
  const [resideStateId, setResideStateId] = useState(
    content?.reside_state_id || null
  );

  const [businessTypeId, setBusinessTypeId] = useState(
    content?.business_type_id
  );

  const [businessDescription, setBusinessDescription] = useState(
    content?.description || ""
  );

  const [goodsTypeResale, setGoodsTypeResale] = useState(
    content?.goods_type_resale || ""
  );

  const [isRegisteredResellerUS, setIsRegisteredResellerUS] = useState(
    content?.is_registered_reseller_us || ""
  );

  //Address Info Input State
  const [addressId, setAddressId] = useState(content?.address_id);

  const [message, setMessage] = useState("");

  useEffect(() => {
    const getData = async () => {
      //get all countries
      const countries = await get_all_countries();

      //get all addresses
      const addresses = await get_address_by_user_id(content.user_id);

      //get all business types
      const business_types = await get_all_business_types();
      return {
        all_countries: countries.data.data,
        all_addresses: addresses.data.data,
        all_business_types: business_types.data.data,
      };
    };

    getData().then(({ all_countries, all_addresses, all_business_types }) => {
      setCountries(all_countries);
      setAddressses(all_addresses);
      setBusinessTypes(all_business_types);
    });
  }, []);

  //filter states by country id
  useEffect(() => {
    const getData = async () => {
      const states = await get_states_by_country(countryId);
      return {
        all_states: states.data.data,
      };
    };
    const states = getData().then(({ all_states }) => {
      setStates(all_states);
    });
  }, [countryId]);

  //Handle Form Submit
  const handleSubmit = async () => {
    const formData = {
      name: legalBusiness,
      register_no: registerNo,
      country_id: countryId,
      reside_state_id: resideStateId,
      business_logo: null,
      business_type_id: businessTypeId,
      description: businessDescription,
      address_id: addressId,
      goods_type_resale: goodsTypeResale,
      is_registered_reseller_us: isRegisteredResellerUS,
      id: content.id,
    };

    if (!content) {
      await create_business_profile(formData)
        .then((res) => {
          setMessage({
            ...message,
            message: res.data.message,
            type: res.data.success === 1 ? "success" : "error",
          });
          onSubmit({
            address: addresses.filter((address) => address.id === addressId)[0],
            reside_state: states.filter(
              (state) => state.id === resideStateId
            )[0].name,
            business_type: businessTypes.filter(
              (type) => type.id === businessTypeId
            )[0].type_name,
            ...formData,
          });
        })
        .catch((error) =>
          setMessage({ ...message, message: error, type: "error" })
        );
    } else {
      await update_business_profile(formData)
        .then((res) => {
          setMessage({
            ...message,
            message: res.data.message,
            type: res.data.success === 1 ? "success" : "error",
          });
          onSubmit({
            address: addresses.filter((address) => address.id === addressId)[0],
            reside_state: states.filter(
              (state) => state.id === resideStateId
            )[0].name,
            business_type: businessTypes.filter(
              (type) => type.id === businessTypeId
            )[0].type_name,
            ...formData,
          });
        })
        .catch((error) =>
          setMessage({ ...message, message: error.message, type: "error" })
        );
    }
  };

  return (
    <form>
      <List>
        {message.message && (
          <ListItem>
            <Alert
              variant="standard"
              severity={message.type}
              sx={{ width: "100%" }}
            >
              {message.message}
            </Alert>
          </ListItem>
        )}
        <ListItem>
          <p
            style={{
              fontSize: "18px",
              fontWeight: "600",
              width: "100%",
              paddingBottom: "10px",
              marginBottom: "10px",
              borderBottom: "1px solid #447e144d",
            }}
          >
            Business Information
          </p>
        </ListItem>
        <ListItem style={{ gap: "20px" }}>
          <TextField
            color="success"
            label="Legal Business Name"
            fullWidth
            size="small"
            required
            type="text"
            value={legalBusiness}
            onChange={(e) => setLegalBusiness(e.target.value)}
          />
          <TextField
            color="success"
            label="Register No."
            fullWidth
            size="small"
            required
            type="text"
            value={registerNo}
            onChange={(e) => setRegisterNo(e.target.value)}
          />
        </ListItem>

        <ListItem>
          <FormControl
            sx={{ m: 0, minWidth: "48%", gap: 1, marginRight: "2%" }}
          >
            <FormLabel color="success">Country</FormLabel>
            <Select
              color="success"
              size="small"
              fullWidth
              autoWidth={false}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              value={countryId}
              onChange={(e) => setCountryId(e.target.value)}
            >
              <MenuItem fullWidth value="" disabled>
                Select Country
              </MenuItem>
              {countries.map((country) => (
                <MenuItem fullWidth value={country.id}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ m: 0, minWidth: "48%", gap: 1, marginLeft: "2%" }}>
            <FormLabel color="success">Reside State</FormLabel>

            <Select
              color="success"
              size="small"
              fullWidth
              autoWidth={false}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              value={resideStateId}
              onChange={(e) => setResideStateId(e.target.value)}
            >
              <MenuItem fullWidth value="" disabled>
                Select State
              </MenuItem>
              {states && states.map((state) => (
                <MenuItem fullWidth value={state.id}>
                  {state.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </ListItem>

        <ListItem>
          <FormControl sx={{ m: 0, minWidth: "100%", gap: 1 }}>
            <FormLabel color="success">Business Type</FormLabel>
            <Select
              color="success"
              size="small"
              fullWidth
              autoWidth={false}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              value={businessTypeId}
              onChange={(e) => setBusinessTypeId(e.target.value)}
            >
              <MenuItem fullWidth value="" disabled>
                Select Business Type
              </MenuItem>
              {businessTypes.map((type) => (
                <MenuItem fullWidth value={type.id}>
                  {type.type_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </ListItem>

        <ListItem>
          <TextField
            color="success"
            label="Business Description"
            fullWidth
            multiline
            required
            value={businessDescription}
            onChange={(e) => setBusinessDescription(e.target.value)}
            rows={4}
          />
        </ListItem>

        <ListItem>
          <TextField
            color="success"
            label="Types of Goods You are Purchasing for Resale?"
            fullWidth
            size="small"
            required
            type="text"
            value={goodsTypeResale}
            onChange={(e) => setGoodsTypeResale(e.target.value)}
          />
        </ListItem>

        <ListItem>
          <FormControl>
            <FormLabel color="success">
              Are You A Registered Reseller in The United States?{" "}
            </FormLabel>
            <RadioGroup
              row
              value={isRegisteredResellerUS}
              onChange={(e) => setIsRegisteredResellerUS(e.target.value)}
            >
              <FormControlLabel
                value="1"
                control={<Radio color="success" />}
                label="Yes"
              />
              <FormControlLabel
                value="0"
                control={<Radio color="success" />}
                label="No"
              />
            </RadioGroup>
          </FormControl>
        </ListItem>

        <ListItem>
          <p
            style={{
              fontSize: "18px",
              fontWeight: "600",
              width: "100%",
              paddingBottom: "10px",
              margin: "10px 0px",
              borderBottom: "1px solid #447e144d",
            }}
          >
            Address Information
          </p>
        </ListItem>
        <ListItem>
          <FormControl sx={{ m: 0, gap: 1, minWidth: "100%" }}>
            <FormLabel color="success">Select Address</FormLabel>
            <Select
              color="success"
              size="small"
              fullWidth
              autoWidth={false}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              value={addressId}
              onChange={(e) => setAddressId(e.target.value)}
            >
              <MenuItem fullWidth value="" disabled>
                Select Address
              </MenuItem>
              {addresses.map((address) => (
                <MenuItem fullWidth value={address.id} selected>
                  {`${address.street_address},${address.street_address_two},${address.city}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </ListItem>

        <ListItem>
          <Button
            variant="contained"
            color="success"
            size="large"
            fullWidth
            endIcon={<SendIcon />}
            disableElevation
            onClick={handleSubmit}
          >
            {content ? "Update Business Profile" : "Create Business Profile"}
          </Button>
        </ListItem>
      </List>
    </form>
  );
};

export default BusinessProfileForm;
