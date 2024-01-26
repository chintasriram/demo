import MDBCard from "components/MDBCard";
import MDBTypography from "components/MDBTypography";
import React from "react";
import { Grid } from "@mui/material";
import MDBButton from "components/MDBButton";
import { useState } from "react";
import InvoiceIcon from "assets/images/icons/svg/medium/PaymentsIcon.svg"
import ContractsIcon from "assets/images/icons/svg/medium/ProposalsIcon.svg"
import CommunicationIcon from "assets/images/icons/svg/medium/CommunicationIcon.svg";
import MarketPlaceIcon from "assets/images/icons/svg/medium/MarketPlaceIcon.svg"
import AnalyticsIcon from "assets/images/icons/svg/medium/AnalyticsIcon.svg"
import { useWidth } from "components/Hooks/UseWidth";
import { Link } from "react-router-dom";
import Invoicing from "assets/images/appimages/Invoicing.svg";
import Contracts from "assets/images/appimages/Contracts.svg";
import Communications from "assets/images/appimages/Communications.jpg";
import MarketPlace from "assets/images/appimages/MarketPlace.jpg";
import Analytics from "assets/images/appimages/Analytics.svg";


export default function ForBrands(props) {
  const colorCode="invert(72%) sepia(8%) saturate(403%) hue-rotate(104deg) brightness(190%) contrast(80%)"
  // const communicationIconColor = "invert(89%) sepia(13%) saturate(315%) hue-rotate(111deg) brightness(400%) contrast(90%)"
  
  const breakpoint = useWidth()[0];
  const pbValue = { xs: "2%", md: "1%", lg: "4%", xl: "5%", xxl: "4%", xel: "4%" }
  const loadImages = () => {
    let imageList = {};
    imageList["Invoicing"] = Invoicing;
    imageList["Contracts"] = Contracts;
    imageList["Communications"] = Communications;
    imageList["MarketPlace"] = MarketPlace;
    imageList["Analytics"] = Analytics;

    return imageList;
  }
  const images = loadImages();
  const [active, setActive] = useState("Invoicing");
  const ContentHandler = (e) => {
    // e.target.style.color = "#BBDCD2";
    setActive("Invoicing");
  };
  const MediakitHandler = (e) => {
    // e.target.style.color = "#BBDCD2";
    setActive("Contracts");
  };
  const EarningHandler = (e) => {
    // e.target.style.color = "#BBDCD2";
    setActive("Communications");
  };
  const ScheduledHandler = (e) => {
    // e.target.style.color = "#BBDCD2";
    setActive("MarketPlace");
  };
  const GoalsHandler = (e) => {
    // e.target.style.color = "#BBDCD2";
    setActive("Analytics");
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
        sx={{ m: 0, p: 0, mt: "6%", mb: "12%", px: "10%", width: "inherit" }}
      >
        <Grid container direction={breakpoint === "xs" || breakpoint === "sm" ? "column-reverse" : ""}>
          <Grid item
            xs={12} sm={12} md={6} lg={6} xl={7} xxl={7} xxel={9} el={10} sx={{ backgroundColor: "#2C3334", borderRadius: "12px" }}
          >
            <Grid container mr={4} justifyContent="center" alignContent="center" height="100%">
              <MDBTypography component="img" src={images[active]} sx={{
                maxWidth: "min(100%, 608px)",
                borderRadius: "40px"
              }} />
            </Grid>
          </Grid>
          <Grid item
            display={{ xs: "block", sm: "block", md: "none", lg: "none", xl: "none", xxl: "none", xel: "none" }}
            xs={12} sm={12} pb={4}
          >
          </Grid>
          <Grid item xs={12} md={6} lg={6} xl={5} xxl={5} xxel={3} el={2} pl={breakpoint === "xs" || breakpoint === "sm" ? "" : 6} position="relative">
            <Grid item pb={pbValue}>
              <MDBTypography
                color="light_green"
                fontWeight="regular"
                fontSize="xl"
                lineHeightSize="4xl"
              >
                FOR BRANDS
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
                Manage all of your creator 
              </MDBTypography>
              <MDBTypography
                color="white"
                fontWeight="medium"
                fontSize={`h2${breakpoint}`}
                lineHeightSize={`h${breakpoint}`}
                maxWidth="500px"
              >
                marketing in a single place
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
                style={{ filter: active==="Invoicing"? colorCode:"" }}

              >
                <MDBTypography
                  component="img"
                  src={InvoiceIcon}
                  width="20px"
                  height="20px"
                  mr={1}
                />
                Invoicing
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
                style={{ filter: active==="Contracts"? colorCode:"" }}

              >
                <MDBTypography
                  component="img"
                  src={ContractsIcon}
                  mr={1}
                  width="20px"
                  height="20px"
                />
                Contracts
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
                style={{ filter: active==="Communications"? colorCode : ""  }}

              >
                <MDBTypography
                  component="img"
                  src={CommunicationIcon}
                  mr={1}
                  width="20px"
                  height="20px"
                  style={{ filter: active!=="Communications"? "contrast(0.3)" : ""  }}
                />
                Communications
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
                style={{ filter: active==="MarketPlace"? colorCode:"" }}
              >
                <MDBTypography
                  component="img"
                  src={MarketPlaceIcon}
                  mr={1}
                  width="20px"
                  height="20px"
                />
                Marketplace
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
                style={{ filter: active==="Analytics"? colorCode:"" }}
              >
                <MDBTypography
                  component="img"
                  src={AnalyticsIcon}
                  mr={1}
                />
                Analytics
              </MDBButton>
            </Grid>
            <Grid item pt={4}>
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
                Sign Up Today
              </MDBButton>
            </Grid>
            <Grid item pb={4} />
          </Grid>
        </Grid>
      </MDBCard>
    </div>
  );
}
