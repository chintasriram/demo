import React, { useEffect, useState } from 'react'
import { Divider, Grid, List, ListItem, ListItemText, ListItemAvatar, Avatar, ListItemSecondaryAction, Chip, Stack } from '@mui/material'
import MDBCard from "components/MDBCard";
import MDBTypography from "components/MDBTypography";
import DetailsBackground from 'assets/images/ImagesSvg/DetailsBackground.svg'
import { useWidth } from "components/Hooks/UseWidth"
import TikTokIcon from 'assets/images/icons/social/icons_large/tiktok.png'
import WebIcon from 'assets/images/icons/Web.png'
import ApparelIcon from 'assets/images/icons/apparel.png'
import ProfilePic from 'assets/images/ProfilePic.jpeg'
import MDBButton from 'components/MDBButton'
// import InstagramBlackIcon from 'assets/images/icons/social/icons_large/instagram-black.png'
import Tiktok from 'assets/images/icons/social/icons_large/tiktok.png'
import Instagram from 'assets/images/icons/social/icons_large/instagram.png'
import Youtube from 'assets/images/icons/social/icons_large/youtube.png'
import { useLocation } from 'react-router-dom';
import httpService from "service/HttpService";

function InfluencerFullDetails() {
    const { state } = useLocation();
    const [ fullDetailsInfo, setFullDetailsInfo ] = useState([]);
    const [ selectedCampaignDetails, setSelectedCampaignDetails ] = useState([]);
    console.log("statttt=",state.userId)

    const handleCampaignFullDetails = () => {
    httpService
    .getCampaignFullDetailsById(state.userId)
    .then((res) => {
      console.log("cameeeeee=",res)
      setFullDetailsInfo(res.data.data);
    });
    }

    console.log("fullDetailsInfo=",fullDetailsInfo)

    useEffect(() => {
        handleCampaignFullDetails();
    }, []); 

    const screenSize = useWidth()[0]

    const handleSelectedItem = (item) => {
        console.log("Chanti=",item)
        setSelectedCampaignDetails(item)
    }
    return (
        <Grid pt={5} pl={5.25} pr={5} pb={5}>
            <Grid container>
                <MDBCard
                    sx={{ m: 0, mb: 2, p: 0, width: "inherit" }}
                    bgcolor={"cardBg"}
                >
                    <MDBTypography
                        component="img"
                        src={DetailsBackground}
                        width="100%"
                    />
                    <Grid
                        container
                        sx={{ height: "auto", borderRadius: "0 0 12px 12px", padding: "24px 40px 40px" }}

                    >
                        <List sx={{ width: '100%', maxWidth: '100%' }}>
                            <ListItem alignItems="flex-start"
                            >
                                <ListItemSecondaryAction sx={{ top: '8%' }}>
                                    <Grid container justifyContent={'space-around'} alignItems={'center'} gap={1}>
                                        <Grid>
                                            <MDBButton
                                                variant="contained"
                                                size="small"
                                                bgColor="light_green"
                                                color="biaAssist"
                                                fontSize="md"
                                                fontWeight="bold"
                                                borderSize="md"
                                                sx={{ px: 3, py: 1.5, mr: 3 }}
                                                type="submit"
                                            // onClick={handleNext}
                                            // disabled={isFormSubmit ? true : false}
                                            // isLoading={isFormSubmit}
                                            >Send Proposal</MDBButton>
                                        </Grid>
                                    </Grid>
                                </ListItemSecondaryAction>
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src={ProfilePic} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Akram"
                                    secondary={
                                        <React.Fragment>
                                            <Grid container justifyContent={'flex-start'} alignItems={'center'} gap={3} mt={3} mb={2}>
                                                <Grid>
                                                    <MDBTypography
                                                        style={{ fontSize: '14px', color: '#D2D2D3', fontWeight: '400' }}>
                                                        <MDBTypography component="img" src={ApparelIcon} style={{ width: '15px' }} /> Apparel
                                                    </MDBTypography>
                                                </Grid>
                                                <Grid>
                                                    <MDBTypography
                                                        style={{ fontSize: '14px', color: '#D2D2D3', fontWeight: '400' }}>
                                                        <MDBTypography component="img" src={WebIcon} style={{ width: '15px' }} /> New York
                                                    </MDBTypography>
                                                </Grid>
                                            </Grid>
                                            <Stack direction="row" spacing={1}>
                                                <Chip
                                                    label="Paid"
                                                    clickable
                                                />
                                                <Chip
                                                    label="Events"
                                                    clickable
                                                />
                                            </Stack>
                                            <MDBTypography
                                                style={{ fontSize: '14px', color: '#D2D2D3', fontWeight: '400' }} mt={3}>
                                                Hey we’re Akram , a menswear brand blending east and west by<br /> incorporating eastern influences with NYC staples.
                                            </MDBTypography>
                                        </React.Fragment>
                                    }
                                />

                            </ListItem>

                        </List>
                    </Grid>
                </MDBCard>
            </Grid>
            <Grid container>
                <Grid item pr={{ sm: 0, xs: 0, md: 0, lg: 2, xl: 2, xxl: 2, el: 2 }} xs={12} sm={12} md={12} lg={8.8} xxl={9} el={10.55}>
                    <MDBCard
                        sx={{ m: 0, mb: 2, p: 5, width: "inherit" }}
                        bgcolor={"cardBg"}
                    >
                        <Grid mb={5}>
                            <MDBTypography
                                style={{ fontSize: '20px', color: '#FFF', fontWeight: '500', lineHeight: '26px' }}
                            >
                                Open Campaigns
                            </MDBTypography>
                        </Grid>
                        {
                            fullDetailsInfo.map((item) => {
                                return (
                                    <React.Fragment>
                                        <List sx={{ width: '100%', maxWidth: '100%' }} my={2} onClick = {() => handleSelectedItem(item)}>
                                            <ListItem alignItems="flex-start"
                                            >
                                                <ListItemSecondaryAction sx={{ top: '8%' }}>
                                                    <Grid container justifyContent={'space-around'} alignItems={'center'} gap={1}>
                                                        <Grid>
                                                            <MDBButton
                                                                variant="contained"
                                                                size="small"
                                                                bgColor="light_green"
                                                                color="biaAssist"
                                                                fontSize="md"
                                                                fontWeight="bold"
                                                                borderSize="md"
                                                                sx={{ px: 3, py: 1.5, mr: 3 }}
                                                                type="submit"
                                                            // onClick={handleNext}
                                                            // disabled={isFormSubmit ? true : false}
                                                            // isLoading={isFormSubmit}
                                                            >Apply</MDBButton>
                                                        </Grid>
                                                    </Grid>
                                                </ListItemSecondaryAction>
                                                <ListItemAvatar>
                                                    <Avatar alt="Remy Sharp" src={item?.platform === "Tiktok" ? Tiktok : (item?.platform === "Youtube" ? Youtube : Instagram)} />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={item?.title}
                                                    secondary={
                                                        <React.Fragment>
                                                            <MDBTypography
                                                                style={{ fontSize: '14px', color: '#D2D2D3', fontWeight: '400' }} mt={3}>
                                                                {item?.description}
                                                            </MDBTypography>
                                                        </React.Fragment>
                                                    }
                                                />

                                            </ListItem>

                                        </List>
                                        <Divider />
                                    </React.Fragment>
                                )
                            })
                        }

                    </MDBCard>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={3.2} el={1.4} xxl={3}>
                    <Grid container>
                        <Grid pb={2} xs={12} sm={12} md={12} lg={12} xxl={12} el={12}>
                            <MDBCard
                                bgcolor="supaLight"
                                sx={{ m: 0, px: screenSize === "xl" ? 2 : 3, pt: 3, pb: 5, width: "inherit" }}
                            >
                                <MDBTypography
                                    style={{ fontSize: '20px', color: '#FFF', fontWeight: '500', fontStyle: 'normal', letterSpacing: '-0.2px', lineHeight: '26px' }}
                                >Brand Requirements</MDBTypography>
                                <MDBTypography
                                    style={{ fontSize: '14px', color: '#FFF', fontWeight: '400', fontStyle: 'normal', lineHeight: '22px' }}
                                >
                                    {selectedCampaignDetails?.description}
                                </MDBTypography>
                                <Grid mt={5}>
                                    <MDBTypography
                                        style={{ fontSize: '14px', color: '#FFF', fontWeight: '400', fontStyle: 'normal', lineHeight: '22px' }}
                                    >Primary</MDBTypography>
                                    <MDBTypography component="img" src={selectedCampaignDetails?.platform === "Tiktok" ? Tiktok : (selectedCampaignDetails?.platform === "Youtube" ? Youtube : Instagram)} style={{ width: '18px', height: '18px', marginTop: '4px' }} />
                                </Grid>
                                <Divider />
                                <Grid>
                                    <MDBTypography
                                        style={{ fontSize: '14px', color: '#FFF', fontWeight: '400', fontStyle: 'normal', lineHeight: '22px' }}
                                    >Total Reach</MDBTypography>
                                    <MDBTypography
                                        style={{ fontSize: '16px', color: '#FFFFFF', fontWeight: '500', marginTop: '4px' }}>{selectedCampaignDetails?.totalReach}</MDBTypography>
                                </Grid>
                                <Divider />
                                <Grid>
                                    <MDBTypography
                                        style={{ fontSize: '14px', color: '#FFF', fontWeight: '400', fontStyle: 'normal', lineHeight: '22px' }}
                                    >Audience Gender</MDBTypography>
                                    <MDBTypography style={{ fontSize: '16px', color: '#FFFFFF', fontWeight: '500', marginTop: '4px' }}>{selectedCampaignDetails?.audienceGender}</MDBTypography>
                                </Grid>
                                <Divider />
                                <Grid>
                                    <MDBTypography
                                        style={{ fontSize: '14px', color: '#FFF', fontWeight: '400', fontStyle: 'normal', lineHeight: '22px' }}
                                    >Geography</MDBTypography>
                                    <MDBTypography style={{ fontSize: '16px', color: '#FFFFFF', fontWeight: '500', marginTop: '4px' }}>{selectedCampaignDetails?.geography}</MDBTypography>
                                </Grid>
                                <Grid container justifyContent={'space-between'} sx={{ background: '#111315', borderRadius: '12px', padding: '12px 16px' }} mt={3}>
                                    <Grid item md={6}>
                                        <MDBTypography style={{ fontSize: '16px', color: '#FFFFFF', fontWeight: '400' }}>Avg per Gift</MDBTypography>
                                        <MDBTypography style={{ fontSize: '16px', color: '#FFFFFF', fontWeight: '500' }}>2 items</MDBTypography>
                                    </Grid>
                                    <Grid item md={6}>
                                        <MDBTypography style={{ fontSize: '16px', color: '#FFFFFF', fontWeight: '400' }}>Avg per Post</MDBTypography>
                                        <MDBTypography style={{ fontSize: '16px', color: '#FFFFFF', fontWeight: '500' }}>{selectedCampaignDetails?.avgPrice}</MDBTypography>
                                    </Grid>
                                </Grid>
                            </MDBCard>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

    )
}

export default InfluencerFullDetails