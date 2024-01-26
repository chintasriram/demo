// Material Dashboard 2 React components
import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import { setLayout } from "context";
import { useMaterialUIController,setMiniSidenav } from "context";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import sidenvaRoutes from "sidenavRoutes";
import biaLogo from "assets/images/icons/svg/large/BiaLogoWithTextSideNav.svg";
import miniSidenavBiaLogo from "assets/images/icons/svg/large/BiaLogo3548MiniSideNav.svg";
import MDBSidenav from "components/MDBSidenav";
import SearchBar from "components/SearchBar";

function BiaDashboardLayout({children}) {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav } = controller;
  const { pathname } = useLocation();
  const [onMouseEnter, setOnMouseEnter] = useState(false);

  useEffect(() => {
    setLayout(dispatch, "bia");
  }, [pathname])

   // Open sidenav when mouse enter on mini sidenav
   const handleOnMouseEnter = () => {
    if (miniSidenav) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  return (
    <MDBox
      width="auto"
      sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
        position: "relative",
        [breakpoints.up("xl")]: {
          marginLeft: miniSidenav ? pxToRem(120) : pxToRem(280),
          transition: transitions.create(["margin-left", "margin-right"], {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard,
          }),
        },
      })}
    >
      <MDBSidenav
        brand={miniSidenav?miniSidenavBiaLogo:biaLogo}
        routes={sidenvaRoutes}
        onMouseEnter={handleOnMouseEnter}
      />
      <Grid container sx={{width:"100%"}}>
        <Grid item xs={12} lg={12} md={12} xl={12} sm={12}>
          <SearchBar/>
        </Grid>
        <Grid item xs={12} lg={12} md={12} xl={12}>
            {children}
        </Grid> 
      </Grid> 
    </MDBox>
  );
}

export default BiaDashboardLayout;
