import { Grid, Modal } from '@mui/material';
import React, { useState, useEffect } from 'react'
import Oura from 'assets/images/icons/Oura.png'
import ActiveCampaign1 from 'assets/images/ImagesSvg/ActiveCampaign1.svg'
import MDBTypography from 'components/MDBTypography';
import MDBInput from "components/MDBInput";
import MDBButton from 'components/MDBButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import TikTokIcon from 'assets/images/icons/social/icons_large/tiktok.png'
import ChatIcon from 'assets/images/icons/Chat_Icon.png'
import CalenderIcon from 'assets/images/icons/Calendar_Icon.png'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link, useNavigate } from 'react-router-dom'
import CreateOpenCampaign from './CreateOpenCampaign';
import httpService from "service/HttpService";
import Tiktok from 'assets/images/icons/social/icons_large/tiktok.png'
import Instagram from 'assets/images/icons/social/icons_large/instagram.png'
import Youtube from 'assets/images/icons/social/icons_large/youtube.png'
import moment from "moment";



function ActiveCampaigns(props) {
  const [proposals, setProposals] = useState([1,2]);
  const [openPopup, setOpenPopup] = useState(false)

  const getUserFromSession = () => {
    if(window.localStorage.getItem("user")){
    let userInfo = JSON.parse(window.localStorage.getItem("user"));
    return userInfo;
    }
    return null;
};
  let user = getUserFromSession();

  const handleCampaignFullDetails = () => {
    httpService
    .getCampaignFullDetailsById(user?.id)
    .then((res) => {
      console.log("cameeeeee11=",res)
      setProposals(res.data.data);
    });
    }

    console.log("proposals=",proposals)

    useEffect(() => {
      handleCampaignFullDetails();
    }, []); 

  const history = useNavigate()

  console.log("test666=",props)

  const handleCreateOpenCamp = () => {
    // setProposals(true)
    setOpenPopup(true)
  }

  const handleClosePopup = () => {
    setOpenPopup(false)
  }

  const handleCampaignClick = (item) => {
    history("/c/campaigns/details", { state: { selectedItem: item } });
    // history("/c/marketplace/details", { state: { userId: props?.selectedDetailsInfo?.userId } });
  }

  return (

    <Grid>
      <Grid container
        sx={{
          height: "242px", border: props?.isHome === true ? "none" : "1px solid #3B3D40",
          borderRadius: "12px", background: `#1C1F21`, backgroundRepeat: "no-repeat", backgroundSize: "cover"
        }}>
        <Grid item md={8}>
          <Grid px={3} pt={3} pb={3}>
            <MDBTypography
              color="white"
              fontWeight="medium"
              fontSize="xl"
              lineHeightSize="2xxl"
              // textTransform="capitalize"
              // px={3}
              pb={1}
            >
              Manage all your campaigns <br/>in one place.
            </MDBTypography>
            <MDBTypography
              color="grayScale"
              fontWeight="small"
              fontSize="md"
              lineHeightSize="xxl"
              // px={3}
              // pt={3}
              pb={1}
            >
              Once a proposal is accepted, it’s automatically<br/> transferred here.
            </MDBTypography>
            {window.localStorage.getItem("toggleSelected") === "brand" && <MDBButton
              type="button"
              variant="contained"
              size="small"
              bgColor="light_green"
              color="biaAssist"
              fontSize="md"
              fontWeight="bold"
              borderSize="lg"
              sx={{ px: 3, py: 1.6, mr: 2 }}
              onClick={handleCreateOpenCamp}
            >
              Create Open Campaign
            </MDBButton>}
            <MDBButton
              component={Link}
              to="/c/proposals"
              variant="outlined"
              size="large"
              bgColor="black"
              color=""
              fontSize="md"
              fontWeight="bold"
              borderSize="lg"
              sx={{ px: 3, py: 1.3, ml: 1 }}
            >
              Go to Proposals
            </MDBButton>
            <Modal 
            open={openPopup}
            onClose={handleClosePopup}
            style={{display:'flex',alignItems:'center',justifyContent:'center'}}
            >
              <CreateOpenCampaign onCloseCallback={handleClosePopup} props={props}/>
            </Modal>
          </Grid>
        </Grid>
        <Grid item md={4}>
          <MDBTypography
            component="img"
            src={ActiveCampaign1}
            style={{ width: '100%', borderTopRightRadius: '12px', borderBottomRightRadius: '12px' }}
          />
        </Grid>
      </Grid> 
      {/* : */}
      <Grid container
        sx={{
          border: props?.isHome === true ? "none" : "1px solid #3B3D40",
          borderRadius: "12px", background: `#1C1F21`
        }}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Grid container justifyContent={'space-between'} alignItems={'flex-start'} alignSelf={'stretch'} px={3} py={3} borderBottom={'1px solid #8A8F93'}>
                <Grid item xs={6} sm={6} md={6} lg={6} justifyContent={'left'}>
                  <MDBInput
                    type="text"
                    icon="search"
                    placeholder="Search Brand"
                    name="search"
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} justifyContent={'right'}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      // value={10}
                      label="Age"
                    // onChange={handleChange}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              {proposals.map((item) => {
                return (

                
              <Grid container justifyContent={'space-between'} alignItems={'flex-start'} alignSelf={'stretch'} px={3} py={3}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <List sx={{ width: '100%', maxWidth: '100%', cursor: 'pointer' }} onClick={() => handleCampaignClick(item)}>
                    <ListItem alignItems="flex-start"
                    >
                      <ListItemSecondaryAction sx={{ top: '10%' }}>
                        <Grid container justifyContent={'space-around'} alignItems={'center'} gap={1}>
                          <Grid>
                            <MDBTypography component="img" src={ChatIcon} />
                          </Grid>
                          <Grid>
                            <MDBTypography style={{ width: '20px', height: '20px', background: '#FE6955', fontSize: '14px', fontWeight: '400', borderRadius: '50%', textAlign: 'center' }}>2</MDBTypography>
                          </Grid>
                          <Grid>
                            <MDBTypography component="img" src={CalenderIcon} />
                          </Grid>
                          <Grid>
                            <MDBTypography style={{ fontSize: '14px', fontWeight: '400' }}>Due Date {moment(item.campaignDeadline).format('MM-DD-YYYY')}</MDBTypography>
                          </Grid>
                        </Grid>
                      </ListItemSecondaryAction>
                      <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={Oura} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={item?.title}
                        secondary={
                          <React.Fragment>
                            <MDBTypography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              // color="text.primary"
                              style={{ fontSize: '14px', fontWeight: '400' }}
                            >
                              {item?.description}

                            </MDBTypography>
                            <MDBTypography
                              style={{ fontSize: '14px', color: '#D2D2D3', fontWeight: '400' }}>
                              {item?.projectType}
                            </MDBTypography>
                            <Grid container mt={2}>
                              <Grid pr={2}>
                                <MDBTypography
                                  fontWeight="small"
                                  lineHeightSize="xxl"
                                  style={{ fontSize: '14px', color: '#D2D2D3' }}
                                >
                                  Platforms
                                </MDBTypography>
                                <MDBTypography component="img" src={item?.platform === "Tiktok" ? Tiktok : (item?.platform === "Youtube" ? Youtube : Instagram)} style={{ width: '20px', height: '20px', marginTop: '4px' }} />
                              </Grid>
                              <Divider orientation='vertical' />
                              <Grid px={2}>
                                <MDBTypography
                                  fontWeight="small"
                                  fontSize="sx"
                                  lineHeightSize="xxl"
                                  style={{ fontSize: '14px', color: '#D2D2D3' }}
                                >
                                  Total Followers
                                </MDBTypography>
                                <MDBTypography
                                  style={{ fontSize: '20px', color: '#FFFFFF', fontWeight: '500', marginTop: '4px' }}>2.8M</MDBTypography>
                              </Grid>
                              <Divider orientation='vertical' />
                              <Grid px={2}>
                                <MDBTypography fontWeight="small"
                                  fontSize="sx"
                                  lineHeightSize="xxl"
                                  style={{ fontSize: '14px', color: '#D2D2D3' }}
                                >
                                  Views
                                </MDBTypography>
                                <MDBTypography style={{ fontSize: '20px', color: '#FFFFFF', fontWeight: '500', marginTop: '4px' }}>15,000</MDBTypography>
                              </Grid>
                              <Divider orientation='vertical' />
                              <Grid px={2}>
                                <MDBTypography fontWeight="small"
                                  fontSize="sx"
                                  lineHeightSize="xxl"
                                  style={{ fontSize: '14px', color: '#D2D2D3' }}
                                >
                                  Engagement
                                </MDBTypography>
                                <MDBTypography style={{ fontSize: '20px', color: '#FFFFFF', fontWeight: '500', marginTop: '4px' }}>1.9%</MDBTypography>
                              </Grid>
                              <Divider orientation='vertical' />
                              <Grid px={2}>
                                <MDBTypography
                                  fontWeight="small"
                                  fontSize="sx"
                                  lineHeightSize="xxl"
                                  style={{ fontSize: '14px', color: '#D2D2D3' }}
                                >
                                  Click-through rate
                                </MDBTypography>
                                <MDBTypography style={{ fontSize: '20px', color: '#FFFFFF', fontWeight: '500', marginTop: '4px' }}>0.6%</MDBTypography>
                              </Grid>
                            </Grid>
                          </React.Fragment>
                        }
                      />

                    </ListItem>

                  </List>
                </Grid>
              </Grid>)})}
            </Grid>
          </Grid>
        </Grid>
        </Grid>
      </Grid>


  )
}

export default ActiveCampaigns;