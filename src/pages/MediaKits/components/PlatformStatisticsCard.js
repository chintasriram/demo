import MDBTypography from 'components/MDBTypography'
import React from 'react'
import { Grid } from '@mui/material'
import MDBCard from 'components/MDBCard'


export default function PlatformStatisticsCard(props) {

  return (
    <div>
      <Grid container>
          <Grid item>
            <MDBCard
              bgcolor= "black"
              sx={{m:0}}
            >
              <MDBTypography
                component="img"
                src={props.icon}
                mb={2} mr={32.5}
              />
              <MDBTypography
                color = "grey400"
                fontWeight = "regular"
                fontSize = "sm"
                lineHeightSize = "xxl"
              >
                {props.metrics}
              </MDBTypography>

              <Grid container>
                <MDBTypography
                  color = "white"
                  fontWeight = "medium"
                  fontSize = "2xl"
                  lineHeightSize = "4xl"
                  mr={2} mb={2}
                >
                  {props.value}
                </MDBTypography>
                <MDBTypography
                  component="img"
                  src={props.graph}
                  height="14px" 
                  mt={0.5} 
                />
              </Grid>
              <Grid container>
                <MDBTypography
                  component="img"
                  src={props.arrow}
                  height="12px" 
                  mt={0.5} mr={0.125}
                >

                </MDBTypography>
                <MDBTypography
                  color = "green"
                  fontWeight = "regular"
                  fontSize = "sm"
                  lineHeightSize = "xxl"
                >
                  {props.subValue}
                </MDBTypography>
              </Grid>
            </MDBCard>
          </Grid>
      </Grid>
    </div>
  )
}
