import { Grid } from '@mui/material'
import MDBCard from 'components/MDBCard'
import MDBTypography from 'components/MDBTypography'
import BiaLayout from 'layouts/biaLayout'
import React from 'react'
import BasicTabs from './BasicTabs'

export default function Signup() {
  return (
    <div>
        <BiaLayout>
            <Grid 
                container
                alignContent="center"
                justifyContent="center"
                style={{ height: "100%" }}
                position="relative" top="120px"
            >
                <Grid item  xs={1} sm={1.5} md={2} lg={3} xl={3} xxl={4} xel={4} xxel={4.5} el={5} />
                <Grid item xs={10} sm={9} md={8} lg={6} xl={6} xxl={4} xel={3.5} xxel={3} el={2}>
                <MDBCard sx={{p:0, m:0, mb: 2, width: "inherit"}} >
                    <Grid pt={6} pb={4} px={5}>
                        <MDBTypography
                            color = "white"
                            fontWeight = "medium"
                            fontSize = "4xl"
                            lineHeightSize = "5xl"
                        >
                            Let’s get started. 
                        </MDBTypography>
                    </Grid>
                    <BasicTabs/>
                </MDBCard>
                </Grid>
                <Grid item xs={1} sm={1.5} md={2} lg={3} xl={3} xxl={4} xel={4} xxel={4.5} el={5} />
            </Grid>
        </BiaLayout>
    </div>
  )
}
