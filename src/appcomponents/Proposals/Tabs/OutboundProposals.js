import { Grid } from '@mui/material';
import React from 'react'
import MDBTypography from '../../../components/MDBTypography';
import ActiveLayer from 'assets/images/ImagesSvg/proposalItem.png'

function OutboundProposals(props) {
  return (
    // <Grid 
    //   container justifyContent="center" alignContent="center" 
    //   sx={{height: "380px", borderRadius: "0 0 12px 12px", border: props?.isHome === true ? "none" : "1px solid #3B3D40", 
    //   background: `url(${ActiveLayer})`, backgroundRepeat:"no-repeat", backgroundSize:"cover"}}
    // >
    //   <Grid item>
    //     <MDBTypography
    //       color= "grayScale"
    //       fontWeight= "medium"
    //       fontSize= "md"
    //       lineHeightSize= "xxl" 
    //       px={3}
    //     >
    //       {/* No Outbound Proposals Yet */}
    //       Coming Soon
    //     </MDBTypography>
    //   </Grid>
    // </Grid>
    <Grid container
      sx={{
        height: "380px",
        borderRadius: "12px", background: `url(${ActiveLayer})`, backgroundRepeat: "no-repeat", backgroundSize: "cover"
      }}
    >
      <Grid container justifyContent="center" alignContent="center"
        sx={{
          background: `rgba(17, 19, 21, 0.8)`, width: "inherit", backdropFilter: "blur(4px)",borderRadius: props?.isHome === true ? "0 0 12px 12px" : "12px", border: props?.isHome === true ? "none" : "1px solid #3B3D40"
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

export default OutboundProposals;