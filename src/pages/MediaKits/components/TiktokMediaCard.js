import { Divider,Grid } from '@mui/material'
import MDBTypography from 'components/MDBTypography'
import Tiktok from 'assets/images/icons/svg/large/TikTokColorIcon3232.svg'
import MultiCarousel from 'pages/Carousel';
import formatter from 'service/NumberFormatService';

export default function TiktokMediaCard(props) {
    return (
        <div>
            <Grid>
                {/* Youtube MediaCard Title */}
                <Grid container justifyContent="space-between" mb={3}>
                    <Grid item>
                        <Grid container>
                            <MDBTypography
                                component="img"
                                src={Tiktok}
                                pr={1}
                            />
                            <MDBTypography
                                color="white"
                                fontWeight="medium"
                                fontSize="2xl"
                                lineHeightSize="4xl"
                                pr={1}
                            >
                                TikTok
                            </MDBTypography>
                            {
                                (props?.data?.data?.data?.tiktokAnalytics) &&
                                <MDBTypography
                                    color="grayScale"
                                    fontWeight="regular"
                                    fontSize="lg"
                                    lineHeightSize="2xxl"
                                    mt={0.5}
                                >
                                    {formatter.format(props?.data?.data?.data?.tiktokAnalytics?.overallAnalytics?.subscriptionCount)} Followers
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
                            {/* See More */}
                        </MDBTypography>
                    </Grid>
                </Grid>
                <Grid>
                    <MultiCarousel videos={props?.data?.data?.data?.tiktokAnalytics?.latestVideos} width="100%" height="min(420px,441px)" platform="tiktok"/>
                </Grid>
                {
                    (props?.data?.data?.data?.tiktokAnalytics) &&
                    <Divider sx={{ m: 0, p: 0, mt: 4.75, mb: 6 }} />
                }
            </Grid>
        </div>
    )
}
