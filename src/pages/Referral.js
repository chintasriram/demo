import { Divider, Grid, InputLabel } from "@mui/material";
import MDBButton from "components/MDBButton";
import MDBCard from "components/MDBCard";
import MDBInput from "components/MDBInput";
import MDBTypography from "components/MDBTypography";
import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useState } from "react";
import BiaLayout from "layouts/biaLayout"; 

import httpService from "../service/HttpService"
import toastIcon from 'assets/images/icons/svg/medium/ToastSuccess.svg'
import ReferralService from "service/ReferralService";
import MDTypography from "components/MDTypography"; 

const validationSchema = yup.object({
  CreateReferralcode: yup.string().required("Referral code is required"),
  passCode: yup.string().required("Passcode is required"),
});

export default function Referral() {
  toast.configure();
  const [errorMessage, setErrorMessage] = useState(false);
  const [isFormSubmit, setIsFormSubmit] = useState(false);

  const formik = useFormik({
    initialValues: {
      CreateReferralcode: "",
      passCode: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setIsFormSubmit(true);
      setErrorMessage(""); 
      if(values){
        let referralCodeReq = {
          code: values.CreateReferralcode.trim(),
          passCode: values.passCode.trim()
        }
        // Create referral code
        ReferralService.createReferralCode(referralCodeReq,createReferralCodeSuccessCallback,createReferralCodeErrorCallback);
      } 
    },
  });

  // Create referral code success callback
  const createReferralCodeSuccessCallback=(data)=>{
    setIsFormSubmit(false)
    if (data && data?.success === true) {
      toast.success("Your Referral code saved successfully", {
        position: toast.POSITION.TOP_LEFT,
        hideProgressBar: true,
        autoClose: 3000,
        icon:<img src={toastIcon} />
      });
    } else {
      setErrorMessage(data.message)
    }
  }

  // Create referral code error callback
  const createReferralCodeErrorCallback=(error)=>{
    setIsFormSubmit(false)
    toast.error("Failed. Please try again", {
      position: toast.POSITION.TOP_LEFT,
      hideProgressBar: true,
      autoClose: 3000,
    });
  }

  return (
    <BiaLayout>
      <Grid
        container
        alignContent="center"
        justifyContent="center"
        style={{ height: "100%" }}
        position="relative"
        top="120px"
      >
        <Grid
          item
          xs={1}
          sm={1.5}
          md={2}
          lg={3}
          xl={3}
          xxl={4}
          xel={4}
          xxel={4.5}
          el={5}
        />
        <Grid
          item
          xs={10}
          sm={9}
          md={8}
          lg={6}
          xl={6}
          xxl={4}
          xel={3.5}
          xxel={3}
          el={2}
        >
          <MDBCard sx={{ p: 0, m: 0, mb: 2, width: "inherit" }}>
            <Grid px={5} pt={6}>
              <MDBTypography
                color="white"
                fontWeight="medium"
                fontSize="4xl"
                lineHeightSize="5xl"
              >
                Referral Code
              </MDBTypography>
            </Grid>
            <Divider />
            <Grid px={5.5}></Grid>
            <form onSubmit={formik.handleSubmit}>
              <Grid sx={{ pt: 1.5, pb: 4, px: 5 }}>
                <Grid mb={4}>
                  <InputLabel>
                    <MDBTypography
                      color="white"
                      fontWeight="regular"
                      fontSize="xs"
                      lineHeightSize="md"
                      textTransform="uppercase"
                      pb={1}
                    >
                      Referral code
                    </MDBTypography>
                  </InputLabel>
                  <MDBInput
                    type="text"
                    placeholder="Enter referral code"
                    name="CreateReferralcode"
                    autoComplete="off"
                    value={formik.values.CreateReferralcode}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.CreateReferralcode &&
                      Boolean(formik.errors.CreateReferralcode)
                    }
                    helperText={
                      formik.touched.CreateReferralcode &&
                      formik.errors.CreateReferralcode
                    }
                  />
                </Grid>
                <Grid mb={4}>
                  <InputLabel>
                    <MDBTypography
                      color="white"
                      fontWeight="regular"
                      fontSize="xs"
                      lineHeightSize="md"
                      textTransform="uppercase"
                      pb={1}
                    >
                      Passcode
                    </MDBTypography>
                  </InputLabel>
                  <MDBInput
                    type="text"
                    placeholder="Enter Passcode"
                    name="passCode"
                    autoComplete="off"
                    value={formik.values.passCode}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.passCode && Boolean(formik.errors.passCode)
                    }
                    helperText={
                      formik.touched.passCode && formik.errors.passCode
                    }
                  />
                </Grid>
                {
                  errorMessage!=="" &&
                  <MDTypography sx={{ color: "#E53935!important", fontSize: 16, marginBottom:1}}>
                    {errorMessage}
                  </MDTypography>
                } 
                <MDBButton
                  type="submit"
                  size="inherit"
                  variant="contained"
                  color="black"
                  bgColor="light_green"
                  fontWeight="medium"
                  fontSize="md"
                  borderSize="md"
                  sx={{ mb: 3 }}
                  disabled={isFormSubmit ? true : false}
                  isLoading={isFormSubmit}
                >
                  Save
                </MDBButton>
              </Grid>
            </form>
          </MDBCard>
        </Grid>
        <Grid
          item
          xs={1}
          sm={1.5}
          md={2}
          lg={3}
          xl={3}
          xxl={4}
          xel={4}
          xxel={4.5}
          el={5}
        />
      </Grid>
    </BiaLayout>
  );
}
