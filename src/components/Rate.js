
import React from 'react'
import { Grid } from '@mui/material'
import MDTypography from 'components/MDTypography'
import { styled } from "@mui/material/styles";
import StarIcon from "@mui/icons-material/Star";
import Rating from "@mui/material/Rating";

export default function Rate() {
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const labels = {
    0.5: "0.5",
    1: "1.0",
    1.5: "1.5",
    2: "2.0",
    2.5: "2.5",
    3: "3.0",
    3.5: "3.5",
    4: "4.0",
    4.5: "4.5",
    5: "5.0"
  };
  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }
  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#ffffff"
    },
    "& .MuiRating-iconHover": {
      color: "#BBDCD2"
    }
  });
  return (
    <Grid container >
      {/* Rating */}
      <StyledRating
        name="simple-controlled"
        value={value}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(value);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <MDTypography fontSize="sm" sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</MDTypography>
      )}
    </Grid>
  )
}  
