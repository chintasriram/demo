import MDBox from "components/MDBox";

import MDButton from "components/MDButton";
import CallMadeIcon from "@mui/icons-material/CallMade";
import DefaultNavbarLink from "appcomponents/Navbars/DefaultNavbar/DefaultNavbarLink";
import CallMade from "@mui/icons-material/CallMade";
import BaseLayout from "layouts/baseLayout";
import FirstLayout from "layouts/FirstLayout";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import FontAwesome from "react-fontawesome";
import InstagramIcon from "@mui/icons-material/Instagram";
// Material Dashboard  React components

import { Tab, Tabs } from "@material-ui/core";
import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MDTypography from "components/MDTypography";
import Stack from "@mui/material/Stack";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import toastIcon from 'assets/images/icons/svg/medium/ToastSuccess.svg'

//Update details
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import MDInput from "components/MDInput";
import httpService from "service/HttpService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function WelcomePage({}) {
  const history = useNavigate();

  // On success handler
  const onSuccessHandler = (response) => {
    console.log("On success- ", response);
  };

  // On Failure handler
  const onFailureHandler = (err) => {
    console.log("Error in instagram callback- ", err);
  };
  //Response Instaram
  const responseInstagram = (response) => {
    console.warn("Response :", response);
  };
  //Default values for Fields
  const defaultValue = {
    fullName: "",
    dateOfBirth: "",
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Enter full name"),
    dateOfBirth: Yup.string().required("Enter date of birth"),
    email: Yup.string().required("Enter must be valid").email(),
    password: Yup.string().required("Enter a password"),
  });
  const handleSubmit = (values) => {
    let request = {
      fullName: values.fullName,
      dateOfBirth: values.dateOfBirth,
      password: values.password,
      email: values.email,
    };

    let data = JSON.stringify(request);
    httpService
      .createCreator(request)
      .then((result) => {
        // if(result !== undefined && result.data !== undefined && result.data.success !== undefined && result.data.success === true){
        if (result.data.success === true) {
          // already exist
          toast.success("Registered successfully", {
            position: toast.POSITION.TOP_RIGHT,
            hideProgressBar: true,
            autoClose: 3000,
            icon:<img src={toastIcon}/>
          });
          // setShow(!show);
          history("/c/home");
        } else {
          toast.error("Creator is already exist", {
            position: toast.POSITION.TOP_RIGHT,
            hideProgressBar: true,
            autoClose: 3000,
          });
        }
      })

      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <FirstLayout>
      {/* Edit fields Formik */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs></Grid>
          <Grid item xs={6}>
            <MDBox>
              <Formik
                initialValues={defaultValue}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form autoComplete="off">
                  {/* Full name Field */}
                  <Stack direction="row">
                    <MDTypography
                      ml={10}
                      color="white"
                      fontWeight="bold"
                      fontSize="medium"
                    >
                      Full name
                    </MDTypography>
                    <MDBox px={13}>
                      <Field
                        type="text"
                        name="fullName"
                        placeholder="Full name"
                      >
                        {(props) => (
                          <>
                            <MDInput
                              variant="outlined"
                              placeholder="Full name"
                              {...props.field}
                            />
                          </>
                        )}
                      </Field>
                      <Box mt={0.5}>
                        <p
                          style={{
                            color: "#d50000",
                            fontSize: 12,
                            fontWeight: "11",
                          }}
                        >
                          <ErrorMessage name="fullName" />
                        </p>
                      </Box>
                    </MDBox>
                  </Stack>
                  {/* Date of birrth  Field*/}
                  <Stack direction="row" mt={4}>
                    <MDTypography
                      ml={10}
                      color="white"
                      fontWeight="bold"
                      fontSize="medium"
                    >
                      Date of birth
                    </MDTypography>
                    <MDBox px={10}>
                      <Field
                        type="text"
                        name="dateOfBirth"
                        placeholder=" Date of birth"
                      >
                        {(props) => (
                          <>
                            <MDInput
                              variant="outlined"
                              type="date"
                              {...props.field}
                            />
                          </>
                        )}
                      </Field>
                      <Box mt={0.5}>
                        <p
                          style={{
                            color: "#d50000",
                            fontSize: 12,
                            fontWeight: "11",
                          }}
                        >
                          <ErrorMessage name="dateOfBirth" />
                        </p>
                      </Box>
                    </MDBox>
                  </Stack>
                  {/* Email Field */}
                  <Stack direction="row" mt={4}>
                    <MDTypography
                      ml={10}
                      color="white"
                      fontWeight="bold"
                      fontSize="medium"
                    >
                      Email
                    </MDTypography>
                    <MDBox px={16}>
                      <Field type="text" name="email" placeholder="Email">
                        {(props) => (
                          <>
                            <MDInput
                              variant="outlined"
                              placeholder="Email"
                              {...props.field}
                            />
                          </>
                        )}
                      </Field>
                      <Box mt={0.5}>
                        <p
                          style={{
                            color: "#d50000",
                            fontSize: 12,
                            fontWeight: "11",
                          }}
                        >
                          <ErrorMessage name="email" />
                        </p>
                      </Box>
                    </MDBox>
                  </Stack>
                  {/* Password */}
                  <Stack direction="row" mt={4}>
                    <MDTypography
                      ml={10}
                      color="white"
                      fontWeight="bold"
                      fontSize="medium"
                    >
                      Password
                    </MDTypography>
                    <MDBox px={12}>
                      <Field
                        type="password"
                        name="password"
                        placeholder="Password"
                      >
                        {(props) => (
                          <>
                            <MDInput
                              type="password"
                              variant="outlined"
                              placeholder="Email"
                              {...props.field}
                            />
                          </>
                        )}
                      </Field>
                      <Box mt={0.5}>
                        <p
                          style={{
                            color: "#d50000",
                            fontSize: 12,
                            fontWeight: "11",
                          }}
                        >
                          <ErrorMessage name="password" />
                        </p>
                      </Box>
                    </MDBox>
                  </Stack>
                  {/* submit button */}
                  <MDBox mt={3} ml={60}>
                    <MDButton
                      type="submmit"
                      size="large"
                      variant="gradient"
                      color="bbbg"
                      textColor="#111315"
                      sx={{ width: "200px", textTransform: "capitalize" }}
                    >
                      Update
                    </MDButton>
                  </MDBox>
                </Form>
              </Formik>
            </MDBox>

            <MDBox mt={4}>
              <InstagramIcon />
              <span>Inatagram</span>
            </MDBox>
            <MDBox mt={4}></MDBox>
          </Grid>
          <Grid item xs></Grid>
        </Grid>
      </Box>
    </FirstLayout>
  );
}
export default WelcomePage;
