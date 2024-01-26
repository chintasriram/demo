import { Divider, Grid, Switch } from '@mui/material'
import MDBButton from 'components/MDBButton'
import MDBCard from 'components/MDBCard'
import MDBInput from 'components/MDBInput'
import MDBox from 'components/MDBox'
import MDBTypography from 'components/MDBTypography'
import VideoImage from 'assets/images/icons/Video_1.png'
import React from 'react'
import CloseButton from 'components/CloseButton'

export default function LinkVideo() {
  return (
    <div>
        <MDBCard
            bgcolor="black"
            sx={{m:0, p:0, mt: 8, mx: "auto" }}
        >
            {/* Card Header */}
            <Grid container sx={{px: 2.875 , pt: 4}} justifyContent="space-between" alignContent="center">
                <MDBTypography
                    color = "white"
                    fontWeight = "medium"
                    fontSize = "xl"
                    lineHeightSize = "2xxl"
                >
                    Link Video
                </MDBTypography>
            </Grid>

            {/* Divider */}
            <Divider/>
            
            {/* Card Body */}
            <MDBox sx={{pt: 2, pb: 5, px: 5}}>
                <MDBTypography
                    color = "white"
                    fontWeight = "medium"
                    fontSize = "md"
                    lineHeightSize = "2xl"
                    pb={2}
                >
                    Enter URL of video below
                </MDBTypography>
                <MDBox>
                    <MDBTypography 
                        color = "white"
                        fontWeight = "regular"
                        fontSize = "xs"
                        lineHeightSize = "md"
                        pb={1}
                    >
                        URL
                    </MDBTypography>
                    <MDBInput type = "text" placeholder="Enter URL" />
                </MDBox>

                {/* Video Preview after entering the video URL */}
                <MDBox>
                    <MDBox mt={4}>
                        <Grid container>
                            <MDBTypography
                                component= "img"
                                src={VideoImage}
                                width="230px"
                                height="173px"
                            />
                            <Grid>
                                <MDBTypography
                                    color = "white"
                                    fontWeight = "medium"
                                    fontSize = "md"
                                    lineHeightSize = "2xl"
                                    maxWidth="220px"
                                    pt={6} pl={3} pb={1.5}
                                >
                                    Can you pass the Ultimate Color Vision test?
                                </MDBTypography>

                                <Grid ml={1}>
                                    <MDBButton
                                        size = "small"
                                        variant= "outlined"
                                        color= ""
                                        bgColor= "black"
                                        fontWeight = "medium"
                                        fontSize = "sm"
                                        borderSize = "md"
                                    >
                                        Remove
                                    </MDBButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </MDBox>
                </MDBox>

                <Grid container>
                    <Switch 
                        sx={{mt : 2.2, mr: 1}} 
                    />
                    <MDBTypography
                        color = "white"
                        fontWeight = "regular"
                        fontSize = "md"
                        lineHeightSize = "2xl"
                        pt={2} mb={21.25}
                    >
                        Was this a sponsored campaign?
                    </MDBTypography>
                </Grid>
            </MDBox>

            {/* Divider */}
            <Divider/>

            {/* Card Footer */}
            <Grid container sx={{pb: 3, px: 3}} justifyContent="space-between">
                <Grid item alignContent="center">
                    <MDBTypography
                        color = "light_green"
                        fontWeight = "regular"
                        fontSize = "md"
                        lineHeightSize = "2xl"
                        pt={1.2}
                    >
                        1/5
                    </MDBTypography>
                </Grid>
                <MDBButton
                    size = "medium"
                    variant= "contained"
                    color= "black"
                    bgColor= "light_green"
                    fontWeight = "bold"
                    fontSize = "md"
                    borderSize = "md"
                >
                    Save
                </MDBButton>
            </Grid>
        </MDBCard>
    </div>
  )
}
