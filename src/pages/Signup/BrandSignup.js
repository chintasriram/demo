import React,{ useState} from "react";
import MDBButton from "components/MDBButton";
import MDBTypography from "components/MDBTypography";
import { Grid, InputLabel } from "@mui/material";
import DividerWithText from "components/DividerWithText";
import MDBInput from "components/MDBInput";
import SocialLogin from "components/SocialLogin";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import UserService from "service/UserService";

//Validations
const validationSchema = yup.object({
  brandName: yup
    .string("Enter Brand Name")
    .min(4, "Brand name must be at least 4 characters")
    .max(20, "Brand name must have upto 20 characters")
    .matches(/^[a-zA-Z]/, "First letter should be Alphabet")
    .required("Brand name is required"),
  name: yup
    .string("Enter Full name")
    .min(4, "Full name must be at least 4 characters")
    .matches(/^[a-zA-Z]/, "First letter should be Alphabet")
    .required("Full name is required"),
  email: yup.string("Enter your email").required("Email is required"),
  password: yup
    .string("Enter your password")
    .matches(".*\\S+.*", "Password cannot contain white space")
    .min(6, "Your password must be at least 6 characters.")
    .required("Password is required"),
});

export default function BrandSignup() {
  // configured the Toast
  toast.configure();
  //For Navigation
  const history = useNavigate();
  const [isBusinessEmailValid, setisBusinessEmailValid] = useState(true);
  const [isFormSubmit, setIsFormSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const formik = useFormik({
    initialValues: {
      brandName: "",
      name: "",
      email: "",
      password: "",
      referralCode: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setErrorMessage("");

      // Email Validation
      let isEmailValid = validateBusinessEmail(values.email);
      if (isEmailValid === true) {
        setisBusinessEmailValid(true);
        setIsFormSubmit(true);
        let saveUserReq = {
          brandName: values.brandName.trim(),
          name: values.name.trim(),
          password: values.password,
          email: values.email.trim(),
          type: "Brand",
          referralCode: ""
        }
        UserService.saveUser(saveUserReq,saveUserSuccessCallback,saveUserErrorCallback);
      } else {
        //Error Message
        setisBusinessEmailValid(false);
      }
    },
  });

  //Business Email validation
  function validateBusinessEmail(email) {
    //Regular Expression for email validation format
    let businessEmailRgx =
      /^(?!.+@(gmail|google|yahoo|outlook|hotmail|msn)\..+)(.+@.+\..+)$/;
    if (email !== undefined && email !== "") {
      let isValid = businessEmailRgx.test(email);
      return isValid;
    } else {
      return false;
    }
  }

  // save user success callback
  const saveUserSuccessCallback = (data) => {
    setIsFormSubmit(false);
    if (data && data?.success !== undefined && data?.success === true) {
      //Redirect to success register popup
      history("/register/success",{state:{userData: data.data}});
    } else {
      setErrorMessage(data.message);
    }
  };

  // save user error callback
  const saveUserErrorCallback = (error) => {
    setIsFormSubmit(false);
    setErrorMessage("Failed. Please try again");
  };

  return (
    <Grid>
      <SocialLogin
        type="BRAND"
        google="Sign Up with Google"
        apple="Sign Up with Apple"
        facebook="Sign Up with Facebook"
      />
      <DividerWithText>or</DividerWithText>
      <form onSubmit={formik.handleSubmit}>
        <Grid
          component="form"
          Validate
          autoComplete="off"
          sx={{ pt: 1 }}
        >
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
                Brand name
              </MDBTypography>
            </InputLabel>
            <MDBInput
              type="text"
              placeholder="Enter your brand name"
              id="brandName"
              name="brandName"
              value={formik.values.brandName}
              onChange={formik.handleChange}
              error={
                formik.touched.brandName && Boolean(formik.errors.brandName)
              }
              helperText={formik.touched.brandName && formik.errors.brandName}
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
                Full Name
              </MDBTypography>
            </InputLabel>
            <MDBInput
              type="text"
              placeholder="Enter your full name"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
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
                email address
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

            {isBusinessEmailValid === false && formik.values.email !== "" && (
              <MDBTypography
                style={{ color: "#ff4d4d", fontSize: 12, fontWeight: "14" }}
                pt={1}
              >
                Email should be business email
              </MDBTypography>
            )}
          </Grid>

          <Grid mb={2}>
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
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          
        </Grid>

        <Grid sx={{ textAlign: "center", mx: "auto", my: 4 }}>
          <MDBTypography
            color="grayScale"
            fontWeight="regular"
            fontSize="xs"
            lineHeightSize="md"
          >
            By creating an account you agree to bia’s
          </MDBTypography>
          <Grid component={Link} to="/terms">
            <MDBButton
              variant="text"
              color="white"
              bgColor="black"
              fontWeight="regular"
              fontSize="xs"
              sx={{ textDecoration: "underline" }}
            >
              Terms & Conditions
            </MDBButton>
          </Grid>
        </Grid>
        <Grid>
          {errorMessage ? (
            <p style={{ color: "#d50000", fontSize: 12, fontWeight: "14" }}>
              {errorMessage}
            </p>
          ) : (
            <></>
          )}
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
          //disabled={isFormSubmit ? true : false}
          isLoading={isFormSubmit}
        >
          Create Account
        </MDBButton>
      </form>
      <MDBTypography
        color="grey400"
        fontWeight="regular"
        fontSize="xs"
        lineHeightSize="md"
        sx={{ textAlign: "center", my: 3 }}
      >
        or if you have an account
      </MDBTypography>
      <MDBButton
        component={Link}
        to="/login"
        size="inherit"
        variant="outlined"
        color=""
        bgColor=""
        fontWeight="medium"
        fontSize="md"
        borderSize="smd"
      >
        Log in
      </MDBButton>
      <MDBButton
        component={Link}
        to="/waitlist"
        size="inherit"
        variant="outlined"
        color=""
        bgColor=""
        fontWeight="medium"
        fontSize="md"
        borderSize="smd"
        sx={{ my: 3 }}
      >
        Back
      </MDBButton>
    </Grid>
  );
}
