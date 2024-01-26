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

function ReviewOpenCampaign() {

    const [openModal, setOpenModal] = useState(false)
    const [platformType, setPlatformType] = useState(false)

    const onEditCallback = () => {

    }

    const { state } = useLocation();
    console.log("sasa=",state?.data)
    console.log("state?.data.platform=",state?.data.platform)
    console.log("platformType=",typeof platformType)



    const handleStartCampaign = () => {
        setOpenModal(true);
    }

    const handleClosePopup = () => {
        setOpenModal(false);
      }

     const selectedPlatFormType = (value) => {
         let finalValue = "";
         if (value === "Instagram"){
             finalValue = Instagram;
         } else if (value === "Tiktok"){
                finalValue = Tiktok;
            } else if (value === "Youtube") {
                finalValue = Youtube;
            }
            setPlatformType(finalValue)
        }

    useEffect(() => {
       selectedPlatFormType(state?.data.platform)
    }, []);

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
                <Grid item sx={{ width: '50%', mx: 'auto', mt: '50px' }}>
                    <Grid container justifyContent={'flex-end'} alignContent={'center'} gap={0}>
                        <Grid item>
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
                                onClick={handleStartCampaign}>Start Campaign</MDBButton>
                        </Grid>
                        <Grid item>
                            <EditButtonGray callback={onEditCallback} />
                        </Grid>
                    </Grid>
                    <Grid container
                        sx={{ border: "1px solid #3B3D40", borderRadius: "12px", background: `#1C1F21` }} mt={2} p={3}>
                        <List sx={{ width: '100%', maxWidth: '100%' }}>
                            <ListItem alignItems="flex-start">
                                <ListItemSecondaryAction sx={{ top: '8%' }}>
                                    <Grid container justifyContent={'space-around'} alignItems={'center'} gap={1}>
                                        <Grid>
                                            <MDBTypography style={{ fontSize: '14px', fontWeight: '400' }}>Due Date: {moment(state?.data.campaignDeadline).format('MM-DD-YYYY')}</MDBTypography>
                                        </Grid>
                                    </Grid>
                                </ListItemSecondaryAction>
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src={Oura} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={state?.data.title}
                                    secondary={
                                        <React.Fragment>
                                            <MDBTypography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                // color="text.primary"
                                                style={{ fontSize: '14px', fontWeight: '400' }}
                                            >
                                                {state?.data.projectType}
                                            </MDBTypography>

                                        </React.Fragment>
                                    }
                                />

                            </ListItem>

                        </List>
                        <MDBTypography mt={2}>Description</MDBTypography>
                        <MDBTypography style={{ fontSize: '14px', color: '#D2D2D3', fontWeight: '400' }}>
                            {state?.data.description}
                            
                        </MDBTypography>
                        <MDBTypography mt={2}>Brand Requirements</MDBTypography>
                        <Grid container mt={2}>
                            <Grid pr={3}>
                                <MDBTypography
                                    fontWeight="small"
                                    lineHeightSize="xxl"
                                    style={{ fontSize: '14px', color: '#D2D2D3' }}
                                >
                                    Primary
                                </MDBTypography>
                                {/* state?.data.platform */}
                                <MDBTypography component="img" src={platformType} style={{ width: '20px', height: '20px', marginTop: '4px' }} />
                            </Grid>
                            <Divider orientation='vertical' />
                            <Grid px={3}>
                                <MDBTypography
                                    fontWeight="small"
                                    fontSize="sx"
                                    lineHeightSize="xxl"
                                    style={{ fontSize: '14px', color: '#D2D2D3' }}
                                >
                                    Total Reach
                                </MDBTypography>
                                <MDBTypography
                                    style={{ fontSize: '16px', color: '#FFFFFF', fontWeight: '500', marginTop: '4px' }}>{state?.data.totalReach}</MDBTypography>
                            </Grid>
                            <Divider orientation='vertical' />
                            <Grid px={3}>
                                <MDBTypography fontWeight="small"
                                    fontSize="sx"
                                    lineHeightSize="xxl"
                                    style={{ fontSize: '14px', color: '#D2D2D3' }}
                                >
                                    Audience Gender
                                </MDBTypography>
                                <MDBTypography style={{ fontSize: '16px', color: '#FFFFFF', fontWeight: '500', marginTop: '4px' }}>{state?.data.AudienceGender}</MDBTypography>
                            </Grid>
                            <Divider orientation='vertical' />
                            <Grid px={3}>
                                <MDBTypography fontWeight="small"
                                    fontSize="sx"
                                    lineHeightSize="xxl"
                                    style={{ fontSize: '14px', color: '#D2D2D3' }}
                                >
                                    Geography
                                </MDBTypography>
                                <MDBTypography style={{ fontSize: '16px', color: '#FFFFFF', fontWeight: '500', marginTop: '4px' }}>{state?.data.geography}</MDBTypography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container
                        sx={{ border: "1px solid #3B3D40", borderRadius: "12px", background: `#1C1F21` }} mt={2}>
                        <Grid sx={{ width: '100%', borderBottom: '1px solid #3B3D40' }} p={3}>
                            <MDBTypography>Contract</MDBTypography>
                            <MDBTypography style={{ fontSize: '14px', color: '#D2D2D3', fontWeight: '400' }}>This can be added to later.</MDBTypography>
                        </Grid>
                        <Grid sx={{ width: '100%' }} p={3}>
                            <MDBButton
                                variant="contained"
                                size="small"
                                bgColor="light_green"
                                color="biaAssist"
                                fontSize="md"
                                fontWeight="bold"
                                borderSize="md"
                                sx={{ px: 3, py: 1.5, mr: 3 }}
                                type="button">Create Contract</MDBButton>
                        </Grid>
                    </Grid>
                    <Grid container
                        sx={{ border: "1px solid #3B3D40", borderRadius: "12px", background: `#1C1F21` }} mt={2}>
                        <Grid sx={{ width: '100%', borderBottom: '1px solid #3B3D40' }} p={3}>
                            <MDBTypography>Documents</MDBTypography>
                        </Grid>
                        <Divider orientation='horizontal' />
                        <Grid sx={{ width: '100%' }} p={3}>
                            <MDBButton
                                variant="contained"
                                size="small"
                                bgColor="light_green"
                                color="biaAssist"
                                fontSize="md"
                                fontWeight="bold"
                                borderSize="md"
                                sx={{ px: 3, py: 1.5, mr: 3 }}
                                type="button">Add File</MDBButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Modal open={openModal} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Grid container
                    alignContent="center"
                    justifyContent="center"
                    style={{ minHeight: '100vh' }} p="5" m={'auto'}>
                    <Grid
                        item
                        xs={0.5}
                        sm={0.5}
                        md={2}
                        lg={3}
                        xl={3}
                        xxl={3.75}
                        xel={4}
                        xxel={4.75}
                        el={5}
                    />
                    <Grid
                        item
                        xs={11}
                        sm={11}
                        md={8}
                        lg={6}
                        xl={5.32}
                        xxl={4.5}
                        xel={3.5}
                        xxel={2.5}
                        el={2}
                    >
                        <MDBCard sx={{ p: 5, mx: 'auto', my: 10, width: "inherit", textAlign: 'center' }} justifyContent={'center'} alignContent={'center'}>
                            <Grid sx={{ width: '100%' }} mb={2}>
                                {/* <MDAvatar sx={{ border: "1px solid #8A8F93" }} size="md">
                                    <MDBButton
                                        variant="contained"
                                        bgColor="transparent"
                                        padding="0"
                                    >
                                        <MDBox
                                            component="img"
                                            src={Tik}
                                            sx={{ widht: '40px' }}
                                        />
                                    </MDBButton>
                                </MDAvatar> */}
                            </Grid>
                            <Grid item>
                            <CloseButton color={"#fff"} callback={handleClosePopup} />
                            </Grid>
                            <Grid sx={{ width: '100%' }} mb={2}>
                                <MDBTypography>Campaign Started</MDBTypography>
                            </Grid>
                            
                            <Grid sx={{ width: '100%' }} mb={2}>
                                <MDBTypography style={{ fontSize: '14px', color: '#D2D2D3', fontWeight: '400' }}>Start inviting creators to your campaign</MDBTypography>
                            </Grid>
                            <Grid sx={{ width: '100%' }} mb={2}>
                                <MDBButton
                                    component={Link}
                                    variant="contained"
                                    size="small"
                                    bgColor="light_green"
                                    color="biaAssist"
                                    fontSize="md"
                                    fontWeight="bold"
                                    borderSize="md"
                                    sx={{ px: 3, py: 1.5, mr: 3 }}
                                    to="/c/marketplace">Go to MarketPlace</MDBButton>
                            </Grid>
                        </MDBCard>
                    </Grid>
                    <Grid
                        item
                        xs={0.5}
                        sm={0.5}
                        md={2}
                        lg={3}
                        xl={3}
                        xxl={3.75}
                        xel={4}
                        xxel={4.75}
                        el={5}
                    />
                </Grid>
            </Modal>
        </Grid>
    )
}

export default ReviewOpenCampaign