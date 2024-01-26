import React, { useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MDBTypography from 'components/MDBTypography';
import { Grid, Modal } from '@mui/material';
import Like from 'assets/images/icons/svg/medium/Like.svg'
import Eye from 'assets/images/icons/svg/medium/EyeIcon.svg'
import httpService from "service/HttpService";
import Instagram from 'assets/images/icons/svg/large/Instagram3030.svg';
import Youtube from 'assets/images/icons/svg/large/YouTube2424.svg';
import Tiktok from 'assets/images/icons/svg/large/TikTok2424.svg';
import VideoPlayer from 'pages/MediaKits/cards/VideoPlayer';
import formatter from 'service/NumberFormatService';

export default function MultiCarousel({ deviceType, videos, width, height, isSponsored, platform }) {
  const [showPlayer, setShowPlayer] = useState(false)
  const [playerUrl, setPlayerUrl] = useState("")

  const images = {
    youtube: Youtube,
    instagram: Instagram,
    tiktok: Tiktok
  }

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      // paritialVisibilityGutter: 60
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
      paritialVisibilityGutter: 50
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
      // paritialVisibilityGutter: 30
    }
  };

  const clickToOpenVideoPlayer = (url, videoPlatform) => {
    if (!url.startsWith("http")) {
      url = "https://" + url
    }

    if (videoPlatform !== "youtube") {
      window.open(url);
    }else {
      setShowPlayer(true)
      setPlayerUrl(url)
    }
  }

  return (
    <div>
      {videos && (
        <Carousel
          deviceType={deviceType}
          partialVisible={false}
          swipeable={true}
          draggable={true}
          showDots={false}
          responsive={responsive}
          arrows={true}
          infinite={false}
          // autoPlaySpeed={3500}
          // transitionDuration={1000}
          // customTransition="all 5.5s ease-in-out"
          slidesToSlide={2}
          centerMode={true}
          // shouldResetAutoplay={false}
          renderButtonGroupOutside={true}
        // renderDotsOutside={true}
        >
          {videos?.map((video, idx) => {
            return (
              <Grid sx={{ cursor: "pointer" }} onClick={() => { clickToOpenVideoPlayer(video.url, video?.platform ? video?.platform : platform) }}>
                <Grid>
                  <Grid container>
                    <MDBTypography
                      component="img"
                      width={width}
                      height={height}
                      sx={{ px: 1 }}
                      src={video?.coverImage?.startsWith("http") ? video?.coverImage : httpService.getMediaBaseUrl(video.coverImage)}
                      key={idx}
                      style={{objectFit: "cover"}}
                    />
                  </Grid>
                  <Grid container pl={1} style={{marginTop: '10px'}}>
                    <Grid item>
                      <MDBTypography component="img" src={Like} width="14px" height="14px" />
                    </Grid>
                    <Grid item>
                      <MDBTypography
                        color="grayScale"
                        fontWeight="regular"
                        fontSize="sm"
                        lineHeightSize="xxl"
                        pl={0.5} pr={2}
                        style={{marginTop: '-3px'}}
                      >
                        {formatter.format(video.likeCount)}
                      </MDBTypography>
                    </Grid>

                    {video.viewCount !== 0 && (
                      <Grid display="flex">
                        <Grid item>
                          <MDBTypography component="img" src={Eye} />
                        </Grid>
                        <Grid item>
                          <MDBTypography
                            color="grayScale"
                            fontWeight="regular"
                            fontSize="sm"
                            lineHeightSize="xxl"
                            pl={0.5}
                            style={{marginTop: '-3px'}}
                          >
                            {formatter.format(video.viewCount)} 
                          </MDBTypography>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </Grid>


                {/* Sponsored Card in Edit and Preview Media Kit - Brand Logo and Platform Icons */}
                {(isSponsored && isSponsored === true) &&
                  <Grid container justifyContent="space-between" px={1}>
                    <Grid item xs={10} md={11}>
                      <Grid container display="flex">
                        <Grid item xs={2} md={2} xel={1.5}>
                          <MDBTypography sx={{ borderRadius: "48px" }} component="img" src={video?.campaignImage?.startsWith("http") ? video?.campaignImage : httpService.getMediaBaseUrl(video.campaignImage)} width="24px" height="24px" />
                        </Grid>
                        <Grid item xs={10} md={10} xel={10.5}>
                          <MDBTypography
                            color="white"
                            fontWeight="medium"
                            fontSize="md"
                            lineHeightSize="2xl"
                          >
                            {video.campaignBrand}
                          </MDBTypography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={2} md={1}>
                      <MDBTypography component="img" src={images[video?.platform]} width="24px" height="24px" />
                    </Grid>
                  </Grid>
                }
              </Grid>
            );
          })}
        </Carousel>
      )}
      {showPlayer === true &&
        <Grid>
          <Modal
            open={showPlayer}
            onClose={() => { setShowPlayer(false) }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ overflow: "scroll", display: "flex", alignItems: "center", justifyContent: "center", background: `rgba(17, 19, 21, 0.5)` }}
          >
            <VideoPlayer closeCallback={() => { setShowPlayer(false) }} url={playerUrl} />
          </Modal>
        </Grid>
      }
    </div>
  )
}