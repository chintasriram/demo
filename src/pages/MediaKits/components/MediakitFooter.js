import MDBCard from "components/MDBCard";
import MDBTypography from "components/MDBTypography";
import React from "react";
import { Grid} from "@mui/material";
import BiaIcon from "assets/images/icons/svg/large/BiaLogoWithTextFooter.svg";
import MDBox from "components/MDBox";
import MDBButton from "components/MDBButton";
import { Link, useNavigate } from "react-router-dom";

export default function MediakitFooter(props) {
  let history = useNavigate();

  //On Logo click
  const OnLogoClick=()=>{
    if(props.isRedirect !== undefined && props.isRedirect === false){
      // Scroll top to page
      window?.scrollTo({top:0,left:0,behavior:'smooth'})
    }else{
      //Redirect to welcome page
      history("/");
    }
  }

  return (
    <div>
      <MDBCard
        bgcolor="cardBg"
        isBorder={false}
        borderRadius="none"
        sx={{ m: 0, p: 0, width: "inherit" }}
      >
        <Grid container px="6vw" py={3}>
          <Grid item >
            <Grid container>
              <Grid item pr={4}>
                <MDBTypography
                  component="img"
                  src={BiaIcon}
                  width="58px"
                  height="32px"
                  mt={0.8}
                  sx={{cursor:"pointer"}}
                  onClick={()=>OnLogoClick()}
                />
              </Grid>
              <Grid pr={3.2} alignSelf="center">
                <MDBTypography
                  color="white"
                  fontWeight="regular"
                  fontSize="md"
                  lineHeightSize="xxl"
                >
                  2022 bia
                </MDBTypography>
              </Grid>
              <Grid alignSelf="center">
                <MDBTypography
                  color="white"
                  fontWeight="regular"
                  fontSize="md"
                  lineHeightSize="xxl"
                >
                  All Rights Reserved
                </MDBTypography>
              </Grid>
            </Grid>
          </Grid>
          <MDBox sx={{ flexGrow: 1 }} />
          <Grid item>
            <Grid container>
              <Grid pr="2vw" >
                <MDBButton
                  component={Link}
                  to="/privacy"
                  size="small"
                  variant="text"
                  color="white"
                  bgColor="transparent"
                  fontWeight="regular"
                  fontSize="md"
                >
                  Privacy Policy
                </MDBButton>
              </Grid>
              <Grid>
                <MDBButton
                  component={Link}
                  to="/terms"
                  size="small"
                  variant="text"
                  color="white"
                  bgColor="transparent"
                  fontWeight="regular"
                  fontSize="md"
                >
                  Terms of Use
                </MDBButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </MDBCard>
    </div>
  );
}
