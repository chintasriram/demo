import { Divider, Grid, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import BiaLogo from 'assets/images/icons/svg/large/BiaLogoWithText8648.svg'
import MDBTypography from "components/MDBTypography";
import MDBButton from "components/MDBButton";
import InstagramLogo from 'assets/images/icons/svg/large/InstagramColorIcon3232.svg'
import YoutubeLogo from 'assets/images/icons/svg/large/YouTubeColorIcon3232.svg'
import TiktokLogo from 'assets/images/icons/svg/large/TikTokColorIcon3232.svg'
import GlobeIcon from 'assets/images/icons/svg/medium/GlobeIcon.svg'
import CalenderIcon from 'assets/images/icons/svg/medium/CalenderIcon.svg'
import Instagram from 'assets/images/icons/svg/large/Instagram3030.svg';
import Youtube from 'assets/images/icons/svg/large/YouTube4028.svg';
import Tiktok from 'assets/images/icons/svg/large/TikTok3539.svg';
import NavIcons from "components/NavIcons";
import Graph from 'assets/images/icons/svg/medium/Vector14.svg'
import Lock from 'assets/images/icons/svg/medium/Lock.svg';
import LockGreen from 'assets/images/icons/svg/medium/LockGreen.svg';
import Arrow from 'assets/images/icons/svg/medium/Arrow.svg'
import FollowersIcon from 'assets/images/icons/svg/medium/FollowersIcon.svg'
import EngagementIcon from 'assets/images/icons/svg/medium/EngagementIcon.svg'
import ViewIcon from 'assets/images/icons/svg/medium/ViewIcon.svg'
import Eye from 'assets/images/icons/svg/medium/EyeIcon.svg'
import Star from 'assets/images/icons/svg/medium/Star1414.svg'
import Like from 'assets/images/icons/svg/medium/Like.svg'
import CloseIcon from 'assets/images/icons/svg/medium/Cross1414.svg'
import Comment from 'assets/images/icons/svg/medium/Comment1616.svg'
import Rectangle from "assets/images/icons/Rectangle.png";
import TransparentLayer from "assets/images/icons/transparent_layer1.png";
import httpService from "service/HttpService";
import MDBCard from "components/MDBCard";
import DefaultDoughnutChart from "appcomponents/Charts/DoughnutCharts/DefaultDoughnutChart";
import HorizontalStackBarChart from "appcomponents/Charts/BarCharts/HorizontalStackBarChart";
import Connect from "appcomponents/Connect";
import MDBox from "components/MDBox";
import MobileFooter from "appcomponents/Footer/MobileFooter";
import HttpService from "service/HttpService";
import YourReach from "components/YourReach";
import categoryIcons from "categoryIcons";
import DefaultBanner from 'assets/images/ImagesSvg/defaultBanner.svg'
import ViewPrices from "../cards/ViewPrices";
import formatter from './../../../service/NumberFormatService'
import NumberFormatService from "service/NumberFormatService";
import TooltipService from "service/TooltipService";
import { useWidth } from "components/Hooks/UseWidth";


export default function PreviewMediakitMobile(props) {
  let history = useNavigate();
  const [isPricesView, setPricesView] = useState(false);
  const [openViewPrices, setOpenViewPrices] = React.useState(false);
  const [user, setUser] = useState(null);
  const [mediaKit, setMediaKit] = useState({});
  const [statistics, setStatistics] = useState(null);
  const [statResponse, setStatResponse] = useState({});
  const [currentPlatform, setCurrentPlatform] = useState({});
  const [platforms, setPlatforms] = useState([]);
  const [overall, setOverall] = useState({});
  const [sponsoredList, setSponsoredList] = useState([]);
  const [playerUrl, setPlayerUrl] = useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenViewPrices = () => setOpenViewPrices(true);
  const handleCloseViewPrices = () => setOpenViewPrices(false);

  const [openRequest, setOpenRequest] = React.useState(false);
  const handleOpenRequest = () => setOpenRequest(true);
  const handleCloseRequest = () => setOpenRequest(false);

  const [gdChartData, setGdChartData] = useState({});
  const [adChartData, setAdChartData] = useState({});
  const [ggChartData, setGgChartData] = useState({});
  let hrBarChartDataObj = { labels: [], datasets: [] };
  let donutChartDataObj = { labels: [], datasets: {} };
  const donutChartColors = [
    "light_blue", "brand_green", "brand_orange", "light_green", "light_purple", "brand_tan"
  ];

  const { biourl } = useParams();
  const screen = useWidth()[0]

  const [campaignPaginationObj, setCampaignPaginationObj] = useState({
    "pageNo": 1,
    "pageSize": 5,
    "total": 0
  })

  useEffect(() => {
    if (props?.mediakit) {
      setMediaKit(props?.mediakit)
      setPricesView(props?.mediakit?.rates?.viewRates);
    }
  }, [props?.mediakit]);

  useEffect(() => {
    if (props?.user) {
      setUser(props?.user);
    }
  }, [props?.user]);

  useEffect(() => {
    if (user) {
      getSmStatistics();
    }
  }, [user]);

  useEffect(() => {
    if (mediaKit && sponsoredList.length === 0) {
      getSponsoredList();
    }
  }, [mediaKit]);

  // For Sponsored List
  const getSponsoredList = () => {
    httpService
      .getSponsoredList(mediaKit.id)
      .then((res) => {
        if (
          res !== undefined &&
          res?.data?.success !== undefined &&
          res?.data?.success === true
        ) {
          setSponsoredList(res.data.data);
        }
      })
      .catch((error) => {
        console.log("Error in getSponsoredList", error);
      });
  };
  ;

  // Get sm statistics
  function getSmStatistics() {
    if (user !== null && user !== undefined) {
      let req = {
        id: user?.id,
        clientId: user?.clientId,
        userId: user?.id,
      };
      // Get sm statistics API call
      httpService.getPlatformAnalytics(req).then((res) => {
        if (
          res?.data !== undefined &&
          res?.data?.success === true &&
          res?.data?.data !== undefined
        ) {
          // Set statistics data
          setStatResponse(res);
          let primary = "youtube";
          let count = 0;
          if (res.data.data?.youtubeAnalytics != null) {
            count =
              res.data.data.youtubeAnalytics.overallAnalytics.subscriptionCount;
            platforms.push("youtube");
          }
          if (res.data.data?.instaAnalytics != null) {
            if (
              res.data.data.instaAnalytics.overallAnalytics.subscriptionCount >
              count
            ) {
              count =
                res.data.data.instaAnalytics.overallAnalytics.subscriptionCount;
              primary = "instagram";
            }
            platforms.push("instagram");
          }
          if (res.data.data?.tiktokAnalytics != null) {
            if (
              res.data.data.tiktokAnalytics.overallAnalytics.subscriptionCount >
              count
            ) {
              count =
                res.data.data.tiktokAnalytics.overallAnalytics
                  .subscriptionCount;
              primary = "tiktok";
            }
            platforms.push("tiktok");
          }
          if (primary === "youtube") {
            setYoutubeDetails(res);
            setCurrentPlatform("youtube");
          } else if (primary === "instagram") {
            setInstagramDetails(res);
            setCurrentPlatform("instagram");
          } else if (primary === "tiktok") {
            setTiktokDetails(res);
            setCurrentPlatform("tiktok");
          }
        }
        setPlatforms(platforms);
      });
    }
  }

  function nextPlatform() {
    let nextPlatformIndex =
      platforms.indexOf(currentPlatform) == (platforms.length - 1)
        ? 0
        : platforms.indexOf(currentPlatform) + 1;
    if (platforms[nextPlatformIndex] === "instagram") {
      if (statResponse.data.data?.instaAnalytics != null) {
        setInstagramDetails(statResponse);
        setCurrentPlatform("instagram");
      }
    } else if (platforms[nextPlatformIndex] == "youtube") {
      if (statResponse.data.data?.youtubeAnalytics != null) {
        setYoutubeDetails(statResponse);
        setCurrentPlatform("youtube");
      }
    } else {
      if (statResponse.data.data?.tiktokAnalytics != null) {
        setTiktokDetails(statResponse);
        setCurrentPlatform("tiktok");
      }
    }
  }

  function setInstagramDetails(res) {
    let data = res.data.data?.instaAnalytics;
    res.data.data.instaAnalytics.periodAnalytics["platform"] =
      res.data.data.instaAnalytics.platform;
    setStatistics(res.data.data.instaAnalytics.periodAnalytics);
    setOverall(res.data.data.instaAnalytics.overallAnalytics);
    if (data.periodAnalytics.genderDistributions?.length > 0) {
      //Preapre and Set Gender distribution chart data
      let genderDistributionChartData = prepareHrBarData(
        data.periodAnalytics.genderDistributions,
        "gender",
        "percentage"
      );
      setGdChartData(genderDistributionChartData);
    }
    if (data.periodAnalytics.ageDistributions?.length > 0) {
      //Preapre and set Age distribution chart data
      let ageDistributionChartData = prepareHrBarData(
        data.periodAnalytics.ageDistributions,
        "age",
        "percentage"
      );
      setAdChartData(ageDistributionChartData);
    }
    if (data.periodAnalytics.geographicDistributions?.length > 0) {
      //Preapre and set Geographic distribution chart data
      let geoGraphicChartData = prepareDonutChartData(
        data.periodAnalytics.geographicDistributions,
        "name",
        "percentage"
      );
      setGgChartData(geoGraphicChartData);
    }
  }

  function setTiktokDetails(res) {
    let data = res.data.data?.tiktoknalytics;
    res.data.data.tiktokAnalytics.periodAnalytics["platform"] =
      res.data.data.tiktokAnalytics.platform;
    setStatistics(res.data.data.tiktokAnalytics.periodAnalytics);
    setOverall(res.data.data.tiktokAnalytics.overallAnalytics);
    setGdChartData({});
    setAdChartData({});
    setGgChartData({});
  }

  function setYoutubeDetails(res) {
    let data = res.data.data?.youtubeAnalytics;
    res.data.data.youtubeAnalytics.periodAnalytics["platform"] =
      res.data.data.youtubeAnalytics.platform;
    setStatistics(res.data.data.youtubeAnalytics.periodAnalytics);
    setOverall(res.data.data.youtubeAnalytics.overallAnalytics);
    if (data.periodAnalytics.genderDistributions?.length > 0) {
      //Preapre and Set Gender distribution chart data
      let genderDistributionChartData = prepareHrBarData(
        data.periodAnalytics.genderDistributions,
        "gender",
        "percentage"
      );
      setGdChartData(genderDistributionChartData);
    } else {
      setGdChartData({});
    }
    if (data.periodAnalytics.ageDistributions?.length > 0) {
      //Preapre and set Age distribution chart data
      let ageDistributionChartData = prepareHrBarData(
        data.periodAnalytics.ageDistributions,
        "age",
        "percentage"
      );
      setAdChartData(ageDistributionChartData);
    } else {
      setAdChartData({});
    }
    if (data.periodAnalytics.geographicDistributions?.length > 0) {
      //Preapre and set Geographic distribution chart data
      let geoGraphicChartData = prepareDonutChartData(
        data.periodAnalytics.geographicDistributions,
        "name",
        "percentage"
      );
      setGgChartData(geoGraphicChartData);
    } else {
      setGgChartData({});
    }
  }

  //Prepare the horizontalStackBar chart data
  function prepareHrBarData(data, labelKey, dataKey) {
    if (data !== null && data !== undefined) {
      // Get data
      let labels = [];
      let datasets = [];

      data?.forEach((stack) => {
        //labels
        stack[labelKey] =
          stack[labelKey] === "Unknown" ? "Others" : stack[labelKey];
        let label =
          stack[dataKey] !== "" && stack[dataKey] !== "0"
            ? stack[labelKey] + " " + stack.percentage + "%"
            : stack[labelKey];
        labels.push(stack[labelKey]);

        //Datasets
        let datasetObj = { label: "", data: [], color: "" };
        datasetObj["label"] = label;
        datasetObj["data"] = [stack[dataKey]];
        datasetObj["color"] = getHrbarChartColors(stack[labelKey]);
        datasets.push(datasetObj);
      });
      hrBarChartDataObj["labels"] = labels;
      hrBarChartDataObj["datasets"] = datasets;

      return hrBarChartDataObj;
    }
  }

  //Prepare the Donut chart data
  function prepareDonutChartData(data, labelKey, dataKey) {
    if (data !== null && data !== undefined) {
      // Get data
      let labels = [];
      let datasetsData = [];
      let sum = 0;
      data?.forEach((donut, idx) => {
        //labels
        let label =
          donut[dataKey] !== "" && donut[dataKey] !== "0"
            ? donut[labelKey] + " " + donut.percentage + "%"
            : donut[labelKey];
        if (idx < 5) {
          labels.push(label);
          //Datasets data
          datasetsData.push(donut[dataKey]);
        } else if (idx === data.length - 1) {
          let label =
            sum !== 0
              ? "Others " + sum + "%"
              : "Others";
          labels.push(label);
          datasetsData.push(donut[dataKey]);
        } else {
          sum = sum + Number(donut.percentage);
        }
      });
      donutChartDataObj["labels"] = labels;
      donutChartDataObj["datasets"]["label"] = "Donut chart";
      donutChartDataObj["datasets"]["data"] = datasetsData;
      donutChartDataObj["datasets"]["backgroundColors"] = donutChartColors;

      return donutChartDataObj;
    }
  }

  const images = {
    youtube: Youtube,
    instagram: Instagram,
    tiktok: Tiktok,
  };

  //Get hrBarData colors
  function getHrbarChartColors(label) {
    // Check label
    switch (label.toLowerCase()) {
      case "men":
        return "brand_tan"
      case "women":
        return "light_purple"
      case "under 18":
        return "brand_tan"
      case "18-34":
        return "light_green"
      case "over 35":
        return "light_purple"
      default:
        return "light_green"
    }
  }
  // Onclick to open videos urls
  const clickToOpenVideoPlayer = (url, videoPlatform) => {
    if (!url.startsWith("http")) {
      url = "https://" + url;
    }
    setPlayerUrl(url);
    window.open(url);
  };

  const displayPlatformNames = {
    Instagram: "Instagram",
    Youtube: "YouTube",
    Tiktok: "TikTok"
  }
  const youreachwidth = "60vw"

  //Slicing user name at first word
  const nameSlice = (name) => {
    if(name){
      return name.split(' ')[0];
    }
    return name;
  }

  return (
    <div>
      {mediaKit?.coverImageUrl !== "" && mediaKit?.coverImageUrl !== undefined && (
        <div>
          <MDBTypography
            component="img"
            src={httpService.getMediaBaseUrl(mediaKit?.coverImageUrl)}
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
          <MDBTypography
            component="img"
            src={Rectangle}
            height={{ md: "380px", lg: "380px", xs: "326px", sm: "326px" }}
            width="100%"
            top="0"
            sx={{ zIndex: -1, position: "absolute" }}
          />
        </div>
      )}

      {(mediaKit?.coverImageUrl === null || mediaKit?.coverImageUrl === undefined) && (
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

      <Grid pl={4} py={3}>
        {/* Header */}
        <Grid container justifyContent="space-between" pr={4}>
          <Grid item component={Link} to="/c/home">
            <MDBTypography
              component="img"
              src={BiaLogo}
              width="62px"
              height="34px"
            />
          </Grid>
          {props?.isExternal === true &&
            <Grid item>
              <MDBButton
                component={Link}
                to="/waitlist"
                size="small"
                variant="contained"
                bgColor="light_green"
                color="black"
                borderSize="md"
                fontWeight="bold"
                fontSize="sm"
              >
                Join Waitlist
              </MDBButton>
            </Grid>
          }

          {props?.isExternal !== true &&
            <Grid item>
              <MDBButton
                size="small"
                variant="contained"
                bgColor="white"
                color="black"
                borderSize="md"
                fontWeight="bold"
                fontSize="md"
                sx={{ px: 2.5, my: 0.5 }}
                onClick={(e) => history(-1)}
              >
                <MDBTypography
                  component="img"
                  src={CloseIcon}
                  style={{ filter: "brightness(0)" }}
                  pr={1}
                />
                Close
              </MDBButton>
            </Grid>
          }
        </Grid>
        {mediaKit?.imageUrl &&
          <Grid container pt={6} pb={4} pr={4}>
            {/* Profile Image */}
            <MDBTypography
              component="img"
              src={HttpService.getMediaBaseUrl(mediaKit?.imageUrl)}
              sx={{ borderRadius: "100%", width: "120px", height: "120px" }}
              // style={{ objectFit: "cover" }}
            />
          </Grid>
        }

        <Grid>
          <Grid container pb={2} pr={4}>
            {/* Creator Name */}
            <MDBTypography
              color="white"
              fontWeight="medium"
              fontSize="4xl"
              lineHeightSize="5xl"
              textTransform="capitalize"
            >
              {user?.name}
            </MDBTypography>
          </Grid>

          <Grid container pr={4}>
            {/* Creator Content Types, City and Age */}
            <Grid item sm={12} xs={12} md={4} pb={1}>
              <Grid container>
                {
                  (mediaKit?.contentTypes !== null && mediaKit?.contentTypes?.length !== undefined) &&
                  mediaKit?.contentTypes?.map((cat, idx) => (
                    <Grid display="flex">
                      <MDBTypography
                        component="img"
                        src={categoryIcons[cat.toLowerCase().replaceAll(" ", "").replaceAll("&", "")]}
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
                        {cat + (idx === mediaKit.contentTypes.length - 1 ? "" : ", ")}
                      </MDBTypography>
                    </Grid>
                  ))
                }
              </Grid>
            </Grid>
            <Grid item sm={12} xs={12} md={4} pb={2}>
              <Grid container>
                <MDBTypography
                  component="img"
                  src={GlobeIcon}
                  width="20px"
                  height="20px"
                  mr={1}
                />
                <MDBTypography
                  color="white"
                  fontWeight="regular"
                  fontSize="md"
                  lineHeightSize="2xl"
                >
                  {mediaKit.location}
                </MDBTypography>
              </Grid>
            </Grid>
            <Grid item sm={12} xs={12} md={4} pb={2}>
              <Grid container>
                <MDBTypography
                  component="img"
                  src={CalenderIcon}
                  width="20px"
                  height="20px"
                  mr={1}
                />
                <MDBTypography
                  color="white"
                  fontWeight="regular"
                  fontSize="md"
                  lineHeightSize="2xl"
                >
                  {mediaKit.age}
                </MDBTypography>
              </Grid>
            </Grid>

            {/* Platform Details */}
            {props?.creatorStatisticsData?.map((data, idx) => (
              <Grid container pb={0.5} key={idx} display={data.followers === "" ? "none" : "flex"}>
                <Grid item display="flex" pr={2}>
                  <Grid item pr={1}>
                    <MDBTypography
                      component="img"
                      src={data.socialIcon}
                      width="14px"
                      height="14px"
                    />
                  </Grid>
                  <Grid item alignSelf="center">
                    <MDBTypography
                      color="grayScale"
                      fontWeight="regular"
                      fontSize="md"
                      lineHeightSize="2xl"
                    >
                      {displayPlatformNames[data.socialIconName]}
                    </MDBTypography>
                  </Grid>
                </Grid>
                <Grid item pr={2}>
                  <MDBTypography
                    color="white"
                    fontWeight="medium"
                    fontSize="xl"
                    lineHeightSize="4xl"
                  >
                    {data?.followers?.toString().includes("%") ? (data?.followers) : ((data?.followers) ? (formatter.format(data?.followers)) : "")}
                  </MDBTypography>
                </Grid>
                <Grid item alignSelf="center">
                  <MDBTypography
                    color="light_green"
                    fontWeight="regular"
                    fontSize="sm"
                    lineHeightSize="xxl"
                    maxWidth="140px"
                  >
                    {"@" + data.userId}
                  </MDBTypography>
                </Grid>
              </Grid>
            ))}

            <Grid container pt={1.8}>
              {/* Creator Description */}
              <MDBTypography
                color="grayScale"
                fontWeight="regular"
                fontSize="md"
                lineHeightSize="2xl"
                maxWidth="311px"
              >
                {mediaKit.bio}
              </MDBTypography>
            </Grid>

            <Grid container pt={5} pb={5}>
              <MDBButton
                size="medium"
                variant="contained"
                bgColor="light_green"
                color="black"
                borderSize="md"
                fontWeight="bold"
                fontSize="md"
                sx={{ px: 5 }}
                onClick={handleOpen}
              >
                Connect
              </MDBButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ overflow: "scroll" }}
      >
        <Connect userId={user?.id} closeCallback={handleClose} />
      </Modal>

      {
        (statistics && statistics !== null) &&
        <MDBox>
          <Grid container pb={2} pr={4} pl={4}>
            <Grid>
              {/* Reach */}
              <Grid item xs={12} sm={12}>
                <MDBTypography
                  color="white"
                  fontWeight="medium"
                  fontSize="xl"
                  lineHeightSize="2xxl"
                >
                  {/* {user?.name}'s Reach */}
                  {user?.name ? `${nameSlice(user?.name)}'s  Reach` : "Your Reach"}
                </MDBTypography>
              </Grid>
              <Grid item xs={12} sm={12}>
                {/* Platform Navigation */}
                <NavIcons
                  content={statistics?.platform}
                  clickHandler={nextPlatform}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid>
            <Grid container pl={4} pb={4} overflow="auto" flexWrap="nowrap" width="100vw">
              {/* Followers, Engagement Rate and Views */}
              {overall?.subscriptionCount &&
                overall?.subscriptionCount !== "" &&
                overall?.subscriptionCount !== "0" && (
                  <Grid item >
                    <YourReach
                      icon={FollowersIcon}
                      metrics="Followers"
                      value={overall?.subscriptionCount}
                      graph={Graph}
                      valueTooltip={TooltipService.getTooltip(currentPlatform,"followers")?.value}
                      subvalueTooltip={TooltipService.getTooltip(currentPlatform,"followers")?.subvalue}
                      arrow={
                        statistics?.followers?.increaseCount !== undefined
                          ? Arrow
                          : ""
                      }
                      subValue={statistics?.followers?.increaseCount}
                      width={youreachwidth}
                    />
                  </Grid>
                )}
              {statistics?.engagement?.totalRate &&
                statistics?.engagement?.totalRate !== "" &&
                statistics?.engagement?.totalRate !== "0" && (
                  <Grid item >
                    <YourReach
                      icon={EngagementIcon}
                      metrics="Engagement Rate"
                      value={formatter.convertPercentage(statistics?.engagement?.totalRate)}
                      graph={Graph}
                      valueTooltip={TooltipService.getTooltip(currentPlatform,"followers")?.value}
                      arrow={
                        statistics?.engagement?.increaseRate !== undefined
                          ? Arrow
                          : ""
                      }
                      subValue={""}
                      width={youreachwidth}
                    />
                  </Grid>
                )}
              {statistics?.views?.totalCount &&
                statistics?.views?.totalCount !== "" &&
                statistics?.views?.totalCount !== "0" && (
                  <Grid item >
                    <YourReach
                      icon={ViewIcon}
                      metrics="Views"
                      value={statistics?.views?.totalCount}
                      graph={Graph}
                      arrow={
                        statistics?.views?.increaseCount !== undefined
                          ? Arrow
                          : ""
                      }
                      subValue={statistics?.views?.increaseCount}
                      width={youreachwidth}
                    />
                  </Grid>
                )}
              {statistics?.platform === "tiktok" &&
                overall?.viewsCount &&
                overall?.viewsCount !== "" &&
                overall?.viewsCount !== "0" && (
                  <Grid item >
                    <YourReach
                      icon={ViewIcon}
                      metrics="Likes"
                      value={overall?.viewsCount}
                      graph={Graph}
                      arrow={
                        statistics?.views?.increaseCount !== undefined
                          ? Arrow
                          : ""
                      }
                      subValue={statistics?.views?.increaseCount}
                      width={youreachwidth}
                    />
                  </Grid>
                )}

              {/* Gender Distribution */}
              {statistics?.genderDistributions?.length > 0 && (
                <Grid item>
                  <MDBCard
                    borderRadius="md"
                    bgcolor="transparent"
                    sx={{ m: 0, mb: 2, mr: 2, width: "inherit", height: "150px" }}
                  >
                    <MDBTypography
                      fontWeight="regular"
                      fontSize="md"
                      lineHeightSize="2xl"
                    >
                      Gender Distribution
                    </MDBTypography>
                    <HorizontalStackBarChart
                      chart={gdChartData}
                      width="311px"
                      height="90px"
                      chartId="genderDistribution"
                    />
                  </MDBCard>
                </Grid>
              )}

              {/* Age Distribution */}
              {statistics?.ageDistributions?.length > 0 && (
                <Grid item>
                  <MDBCard
                    borderRadius="md"
                    bgcolor="transparent"
                    sx={{ m: 0, mb: 2, mr: 2, width: "inherit", height: "150px" }}
                  >
                    <MDBTypography
                      fontWeight="regular"
                      fontSize="md"
                      lineHeightSize="2xl"
                    >
                      Age Distribution
                    </MDBTypography>
                    <HorizontalStackBarChart
                      chart={adChartData}
                      width="311px"
                      height="90px"
                      chartId="ageDistribution"
                    />
                  </MDBCard>
                </Grid>
              )}

              {statistics?.geographicDistributions?.length > 0 && (
                <Grid item>
                  <MDBCard
                    borderRadius="md"
                    bgcolor="transparent"
                    sx={{ m: 0, mr: 2, width: "inherit", height: "200px" }}
                  >
                    <Grid container justifyContent="space-between">
                      <MDBTypography
                        fontWeight="regular"
                        fontSize="md"
                        lineHeightSize="2xl"
                      >
                        Geographic Distribution
                      </MDBTypography>
                      {/* <BasicSelect  placeholder="Country"   contents={countries}/> */}
                    </Grid>
                    <DefaultDoughnutChart
                      chart={ggChartData}
                      width="311px"
                      height="150px"
                    />
                  </MDBCard>
                </Grid>
              )}
            </Grid>
          </Grid>
        </MDBox>
      }

      <Grid container>
        {/* Past Campaigns */}
        <MDBCard
          isBorder={false}
          borderRadius="none"
          sx={{ m: 0, p: 0, py: 5, px: 4, width: "100%" }}
        >
          <Grid container pb={1}>
            <MDBTypography
              color="white"
              fontWeight="medium"
              fontSize="xl"
              lineHeightSize="2xxl"
            >
              Past Campaigns
            </MDBTypography>
          </Grid>
          <Grid container pb={3}>
            <Grid item display="flex" pr={0.8}>
              <MDBTypography
                color="white"
                fontWeight="regular"
                fontSize="sm"
                lineHeightSize="2xl"
                pr={0.5}
              >
                {mediaKit?.campaigns?.length}
              </MDBTypography>
              <MDBTypography
                color="white"
                fontWeight="regular"
                fontSize="sm"
                lineHeightSize="2xl"
              >
                {
                  (mediaKit?.campaigns?.length !== undefined) ?
                    ((mediaKit?.campaigns?.length == 1) ? "Past Deal" : "Past Deals") :
                    "Past Deals"
                }

              </MDBTypography>
            </Grid>
            <Grid item display="flex" pl={0.8}>
              <MDBTypography
                component="img"
                src={Star}
                height="20px"
                width="20px"
                mr={1}
              />
              <MDBTypography
                color="white"
                fontWeight="regular"
                fontSize="sm"
                lineHeightSize="2xl"
              >
                5.0 Rating
              </MDBTypography>
            </Grid>
          </Grid>

          {mediaKit?.campaigns?.map((campaignsData, idx) => (
            <Grid key={idx}>
              <Grid container>
                <Grid item pr={2}>
                  <MDBTypography
                    component="img"
                    src={httpService.getMediaBaseUrl(campaignsData?.imageUrl)}
                    height="48px"
                    width="48px"
                    sx={{ borderRadius: "48px" }}
                  />
                </Grid>
                <Grid item>
                  <Grid item>
                    <MDBTypography
                      color="white"
                      fontWeight="medium"
                      fontSize="md"
                      lineHeightSize="2xl"
                    >
                      {campaignsData.brandName}
                    </MDBTypography>
                  </Grid>
                  <Grid item>
                    <MDBTypography
                      color="grayScale"
                      fontWeight="regular"
                      fontSize="sm"
                      lineHeightSize="xxl"
                      maxWidth="180px"
                    >
                      {campaignsData.description}
                    </MDBTypography>
                  </Grid>
                </Grid>
              </Grid>
              <Divider sx={{ m: 0, my: 1.5, height: "2px" }} />
            </Grid>
          ))}
        </MDBCard>
      </Grid>

      <Grid container py={5} px={4}>
        {/* Set Packages */}
        <Grid container pb={3} justifyContent="space-between" alignItems="center">
          <Grid item pb={1}>
            <MDBTypography
              color="white"
              fontWeight="medium"
              fontSize="xl"
              lineHeightSize="2xxl"
            >
              Packages
            </MDBTypography>
          </Grid>
          <Grid item>
            {isPricesView !== true && (
              <MDBButton
                variant="outlined"
                bgColor="white"
                color=""
                borderSize="md"
                fontWeight="medium"
                fontSize="md"
                sx={{ px: 2, py: 0 }}
                onClick={handleOpenViewPrices}
              >
                Enter Password to View Prices
              </MDBButton>
            )}
          </Grid>
        </Grid>

        {/* Modal to open View Prices */}
        <Modal
          open={openViewPrices}
          onClose={handleCloseViewPrices}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{ overflow: "scroll" }}
        >
          <ViewPrices
            mediaKitId={mediaKit?.id}
            closeCallback={handleCloseViewPrices}
            viewPricesCallback={setPricesView}
          />
        </Modal>

        <Grid container>
          <Grid item mr={2}>
            <MDBCard sx={{ mx: 0, mt: 0, mb: 2 }}>
              <MDBTypography
                color="white"
                fontWeight="regular"
                fontSize="md"
                lineHeightSize="2xl"
              >
                Min Per Post
              </MDBTypography>
              <Grid container>
                {
                  (isPricesView !== true) &&
                  <MDBTypography
                    color="white"
                    fontWeight="regular"
                    fontSize="lg"
                    lineHeightSize="2xxl"
                  >
                    $
                  </MDBTypography>
                }
                <MDBTypography
                  color="white"
                  fontWeight="regular"
                  fontSize="lg"
                  lineHeightSize="2xxl"
                >
                  {isPricesView === true ? (
                    mediaKit?.rates?.minimumPrice !== undefined &&
                      mediaKit?.rates?.minimumPrice !== null ? (
                      NumberFormatService.convertPriceToUSDFormat(mediaKit?.rates?.minimumPrice)
                    ) : (
                      ""
                    )
                  ) : (
                    <MDBTypography component="img" src={Lock} />
                  )}
                </MDBTypography>
              </Grid>
            </MDBCard>
          </Grid>
          {screen !== "xs" &&
            <Divider orientation="vertical" sx={{ mx: screen === "md" ? 3 : 5 }} />
          }
          <Grid item pb={2}>
            {/* <MDBox>
              <MDBTypography
                color="white"
                fontWeight="regular"
                fontSize="md"
                lineHeightSize="2xl"
                textTransform="capitalize"
                pb={2}
              >
                {nameSlice(user?.name)} Offers:
              </MDBTypography>
            </MDBox> */}
            {mediaKit?.rates?.campaignTypes.map((offer, idx) => (
              <MDBCard
                sx={{ p: 0, py: 1, px: 2, m: 0, mb: 1 }}
                borderRadius="md"
                bgcolor="lightestGreen"
                isBorder={false}
                key={idx}
              >
                <MDBTypography
                  color="light_green"
                  fontWeight="medium"
                  fontSize="md"
                  lineHeightSize="2xl"
                >
                  {offer === "Paid Post" ? "Paid Posts" : offer}
                </MDBTypography>
              </MDBCard>
            ))}
          </Grid>
        </Grid> 
        <Grid container>
          <Divider
            orientation="horizontal"
            sx={{
              border: "1px solid #3B3D40",
              width: { xs: "100%", sm: "100%" },
            }}
          />
        </Grid>
        
        {/* Set Packages */}
        {mediaKit?.rates?.packages?.map((packageData, idx) => (
          <Grid container>
            <Grid
              container
              justifyContent="space-between"
              key={idx}
            >
              <Grid item xs>
                <Grid container justifyContent="space-between">
                  <Grid item xs pr={1}>
                    <Grid container alignItems="center">
                      <MDBTypography
                        color="white"
                        fontWeight="regular"
                        fontSize="sm"
                        lineHeightSize="xxl"
                        pr={1}
                      >
                        {packageData?.packageName}
                      </MDBTypography>
                      <Grid pt={0.5}>
                        {packageData?.platforms !== null &&
                          packageData?.platforms?.length > 0 && (
                            <Grid item display="flex">
                              {packageData?.platforms.map((platform, idx) => (

                                <Grid key={idx} pr={1.5}>
                                  {platform === "instagram" && (
                                    <Grid
                                      component="img"
                                      src={Instagram}
                                      width="18px"
                                      height="18px"
                                    />
                                  )}
                                  {platform === "tiktok" && (
                                    <Grid
                                      component="img"
                                      src={Tiktok}
                                      width="18px"
                                      height="18px"
                                    />
                                  )}
                                  {platform === "youtube" && (
                                    <Grid
                                      component="img"
                                      src={Youtube}
                                      width="18px"
                                      height="18px"
                                    />
                                  )}
                                </Grid>
                              ))}
                            </Grid>
                          )}
                      </Grid>
                    </Grid>
                    <Grid container pb={1}>
                      {isPricesView !== true &&
                        <MDBTypography
                          color="green"
                          fontWeight="regular"
                          fontSize="lg"
                          lineHeightSize="2xxl"
                          pr={0.125}
                        >
                          $
                        </MDBTypography>
                      }
                      <MDBTypography
                        color="green"
                        fontWeight="regular"
                        fontSize="md"
                        lineHeightSize="2xl"
                      >
                        {isPricesView === true ? (
                          (packageData?.price) ? (NumberFormatService.convertPriceToUSDFormat(packageData?.price)) : ""
                        ) : (
                          <MDBTypography component="img" src={LockGreen} />
                        )}
                      </MDBTypography>
                    </Grid>
                  </Grid>

                </Grid>
              </Grid>
              <Grid item alignSelf="center">
                <MDBButton
                  variant="contained"
                  bgColor="light_green"
                  color="black"
                  borderSize="md"
                  fontWeight="bold"
                  fontSize="sm"
                  sx={{ px: 1.5 }}
                  onClick={handleOpenRequest}
                >
                  Request
                </MDBButton>
              </Grid>
            </Grid>
            <Divider
              orientation="horizontal"
              sx={{
                border: "1px solid #3B3D40",
                width: { xs: "100%", sm: "100%" },
              }}
            />
          </Grid>
        ))}
      </Grid>

      {/*Youtube Media Cards */}
      <Grid container py={4} pl={4}>
        {
          (statResponse?.data?.data?.youtubeAnalytics) &&
          <Grid container pb={3}>
            <Grid item pr={1}>
              <MDBTypography component="img" src={YoutubeLogo} />
            </Grid>
            <Grid item pr={1}>
              <MDBTypography
                color="white"
                fontWeight="medium"
                fontSize="2xl"
                lineHeightSize="4xl"
              >
                YouTube
              </MDBTypography>
            </Grid>
            <Grid item>
              <MDBTypography
                color="grayScale"
                fontWeight="regular"
                fontSize="lg"
                lineHeightSize="2xxl"
                mt={0.5}
              >
                {
                  NumberFormatService.format(statResponse?.data?.data?.youtubeAnalytics?.overallAnalytics?.subscriptionCount)
                }{" "}
                Subscribers
              </MDBTypography>
            </Grid>
          </Grid>
        }

        <Grid container flexWrap="nowrap" overflow="auto" spacing={1}>
          {statResponse?.data?.data?.youtubeAnalytics?.latestVideos?.map(
            (video, idx) => (
              <>
                <Grid
                  item
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    clickToOpenVideoPlayer(video.url);
                  }}
                  style={{minWidth: '33.33%'}}
                >
                  <MDBTypography
                    component="img"
                    width="100%"
                    height="150px"
                    sx={{ px: 1, borderRadius: "12px" }}
                    src={
                      video?.coverImage?.startsWith("http")
                        ? video?.coverImage
                        : httpService.getMediaBaseUrl(video.coverImage)
                    }
                    key={idx}
                    mb={0.5}
                  />
                  <Grid container>
                    <Grid item ml={1} display="flex" pr={2}>
                      <MDBTypography
                        component="img"
                        src={Like}
                        // width="14px"
                        // height="14px"
                        mr={0.5}
                        mt={0.5}
                      />
                      <MDBTypography
                        color="grayScale"
                        fontWeight="regular"
                        fontSize="sm"
                        lineHeightSize="xxl"
                      >
                        {formatter.format(video.likeCount)} Likes
                      </MDBTypography>
                    </Grid>
                    {video.viewCount !== 0 && (
                      <Grid item display="flex">
                        <MDBTypography
                          component="img"
                          src={Eye}
                          // width="14px"
                          // height="14px"
                          mr={0.5}
                          mt={0.5}
                        />
                        <MDBTypography
                          color="grayScale"
                          fontWeight="regular"
                          fontSize="sm"
                          lineHeightSize="xxl"
                        >
                          {formatter.format(video.viewCount)} Views
                        </MDBTypography>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </>
            )
          )}
        </Grid>
      </Grid>

      {
        ((statResponse?.data?.data?.tiktokAnalytics) || (statResponse?.data?.data?.instaAnalytics) || sponsoredList?.length > 0) &&
        <Divider sx={{ m: 0 }} />
      }

      {/* Tiktok Media Cards */}
      <Grid container py={4} pl={4}>
        {
          (statResponse?.data?.data?.tiktokAnalytics) &&
          <Grid container pb={3}>
            <Grid item pr={1}>
              <MDBTypography component="img" src={TiktokLogo} />
            </Grid>
            <Grid item pr={1}>
              <MDBTypography
                color="white"
                fontWeight="medium"
                fontSize="2xl"
                lineHeightSize="4xl"
              >
                TikTok
              </MDBTypography>
            </Grid>
            <Grid item>
              <MDBTypography
                color="grayScale"
                fontWeight="regular"
                fontSize="lg"
                lineHeightSize="2xxl"
                mt={0.5}
              >
                {
                  NumberFormatService.format(statResponse?.data?.data?.tiktokAnalytics?.overallAnalytics?.subscriptionCount)
                }{" "}
                Followers
              </MDBTypography>
            </Grid>
          </Grid>
        }

        <Grid container flexWrap="nowrap" overflow="auto" spacing={1}>
          {statResponse?.data?.data?.tiktokAnalytics?.latestVideos?.map(
            (video, idx) => (
              <>
                <Grid
                  item
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    clickToOpenVideoPlayer(video.url);
                  }}
                  style={{minWidth: '33.33%'}}
                >
                  <MDBTypography
                    component="img"
                    width="100%"
                    height="150px"
                    sx={{ px: 1, borderRadius: "12px" }}
                    src={
                      video?.coverImage?.startsWith("http")
                        ? video?.coverImage
                        : httpService.getMediaBaseUrl(video.coverImage)
                    }
                    key={idx}
                    mb={0.5}
                  />
                  <Grid container>
                    <Grid item ml={1} display="flex" pr={2}>
                      <MDBTypography
                        component="img"
                        src={Like}
                        // width="14px"
                        // height="14px"
                        mr={0.5}
                        mt={0.5}
                      />
                      <MDBTypography
                        color="grayScale"
                        fontWeight="regular"
                        fontSize="sm"
                        lineHeightSize="xxl"
                      >
                        {formatter.format(video.likeCount)} Likes
                      </MDBTypography>
                    </Grid>
                    {video.viewCount !== 0 && (
                      <Grid item display="flex">
                        <MDBTypography
                          component="img"
                          src={Eye}
                          // width="14px"
                          // height="14px"
                          mr={0.5}
                          mt={0.5}
                        />
                        <MDBTypography
                          color="grayScale"
                          fontWeight="regular"
                          fontSize="sm"
                          lineHeightSize="xxl"
                        >
                          {formatter.format(video.viewCount)} Views
                        </MDBTypography>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </>
            )
          )}
        </Grid>
      </Grid>

      {
        ((statResponse?.data?.data?.instaAnalytics) || sponsoredList?.length > 0) &&
        <Divider sx={{ m: 0 }} />
      }

      {/* Instagram Media Cards */}
      <Grid container py={4} pl={4}>
        {
          (statResponse?.data?.data?.instaAnalytics) &&
          <Grid container pb={3}>
            <Grid item pr={1}>
              <MDBTypography component="img" src={InstagramLogo} />
            </Grid>
            <Grid item pr={1}>
              <MDBTypography
                color="white"
                fontWeight="medium"
                fontSize="2xl"
                lineHeightSize="4xl"
              >
                Instagram
              </MDBTypography>
            </Grid>
            <Grid item>
              <MDBTypography
                color="grayScale"
                fontWeight="regular"
                fontSize="lg"
                lineHeightSize="2xxl"
                mt={0.5}
              >
                {
                  formatter.format(statResponse?.data?.data?.instaAnalytics?.overallAnalytics?.subscriptionCount)
                }{" "}
                Followers
              </MDBTypography>
            </Grid>
          </Grid>
        }

        <Grid container flexWrap="nowrap" overflow="auto" spacing={1}>
          {statResponse?.data?.data?.instaAnalytics?.latestVideos?.map(
            (video, idx) => (
              <>
                <Grid
                  item
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    clickToOpenVideoPlayer(video.url);
                  }}
                  style={{minWidth: '33.33%'}}
                >
                  <MDBTypography
                    component="img"
                    width="100%"
                    height="150px"
                    sx={{ px: 1, borderRadius: "12px" }}
                    src={
                      video?.coverImage?.startsWith("http")
                        ? video?.coverImage
                        : httpService.getMediaBaseUrl(video.coverImage)
                    }
                    key={idx}
                    mb={0.5}
                  />
                  <Grid container>
                    <Grid item ml={1} display="flex" pr={2}>
                      <MDBTypography
                        component="img"
                        src={Like}
                        // width="14px"
                        // height="14px"
                        mr={0.5}
                        mt={0.5}
                      />
                      <MDBTypography
                        color="grayScale"
                        fontWeight="regular"
                        fontSize="sm"
                        lineHeightSize="xxl"
                      >
                        {formatter.format(video.likeCount)} Likes
                      </MDBTypography>
                    </Grid>
                    {video.viewCount !== 0 && (
                      <Grid item display="flex">
                        <MDBTypography
                          component="img"
                          src={Eye}
                          // width="14px"
                          // height="14px"
                          mr={0.5}
                          mt={0.5}
                        />
                        <MDBTypography
                          color="grayScale"
                          fontWeight="regular"
                          fontSize="sm"
                          lineHeightSize="xxl"
                        >
                          {formatter.format(video.viewCount)} Views
                        </MDBTypography>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </>
            )
          )}
        </Grid>
      </Grid>

      {
        (sponsoredList?.length > 0) &&
        <Divider sx={{ m: 0 }} />
      }

      {/* Sponsored Media Cards */}
      {sponsoredList && sponsoredList?.length > 0 && (
        <Grid container py={4} pl={4}>
          <Grid container pb={3}>
            <Grid item>
              <MDBTypography
                color="white"
                fontWeight="medium"
                fontSize="2xl"
                lineHeightSize="4xl"
              >
                Sponsored
              </MDBTypography>
            </Grid>
          </Grid>

          <Grid container flexWrap="nowrap" overflow="auto" spacing={1}>
            {sponsoredList?.map((video, idx) => (
              <>
                <Grid
                  item
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    clickToOpenVideoPlayer(video.url);
                  }}
                >
                  <MDBTypography
                    component="img"
                    width="311px"
                    height="235px"
                    sx={{ px: 1, borderRadius: "12px" }}
                    src={
                      video?.coverImage?.startsWith("http")
                        ? video?.coverImage
                        : httpService.getMediaBaseUrl(video.coverImage)
                    }
                    key={idx}
                    mb={0.5}
                  />
                  <Grid container>
                    <Grid item ml={1} display="flex" pr={2}>
                      <MDBTypography
                        component="img"
                        src={Like}
                        width="14px"
                        height="14px"
                        mr={0.5}
                        mt={0.5}
                      />
                      <MDBTypography
                        color="grayScale"
                        fontWeight="regular"
                        fontSize="sm"
                        lineHeightSize="xxl"
                      >
                        {formatter.format(video.likeCount)} Likes
                      </MDBTypography>
                    </Grid>
                    {video.viewCount !== 0 && (
                      <Grid item display="flex">
                        <MDBTypography
                          component="img"
                          src={Eye}
                          width="14px"
                          height="14px"
                          mr={0.5}
                          mt={0.5}
                        />
                        <MDBTypography
                          color="grayScale"
                          fontWeight="regular"
                          fontSize="sm"
                          lineHeightSize="xxl"
                        >
                          {formatter.format(video.viewCount)} Views
                        </MDBTypography>
                      </Grid>
                    )}
                  </Grid>
                  <Grid container pt={1} justifyContent="space-between">
                    <Grid item display="flex">
                      <MDBTypography
                        component="img"
                        src={
                          video?.campaignImage?.startsWith("http")
                            ? video?.campaignImage
                            : httpService.getMediaBaseUrl(video.campaignImage)
                        }
                        width="24px"
                        height="24px"
                        sx={{ borderRadius: "48px" }}
                        ml={0.8}
                      />
                      <MDBTypography
                        color="white"
                        fontWeight="medium"
                        fontSize="md"
                        lineHeightSize="2xl"
                        pl={1}
                      >
                        {video.campaignBrand}
                      </MDBTypography>
                    </Grid>
                    <Grid item>
                      <MDBTypography
                        component="img"
                        src={images[video?.platform]}
                        width="24px"
                        height="24px"
                        mr={0.8}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </>
            ))}
          </Grid>
        </Grid>
      )}

      <Modal
        open={openRequest}
        onClose={handleCloseRequest}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ overflow: "scroll" }}
      >
        <Connect userId={user?.id} closeCallback={handleCloseRequest} isRates={true} />
      </Modal>

      {props?.isExternal === true &&
        <MobileFooter />
      }
    </div>
  );
}
