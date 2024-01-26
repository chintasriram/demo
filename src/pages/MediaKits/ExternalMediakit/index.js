import breakpoints from 'assets/bia-theme/base/breakpoints';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import HttpService from "service/HttpService";
import Instagram from "assets/images/icons/svg/medium/Instagram1414.svg";
import Youtube from "assets/images/icons/svg/medium/YouTube1414.svg"; 
import Tiktok from "assets/images/icons/svg/medium/TikTok1414.svg"; 
import PreviewMediakitMobile from '../PreviewMediakit/PreviewMediakitMobile';
import PreviewMediakitWeb from '../PreviewMediakit/PreviewMediakitWeb';
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

export default function ExternalMediakit() {
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
    const { state } = useLocation();
    const [mediakit, setMediakit] = useState({});
    const { biourl } = useParams();
    const [userDetails, setUserDetails] = useState(null);

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
            //Set MediakitId
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

    //Get user from session
    const getUserFromSession = () => {
        if (window.localStorage.getItem("user")) {
            let parsedUserInfo = JSON.parse(window.localStorage.getItem("user"));
            return parsedUserInfo;
        }
        return null;
    };

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
                    isExternal={true}
                    mediakit={mediakit}
                    user={userDetails}
                />
                :
                <PreviewMediakitWeb 
                    mediakitId={mediakitId} 
                    creatorStatisticsData={creatorBasicStatistics} 
                    statResponse={statResponse} 
                    statistics={statistics}
                    overall={overall}
                    isExternal={true}
                    mediakit={mediakit}
                    user={userDetails}
                />
            }
        </div>
    )
}
