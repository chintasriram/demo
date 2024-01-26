import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MDBTypography from "components/MDBTypography";
import MDBCard from "components/MDBCard";
import ActiveCampaigns from "./Campaigns/ActiveCampaigns";
import PastCampaigns from "./Campaigns/PastCampaigns";
import Messages from "./Campaigns/Messages";
import { Divider, Grid } from "@mui/material";

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
        <Box sx={{ pb: 4, mt: 4 }}>
          <Typography>{children}</Typography>
        </Box>
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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Proposals() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid sx={{ width: "inherit" }}>
      <Grid container justifyContent="center">
        <Grid
          item
          xs={0.5}
          sm={0.5}
          md={1}
          lg={2}
          xl={2}
          xxl={2}
          xel={2}
          xxel={2}
          el={3}
        />
        <Grid
          item
          xs={11}
          sm={11}
          md={10}
          lg={8}
          xl={8}
          xxl={8}
          xel={8}
          xxel={8}
          el={6}
        >
          <MDBCard
            sx={{ p: 0, width: "inherit" }}
            bgcolor="black"
            isBorder={false}
          >
            {/* Title : Settings */}
            <MDBTypography
              color="white"
              fontWeight="medium"
              fontSize="4xl"
              lineHeightSize="5xl"
              mt={5}
              mb={3}
            >
              Campaigns
            </MDBTypography>

            {/* Basic Tabs */}
            <Grid sx={{ width: "100%" }}>
              <Grid item>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Active Campaigns" {...a11yProps(0)} />
                  <Tab label="Past Campaigns" {...a11yProps(1)} />
                  <Tab label="Messages" {...a11yProps(2)} />
                </Tabs>
                <Divider sx={{ m: 0, mt: "-2px", height: "2px" }} />
              </Grid>
              <TabPanel value={value} index={0}>
                {/* Active Campaigns */}
                <ActiveCampaigns />
              </TabPanel>
              <TabPanel value={value} index={1}>
                {/* Past Campaigns */}
                <PastCampaigns />
              </TabPanel>
              <TabPanel value={value} index={2}>
                {/* Past Campaigns */}
                <Messages />
              </TabPanel>
            </Grid>
          </MDBCard>
        </Grid>
        <Grid
          item
          xs={0.5}
          sm={0.5}
          md={1}
          lg={2}
          xl={2}
          xxl={2}
          xel={2}
          xxel={2}
          el={3}
        />
      </Grid>
    </Grid>
  );
}
