import MDBCard from "components/MDBCard";
import MDBTypography from "components/MDBTypography";
import React from "react";
import { Grid } from "@mui/material";
import MDBButton from "components/MDBButton";
import { useState } from "react";
import PlanningIcon from "assets/images/icons/svg/medium/PlanningIcon.svg"
import MediaKitIcon from "assets/images/icons/svg/medium/MediakitIcon.svg"
import EarningSummaryIcon from "assets/images/icons/svg/medium/PaymentsIcon.svg"
import GoalsIcon from "assets/images/icons/svg/medium/CampaignsIcon.svg"
import ScheduledPostIcon from "assets/images/icons/svg/medium/ScheduledPostIcon.svg"
import { useWidth } from "components/Hooks/UseWidth";
import { Link } from "react-router-dom";
import ContentPlaning from "assets/images/appimages/ContentPlanning.svg";
import Mediakit from "assets/images/appimages/Mediakit.svg";
import Earning from "assets/images/appimages/Earnings.svg";
import Scheduled from "assets/images/appimages/Scheduled.svg";
import Goals from "assets/images/appimages/Goals.svg";

export default function ForCreator() {
  const colorCode="invert(72%) sepia(8%) saturate(403%) hue-rotate(104deg) brightness(190%) contrast(80%)"
  const breakpoint = useWidth()[0];
  const pbValue = { xs: "2%", md: "0%", lg: "4%", xl: "5%", xxl: "4%", xel: "4%" }
  const loadImages = () => {
    let imageList = {};
    imageList["ContentPlaning"] = ContentPlaning;
    imageList["Mediakit"] = Mediakit;
    imageList["Earning"] = Earning;
    imageList["Scheduled"] = Scheduled;
    imageList["Goals"] = Goals;

    return imageList;
  }
  const images = loadImages();
  const [active, setActive] = useState("Mediakit");
  const ContentHandler = (e) => {
    // e.target.style.color = "#BBDCD2";
    setActive("ContentPlaning");
  };
  const MediakitHandler = (e) => {
    // e.target.style.color = "#BBDCD2";
    setActive("Mediakit");
  };
  const EarningHandler = (e) => {
    // e.target.style.color = "#BBDCD2";
    setActive("Earning");
  };
  const ScheduledHandler = (e) => {
    // e.target.style.color = "#BBDCD2";
    setActive("Scheduled");
  };
  const GoalsHandler = (e) => {
    // e.target.style.color = "#BBDCD2";
    setActive("Goals");
  };
  const HandleLeave = (e) => {
    e.target.style.color = "#8A8F93";

  };
  return (
    <div>
      <MDBCard
        bgcolor="black"
        isBorder={false}
        borderRadius="none"
        sx={{ m: 0, p: 0, mb: "6%", px: "10%", width: "inherit" }}
      >
        <Grid container>
          <Grid item xs={12} md={6} lg={6} xl={5} xxl={5} xxel={3} el={2} position="relative">
            <Grid item pb={pbValue}>
              <MDBTypography
                color="light_green"
                fontWeight="regular"
                fontSize="xl"
                lineHeightSize="4xl"
              >
                FOR CREATORS
              </MDBTypography>
            </Grid>
            <Grid item pb={4}>
              <MDBTypography
                color="white"
                fontWeight="medium"
                fontSize={`h2${breakpoint}`}
                lineHeightSize={`h${breakpoint}`}
                maxWidth="500px"
              >
                Focus on what matters most:
              </MDBTypography>
              <MDBTypography
                color="white"
                fontWeight="medium"
                fontSize={`h2${breakpoint}`}
                lineHeightSize={`h${breakpoint}`}
                maxWidth="500px"
              >
                creating content
              </MDBTypography>
            </Grid>
            <Grid item pb={pbValue}>
              <MDBButton
                size="large"
                variant="text"
                color="grey400"
                bgColor="transparent"
                fontWeight="regular"
                fontSize="xl"
                onMouseEnter={(e) => ContentHandler(e)}
                onMouseLeave={(e) => HandleLeave(e)}
                style={{ filter: active==="ContentPlaning"? colorCode:"" }}
              >
                <MDBTypography
                  component="img"
                  src={PlanningIcon} 
                  mr={1}
                  width="20px"
                  height="20px"
                  onMouseEnter={(e) => ContentHandler(e)}
                  onMouseLeave={(e) => HandleLeave(e)}
                />
                Content Planning
              </MDBButton>
            </Grid>
            <Grid item pb={pbValue}>
              <MDBButton
                size="large"
                variant="text"
                color="grey400"
                bgColor="transparent"
                fontWeight="regular"
                fontSize="xl"
                onMouseEnter={(e) => MediakitHandler(e)}
                onMouseLeave={(e) => HandleLeave(e)}
                style={{ filter: active==="Mediakit"? colorCode:"" }}
              >
                <MDBTypography
                  component="img"
                  src={MediaKitIcon} 
                  width="20px"
                  height="20px"
                  mr={1}
                />
                Media Kits
              </MDBButton>
            </Grid>
            <Grid item pb={pbValue}> 
              <MDBButton
                size="large"
                variant="text"
                color="grey400"
                bgColor="transparent"
                fontWeight="regular"
                fontSize="xl"
                onMouseEnter={(e) => EarningHandler(e)}
                onMouseLeave={(e) => HandleLeave(e)}
                style={{ filter: active==="Earning"? colorCode:"" }}
              >
                <MDBTypography
                  component="img"
                  src={EarningSummaryIcon} 
                  width="20px"
                  height="20px"
                  mr={1}
                />
                Earnings Summary
              </MDBButton>
            </Grid>
            <Grid item pb={pbValue}>
              <MDBButton
                size="large"
                variant="text"
                color="grey400"
                bgColor="transparent"
                fontWeight="regular"
                fontSize="xl"
                onMouseEnter={(e) => ScheduledHandler(e)}
                onMouseLeave={(e) => HandleLeave(e)}
                style={{ filter: active==="Scheduled"? colorCode:"" }}
              >
                <MDBTypography
                  component="img"
                  src={ScheduledPostIcon} 
                  mr={1}
                />
                Scheduled Posts
              </MDBButton>
            </Grid>
            <Grid item pb={pbValue}>
              <MDBButton
                size="large"
                variant="text"
                color="grey400"
                bgColor="transparent"
                fontWeight="regular"
                fontSize="xl"
                onMouseEnter={(e) => GoalsHandler(e)}
                onMouseLeave={(e) => HandleLeave(e)}
                style={{ filter: active==="Goals"? colorCode:"" }}
              >
                <MDBTypography
                  component="img"
                  src={GoalsIcon} 
                  width="20px"
                  height="20px"
                  mr={1}
                />
                Goals & Progress
              </MDBButton>
            </Grid>
            <Grid item pb={pbValue} pt={4}>
              <MDBButton 
                component={Link}
                to="/waitlist"
                size="medium"
                variant="contained"
                color="black"
                bgColor="light_green"
                fontWeight="bold"
                fontSize="md"
                borderRadius="md"
                borderSize="md"
                sx={{ position: "absolute", bottom: 0 }}
              >
                Join Today
              </MDBButton>
            </Grid>
            <Grid item pb={4} />
          </Grid>
          <Grid item 
            display={{xs: "block",sm: "block", md: "none", lg: "none", xl: "none", xxl: "none", xel:"none"}} 
            xs={12} sm={12} pb={4}
          >
          </Grid>
          <Grid item 
            display={{xs: "block", md: "block", lg: "block", xl: "block", xxl: "block", xel:"block"}} 
            xs={12} md={6} lg={6} xl={7} xxl={7} xxel={9} el={10}
          >
              <Grid container justifyContent="center" alignContent="center" height="100%" sx={{backgroundColor: "#2C3334", borderRadius: "12px"}}>
                <MDBTypography component="img" src={images[active]} sx={{maxWidth:"100%"}} />
              </Grid>
          </Grid>
        </Grid>
      </MDBCard>
    </div>
  );
}
