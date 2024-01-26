import { Divider, Grid } from '@mui/material'
import React from 'react'
import MDBCard from './MDBCard'
import MDBTypography from './MDBTypography'

export default function Earnings(props) {
  return (
    <>
        <MDBCard sx={{m:0, p:0, py: 4, px: 2, width: "inherit" }}>
            <Grid container pb={4}>
                <MDBTypography
                    color="white"
                    fontWeight = "medium"
                    fontSize = "2xl"
                    lineHeightSize = "2xxl"
                >
                    Earnings
                </MDBTypography>
            </Grid>
            <Grid >
                <MDBTypography 
                    color="white"
                    fontWeight = "regular"
                    fontSize = "sm"
                    lineHeightSize = "xxl"
                    opacity = {0.8}
                    pb={1}
                >
                    2022 Earnings
                </MDBTypography>
                <MDBTypography 
                    color="light_green"
                    fontWeight = "medium"
                    fontSize = "2xl"
                    lineHeightSize = "4xl"
                >
                    $0
                </MDBTypography>
                <Divider sx={{height: "2px", width: "inherit"}}/>
            </Grid>
            <Grid>
                <MDBTypography 
                    color="white"
                    fontWeight = "medium"
                    fontSize = "md"
                    lineHeightSize = "2xl"
                    pb={1}
                >
                    Upcoming Payments
                </MDBTypography>
                <MDBTypography 
                    color="grayScale"
                    fontWeight = "regular"
                    fontSize = "md"
                    lineHeightSize = "2xl"
                >
                    No upcoming payments
                </MDBTypography>
            </Grid>
        </MDBCard>
    </>
  )
}
