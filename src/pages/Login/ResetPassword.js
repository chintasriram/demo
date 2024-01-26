import { Divider, Grid, InputLabel } from "@mui/material";
import MDBButton from "components/MDBButton";
import MDBCard from "components/MDBCard";
import MDBInput from "components/MDBInput";
import MDBTypography from "components/MDBTypography";
import BiaLayout from "layouts/biaLayout";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import UserService from "service/UserService";
import MDBox from "components/MDBox";

export default function ResetPassword() {
  const [isSendResetMail, setIsSendResetMail] = useState(false);
  const [isFormSubmit, setIsFormSubmit] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Formik handlers
  const formik = useFormik({
    //Initial values
    initialValues: {
      email: "",
    },
    //validation schema
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is required")
        .email("Enter a valid email"),
    }),
    //On submit handler
    onSubmit: (values) => {
      setErrorMsg("");
      setIsFormSubmit(true);
      let payload = { email: values.email.trim() };
      UserService.resetPassword(
        payload,
        resetPasswordSuccessCallback,
        resetPasswordErrorCallback
      );
    },
  });

  //Reset password success callback
  const resetPasswordSuccessCallback = (data) => {
    setIsFormSubmit(false);
    if (data?.success && data?.success === true) {
      // Set send reset mail is true
      setIsSendResetMail(true);
    } else {
      setErrorMsg("Sorry that account does not exist. Please enter a different email or create an account");
    }
  };

  //Reset password error callback
  const resetPasswordErrorCallback = (error) => {
    setIsFormSubmit(false);
    setErrorMsg("Unable to send email. Please try again");
  };

  return (
    <BiaLayout>
      <Grid
        container
        alignContent="center"
        justifyContent="center"
        style={{ height: "100%" }}
        position="relative"
        top="150px"
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
          <MDBCard sx={{ p: 0, m: 0, mb: 2 }}>
            <Grid px={5} pt={6}>
              <MDBTypography
                color="white"
                fontWeight="medium"
                fontSize="4xl"
                lineHeightSize="5xl"
                pb={1}
              >
                Reset Password
              </MDBTypography>
              <MDBTypography
                color="grayScale"
                fontWeight="regular"
                fontSize="md"
                lineHeightSize="2xl"
              >
                Enter your email and we will send you instructions on how to
                reset your password.
              </MDBTypography>
            </Grid>
            <Divider />
            <Grid mt={1}>
              <form
                onSubmit={formik.handleSubmit}
                noValidate
                autoComplete="off"
                style={{
                  paddingTop: "12px",
                  paddingBottom: "32px",
                  paddingLeft: "40px",
                  paddingRight: "40px",
                }}
              >
                <Grid mb={2}>
                  <InputLabel>
                    <MDBTypography
                      fontWeight="regular"
                      fontSize="xs"
                      lineHeight="md"
                    >
                      EMAIL
                    </MDBTypography>
                  </InputLabel>
                  <MDBInput
                    type="text"
                    placeholder="Enter your email"
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                {isSendResetMail ? (
                  <Grid container justifyContent="center">
                    <MDBTypography
                      color="white"
                      fontWeight="medium"
                      fontSize="md"
                      lineHeightSize="2xl"
                      sx={{ mt: 1, maxWidth: "265px", textAlign: "center" }}
                    >
                      
                      An email with instructions on resetting your password has been sent.
                    </MDBTypography>
                  </Grid>
                ) : (
                  <Grid sx={{ my: 2 }}>
                    <p
                      style={{
                        color: "#d50000",
                        fontSize: 12,
                        fontWeight: "14",
                        paddingBottom: "4px",
                      }}
                    >
                      {errorMsg}
                    </p>
                    <MDBButton
                      size="inherit"
                      variant="contained"
                      color="black"
                      bgColor="light_green"
                      fontWeight="medium"
                      fontSize="md"
                      borderSize="md"
                      type="submit"
                      //disabled={isFormSubmit ? true : false}
                      isLoading={isFormSubmit}
                    >
                      Send Reset Instructions
                    </MDBButton>
                  </Grid>
                )}
                <Grid>
                  <MDBTypography
                    component={Link}
                    to="/login"
                    color="light_green"
                    fontWeight="regular"
                    fontSize="md"
                    lineHeightSize="2xl"
                    mt={1}
                  >
                    Back to Log in
                  </MDBTypography>
                </Grid>
              </form>
            </Grid>
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
