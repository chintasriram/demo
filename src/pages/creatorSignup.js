import MDBox from "components/MDBox"; 
import { Formik,Form, Field, ErrorMessage } from "formik";
import React, { Fragment } from "react";
import * as Yup from "yup"; 
import BaseLayout from "layouts/baseLayout";
import { Grid } from "@mui/material";
import Box from '@mui/material/Box';
import MDInput from "components/MDInput";
import {useNavigate} from 'react-router-dom';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import httpService from "../service/HttpService"
import MDBButton from "components/MDBButton";
import MDBInput from "components/MDBInput";
import userService from "service/UserService" 
import toastIcon from 'assets/images/icons/svg/medium/ToastSuccess.svg'

const CreatorSignup= ()=> {
  
  // configured the Toast
  toast.configure();
   
  const history = useNavigate();
  const defaultValue ={
    fullName:"",
    dateOfBirth:"",
    instagramHandle:"",
    email:"",
    password:"",
    tiktokHandle:"",
    youtubeHandle:"",
  }
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Enter full name"),
    dateOfBirth: Yup.string().required("Enter date of birth"),
    email: Yup.string().required("Enter must be valid").email(),
    password: Yup.string().required("Enter a password"),   
  })
  const handleSubmit =(values,props)=>{
    let request={
        type: 'creator',
        name: values.fullName,
        dateOfBirth: values.dateOfBirth,
        instagramHandle: values.instagramHandle,
        youtubeHandle: values.youtubeHandle,
        tiktokHandle: values.tiktokHandle,
        password: values.password,
        email: values.email,
        bannerImg:"img.png",
        description:"dis"

      }

    let data = JSON.stringify(request);
      httpService.createCreator(request).then((result)=>{
        // if(result !== undefined && result.data !== undefined && result.data.success !== undefined && result.data.success === true){
        if(result.data.success === true){
        // already exist
        toast.success("Registered successfully", {position: toast.POSITION.TOP_RIGHT,
          hideProgressBar: true,autoClose:3000, icon:<img src={toastIcon} />});
        // setShow(!show); 
        userService.updateUserSessionWithUser(result.data.data); 
        history('/c/home');
        }else{
          toast.error("Creator is already exist", {position: toast.POSITION.TOP_RIGHT,hideProgressBar: true,autoClose:3000});
          props.isSubmitting=false;
        }
      })
      .catch(error=>{
        console.log(error)
      })
    }
  return (
    <BaseLayout>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      > 
        <Formik
        initialValues={defaultValue}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        >
          {(props)=>(
            <Form autoComplete="off"> 
              <MDBox mt={1}>
                {/* <MDTypography variant="button" color="text" fontWeight="bold">
                Full name */}
                <div>  
                  <Field type="text" name="fullName" placeholder="Full name"  >
                    {(props) => (
                      <>
                        <MDBInput
                          variant="outlined"
                          placeholder="Full name"
                          label="Full name" 
                          // sx={{ input: { color: '#F5F5F5', backgroundColor:'#1C1F21',width: 260,borderBlockColor:'#1C1F21'}}}
                          {...props.field}
                        />
                      </>
                    )}
                  </Field>
                  <Box mt={0.5}>
                    <p style={{color:'#d50000', fontSize:12, fontWeight:'11'}} >
                      <ErrorMessage name="fullName"/>
                    </p>
                  </Box>
                </div> 
                {/* </MDTypography> */}
              </MDBox>  
              
              <MDBox mt={2} >
                {/* <MDTypography variant="button" color="text" fontWeight="bold">
                Date of birth */}
                <div >  
                  <Field type="text" name="dateOfBirth"  placeholder=" Date of birth"  >
                    {(props) => (
                      <>
                        <MDInput
                          variant="outlined"
                          type="text" 
                          label="Date of birth"
                          {...props.field}
                        />
                      </>
                    )}
                  </Field>
                  <Box mt={0.5}>
                    <p style={{color:'#d50000', fontSize:12, fontWeight:'11'}} >
                      <ErrorMessage name="dateOfBirth"/>
                    </p>
                  </Box>
                </div> 
                {/* </MDTypography> */}
              </MDBox>  
              
              <MDBox mt={1} >
                {/* <MDTypography variant="button" color="text" fontWeight="bold">
                  Email */}
                <div >  
                  <Field  type="text" name="email" placeholder="Email" >
                  {(props) => (
                    <>
                      <MDInput
                        variant="outlined"
                        placeholder="Email"
                        label="Email"
                        // sx={{ input: { color: '#F5F5F5', backgroundColor:'#1C1F21',width: 260,borderBlockColor:'#1C1F21'}}}
                        {...props.field}
                      
                      />
                    </>
                  )}
                  </Field>
                  <Box mt={0.5}>
                    <p style={{color:'#d50000', fontSize:12, fontWeight:'11'}}>
                      <ErrorMessage name="email"/>
                    </p>
                  </Box>
                </div> 
                {/* </MDTypography> */}
              </MDBox>  
              
              <MDBox mt={2} >
                {/* <MDTypography variant="button" color="text" fontWeight="bold">
                  Password */}
                <div >  
                  <Field  type="password" name="password" placeholder="Password">
                    {(props) => (
                      <>
                        <MDInput
                          type="password"
                          variant="outlined"
                          placeholder="Password"
                          label="Password"
                          // sx={{ input: { color: '#F5F5F5', backgroundColor:'#1C1F21',width: 260,borderBlockColor:'#1C1F21'}}}
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
                </div> 
                {/* </MDTypography> */}
              </MDBox>  
            
              <MDBox mt={2} >
                {/* <MDTypography variant="button" color="text" fontWeight="bold">
                  Instagram handle */}
                <div >  
                  <Field  type="text" name="instagramHandle"  placeholder="Inatagram handle">
                    {(props) => (
                      <>
                        <MDInput
                          type="text"
                          variant="outlined"
                          placeholder="Instagram handle"
                          label="Instagram handle"
                          // sx={{ input: { color: '#F5F5F5', backgroundColor:'#1C1F21',width: 260,borderBlockColor:'#1C1F21'}}}
                          {...props.field}
                        
                        />
                      </>
                    )}
                  </Field>
                  <Box mt={0.5}>
                    <p style={{color:'#d50000', fontSize:12, fontWeight:'11'}}>
                      <ErrorMessage name="instagramHandle"/>
                    </p>
                  </Box>
                </div> 
                {/* </MDTypography> */}
              </MDBox>  

              <MDBox  mt={2}>
                {/* <MDTypography variant="button" color="text" fontWeight="bold">
                  TikTok handle */}
                <div >  
                  <Field  type="text" name="tiktokHandle" placeholder="TickTok handle">
                    {(props) => (
                      <>
                        <MDInput
                          variant="outlined"
                          placeholder="TikTok handle"
                          label="TikTok handle"
                          // sx={{ input: { color: '#F5F5F5', backgroundColor:'#1C1F21',width: 260,borderBlockColor:'#1C1F21'}}}
                          {...props.field}
                        
                        />
                      </>
                    )}
                  </Field>
                  <Box mt={0.5}>
                    <p style={{color:'#d50000', fontSize:12, fontWeight:'11'}}>
                      <ErrorMessage name="tiktokHandle"/>
                    </p>
                  </Box>
                </div> 
                {/* </MDTypography> */}
              </MDBox>  
              
              <MDBox mt={2} >
                {/* <MDTypography variant="button" color="text" fontWeight="bold">
                  Youtube handle */}
                <div >  
                  <Field  type="text" name="youtubeHandle" placeholder="Youtube handle">
                    {(props) => (
                      <>
                        <MDInput
                          variant="outlined"
                          placeholder="Youtube handle"
                          label="Youtube handle"
                          // sx={{ input: { color: '#F5F5F5', backgroundColor:'#1C1F21',width: 260,borderBlockColor:'#1C1F21'}}}
                          {...props.field}
                        
                        />
                      </>
                    )}
                  </Field>
                  <Box mt={0.5}>
                    <p className="text_danger" >
                      <ErrorMessage name="youtubeHandle"/>
                    </p>
                  </Box>
                </div> 
                {/* </MDTypography> */}
              </MDBox>  
              {/* <button className="btn btn-primary" type="submit">
                Subbmit
              </button> */}
              <MDBox mt={3}>
                <MDBButton 
                  type="submit" 
                  disabled={props.isSubmitting}  
                  size = "large"
                  variant= "contained"
                  color= "black"
                  bgColor= "light_green"
                  fontWeight = "bold"
                  fontSize = "md"
                  borderSize = "md"
                  sx={{width : "200px"}}
                >
                  {props.isSubmitting?"Loading":"Register"}
                </MDBButton>
              </MDBox>
            </Form>
          )}
        </Formik>
      </Grid>
    </BaseLayout>
  )
}
export default CreatorSignup;