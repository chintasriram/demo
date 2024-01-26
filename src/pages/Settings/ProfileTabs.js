import { Box, Divider, Grid, Tab, Tabs, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Account from './Account'
import Notifications from './Notifications'
import PaymentGateway from './PaymentGateway'
import Review from './Review'
import ChangePassword from './ChangePassword'
import PropTypes from 'prop-types';
import breakpoints from "assets/theme/base/breakpoints";


export default function ProfileTabs() {
    const location = useLocation();
    const [value, setValue] = React.useState(0);

    const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);

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


    useEffect(() => {
        const { tabIdx } = location.state;
        // Check tab index
        if (tabIdx !== undefined && tabIdx !== null) {
            // Set tabd idx value
            setTabValue(tabIdx)
        }
    }, [location.state])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    return (
        <div>
            {/* Basic Tabs */}
            <Grid sx={{ width: '100%' }}>
                <Grid>
                    <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue} aria-label="basic tabs example">
                        <Tab label="Account" {...a11yProps(0)} />
                        <Tab label="Change Password" {...a11yProps(1)}/>
                        <Tab label="Notifications" {...a11yProps(2)} />
                        <Tab label="Payments" {...a11yProps(3)} />
                        <Tab label="Reviews" {...a11yProps(4)} />            
                    </Tabs>
                    <Divider sx={{m: 0, mt: "-2px", height: "2px"}}/>
                </Grid>
                <TabPanel value={tabValue} index={0}>
                    <Account />
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <ChangePassword />
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                    <PaymentGateway />
                </TabPanel>
                <TabPanel value={tabValue} index={3}>
                    <Review />
                </TabPanel>
                <TabPanel value={tabValue} index={4}>
                    <Notifications />
                </TabPanel>
            </Grid>
        </div>
    )
}
