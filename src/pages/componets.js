import { Grid, Modal } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MDBButton from 'components/MDBButton';
import MDBTypography from 'components/MDBTypography';
import CreatorStats from './CreatorStats';
import YourFocus from 'components/YourFocus';
import Earnings from 'components/Earnings';
import GoalProgress from 'appcomponents/GoalProgress';
import MessageIcon from "assets/images/icons/svg/medium/YourFocusMessageIcon.svg"
import CampaignIcon from "assets/images/icons/svg/medium/YourFocusCampaignIcon.svg"
import PlannerIcon from "assets/images/icons/svg/medium/YourFocusPlanningIcon.svg"
import EyeIcon from '../assets/images/icons/svg/medium/EyeIcon.svg'
import ShareIcon from '../assets/images/icons/svg/medium/ShareIcon.svg'
import TabbedMenu from 'appcomponents/Proposals/TabMenu/TabbedMenu';
import MiniCalendar from './Planner/MiniCalendar';
import ResponsiveText from 'appcomponents/ResponsiveText';
import httpService from 'service/HttpService';
import SharePopover from './SharePopover';
import { useNavigate } from 'react-router-dom';
import Disconnect from 'appcomponents/Disconnect';


export default function Components(props) {
  let history = useNavigate();

  const [isUser, setIsUser] = useState(false);
  const [mediaKits, setMediaKits] = useState([]);
  const [isMediaKit, setIsMediakit] = useState(false);

  useEffect(() => {
    // Get user info
    let userInfo = getUserFromSession();
    if (userInfo !== null && userInfo?.userPlatformsModel?.length > 0) {
      setIsUser(true)
    }

    // Get user mediakits
    getUserMediaKits();
  }, []);

  //Get user from session
  const getUserFromSession = () => {
    if (window.localStorage.getItem("user")) {
      let parsedUserInfo = JSON.parse(window.localStorage.getItem("user"));
      return parsedUserInfo;
    }
    return null;
  };

  // Get user mediakits
  function getUserMediaKits() {
    let user = getUserFromSession();
    if (user !== null && user !== undefined) {
      let payload = {
        "userId": user?.id,
        "clientId": user?.clientId
      }

      //API call
      httpService.getMediaKits(payload).then((res) => {
        if (res !== null && res !== undefined && res?.data?.data !== null && res?.data?.data !== undefined) {
          // Check mediakits
          if (res?.data?.data?.length > 0) {
            setMediaKits(res.data.data)
            setIsMediakit(true)
          }
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }

  // Data for Goal Progress card
  const data = [
    {
      title: "2022 Earnings",
      percentage: "30",
      value: "$8,500",
      maxValue: "$55,000"
    },
    {
      title: "Completed Deals",
      percentage: "10",
      value: "40",
      maxValue: "400"
    },
    {
      title: "Engagement Rate",
      percentage: "100",
      value: "100",
      maxValue: "100"
    }
  ]

  // Data for Your Focus card 
  const yourFocus_data = [
    {
      icon: MessageIcon,
      content: "5 Unread Messages you should consider clearing your inbox"
    },
    {
      icon: CampaignIcon,
      content: "YouTube campaign with DigitalCo has deadlines approaching"
    },
    {
      icon: PlannerIcon,
      content: "Brand outreach emails have not been answered in 7 or more days; click here to review"
    },

  ]
  // Share Popover
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  }
  // Data for Earnings card
  const earnings_data = [
    {
      brand: "Akram",
      date: "8 / 22/ 22",
      amount: "$200"
    },
    {
      brand: "Away",
      date: "9/1/22",
      amount: "$400"
    },
    {
      brand: "Our Place",
      date: "10/ 02/ 22",
      amount: "$340"
    },
  ]

  // Redirect to Preview mediakit
  const redirectToPreviewMediakit = (e) => {
    e?.preventDefault();
    if (
      mediaKits[0]?.id !== undefined &&
      mediaKits[0]?.id !== null &&
      mediaKits[0]?.id !== ""
    ) {
      history("/c/media-kit/preview", {
        state: { mediakitId: mediaKits[0]?.id },
      });
    }
  };

  return (
    <Grid pt={5} pl={5.25} pr={5} pb={5}>
      {/* Creator Home page layout */}
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          {/* Home */}
          <MDBTypography
            color="white"
            fontWeight="medium"
            fontSize="4xl"
            lineHeightSize="5xl"
            pb={2}
          >
            Home
          </MDBTypography>
        </Grid>
        <Grid item>
          {/* Preview and Share Media Kit Buttons */}
          <Grid container>
            <Grid pr={2} pb={2}>
              <MDBButton
                size="large"
                variant="outlined"
                color=""
                bgColor="cardBg"
                fontWeight="medium"
                fontSize="md"
                lineHeight="2xxl"
                borderSize="md"
                onClick={isMediaKit === true ? (e) => redirectToPreviewMediakit(e) : handleClick}
              >
                <MDBTypography
                  component="img"
                  src={EyeIcon}
                  width="14px"
                  height="14px"
                />
                <ResponsiveText pl={1} text="Preview Media Kit" />
              </MDBButton>
            </Grid>

            {(isMediaKit !== true) ?
              <Grid pb={2}>
                <MDBButton
                  size="medium"
                  variant="contained"
                  color="white"
                  bgColor="smoke_light"
                  fontWeight="medium"
                  fontSize="md"
                  borderSize="md"
                  lineHeight="2xxl"
                  aria-describedby={id}
                  onClick={handleClick}
                >
                  <MDBTypography
                    component="img"
                    src={ShareIcon}
                    width="14px"
                    height="14px"
                  />
                  <ResponsiveText pl={1} text="Share Media Kit" />
                </MDBButton>
                <Modal
                  id={id}
                  open={open}
                  onClose={handleClose}
                  style={{display:'flex',alignItems:'center',justifyContent:'center'}}
                >
                  {/* <SharePopover onCloseCallback={handleClose} bioHandler={(mediaKits && mediaKits.length>0 && mediaKits[0])?mediaKits[0].bioHandler:""} /> */}
                  <Disconnect close={handleClose} isMediakit={true} />
                </Modal>
              </Grid>
              :
              <Grid pb={2}>
                <MDBButton
                  size="medium"
                  variant="contained"
                  color="white"
                  bgColor="smoke_light"
                  fontWeight="medium"
                  fontSize="md"
                  borderSize="md"
                  lineHeight="2xxl"
                  aria-describedby={id}
                  onClick={handleClick}
                >
                  <MDBTypography
                    component="img"
                    src={ShareIcon}
                    width="14px"
                    height="14px"
                  />
                  <ResponsiveText pl={1} text="Share Media Kit" />
                </MDBButton>
                <Modal
                  id={id}
                  open={open}
                  onClose={handleClose}
                >
                  <SharePopover onCloseCallback={handleClose} bioHandler={(mediaKits && mediaKits.length > 0 && mediaKits[0]) ? mediaKits[0].bioHandler : ""} />
                </Modal>
              </Grid>
            }
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item pr={{ sm: 0, xs: 0, md: 0, lg: 2, xl: 2, xxl: 2, el: 2 }} xs={12} sm={12} md={12} lg={8.8} xxl={9} el={10.55}>
          <Grid item>
            <CreatorStats user={getUserFromSession()} isHome = {true} />
          </Grid>
          <Grid item>
            <TabbedMenu />
          </Grid>
          <Grid item>
            <MiniCalendar />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={3.2} el={1.4} xxl={3}>
          <Grid container>
            <Grid pb={2} xs={12} sm={12} md={12} lg={12} xxl={12} el={12}>
              <YourFocus yourFocus_data={yourFocus_data} isUser={isUser} mediakit={isMediaKit} />
            </Grid>
            <Grid pb={2} xs={12} sm={12} md={12} lg={12} xxl={12} el={12}>
              <GoalProgress data={data} />
            </Grid>
            <Grid pb={2} xs={12} sm={12} md={12} lg={12} xxl={12} el={12}>
              <Earnings earnings_data={earnings_data} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
