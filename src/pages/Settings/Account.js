import React, { useState, useEffect } from "react";
import { Divider, Grid } from "@mui/material";
import Collaborators from "components/Collaborators";
import ImageUpload from "appcomponents/ImageUpload";
import MDBButton from "components/MDBButton";
import MDBCard from "components/MDBCard";
import MDBInput from "components/MDBInput";
import MDBTypography from "components/MDBTypography";
import MultipleSelect from "components/MultipleSelect";
import SocialConnect from "components/SocialConnect";
import Edit from "assets/images/icons/svg/medium/EditIcon.svg";
import { useFormik } from "formik";
import httpService from "service/HttpService";
import UserService from "service/UserService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import CalendarSettings from "./cards/CalenderSettings";
import toastIcon from 'assets/images/icons/svg/medium/ToastSuccess.svg'

export default function Account() {
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );
  const [categories, setCategories] = useState([]);
  const [isFormSubmit, setIsFormSubmit] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [userProfileImage, setUserProfileImage] = useState("");
  const [contentTypes, setContentTypes] = useState([]);
  const [userContentTypes, setUserContentTypes] = useState([]);
  const [brandCatSelected, setBrandCatSelected] = useState(false);

  //Configure the Toast
  toast.configure();
  //For Navigation
  let history = useNavigate();

  //To get selected categories
  const getUserDetails1 = () => {
    httpService
      .getUserDetails(user.userId === undefined ? user.id : user.userId)
      .then((res) => {
        if (
          res?.data?.data !== null &&
          res?.data?.data !== undefined
        ) {
          setContentTypes(res.data.data.userBrandCategories);
          setUserContentTypes(res.data.data.userBrandCategories);
          setUserProfileImage(res.data.data.profileImg);
          setUser(user);
          setUserInfo(res.data.data);
        }
      });
  };
  useEffect(() => {
    setIsFormSubmit(false);
    getUserDetails1();
    getCategories();
  }, []);


  const imageChangeHandler = (imageUrl) => {
    setImageUrl(imageUrl);
  };
  //To get the all caregories
  const getCategories = () => {
    httpService.brandCategories().then((res) => {
      if (
        res?.data?.data !== null &&
        res?.data?.data !== undefined &&
        res?.data?.data?.length > 0
      ) {
        setCategories(res.data.data);
      }
    });
  };

  const multiSelectHandler = (selectedCts) => {
    setBrandCatSelected(true);
    let selectedContentTypes = [];
    if (selectedCts?.length !== undefined) {
      selectedContentTypes = selectedCts?.map((selectedCat => selectedCat.bcName));
      setContentTypes(selectedContentTypes);
    }
  }
  // Formik handlers
  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email
    },
    //validation schema
    validationSchema: yup.object({
      name: yup
        .string('Enter Fullname')
        .trim('Full name cannot contain white space')
        // .matches(/^'?\p{L}+(?:[' ]\p{L}+)*'?/u,'Please enter your full name.')
        .min(4, 'Full name must be at least 4 characters')
        .max(20, 'Full name must have upto 20 characters')
        .matches(/^[a-zA-Z]/, 'First letter should be Alphabet')
        .required('Fullname is required'),

      email: yup.string("Enter your email").required("Email is required"),

    }),


    //On submit handler    

    onSubmit: (values) => {
      setIsFormSubmit(true);
      if (user.email !== null && user !== undefined && values !== undefined) {
        let newImageUrl = (imageUrl !== "" ? imageUrl : user.imageUrl);
        let request = {
          name: values.name,
          email: values.email,
          brandCatSelected: brandCatSelected,
          userBrandCategories: contentTypes,
          profileImg: newImageUrl,
          userId: user.id !== undefined ? user.id : user.userId,
          clientId: user.clientId
        }

        //Update api integration on save button
        httpService.postBrandCategories(request).then((res) => {
          if (res !== undefined && res?.data !== undefined && res?.data !== null && res?.data?.success !== undefined) {
            if (res?.data?.success === true) {
              setUser(res.data.data);
              UserService.updateUserSession(request.userId, updateSessionCallback);
              //window.localStorage.setItem('user',JSON.stringify(res.data.data));
              toast.success("Saved successfully",
                {
                  position: toast.POSITION.TOP_LEFT,
                  hideProgressBar: true,
                  icon:<img src={toastIcon} alt="Toast Icon"/>
                });
              setIsFormSubmit(false);
              //Redirect to home page
              history("/c/home")
            } else {
              // Throw error
              toast.error("Unable to save . Please try again", { position: toast.POSITION.TOP_LEFT, hideProgressBar: true });
            }
          }
        }).catch((error) => {
          setIsFormSubmit(false);
          // Throw error
          toast.error("Unable to save . Please try again", { position: toast.POSITION.TOP_LEFT, hideProgressBar: true });
        })
        // TODO api integration
      }
    }
  })
  const updateSessionCallback = () => {
  }
  return (

    <div>
      {/* Profile Information */}
      <MDBCard
        borderRadius="xl"
        bgcolor="cardBg"
        sx={{ p: 0, m: 0 }}
      >
        <form onSubmit={formik.handleSubmit}>
          {/* Card header */}
          <Grid container sx={{ pt: 3, pb: 0.5, px: 2 }} justifyContent="space-between">
            <Grid item pb={1}>
              <MDBTypography
                color="white"
                fontWeight="medium"
                fontSize="xl"
                lineHeightSize="2xxl"
                px={1.5} py={1} mr={3.5}
              >
                Profile Information
              </MDBTypography>
            </Grid>

            <Grid item>
              <MDBButton
                type="submit"
                size="small"
                variant="contained"
                color="black"
                bgColor="light_green"
                fontWeight="bold"
                fontSize="md"
                borderSize="md"
                sx={{ py: 1.2, mx: 1 }}
                disabled={isFormSubmit ? true : false}
                isLoading={isFormSubmit}
              >
                Save Changes
              </MDBButton>
            </Grid>
          </Grid>

          {/* Card Divider */}
          <Divider sx={{ m: 0, mt: 1 }} />


          {/* Card Body */}
          <Grid sx={{ pt: 2, px: 5, pb: 5 }}>

            {/* Profile Image Uploader with Properties */}
            <ImageUpload
              ButtonText="Edit Image"
              Icon={Edit}
              imageChangeHandler={imageChangeHandler}
              userId={user.id !== undefined ? user.id : user.userId}
              entity="profile"
              imageUrl={userProfileImage}
            />

            {/* Input Fields with Labels */}
            <Grid my={2}>
              <MDBTypography
                color="white"
                fontWeight="regular"
                fontSize="xs"
                lineHeightSize="md"
                textTransform="uppercase"
                pb={1}
              >
                Full name
              </MDBTypography>
              <MDBInput type="text"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid my={2}>
              <MDBTypography
                color="white"
                fontWeight="regular"
                fontSize="xs"
                lineHeightSize="md"
                textTransform="uppercase"
                pb={1}
              >
                email address
              </MDBTypography>
              <MDBInput type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                defaultValue={user.email}
                disabled={(user.email === "") ? true : false} />

            </Grid>

            {/* Social platform Connect Buttons */}
            <SocialConnect userPlatforms={user?.userPlatformsModel} userId={user?.userId ? user?.userId : user?.id} />

            {/* Multiple Select Dropdown */}
            <MultipleSelect
              multiSelectHandler={multiSelectHandler}
              content={categories}
              title="Content Type"
              selected={userContentTypes}
            />

            <Grid mt={2}>
              {/* Collaborators */}
              <Collaborators user={userInfo} />
            </Grid>
          </Grid>
        </form>
        <Grid>
          <CalendarSettings user={userInfo} />
        </Grid>
      </MDBCard>

    </div>

  )
}
