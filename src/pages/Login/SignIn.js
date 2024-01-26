import { Divider, Grid, InputLabel } from "@mui/material";
import DividerWithText from "components/DividerWithText";
import MDBButton from "components/MDBButton";
import MDBCard from "components/MDBCard";
import MDBInput from "components/MDBInput";
import MDBTypography from "components/MDBTypography";
import SocialLogin from "components/SocialLogin";
import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import BiaLayout from "layouts/biaLayout";
import userService from "service/UserService";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Please enter valid email")
    .required("Please enter your email"),

  password: yup
    .string("Enter your password")
    .required("Please enter your password"),
});

export default function SignIn() {
  const history = useNavigate();
  toast.configure();

  const [errorMessage, setErrorMessage] = useState(false);
  const [isFormSubmit, setIsFormSubmit] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setIsFormSubmit(true);
      setErrorMessage("");
      let loginReq = {
        email: values.email.trim(),
        password: values.password.trim(),
      };
      // Login
      userService.login(loginReq, loginSuccessCallback, loginErrorcallback);
    },
  });

  // Login success callback
  function loginSuccessCallback(data) {
    setIsFormSubmit(false);
    if (data && data?.success && data?.success === true) {
      //Check user is active
      if (data?.data?.active === true) {
        // Redirect to home
        userService.updateUserSessionWithUser(data.data);
        history("/c/home");
      } else {
        // Redirect to user onboard page
        history("/register/onboard?token=" + data.data.uuId);
      }
    } else {
      setErrorMessage(data.message);
    }
  }

  //Login  error callback
  function loginErrorcallback(error) {
    setIsFormSubmit(false);
    setErrorMessage("Login failed. Please try again");
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
          <MDBCard sx={{ p: 0, m: 0, mb: 2, width: "inherit" }} >
            <Grid px={5} pt={6}>
              <MDBTypography
                color="white"
                fontWeight="medium"
                fontSize="4xl"
                lineHeightSize="5xl"
              >
                Sign In
              </MDBTypography>
            </Grid>
            <Divider />
            <Grid px={5.5}>
              <SocialLogin
                google="Continue with Google"
                apple="Continue with Apple"
                facebook="Continue with Facebook"
              />
              <DividerWithText>or</DividerWithText>
            </Grid>
            <form
              onSubmit={formik.handleSubmit}
            >
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
                      Email
                    </MDBTypography>
                  </InputLabel>
                  <MDBInput
                    type="text"
                    placeholder="Enter your email"
                    name="email"
                    autoComplete="off"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
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
                      Password
                    </MDBTypography>
                  </InputLabel>
                  <MDBInput
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                  />
                </Grid>
                <Grid py={1}>
                  {errorMessage ?
                    <p style={{ color: '#d50000', fontSize: 12, fontWeight: '14' }}>
                      {errorMessage}
                    </p>
                    : <></>}
                </Grid>
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
                 //disabled={isFormSubmit ? true : false}
                  isLoading={isFormSubmit}
                >
                  
                Log in            
                </MDBButton>
                <Grid>
                  <Grid container pb={2}>
                    <MDBTypography
                      component={Link}
                      to="/reset-password"
                      color="light_green"
                      fontWeight="regular"
                      fontSize="md"
                      lineHeightSize="2xl"
                    >
                      Reset Password
                    </MDBTypography>
                  </Grid>
                  <Grid container>
                    <MDBTypography
                      component={Link}
                      to="/waitlist"
                      color="light_green"
                      fontWeight="regular"
                      fontSize="md"
                      lineHeightSize="2xl"
                    >
                      Don’t have an account?
                    </MDBTypography>
                  </Grid>
                </Grid>
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
