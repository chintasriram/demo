// react-router-dom components
import { useLocation } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React context
import { useMaterialUIController} from "context";
import DefaultNavbarNew from "appcomponents/NavbarsNew/DefaultNavbarNew";

function CreatorLayout({children}) {
  // useEffect(()=>{
  //   setLayout(dispatch,"bia")
  // },[pathname])

  return (
    <MDBox
      width="100vw"
      height="100%"
      minHeight="100vh"
      bgColor={"default"}
      sx={{ overflowX: "hidden" }}
    >
      <DefaultNavbarNew
        action={{
          type: "external",
          route: "https://creative-tim.com/product/material-dashboard-react",
          label: "free download",
        }}
        transparent
        light
      />
      <MDBox
        p={2}
      >
        {children}
      </MDBox>
    </MDBox>
  )
}

CreatorLayout.prototype = {
  children: PropTypes.node.isRequired
}

export default CreatorLayout;
