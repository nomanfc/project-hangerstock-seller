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

import {useUserContext} from "../../contexts/UserContext"

/* Material Alerts */
import Alert from "@mui/material/Alert";

import {
  create_new_address,
  update_address,
  get_all_countries,
  get_states_by_country,
  get_all_address_types,
} from "../../http_requests/httpreq";

const CreateAddressForm = ({ content, onSubmit }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [addressTypes, setAddressTypes] = useState([]);
  const user = useUserContext();
  // Input Value State
  const [company, setCompany] = useState(content?.company || "");
  const [telephone, setTelephone] = useState(content?.telephone || "");
  const [addressTypeId, setAddressTypeId] = useState(
    content?.address_type || ""
  );
  const [streetAddress, setStreetAddress] = useState(
    content?.street_address || ""
  );
  const [streetAddressTwo, setStreetAddressTwo] = useState(
    content?.street_address_two || ""
  );
  const [city, setCity] = useState(content?.city || "");
  const [countryId, setCountryId] = useState(content?.country_id || null);
  const [resideStateId, setResideStateId] = useState(
    content?.reside_state_id || null
  );
  const [isLiftgateRequired, setIsLiftgateRequired] = useState(
    content?.is_liftgate_required || "yes"
  );

  const [message, setMessage] = useState("");



  useEffect(() => {
    const getData = async () => {
      //get all countries
      const countries = await get_all_countries();

      //get all address types
      const address_types = await get_all_address_types();

      return {
        all_countries: countries.data.data,
        all_address_types: address_types.data.data,
      };
    };

    getData().then(({ all_countries, all_address_types }) => {
      setCountries(all_countries);
      setAddressTypes(all_address_types);
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
      company,
      telephone,
      address_type_id: addressTypeId,
      street_address: streetAddress,
      street_address_two: streetAddressTwo,
      city,
      state_id: resideStateId,
      country_id: countryId,
      is_liftgate_required: isLiftgateRequired === "yes" ? true : false,
      is_default: content?.is_default || 0,
    };

    if (!content) {
      await create_new_address(formData, parseInt(user.user.id))
        .then((res) => {
          setMessage({
            ...message,
            message: res.data.message,
            type: res.data.success === 1 ? "success" : "error",
          });
          onSubmit(
            {
              state: states.filter((state) => state.id === resideStateId)[0]
                .name,
              ...formData,
              country: countries.filter(
                (country) => country.id === countryId
              )[0].name,
              address_type: addressTypes.filter(
                (type) => type.id === addressTypeId
              )[0].type_name,
              ...formData,
            },
            "create"
          );
        })
        .catch((error) =>
          setMessage({ ...message, message: error, type: "error" })
        );
    } else {
      await update_address(formData, content.id, user.user.id)
        .then((res) => {
          setMessage({
            ...message,
            message: res.data.message,
            type: res.data.success === 1 ? "success" : "error",
          });
          onSubmit(
            {
              state: states.filter((state) => state.id === resideStateId)[0]
                .name,
              ...formData,
              country: countries.filter(
                (country) => country.id === countryId
              )[0].name,
              address_type: addressTypes.filter(
                (type) => type.id === addressTypeId
              )[0].type_name,
              ...formData,
            },
            "update",
            content.id
          );
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
            Contact Information
          </p>
        </ListItem>
        <ListItem>
          <TextField
            color="success"
            label="Company Name"
            fullWidth
            size="small"
            required
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </ListItem>
        <ListItem>
          <TextField
            color="success"
            label="Telephone"
            fullWidth
            size="small"
            required
            type="text"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
          />
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
            Address
          </p>
        </ListItem>

        <ListItem>
          <FormControl sx={{ m: 0, minWidth: "100%", gap: 1 }}>
            <FormLabel color="success">Address Type</FormLabel>
            <Select
              color="success"
              size="small"
              fullWidth
              autoWidth={false}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              value={addressTypeId}
              onChange={(e) => setAddressTypeId(e.target.value)}
            >
              {addressTypes.map((type) => (
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
            label="Street Address"
            fullWidth
            size="small"
            required
            type="text"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
          />
        </ListItem>
        <ListItem>
          <TextField
            color="success"
            label="Street Address Two"
            fullWidth
            size="small"
            required
            type="text"
            value={streetAddressTwo}
            onChange={(e) => setStreetAddressTwo(e.target.value)}
          />
        </ListItem>
        <ListItem>
          <TextField
            color="success"
            label="City"
            fullWidth
            size="small"
            required
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
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
          <FormControl>
            <FormLabel color="success">Lift Gate Required? </FormLabel>
            <RadioGroup
              row
              value={isLiftgateRequired}
              onChange={(e) => setIsLiftgateRequired(e.target.value)}
            >
              <FormControlLabel
                value="yes"
                control={<Radio color="success" />}
                label="Yes"
              />
              <FormControlLabel
                value="no"
                control={<Radio color="success" />}
                label="No"
              />
            </RadioGroup>
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
            {content ? "Update Address" : "Create Address"}
          </Button>
        </ListItem>
      </List>
    </form>
  );
};

export default CreateAddressForm;
