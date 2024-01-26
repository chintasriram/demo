import React, { useEffect, useState } from "react";
import { Grid, tooltipClasses } from "@mui/material";
import MDBCard from "components/MDBCard";
import MDBTypography from "components/MDBTypography";
import YourReach from "../components/YourReach";
import NavIcons from "../components/NavIcons";
import HorizontalStackBarChart from "appcomponents/Charts/BarCharts/HorizontalStackBarChart";
import DefaultDoughnutChart from "appcomponents/Charts/DoughnutCharts/DefaultDoughnutChart";
import HttpService from "service/HttpService";
import Graph from '../assets/images/icons/svg/medium/Vector14.svg'
import Arrow from '../assets/images/icons/svg/medium/Arrow.svg'
import FollowersIcon from '../assets/images/icons/svg/medium/FollowersIcon.svg'
import EngagementIcon from '../assets/images/icons/svg/medium/EngagementIcon.svg'
import ViewIcon from '../assets/images/icons/svg/medium/ViewIcon.svg'
import { Link } from "react-router-dom";
import MDBButton from "components/MDBButton";
import HomeLayer from 'assets/images/ImagesSvg/StatisticsLayer.png'
import formatter from './../service/NumberFormatService'
import { Tooltip } from "@mui/material";
import TooltipService from "service/TooltipService";

