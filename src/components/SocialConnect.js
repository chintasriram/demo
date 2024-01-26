import React, { useEffect, useState } from 'react'
import MDBTypography from './MDBTypography'
import Instagram from '../assets/images/icons/svg/large/Instagram4040.svg'
import Tiktok from '../assets/images/icons/svg/large/TikTok4040.svg'
import Youtube from '../assets/images/icons/svg/large/YouTube4040.svg'
import Tik from '../assets/images/icons/svg/medium/CheckIcon1414.svg'
import { Grid, LinearProgress, Modal } from '@mui/material'
import MDBox from './MDBox'
import { toast } from 'react-toastify';
import httpService from "service/HttpService"
import UserService from "service/UserService"
import MDBCard from './MDBCard'
import { createStyles, makeStyles } from '@material-ui/core';
import WarningCard from 'appcomponents/WarningCard'
import Disconnect from 'appcomponents/Disconnect'
import toastIcon from 'assets/images/icons/svg/medium/ToastSuccess.svg'

const useStyles = makeStyles((theme) =>
  createStyles({
    progressbar: {
        background: 'transparent',
      
        '& .MuiLinearProgress-bar': {
          backgroundColor: "#BBDCD2",
        },
      },
  })
);

export default function SocialConnect(props) {
    const classes = useStyles();
    const [instaUserId, setInstaUserId] = useState("")
    const [tiktokUserId, setTiktokUserId] = useState("")
    const [youtubeUserId, setYoutubeUserId] = useState("")
    const [isUsernameLoading, setIsUsernameLoading] = useState("")
    let messageRecieved = false;

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openDisconnect, setOpenDisconnect] = React.useState(false);
    const handleOpenDisconnect = () => setOpenDisconnect(true);
    const handleCloseDisconnect = () => setOpenDisconnect(false);
    toast.configure();

    const [connectErrorMessage,setConnectErrorMessage] = useState([
        {
            provider:"Instagram",
            heading: "Couldn't connect to ",
            message: "Make sure your account is a business profile."
        }
    ]);
    const prepareErrorMessage = (provider,errorMessage) => {
        let message =
        {
            provider:provider,
            heading: "Couldn't connect to ",
            message: errorMessage??"Please try again!"
        }
        setConnectErrorMessage(message);
    }

    useEffect(() => {
        getUserPlatforms();
    }, []);
    const getProviderId = (provider) => {
        if (props?.userPlatforms) {
            for (let platform of props?.userPlatforms) {
                if (platform.platform === provider) {
                    return platform.id;
                }
            }
        }
        return null;
    }
    // On success handler
    const onSuccessHandler = (provider, id, name, email, token, refresh_token) => {
        setIsUsernameLoading(provider)
        let payload = {
            "platform": provider,
            "id": getProviderId(provider),
            //"providerId":id,
            //"name":name,
            "email":email,
            "token": token,
            "userId": props?.userId,
            "handler": name,
            "refreshToken": refresh_token
        }
        httpService.platformConnect(payload).then((res) => {
            setIsUsernameLoading("")
            if (res !== undefined && res?.data !== undefined && res?.data?.success === true) {
                //On success
                // store logged in user into session/localstorage
                toast.success("You are successfully connected", { position: toast.POSITION.TOP_LEFT, hideProgressBar: true, 
                    autoClose: 3000,icon:<img src={toastIcon} /> });
                // history('/c/home');
                // navigate to home page
                if (provider === "youtube") {
                    setYoutubeUserId(res?.data?.data?.overallAnalytics?.handler);
                } else if (provider === "instagram") {
                    setInstaUserId(res?.data?.data?.overallAnalytics?.handler)
                } else if (provider === "tiktok") {
                    if (res?.data?.data?.overallAnalytics?.handler) {
                        setTiktokUserId(res?.data?.data?.overallAnalytics?.handler)
                    }
                }
                //update user session
                UserService.updateUserSession(payload?.id,updateSessionCallback);


            } else {
                prepareErrorMessage(provider,res.data.message);
                setOpenDisconnect(true);
                //On error
                //toast.success(res.data.message, { position: toast.POSITION.TOP_LEFT, hideProgressBar: true, autoClose: 3000 });
            }
        }).catch(error => {
            setIsUsernameLoading("")
            toast.error(error, { position: toast.POSITION.TOP_LEFT, hideProgressBar: true, autoClose: 3000});

        })

    }
    const updateSessionCallback = () => {   
    }
 
    const getUserPlatforms = () => {
        if (props?.userPlatforms) {
            for (let platform of props?.userPlatforms) { 
                if (platform.platform === "youtube" && platform.connected === true ) {
                    setYoutubeUserId(platform?.handler);
                } else if (platform.platform === "instagram") {
                    setInstaUserId(platform?.handler)
                } else if (platform.platform === "tiktok") {
                    setTiktokUserId(platform?.handler)
                }
            }
        }
    }
    

    const warning_Data = [
        {
            header: " You will now be directed to Instagram",
            body: "In order to connect your Instagram successfully, your account must be connected to a Instagram page and be a business profile. When connecting your Instagram, please grant all Instagram permissions to be connected successfully",
            button_text: "Let's Go!"
        }
    ]

    const tiktokClick = () => {
        messageRecieved = false;
        popupWindow(httpService.getSocialOauthUrl().replace("#provider#","tiktok") + "?userId=" + props?.userId, 'Tiktok Oauth', window, 690, 440);
    }
    const facebookClick = () => { 
        //hide popup
        handleClose();
        messageRecieved = false;
        let scope = "user_profile,user_media";
        popupWindow(httpService.getSocialOauthUrl().replace("#provider#","instagram") + "?userId=" + props?.userId+"&scope="+scope, 'Instagram Oauth', window, 690, 440);
        
    }
    const googleClick = () => {
        messageRecieved = false;
        popupWindow(httpService.getSocialOauthUrl().replace("#provider#","google") + "?userId=" + props?.userId, 'Tiktok Oauth', window, 690, 440);
    }
    function popupWindow(url, windowName, win, w, h) {
        const y = win.top.outerHeight / 2 + win.top.screenY - (h / 2);
        const x = win.top.outerWidth / 2 + win.top.screenX - (w / 2);
        win.addEventListener("message", messasgeHandler);
        return win.open(url, windowName, `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`);
    }
    function messasgeHandler(e) {
        oauthCallback(e.data);
        if (e.origin === window.location.origin) {
           
            if (e.data["isCallback"] && messageRecieved === false) {
                messageRecieved = true;
                
                window.removeEventListener('message', messasgeHandler);
            }
        }
    }
    function oauthCallback(data) {
        if(data.token==null || data.token===undefined || data.token===""){
            toast.success("Please try again", { position: toast.POSITION.TOP_LEFT, hideProgressBar: true, autoClose: 3000,icon:<img src={toastIcon} /> });
        }else{
            onSuccessHandler(data.provider, "", data.handler, data.email, data.token, data.refresh_token);
        }
    }
    
    return (
        <div>
            <MDBox>
                <MDBTypography
                    color="white"
                    fontWeight="medium"
                    fontSize="md"
                    lineHeightSize="2xl"
                    mt={3}
                >
                    Connect your accounts
                </MDBTypography>
            </MDBox>

            <Grid container columnSpacing={1.5}>
                <Grid item xs={12} md={4}>
                    <MDBCard
                        sx={{
                            mx:0, mt:2, p:0, width: "142px",
                            cursor: "pointer",
                            border: (instaUserId !== "") ?"1px solid #ffff" : "1px solid #3B3D40",
                            "&:hover": { border: '1px solid white' }
                        }}
                        borderRadius="xl"
                        bgcolor="transparent"
                        onClick={handleOpen}
                    >
                        <Grid container justifyContent="center" alignContent="center" style={{height: "142px"}}>
                            <MDBTypography
                                component="img"
                                src={Instagram}
                            />

                            {(instaUserId !== "" && isUsernameLoading.toLowerCase() !== "instagram") &&
                                <Grid container justifyContent="center" mb={-5} pt={2} alignItems="center">
                                    <Grid item pr={0.5}>
                                        <MDBTypography
                                            component="img"
                                            height="12px"
                                            src={Tik}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <MDBTypography
                                            color="openCampGreenColor"
                                            fontWeight="regular"
                                            fontSize="sm"
                                            lineHeightSize="xxl"
                                            maxWidth="100px"
                                            sx={{
                                                display: '-webkit-box',
                                                overflow: 'hidden',
                                                WebkitBoxOrient: 'vertical',
                                                WebkitLineClamp: 1,
                                            }}
                                        >
                                            {"@ " + instaUserId}
                                        </MDBTypography>
                                    </Grid>
                                </Grid>
                            }

                            {(isUsernameLoading.toLowerCase() === "instagram") &&
                                <Grid container justifyContent="center" mb={-5} pt={2} alignItems="center">
                                    <LinearProgress  className={classes.progressbar}  sx={{ width: "100px", overflow: "hidden"}} />
                                </Grid>
                            }
                        </Grid>
                    </MDBCard>

                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        style={{overflow: "scroll"}}
                    >
                        <WarningCard warning_Data={warning_Data} facebookClick={facebookClick} close={handleClose}/>
                    </Modal> 
                </Grid>

                <Grid item xs={12} md={4}>
                    <MDBCard
                        sx={{
                            mx:0, mt:2, p:0, width: "142px",
                            cursor: "pointer",
                            border: (tiktokUserId !== "") ?"1px solid #ffff" : "1px solid #3B3D40",
                            "&:hover": { border: '1px solid white' }
                        }}
                        borderRadius="xl"
                        bgcolor="transparent"
                        onClick={tiktokClick}
                    >
                        <Grid container justifyContent="center" alignContent="center" style={{height: "142px"}}>
                            <MDBTypography
                                component="img"
                                src={Tiktok}
                            />

                            {(tiktokUserId !== ""  && isUsernameLoading.toLowerCase() !== "tiktok") &&
                                <Grid container justifyContent="center" mb={-5} pt={2} alignItems="center">
                                    <Grid item pr={0.5}>
                                        <MDBTypography
                                            component="img"
                                            height="12px"
                                            src={Tik}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <MDBTypography
                                            color="openCampGreenColor"
                                            fontWeight="regular"
                                            fontSize="sm"
                                            lineHeightSize="xxl"
                                            maxWidth="100px"
                                            sx={{
                                                display: '-webkit-box',
                                                overflow: 'hidden',
                                                WebkitBoxOrient: 'vertical',
                                                WebkitLineClamp: 1,
                                            }}
                                        >
                                            {tiktokUserId}
                                        </MDBTypography>
                                    </Grid>
                                </Grid>
                            }

                            {(isUsernameLoading.toLowerCase() === "tiktok") &&
                                <Grid container justifyContent="center" mb={-5} pt={2} alignItems="center">
                                    <LinearProgress  className={classes.progressbar}  sx={{ width: "100px", overflow: "hidden"}} />
                                </Grid>
                            }
                        </Grid>
                    </MDBCard>
                </Grid>

                <Grid item xs={12} md={4}>  
                    <MDBCard
                        sx={{
                            mx:0, mt:2, p:0, width: "142px",
                            cursor: "pointer",
                            border: (youtubeUserId !== "") ?"1px solid #ffff" : "1px solid #3B3D40",
                            "&:hover": { border: '1px solid white' }
                        }}
                        borderRadius="xl"
                        bgcolor="transparent"
                        onClick={googleClick}
                    >
                        <Grid container justifyContent="center" alignContent="center" style={{height: "142px"}}>
                            <MDBTypography
                                component="img"
                                src={Youtube}
                            />

                            {(youtubeUserId !== ""  && isUsernameLoading.toLowerCase() !== "youtube") &&
                                <Grid container justifyContent="center" mb={-5} pt={2} alignItems="center">
                                    <Grid item pr={0.5}>
                                        <MDBTypography
                                            component="img"
                                            height="12px"
                                            src={Tik}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <MDBTypography
                                            color="openCampGreenColor"
                                            fontWeight="regular"
                                            fontSize="sm"
                                            lineHeightSize="xxl"
                                            maxWidth="100px"
                                            sx={{
                                                display: '-webkit-box',
                                                overflow: 'hidden',
                                                WebkitBoxOrient: 'vertical',
                                                WebkitLineClamp: 1,
                                            }}
                                        >
                                            {"@ " + youtubeUserId}
                                        </MDBTypography>
                                    </Grid>
                                </Grid>
                            }

                            {(isUsernameLoading.toLowerCase() === "youtube") &&
                                <Grid container justifyContent="center" mb={-5} pt={2} alignItems="center">
                                    <LinearProgress  className={classes.progressbar}  sx={{ width: "100px", overflow: "hidden"}} />
                                </Grid>
                            }
                        </Grid>
                    </MDBCard>

                    {/* Disconnect Popup */}
                    <Modal
                        open={openDisconnect}
                        onCloseDisConnect={handleCloseDisconnect}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        style={{overflow: "scroll",display:"flex",justifyContent:"center",alignItems:"center"}}
                    >
                        <Disconnect data={connectErrorMessage} close={handleCloseDisconnect}/>
                    </Modal> 
                </Grid>
            </Grid>
        </div>
    )
}
