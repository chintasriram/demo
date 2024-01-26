import { useState } from "react";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { Formik,Form, Field, ErrorMessage } from "formik";
import React, { Fragment } from "react";
import * as Yup from "yup";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from "axios"; 
import HomePage from "pages/homepage";
import {useNavigate} from 'react-router-dom';
import MDAlert from "components/MDAlert";
import BaseLayout from "layouts/authentication/components/BaseLayout";
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';
import MDInput from "components/MDInput";
import MDSnackbar from "components/MDSnackbar";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';
import httpService from "service/HttpService"
import MDBButton from "components/MDBButton";
import MDBInput from "components/MDBInput";
import userService from "service/UserService" 

function Basic(props) {
   // configured the Toast
   toast.configure();
   const [errorMessage, setErrorMessage] = useState(false);

   //For Navigation
  const history = useNavigate();
  
  const defaultValue ={
    email:"",
    password:"",
  }
  const validationSchema = Yup.object().shape({

      email: Yup.string().required("Enter an email").email(),
      password: Yup.string().required("Enter a password"),
      
  })
  const handleSubmit =(values)=>{
    setErrorMessage("");
    let request={
        password: values.password,
        email: values.email,
      }
      httpService.creatorLogin(request).then((result)=>{
       if(result.data.success === true){
        userService.updateUserSessionWithUser(result.data.data); 
        // toast.success("You are successfully logged in", {position: toast.POSITION.TOP_CENTER,hideProgressBar: true,autoClose:3000});
        history('/c/home');
       }else{
      setErrorMessage("Invalid credentials");
       }
      })
      .catch(error=>{
        console.log(error)
      })
    }
  

  return (
    <BaseLayout >
    <Fragment>
     
     <Formik
     initialValues={defaultValue}
     validationSchema={validationSchema}
     onSubmit={handleSubmit}
     >
     <Form autoComplete="off">
         
         
        
         <MDBox pt={4} >
         
           <div >  
           <Field type="text" name="email" >
           {(props) => (
            <>
              <MDBInput
                variant="outlined"
                label="Email"
                // sx={{ input: { color: '#F5F5F5', backgroundColor:'#1C1F21',width: 260,borderBlockColor:'#1C1F21'}}}
                {...props.field}
              
              />
            </>
            )}
           </Field>
           <p style={{color:'#d50000', fontSize:12, fontWeight:'11'}}>
             <ErrorMessage name="email"/>
           </p>
           </div> 
          
         </MDBox>  
         
         <MDBox py={2} >

           <div >  
           <Field type="password" name="password">
           {(props) => (
            <>
              <MDBInput
                variant="outlined"
                type="password"
                placeholder="password"
                label="password"
                // sx={{ input: { color: '#F5F5F5', backgroundColor:'#1C1F21',width: 260,borderBlockColor:'#1C1F21'}}}
                {...props.field}
              
              />
            </>
            )}
           </Field>
           <p style={{color:'#d50000', fontSize:12, fontWeight:'11'}}>
             <ErrorMessage name="password"/>
           </p>
           </div> 

         </MDBox>  
         <MDBox>
         {errorMessage? 
         <p style={{color:'#d50000', fontSize:12, fontWeight:'14'}}>
         {errorMessage} 
         </p>
          :<></>}
        </MDBox>
          <MDBox mt={2}>
          <MDBButton  
            type="submit"  
            size = "large"
            variant= "contained"
            color= "black"
            bgColor= "light_green"
            fontWeight = "bold"
            fontSize = "md"
            borderSize = "md"
          >
            Login
          </MDBButton>
          </MDBox>
         </Form>
     </Formik>
    </Fragment>

    </BaseLayout>
  );
}

export default Basic;
