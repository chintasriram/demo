import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MDBButton from "components/MDBButton";
import MDBCard from "components/MDBCard";
import MDBTypography from "components/MDBTypography";
import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import outlookCalendarImage from "assets/images/icons/svg/medium/OutlookIcon.svg";
import googleCalendarImage from "assets/images/icons/svg/medium/GoogleCalenderIcon.svg";
import CheckIcon from "assets/images/icons/svg/medium/CheckIcon1818.svg";
import { useNavigate } from "react-router-dom";
import httpService from "service/HttpService"
import { toast } from 'react-toastify';
import toastIcon from 'assets/images/icons/svg/medium/ToastSuccess.svg'
import UserService from "service/UserService"
import Tiktok from 'assets/images/icons/social/icons_large/tiktok.png'
import Instagram from 'assets/images/icons/social/icons_large/Instagram_large.png'
import Youtube from 'assets/images/icons/social/icons_large/youtube.png'

export default function CalendarSettings(props) {
  //handle connect status:
  const [calenders, setCalendars] = useState(props?.user?.userCalendars);
  // const [user, setUser] = useState(props?.user);
  const [user, setUser] = useState(JSON.parse(window.localStorage.getItem("user")));
  let messageRecieved = false;
  toast.configure();

  const ITEM_HEIGHT = 20;
  const [anchorEl, setAnchorEl] = useState(null);
  const [googleAnchor, setGoogleAnchor] = useState(null);

  const open = Boolean(anchorEl);
  const googleOpen = Boolean(googleAnchor);

  let history = useNavigate();

  useEffect(() => {
    // if (props?.user?.userCalendars) {
    //   setCalendars(props?.user?.userCalendars);
    // }
    if(props?.user?.id){
      getUserDetails();
      setUser(JSON.parse(window.localStorage.getItem("user")));
    }
    
  }, user); //[props?.user]

  const getUserDetails = () => {
    httpService
      .getUserDetails(props?.user?.id)
      .then((res) => {
        setUser(res?.data?.data);
        setCalendars(user?.userCalendars);
      });
  };

  //Edit Google connect
  const handleEdit = () => { history('/EditOutlooksync'); }
  //Disconnect Google connect
  const handleDisconnect = () => { alert("Disconnet menu") }
  const googleClick = () => {
    let url = httpService.getSocialOauthUrl().replace("#provider#", "google") + "?userId=" + props?.user?.id + "&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar";
    messageRecieved = false;
    popupWindow(httpService.getSocialOauthUrl().replace("#provider#", "google") + "?userId=" + props?.user?.id + "&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar", 'Google Oauth', window, 690, 440);
  }
  const facebookClick = () => { 
    //hide popup
    handleClose();
    messageRecieved = false;
    let scope = "user_profile,user_media";
    popupWindow(httpService.getSocialOauthUrl().replace("#provider#","instagram") + "?userId=" + props?.user?.id+"&scope="+scope, 'Instagram Oauth', window, 690, 440);
    
}
  function popupWindow(url, windowName, win, w, h) {
    const y = win.top.outerHeight / 2 + win.top.screenY - (h / 2);
    const x = win.top.outerWidth / 2 + win.top.screenX - (w / 2);
    win.addEventListener("message", messasgeHandler);
    return win.open(url, windowName, `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`);
  }
  function messasgeHandler(e) {
    if (e.origin == window.location.origin) {

      if (e.data["isCallback"] && messageRecieved == false) {
        messageRecieved = true;
        oauthCallback(e.data);
        window.removeEventListener('message', messasgeHandler);
      }
    }
  }
  function oauthCallback(data) {
    if (data.token == null || data.token === undefined || data.token === "") {
      toast.success("Please try again", { position: toast.POSITION.TOP_LEFT, 
        hideProgressBar: true, autoClose: 3000,	icon:<img src={toastIcon}/> });
    } else {
      onSuccessHandler(data.provider, "", data.handler, "", data.token, data.refresh_token);
    }
  }
  // On success handler
  const onSuccessHandler = (provider, id, name, email, token, refresh_token) => {
    let payload = {
      "userId": props?.user?.id,
      "id": calenders?.id
    }
    let settings = {
      "platform": provider,
      "token": token,
      "handler": name,
      "refreshToken": refresh_token,
      "isPullEnabled": true,
      "isPushEnabled": true,
      "eventTypes": ["all"]
    }
    if (provider === "youtube") {
      settings.platform = "google";
      payload["google"] = settings;
    } else {
      payload["outlook"] = settings;
    }

    httpService.calendarConnect(payload).then((res) => {
      if (res !== undefined && res?.data !== undefined && res?.data?.success === true) {
        //On success
        // store logged in user into session/localstorage
        toast.success("Google Calender connected successfully.", { position: toast.POSITION.TOP_LEFT,
           hideProgressBar: true, autoClose: 3000,	icon:<img src={toastIcon}/> });
        setCalendars(res?.data?.data);
      } else {
        //On error
        toast.error("We are unable to connect calender with your account. Please try again", { position: toast.POSITION.TOP_LEFT, hideProgressBar: true, autoClose: 3000 });
      }
    }).catch(error => {
      toast.error(error, { position: toast.POSITION.TOP_LEFT, hideProgressBar: true, autoClose: 3000 });

    })

  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleGoogleClick = (event) => {
    setGoogleAnchor(event.currentTarget);
  };

  const updateSessionCallback = () => {   
  }

  console.log("123_props?.user=",props?.user?.userPlatformsModel[0].connected)
  console.log("123_user=",user?.userPlatformsModel[0].connected)
  console.log("123_session=",JSON.parse(window.localStorage.getItem("user")))
  
  const handleGoogleDisconnect = (item1) => {
    //payload
    let payload = {
      "id": props?.user.id,
      "type": item1.platform
    }
    //service call
    httpService
      .connectionDisconnect(user.id, payload?.type)
      .then((res) => {
        handleGoogleClose();
        toast.success("You are successfully disconnected", { position: toast.POSITION.TOP_LEFT,
          hideProgressBar: true, autoClose: 3000,	icon:<img src={toastIcon}/> });
          setCalendars(res?.data?.data);
          UserService.updateUserSession(payload?.id,updateSessionCallback);
          getUserDetails();
        
      });
  }
  useEffect(() => {
    if (props?.user?.userCalendars) {

    }
  }, [props?.user]);

  //Calender edit and discomnnect popover
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleGoogleClose = () => {
    setGoogleAnchor(null);
  };
  return (
    <Grid sx={{ px: 5, pr: 1 }}>
      <MDBTypography
        color="white"
        fontWeight="medium"
        fontSize="md"
        lineHeightSize="2xl"
        pb={0.5}
      >
        Calendars
      </MDBTypography>

      {/* Need to make component for calender block */}
      {/* <CalenderRow imgSrc="" isConnted=true connectCallback={} editCallback={} removeCallback={} /> */}
      { user?.userPlatformsModel.map((item1) => {
        return (
      item1.platform !== "tiktok" && <MDBCard borderRadius="xl" bgcolor="cardBg" sx={{ m: 0, my: 2, mr: 3, p: 0, p: 2,  width: "inherit"  }}>
        <Grid container justifyContent="space-between">
          <Grid item alignSelf="center" display="flex">
            <Grid item alignSelf="center" pr={2} pt={0.5}>
              <MDBTypography component="img" src={item1?.platform === "youtube" ? googleCalendarImage : Instagram} width="24px" height="24px" mt={0.7} />
            </Grid>
            <Grid item alignSelf="center">
              <MDBTypography
                color="white"
                fontWeight="medium"
                fontSize="md"
                lineHeightSize="2xl"
              >
                {item1?.platform === "youtube" ? "Google" : "Instagram"}
              </MDBTypography>
            </Grid>
          </Grid>
          

          <Grid item>
            { 
          //  props?.user?.userPlatformsModel.length > 0 && props?.user?.userPlatformsModel?.userPlatformsModel[0]?.userPlatformsModel[0].connected ?
          item1.connected ?
            // calenders?.google?.connected ?
              <>
                <Grid>
                  <MDBButton
                    size="small"
                    variant="contained"
                    color="light_green"
                    bgColor="supaLight"
                    fontWeight="regular"
                    fontSize="md"
                    borderSize="md"
                    onClick={item1?.platform === "youtube" ? googleClick : facebookClick}
                  >
                    <MDBTypography component="img" src={CheckIcon} pr={1} />
                    Connected
                  </MDBButton>

                  <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={googleOpen ? "long-menu" : undefined}
                    aria-expanded={googleOpen ? "true" : undefined}
                    aria-haspopup="true"
                    color="white"
                    onClick={handleGoogleClick}

                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    mt={4}
                    id="long-menu"
                    MenuListProps={{
                      "aria-labelledby": "long-button",
                    }}
                    anchorEl={googleAnchor}
                    open={googleOpen}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    onClose={handleGoogleClose}
                    PaperProps={{
                      style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: "20ch",
                        color: "#FFFFFF",
                      },
                    }}
                  >
                    <MenuItem onClick={props.handleEdit}>Reconnect</MenuItem>
                    <MenuItem onClick={() => handleGoogleDisconnect(item1)} >Disconnect</MenuItem>
                  </Menu>
                </Grid>
              </>
              :
              <MDBButton
                size="small"
                variant="text"
                color="light_green"
                fontWeight="regular"
                fontSize="md"
                borderSize="md"
                onClick={item1?.platform === "youtube" ? googleClick : facebookClick}
                // googleClick
              >
                Connect
              </MDBButton>
              
            }
          </Grid>

        </Grid>
      </MDBCard>
        )
      })
        }

     

      <MDBCard borderRadius="xl" bgcolor="cardBg" sx={{ display:"none",m: 0, my: 2, mr: 3, p: 0, p: 2, width: "inherit" }}>
        <Grid container justifyContent="space-between" >
          <Grid item mt={1}>
            <MDBTypography component="img" src={outlookCalendarImage} width="24px" height="24px" />
          </Grid>

          <Grid item>
            {/* <MDBTypography
          component={Link}
          to="/SyncGoogleCalender"
          color="secondary"
          fontWeight="medium"
          fontSize="md"
          lineHeightSize="2xl"
          pb={0.5}
          onClick={handleConnect}
          >
            Connect
          </MDBTypography> */}
            <MDBButton
              size="small"
              variant="contained"
              color="light_green"
              bgColor="supaLight"
              fontWeight="regular"
              fontSize="md"
              borderSize="md"
            >
              <MDBTypography component="img" src={CheckIcon} pr={1} />
              Connected
            </MDBButton>

            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              color="white"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>

            <Menu
              mt={4}
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch",
                  color: "#FFFFFF",
                },
              }}
            >
              <MenuItem onClick={props?.handleEdit}>Edit</MenuItem>
              <MenuItem onClick={props?.handleDisconnect}>Disconnect</MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </MDBCard>
    </Grid>
  )
}




