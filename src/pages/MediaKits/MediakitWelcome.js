import React from 'react'
import { useNavigate } from 'react-router-dom'
import MDBCard from 'components/MDBCard'
import InfluencerHome from 'assets/images/ImagesSvg/InfluencerHomeCard.svg'
import MDBTypography from 'components/MDBTypography'
import MDBButton from 'components/MDBButton'
import { Grid } from '@mui/material'
import { useWidth } from 'components/Hooks/UseWidth'

export default function MediakitWelcome() {
    const breakpoint = useWidth()[0]
    let history = useNavigate();

    //Redirect to Save Media Kit
    const redirectToSaveMediKit = (e) => {
        e?.preventDefault();
        history("/c/media-kit/save")
    }

    return (
        <div>
            <Grid
                container
                alignContent="center"
                justifyContent="center"
                style={{ height: "100%" }}
                position="relative" top="80px"
            >
                <Grid item xs={0.5} sm={0.5} md={2} lg={3} xl={3} xxl={3.2} xel={3.75} xxel={4.6} el={5} />
                <Grid item xs={11} sm={11} md={8} lg={5.7} xl={5.55} xxl={5.6} xel={4.5} xxel={2.8} el={2}>
                    <MDBCard sx={{ p: 0, width: "inherit" }}>
                        <MDBCard
                            isBorder={false}
                            sx={{ p: 0, m: 0, borderRadius: "12px 12px 0 0", width: "inherit" }}
                            style={{ backgroundColor: "rgba(187, 220, 210, 0.24)" }}
                        >
                            <Grid container justifyContent="center">
                                <MDBTypography
                                    component="img"
                                    width={breakpoint === "sm" || breakpoint == "xs" ? "230px" : "auto"}
                                    src={InfluencerHome}
                                    pt={breakpoint === "sm" || breakpoint == "xs" ? 6 : 9}
                                />
                            </Grid>
                        </MDBCard>

                        {/* #BBDCD2uced 1px mt as top container taking 1px ectra nedd to sort ! */}
                        <Grid sx={{ mt: 4, mx: "auto", mb: 2 }}>
                            <MDBTypography
                                fontWeight="medium"
                                fontSize="2xl"
                                lineHeight="4xl"
                                sx={{ mb: 0.5, textAlign: "center" }}
                            >
                                Create your Media Kit
                            </MDBTypography>
                            <MDBTypography
                                fontWeight="regular"
                                fontSize="lg"
                                lineHeight="2xxl"
                                color="grayScale"
                                sx={{ mt: 0.5, textAlign: "center" }}
                            >
                                It's never been easier
                            </MDBTypography>
                        </Grid>
                        <Grid textAlign="center">
                            <MDBButton
                                variant="contained"
                                size="medium"
                                bgColor="light_green"
                                color="black"
                                borderSize="md"
                                sx={{ px: 3, py: 1.5, mt: 2, mb: 6 }}
                                onClick={(e) => redirectToSaveMediKit(e)}
                            >
                                Lets Go!
                            </MDBButton>
                        </Grid>
                    </MDBCard>
                </Grid>
                <Grid item xs={0.5} sm={0.5} md={2} lg={3} xl={3} xxl={3.2} xel={3.75} xxel={4.6} el={5} />
            </Grid>
        </div>
    )
}
