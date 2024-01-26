import { useEffect } from "react";

// react-router-dom components
import { useLocation } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React context
import { useMaterialUIController, setLayout } from "context";
import DefaultNavbar from "appcomponents/Navbars/DefaultNavbar";

function BaseLayout({ children }) {
  const [controller, dispatch] = useMaterialUIController();
  const { pathname } = useLocation();

  useEffect(() => {
    setLayout(dispatch, "bia");
  }, [pathname]);

  return (
    <MDBox
      width="100vw"
      height="100%"
      minHeight="100vh"
      bgColor={"default"}
      sx={{ overflowX: "hidden" }}
    >
      <DefaultNavbar
        action={{
          type: "internal",
          route: "/getstarted",
          label: "Get started",
        }}
        transparent
        light
      />
      <MDBox width="100%" p={2}>
        {children}
      </MDBox>
    </MDBox>
  );
}

BaseLayout.prototype = {
  children: PropTypes.node.isRequired,
};

export default BaseLayout;
