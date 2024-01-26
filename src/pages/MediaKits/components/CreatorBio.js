import { Grid, Modal } from '@mui/material'
import MDBTypography from 'components/MDBTypography'
import React from 'react'
import GlobeIcon from 'assets/images/icons/svg/medium/GlobeIcon.svg'
import CalenderIcon from 'assets/images/icons/svg/medium/CalenderIcon.svg'
import MDBButton from 'components/MDBButton'
import Connect from 'appcomponents/Connect'
import ProposalService from "service/ProposalService"
import { toast } from 'react-toastify'
import categoryIcons from 'categoryIcons'
import biaLogo from 'assets/images/ImagesSvg/biaBannerLogo.svg'
import formatter from './../../../service/NumberFormatService'
import toastIcon from 'assets/images/icons/svg/medium/ToastSuccess.svg'

export default function CreatorBio(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    toast.configure();

    const displayPlatformNames = {
        Instagram: "Instagram",
        Youtube: "YouTube",
        Tiktok: "TikTok"
    }
    
    const connectCallback = (payload) => {
        payload.receiverId = props?.userData?.id;
        payload.content = payload.message;
        payload.senderName = payload.name;
        payload.senderEmail = payload.email;
        ProposalService.sendProposal(payload, connectApiCallback);
    }
    const connectApiCallback = (res) => {
        toast.success("Request to connect sent successfully", { position: toast.POSITION.TOP_LEFT, 
            hideProgressBar: true,	icon:<img src={toastIcon}/> });
        handleClose();
    }

    return (
        <div>
            <Grid sx={{ my: 2 }}>
                {/* bia Banner Logo */}
                { (props?.isPreview === true && props?.data?.coverImageUrl === null || props?.isPreview === true && props?.data?.coverImageUrl === undefined) &&
                    <Grid pb={5}>
                        <MDBTypography component="img" src={biaLogo}/>
                    </Grid>
                }   
                {/* Creator Name */}
                <MDBTypography
                    color="white"
                    fontWeight="medium"
                    fontSize="8xl"
                    lineHeightSize="8xl"
                    textTransform="capitalize"
                    pb={2}
                    maxWidth="500px"
                >
                    {props?.userData?.name}
                </MDBTypography>

                {/* Creator Content Type, Country & Age */}
                <Grid container>
                    <Grid container>
                        {
                            (props?.data?.contentTypes !== null && props?.data?.contentTypes?.length !== undefined) &&
                            props?.data?.contentTypes?.map((cat, idx) => (
                                <Grid display="flex">
                                    <MDBTypography
                                        component="img"
                                        src={categoryIcons[cat.toLowerCase().replaceAll(" ", "").replaceAll("&","")]}
                                        height="20px"
                                        pr={1}
                                    />
                                    <MDBTypography
                                        color="white"
                                        fontWeight="regular"
                                        fontSize="md"
                                        lineHeightSize="2xl"
                                        pr={2} pb={1}
                                    >
                                        {cat + (idx=== props.data.contentTypes.length-1 ? "" : ", ")}
                                    </MDBTypography>

                                </Grid>
                            ))
                        }
                    </Grid>

                    <Grid item display="flex">
                            <MDBTypography
                                component="img"
                                src={GlobeIcon}
                                height="20px"
                                pr={1}
                            />
                            <MDBTypography
                                color="white"
                                fontWeight="regular"
                                fontSize="md"
                                lineHeightSize="2xl"
                                textTransform="capitalize"
                                pr={3}
                            >
                                {props?.data?.location}
                            </MDBTypography>
                        </Grid>

                        <Grid item display="flex">
                            <MDBTypography
                                component="img"
                                height="20px"
                                src={CalenderIcon}
                                pr={1}
                            />
                            <MDBTypography
                                color="white"
                                fontWeight="regular"
                                fontSize="md"
                                lineHeightSize="2xl"
                            >
                                {props?.data?.age}
                            </MDBTypography>
                        </Grid>
                </Grid>

                {/* Creator Bio  */}
                <Grid sx={{ mt: 3, mb: 5, pr: 3 }}>
                    <MDBTypography
                        color="grayScale"
                        fontWeight="regular"
                        fontSize="md"
                        lineHeightSize="2xl"
                    >
                        {props?.data?.bio}
                    </MDBTypography>
                </Grid>

                {/* Creator Platform Statistics */}
                {(props?.isEdit === true || props?.creatorStatisticsData[0].isConnected === true || props?.creatorStatisticsData[1].isConnected === true || props?.creatorStatisticsData[2].isConnected === true) &&
                    <Grid container>
                        {props?.creatorStatisticsData?.map((data, idx) => (
                            <Grid>
                                <Grid container sx={{ pb: 1 }} key={idx} pr={6} display={props?.isPreview === true && data.followers === "" ? "none" : "flex"}>
                                    <MDBTypography
                                        component="img"
                                        src={data.socialIcon}
                                        height="14px"
                                        pr={1} mt={0.5}
                                    />
                                    <MDBTypography
                                        color="grayScale"
                                        fontWeight="regular"
                                        fontSize="md"
                                        lineHeightSize="2xl"
                                    >
                                        {displayPlatformNames[data.socialIconName]}
                                    </MDBTypography>
                                </Grid>

                                <Grid sx={{ pb: 0.125 }}>
                                    <MDBTypography
                                        color="white"
                                        fontWeight="medium"
                                        fontSize="2xl"
                                        lineHeightSize="4xl"
                                    >
                                        {data?.followers?.toString().includes("%")?(data?.followers):(data?.followers?(formatter.format(data?.followers)):"")}
                                    </MDBTypography>
                                </Grid>

                                <Grid container>
                                    <MDBTypography
                                        color="light_green"
                                        fontWeight="regular"
                                        fontSize="sm"
                                        lineHeightSize="xxl"
                                        maxWidth="130px" pb={1.5}
                                    >
                                        {data.userId}
                                    </MDBTypography>
                                </Grid>
                            </Grid>
                        ))
                        }
                    </Grid>
                }

                {/* Contained Button to connect */}
                <Grid my={6}>
                    <MDBButton
                        variant="contained"
                        bgColor="light_green"
                        color="black"
                        borderSize="md"
                        fontWeight="bold"
                        fontSize="md"
                        sx={{ py: 1.5, px: 6.12 }}
                        onClick={handleOpen}
                    >
                        Connect
                    </MDBButton>
                </Grid>

                {/* Contact Us Form Modal */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    style={{ overflow: "scroll" }}
                >
                    <Connect userId={props?.userData?.id} closeCallback={handleClose} connectCallback={connectCallback} />
                </Modal>
            </Grid>
        </div>
    )
}
