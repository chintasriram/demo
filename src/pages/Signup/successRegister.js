import React, { useState, useEffect } from "react";
import MDBCard from "components/MDBCard";
import MDBTypography from "components/MDBTypography";
import { Grid } from "@mui/material";
import success from "assets/images/success.png";
import { useLocation } from "react-router";

export default function SuccessRegister() {
  const { state } = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (state?.userData && state?.userData !== null && state?.userData !== "") {
      //Set user
      setUser(state.userData);
    }
  }, [state?.userData]);

  return (
    <Grid
      container
      alignContent="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid sx={{ p: 0, width: "550px" }}>
        <MDBCard
          borderRadius="xl"
          bgcolor="light"
          sx={{ boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.48)" }}
        >
          <Grid sx={{ pt: 9.5, pb: 7.3, px: 4.875, textAlign: "center" }}>
            <img src={success} />
            <MDBTypography
              color="white"
              fontWeight="medium"
              fontSize="2xl"
              lineHeightSize="4xl"
            >
              Hi {user?.name}, registration completed successfully
            </MDBTypography>

            <MDBTypography
              color="grayScale"
              fontWeight="regular"
              fontSize="md"
              lineHeightSize="2xl"
              maxWidth="460px"
              pt={1}
              pb={3}
            >
              Thanks for joining bia! To get started, please confirm your email
              address at {user?.email}
            </MDBTypography>
          </Grid>
        </MDBCard>
      </Grid>
    </Grid>
  );
}
