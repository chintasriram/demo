import React, { useEffect, useState } from 'react'
import { Divider, Grid, Modal } from '@mui/material'
import MDBTypography from 'components/MDBTypography'
import MDBCard from 'components/MDBCard'
import { Link } from 'react-router-dom'
import MDBButton from 'components/MDBButton'
import EditButtonGray from 'components/EditButtonGray'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Avatar from '@mui/material/Avatar';
import Oura from 'assets/images/icons/Oura.png'
import TikTokIcon from 'assets/images/icons/social/icons_large/tiktok.png'
import MDAvatar from 'components/MDAvatar'
import MDBox from 'components/MDBox'
import { useLocation } from 'react-router-dom'
import CloseButton from 'components/CloseButton'
import Tik from '../../assets/images/icons/svg/medium/CheckIcon1414.svg'
import Instagram from '../../assets/images/icons/svg/large/Instagram4040.svg'
import Tiktok from '../../assets/images/icons/svg/large/TikTok4040.svg'
import Youtube from '../../assets/images/icons/svg/large/YouTube4040.svg'
import moment from "moment";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CampaignTab from './CampaignDetailTabs/CampaignTab'
import MessagingTab from './CampaignDetailTabs/MessagingTab'
import CalendarTab from './CampaignDetailTabs/CalendarTab'

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

function CampaignDetailPage() {
    const { state } = useLocation();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    console.log("sattatay=",state.selectedItem)

    return (
        <Grid sx={{ position: "relative" }}>
            <MDBTypography
                component="div"
                height="500px"
                width="100%"
                top="0"
                sx={{
                    zIndex: -1,
                    position: "absolute",
                    background: "#111315"
                    //   background:
                    //     "linear-gradient(180deg, #363938 0%, rgba(54, 57, 56, 0.991353) 6.67%, rgba(54, 57, 56, 0.96449) 13.33%, rgba(54, 57, 56, 0.91834) 20%, rgba(54, 57, 56, 0.852589) 26.67%, rgba(54, 57, 56, 0.768225) 33.33%, rgba(54, 57, 56, 0.668116) 40%, rgba(54, 57, 56, 0.557309) 46.67%, rgba(54, 57, 56, 0.442691) 53.33%, rgba(54, 57, 56, 0.331884) 60%, rgba(54, 57, 56, 0.231775) 66.67%, rgba(54, 57, 56, 0.147411) 73.33%, rgba(54, 57, 56, 0.0816599) 80%, rgba(54, 57, 56, 0.03551) 86.67%, rgba(54, 57, 56, 0.0086472) 93.33%, rgba(54, 57, 56, 0) 100%);",
                }}
            />
            <Grid sx={{ position: "fixed", width: "100%", zIndex: 1200 }} bgcolor={"#111315"}>
                <Grid container>
                    <MDBCard
                        borderRadius="0"
                        bgcolor={"#111315"}
                        isBorder={false}
                        sx={{ m: 0, width: "100%", borderBottom: "1px solid rgba(255, 255, 255, 0.32)" }}>
                        <Grid sx={{ py: 1, px: 3, display: "flex" }}>
                            <Grid>
                                <Grid component={Link} to="/c/campaigns">
                                    {/* <MDBTypography component="img" py={1} src={BiaLogo} /> */}
                                    <MDBTypography>Campaigns</MDBTypography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </MDBCard>
                </Grid>
            </Grid>
            <Grid container sx={{ position: "relative", top: 118 }}>
                <Grid item sx={{ width: '80%', mx: 'auto', mt: '50px' }}>
                    <Grid item>
                        <List>
                            <ListItem
                                secondaryAction={
                                    <MDBButton
                                        variant="contained"
                                        size="small"
                                        bgColor="light_green"
                                        color="biaAssist"
                                        fontSize="md"
                                        fontWeight="bold"
                                        borderSize="md"
                                        sx={{ px: 3, py: 1.5, mr: 3 }}
                                        type="button"
                                    // onClick={handleNext}
                                    // disabled={isFormSubmit ? true : false}
                                    // isLoading={isFormSubmit}
                                    >Generate Invoice</MDBButton>
                                }
                                sx={{ marginBottom: '30px' }}
                            >
                                <ListItemAvatar >
                                <Avatar alt="Remy Sharp" src={Oura} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <MDBTypography style={{ fontSize: '20px', color: '#FFF', fontWeight: '500', fontStyle: 'normal', lineHeight: '24px' }}>{state.selectedItem.title}</MDBTypography>
                                    }
                                    secondary={<MDBTypography style={{ fontSize: '16px', color: '#D2D2D3', fontWeight: '400', fontStyle: 'normal', lineHeight: '24px' }}>View Full Profile</MDBTypography>}
                                />
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                        >
                            <Tab label="Campaign" {...a11yProps(0)} />
                            <Tab label="Messaging" {...a11yProps(1)} />
                            <Tab label="Calendar" {...a11yProps(2)} />
                        </Tabs>
                        <Divider sx={{ m: 0, mt: "-2px", height: "2px" }} />
                    </Grid>
                    <TabPanel value={value} index={0}>
                        {/* Campaign Tab */}
                        <CampaignTab selectedItemData={state.selectedItem}/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        {/* Messaging Tab */}
                        <MessagingTab />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        {/* Calendar Tab */}
                        <CalendarTab />
                    </TabPanel>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default CampaignDetailPage