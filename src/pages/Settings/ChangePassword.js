import React, { useState } from "react";
import { useFormik } from "formik";
import { Divider, Grid } from "@mui/material";
import MDBCard from "components/MDBCard";
import MDBInput from "components/MDBInput";
import MDBTypography from "components/MDBTypography";
import MDBButton from "components/MDBButton";
import * as yup from "yup";
import userService from "service/UserService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import toastIcon from "assets/images/icons/svg/medium/ToastSuccess.svg";
import UserService from "service/UserService";

const validationSchema = yup.object({
  newPassword: yup
    .string()
    .min(6, "Password must be at least 6 characters.")
    .matches(".*\\S+.*", "Password cannot contain white space")
    .trim("Password cannot contain white space")
    .required("New Password is required"),

  confirmPassword: yup
    .string()
    .required("Confirm new password is required")
    .when("newPassword", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf(
          [yup.ref("newPassword")],
          "Confirm new password should match with new password"
        )
        .required("Confirm new password is required"),
    }),
});

export default function ChangePassword() {
  const history = useNavigate();
  toast.configure();
  const [isFormSubmit, setIsFormSubmit] = useState(false);

  // Formik handlers
  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      //get user details
      let user = UserService.getUserFromSession();
      if(user !== null && user){
        setIsFormSubmit(true);
        let changePasswordReq = {
          userId: user?.id,
          password: values.confirmPassword?.trim(),
        };
        // Change paaword
        userService.ChangePassword(
          changePasswordReq,
          successCallback,
          errorcallback
        );
      } 
    },
  });

  // Success callback
  function successCallback(data) {
    setIsFormSubmit(false);
    if (data && data?.success && data?.success === true) {
      toast.success("Password updated successfully", {
        position: toast.POSITION.TOP_LEFT,
        hideProgressBar: true,
        icon: <img src={toastIcon} />,
      });

      // Redirect to Login page
      window.localStorage.removeItem('user');
      history("/c/login");
    } else {
      toast.error("Please try again", {
        position: toast.POSITION.TOP_LEFT,
        hideProgressBar: true,
      });
    }
  }

  // error callback
  function errorcallback(error) {
    setIsFormSubmit(false);
    toast.error("Please try again", {
      position: toast.POSITION.TOP_LEFT,
      hideProgressBar: true,
    });
  }

  return (
    <MDBCard
      borderRadius="xl"
      bgcolor="cardBg"
      sx={{ p: 0, m: 0, width: "inherit" }}
    >
      <form onSubmit={formik.handleSubmit}>
        {/* Card header */}
        <Grid
        // display={{
        //   xs: "none",
        //   sm: "none",
        //   md: "block",
        //   lg: "block",
        //   xl: "block",
        //   xxl: "block",
        //   xxel: "block",
        //   el: "block",
        // }}
        >
          <Grid container sx={{ pt: 3, px: 2 }} justifyContent="space-between">
            <Grid item>
              <MDBTypography
                color="white"
                fontWeight="medium"
                fontSize="xl"
                lineHeightSize="2xxl"
                px={1.5}
              >
                Change Password
              </MDBTypography>
            </Grid>
          </Grid>

          {/* Card Divider */}
          <Divider />

          {/* Card Body */}

          <Grid my={2} sx={{ pt: 1, px: 6 }}>
            <MDBTypography
              color="white"
              fontWeight="regular"
              fontSize="xs"
              lineHeightSize="md"
              textTransform="uppercase"
              pb={1}
            >
              New Password
            </MDBTypography>
            <MDBInput
              type="password"
              id="newPassword"
              name="newPassword"
              placeholder="Enter new password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.newPassword && Boolean(formik.errors.newPassword)
              }
              helperText={
                formik.touched.newPassword && formik.errors.newPassword
              }
            />
          </Grid>

          <Grid sx={{ pt: 1, px: 6, pb: 4 }}>
            <MDBTypography
              color="white"
              fontWeight="regular"
              fontSize="xs"
              lineHeightSize="md"
              textTransform="uppercase"
              pb={1}
            >
              Confirm New Password
            </MDBTypography>
            <MDBInput
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm new password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />
          </Grid>

          <Grid mb={2} sx={{ pt: 1, px: 6, pb: 5 }}>
            <MDBButton
              size="inherit"
              variant="contained"
              color="black"
              bgColor="light_green"
              fontWeight="medium"
              fontSize="md"
              borderSize="md"
              type="submit"
              disabled={isFormSubmit ? true : false}
              isLoading={isFormSubmit}
            >
              Update
            </MDBButton>
          </Grid>
        </Grid>
      </form>
    </MDBCard>
  );
}
