import React from "react";
import MDBTypography from "components/MDBTypography";
import { Grid } from "@mui/material";
import MDBButton from "components/MDBButton";
import MDBCard from "components/MDBCard";
import { useWidth } from "components/Hooks/UseWidth";
import { Link } from "react-router-dom";

export default function SignUpToday(props) {
 const breakpoint = useWidth()[0];
  return (
    <div>
      <MDBCard
        bgcolor="transparent"
        isBorder={false}
        borderRadius="none"
        sx={{ m: 0, p: 0, width: "inherit"
        }}
      >
        <Grid container justifyContent="center" height="50vh" >
          <Grid item textAlign="center" mt="6vh" mb="6vh">
            <Grid item pb="1vw">
              <MDBTypography
                color="white"
                fontWeight="medium"
                fontSize={`h${breakpoint}`}
                lineHeightSize="6xl"
                maxWidth="934px"
              >
                Streamlining sponsorship 
                
              </MDBTypography>
              <MDBTypography
                color="white"
                fontWeight="medium"
                fontSize={`h${breakpoint}`}
                // lineHeightSize="6xl"
                maxWidth="934px"
              >
               management
             </MDBTypography>
            </Grid>
            <Grid item pb="1.5vw" >
              <MDBTypography
                color="grayScale"
                fontWeight="regular"
                fontSize="lg"
                // lineHeightSize="2xxl"
              >
                Join our waitlist to get notified when we launch. 
              </MDBTypography>
            </Grid>
            <Grid item >
              <MDBButton
                component={Link}
                to="/waitlist"
                size="medium"
                variant="contained"
                color="black"
                bgColor="light_green"
                fontWeight="bold"
                fontSize={breakpoint}
                borderSize="md"
                sx={{zIndex: 2}}
              >
                Sign Up Today
              </MDBButton>
            </Grid>
          </Grid>
        </Grid>

        
      </MDBCard>

      {/* <Grid container>
      <Grid item mt={{xs: "-12vh", md: "-12vh", lg: "-12vh", xl: "-10vh", xxl: "-7vh", xxel: "-2vh", el: "-10vh"}} mb="2vh" xs={12}>
          <Grid container>
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
              <Grid container justifyContent="center">
                <LandImages/>
              </Grid>
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
        </Grid>
      </Grid> */}
    </div>
  );
}
