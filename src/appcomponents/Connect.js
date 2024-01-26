import { Divider, Grid, InputLabel } from "@mui/material";
import CloseButton from "components/CloseButton";
import MDBButton from "components/MDBButton";
import MDBCard from "components/MDBCard";
import MDBInput from "components/MDBInput";
import MDBTypography from "components/MDBTypography";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Recaptcha from "react-recaptcha";
import config from "app.config";
import { useWidth } from "components/Hooks/UseWidth";
import ProposalService from "service/ProposalService"
import { toast } from 'react-toastify'
import toastIcon from 'assets/images/icons/svg/medium/ToastSuccess.svg'

const validationSchema = yup.object({
  email: yup.string("Enter your email").required("Email is required"),
  brandName: yup.string("Enter Brand name").required("Brand name is required"),
  message: yup.string("Enter your messege").required("Messege is required"),
  recaptcha: yup.string().required("Recaptcha is required"),
});

export default function Connect(props) {
  const [formSubmit, setFormSubmit] = useState(false)
  const breakpoint = useWidth()[0]
  useEffect(() => {
    setFormSubmit(false)
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, [])

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
      recaptcha: "",
      brandName:""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => { 
      setFormSubmit(true)
      let payload = {};
        payload.receiverId = props?.userId;
        payload.content = values.message;
        payload.senderName = values.name;
        payload.senderEmail = values.email;
        payload.brandName= values.brandName
        payload.type = getProposalType()
        ProposalService.sendProposal(payload, connectApiCallback);
    } 
  });
  const connectApiCallback = (res) => {
    setFormSubmit(false)
    if(props?.isRates){
      toast.success("Request for pricing sent successfully", { position: toast.POSITION.TOP_LEFT, 
        hideProgressBar: true,icon:<img src={toastIcon} /> });
    }else{
      toast.success("Request for connect sent successfully", { position: toast.POSITION.TOP_LEFT, 
        hideProgressBar: true,icon:<img src={toastIcon} /> });
    }
    props.closeCallback();
  }

  // Get Proposal type
  const getProposalType=()=>{
    let prosalType = (props?.isRates===true)?"rates_proposal":"connect_proposal";
    return prosalType;
  }
  
  return (
    <Grid
      container
      alignContent="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={1} sm={1} md={3} lg={3} xl={4} xxl={4} xel={4.5} el={5} xxel={3}/>
      <Grid item xs={10} sm={10} md={6} lg={6} xl={4} xxl={4} xel={3} el={2} xxel={6}>       
      <MDBCard borderRadius="xl" bgcolor="cardBg" sx={{ p: 0, mx: 0, my: 10, width: "inherit" }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            px={4} pt={2}
          >
            <Grid item alignSelf="center">
              <MDBTypography
                color="white"
                fontWeight="medium"
                fontSize="2xl"
                lineHeightSize="4xl"
              >
                {props?.isRates === true ? "Request pricing" : "CONNECT"}
              </MDBTypography>
            </Grid>
            <Grid
              item
              alignSelf="flex-end" pb={1}
            >
              <CloseButton callback={props.closeCallback} />
            </Grid>
          </Grid>

          {/* Divider */}
          <Divider sx={{ my: 1 }} />
          <Grid>
            {/* Card Body */}
            <Grid
              sx={{
                pt: 1,
                pb: 3,
                px: 4,
              }}
            >
              <InputLabel
                sx={{ mt: 1, mb: 1 }}
              >
                <MDBTypography
                  fontWeight="regular"
                  fontSize="lg"
                  lineHeight="2xl"
                >
                  Your Name
                </MDBTypography>
              </InputLabel>
              <MDBInput
                type="text"
                placeholder="Enter your Name"
                sx={{
                  mb: 2
                }}
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              <InputLabel
                sx={{ mt: 1, mb: 1 }}
              >
                <MDBTypography
                  fontWeight="regular"
                  fontSize="lg"
                  lineHeight="2xl"
                >
                  Brand Name
                </MDBTypography>
              </InputLabel>
              <MDBInput
                type="text"
                placeholder="Enter brand name"
                id="brandName"
                name="brandName"
                value={formik.values.brandName}
                onChange={formik.handleChange}
                error={formik.touched.brandName && Boolean(formik.errors.brandName)}
                helperText={formik.touched.brandName && formik.errors.brandName}
              />
              <InputLabel
                sx={{ mt: 2, mb: 1 }}
              >
                <MDBTypography
                  fontWeight="regular"
                  fontSize="lg"
                  lineHeight="2xl"
                >
                  Email
                </MDBTypography>
              </InputLabel>
              <MDBInput
                type="email"
                placeholder="Enter email"
                sx={{
                  mb: 2
                }}
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <InputLabel
                sx={{ mt: 2, mb: 1 }}
              >
                <MDBTypography
                  fontWeight="regular"
                  fontSize="lg"
                  lineHeight="2xl"
                >
                  Message
                </MDBTypography>
              </InputLabel>
              <MDBInput
                type="textarea"
                placeholder="Enter message"
                multiline
                rows={2}
                id="message"
                name="message"
                value={formik.values.message}
                onChange={formik.handleChange}
                error={formik.touched.message && Boolean(formik.errors.message)}
                helperText={formik.touched.message && formik.errors.message}
              />
              <Grid mt={3}   >
                <Recaptcha
                  size={breakpoint === "xs" || breakpoint === "sm" ? "compact" : "normal"}
                  sitekey={config.recaptchaSiteKey}
                  render="explicit"
                  theme="dark"
                  verifyCallback={(response) => {
                    formik.setFieldValue("recaptcha", response);
                  }}
                  onloadCallback={() => {
                    console.log("done loading!");
                  }}

                />
              </Grid>
              {formik.errors.recaptcha && formik.touched.recaptcha && (
                <p style={{ color: '#E53935', fontSize: 16, fontWeight: '14' }}>
                  {formik.errors.recaptcha}
                </p>
              )}

            </Grid>
          </Grid>
          {/* Card Divider */}
          <Divider sx={{ my: 1 }} />

          {/* Card Footer */}
          <Grid
            container
            sx={{
              px: 5,
              pb: 3,
              mr: 1.5,
            }}
            justifyContent="flex-end"

          >
            <MDBButton
              size="medium"
              variant="contained"
              color="black"
              bgColor="light_green"
              fontWeight="bold"
              fontSize="md"
              borderSize="md"
              type="submit"
              isLoading={formSubmit}
              disabled={formSubmit?true:false}
            >
              {props?.isRates === true ? "Request" : "Send"}
            </MDBButton>
          </Grid>
        </form>
      </MDBCard>
      </Grid> 
      <Grid item xs={1}  sm={1} md={3} lg={3} xl={4} xxl={4} xel={4.5} el={1} xxel={3}/>
    </Grid>
  );
}