export default function CreatorStats(props) { 

  const [statistics, setStatistics] = useState({});
  const [overall, setOverall] = useState({});
  const [statResponse, setStatResponse] = useState({});
  const [platforms, setPlatforms] = useState([]);
  const [currentPlatform, setCurrentPlatform] = useState({});
  const [isCardShow, setIsCardShow] = useState(true);

  const [gdChartData, setGdChartData] = useState({});
  const [adChartData, setAdChartData] = useState({});
  const [ggChartData, setGgChartData] = useState({});
  let hrBarChartDataObj = { labels: [], datasets: [] };
  let donutChartDataObj = { labels: [], datasets: {} };

 
  const donutChartColors = [
    "light_blue",
    "brand_green",
    "brand_orange",
    "light_green",
    "light_purple",
    "brand_tan",
  ];

  useEffect(() => {
    if (props?.user?.id) {
      setIsCardShow(false);
      getSmStatistics();
    }
  }, [props?.user]);  

  // Get sm statistics
  function getSmStatistics() {
    let userDetails = props?.user;
    if (userDetails !== null && userDetails !== undefined) {
      let req = {
        id: userDetails?.id,
        clientId: userDetails?.clientId,
        userId: userDetails?.id,
      };
      // Get sm statistics API call
      HttpService.getPlatformAnalytics(req).then((res) => {
        if (
          res?.data !== undefined &&
          res?.data?.success === true &&
          res?.data?.data !== undefined
        ) {
          // Set statistics data
          setStatResponse(res);
          let primary = "";
          let count = 0;
          if (res.data.data?.youtubeAnalytics != null) {
            setIsCardShow(true);
            count =
              res.data.data.youtubeAnalytics.overallAnalytics.subscriptionCount;
            platforms.push("youtube");
            primary="youtube"
          }
          if (res.data.data?.instaAnalytics != null) {
            setIsCardShow(true);
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
            setIsCardShow(true);
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
      platforms.indexOf(currentPlatform) === (platforms.length - 1)
        ? 0
        : platforms.indexOf(currentPlatform) + 1;
    if (platforms[nextPlatformIndex] === "instagram") {
      if (statResponse.data.data?.instaAnalytics != null) {
        setInstagramDetails(statResponse);
        setCurrentPlatform("instagram");
      }
    } else if (platforms[nextPlatformIndex] === "youtube") {
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
  function setYoutubeDetails(res) {
    let data = res.data.data?.youtubeAnalytics;
    res.data.data.youtubeAnalytics.periodAnalytics["platform"] =
      res.data.data?.youtubeAnalytics.platform;
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

  //Prepare the horizontalStackBar chart data
  function prepareHrBarData(data, labelKey, dataKey) {
    let hrBarChartDataObj = {};
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

  //Get hrBarData colors
  function getHrbarChartColors(label) {
    // Check label
    switch (label.toLowerCase()) {
      case "men":
        return "brand_tan";
      case "women":
        return "light_purple";
      case "under 18":
        return "brand_tan";
      case "18-34":
        return "light_green";
      case "over 35":
        return "light_purple";
      default:
        return "light_green";
    }
  }

  // Statistics Time Periods for platforms data
  const periodsData = ["Last 30 Days", "Week", "Day"];

  //Slicing user name at first word
  const nameSlice = (name) => {
    if(name){
      return name.split(' ')[0]+"'s";
    }
    return "Your";
  } 
  return (
    <Grid>
      <MDBCard
        sx={{ m: 0, mb: 2, p: 0, width: "inherit" }}
        bgcolor={props?.isMediakit === true ? "transparent" : "cardBg"}
      >
        <Grid container justifyContent="space-between" pr={3.5} pt={2.875} pl={2.875}>
          <Grid item alignSelf="center">
            {/* Title  */}
            <MDBTypography
              color="white"
              fontWeight="medium"
              fontSize="xl"
              lineHeightSize="2xxl"
              textTransform="capitalize"
            >
              {/* {nameSlice(user)}'s  Reach */}
              {
                props?.isHome !== true && props?.user? `${nameSlice(props?.user?.name)}  Reach` : "Your Reach"
              }
            </MDBTypography>
          </Grid>
          <Grid item>
            {/*Dropdown */}
            {/* <BasicSelect
              placeholder="Last 30 Days"
              contents={periodsData}
            /> */}
          </Grid>
        </Grid>

        {!isCardShow && (
          <Grid mt={2.3}
            container justifyContent="center" alignContent="center"
            sx={{ height: "352px", borderRadius: "0 0 12px 12px", borderTop: "1px solid #3B3D40", background: `url(${HomeLayer})` }}
          >
            <Grid item>
              <Grid container alignItems="center" justifyContent="center">
                <Grid>
                  <MDBTypography
                    color="grayScale"
                    fontWeight="medium"
                    fontSize="md"
                    lineHeightSize="xxl"
                    pl={3} textAlign="center"
                  > To view stats, go to
                  </MDBTypography>
                </Grid>
                <Grid component={Link} to="/c/settings" state={{ tabIdx: 0 }}>
                  <MDBButton
                    size="medium"
                    variant="text"
                    color="light_green"
                    bgColor="transparent"
                    fontWeight="medium"
                    fontSize="md"
                    lineHeight="2xxl"
                    sx={{ p: 0, textDecoration: "underline" }}
                  >profile</MDBButton>
                </Grid>
                <Grid>
                  <MDBTypography
                    color="grayScale"
                    fontWeight="medium"
                    fontSize="md"
                    lineHeightSize="xxl"
                    textAlign="center"
                  >and link your accounts
                  </MDBTypography>
                </Grid>

              </Grid>
            </Grid>
          </Grid>
        )}

        {isCardShow && (
          <Grid pr={3.5} pb={2.875} pl={2.875}>
            <Grid >
              {/* Navigation Icons */}
              <NavIcons
                content={statistics?.platform}
                clickHandler={nextPlatform}
              />
            </Grid>

            <Grid container>
              {/* Followers, Engagement Rate and Views */}
              {overall?.subscriptionCount &&
                overall?.subscriptionCount !== "" &&
                overall?.subscriptionCount !== "0" && 
                     (
                  <Grid item xs={12} sm={6} xl={4} lg={4} md={4}>
                    
                    <YourReach
                      icon={FollowersIcon}
                      metrics={(currentPlatform && currentPlatform!== "youtube")?"Total Followers":"Subscribers"}
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
                      />
                      
                  </Grid>
                )}
               
              
                <Grid item xs={12} sm={6} xl={4} lg={4} md={4}>
                  <YourReach
                    icon={EngagementIcon}
                    metrics="Engagement Rate"
                    value={formatter.convertPercentage(statistics?.engagement?.totalRate)}
                    graph={Graph}
                    valueTooltip={TooltipService.getTooltip(currentPlatform,"engagement")?.value}
                    subvalueTooltip={TooltipService.getTooltip(currentPlatform,"engagement")?.subvalue}
                   
                    arrow={
                      statistics?.engagement?.increaseRate !== undefined
                        ? Arrow
                        : ""
                    }
                    subValue={""}
                  />
                </Grid>
              {statistics?.views?.totalCount &&
                statistics?.views?.totalCount !== "" &&
                statistics?.views?.totalCount !== "0" && (
                  <Grid item xs={12} sm={6} xl={4} lg={4} md={4}>
                    <YourReach
                      icon={ViewIcon}
                      metrics="Views"
                      value={statistics?.views?.totalCount}
                      graph={Graph}
                      valueTooltip={TooltipService.getTooltip(currentPlatform,"views")?.value}
                      subvalueTooltip={TooltipService.getTooltip(currentPlatform,"views")?.subvalue}
                      
                      arrow={
                        statistics?.views?.increaseCount !== undefined
                          ? Arrow
                          : ""
                      }
                      subValue={statistics?.views?.increaseCount}
                    />
                  </Grid>
                )}
              {statistics?.platform === "tiktok" &&
                overall?.viewsCount &&
                overall?.viewsCount !== "" &&
                overall?.viewsCount !== "0" && (
                  <Grid item xs={12} sm={6} xl={4} lg={4} md={4}>
                    <YourReach
                      icon={ViewIcon}
                      metrics="Likes"
                      value={overall?.viewsCount}
                      graph={Graph}
                      valueTooltip={TooltipService.getTooltip(currentPlatform,"views")?.value}
                      subvalueTooltip={TooltipService.getTooltip(currentPlatform,"views")?.subvalue}
                      arrow={
                        statistics?.views?.increaseCount !== undefined
                          ? Arrow
                          : ""
                      }
                      subValue={statistics?.views?.increaseCount}
                    />
                  </Grid>
                )}
            </Grid>
            <Grid container>
              <Grid item pr={2} xs={12} lg={6} md={6} xl={6} xxl={6} el={8}>
                <Grid container pb={1}>
                  {/* Gender Distribution */}
                  {statistics?.genderDistributions?.length > 0 && (
                    <MDBCard
                      borderRadius="md"
                      bgcolor="transparent"
                      sx={{ m: 0, width: "100%", width: "inherit" }}
                    > 
                      <Grid container>
                        <Tooltip title={TooltipService.getTooltip(currentPlatform,"chats")?.value} placement="right"> 
                        <MDBTypography
                          fontWeight="regular"
                          fontSize="md"
                          lineHeightSize="2xl"
                        >
                          
                          Gender Distribution
                        
                        </MDBTypography>
                        </Tooltip>
                        <HorizontalStackBarChart
                          chart={gdChartData}
                          width="inherit"
                          height="63px"
                          chartId="genderDistribution"
                        />
                      </Grid>
                    </MDBCard>
                  )}
                </Grid>
                <Grid container>
                  {/* Age Distribution */}
                  {statistics?.ageDistributions?.length > 0 && (
                    <MDBCard
                      borderRadius="md"
                      bgcolor="transparent"
                      sx={{ m: 0, mb: 1, width: "inherit" }}
                    >
                      <Grid container>
                        <Tooltip title={TooltipService.getTooltip(currentPlatform,"chats")?.value} placement="right"> 
                        <MDBTypography
                          fontWeight="regular"
                          fontSize="md"
                          lineHeightSize="2xl"
                        >
                          
                          Age Distribution
                          </MDBTypography>
                          </Tooltip>
                        <HorizontalStackBarChart
                          chart={adChartData}
                          width="inherit"
                          height="63px"
                          chartId="ageDistribution"
                        />
                      </Grid>
                    </MDBCard>
                  )}
                </Grid>
              </Grid>

              <Grid item pr={2} xs={12} lg={6} md={6} xl={6} xxl={6} el={4}>
                {/* Geographical Distribution */}
                {statistics?.geographicDistributions?.length > 0 && (
                  <MDBCard
                    borderRadius="md"
                    bgcolor="transparent"
                    sx={{ m: 0, width: "inherit" }}
                  >
                    <Grid container justifyContent="space-between">
                    <Tooltip title={TooltipService.getTooltip(currentPlatform,"chats")?.value} placement="right"> 
                      <MDBTypography
                        fontWeight="regular"
                        fontSize="md"
                        lineHeightSize="2xl"
                      >
                        Geographic Distribution
                      </MDBTypography>
                      </Tooltip>
                      {/* <BasicSelect  placeholder="Country"   contents={countries}/> */}
                    </Grid>
                    <DefaultDoughnutChart
                      chart={ggChartData}
                      width="inherit"
                      height="193px"
                    />
                  </MDBCard>
                )}
              </Grid>
            </Grid>
          </Grid>
        )}
      </MDBCard>
    </Grid>
  );
}
