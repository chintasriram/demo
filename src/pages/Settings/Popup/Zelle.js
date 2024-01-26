import { Divider, Grid } from '@mui/material'
import MDBCard from 'components/MDBCard'
import MDBTypography from 'components/MDBTypography'
import React from 'react'
import ACH from 'assets/images/icons/svg/medium/ACH2020.svg'
import MDBox from 'components/MDBox'
import MDBInput from 'components/MDBInput'
import MDBButton from 'components/MDBButton'
import DividerWithText from 'components/DividerWithText'

export default function Zelle() {
  return (
    <div>
        {/* Zelle Popup */}
        <MDBCard
            borderRadius = "xl"
            bgcolor = "cardBg"
            sx={{p:0, boxShadow:" 0px 4px 24px rgba(0, 0, 0, 0.48)", ml:"auto", mr:"auto"}}
        >
            {/* Card Header */}
            <Grid container sx={{pt: 4, px: 3}}>
                <MDBTypography
                    component="img"
                    height="20px"
                    src={ACH}
                    pr={1} mt={0.5}
                />
                <MDBTypography
                    color = "white"
                    fontWeight = "medium"
                    fontSize = "xl"
                    lineHeightSize = "2xxl"
                >
                    Zelle
                </MDBTypography>
            </Grid>

            {/* Card Divider */}
            <Divider/>

            {/* Card Body */}
            <MDBox
                component="form"
                sx={{
                    pt : 1, px: 3,
                }}
                Validate
                autoComplete="off"
            >
                <MDBox >
                    <MDBTypography 
                        fontSize="md" 
                        lineHeightSize="md"
                        pb={1}
                    >
                        Zelle Email
                    </MDBTypography>
                    <MDBInput type = "text" placeholder="username" />
                </MDBox>
            </MDBox>

            {/* Divider with Text */}
            <Grid my={3.5} px={5}>
                <DividerWithText>or</DividerWithText>
            </Grid>

            <MDBox
                component="form"
                sx={{
                     px: 3,
                }}
                Validate
                autoComplete="off"
            >
                <MDBox mb={0.75}>
                    <MDBTypography 
                        fontSize="md" 
                        lineHeightSize="md"
                        pb={1}
                    >
                        Zelle Phone number
                    </MDBTypography>
                    <MDBInput type = "text" placeholder="username" />
                </MDBox>
            </MDBox>


            {/* Card Divider */}
            <Divider/>

            {/* Card Footer */}
            <MDBox sx={{px: 3, pb: 3}} ml="auto">
                    <MDBButton
                        size="small"
                        variant= "text"
                        color= "white"
                        bgColor= "cardBg"
                        fontWeight = "medium"
                        fontSize = "md"
                        mr={4}
                    >
                        Cancel
                    </MDBButton>
                    <MDBButton
                        size="medium"
                        variant= "contained"
                        color= "black"
                        bgColor= "light_green"
                        fontWeight = "bold"
                        fontSize = "md"
                        borderSize = "md"
                    >
                        Save
                    </MDBButton>
            </MDBox>
        </MDBCard>
    </div>
  )
}
