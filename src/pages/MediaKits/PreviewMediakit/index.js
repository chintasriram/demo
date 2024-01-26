import breakpoints from 'assets/bia-theme/base/breakpoints';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import PreviewMediakitMobile from './PreviewMediakitMobile';
import PreviewMediakitWeb from './PreviewMediakitWeb';
import HttpService from "service/HttpService";
import Instagram from "assets/images/icons/svg/medium/Instagram1414.svg";
import Youtube from "assets/images/icons/svg/medium/YouTube1414.svg"; 
import Tiktok from "assets/images/icons/svg/medium/TikTok1414.svg"; 
import UserService from "service/UserService";

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

export default function PreviewMediakit() {
    const [mediakitId, setMediakitId] = useState("")
    const [windowWidth, setWindowWidth] = useState(0);
    const [creatorBasicStatistics, setCreatorBasicStatistics] = useState(
        creatorStatisticsData
    )
    const [currentPlatform, setCurrentPlatform] = useState({});
    const [statResponse, setStatResponse] = useState({});
    //Social media statistics
    const [statistics, setStatistics] = useState(null);
    const [overall, setOverall] = useState({});
    const [mediakit, setMediakit] = useState({});
    const [userDetails, setUserDetails] = useState(null);
    const { biourl } = useParams();

    const { state } = useLocation();

    const resizeWindow = () => {
        setWindowWidth(window?.innerWidth);
    };


    useEffect(() => {  
        if (biourl !== undefined && mediakit?.id === undefined) { 
          getMediakitByUrl(biourl);
        }
      }, []);
      
  // Get Mediakit by Id
  const getMediakitByUrl = (url) => {
    HttpService.getMediaKitByUrl(url)
      .then((res) => {
        if (
          res !== undefined &&
          res?.data?.success !== undefined &&
          res?.data?.success === true
        ) {
          setMediakit(res.data.data);
          getUserById(res?.data?.data.userId);
        } 
      })
      .catch((error) => {
        console.log("Error in getMediakitBy url ", error);
      });
  };
  
  const getUserById = (id) => {
    UserService.getUserById(id,setUser);
  };
  const setUser = (userRes) => {
    setUserDetails(userRes); 
  }
  useEffect(() => { 
    if(userDetails){
        getSmStatistics();
    } 
  }, [userDetails]);
  useEffect(() => { 

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
          getUserById(res?.data?.data.userId);

        }
      })
      .catch((error) => {
        console.log("Error in getMediakitById", error);
      });
  }; 
    // Get sm statistics
    function getSmStatistics() {
        // Get sm statistics API call 
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
    }

    useEffect(() => {
        resizeWindow();
        window?.addEventListener("resize", resizeWindow);
        return () => window?.removeEventListener("resize", resizeWindow);
    }, []); 

    return (
        <div>
            {
                ((windowWidth) < (breakpoints.values.lg)) ?
                <PreviewMediakitMobile 
                    mediakitId={mediakitId} 
                    creatorStatisticsData={creatorBasicStatistics} 
                    statResponse={statResponse} 
                    statistics={statistics} 
                    overall={overall}
                    isExternal={false} 
                    user={userDetails}
                    mediakit={mediakit}
                />
                :
                <PreviewMediakitWeb 
                    mediakitId={mediakitId} 
                    mediakit={mediakit}
                    user={userDetails}
                    creatorStatisticsData={creatorBasicStatistics} 
                    statResponse={statResponse} 
                    statistics={statistics}
                    overall={overall}
                />
            }
        </div>
    )
}
