import {
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Select,
    MenuItem,
    Chip,
    Stack
} from "@mui/material";
import MDBButton from 'components/MDBButton'
import MDBCard from 'components/MDBCard'
import MDBTypography from 'components/MDBTypography'
import React, { useState, useEffect } from 'react'
import CloseButton from 'components/CloseButton'
import MDBInput from 'components/MDBInput'
import DetailsBackground from 'assets/images/ImagesSvg/DetailsBackground.svg'
import ProfilePic from 'assets/images/ProfilePic.jpeg'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Tiktok from 'assets/images/icons/social/icons_large/tiktok.png'
import Instagram from 'assets/images/icons/social/icons_large/instagram.png'
import Youtube from 'assets/images/icons/social/icons_large/youtube.png'
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";
import httpService from "service/HttpService"

function InfluencerDetails(props) {
    // console.log("selectedItem=",selectedItem)

  const [selectedData, setSelectedData] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState([]);

  const handleCampaignDetails = () => {
    httpService
    .getCampaignById(props?.selectedDetailsInfo?.id)
    .then((res) => {
      console.log("cameeeeee=",res)
      setSelectedData(res.data.data);
      if(res.data.data.platform === "Youtube"){
        setSelectedPlatform(Youtube)
      } else if (res.data.data.platform === "Instagram") {
        setSelectedPlatform(Instagram)
      } else if (res.data.data.platform === "Tiktok"){
        setSelectedPlatform(Tiktok)
      }
    });
  }
//   console.log("selectedPlatoform=",typeof selectedPlatform.replaceAll("", ""))

    useEffect(() => {
        handleCampaignDetails();
    }, []); 

    console.log("propsssss=",props)
    let history = useNavigate()

    const handleViewProfile = () => {
        props.onCloseCallback();
        history("/c/marketplace/details", { state: { userId: props?.selectedDetailsInfo?.userId } });
        // history(`/c/marketplace/details/{"props.selectedDetailsInfo.id"}`)
    }
    return (
        <Grid container
            alignContent="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
        >
            <Grid
                item
                // xs={0.5}
                // sm={0.5}
                md={2}
            // lg={3}
            // xl={3}
            // xxl={3.75}
            // xel={4}
            // xxel={4.75}
            // el={5}
            />
            <Grid
                item
                // xs={11}
                // sm={11}
                md={8}
            // lg={6}
            // xl={5.32}
            // xxl={4.5}
            // xel={3.5}
            // xxel={2.5}
            // el={2}

            >
                <MDBCard sx={{ p: 0, mx: 0, my: 10, width: "inherit" }} style={{ height: '600px', overflow: 'auto' }} >
                    <MDBTypography
                        component="img"
                        src={DetailsBackground}
                        // height={{ md: "480px", lg: "480px", xs: "326px", sm: "326px" }}
                        width="100%"
                        top="0"
                        sx={{ position: "relative" }}
                        style={{ objectFit: "cover" }}
                    />
                    <MDBTypography
                        component="div"
                        width="100%"
                        sx={{ position: 'relative', top: '-125px', background: "linear-gradient(0deg, #1C1F21 0%, rgba(17, 19, 21, 0.00) 100%)" }}
                        height={{ md: "120px", lg: "120px", xs: "80px", sm: '80px' }}
                    />
                    <Grid container sx={{ px: 2.5, py: 3, position: 'relative', top: '-320px' }} justifyContent="space-between">
                        <Grid item>

                        </Grid>
                        <Grid item>
                            <CloseButton color={"#fff"} callback={props?.onCloseCallback} />
                        </Grid>
                    </Grid>
                    <Grid container sx={{ padding: '40px', position: 'relative', top: '-300px', bottom: '-300px' }}>
                        <Grid item pr={{ sm: 0, xs: 0, md: 0, lg: 2, xl: 2, xxl: 2, el: 2 }} xs={12} sm={12} md={12} lg={8.8} xxl={9} el={10.55}>
                            <MDBTypography
                                component="img"
                                src={ProfilePic}
                                sx={{ width: '104px', height: '104px' }}
                            />
                            <MDBTypography
                                style={{ fontSize: '32px', color: '#FFF', fontWeight: '500', fontStyle: 'normal', letterSpacing: '-0.32px' }}
                            >{selectedData?.title}</MDBTypography>
                            <MDBTypography
                                style={{ fontSize: '16px', color: '#D2D2D3', fontWeight: '400', fontStyle: 'normal', lineHeight: '24px' }}>
                                {selectedData?.description}
                            </MDBTypography>
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
                            <Grid container
                                sx={{
                                    border: "1px solid #3B3D40",
                                    borderRadius: "12px", background: `#1C1F21`,
                                    padding: "24px",
                                    marginTop: '20px'
                                }}>
                                <List sx={{ width: '100%', maxWidth: '100%' }}>
                                    <ListItem alignItems="flex-start"
                                    >
                                        <ListItemText
                                            primary="Brand Requirements"
                                            secondary={
                                                <React.Fragment>
                                                    <MDBTypography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="body2"
                                                        // color="text.primary"
                                                        style={{ fontSize: '14px', fontWeight: '400' }}
                                                    >
                                                        {selectedData?.brandName}
                                                    </MDBTypography>

                                                    <Grid container mt={2}>
                                                        <Grid pr={2}>
                                                            <MDBTypography
                                                                fontWeight="small"
                                                                lineHeightSize="xxl"
                                                                style={{ fontSize: '14px', color: '#D2D2D3' }}
                                                            >
                                                                Primary
                                                            </MDBTypography>
                                                            <MDBTypography component="img" src={selectedPlatform} style={{ width: '20px', height: '20px', marginTop: '4px' }} />
                                                        </Grid>
                                                        <Divider orientation='vertical' />
                                                        <Grid px={2}>
                                                            <MDBTypography
                                                                fontWeight="small"
                                                                fontSize="sx"
                                                                lineHeightSize="xxl"
                                                                style={{ fontSize: '14px', color: '#D2D2D3' }}
                                                            >
                                                                Total Reach
                                                            </MDBTypography>
                                                            <MDBTypography
                                                                style={{ fontSize: '20px', color: '#FFFFFF', fontWeight: '500', marginTop: '4px' }}>{selectedData?.totalReach}</MDBTypography>
                                                        </Grid>
                                                        <Divider orientation='vertical' />
                                                        <Grid px={2}>
                                                            <MDBTypography fontWeight="small"
                                                                fontSize="sx"
                                                                lineHeightSize="xxl"
                                                                style={{ fontSize: '14px', color: '#D2D2D3' }}
                                                            >
                                                                Audience Gender
                                                            </MDBTypography>
                                                            <MDBTypography style={{ fontSize: '20px', color: '#FFFFFF', fontWeight: '500', marginTop: '4px' }}>{selectedData?.audienceGender}</MDBTypography>
                                                        </Grid>
                                                        <Divider orientation='vertical' />
                                                        <Grid px={2}>
                                                            <MDBTypography fontWeight="small"
                                                                fontSize="sx"
                                                                lineHeightSize="xxl"
                                                                style={{ fontSize: '14px', color: '#D2D2D3' }}
                                                            >
                                                                Geography
                                                            </MDBTypography>
                                                            <MDBTypography style={{ fontSize: '20px', color: '#FFFFFF', fontWeight: '500', marginTop: '4px' }}>{selectedData?.geography}</MDBTypography>
                                                        </Grid>
                                                    </Grid>
                                                </React.Fragment>
                                            }
                                        />

                                    </ListItem>

                                </List>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={3.2} el={1.4} xxl={3}>
                            <Grid container
                                sx={{
                                    border: "1px solid #404344",
                                    borderRadius: "12px", background: `#111315`,
                                    padding: "24px",
                                }}>
                                <MDBTypography
                                    style={{ fontSize: '16px', color: '#FFF', fontWeight: '500', fontStyle: 'normal', lineHeight: '24px' }}>Open Campaigns</MDBTypography>
                               
                            </Grid>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                        sx={{ mb: 3 }}
                    >
                        <Grid item>
                            <MDBButton
                                variant="outlined"
                                size="small"
                                bgColor="black"
                                color="white"
                                fontSize="md"
                                fontWeight="medium"
                                borderSize="md"
                                sx={{ px: 3, py: 1.5, mr: 1 }}
                                onClick={handleViewProfile}
                            >
                                View Full Profile
                            </MDBButton>
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
                </MDBCard>
            </Grid>
            <Grid
                item
                // xs={0.5}
                // sm={0.5}
                md={2}
            // lg={3}
            // xl={3}
            // xxl={3.75}
            // xel={4}
            // xxel={4.75}
            // el={5}
            />
        </Grid>
    )
}

export default InfluencerDetails