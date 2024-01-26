import { useEffect } from "react";

// react-router-dom components
import { useLocation, NavLink } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import SidenavCollapse from "components/MDBSidenav/SidenavCollapse";

// Custom styles for the Sidenav
import SidenavRoot from "components/MDBSidenav/SidenavRoot";

// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
} from "context";
import BiaAssist from "components/BiaAssist";
import MiniSidenavBiaAssist from "components/MiniSidenavBiaAssist";
import { Tooltip } from "@mui/material";


function MDBSidenav({ color, brand, brandName, routes, ...rest }) {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode } = controller;
  const location = useLocation();
  const collapseName = location.pathname.replace("/", "");

  let textColor = "white";

  if (transparentSidenav || (whiteSidenav && !darkMode)) {
    textColor = "dark";
  } else if (whiteSidenav && darkMode) {
    textColor = "inherit";
  }

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const closeSidenav = () => setMiniSidenav(dispatch, true);

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
      setTransparentSidenav(dispatch, window.innerWidth < 1200 ? false : transparentSidenav);
      setWhiteSidenav(dispatch, window.innerWidth < 1200 ? false : whiteSidenav);
    }

    /** 
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);
  const handleSidenav=()=>{
    setMiniSidenav(dispatch,false)
  }

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes.map(({ type, name, icon,image, title, noCollapse, key, href, route }) => {
    let returnValue;

    if (type === "collapse") {
      returnValue = href ? (
        <Link
          href={href}
          key={key}
          target="_blank"
          rel="noreferrer"
          sx={{ textDecoration: "none" }}
        >
          <SidenavCollapse
            name={name}
            icon={icon}
            imageUrl={image}
            active={key === collapseName}
            noCollapse={noCollapse}
          />
        </Link>
      ) : (
        <NavLink key={key} to={route}>
          {
            (((key==="c/media-kit" && (collapseName && collapseName?.startsWith("c/media-kit")))) ||
            ((key==="media-kit" && (collapseName && collapseName?.startsWith("media-kit")))))?
              <SidenavCollapse 
                name={name} 
                icon={icon} 
                imageUrl={image} 
                active={key} 
              />
            :
            <SidenavCollapse name={name} icon={icon} imageUrl={image} active={key === collapseName} />
          }
        </NavLink>
      );
    } else if (type === "title") {
      returnValue = (
        <MDTypography
          key={key}
          color={textColor}
          display="block"
          variant="caption"
          fontWeight="bold"
          textTransform="uppercase"
          pl={3}
          mt={2}
          mb={1}
          ml={1}
        >
          {title}
        </MDTypography>
      );
    } else if (type === "divider") {
      returnValue = (
        <Divider
          key={key}
          light={
            (!darkMode && !whiteSidenav && !transparentSidenav) ||
            (darkMode && !transparentSidenav && whiteSidenav)
          }
        />
      );
    }

    return returnValue;
  });

  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
    >
      <MDBox pt={3} pb={1} px={4} textAlign="center">
        {/* Close icon */}
        <MDBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <MDTypography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </MDTypography>
        </MDBox>  
        {/* Sidenav header row */}
        <MDBox 
          display="flex"
          flexDirection="row"
          alignItems="center"
        >
          {/* Logo */}
          <MDBox component={NavLink} to="/c/home">
            {brand && <MDBox component="img" src={brand} alt="Brand" pb={miniSidenav===true ? 3: 5}/>}
          </MDBox>
          
          {/* Side menu handle icon */}
          <MDBox>
            {
              (miniSidenav===false) &&
              <MDBox 
                display={{ xs: "none", xl: "block" }}
                sx={{ cursor: "pointer" }}
                position="absolute"
                top={0}
                right={0}
                pt={4}
                pr={4}
                onClick={handleMiniSidenav}
              >
                <Tooltip title="Collapsed">
                  <ArrowBackIosIcon sx={{ color: "#8A8F93", width:"24px",height:"24px"}} />
                </Tooltip>
              </MDBox>
            }
              {/* {
              (miniSidenav===true) &&
              <MDBox 
                display={{ xs: "none", xl: "block" }}
                sx={{ cursor: "pointer" }}
                position="absolute"
                top={0}
                right={0}
                pt={4}
                onClick={handleSidenav}
              >
                 
              </MDBox>
            } */}
          </MDBox>
        </MDBox>
        {/* Side menu handle icon */}
        { (miniSidenav===true) &&
          <MDBox mb={1.5}
            sx={{ cursor: "pointer" }}
            onClick={handleMiniSidenav}
          >
            <Tooltip title="Expand" placement="right">
              <ArrowForwardIosIcon sx={{ color: "#8A8F93", width:"24px",height:"24px"}} />
            </Tooltip>
          </MDBox>
        }
      </MDBox>
      {/* Sidemenu routes */}
      <MDBox sx={{maxHeight:'80vh',overflow:'scroll',width:'inherit'}}>
        <List>{renderRoutes}</List>
        {/* Bia Assist */}
        <MDBox>
          {
            miniSidenav ? <MiniSidenavBiaAssist/> : <BiaAssist/>
          }
        </MDBox>
      </MDBox>
    </SidenavRoot>
  );
}

// Setting default values for the props of Sidenav
MDBSidenav.defaultProps = {
  color: "warning",
  brand: "",
};

// Typechecking props for the Sidenav
MDBSidenav.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MDBSidenav;
