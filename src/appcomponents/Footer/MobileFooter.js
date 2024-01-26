import { Divider, Grid } from '@mui/material'
import MDBCard from 'components/MDBCard'
import MDBTypography from 'components/MDBTypography'
import React from 'react'
import BiaLogo from "assets/images/icons/svg/large/BiaLogoWithTextFooter.svg";
import MDBButton from 'components/MDBButton';
import { Link, useNavigate } from 'react-router-dom';

export default function MobileFooter() {
    let history = useNavigate();

    //On Logo click
    const OnLogoClick=()=>{
        //Redirect to welcome page
        history("/");
    }

    return (
        <Grid container>
            {/* Footer */}
            <MDBCard
                isBorder={false}
                borderRadius="none"
                sx={{ m: 0, p: 0, px: 4, py: 5, width: "100%" }}
            >
                <Grid container>
                    <Grid item pb={4} sm={12} xs={12}>
                        <MDBTypography
                            component="img"
                            src={BiaLogo}
                            width="62px"
                            height="34px"
                            onClick={()=>OnLogoClick()}
                        />
                    </Grid>
                    <Grid item pb={4} sm={12} xs={12} display="none">
                        <MDBTypography
                            color="grayScale"
                            fontWeight="medium"
                            fontSize="md"
                            lineHeightSize="2xl"
                            sx={{ cursor: "pointer" }}
                        >
                            About
                        </MDBTypography>
                    </Grid>
                    <Grid item pb={4} sm={12} xs={12} display="none">
                        <MDBTypography
                            color="grayScale"
                            fontWeight="medium"
                            fontSize="md"
                            lineHeightSize="2xl"
                            sx={{ cursor: "pointer" }}
                        >
                            FAQs
                        </MDBTypography>
                    </Grid>
                    <Grid item pb={1} sm={12} xs={12}>
                        <MDBButton                                        
                            component={Link}
                            to="/waitlist"
                            size="small"
                            variant="contained"
                            bgColor="light_green"
                            color="black"
                            borderSize="md"
                            fontWeight="bold"
                            fontSize="sm"
                        >
                            Join Waitlist
                        </MDBButton>
                    </Grid>

                    {/* Divider */}
                    <Divider
                        orientation="horizontal"
                        sx={{
                            border: "1px solid #3B3D40",
                            width: { xs: "100%", sm: "100%" },
                        }}
                    />

                    <Grid container pt={1}>
                        <Grid item pr={3.4}>
                            <MDBTypography
                                color="grey400"
                                fontWeight="regular"
                                fontSize="lg"
                                lineHeightSize="2xxl"
                            >
                                2022 bia
                            </MDBTypography>
                        </Grid>
                        <Grid item>
                            <MDBTypography
                                color="grey400"
                                fontWeight="medium"
                                fontSize="lg"
                                lineHeightSize="2xxl"
                            >
                                All Rights Reserved
                            </MDBTypography>
                        </Grid>
                    </Grid>
                </Grid>
            </MDBCard>
        </Grid>
    )
}
