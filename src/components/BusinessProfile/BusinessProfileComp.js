import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import { useUserContext } from "../../contexts/UserContext";
import SimpleDialog from "../SimpleDialog/SimpleDialog";
import BusinessProfileForm from "../BusinessProfileForm/BusinessProfileForm";
import { get_business_profile_by_id } from "../../http_requests/httpreq";

const ProfileComp = () => {
  const { user } = useUserContext();
  const [businessProfile, setBusinessProfile] = useState({});
  useEffect(() => {
    const getData = async () => {
      const resAddress = await get_business_profile_by_id(user?.id);
      return resAddress.data.data;
    };
    getData().then((profile) => {
      profile && setBusinessProfile(profile);
    });
  }, []);

  const [openBusinessProfileForm, setOpenBusinessProfileForm] = useState(false);
  const formTitle = businessProfile
    ? "Edit Business Profile"
    : "Create Business Profile";

  const formContent = businessProfile ? businessProfile : null;

  const handleBusinessProfileDialogOpen = (index) =>
    setOpenBusinessProfileForm(true);

  const updateBusinessProfileUI = (newProfile) => {
    setBusinessProfile(newProfile);
  };

  const handleBusinessProfileDialogClose = () =>
    setOpenBusinessProfileForm(false);


    console.log(businessProfile)

  return (
    <Stack direction="column" spacing={5}>
      {/* Update Address Dialog */}
      <SimpleDialog
        open={openBusinessProfileForm}
        handleClose={handleBusinessProfileDialogClose}
        title={formTitle}
        maxwidth="30%"
        content={
          <BusinessProfileForm
            content={formContent}
            onSubmit={updateBusinessProfileUI}
          />
        }
      />
      {/* Business Profile Information */}
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
              color: "#599f22",
            }}
          >
            Business Profile Information
          </div>
          <Button
            variant="contained"
            style={{ backgroundColor: "#599f22" }}
            startIcon={businessProfile ? <EditIcon /> : <AddBoxIcon />}
            disableElevation
            onClick={handleBusinessProfileDialogOpen}
          >
            {businessProfile
              ? "Edit Business Profile"
              : "Create Business Profile"}
          </Button>
        </Stack>

        <Stack direction="column" spacing={2} mt={2}>
          <div>
            <p
              style={{
                fontSize: "22px",
                fontWeight: "600",
                textTransform: "capitalize",
              }}
            >
              {businessProfile?.name}
            </p>
            <p>{businessProfile?.register_no}</p>
          </div>

          <div>
            <p style={{ color: "#202124" }}>Reside State</p>
            <p
              style={{ color: "#202124", fontSize: "20px", fontWeight: "500" }}
            >
              {businessProfile?.reside_state}
            </p>
          </div>
          <div>
            <p style={{ color: "#202124" }}>Business Type</p>
            <p
              style={{ color: "#202124", fontSize: "20px", fontWeight: "500" }}
            >
              {businessProfile?.business_type}
            </p>
          </div>
          <div>
            <p style={{ color: "#202124" }}>Description</p>
            <p
              style={{ color: "#202124", fontSize: "20px", fontWeight: "500" }}
            >
              {businessProfile?.description}
            </p>
          </div>
          <div>
            <p style={{ color: "#202124" }}>
              Types of Goods Are Purchasing For Resale
            </p>
            <p
              style={{ color: "#202124", fontSize: "20px", fontWeight: "500" }}
            >
              {businessProfile?.goods_type_resale}
            </p>
          </div>
        </Stack>
      </div>
      {/* Business Profile Information End */}

      {/* Address Information */}
      <div>
        <div
          style={{
            fontSize: "22px",
            fontWeight: "600",
            color: "#599f22",
            paddingBottom: "15px",
            borderBottom: "1px solid #447e144d",
            marginBottom: "30px",
          }}
        >
          Address Information
        </div>

        <div>
          <p>{`${businessProfile?.address?.street_address} ${businessProfile?.address?.street_address_two}`}</p>
          <p>{`${businessProfile?.address?.city}, ${businessProfile?.address?.state}, ${businessProfile?.address?.country}`}</p>
        </div>
      </div>
      {/* Address Information End */}
    </Stack>
  );
};

export default ProfileComp;
