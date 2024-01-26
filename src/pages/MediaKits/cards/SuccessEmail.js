import { Grid } from '@mui/material'
import MDBButton from 'components/MDBButton'
import MDBCard from 'components/MDBCard'
import MDBTypography from 'components/MDBTypography'
import React from 'react'
import success from "assets/images/icons/Success.jpg"

export default function SuccessEmail(props) {
  return (
    <Grid
        container
        spacing={0}
        alignContent="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
    >
        <Grid item xs={6}>
            <MDBCard
                borderRadius = "xl"
                bgcolor = "cardBg"
                sx={{p:0, px: 10, py: 5, m:0, ml: "auto", mr:"auto"}}
            >
                <Grid container justifyContent="center" pb={2}>
                    <img src={success} width="90px" height="90px" />
                </Grid>
                <MDBTypography
                    color = "white"
                    fontWeight = "medium"
                    fontSize = "2xl"
                    lineHeightSize = "3xl"
                    mb={4}
                >
                    Your email was sent successfully!
                </MDBTypography>
                <Grid container justifyContent="center">
                    <Grid item>
                        <MDBButton
                            size = "medium"
                            variant= "contained"
                            color= "black"
                            bgColor= "light_green"
                            fontWeight = "bold"
                            fontSize = "lg"
                            borderSize = "md"
                            onClick={()=>{props?.closeCallback()}}
                        >
                           OK
                        </MDBButton>
                    </Grid>
                </Grid>
            </MDBCard>
        </Grid>
    </Grid>
  )
}
