import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ActiveLayer from 'assets/images/ImagesSvg/Active.png'
import MDBTypography from 'components/MDBTypography';
import { App as SendbirdApp } from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";
import "./message.css";

function Messages(props) {

  useEffect(() => {
    // Get user info
    let userInfo = getUserFromSession();
    // if (userInfo !== null && userInfo?.userPlatformsModel?.length > 0) {
    //   setIsUser(true)
    // }

    // Get user mediakits
    // getUserMediaKits();
  }, []);

  const getUserFromSession = () => {
    if (window.localStorage.getItem("user")) {
      let parsedUserInfo = JSON.parse(window.localStorage.getItem("user"));
      return parsedUserInfo;
    }
    return null;
  };

  let user = getUserFromSession();
    console.log("user=",user)
    let APP_ID = ''
    let USER_ID = ''
    if (user !== null && user !== undefined) {
    APP_ID = "A37DC1CA-111A-4003-9B31-EE40BE79069D"
    USER_ID = user?.id.toString();
  }

  return (
    <Grid container
  >
    <Grid container justifyContent="center" alignContent="center"
    >
      <MDBTypography
        color="grayScale"
        fontWeight="medium"
        fontSize="md"
        lineHeightSize="xxl"
        // px={3}
        style={{width: '100%'}}
      >
        <div className="App">
=				        <SendbirdApp 
                      appId={APP_ID}
                        userId={USER_ID}
                        // nickname={'Test'}
                        config={{ logLevel: 'all' }}
                        />
           </div>
      </MDBTypography>
    </Grid>
  </Grid>
  )
}

export default Messages;