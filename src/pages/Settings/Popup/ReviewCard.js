import React from "react";
import { Divider, Grid } from "@mui/material";
import MDBTypography from "components/MDBTypography";
import MDTypography from "components/MDTypography";
import Oura from "assets/images/icons/svg/medium/OuraIcon.svg";
import Youtube from "assets/images/icons/svg/medium/Youtube1818.svg";

import RateComponents from "./RateComponent";

export default function Reviews(props) {
  return (
    <Grid sx={{ px: 0 }}>
      <Divider />
      <Grid sx={{ px: 2 }}>
        <Grid container sx={{width: "100%"}}>
          <Grid item pl={2} xs={12} md={2}>
            <img src={Oura} />
          </Grid>
          <Grid item px={2} xs={12} md={10}>
            <Grid container justifyContent="space-between">
              <Grid item>
                <MDTypography color="light_blue">
                  {props?.reviewData.name}
                </MDTypography>
                <MDBTypography
                  fontSize="md"
                  fontWeight="medium"
                  lineHeightSize="xxl"
                >
                  Create a branded Youtube short
                </MDBTypography>
                <Grid sx={{ display: "flex" }}>
                  <MDBTypography
                    fontWeight="regular"
                    fontSize="sm"
                    lineHeightSize="xxl"
                    color="grayScale"
                  >
                    Type:
                  </MDBTypography>
                  <MDBTypography
                    fontWeight="regular"
                    fontSize="sm"
                    lineHeightSize="xxl"
                    color="grayScale"
                    px={1}
                  >
                    {props?.reviewData.type}
                  </MDBTypography>
                  <MDBTypography
                    fontWeight="regular"
                    fontSize="sm"
                    lineHeightSize="xxl"
                    px={1}
                    color="grayScale"
                  >
                    Platforms:
                  </MDBTypography>
                  <img src={Youtube} />
                </Grid>
              </Grid>
              <Grid item>
                <MDBTypography
                  fontWeight="light"
                  fontSize="sm"
                  lineHeightSize="2xl"
                  maxWidth="420px"
                  color="grayScale"
                >
                  {props?.reviewData.startDate}-{props?.reviewData.endDate}
                </MDBTypography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid>
          <RateComponents
            discription={props?.reviewData?.ratingComments}
            count={props?.reviewData.rating}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
