import { Divider, Grid } from "@mui/material";
import CloseButton from "components/CloseButton";
import MDBCard from "components/MDBCard";
import MDBTypography from "components/MDBTypography";
import React from "react";
import MDBButton from "components/MDBButton";
import BiaSetting from"assets/images/icons/svg/large/BiaLogo2940.svg"
import outlookIcon from"assets/images/icons/svg/large/Outlook4040.svg"
import Arrows from"assets/images/icons/svg/medium/Arrows.svg"
import Delete from"assets/images/icons/svg/medium/DeleteIcon1818.svg"
import MDBox from "components/MDBox";
import Switch from "@mui/material/Switch";
import { Link } from "react-router-dom";

export default function EditOutlooksync(props) {


    const saveHandler = (e) => {
        alert("alert for save")
    };

  return (
    <div>
      <MDBCard sx={{ p: 0, mx: "auto", mt: "100px" }}>
        {/*Header */}
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 4 }}
        >
          <MDBTypography fontWeight="medium" fontSize="xl" sx={{ ml: 3 }}>
          Edit Outlook Sync
          </MDBTypography>

          {/* Close Icon */}
          <CloseButton callback={props.closeCallback} />
        </Grid>

        {/* Divider */}
        <Divider />
        <MDBox autocomplete="off">
          {/* card body */}

          <MDBCard borderRadius="xl" bgcolor="cardBg" sx={{ width: "450px" }}>
            <Grid sx={{ ml: 1 }} display="flex">
              <Grid item>
                <img src={BiaSetting} />
              </Grid>
              <Grid item ml={2}>
                <img src={Arrows} />
              </Grid>
              <Grid item ml={2}>
                <img src={outlookIcon} />
              </Grid>
              <Grid item ml={26}>
                <Switch />
              </Grid>
              <Grid item ml={2}>
                <MDBTypography component="img" height="18px" src={Delete} />
              </Grid>
            </Grid>
            <Grid container>
              <Grid>
                <MDBTypography
                  color="white"
                  fontWeight="Medium"
                  fontSize="md"
                  lineHeightSize="2xxl"
                  mt={0.5}
                >
                  Sync bia events to Google Calendar
                </MDBTypography>
              </Grid>
            </Grid>
          </MDBCard>
          <MDBox ml={2}>
          <MDBButton
                  size="small"
                  variant= "outlined"
                  color= ""
                  bgColor= "white"
                  fontWeight = "medium"
                  fontSize = "sm"
                  borderSize = "md"
                  sx={{alignSelf : "center", py: "7px", px:1, ml: 1}}

                >
                    Add New Outlook Sync
                </MDBButton>
          </MDBox>
          {/* Divider */}
          <Divider />
          {/* Footer */}
          <Grid container px={2} pb={2}>
            <Grid ml="auto" mr={4}>
              <MDBButton
                component={Link}
                to="/c/home"
                size="small"
                variant="text"
                color="white"
                bgColor="cardBg"
                fontWeight="medium"
                fontSize="md"
                mr={4} mx={1}>
                Cancel
              </MDBButton>
            </Grid>
            <Grid>
              <MDBButton
                size="medium"
                variant="contained"
                color="black"
                bgColor="light_green"
                fontWeight="bold"
                fontSize="md"
                borderSize="md"
                onClick={(e) => saveHandler(e)}
              >
                save
              </MDBButton>
            </Grid>
          </Grid>
        </MDBox>
      </MDBCard>
    </div>
  );
}
