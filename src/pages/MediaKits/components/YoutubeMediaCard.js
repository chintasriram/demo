import { Divider, Grid } from '@mui/material'
import MDBTypography from 'components/MDBTypography'
import Youtube from 'assets/images/icons/svg/large/YouTubeColorIcon3232.svg'
import { useEffect, useState } from 'react';
import MultiCarousel from 'pages/Carousel';
import httpService from 'service/HttpService'
import formatter from 'service/NumberFormatService';


export default function YoutubeMediaCard(props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const [videoUrls, setVideoUrls] = useState([]);
    const user = JSON.parse(window.localStorage.getItem("user"));

    useEffect(() => {
        refresh();
    }, [props.mediakitId]);

    const handleClose = (isRefresh) => {
        setOpen(false);
        //get youtube links
        if (isRefresh) {
            refresh()
        }

    }
    const refresh = () => {
        let req = {
            "clientId": user?.clientId,
            "userId": user?.id,
            "mediakitId": props.mediakitId,
            "platform": "youtube",
        }
        httpService.getYoutubeLinks(req).then((res) => {
            if (res !== undefined && res?.data !== null && res?.data?.success !== undefined && res?.data?.success === true) {
                //props.closeCallback(true);
                setVideoUrls(res?.data.data);
            }
        }).catch((error) => {
            //props.closeCallback(false);
        });
    }

    return (
        <div>
            <Grid>
                {/* Youtube MediaCard Title */}
                <Grid container justifyContent="space-between" mb={3}>
                    <Grid item>
                        <Grid container>
                            <MDBTypography
                                component="img"
                                src={Youtube}
                                pr={1}
                            />
                            <MDBTypography
                                color="white"
                                fontWeight="medium"
                                fontSize="2xl"
                                lineHeightSize="4xl"
                                pr={1}
                            >
                                YouTube
                            </MDBTypography>
                            {
                                (props?.data?.data?.data?.youtubeAnalytics) &&
                                <MDBTypography
                                    color="grayScale"
                                    fontWeight="regular"
                                    fontSize="lg"
                                    lineHeightSize="2xxl"
                                    mt={0.5}
                                >
                                    {formatter.format(props?.data?.data?.data?.youtubeAnalytics?.overallAnalytics?.subscriptionCount)} Subscribers
                                </MDBTypography>
                            }
                        </Grid>
                    </Grid>
                    <Grid item>
                        <MDBTypography
                            color="white"
                            fontWeight="regular"
                            fontSize="sm"
                            lineHeightSize="2xl"
                            mt={0.5}
                        >
                            {/*  See More  */}
                        </MDBTypography>

                    </Grid>

                </Grid>

                {/* Youtube Media Card to link the Videos */}
                <Grid  >
                    <MultiCarousel videos={props?.data?.data?.data?.youtubeAnalytics?.latestVideos} width="100%" height="min(230px,254px)" platform="youtube" />
                </Grid>
                {
                    ((props?.data?.data?.data?.instaAnalytics) || (props?.data?.data?.data?.tiktokAnalytics)) &&
                    <Divider sx={{ m: 0, p: 0, mt: 4.75, mb: 6 }} />
                }
            </Grid>
        </div>
    )
}
