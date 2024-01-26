import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { Grid, Popover } from "@mui/material";
import MDBTypography from "components/MDBTypography";
import { Link, useNavigate } from "react-router-dom";
import MDBButton from "components/MDBButton";
import BiaIcon from "assets/images/icons/svg/large/BiaLogoWithText8648.svg";
import MDBCard from "components/MDBCard"
import MDBox from 'components/MDBox';

export default function BiaHomepage(props) {
  let history = useNavigate();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  //On Logo click
  const OnLogoClick=()=>{
    //Redirect to welcome page
    history("/");
  }

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Popover
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MDBCard
        bgcolor="black"
        isBorder={false}
        borderRadius="lg"
        sx={{ m: 0, p: 0, px: 1, py: 2 }}
      >
        <MenuItem>
          <MDBTypography
            component={Link}
            to="/waitlist"
            fontWeight="medium"
            fontSize="md"
            lineHeightSize="2xl"
            color="grayScale"
            pb={0.5}
          >
            Join Waitlist
          </MDBTypography>
        </MenuItem>
        <MenuItem>
          <MDBTypography
            component={Link}
            to="/login"
            fontWeight="medium"
            fontSize="md"
            lineHeightSize="2xl"
            color="grayScale"
            pb={0.5}
          >
            Login
          </MDBTypography>
        </MenuItem>
        <MenuItem sx={{display: "none"}}>
          <MDBTypography
            fontWeight="medium"
            fontSize="md"
            lineHeightSize="2xl"
            color="grayScale"
            pb={0.5}
          >
            About
          </MDBTypography>
        </MenuItem>
        <MenuItem  sx={{display: "none"}}>
          <MDBTypography
            fontWeight="medium"
            fontSize="md"
            lineHeightSize="2xl"
            color="grayScale"
          >
            FAQs
          </MDBTypography>
        </MenuItem>
      </MDBCard>
    </Popover>
  );

  return (
    <Box sx={{ flexGrow: 1, }} >
      <AppBar position="static" sx={{background: "inherit"}}>
        <MDBCard
          bgcolor="black"
          isBorder={false}
          borderRadius="none"
          sx={{ m: 0, p: 0, px: "2vw", py: "1.5vw", width: "inherit", background: props?.scroll === true ? "#000000" : "inherit", position: "relative", borderBottom: "1px solid rgba(255, 255, 255, 0.32)" }}
        >
          <Toolbar>
            <MDBox pt={1}>
              <MDBTypography
                component="img"
                src={BiaIcon}
                sx={{ cursor: "pointer" }}
                onClick={()=>OnLogoClick()}
              />
            </MDBox>

            <MDBox sx={{ flexGrow: 1 }} />

            <MDBox sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Grid item pr={5} alignSelf="center" display="none">
                <MDBButton
                  size="small"
                  variant="text"
                  color="grayScale"
                  bgColor="transparent"
                  fontWeight="bold"
                  fontSize="md"
                  borderSize="md"
                >
                  About
                </MDBButton>
              </Grid>

              {/* FAQs Text Button */}
              <Grid item pr={10} alignSelf="center" display="none">
                <MDBButton
                  size="small"
                  variant="text"
                  color="grayScale"
                  bgColor="transparent"
                  fontWeight="bold"
                  fontSize="md"
                  borderSize="md"
                >
                  FAQs
                </MDBButton>
              </Grid>

              {/* Log In Text Button */}
              <Grid item pr={5} alignSelf="center">
                <MDBButton
                  component={Link}
                  to="/login"
                  size="small"
                  variant="text"
                  color={props?.isExternal && props?.data?.coverImageUrl === null ? "black" : "white"}
                  bgColor="transparent"
                  fontWeight="medium"
                  fontSize="md"
                  borderSize="md"
                >
                  Log In
                </MDBButton>
              </Grid>
              <Grid item>
                <MDBButton
                  component={Link}
                  to="/waitlist"
                  size="medium"
                  variant="contained"
                  color="black"
                  bgColor= {props?.isExternal && props?.data?.coverImageUrl === null ? "white" : "light_green"}
                  fontWeight="bold"
                  fontSize="md"
                  borderSize="md"
                >
                  Join Waitlist
                </MDBButton>
              </Grid>
            </MDBox>

            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </MDBCard>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}
