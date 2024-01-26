import { Divider, Grid } from "@mui/material";
import React from "react";
import MDBCard from "../../../components/MDBCard";
import MDBTypography from "../../../components/MDBTypography";
import MDBButton from "../../../components/MDBButton";
import HttpService from "service/HttpService";
import Instagram from 'assets/images/icons/svg/large/Instagram3030.svg';
import Youtube from 'assets/images/icons/svg/large/YouTube3030.svg';
import Tiktok from 'assets/images/icons/svg/large/TikTok3030.svg';
import Like from 'assets/images/icons/svg/medium/Like.svg';
import Eye from 'assets/images/icons/svg/medium/EyeIcon.svg';

function SelectedSponsoredVideos(props) {
  const images = {
    youtube: Youtube,
    instagram: Instagram,
    tiktok: Tiktok,
  };
  return (
    <Grid sx={{ overflowY: "scroll", height: "50vh" }}>
      {props?.data?.map((item, idx) => (
        <MDBCard
          key={idx}
          borderRadius="md"
          sx={{ m: 0, mb: 1, width: "100%" }}
        >
          <Grid container>
            <Grid item sx={{ pr: 1.5 }} alignSelf="center">
              <MDBTypography
                component="img"
                width="80px"
                height="60px"
                src={
                  item?.coverImage?.startsWith("http")
                    ? item?.coverImage
                    : HttpService.getMediaBaseUrl(item?.coverImage)
                }
              />
            </Grid>

            <Grid item alignSelf="center">
              <MDBTypography
                color="white"
                fontWeight="medium"
                fontSize="md"
                lineHeightSize="xl"
                maxWidth="275px"
              >
                {item.title}
              </MDBTypography>
            </Grid>
            <Grid item ml="auto" alignSelf="center">
              <MDBButton
                size="large"
                variant="text"
                color="light_green"
                bgColor=""
                fontWeight="regular"
                fontSize="md"
                onClick={() => {
                  props?.removeSponsored(item);
                }}
              >
                Remove
              </MDBButton>
            </Grid>
          </Grid>

          <Divider sx={{ m: 0, my: 1 }} />

          <Grid container justifyContent="space-between">
            <Grid item display="flex">
              <Grid item>
                <MDBTypography
                  sx={{ borderRadius: "48px", mt: 0.5 }}
                  component="img"
                  src={
                    item?.campaignImage?.startsWith("http")
                      ? item?.campaignImage
                      : HttpService.getMediaBaseUrl(item.campaignImage)
                  }
                  width="24px"
                  height="24px"
                />
              </Grid>
              <Grid pl={1} item alignSelf="center">
                <MDBTypography
                  color="white"
                  fontWeight="medium"
                  fontSize="md"
                  lineHeightSize="2xl"
                >
                  {item.campaignBrand}
                </MDBTypography>
              </Grid>
            </Grid>
            <Grid item display="flex">
              <Grid item alignSelf="center" pr={1}>
                <MDBTypography
                  component="img"
                  src={Like}
                  width="14px"
                  height="14px"
                />
              </Grid>
              <Grid item alignSelf="center">
                <MDBTypography
                  color="grayScale"
                  fontWeight="regular"
                  fontSize="sm"
                  lineHeightSize="xxl"
                >
                  {item.likeCount} Likes
                </MDBTypography>
              </Grid>
            </Grid>
            <Grid item display="flex">
              {item.viewCount !== 0 && (
                <>
                  <Grid item alignSelf="center" pr={1}>
                    <MDBTypography component="img" src={Eye} />
                  </Grid>
                  <Grid item alignSelf="center">
                    <MDBTypography
                      color="grayScale"
                      fontWeight="regular"
                      fontSize="sm"
                      lineHeightSize="xxl"
                    >
                      {item.viewCount} Views
                    </MDBTypography>
                  </Grid>
                </>
              )}
            </Grid>
            <Grid item mt={0.6}>
              <MDBTypography component="img" src={images[item?.platform]} width="24px" height="24px" />
            </Grid>
          </Grid>
        </MDBCard>
      ))}
      
      {props?.data?.length === 0 &&
        <MDBCard
          borderRadius="md"
          sx={{ m: 0, width: "100%" }} style={{height: "100%"}}
        >
          <Grid container justifyContent="center" alignContent="center" style={{height: "100%"}}>
            <Grid item>
              <MDBTypography
                color="grayScale"
                fontWeight="medium"
                fontSize="md"
                lineHeightSize="xxl"
                px={3}
              >
                No sponsored videos yet
              </MDBTypography>
            </Grid>
          </Grid>
        </MDBCard>
      }
    </Grid>
  );
}

export default SelectedSponsoredVideos;
