import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import InstagramIcon from '@mui/icons-material/Instagram';
// Material Dashboard 2 React components

import React, { useEffect, useRef} from "react";
import Box from '@mui/material/Box';
import MDBTypography from "components/MDBTypography";
import Stack from '@mui/material/Stack';

//Update details
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import MDInput from "components/MDInput";
import httpService from "service/HttpService"
import 'react-toastify/dist/ReactToastify.css';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PreviewImage from "components/previewImage";
import MDBButton from "components/MDBButton";
import MDBInput from "components/MDBInput";
import NoImage from "assets/images/icons/Noimage.png"
import Tiktok from "assets/images/icons/svg/large/Instagram3030.svg"


import { LoginSocialFacebook, LoginSocialGoogle } from 'reactjs-social-login';

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

function ProfilePage({ }) {
  //For upload image button
  const fileRef = useRef(null);
  const profileImagefileRef = useRef(null);

  //get user id from loaclstorage
  useEffect(() => {
    let user_record = JSON.parse(window.localStorage.getItem('user'));
    if (user_record.id != undefined) {
      getUser();
    }
  }, [])

  const getUser = () => {
    // integrate get api
    // response
    // store respose into state variable
    // if any error show error through toast Message 
  }


  // On success handler
  const onSuccessHandler = (token) => {
    console.log("On success- ", token);
    //updateapi
    let payload = {
      "platform": "INSTAGRAM",
      "token": token
    }
    httpService.platformConnect(payload).then((res) => {
      if (res !== undefined && res?.data !== undefined && res?.data?.success === true) {
        //On success
      } else {
        //On error
      }
    })
  }

  // On Failure handler
  const onFailureHandler = (err) => {
    console.log("Error in instagram callback- ", err);
  }


  //Default values for Fields Creator
  const defaultValueCreator = {
    name: "",
    location: "",
    Description: "",
    dateofbirth: "",
    price: "",
    Bannerimage: "",
    ProfileImage: "",
    Instagram: "",
    youtube: "",
    tiktok: "",
    checked: [],
    checked1: [],
    picked: '',
    file: "",

  }
  //Default values for Fields Brands
  const defaultValueBrands = {
    Bannerimage: "",
    ProfileImage: "",
    Name: "",
    BrandCategories: "",
    Location: "",
    Age: "",
    Description: "",
    contracttypes: "",


  }
  //validation
  const validationSchema = Yup.object().shape({
    // fullName: Yup.string().required("Enter full name"),
    // dateOfBirth: Yup.string().required("Enter date of birth"),
    // email: Yup.string().required("Enter must be valid").email(),
    // password: Yup.string().required("Enter a password"),
    Bannerimage: Yup
      .mixed()
      .nullable()
      .test(
        "File_SIZE",
        "Upload file is too big file size should be 1024",
        (value) => !value || (value & SUPPORTED_FORMATS.includes())
      )

  })


  const handleSubmitCreator = (values, formProps) => {
    let request = {
      file: values.file,
      name: values.name,
      location: values.location,
      Description: values.Description,
      dateofbirth: values.dateofbirth,
      price: values.price,
      Bannerimage: values.Bannerimage,
      ProfileImage: values.ProfileImage,
      Instagram: values.Instagram,
      youtube: values.youtube,
      tiktok: values.tiktok,
      checked: [],
      checked1: [],
      picked: values.picked,
    };
  }
  const handleSubmitBrand = (values) => {
    let request = {
      Bannerimage: values.Bannerimage,
      ProfileImage: values.ProfileImage,
      Name: values.Name,
      BrandCategories: values.BrandCategories,
      Location: values.Location,
      Age: values.Age,
      Description: values.Description,
      contracttypes: values.contracttypes,
      photo1: values.photo1,
    }
    let data = JSON.stringify(request);
  }

  return (
    <Grid>
      {/* Edit fields Formik */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container  >
          <Grid xs={2} mt={10} ml={5}>
            <MDBox mt={2} ml={8}><MDBTypography fontSize="lg">Name</MDBTypography></MDBox>
            <MDBox mt={4} ml={8}><MDBTypography fontSize="lg">Location</MDBTypography></MDBox>
            <MDBox mt={4} ml={8}><MDBTypography fontSize="lg">Sponser Ship Type</MDBTypography></MDBox>
            <MDBox mt={6} ml={8}><MDBTypography fontSize="lg">Description</MDBTypography></MDBox>
            <MDBox mt={9} ml={8}><MDBTypography fontSize="lg">Date of birth</MDBTypography></MDBox>
            <MDBox mt={5} ml={8}><MDBTypography fontSize="lg">Price</MDBTypography></MDBox>
            <MDBox mt={4.5} ml={8}><MDBTypography fontSize="lg">Banner Image</MDBTypography></MDBox>
            <MDBox mt={5} ml={8}><MDBTypography fontSize="lg">Profile Image</MDBTypography></MDBox>
            <MDBox mt={8} ml={8}><MDBTypography fontSize="xl">Platforms</MDBTypography></MDBox>
            <MDBox mt={10} ml={8}><Stack direction="row" ><InstagramIcon fontSize="large" color="white" mb={1} /><MDBox pl={1} color="white"><span>Instagram</span></MDBox></Stack></MDBox>
            <MDBox mt={10} ml={8}><Stack direction="row" ><YouTubeIcon fontSize="large" color="white" mb={1} /><MDBox pl={1} color="white"><span>Youtube</span></MDBox></Stack></MDBox>
            <MDBox mt={10} ml={8.5}><Stack direction="row" ><img src={Tiktok} width = "24px" height="24px" alt ="tiktok"></img><MDBox pl={3} color="white"><span>Tiktok</span></MDBox></Stack></MDBox>
            <MDBox mt={10} ml={8}><MDBTypography fontSize="lg">Brand Categories</MDBTypography></MDBox>
          </Grid>
          <Grid item xs={6}>
            <MDBox >
              <Formik
                initialValues={defaultValueCreator}
                validationSchema={validationSchema}
                onSubmit={handleSubmitCreator}
              >
                {({ values, setFieldValue }) => (
                  <Form autoComplete="off">
                    <MDBox mt={10} >
                      <Field type="text" name="name" >
                        {(props) => (
                          <>
                            <MDInput
                              type="text"
                              variant="outlined"
                              placeholder="Name"
                              {...props.field}
                            />
                          </>
                        )}
                      </Field>
                      <Box mt={0.5}>
                        <p style={{ color: '#d50000', fontSize: 12, fontWeight: '11' }}>
                          <ErrorMessage name="password" />
                        </p>
                      </Box>
                    </MDBox>

                    {/* Location  */}
                    <MDBox mt={2} >
                      <Field type="text" name="location" >
                        {(props) => (
                          <>
                            <MDInput
                              type="text"
                              variant="outlined"
                              placeholder="Location"
                              {...props.field}
                            />
                          </>
                        )}
                      </Field>
                      <Box mt={0.5}>
                        <p style={{ color: '#d50000', fontSize: 12, fontWeight: '11' }}>
                          <ErrorMessage name="password" />
                        </p>
                      </Box>
                    </MDBox>

                    {/* Sponser ship type  */}
                    <MDBox mt={2}>
                      <div role="group" aria-labelledby="checkbox-group" >
                        <Stack direction="row" spacing={5}>
                          <MDBox color="white">
                            <label ><Field type="checkbox" name="checked" value="Gift" /> Gift</label>
                          </MDBox>
                          <MDBox color="white">
                            <label><Field type="checkbox" name="checked" value="Paid" /> Paid</label>
                          </MDBox>
                        </Stack>
                      </div>
                    </MDBox>

                    {/* Description */}
                    <MDBox mt={2} >
                      <Field type="textarea" name="Description" >
                        {(props) => (
                          <>
                            <MDInput
                              type="textarea"
                              variant="outlined"
                              placeholder="Description"
                              multiline rows={5}
                              {...props.field}
                            />
                          </>
                        )}
                      </Field>
                      <Box mt={0.5}>
                        <p style={{ color: '#d50000', fontSize: 12, fontWeight: '11' }}>
                          <ErrorMessage name="password" />
                        </p>
                      </Box>
                    </MDBox>

                    {/* Date of Birth */}
                    <MDBox mt={2} >
                      <Field type="text" name="dateofbirth" >
                        {(props) => (
                          <>
                            <MDInput
                              type="text"
                              variant="outlined"
                              placeholder="Date of Birth"
                              {...props.field}
                            />
                          </>
                        )}
                      </Field>
                      <Box mt={0.5}>
                        <p style={{ color: '#d50000', fontSize: 12, fontWeight: '11' }}>
                          <ErrorMessage name="password" />
                        </p>
                      </Box>
                    </MDBox>

                    {/* Price */}
                    <MDBox mt={2} >
                      <Field type="text" name="Price" >
                        {(props) => (
                          <>
                            <MDInput
                              type="text"
                              variant="outlined"
                              placeholder="Price"
                              {...props.field}
                            />
                          </>
                        )}
                      </Field>
                      <Box mt={0.5}>
                        <p style={{ color: '#d50000', fontSize: 12, fontWeight: '11' }}>
                          <ErrorMessage name="password" />
                        </p>
                      </Box>
                    </MDBox>

                    {/* Banner image */}
                    <MDBox mt={2}>
                      {/* <input ref={fileRef} hidden type="file" name="Bannerimage" placeholder="Choose file" onClick={()=>{fileRef.current.click();}} onChange={(event)=>{setFieldValue("Bannerimage", event.target.files[0])}}/> */}
                      {/* {values.file && <PreviewImage file={values.file}/>} */}
                      <Stack direction="row" spacing={2}>
                        <MDBInput type="file" placeholder="Choose file" onClick={() => { fileRef.current.click(); }} onChange={(event) => { setFieldValue("Bannerimage", event.target.files[0]) }} />
                        {values?.Bannerimage ? <PreviewImage file={values?.Bannerimage} /> : <MDBTypography
                          component="img"
                          src={NoImage}
                          height={50} width={50}
                        />
                        }
                      </Stack>
                      {/* <Thumb file={values.file} /> */}
                      {/* <Field type="file" name="Bannerimage"  onChange={(event)=>{formProps.setFieldValue("Bannerimage", event.target.files[0])}}>
                      {(props) => (
                      <>
                        <MDInput
                          type="file"
                          variant="outlined"
                          placeholder="Banner image"
                          
                        {...props.field}
                        />
                      </>
                      )}
                      </Field> */}
                      <Box mt={0.5}>
                        <p style={{ color: '#d50000', fontSize: 12, fontWeight: '11' }}>
                          <ErrorMessage name="password" />
                        </p>
                      </Box>
                    </MDBox>

                    {/* Profile Image */}
                    <MDBox mt={2}>
                      {/* <input ref={profileImagefileRef} disabled type="file" name="Profileimage" placeholder="Choose file" onChange={(event)=>{setFieldValue("Profileimage", event.target.files[0])}}/> */}
                      {/* {values.file && <PreviewImage file={values.file}/>} */}
                      <Stack direction="row" spacing={2}>
                        <MDBInput type="file" placeholder="Choose file" onChange={(event) => { setFieldValue("Profileimage", event.target.files[0]) }} />
                        {values?.Profileimage ? <PreviewImage file={values?.Profileimage} /> : <MDBTypography
                          component="img"
                          src={NoImage}
                          height={50} width={50}
                        />
                        }
                      </Stack>
                      <Box mt={0.5}>
                        <p style={{ color: '#d50000', fontSize: 12, fontWeight: '11' }}>
                          <ErrorMessage name="password" />
                        </p>
                      </Box>
                    </MDBox>

                    {/* Social Login */}
                    {/* Instagram Social */}
                    <Stack direction="row">
                      <MDBox mt={17}>
                        <Field type="text" name="Instagram" >
                          {(props) => (
                            <>
                              <MDInput
                                type="text"
                                variant="outlined"
                                placeholder="Instagram handle"
                                {...props.field}
                              />
                            </>
                          )}
                        </Field>
                        <Box mt={0.5}>
                          <p style={{ color: '#d50000', fontSize: 12, fontWeight: '11' }}>
                            <ErrorMessage name="password" />
                          </p>
                        </Box>
                      </MDBox>
                      <MDBox px={4} mt={17.5} display="flex">
                        <MDBox pr={5}>
                          <LoginSocialFacebook
                            appId={process.env.REACT_APP_FB_APP_ID || '1196247890949720'}
                            fieldsProfile={
                              'id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender'
                            }
                            // onLoginStart={onLoginStart}
                            // onLogoutSuccess={onLogoutSuccess}
                            onResolve={({ provider, data }) => {
                              onSuccessHandler("facebook", data["accessToken"]);
                            }}
                            onReject={(err) => {
                              console.log(err)
                            }}
                            scope="pages_show_list,pages_read_engagement,business_management,instagram_basic,instagram_manage_comments,instagram_manage_insights,public_profile"
                          >
                            <MDBButton   >Connect</MDBButton>
                          </LoginSocialFacebook>
                          <LoginSocialGoogle
                            client_id={process.env.REACT_APP_GG_APP_ID || '582593987497-ik7ho64jkpvus85h0fq8mg765fub6um0.apps.googleusercontent.com'}
                            // onLoginStart={onLoginStart}
                            // redirect_uri={process.env.REDIRECT_URI || "https://localhost:3000"}
                            redirect_uri={process.env.REDIRECT_URI || "https://bia-ui-dev.herokuapp.com"}

                            scope="openid profile email https://www.googleapis.com/auth/yt-analytics.readonly https://www.googleapis.com/auth/yt-analytics-monetary.readonly"
                            discoveryDocs="claims_supported"
                            access_type="offline"
                            onResolve={({ provider, data }) => {
                              console.log(data);
                            }}
                            onReject={err => {
                              console.log(err);
                            }}
                          >
                            Youtube
                          </LoginSocialGoogle>
                        </MDBox>
                        <MDBox mt={0.5} color="white">
                          <label><Field type="radio" name="picked" value="Instagram Primary" /> Primary</label>
                        </MDBox>
                      </MDBox>
                    </Stack>

                    {/* YouTube handle */}
                    <Stack direction="row">
                      <MDBox mt={7}>
                        <Field type="text" name="youtube" >
                          {(props) => (
                            <>
                              <MDInput
                                type="text"
                                variant="outlined"
                                placeholder="YouTube handle"
                                {...props.field}
                              />
                            </>
                          )}
                        </Field>
                        <Box mt={0.5}>
                          <p style={{ color: '#d50000', fontSize: 12, fontWeight: '11' }}>
                            <ErrorMessage name="password" />
                          </p>
                        </Box>
                      </MDBox>
                      <MDBox px={4} mt={7.5} display="flex">
                        <MDBox pr={5}>

                        </MDBox>
                        <MDBox mt={0.5} color="white">
                          <label><Field type="radio" name="picked" value="YouTube Primary" /> Primary</label>
                        </MDBox>
                      </MDBox>
                    </Stack>

                    {/* TikTok Handle */}
                    <Stack direction="row">
                      <MDBox mt={8}>
                        <Field type="text" name="tiktok" >
                          {(props) => (
                            <>
                              <MDInput
                                type="text"
                                variant="outlined"
                                placeholder="TikTok handle"
                                {...props.field}
                              />
                            </>
                          )}
                        </Field>
                        <Box mt={0.5}>
                          <p style={{ color: '#d50000', fontSize: 12, fontWeight: '11' }}>
                            <ErrorMessage name="password" />
                          </p>
                        </Box>
                      </MDBox>
                      <MDBox px={4} mt={8.5} display="flex">
                        <MDBox pr={5}>

                        </MDBox>
                        <MDBox mt={0.5} color="white">
                          <label><Field type="radio" name="picked" value="TikTok Primary" /> Primary</label>
                        </MDBox>
                      </MDBox>
                    </Stack>

                    {/* BrandCategories */}
                    <MDBox mt={8}>
                      <div role="group" aria-labelledby="checkbox-group1" >
                        <MDBox color="white"><label><Field type="checkbox" name="check" value="Apprel" /> Apprel</label></MDBox>
                        <MDBox color="white"><label><Field type="checkbox" name="check" value="Beauty/Cosmetics" /> Beauty/Cosmetics</label></MDBox>
                        <MDBox color="white"><label><Field type="checkbox" name="check" value="Beverages" /> Beverages</label></MDBox>
                        <MDBox color="white"><label><Field type="checkbox" name="check" value="Crypto" /> Crypto</label></MDBox>
                        <MDBox color="white"><label><Field type="checkbox" name="check" value="Experiences" /> Experiences</label></MDBox>
                        <MDBox color="white"><label><Field type="checkbox" name="check" value="Food" /> Food</label></MDBox>
                        <MDBox color="white"><label><Field type="checkbox" name="check" value="Gaming" /> Gaming</label></MDBox>
                        <MDBox color="white"><label><Field type="checkbox" name="check" value="Home" /> Home</label></MDBox>
                      </div>
                    </MDBox>

                    {/* submit button */}
                    <MDBox mt={3} ml={45}>
                      <MDBButton type="submit" size="large" variant="contained" bgColor="light_green" borderSize="lg" >
                        <MDBTypography fontSize="xl" color="black" fontWeight="bold">
                          Update
                        </MDBTypography>
                      </MDBButton>
                    </MDBox>
                  </Form>
                )}
              </Formik>
            </MDBox>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}
export default ProfilePage;