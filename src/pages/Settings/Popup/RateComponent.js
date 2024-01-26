import React from "react";
import { Grid } from "@mui/material";
import MDBCard from "components/MDBCard";
import MDBTypography from "components/MDBTypography";
// import Rating from "assets/images/icons/svg/medium/Star.svg";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";

export default function RateComponents(props) {
  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#ffffff",
    },
    "& .MuiRating-iconHover": {
      color: "#BBDCD2",
    },
  });

  return (
    <MDBCard borderRadius="xl" bgcolor="cardBg" sx={{ p: 2, width: "inherit" }}>
      <Grid container>
        {/* Rating */}
        <StyledRating
          name="simple-controlled"
          value={props?.count}
        />
      </Grid>
      <MDBTypography
        color="grayScale"
        fontWeight="regular"
        fontSize="sm"
        lineHeightSize="xxl"
        maxWidth="420px"
      >
        {props?.discription}
      </MDBTypography>
    </MDBCard>
  );
}
