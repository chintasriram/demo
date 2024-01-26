import React from "react";
import MDBButton from "components/MDBButton";
import MDBCard from "components/MDBCard";
import MDBTypography from "components/MDBTypography";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

export default function Disconnect(props) {
  const providers = {
    instagram: "Instagram",
    youtube: "Youtube",
    tiktok: "TikTok",
  };
  const errorMessages = {
    NO_INSTAGRAM: (
      <Grid container justifyContent="center">
        <MDBTypography
          color="grayScale"
          fontWeight="regular"
          fontSize="md"
          lineHeightSize="2xl"
          maxWidth="460px"
          pt={1}
          pb={3}
        >
          The Instagram account is not connected to the Facebook page. Please
          follow the steps in the following link.
        </MDBTypography>
        <a
          href="https://help.instagram.com/399237934150902/?helpref=uf_share"
          target="_blank"
        >
            <MDBButton
              variant="text"
              bgColor="black"
              color="grayScale"
              fontWeight="medium"
              fontSize="sm"
              lineHeight="xxl"
              sx={{ textDecoration: "underline" }}
            >
              How to connect Instagram to Facebook
            </MDBButton>
        </a> 
      </Grid>
    ),
    TOKEN_EXPIRE: "Please reconnect.",
    INTERNAL_ERROR: "Please try again!",
    NO_CHANNEL: "No Youtube channel was found on your account.",
  };
  return (
    <MDBCard
      borderRadius="xl"
      bgcolor="light"
      sx={{
        border: "1px solid #3B3D40",
        boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.48)",
      }}
    >
      {props?.isMediakit !== true && (
        <Grid sx={{ py: 4, px: 5, textAlign: "center" }} key={1}>
          <MDBTypography
            color="white"
            fontWeight="medium"
            fontSize="2xl"
            lineHeightSize="4xl"
            pb={1}
          >
            {props?.data?.heading}
            {providers[props?.data?.provider]}
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
            {errorMessages[props?.data?.message] ?? "Please try again!"}
          </MDBTypography>
          <MDBButton
            size="medium"
            variant="contained"
            color="black"
            bgColor="light_green"
            fontWeight="medium"
            fontSize="md"
            borderSize="md"
            onClick={props?.close}
          >
            Done
          </MDBButton>
        </Grid>
      )}
      {props?.isMediakit === true && (
        <Grid sx={{ py: 4, px: 5, textAlign: "center" }} key={1}>
          <MDBTypography
            color="grayScale"
            fontWeight="medium"
            fontSize="md"
            lineHeightSize="xxl"
            px={3}
          >
            No Media Kit Yet
          </MDBTypography>
          <Grid container alignItems="center" justifyContent="center">
            <MDBTypography
              color="grayScale"
              fontWeight="medium"
              fontSize="md"
              lineHeightSize="xxl"
              pl={3}
            >
              To Create your Media Kit, go to the
            </MDBTypography>
            <Grid component={Link} to="/c/media-kit">
              <MDBButton
                size="medium"
                variant="text"
                color="light_green"
                bgColor="transparent"
                fontWeight="medium"
                fontSize="md"
                lineHeight="2xxl"
                sx={{ py: 0, textDecoration: "underline" }}
              >
                Media Kit
              </MDBButton>
            </Grid>
            <MDBTypography
              color="grayScale"
              fontWeight="medium"
              fontSize="md"
              lineHeightSize="xxl"
            >
              section
            </MDBTypography>
          </Grid>
        </Grid>
      )}
    </MDBCard>
  );
}
