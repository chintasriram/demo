import { Divider, Grid, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CreatorBio from "../components/CreatorBio";
import Header from "../components/Header";
import HttpService from "service/HttpService";
import MDBTypography from "components/MDBTypography";
import CreatorStats from "pages/CreatorStats";
import PastCampaigns from "../components/PastCampaigns";
import MDBCard from "components/MDBCard";
import ResponsiveSetPackage from "../components/ResponsiveSetPackages";
import SetPackages from "../components/SetPackages";
import YoutubeMediaCard from "../components/YoutubeMediaCard";
import TiktokMediaCard from "../components/TiktokMediaCard";
import InstagramMediaCard from "../components/InstagramMediaCard";
import SponsoredPostsCard from "../components/SponsoredPostsCard";
import { useWidth } from "components/Hooks/UseWidth";
import TransparentLayer from "assets/images/icons/transparent_layer1.png";
import BiaHomepage from "layouts/BiaHomepage";
import JoinToday from "../components/JoinToday";
import MDBButton from "components/MDBButton";
import DefaultBanner from 'assets/images/ImagesSvg/defaultBanner.svg'


export default function PreviewMediakitWeb(props) {
  const breakpoint = useWidth()[0]
  //Configure toast
  toast.configure();
  let history = useNavigate();

  const [user, setUser] = useState(props?.user);
  const [mediakit, setMediakit] = useState(props?.mediakit);
  const [data, setData] = useState("")
  const [open, setOpen] = React.useState(false);

  const onclick = () => {
    setOpen(false);
    history("/");
  }
  useEffect(() => {
      setUser(props?.user);
  }, [props?.user]);

  useEffect(() => {
    setMediakit(props?.mediakit);
}, [props?.mediakit]);

  return (
    <Grid>
      {mediakit?.coverImageUrl !== "" && mediakit?.coverImageUrl !== undefined && (
        <div>
          <MDBTypography
            component="img"
            src={HttpService.getMediaBaseUrl(mediakit?.coverImageUrl)}
            height={{ md: "480px", lg: "480px", xs: "326px", sm: "326px" }}
            width="100%"
            top="0"
            sx={{ zIndex: -1, position: "absolute" }}
            style={{ objectFit: "fill" }}
          />
          <MDBTypography
            component="img"
            src={TransparentLayer}
            height={{ md: "380px", lg: "380px", xs: "226px", sm: "226px" }}
            width="100%"
            top="105px"
            sx={{ zIndex: -1, position: "absolute" }}
          />
        </div>
      )}

      {(mediakit?.coverImageUrl === null || mediakit?.coverImageUrl === undefined) && (
        <MDBTypography
          component="img"
          src={DefaultBanner}  
          height={{ md: "480px", lg: "480px", xs: "326px", sm: "326px" }}
          width="100%"
          top="0"
          sx={{ zIndex: -1, position: "absolute" }}
          style={{ objectFit: "cover" }}
        />
      )}

      <Grid container>
        {/* Header */}
        {props?.isExternal !== true ? <Header isPreview={true} /> : <BiaHomepage isExternal={true} data={mediakit}/>}
      </Grid>

      {/* Null */}

      {data === null && (
        <Modal open={setOpen} style={{ overflow: "scroll" }}>
          <Grid
            container
            alignContent="center"
            justifyContent="center"
            style={{ minHeight: "100vh" }}
          >
            <MDBCard
              borderRadius="xl"
              bgcolor="light"
              sx={{ boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.48)", width: "550px" }}
            >
              <Grid sx={{ pt: 3, px: 1, textAlign: "center" }}>
                <MDBTypography
                  color="white"
                  fontWeight="medium"
                  fontSize="2xl"
                  lineHeightSize="4xl"
                >
                  The account you searched for does not exist
                </MDBTypography>
              </Grid>
              <Grid spacing={6} sx={{ pt: 3, pb: 4, px: 4, textAlign: "center" }}>
                <MDBButton
                  variant="contained"
                  color="black"
                  bgColor="light_green"
                  component="span"
                  fontWeight="bold"
                  fontSize="md"
                  borderSize="md"
                  sx={{ alignSelf: "center", py: "7px", px: 1, ml: 1 }}
                  onClick={(e) => { onclick() }}
                >
                  ok
                </MDBButton>
              </Grid>
            </MDBCard>
          </Grid>
        </Modal>
      )}

      <Grid container pt={15}>
        {/* Responsive Layout */}
        <Grid item xs={1} sm={1} md={1.5} lg={1.5} xl={2} xxl={2} xel={2} xxel={2} />
        <Grid item xs={10} sm={10} md={9} lg={9} xl={8} xxl={8} xel={8} xxel={8}>
          <Grid container pb={8} direction={breakpoint === "sm" || breakpoint === "xs" || breakpoint === "md" ? "column-reverse" : "row"}>
            <Grid item xs={6} sm={6} md={6} lg={7}>
              {/* Bio */}
              <CreatorBio
                data={mediakit}
                userData={user}
                creatorStatisticsData={props.creatorStatisticsData}
                isPreview={true}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={5}>
              {/* Profile */}
              <Grid container justifyContent="flex-end">
                {mediakit?.imageUrl &&
                  <MDBTypography
                    component="img"
                    width="min(325px, 375px)" height="min(450px, 500px)"
                    sx={{ borderRadius: "24px" }}
                    style={{ objectFit: "cover" }}
                    src={HttpService.getMediaBaseUrl(mediakit?.imageUrl)}
                  />
                }
              </Grid>
            </Grid>
          </Grid>
          <Grid pb={7}>
            {/* Statistics */}
            {((props?.isExternal === true && user?.userPlatformsModel?.length > 0) || props?.isExternal !== true) &&
              <CreatorStats isMediakit={true} user={user} />
            }
          </Grid>
        </Grid>
        <Grid item sm={1} md={1.5} lg={1.5} xl={2} xxl={2} xel={2} xxel={2} />
      </Grid>

      <Grid container pb={12}>
        {mediakit?.campaigns?.length > 0 && (
          <MDBCard
            borderRadius="none"
            bgcolor="cardBg"
            isBorder={false}
            sx={{ m: 0, p: 0, width: "100%" }}
          >
            <Grid container justifyContent="center" mx={-12}>
              <Grid item xs={2} />
              <Grid item xs={10}>
                <PastCampaigns mediakit={mediakit} user={user} />
              </Grid>
              <Grid item xs={2} />
            </Grid>
          </MDBCard>
        )}
      </Grid>

      <Grid container>
        {/* Responsive Layout */}
        <Grid item xs={2} />
        <Grid item xs={8}>
          <Grid pb={8}>
            {/* Packages */}
            {mediakit?.rates !== null && mediakit?.rates !== undefined && mediakit?.rates?.packages?.length > 3 && (
              <SetPackages
                userInfo={user}
                minPostPrice={mediakit?.rates?.minimumPrice}
                offers={mediakit?.rates?.campaignTypes}
                packages={mediakit?.rates?.packages}
                mediaKitId={mediakit?.id}
                isPricesView={mediakit?.rates?.viewRates}
                isPreviewExternal={true}
              />
            )}

            {mediakit?.rates !== null && mediakit?.rates !== undefined && mediakit?.rates?.packages?.length <= 3 && (
              <ResponsiveSetPackage
                userInfo={user}
                minPostPrice={mediakit?.rates?.minimumPrice}
                offers={mediakit?.rates?.campaignTypes}
                packages={mediakit?.rates?.packages}
                mediaKitId={mediakit?.id}
                isPricesView={mediakit?.rates?.viewRates}
                isPreviewExternal={true}
              />
            )}
          </Grid>
        </Grid>
        <Grid item xs={2} />
      </Grid>

      <Divider />

      <Grid container pt={8}>
        {/* Responsive Layout */}
        <Grid item xs={2} />
        <Grid item xs={8}>
          <Grid pb={8}>
            {/* Youtube */}
            {
              (props?.statResponse?.data?.data?.youtubeAnalytics) &&
              <YoutubeMediaCard data={props?.statResponse} />
            }

            {/* Tiktok */}
            {
              (props?.statResponse?.data?.data?.tiktokAnalytics) &&
              <TiktokMediaCard data={props?.statResponse} />
            }

            {/* Instagram */}
            {
              (props?.statResponse?.data?.data?.instaAnalytics) &&
              <InstagramMediaCard data={props?.statResponse} />
            }

            {/* Sponsored */}
            <SponsoredPostsCard mediakitId={mediakit?.id} platforms={props.creatorStatisticsData} isPreview={true} />
          </Grid>
        </Grid>
        <Grid item xs={2} />
      </Grid>

      <Grid>
        {/* External Mediakit  */}
        {
          props?.isExternal === true &&
          <JoinToday isRedirect={true} />
        }
      </Grid>
    </Grid>
  );
}
