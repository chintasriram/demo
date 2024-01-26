import React from 'react'
import { Divider, Grid, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material'
import MDBCard from "components/MDBCard";
import MDBTypography from "components/MDBTypography";
import { useWidth } from "components/Hooks/UseWidth"
import IconButton from '@mui/material/IconButton';
import WebIcon from 'assets/images/icons/Web.png'
import TikTokIcon from 'assets/images/icons/social/icons_large/tiktok.png'
import MDBButton from 'components/MDBButton'
import Tiktok from 'assets/images/icons/social/icons_large/tiktok.png'
import Instagram from 'assets/images/icons/social/icons_large/instagram.png'
import Youtube from 'assets/images/icons/social/icons_large/youtube.png';
import moment from "moment";

function CampaignTab(props) {

    console.log("selectedItemData=",props?.selectedItemData)
    const screenSize = useWidth()[0]
    return (
        <Grid container>
            <Grid item pr={{ sm: 0, xs: 0, md: 0, lg: 2, xl: 2, xxl: 2, el: 2 }} xs={12} sm={12} md={12} lg={8.8} xxl={9} el={10.55}>
                <MDBCard
                    bgcolor="supaLight"
                    sx={{ m: 0, width: "inherit", p: 0 }}
                >
                    <Grid container sx={{ px: screenSize === "xl" ? 2 : 3, pt: 3, width: "inherit" }}>
                        <MDBTypography
                            style={{ fontSize: '20px', color: '#FFF', fontWeight: '500', fontStyle: 'normal', lineHeight: '26px' }}
                        >{props?.selectedItemData?.title}</MDBTypography>
                        <MDBTypography
                            style={{ fontSize: '16px', color: '#83BF6E', fontWeight: '500', fontStyle: 'normal', lineHeight: '24px' }}
                        >${props?.selectedItemData?.price}</MDBTypography>

                        <Grid mt={3}>
                            <MDBTypography
                                style={{ fontSize: '16px', color: '#FFF', fontWeight: '500', fontStyle: 'normal', lineHeight: '24px' }}
                            >Description</MDBTypography>
                            <MDBTypography
                                style={{ fontSize: '14px', color: '#FFF', fontWeight: '400', fontStyle: 'normal', lineHeight: '22px', marginTop: '5px' }}
                            >{props?.selectedItemData?.description} </MDBTypography>
                        </Grid>
                        <Grid container justifyContent={'flex-start'} alignItems={'center'} gap={3} mt={3} mb={2}>
                            <Grid>
                                <MDBTypography
                                    style={{ fontSize: '14px', color: '#D2D2D3', fontWeight: '400' }}>
                                    Type: {props?.selectedItemData?.projectType}
                                </MDBTypography>
                            </Grid>
                            <Grid>
                                <MDBTypography
                                    style={{ fontSize: '14px', color: '#D2D2D3', fontWeight: '400' }}>
                                    Platforms: <MDBTypography component="img" src={props?.selectedItemData?.platform === "Tiktok" ? Tiktok : (props?.selectedItemData?.platform === "Youtube" ? Youtube : Instagram)} style={{ width: '15px' }} />
                                </MDBTypography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Divider />

                    <Grid container sx={{ px: screenSize === "xl" ? 2 : 3, pt: 3, width: "inherit" }}>
                        <Grid item sx={{ width: '100%' }} mb={2}>
                            <MDBTypography
                                style={{ fontSize: '16px', color: '#FFF', fontWeight: '500', fontStyle: 'normal', lineHeight: '24px' }}
                            >Milestones</MDBTypography>
                        </Grid>
                        <Grid item sx={{ width: '100%' }}>
                            <List>
                                {['Sponsored TikTok', 'Brand Tiktok', 'Brand Tiktok'].map((item, index) => {
                                    return (
                                        <React.Fragment>
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
                                                    >Submit Work</MDBButton>
                                                }
                                                sx={{ marginBottom: '30px' }}
                                            >
                                                <ListItemAvatar sx={{ minWidth: '25px' }}>
                                                    <MDBTypography style={{ fontSize: '16px', color: '#D2D2D3', fontWeight: '500', fontStyle: 'normal', lineHeight: '24px' }}>{index + 1}.</MDBTypography>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={
                                                        <MDBTypography style={{ fontSize: '16px', color: '#FFF', fontWeight: '500', fontStyle: 'normal', lineHeight: '24px' }}>{item}</MDBTypography>
                                                    }
                                                // secondary={secondary ? 'Secondary text' : null}
                                                />
                                            </ListItem>
                                            <Divider />
                                        </React.Fragment>
                                    )
                                })}
                            </List>
                        </Grid>
                    </Grid>

                </MDBCard>

                <MDBCard
                    bgcolor="supaLight"
                    sx={{ m: 0, width: "inherit", p: 0, mt: 3 }}
                >
                    <Grid container sx={{ px: screenSize === "xl" ? 2 : 3, pt: 3, width: "inherit" }}>
                    <MDBTypography
                            style={{ fontSize: '20px', color: '#FFF', fontWeight: '500', fontStyle: 'normal', lineHeight: '26px' }}
                        >Campaign Performance</MDBTypography>
                    </Grid>
                    <Divider />
                </MDBCard>

                <MDBCard
                    bgcolor="supaLight"
                    sx={{ m: 0, width: "inherit", p: 0, mt: 3 }}
                >
                    <Grid container sx={{ px: screenSize === "xl" ? 2 : 3, pt: 3, width: "inherit" }}>
                    <MDBTypography
                            style={{ fontSize: '20px', color: '#FFF', fontWeight: '500', fontStyle: 'normal', lineHeight: '26px' }}
                        >Documents</MDBTypography>
                    </Grid>
                    <Divider />
                </MDBCard>

            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={3.2} el={1.4} xxl={3}>
                <Grid container>
                    <Grid pb={2} xs={12} sm={12} md={12} lg={12} xxl={12} el={12}>
                        <MDBCard
                            bgcolor="supaLight"
                            sx={{ m: 0, px: screenSize === "xl" ? 2 : 3, pt: 3, pb: 3, width: "inherit" }}
                        >
                            <MDBTypography
                                style={{ fontSize: '14px', color: '#FFF', fontWeight: '400', fontStyle: 'normal', lineHeight: '22px' }}
                            >Due Date</MDBTypography>
                            <MDBTypography
                                style={{ fontSize: '24px', color: '#FFF', fontWeight: '500', fontStyle: 'normal', lineHeight: '32px' }}
                            >
                               {moment(props?.selectedItemData?.campaignDeadline).format('MMM D YYYY')}
                            </MDBTypography>
                            <Divider />
                            <Grid>
                                <MDBTypography
                                    style={{ fontSize: '16px', color: '#FFF', fontWeight: '600', fontStyle: 'normal', lineHeight: '24px' }}
                                    mb={2}>On deck</MDBTypography>
                                <List>
                                    {[1, 2, 3].map(item => {
                                        return (<ListItem
                                            secondaryAction={
                                                <MDBTypography style={{ fontSize: '14px', color: '#D2D2D3', fontWeight: '400', fontStyle: 'normal', lineHeight: '22px' }}>08/29/22</MDBTypography>
                                            }
                                            sx={{ marginBottom: '20px' }}
                                        >
                                            <ListItemAvatar sx={{ minWidth: '25px' }}>
                                                <Avatar src={WebIcon} sx={{ width: '20px', height: '20px' }}></Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={<MDBTypography style={{ fontSize: '14px', color: '#FFF', fontWeight: '400', fontStyle: 'normal', lineHeight: '22px' }}>Branded Video</MDBTypography>}
                                            // secondary={secondary ? 'Secondary text' : null}
                                            />
                                        </ListItem>)
                                    })}
                                </List>
                            </Grid>


                        </MDBCard>

                        <MDBCard
                            bgcolor="supaLight"
                            sx={{ m: 0, px: screenSize === "xl" ? 2 : 3, pt: 3, pb: 3, width: "inherit", mt: 3 }}
                        >
                            <MDBTypography
                                style={{ fontSize: '20px', color: '#FFF', fontWeight: '500', fontStyle: 'normal', lineHeight: '26px' }}
                            >Status</MDBTypography>

                            <Divider />
                            <Grid>

                            </Grid>


                        </MDBCard>

                        <MDBCard
                            bgcolor="supaLight"
                            sx={{ m: 0, px: screenSize === "xl" ? 2 : 3, pt: 3, pb: 3, width: "inherit", mt: 3 }}
                        >
                            <MDBTypography
                                style={{ fontSize: '20px', color: '#FFF', fontWeight: '500', fontStyle: 'normal', lineHeight: '26px' }}
                            >Details</MDBTypography>

                            <Divider />
                            <List>
                                {[1, 2].map(item => {
                                    return (<ListItem
                                        sx={{ marginBottom: '20px' }}
                                    >
                                        <ListItemAvatar sx={{ minWidth: '25px' }}>
                                            <Avatar src={WebIcon} sx={{ width: '20px', height: '20px' }}></Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={<MDBTypography style={{ fontSize: '14px', color: '#FFF', fontWeight: '400', fontStyle: 'normal', lineHeight: '22px' }}>View Contract</MDBTypography>}
                                        // secondary={secondary ? 'Secondary text' : null}
                                        />
                                    </ListItem>)
                                })}
                            </List>


                        </MDBCard>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default CampaignTab