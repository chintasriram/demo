import { useState, useEffect } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";


// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React base styles
import breakpoints from "assets/theme/base/breakpoints";
import MDBTypography from "../../../components/MDBTypography";
import InboundProposals from "../Tabs/InboundProposals";
import MDBCard from "components/MDBCard";
import { Divider } from "@mui/material";
import OutboundProposals from "../Tabs/OutboundProposals";
import PastCampaigns from "pages/Campaigns/PastCampaigns";
import ActiveCampaigns from "pages/Campaigns/ActiveCampaigns";
import { useWidth } from "components/Hooks/UseWidth";

function TabbedMenu({ children }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const screenSize = useWidth()[0]
  const marginRight = screenSize === "xl" ? 1.16 : 3

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);


  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <MDBox
            // sx={{ my: 1 }}
            height="380px"
            overflow="auto"
            width="inherit"
          >
            <MDBTypography>{children}</MDBTypography>
          </MDBox>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <MDBCard sx={{ p: 0, mx: 0, mt: 0, width: "inherit" }}>
      <MDBox position="relative" width="inherit">
        <Grid>
          <Grid item
            // mb={1.25} 
            pt={4.75}
          >
            <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue} sx={{ pl: screenSize === "xl" ? 1.5 : 3}}>
              <Tab
                label="Inbound Proposals"
                {...a11yProps(0)} sx={{mr: marginRight}}
              />
              <Tab
                label="Active Campaigns"
                {...a11yProps(1)} sx={{mr: marginRight}}
              />
              <Tab
                label="Past Campaigns"
                {...a11yProps(2)} sx={{mr: marginRight}}
              />
              <Tab
                label="Outbound Proposals"
                {...a11yProps(3)} sx={{mr: marginRight}}
              />

            </Tabs>
            <Divider sx={{ m: 0, mt: "-2px", height: "2px", width: "inherit" }} />
          </Grid>
        </Grid>
        <TabPanel value={tabValue} index={0}>
          <InboundProposals isHome={true} />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <ActiveCampaigns isHome={true} />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <Grid>
            <PastCampaigns isHome={true} />
          </Grid>
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          <Grid>
            <OutboundProposals isHome={true} />
          </Grid>
        </TabPanel>
        {/* <MDBTypography 
        position="absolute"
        component="div"
        height = "67px"
        width = "100%"
        top = "395px"
        sx={{pl:"50px ", pr:"50px", background : "linear-gradient(0deg, #1C1F21 0%, rgba(28, 31, 33, 0) 100%)"}}
      /> */}
      </MDBox>
    </MDBCard>
  );
}

// Setting default props for the Header
TabbedMenu.defaultProps = {
  children: "",
};

// Typechecking props for the Header
TabbedMenu.propTypes = {
  children: PropTypes.node,
};

export default TabbedMenu;

