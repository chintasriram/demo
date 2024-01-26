import { Grid } from '@mui/material';
import React from 'react'
import ActiveLayer from 'assets/images/ImagesSvg/paymentsLayer.svg'
import MDBTypography from 'components/MDBTypography';

function Earnings(props) {
  return (
    <Grid container
    sx={{
      height: "400px",
      borderRadius: "12px", background: `url(${ActiveLayer})`, backgroundRepeat: "no-repeat", backgroundSize: "cover"
    }}
  >
    <Grid container justifyContent="center" alignContent="center"
      sx={{
        background: `rgba(17, 19, 21, 0.8)`, width: "inherit", backdropFilter: "blur(3px)", borderRadius:"12px", border: "1px solid #3B3D40"
      }}
    >
      <MDBTypography
        color="grayScale"
        fontWeight="medium"
        fontSize="md"
        lineHeightSize="xxl"
        px={3}

      >
       Coming Soon
      </MDBTypography>
    </Grid>
  </Grid>
  )
}

export default Earnings;