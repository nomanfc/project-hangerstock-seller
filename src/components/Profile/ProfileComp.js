import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import LockIcon from "@mui/icons-material/Lock";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";

import SimpleDialog from "../SimpleDialog/SimpleDialog";
import ChangePasswordForm from "../ChangePasswordForm/ChangePasswordForm";
import CreateAddressForm from "../CreateAddress/CreateAddressForm";
import { useUserContext } from "../../contexts/UserContext";

import {
  set_as_default_address,
  get_address_by_user_id,
} from "../../http_requests/httpreq";

const ProfileComp = () => {
  const [loading, setLoading] = useState(false);
  const [openChangePasswordForm, setOpenChangePasswordForm] =
    React.useState(false);
  const [openCreateAddressForm, setOpenCreateAddressForm] =
    React.useState(false);
  const [formTitle, setFormTitle] = React.useState("Create Address");
  const [formContent, setFormContent] = React.useState(null);
  const [addresses, setAddresses] = useState([]);

  const { user } = useUserContext();

  useEffect(() => {
    const getData = async () => {
      const resAddress = await get_address_by_user_id(user?.id);
      return resAddress.data.data;
    };
    getData().then((addresses) => {
      addresses && setAddresses(addresses);
    });
  }, []);

  /*
   ** Change Password Dialog Open/Close Handler
   */
  const handlePasswordDialogOpen = () => {
    setOpenChangePasswordForm(true);
  };

  const handlePasswordDialogClose = () => {
    setOpenChangePasswordForm(false);
  };
  /*
   ** Create or Update Address Dialog Open/Close Handler
   */
  const handleEditAddress = (index) => {
    setFormTitle("Update Address");
    setFormContent(addresses[index]);
    setOpenCreateAddressForm(true);
  };

  const handleCreateAddress = () => {
    setFormTitle("Create New Address");
    setFormContent(null);
    setOpenCreateAddressForm(true);
  };

  const handleSetAsDefaultAddress = (addressId, userId) => {
    set_as_default_address(addressId, userId);
    updateAddressUI(null, "setDefaultAddress", addressId);
  };

  const updateAddressUI = (newAddress, action, id) => {
    if (action === "create") {
      setAddresses((prevAddresses) => [...prevAddresses, newAddress]);
    } else if (action === "update") {
      const index = addresses.findIndex((address) => address.id === id);
      addresses[index] = newAddress;
      setAddresses((prevAddresses) => [...prevAddresses]);
    } else if (action === "setDefaultAddress") {
      const oldDefault = addresses.findIndex(
        (address) => address.is_default === 1
      );
      const newDefault = addresses.findIndex((address) => address.id === id);
      setAddresses((prevAddresses) => {
        prevAddresses[oldDefault].is_default = 0;
        prevAddresses[newDefault].is_default = 1;
        return [...prevAddresses];
      });
    }
  };

  const handleAddressDialogClose = () => setOpenCreateAddressForm(false);

  return (
    <Stack direction="column" spacing={5}>
      {/* Change Password Dialog */}
      <SimpleDialog
        open={openChangePasswordForm}
        handleClose={handlePasswordDialogClose}
        title="Change Password"
        content={<ChangePasswordForm />}
      />

      {/* Update Address Dialog */}
      <SimpleDialog
        open={openCreateAddressForm}
        handleClose={handleAddressDialogClose}
        title={formTitle}
        content={
          <CreateAddressForm content={formContent} onSubmit={updateAddressUI} />
        }
      />

      {/* Account Information */}
      <div>
        <Stack
          justifyContent="space-between"
          direction="row"
          style={{
            paddingBottom: "15px",
            borderBottom: "1px solid #447e144d",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              fontSize: "22px",
              fontWeight: "600",
              color: "green",
            }}
          >
            Account Information
          </div>
          <Button
            variant="contained"
            style={{
              textTransform: "capitalize",
              fontSize: "16px",
            }}
            startIcon={<LockIcon />}
            disableElevation
            onClick={handlePasswordDialogOpen}
          >
            Change Password
          </Button>
        </Stack>

        <Stack direction="column" spacing={0.5} mt={2}>
          <p style={{ textTransform: "capitalize" }}>
            {`${user?.first_name} ${user?.last_name}`}
          </p>
          <p>{user?.email}</p>
          <p>{user?.phone}</p>
        </Stack>
      </div>
      {/* Account Information End */}

      {/* Address Book */}
      <div>
        <Stack
          justifyContent="space-between"
          direction="row"
          style={{
            paddingBottom: "15px",
            borderBottom: "1px solid #447e144d",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              fontSize: "22px",
              fontWeight: "600",
              color: "green",
            }}
          >
            Address Book
          </div>
          <Button
            variant="contained"
            style={{
              textTransform: "capitalize",
              fontSize: "16px",
            }}
            startIcon={<AddBoxIcon />}
            disableElevation
            onClick={handleCreateAddress}
          >
            New Address
          </Button>
        </Stack>

        {/* Map through the addresses */}
        <div
          style={{
            fontSize: "16px",
            fontWeight: "600",
            textTransform: "capitalize",
          }}
        >
          {`${user?.first_name} ${user?.last_name}`}
        </div>
        <Stack direction="column" spacing={3}>
          {addresses.map((address, index) => (
            <Stack direction="column" spacing={0.5}>
              <p>{address.company}</p>
              <p>{address.address_type}</p>
              <p>{`${address.street_address} ${address.street_address_two}`}</p>
              <p>{`${address.city}, ${address.state}, ${address.country}`}</p>
              <Stack direction="row" spacing={1} style={{ marginTop: "20px" }}>
                <Button
                  size="small"
                  variant={address.is_default ? "outlined" : "contained"}
                  style={{
                    textTransform: "capitalize",
                    fontSize: "16px",
                  }}
                  disableElevation
                  disabled={address.is_default}
                  onClick={() => handleSetAsDefaultAddress(address.id, user.id)}
                >
                  {address.is_default ? "Default Address" : "Set as Default"}
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  style={{
                    textTransform: "capitalize",
                    fontSize: "16px",
                  }}
                  startIcon={<EditIcon />}
                  disableElevation
                  onClick={() => handleEditAddress(index)}
                >
                  Edit
                </Button>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </div>
      {/* Address Book End */}
    </Stack>
  );
};

export default ProfileComp;
