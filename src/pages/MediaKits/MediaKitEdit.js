import { Divider, Grid } from '@mui/material'
import MDBButton from 'components/MDBButton'
import MDBTypography from 'components/MDBTypography'
import React, { useEffect, useRef, useState } from 'react'
import Header from './components/Header'
import Gallery from 'assets/images/icons/svg/medium/GalleryIcon1414.svg';
import ImageUploadService from "service/ImageUploadService"
import MediakitService from "service/MediakitService"
import CreatorBio from './components/CreatorBio'
import HttpService from "service/HttpService";
import { toast } from 'react-toastify'
import { useLocation } from 'react-router-dom'
import Instagram from "assets/images/icons/svg/medium/Instagram1414.svg";
import Youtube from "assets/images/icons/svg/medium/YouTube1414.svg";
import Tiktok from "assets/images/icons/svg/medium/TikTok1414.svg";
import CreatorStats from 'pages/CreatorStats'
import PastCampaigns from "./components/PastCampaigns";
import SetPackages from './components/SetPackages'
import ResponsiveSetPackage from './components/ResponsiveSetPackages'
import YoutubeMediaCard from './components/YoutubeMediaCard'
import TiktokMediaCard from './components/TiktokMediaCard'
import InstagramMediaCard from './components/InstagramMediaCard'
import SponsoredPostsCard from './components/SponsoredPostsCard'
import { useWidth } from 'components/Hooks/UseWidth'
import RSSidenav from './components/RSSidenav'
import TransparentLayer from "assets/images/icons/transparent_layer1.png";
import ImageCrop from 'components/ImageCrop'
import EditIcon from 'assets/images/icons/svg/medium/EditIcon1818.svg'
import toastIcon from 'assets/images/icons/svg/medium/ToastSuccess.svg'


