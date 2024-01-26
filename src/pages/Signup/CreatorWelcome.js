import MDBButton from "components/MDBButton";
import MDBCard from "components/MDBCard";
import MDBTypography from "components/MDBTypography";
import React, { useEffect, useState } from "react";
import SocialConnect from "components/SocialConnect";
import MultipleSelect from "components/MultipleSelect";
import { Divider, Grid, InputLabel } from "@mui/material";
import ImageUpload from "appcomponents/ImageUpload";
import Collaborators from "components/Collaborators";
import Add from "assets/images/icons/svg/medium/AddIcon.svg";
import httpService from "service/HttpService";
import UserService from "service/UserService";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

export default function CreatorWelcome() {
  const [categories, setCategories] = useState();
  const [isFormSubmit, setIsFormSubmit] = useState(false);
  const [user, setUser] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [contentTypes, setContentTypes] = useState([]);
  const history = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  toast.configure();

  useEffect(() => {
    setIsFormSubmit(false);
    getCategories();
    // Get user by token
    getUserByToken(params.get("token"));
  }, []);

  // Get user by token
  function getUserByToken(token) {
    if (token && token !== null && token !== "") {
      let verifyReq = { uuId: token };
      UserService.verifyUser(verifyReq, verifyUserCallback);
    }
  }

  // Verify user callback
  function verifyUserCallback(data) {
    if (data && data?.success && data?.success === true && data.data) {
      // Set user
      setUser(data.data);
    }
  }

  const multiSelectHandler = (selectedCts) => {
    let selectedContentTypes = [];
    if (selectedCts?.length !== undefined) {
      selectedCts?.map((selectedCat, idx) => {
        selectedContentTypes.push(selectedCat.bcName);
      });
      setContentTypes(selectedContentTypes);
    }
  };

  const getCategories = () => {
    httpService.brandCategories().then((res) => {
      setCategories(res.data.data);
    });
  };

  // Handle submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    //Update user callback
    if (user !== undefined && user !== null && user?.uuId !== undefined) {
      setIsFormSubmit(true);
      //Register
      const userReq = {
        userBrandCategories: contentTypes,
        name: user.name,
        email: user.email,
        brandCatSelected: false,
        userId: (user.id !== undefined) ? user.id : "",
        profileImg: imageUrl,
        clientId: user.clientId,
      };
      UserService.register(userReq,registerSuccessCallback,registerErrorCallback);
    }
  }

  // Register success callback
  const registerSuccessCallback=(data)=>{
    setIsFormSubmit(false);
    if(data && data.success && data.success === true){
      let userId = (user.id !== undefined) ? user.id : ""
      UserService.updateUserSession(userId, updateSessionCallback);
    }else{
      toast.error("Regsitration failed. Please try again", {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
        autoClose: 3000,
      });
    }
  }

  // Register error callback
  const registerErrorCallback=(error)=>{
    setIsFormSubmit(false);
    toast.error("Regsitration failed. Please try again", {
      position: toast.POSITION.TOP_RIGHT,
      hideProgressBar: true,
      autoClose: 3000,
    });
  }

  // Update session callback
  const updateSessionCallback = () => {
    history("/c/home");
    setIsFormSubmit(false);
  };
  const imageChangeHandler = (imageUrl) => {
    setImageUrl(imageUrl);
  };

  return (
    <div>
      <Grid
        container
        alignContent="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid
          item
          xs={1}
          sm={1.5}
          md={1.5}
          lg={2.5}
          xl={3}
          xxl={3.5}
          xel={3.9}
          xxel={4}
          el={4.6}
        />
        <Grid
          item
          xs={10}
          sm={9}
          md={8.5}
          lg={6.5}
          xl={5}
          xxl={4.7}
          xel={4.2}
          xxel={2.55}
          el={2.55}
        >
          <MDBCard sx={{ p: 0, m: 0, mt: 10, mb: 10, width: "inherit" }}>
            <Grid>
              <Grid pt={6} pb={1} pl={5} pr={4}>
                <MDBTypography
                  color="white"
                  fontWeight="medium"
                  fontSize="2xl"
                  lineHeightSize="4xl"
                  textTransform="capitalize"
                  pb={4}
                >
                  Welcome, {user?.name}
                </MDBTypography>

                {/* Image Upload for Add profile Image */}
                <ImageUpload
                  imageChangeHandler={imageChangeHandler}
                  ButtonText="Add Profile Image"
                  Icon={Add}
                  entity="profile"
                  imageUrl=""
                />

                <Grid>
                  {/* Social Connecting platforms For Instagram, Tiktok & Youtube */}
                  <SocialConnect
                    userPlatforms={user?.userPlatformsModel}
                    userId={user?.userId ? user?.userId : user?.id}
                  />
                </Grid>

                <Grid>
                  {/* Multiple Select dropdown with Delete Chips */}

                  <InputLabel>
                    <MDBTypography
                      fontWeight="medium"
                      fontSize="md"
                      lineHeight="2xl"
                    >
                      What type of content do you make?
                    </MDBTypography>

                    <MDBTypography
                      color="grayScale"
                      fontWeight="regular"
                      fontSize="sm"
                      lineHeightSize="xxl"
                      mb={1}
                    >
                      Select up to 5 categories that best describe your content.
                    </MDBTypography>
                  </InputLabel>
                  <MultipleSelect
                    multiSelectHandler={multiSelectHandler}
                    content={categories}
                  />
                </Grid>

                {/* Collaborators */}
                <Grid mt={2}>
                  <Collaborators user={user} />
                </Grid>
              </Grid>
            </Grid>

            {/* Card Divider */}
            <Divider />

            <Grid container pr={4} pb={3} justifyContent="flex-end">
              <MDBButton
                size="small"
                variant="contained"
                color="black"
                bgColor="light_green"
                fontWeight="medium"
                fontSize="lg"
                borderSize="md"
                sx={{ py: 1, px: 5 }}
                onClick={(e) => handleSubmit(e)}
                disabled={isFormSubmit ? true : false}
              >
                Finish
              </MDBButton>
            </Grid>
          </MDBCard>
        </Grid>
        <Grid
          item
          xs={1}
          sm={1.5}
          md={1.5}
          lg={2.5}
          xl={3}
          xxl={3.5}
          xel={3.9}
          xxel={4.6}
          el={4.6}
        />
      </Grid>
    </div>
  );
}
