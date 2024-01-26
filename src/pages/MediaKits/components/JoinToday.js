import MDBCard from "components/MDBCard";
import MDBTypography from "components/MDBTypography";
import React from "react";
import { Divider, Grid } from "@mui/material";
import MDBButton from "components/MDBButton";
import { Link } from "react-router-dom";
import MediakitFooter from "./MediakitFooter";
import MDBImage from "components/MDBImage";
import { useWidth } from "components/Hooks/UseWidth";
import homeImg from "assets/images/appimages/TiltHome.svg";
import MDBox from "components/MDBox";

export default function JoinToday(props) {
  const breakpoint = useWidth()[0];
  return (
    <div>
      <MDBCard
        borderRadius="none"
        bgcolor="cardBg"
        isBorder={false}
        sx={{ m: 0, p: 0, width: "inherit" }}
      >
        <Grid container>
          <Grid item xs={12} md={6} lg={6} xl={6} xxl={6} xxel={6}>
            <Grid 
              container
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <Grid item  pr={3} 
                pl={{ md: 6, lg: 3, xxel: 0, }}
              >
                <Grid pb={{ md: "1vh", lg: 4, xl: 4, xxl: 4, el: 4 }}
                      pr={{xl:14,xxel:14}}
                >
                  <MDBTypography
                    color="white"
                    fontWeight="medium"
                    sx={{fontSize: { md: "28px", lg: "40px", xl: "40px", xxl: "40px", xxel: "56px" } }}
                    lineHeightSize="6xl"
                    // maxWidth="420px"
                  >
                    Sign up for our waitlist 
                  </MDBTypography>
                  <MDBTypography
                    color="white"
                    fontWeight="medium"
                    sx={{fontSize: { md: "28px", lg: "40px", xl: "40px", xxl: "40px", xxel: "56px" } }}
                    lineHeightSize="6xl"
                    // maxWidth="420px"
                  >
                    and get early access.
                  </MDBTypography>
                </Grid>
                <Grid pb={{ md: "2vh", lg: 6, xl: 6, xxl: 6, el: 6 }}
                >
                  <MDBTypography
                    color="white"
                    fontWeight="regular"
                    fontSize={breakpoint}
                    lineHeightSize="2xxl"
                    // maxWidth="428px"

                  >
                    Join other leading creators simplifying their 
                  </MDBTypography>
                  <MDBTypography
                    color="white"
                    fontWeight="regular"
                    fontSize={breakpoint}
                    lineHeightSize="2xxl"
                    // maxWidth="428px"

                  >
                    sponsorships and get notified when we launch.
                  </MDBTypography>
                </Grid>
                <Grid>
                  <MDBButton
                    component={Link}
                    to="/waitlist"
                    size="medium"
                    variant="contained"
                    color="black"
                    bgColor="light_green"
                    fontWeight="bold"
                    fontSize="md"
                    borderSize="md"
                  >
                    Join Today
                  </MDBButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            display={{ xs: "none", sm: "none", md: "block", lg: "block", xl: "block", xxl: "block", el: "block" }}
            xs={6} md={6} lg={6} xl={6} xxl={6} xxel={6}
            position="relative"
          >
            <MDBImage src={homeImg} />
            <MDBox 
            sx={{position: "absolute",background: "linear-gradient(270deg, #1C1F21 0%, rgba(28, 31, 33, 0) 100%)", zIndex: 1, top: 0, right: 0}} 
            width="210px" height="90%"/>
          </Grid>
        </Grid>
        <Divider  sx={{  mx:"6vw", mt: -3.5, mb: 0, height: "2px", backgroundColor: "#3B3D40" }} />
      </MDBCard>
      {/* Footer */}
      <MediakitFooter isRedirect={props.isRedirect}/>
    </div>
  );
}
