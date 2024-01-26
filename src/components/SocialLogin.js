import React from 'react'
import GoogleIcon from '../assets/images/icons/svg/GGIcon.svg'
import AppleIcon from '../assets/images/icons/svg/AppleIcon.svg'
import FacebookIcon from '../assets/images/icons/svg/FBIcon.svg'
import MDBButton from './MDBButton'
import MDBTypography from './MDBTypography'
import httpService from "service/HttpService"
import userService from "service/UserService"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ResponsiveText from 'appcomponents/ResponsiveText'
import { Grid, Icon } from '@mui/material'
import { LoginSocialApple } from 'reactjs-social-login'
import toastIcon from 'assets/images/icons/svg/medium/ToastSuccess.svg'
import {
  FacebookLoginButton,
  GoogleLoginButton
} from 'react-social-login-buttons';

export default function SocialLogin(props) {
  const history = useNavigate();
  toast.configure();

  // On success handler
  const onSuccessHandler = (provider, id, name, email, token, refreshToken) => {
    let payload = {
      "provider": provider,
      "providerId": id,
      "name": name,
      "email": email,
      "token": token,
      "refresh_token": refreshToken,
      "type": props.type
    }

    httpService.smLoginOrRegister(payload).then((res) => {
      if (res !== undefined && res?.data !== undefined && res?.data?.success === true) {
        //Check user is active
        if (res?.data?.data?.active === true) {
          // Redirect to home
          userService.updateUserSessionWithUser(res?.data.data);
          history("/c/home");
        } else {
          // Redirect to user onboard page
          history("/register/onboard?token=" + res?.data.data.uuId);
        }
        // navigate to home page
      } else {
        //On error
        toast.success("Please try again", { position: toast.POSITION.TOP_LEFT, hideProgressBar: true, 
          autoClose: 3000,	icon:<img src={toastIcon} /> });
      }
    }).catch(error => {
      toast.error(error.data.message, { position: toast.POSITION.TOP_LEFT, hideProgressBar: true, autoClose: 3000});
    })

  }
  let messageRecieved = false;

  const facebookClick = () => {
    messageRecieved = false;
    let scope = "user_profile,user_media";
   
    popupWindow(httpService.getSocialOauthUrl().replace("#provider#", "instagram") + "?userId=" + props?.userId + "&scope=" + scope, 'Instagram Oauth', window, 690, 440);
  }
  const googleClick = () => {
    messageRecieved = false;
    let scope = "openid profile email";
    popupWindow(httpService.getSocialOauthUrl().replace("#provider#", "google") + "?userId=" + props?.userId + "&scope=" + scope, 'Google Oauth', window, 690, 440);
  }
  function popupWindow(url, windowName, win, w, h) {
    const y = win.top.outerHeight / 2 + win.top.screenY - (h / 2);
    const x = win.top.outerWidth / 2 + win.top.screenX - (w / 2);
    win.addEventListener("message", messasgeHandler);
    return win.open(url, windowName, `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`);
  }
  function messasgeHandler(e) {
    if (e.origin === window.location.origin) {

      if (e.data["isCallback"] && messageRecieved === false) {
        messageRecieved = true;
        oauthCallback(e.data);
        window.removeEventListener('message', messasgeHandler);
      }
    }
  }
  function oauthCallback(data) {
    if (data.token == null || data.token === undefined || data.token === "") {
      toast.error("Please try again", { position: toast.POSITION.TOP_LEFT, hideProgressBar: true, autoClose: 3000});
    } else {
      data.provider = data.provider === "youtube" ? "google" : data.provider;
      data.provider = data.provider === "instagram" ? "instagram" : data.provider;
      onSuccessHandler(data.provider, data.providerId, data.name, data.email, data.token, data.refresh_token);
    }
  }

  return (
    <div>
      <Grid container rowSpacing={1}>
        <Grid item xs={12} sm={12} lg={12} xl={12} xxl={12} xel={12} xxel={12} el={6}>
          {/* <MDBButton
               size="inherit"
               variant="outlined"
               color=""
               bgColor="light_green"
               fontWeight="medium"
               fontSize="sm"
               borderSize="smd"
               sx={{ mb: 2, borderColor: "#8A8F93",
               "&:hover": {borderColor:"white",  border: '2px solid' }}}
              // sx={{width: "460px", mb: 2,borderColor:"half_white", 
              // "&:hover": {borderColor:"white",  border: '2px solid' },}}
              onClick ={googleClick}
            >
              <Icon>
                <MDBTypography
                  component="img"
                  height="22px"
                  width="22px"
                  src={GoogleIcon} pr={0.5} pb={0.4}
                />
              </Icon>
              <ResponsiveText text={props.google} pl={3} mobileText="Google"/>
            </MDBButton>
          */}
          <Grid container justifyContent="center">
            <GoogleLoginButton onClick={googleClick} align="center"><ResponsiveText text={props.google} mobileText="Google"/></GoogleLoginButton>
          </Grid>

        </Grid>

        <Grid item xs={4} sm={4} md={6} lg={6} xl={6} xxl={6} xel={6} xxel={6} el={6} sx={{ display: "none" }}>
          <LoginSocialApple
            client_id={process.env.REACT_APP_APPLE_ID || 'netlify.app.react-social-login'}
            scope={'name email'}
            redirect_uri={process.env.REDIRECT_URI || "https%3A%2F%2Freact-social-login.netlify.app%2Faccount%2Flogin"}
            onResolve={({ provider, data }) => {
              console.log(data)
            }}
            onReject={err => {
              console.log(err);
            }}
          >
            <MDBButton
              size="extraLarge"
              variant="outlined"
              color=""
              bgColor="light_green"
              fontWeight="medium"
              fontSize="md"
              borderSize="smd"
              sx={{
                mb: 2, borderColor: "#8A8F93",
                "&:hover": { borderColor: "white", border: '2px solid' }
              }}

            // sx={{ mb: 2,borderColor:"half_white", 
            // "&:hover": {borderColor:"white",  border: '2px solid' },}}


            >
              <Icon>
                <MDBTypography
                  component="img"
                  src={AppleIcon} pr={0.5} pb={0.5}
                />
              </Icon>
              <ResponsiveText text={props.apple} pl={1} />
            </MDBButton>
          </LoginSocialApple>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} xel={12} xxel={12} el={6}>
          {/*  <MDBButton
              size="inherit"
              variant="outlined"
              color=""
              bgColor="light_green"
              fontWeight="medium"
              fontSize="sm"
              borderSize="smd"
              sx={{ mb: 2, borderColor: "#8A8F93",
              "&:hover": {borderColor:"white",  border: '2px solid'}}}
              onClick ={facebookClick}
            >
              <Icon>
                <MDBTypography
                  component="img"
                  height="22px"
                  width="22px"
                  src={FacebookIcon} pr={0.5} pb={0.4}
                />
              </Icon>
              <ResponsiveText text={props.facebook} pl={3} mobileText="Facebook"/>
            </MDBButton>
          */}
          <Grid container justifyContent="center">
            <FacebookLoginButton onClick={facebookClick} align="center" ><ResponsiveText text={props.facebook} mobileText="Facebook"/></FacebookLoginButton>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
