import React from 'react'
import Grid from '@mui/material/Grid'
import MDTypography from 'components/MDTypography';
import MDBButton from 'components/MDBButton';
import MDBox from 'components/MDBox';
import MDBTypography from 'components/MDBTypography';

// {sending props}
export default function OpenCampaigns({smIcon, heading, subHeading}) {
  return (
    <div>
      {/* import grid from mui */}
      <Grid container  >
        {/* for icon */}
        <Grid item mt={2} mr={1} mb={2} ml={3} >
          {/* import MDbox from components */}
          <MDBox   
            p={1.5}sx= {{width:"48px", height :"48px"}}
            style = {{display: "inline-block"}}
            bgColor ="openCampInstabg"
            borderRadius ="12px"
          >
          {/* icon parameter */}
            {smIcon}
          </MDBox>
        </Grid>

        {/* for typography */}
        <Grid item  mt={2} mr={0.9} mb={2} ml={1} sx= {{width:"160px"}}>
          {/* imported MDTypography from components */}
            <MDBTypography
              
            > 
          {/* heading parameter */}
              {heading}
            </MDBTypography>
            <MDTypography
              color= 'openCampGreenColor'
              fontSize = 'md'
            >
          {/* subheading parameter */}
              {subHeading} 
            </MDTypography>         
        </Grid> 

        {/* for button */}
        <Grid item  mt={2.7} mr={3.2} mb={2.7} ml={0.9}  >
          {/* imported MDBButton from components */}
          <MDBButton
            size = "small"
            variant= "contained"
            color= "white"
            bgColor= "smoke_light"
            // circular= {false}
            // iconOnly = {false}
            fontWeight = "medium"
            fontSize = "md"
            borderSize = "md"
          >
            Apply
          </MDBButton>
        </Grid> 
      </Grid>   

  </div>
  )
}