export default function MediaKitEdit() {
  const inputRef = useRef(null);
  const profileImageInputRef = useRef(null);
  const breakpoint = useWidth()[0]

  //Configure toast
  toast.configure();
  const { state } = useLocation();
  const creatorStatisticsData = [
    {
      socialIcon: Youtube,
      socialIconName: "Youtube",
      followers: "",
      userId: "",
      isConnected: false
    },
    {
      socialIcon: Instagram,
      socialIconName: "Instagram",
      followers: "",
      userId: "",
      isConnected: false
    },
    {
      socialIcon: Tiktok,
      socialIconName: "Tiktok",
      followers: "",
      userId: "",
      isConnected: false
    },
  ];
  const [mediakit, setMediakit] = useState({});
  const [user, setUser] = useState(null);
  const [statResponse, setStatResponse] = useState({});
  const [currentPlatform, setCurrentPlatform] = useState({});
  const [statistics, setStatistics] = useState(null);
  const [overall, setOverall] = useState({});
  const [creatorBasicStatistics, setCreatorBasicStatistics] = useState(
    creatorStatisticsData
  );

  const youtubeLinkVideoGridRef = useRef(null)
  const instaLinkVideoGridRef = useRef(null)
  const tiktokLinkVideoGridRef = useRef(null)
  const sponsoredLinkVideoGridRef = useRef(null)

  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [selectedCoverImgFile, setSelectedCoverImgFile] = useState(null)
  const [isCoverImageCropperShow, setIsCoverImageCropperShow] = useState(false)
  const [imageSelectedType, setImageSelectedType] = useState("")
  const [isProfileImageCropperShow, setIsProfileImageCropperShow] = useState(false)
  const [selectedProfileImgFile, setSelectedProfileImgFile] = useState(null)
  const [profileImageUrl, setProfileImageUrl] = useState("");

  useEffect(() => {
    // Get user info
    let userInfo = getUserFromSession();
    if (userInfo !== null) {
      setUser(userInfo);
    }

    // Get sm statistics
    getSmStatistics();

    //Check mediakitId
    if (
      state?.mediakitId !== undefined &&
      state?.mediakitId !== null &&
      state?.mediakitId !== ""
    ) {
      //Get Mediakit by Id
      getMediakitById(state.mediakitId);
    }
  }, [state?.mediakitId]);


  // Get Mediakit by Id
  const getMediakitById = (id) => {
    HttpService.getMediaKitById(id)
      .then((res) => {
        if (
          res !== undefined &&
          res?.data?.success !== undefined &&
          res?.data?.success === true
        ) {
          setMediakit(res.data.data);
          //Cover image
          if (res.data.data.coverImageUrl !== "" && res.data.data.coverImageUrl !== null && res.data.data.coverImageUrl !== undefined) {
            setCoverImageUrl(res.data.data.coverImageUrl);
          }

          //Profile Image
          if (res?.data?.data?.imageUrl) {
            setProfileImageUrl(res.data.data.imageUrl);
          }
        }
      })
      .catch((error) => {
        console.log("Error in getMediakitById", error);
      });
  };



  //Get user from session
  const getUserFromSession = () => {
    if (window.localStorage.getItem("user")) {
      let parsedUserInfo = JSON.parse(window.localStorage.getItem("user"));
      return parsedUserInfo;
    }
    return null;
  };

  //Refresh mediakit
  const refreshMediakit = () => {
    getMediakitById(mediakit.id)
  }

  // Get sm statistics
  function getSmStatistics() {
    // Get sm statistics API call
    let userDetails = getUserFromSession();
    if (userDetails !== null && userDetails !== undefined) {
      let req = {
        id: userDetails?.id,
        clientId: userDetails?.clientId,
        userId: userDetails?.id,
      };

      HttpService.getPlatformAnalytics(req).then((res) => {
        if (
          res?.data !== undefined &&
          res?.data?.success === true &&
          res?.data?.data !== undefined
        ) {
          // Set statistics data
          setStatResponse(res);
          setCreatorStatistics(res);
          if (res.data.data?.youtubeAnalytics != null) {
            setYoutubeDetails(res);
            setCurrentPlatform("youtube");
          } else if (res.data.data?.instaAnalytics != null) {
            setInstagramDetails(res);
            setCurrentPlatform("instagram");
          }
        }
      });
    }
  }

  function setCreatorStatistics(res) {
    if (res.data.data?.youtubeAnalytics) {
      creatorStatisticsData[0].followers =
        res.data.data?.youtubeAnalytics?.overallAnalytics?.subscriptionCount;
      creatorStatisticsData[0].userId =
        res.data.data?.youtubeAnalytics?.overallAnalytics?.handler;
      creatorStatisticsData[0].isConnected = true;
    }
    if (res.data.data?.instaAnalytics) {
      creatorStatisticsData[1].followers =
        res.data.data?.instaAnalytics?.overallAnalytics?.subscriptionCount;
      creatorStatisticsData[1].userId =
        res.data.data?.instaAnalytics?.overallAnalytics?.handler;
      creatorStatisticsData[1].isConnected = true;
    }
    if (res.data.data?.tiktokAnalytics) {
      creatorStatisticsData[2].followers =
        res.data.data?.tiktokAnalytics?.overallAnalytics?.subscriptionCount;
      creatorStatisticsData[2].userId =
        res.data.data?.tiktokAnalytics?.overallAnalytics?.handler;
      creatorStatisticsData[2].isConnected = true;
    }
    setCreatorBasicStatistics(creatorStatisticsData);
  }

  function setInstagramDetails(res) {
    res.data.data.instaAnalytics.periodAnalytics["platform"] =
      res.data.data.instaAnalytics.platform;
    setStatistics(res.data.data.instaAnalytics.periodAnalytics);
    setOverall(res.data.data.instaAnalytics.overallAnalytics);
  }

  function setYoutubeDetails(res) {
    res.data.data.youtubeAnalytics.periodAnalytics["platform"] =
      res.data.data.youtubeAnalytics.platform;
    setStatistics(res.data.data.youtubeAnalytics.periodAnalytics);
    setOverall(res.data.data.youtubeAnalytics.overallAnalytics);
    // Set the basic statistics 
  }

  //Cover image upload
  const handleClick = () => {
    inputRef.current.click();
    setImageSelectedType("coverimage")
  };

  //Profile image upload
  const handleProfileImage = () => {
    profileImageInputRef.current.click();
    setImageSelectedType("profileimage")
  }

  // Upload cover image
  const uploadCoverImage = (e) => {
    if (e) {
      let url = URL.createObjectURL(e.target.files[0]);
      setSelectedCoverImgFile(url);
      setIsCoverImageCropperShow(true)
    }
  };

  // Handle crop image submit callback
  const handleCropImgSubmitCallback = (selectedfile) => {
    if (selectedfile && selectedfile !== "" && mediakit.id) {
      setCoverImageUrl("");
      ImageUploadService.uploadCoverImage(selectedfile, mediakit.id, uploadCoverImageCallback);
      setIsCoverImageCropperShow(false)
    }
  }

  // Upload cover image callback
  const uploadCoverImageCallback = (res) => {
    setCoverImageUrl(res.coverImageUrl);
  }

  // Handle crop image cancel callback
  const handleCropImgCancelCallback = () => {
    setIsCoverImageCropperShow(false)
  }




  // Upload profile image
  const uploadProfileImage = (e) => {
    if (e) {
      let url = URL.createObjectURL(e.target.files[0]);
      setSelectedProfileImgFile(url);
      setIsProfileImageCropperShow(true)
    }
  };

  // Handle profile crop image submit callback
  const handleProfileCropImgSubmitCallback = (selectedfile) => {
    if (selectedfile && selectedfile !== "" && user?.id) {
      setProfileImageUrl("");
      ImageUploadService.upload(selectedfile, user.id, "userProfile", uploadProfileImageCallback);
      setIsProfileImageCropperShow(false)
    }
  }

  // Upload Profile image callback
  const uploadProfileImageCallback = (res) => {
    if (res && mediakit?.id) {
      //Update mediakit
      let updateMediakitReq = {
        "imageUrl": res
      }
      MediakitService.updateMediakit(mediakit.id, updateMediakitReq, updateMediakitSuccessCallback, updateMediakitErrorCallback)
    }
  }

  // Handle profile crop image cancel callback
  const handleProfileCropImgCancelCallback = () => {
    setIsProfileImageCropperShow(false)
  }

  //Update mediakit Success Callback
  const updateMediakitSuccessCallback = (mediakitData) => {
    if (mediakitData?.success === true) {
      setProfileImageUrl(mediakitData.data.imageUrl);
      toast.success("Media Kit profile image updated successfully", { position: toast.POSITION.TOP_LEFT,
         hideProgressBar: true, icon:<img src={toastIcon} /> })
    } else {
      updateMediakitErrorCallback();
    }
  }

  //Update mediakit error Callback
  const updateMediakitErrorCallback = () => {
    toast.error("Unable to update Media Kit profile image. Please try again", { position: toast.POSITION.TOP_LEFT, hideProgressBar: true })
  }
  return (
    <Grid sx={{ position: "relative" }}>
      <MDBTypography
        component="div"
        height="500px"
        width="100%"
        top="0"
        sx={{
          zIndex: -1,
          position: "absolute",
          background:
            "linear-gradient(180deg, #363938 0%, rgba(54, 57, 56, 0.991353) 6.67%, rgba(54, 57, 56, 0.96449) 13.33%, rgba(54, 57, 56, 0.91834) 20%, rgba(54, 57, 56, 0.852589) 26.67%, rgba(54, 57, 56, 0.768225) 33.33%, rgba(54, 57, 56, 0.668116) 40%, rgba(54, 57, 56, 0.557309) 46.67%, rgba(54, 57, 56, 0.442691) 53.33%, rgba(54, 57, 56, 0.331884) 60%, rgba(54, 57, 56, 0.231775) 66.67%, rgba(54, 57, 56, 0.147411) 73.33%, rgba(54, 57, 56, 0.0816599) 80%, rgba(54, 57, 56, 0.03551) 86.67%, rgba(54, 57, 56, 0.0086472) 93.33%, rgba(54, 57, 56, 0) 100%);",
        }}
      />
      {coverImageUrl !== "" && coverImageUrl !== undefined && (
        <div>
          <MDBTypography
            component="img"
            src={HttpService.getMediaBaseUrl(coverImageUrl)}
            height="375px"
            width={breakpoint === "xs" || breakpoint == "sm" || breakpoint == "md" || breakpoint == "lg" ? "100%" : "80%"}
            top="105px"
            sx={{ zIndex: -1, position: "absolute" }}
            style={{objectFit:"fill"}}
          />
          <MDBTypography
            component="img"
            src={TransparentLayer}
            height="380px"
            width="100%"
            top="105px"
            sx={{ zIndex: -1, position: "absolute" }}
          />
        </div>
      )}

      {/* Header */}
      <Grid sx={{ position: "fixed", width: "100%", zIndex: 1200 }}>
        <Header
          mediakit={mediakit}
          refreshCallback={refreshMediakit}
          youtubeScrollRef={youtubeLinkVideoGridRef}
          instaScrollRef={instaLinkVideoGridRef}
          tiktokScrollRef={tiktokLinkVideoGridRef}
          sponsoredScrollRef={sponsoredLinkVideoGridRef}
          isPreview={false}
        />
      </Grid>

      <Grid container sx={{ position: "relative", top: 118 }}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={9.5}>
          {/* Bio and Profile */}
          <Grid container justifyContent="flex-end" pt={6.8} pb={3} pr={breakpoint === "sm" || breakpoint === "xs" || breakpoint === 'md' ? 4 : 12}>
            <MDBButton
              size="medium"
              variant="contained"
              bgColor="white"
              color="black"
              borderSize="md"
              fontWeight="medium"
              fontSize="md"
              onClick={handleClick}
            >
              <MDBTypography component="img" src={Gallery} width="14px" height="14px" mb={0.5} mr={1} />
              {(coverImageUrl !== "") ? "Update Cover Image" : "Add Cover Image"}
            </MDBButton>
            <input
              style={{ display: 'none' }}
              ref={inputRef}
              type="file"
              accept='image/*'
              onClick={(e)=>e.target.value=""}
              onChange={uploadCoverImage}
            />
          </Grid>

          {/* cover Image crop popup */}
          <Grid>
            <ImageCrop
              id="coverimgcrop"
              isShow={isCoverImageCropperShow}
              selectedFile={selectedCoverImgFile}
              note={"Note : Allowed image formats are JPG, PNG and Upload an image, 1512px by 480px for the best results."}
              submitCallback={handleCropImgSubmitCallback}
              cancelCallback={handleCropImgCancelCallback}
            />
          </Grid>

          <Grid container px={breakpoint === "sm" || breakpoint === "xs" ? 3 : 12} pb={8} direction={breakpoint === "sm" || breakpoint === "xs" || breakpoint === "md" ? "column-reverse" : "row"}>
            <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
              <CreatorBio
                data={mediakit}
                userData={user}
                creatorStatisticsData={creatorBasicStatistics}
                isEdit={true}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
              <Grid container justifyContent={breakpoint === "sm" || breakpoint === "xs" || breakpoint === "md" ? "flex-start" : "flex-end"}>
                <Grid item>
                  {profileImageUrl !== "" && (
                    <Grid position="relative">
                      <MDBTypography width="min(275px, 375px)" height="min(400px, 500px)" sx={{ borderRadius: "24px" }} component="img" style={{objectFit: "cover"}} src={HttpService.getMediaBaseUrl(profileImageUrl)} />
                      <Grid container justifyContent="center" position="absolute" bottom={10} right={0} left={0} sx={{ background: "rgba(17, 19, 21, 0.7)", borderRadius: "0 0 24px 24px" }}>
                        <MDBButton
                          size="inherit"
                          variant="text"
                          color="grayScale"
                          borderSize="md"
                          fontWeight="medium"
                          fontSize="md"
                          onClick={handleProfileImage}
                        >
                          Edit Profile Image
                          <MDBTypography component="img" src={EditIcon} pl={2} />
                          <input
                            style={{ display: 'none' }}
                            ref={profileImageInputRef}
                            type="file"
                            accept='image/*'
                            onClick={(e)=>e.target.value=""}
                            onChange={uploadProfileImage}
                          />
                        </MDBButton>
                        <ImageCrop
                          id="profileimgcrop"
                          isShow={isProfileImageCropperShow}
                          selectedFile={selectedProfileImgFile}
                          //note={"Note : Allowed image formats are JPG, PNG and Upload an image, 375px by 500px for the best results."}
                          submitCallback={handleProfileCropImgSubmitCallback}
                          cancelCallback={handleProfileCropImgCancelCallback}
                        />
                      </Grid>
                    </Grid>
                  )}

                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Creator Statistics */}
          <Grid px={breakpoint === "sm" || breakpoint === "xs" ? 3 : 12} pb={15}>
            <CreatorStats isMediakit={true} isHome = {true} user={user}/>
          </Grid>
        </Grid>
        {/* Sidenav */}
        <Grid item xs={12} sm={12} md={12} lg={12} xl={2.5} display={{ xs: "none", sm: "none", md: "none", lg: "none", xl: "block" }} position="fixed" right={0} width="inherit">
          <RSSidenav
            mediakit={mediakit}
            refreshCallback={refreshMediakit}
            youtubeScrollRef={youtubeLinkVideoGridRef}
            instaScrollRef={instaLinkVideoGridRef}
            tiktokScrollRef={tiktokLinkVideoGridRef}
            sponsoredScrollRef={sponsoredLinkVideoGridRef}
          />
        </Grid>
      </Grid>

      {/* Past Campaigns */}
      <Grid py={8} >
        <PastCampaigns mediakit={mediakit}  user={user}/>
      </Grid>

      <Grid container pb={8}>
        {/* Rates */}
        <Grid item px={breakpoint === "sm" || breakpoint === "xs" ? 3 : 12} xs={12} sm={12} md={12} lg={12} xl={9.5}>
          {mediakit?.rates !== null && mediakit?.rates !== undefined && mediakit?.rates?.packages?.length > 3 && (
            <Grid>
              {/* Set Packages */}
              <SetPackages
                userInfo={user}
                minPostPrice={mediakit?.rates?.minimumPrice}
                offers={mediakit?.rates?.campaignTypes}
                packages={mediakit?.rates?.packages}
                mediaKitId={mediakit?.id}
                userData={user}
                isPricesView={mediakit?.rates?.viewRates}
              />
            </Grid>
          )}

          {mediakit?.rates !== null && mediakit?.rates !== undefined && mediakit?.rates?.packages?.length <= 3 && (
            <Grid>
              {/* Set Packages */}
              <ResponsiveSetPackage
                userInfo={user}
                minPostPrice={mediakit?.rates?.minimumPrice}
                offers={mediakit?.rates?.campaignTypes}
                packages={mediakit?.rates?.packages}
                mediaKitId={mediakit?.id}
                userData={user}
                isPricesView={mediakit?.rates?.viewRates}
              />
            </Grid>
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={2.5} />
      </Grid>
      <Divider />
      <Grid container pb={8}>
        {/* Rates */}
        <Grid item px={breakpoint === "sm" || breakpoint === "xs" ? 3 : 12} xs={12} sm={12} md={12} lg={12} xl={9.5}>
          {/* Social Platforms for To Link Videos */}

          {/* Youtube Link Video */}
          {(statResponse?.data?.data?.youtubeAnalytics !== undefined) &&
            <Grid item ref={youtubeLinkVideoGridRef}>
              <YoutubeMediaCard data={statResponse} mediakitId={mediakit?.id} />
            </Grid>
          }

          {/* Tiktok Link Video */}
          {(statResponse?.data?.data?.instaAnalytics !== undefined) &&
            <Grid item ref={tiktokLinkVideoGridRef} >
              <TiktokMediaCard data={statResponse} />
            </Grid>
          }

          {/* Instagram Link Video */}
          {(statResponse?.data?.data?.tiktokAnalytics !== undefined) &&
            <Grid item ref={instaLinkVideoGridRef}>
              <InstagramMediaCard data={statResponse} />
            </Grid>
          }

          {/* Sponsored Posts Link Video */}
          <Grid item ref={sponsoredLinkVideoGridRef}>
            <SponsoredPostsCard mediakitId={mediakit?.id} platforms={creatorBasicStatistics} isPreview={false} isEdit={true} />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={2.5} />
      </Grid>
    </Grid>
  )
}

