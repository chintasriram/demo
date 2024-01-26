import React from "react";
import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import BiaLogo from 'assets/images/icons/svg/large/BiaLogoWithText8648.svg'
import MDBTypography from "components/MDBTypography";
import { Link } from "react-router-dom";

function BiaLayout({ children }) {
  return (
    <MDBox width="auto">
      <Grid container pl={3} pt={3} position="fixed"  sx={{backgroundColor: "#111315", zIndex: 11}}>
        <Grid component={Link} to="/">
          <MDBTypography component="img" src={BiaLogo} />
        </Grid>
      </Grid> 
      <MDBox width="100%">{children}</MDBox>
    </MDBox>
  );
}

export default BiaLayout;
