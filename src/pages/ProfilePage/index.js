import MDBox from "components/MDBox";

import CallMadeIcon from '@mui/icons-material/CallMade';
import DefaultNavbarLink from "appcomponents/Navbars/DefaultNavbar/DefaultNavbarLink";
import CallMade from "@mui/icons-material/CallMade";
import BaseLayout from "layouts/baseLayout";
import FirstLayout from "layouts/FirstLayout";
import Grid from "@mui/material/Grid";
import FontAwesome from "react-fontawesome"; 
import InstagramIcon from '@mui/icons-material/Instagram';
// Material Dashboard 2 React components

import {Tab, Tabs} from "@material-ui/core";
import React from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MDTypography from "components/MDTypography";
import Stack from '@mui/material/Stack';
import BasicLayout from "layouts/authentication/components/BasicLayout";

//Update details
import { Formik,Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import MDInput from "components/MDInput";
import httpService from "service/HttpService"
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import YouTubeIcon from '@mui/icons-material/YouTube';
import MDBButton from "components/MDBButton";


function ProfilePage({}) {
  // On success handler
   const onSuccessHandler = (response) => {
    console.log("On success- ",response);
    }

  // On Failure handler
  const onFailureHandler=(err)=>{
    console.log("Error in instagram callback- ",err);
  }
  

 //Default values for Fields Creator
   const defaultValueCreator={
    name:"",
    location:"",
    Description:"",
    dateofbirth:"",
    price:"",
    Bannerimage:"",
    ProfileImage:"",
    Instagram:"",
    youtube:"",
    tiktok:"",
    checked: [],
    checked1:[],
    picked: '',
    photo1:"",
    
  }
  //Default values for Fields Brands
  const defaultValueBrands={
    Bannerimage:"",
    ProfileImage:"",
    Name:"",
    BrandCategories:"",
    Location:"",
    Age:"",
    Description:"",
    contracttypes:"",
    

  }
//validation
const validationSchema = Yup.object().shape({
  // fullName: Yup.string().required("Enter full name"),
  // dateOfBirth: Yup.string().required("Enter date of birth"),
  // email: Yup.string().required("Enter must be valid").email(),
  // password: Yup.string().required("Enter a password"),
  
})
const Uploadimage1=(event)=>{
}

const handleSubmitCreator =(values,formProps)=>{
  let request={
    photo1:values.photo1,
    name:values.name,
    location:values.location,
    Description:values.Description,
    dateofbirth:values.dateofbirth,
    price:values.price,
    Bannerimage:values.Bannerimage,
    ProfileImage:values.ProfileImage,
    Instagram:values.Instagram,
    youtube:values.youtube,
    tiktok:values.tiktok,
    checked: [],
    checked1:[],
    picked: values.picked,
    }
   let data = JSON.stringify(request);
  }
  const handleSubmitBrand =(values)=>{
    let request={
      Bannerimage:values.Bannerimage,
      ProfileImage: values.ProfileImage,
      Name: values.Name,
      BrandCategories:values.BrandCategories,
      Location:values.Location,
      Age: values.Age,
      Description: values.Description,
      contracttypes: values.contracttypes,
      photo1:values.photo1,
    }
    let data = JSON.stringify(request);   
  }

  return (
    <FirstLayout>
   {/* Edit fields Formik */}
   <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        
      <Grid xs={2} mt={10} ml={10}>
    <MDBox><MDTypography  color="white" fontWeight="bold" fontSize="medium">Creator</MDTypography></MDBox>   
    <MDBox mt={2} ml={8}><MDTypography  color="white" fontWeight="bold" fontSize="medium">Name</MDTypography></MDBox>
    <MDBox mt={3} ml={8}> <MDTypography  color="white" fontWeight="bold" fontSize="medium">Location</MDTypography></MDBox>  
    <MDBox mt={4} ml={8}><MDTypography  color="white" fontWeight="bold" fontSize="medium">Sponser Ship Type</MDTypography></MDBox>
    <MDBox mt={7} ml={8}><MDTypography  color="white" fontWeight="bold" fontSize="medium">Description</MDTypography></MDBox>
    <MDBox mt={10} ml={8}><MDTypography  color="white" fontWeight="bold" fontSize="medium">Date of birth</MDTypography></MDBox>
    <MDBox mt={4} ml={8}><MDTypography  color="white" fontWeight="bold" fontSize="medium">Price</MDTypography></MDBox>
    <MDBox mt={4} ml={8}><MDTypography  color="white" fontWeight="bold" fontSize="medium">Banner Image</MDTypography></MDBox>
    <MDBox mt={4} ml={8}><MDTypography  color="white" fontWeight="bold" fontSize="medium">Profile Image</MDTypography></MDBox>
    <MDBox mt={4} ml={8}><MDTypography  color="white" fontWeight="bold" fontSize="medium">platforms</MDTypography></MDBox>
    <MDBox mt={4} ml={8}><Stack direction="row" spacing={1}> <MDBox ><InstagramIcon fontSize="large"/></MDBox><MDBox pl={1}><span>Inatagram</span></MDBox></Stack></MDBox>
    <MDBox mt={6} ml={8}><Stack direction="row" spacing={1}> <MDBox ><YouTubeIcon fontSize="large"/></MDBox><MDBox  pl={2} ><span>YouTube</span></MDBox></Stack> </MDBox> 
    <MDBox mt={6} ml={8}><Stack direction="row"> <MDBox><img src={"/tiktok1.png"}></img></MDBox><MDBox pl={7}  ><span pl={7} >Tiktok</span></MDBox></Stack></MDBox>  
    <MDBox mt={8} ml={8}><MDTypography  color="white" fontWeight="bold" fontSize="medium">Brand Categories</MDTypography></MDBox>
  </Grid>
  <Grid item xs={6}>
  <MDBox >
   <Formik
       initialValues={defaultValueCreator}
      //  validationSchema={validationSchema}
       onSubmit={handleSubmitCreator}
      >
        {(formProps)=>(
        <Form autoComplete="off"> 
        <input type="file" name="photo1" onChange={(event)=>{formProps.setFieldValue("photo1", event.target.files[0])}}/>
          <MDBox mt={10} >
          <Field  type="text" name="name" >
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
            <p style={{color:'#d50000', fontSize:12, fontWeight:'11'}}>
              <ErrorMessage name="password"/>
            </p>
            </Box>
            </MDBox>
            
            {/* Location  */}
          <MDBox mt={2} >
           <Field  type="text" name="location" >
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
            <p style={{color:'#d50000', fontSize:12, fontWeight:'11'}}>
              <ErrorMessage name="password"/>
            </p>
            </Box>
            </MDBox>
          
            {/* Sponser ship type  */}
            <MDBox mt={2}>
            <div role="group" aria-labelledby="checkbox-group" >
            <Stack direction="row" spacing={5}>
           <MDBox><label>
              <Field type="checkbox" name="checked" value="Gift" />
              Gift
            </label>
            </MDBox> 
            <MDBox>
            <label>
              <Field type="checkbox" name="checked" value="Paid" />
              Paid
            </label></MDBox> </Stack>
            </div>
            </MDBox>
            {/* Description */}
            <MDBox mt={2} >
           <Field  type="text" name="Description" >
            {(props) => (
            <>
              <MDInput
                type="text"
                variant="outlined"
                placeholder="Description"
                multiline rows={5} 
               {...props.field}
              />
            </>
            )}
            </Field>
            <Box mt={0.5}>
            <p style={{color:'#d50000', fontSize:12, fontWeight:'11'}}>
              <ErrorMessage name="password"/>
            </p>
            </Box>
            </MDBox>
            {/* Date of Birth */}
           <MDBox mt={2} >
           <Field  type="text" name="dateofbirth" >
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
            <p style={{color:'#d50000', fontSize:12, fontWeight:'11'}}>
              <ErrorMessage name="password"/>
            </p>
            </Box>
            </MDBox>
            {/* Price */}
            <MDBox mt={2} >
           <Field  type="text" name="Price" >
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
            <p style={{color:'#d50000', fontSize:12, fontWeight:'11'}}>
              <ErrorMessage name="password"/>
            </p>
            </Box>
            </MDBox>
            {/* Banner image */}
            
            <MDBox mt={2}>
           <Field  type="file" name="Bannerimage"  onChange={(event)=>Uploadimage1(event)}>

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
            </Field>
            <Box mt={0.5}>
            <p style={{color:'#d50000', fontSize:12, fontWeight:'11'}}>
              <ErrorMessage name="password"/>
            </p>
            </Box>
            </MDBox>
            {/* Profile Image */}
            <MDBox mt={2}>
           <Field  type="file" name="ProfileImage" >
            {(props) => (
            <>
              <MDInput
                type="file"
                variant="outlined"
                placeholder="Profile Image"
               {...props.field}
              />
            </>
            )}
            </Field>
            <Box mt={0.5}>
            <p style={{color:'#d50000', fontSize:12, fontWeight:'11'}}>
              <ErrorMessage name="password"/>
            </p>
            </Box>
            </MDBox>
           {/* Social ogin */}
       {/* Instagram Social */}
        <Stack direction="row">
       <MDBox mt={8}>
           <Field  type="text" name="Instagram" >
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
            <p style={{color:'#d50000', fontSize:12, fontWeight:'11'}}>
              <ErrorMessage name="password"/>
            </p>
            </Box>
            </MDBox>
            <MDBox px={4}mt={8} >
             
            </MDBox>
            </Stack>
            {/* YouTube handle */}
            <Stack direction="row">
           <MDBox mt={5}>
           <Field  type="text" name="youtube" >
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
            <p style={{color:'#d50000', fontSize:12, fontWeight:'11'}}>
              <ErrorMessage name="password"/>
            </p>
            </Box>
            </MDBox>
            <MDBox px={4}mt={5} >
             
            </MDBox>
            </Stack>
            {/* TikTok Handle */}
            <Stack direction="row">
           <MDBox mt={5}>
           <Field  type="text" name="tiktok" >
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
            <p style={{color:'#d50000', fontSize:12, fontWeight:'11'}}>
              <ErrorMessage name="password"/>
            </p>
            </Box>
            </MDBox>
            <MDBox px={4}mt={5} >
             
            </MDBox>
            </Stack>
            
            <div role="group" aria-labelledby="my-radio-group">
            <Stack direction="row" mt={2} spacing={5}> 
            <MDBox><label><Field type="radio" name="picked" value="Instagram Primary" />Instagram Primary</label></MDBox>
            <MDBox><label><Field type="radio" name="picked" value="YouTube Primary" />YouTube Primary</label></MDBox>
            <MDBox><label><Field type="radio" name="picked" value="TikTok Primary" />TikTok Primary</label></MDBox>
            </Stack>
             </div>
             
            
           {/* BrandCategories */}
            <MDBox mt={2}>
             <div role="group" aria-labelledby="checkbox-group1" >
             <MDBox><label><Field type="checkbox" name="check" value="Gift" />Apprel</label></MDBox>   
             <MDBox><label><Field type="checkbox" name="check" value="Paid" />Beauty/Cosmetics</label></MDBox>   
             <MDBox><label><Field type="checkbox" name="check" value="Paid" />Beverages</label></MDBox>   
             <MDBox><label><Field type="checkbox" name="check" value="Paid" />Crypto</label></MDBox>
             <MDBox><label><Field type="checkbox" name="check" value="Paid" />Experiences</label></MDBox>
             <MDBox><label><Field type="checkbox" name="check" value="Paid" />Food</label></MDBox>
             <MDBox><label><Field type="checkbox" name="check" value="Paid" />Gaming</label></MDBox>
             <MDBox><label><Field type="checkbox" name="check" value="Paid" />Home</label></MDBox>
             </div>
            </MDBox>
            {/* submit button */}
            <MDBox mt={3} ml={60}>
            <MDBButton type="submmit"  size="large"  variant="gradient" color="bbbg" textColor="#111315" sx={{width:"200px", textTransform:"capitalize", }} >
              Update
            </MDBButton>
            </MDBox>
          </Form>
        )}
      </Formik>
      </MDBox >
        </Grid>
        <Grid item xs>
        <div>
   
    <Formik
      initialValues={{
        picked: '',
      }}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
      }}
    >
      {({ values }) => (
        <Form>
          <div id="my-radio-group">Picked</div>
          <Stack direction="column">
            <div role="group" aria-labelledby="my-radio-group">
            <MDBox><label><Field type="radio" name="picked" value="Instagram Primary" />Instagram Primary</label></MDBox>
            <MDBox><label><Field type="radio" name="picked" value="YouTube Primary" />YouTube Primary</label></MDBox>
            <MDBox><label><Field type="radio" name="picked" value="TikTok Primary" />TikTok Primary</label></MDBox>
             </div>
             </Stack>

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
        </Grid>
      </Grid>
    </Box>
   </FirstLayout>

  );
}
export default ProfilePage;