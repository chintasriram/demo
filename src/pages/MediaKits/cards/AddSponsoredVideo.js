import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MDBTypography from "components/MDBTypography";
import MDBCard from "components/MDBCard";
import CloseButton from "components/CloseButton";
import { Divider, Grid } from "@mui/material";
import SelectedSponsoredVideos from "./SelectedSponsoredVideos";
import { useEffect } from "react";
import HttpService from "service/HttpService";
import PlatformVideos from "./PlatformVideos";
import MDBButton from "components/MDBButton";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pb: 4, mt: 4 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function AddSponsoredVideo(props) {
  const [value, setValue] = React.useState(0);
  const [sponsoredList, setSponsoredList] = React.useState(null);
  const [youtubeList, setYoutubeList] = React.useState();
  const [instagramList, setInstagramList] = React.useState([]);
    // [
    //   {
    //     "id": "18360135535077986",
    //     "url": "https://www.instagram.com/reel/Cx00MjQvtNt/",
    //     "title": "Rare Sighting of Sambucha Laughing \n#sambucha #laughing #rare #tiktok #videos #viral #reels #cringe #throwback \n\nFollow--> @sambuchalive",
    //     "platform": null,
    //     "likeCount": 0,
    //     "viewCount": 0,
    //     "coverImage": "1361/thumb/18360135535077986.jpg",
    //     "like_count": 0,
    //     "shareCount": 0,
    //     "view_count": 0,
    //     "commentCount": 0,
    //     "totalInteraction": 0
    //   },
    //   {
    //     "id": "17975762015566206",
    //     "url": "https://www.instagram.com/reel/CxyPalVvKFC/",
    //     "title": "Sambucha is Just Being Honest ?? \n#sambucha #honest #reaction #cringe #tiktok #repost #viral #videos #reels \n\nFollow--> @sambuchalive",
    //     "platform": null,
    //     "likeCount": 0,
    //     "viewCount": 0,
    //     "coverImage": "1361/thumb/17975762015566206.jpg",
    //     "like_count": 0,
    //     "shareCount": 0,
    //     "view_count": 0,
    //     "commentCount": 0,
    //     "totalInteraction": 0
    //   },
    //   {
    //     "id": "18226137499220230",
    //     "url": "https://www.instagram.com/reel/CxvqnhlPvGG/",
    //     "title": "I Can't Believe Sambucha Said That... \n#sambucha #tiktok #cringe #videos #challenge #reaction #viral #videos #reels \n\nFollow--> @sambuchalive",
    //     "platform": null,
    //     "likeCount": 0,
    //     "viewCount": 0,
    //     "coverImage": "1361/thumb/18226137499220230.jpg",
    //     "like_count": 0,
    //     "shareCount": 0,
    //     "view_count": 0,
    //     "commentCount": 0,
    //     "totalInteraction": 0
    //   },
    //   {
    //     "id": "18002773760097650",
    //     "url": "https://www.instagram.com/reel/CxtF1AQygEj/",
    //     "title": "Sambucha Has The Funniest Reactions \n#sambucha #funny #reaction #cringe #tiktok #challenge #viral #videos #reels \n\nFollow--> @sambuchalive",
    //     "platform": null,
    //     "likeCount": 0,
    //     "viewCount": 0,
    //     "coverImage": "1361/thumb/18002773760097650.jpg",
    //     "like_count": 0,
    //     "shareCount": 0,
    //     "view_count": 0,
    //     "commentCount": 0,
    //     "totalInteraction": 0
    //   },
    //   {
    //     "id": "18052922950471401",
    //     "url": "https://www.instagram.com/reel/CxqhBj-Le2_/",
    //     "title": "Sambucha LOVES Furries \n#sambucha #furries #love #tiktok #cringe #watchuntiltheend #viral #videos #reels #throwback \n\nFollow--> @sambuchalive",
    //     "platform": null,
    //     "likeCount": 0,
    //     "viewCount": 0,
    //     "coverImage": "1361/thumb/18052922950471401.jpg",
    //     "like_count": 0,
    //     "shareCount": 0,
    //     "view_count": 0,
    //     "commentCount": 0,
    //     "totalInteraction": 0
    //   },
    //   {
    //     "id": "18279644974198801",
    //     "url": "https://www.instagram.com/reel/Cxn8NopyBLM/",
    //     "title": "Sambucha Watches The Cringest TikToks \n#sambucha #cringe #tiktoks #reaction #watchuntilltheend #viral #videos #reels \n\nFollow--> @sambuchalive",
    //     "platform": null,
    //     "likeCount": 0,
    //     "viewCount": 0,
    //     "coverImage": "1361/thumb/18279644974198801.jpg",
    //     "like_count": 0,
    //     "shareCount": 0,
    //     "view_count": 0,
    //     "commentCount": 0,
    //     "totalInteraction": 0
    //   },
    //   {
    //     "id": "17857048886996854",
    //     "url": "https://www.instagram.com/reel/CxlXhtWNP0r/",
    //     "title": "Sambucha is Not Scared Anymore \n#sambucha #notscared #horror #geoguessr #confident #viral #videos #reels \n\nFollow--> @sambuchalive",
    //     "platform": null,
    //     "likeCount": 0,
    //     "viewCount": 0,
    //     "coverImage": "1361/thumb/17857048886996854.jpg",
    //     "like_count": 0,
    //     "shareCount": 0,
    //     "view_count": 0,
    //     "commentCount": 0,
    //     "totalInteraction": 0
    //   },
    //   {
    //     "id": "17983737290455660",
    //     "url": "https://www.instagram.com/reel/Cxiyu0YPoOu/",
    //     "title": "Sambucha is SUPER Scared \n#sambucha #scary #scared #horror #geoguessr #toomuch #viral #videos #reels \n\nFollow--> @sambuchalive",
    //     "platform": null,
    //     "likeCount": 0,
    //     "viewCount": 0,
    //     "coverImage": "1361/thumb/17983737290455660.jpg",
    //     "like_count": 0,
    //     "shareCount": 0,
    //     "view_count": 0,
    //     "commentCount": 0,
    //     "totalInteraction": 0
    //   },
    //   {
    //     "id": "18022726822710348",
    //     "url": "https://www.instagram.com/reel/CxgN7duLHHB/",
    //     "title": "You Got To Be Kidding Me... \n#sambucha #scary #geoguessr #seriously #smh #watchuntiltheend #viral #videos #reels\n\nFollow--> @sambuchalive",
    //     "platform": null,
    //     "likeCount": 0,
    //     "viewCount": 0,
    //     "coverImage": "1361/thumb/18022726822710348.jpg",
    //     "like_count": 0,
    //     "shareCount": 0,
    //     "view_count": 0,
    //     "commentCount": 0,
    //     "totalInteraction": 0
    //   },
    //   {
    //     "id": "17983810259217606",
    //     "url": "https://www.instagram.com/reel/CxdpKeOJdvn/",
    //     "title": "Sambucha Seems To Be Enjoying This \n#sambucha #scary #horror #scared #geoguessr #viral #videos #reels \n\nFollow--> @sambuchalive",
    //     "platform": null,
    //     "likeCount": 0,
    //     "viewCount": 0,
    //     "coverImage": "1361/thumb/17983810259217606.jpg",
    //     "like_count": 0,
    //     "shareCount": 0,
    //     "view_count": 0,
    //     "commentCount": 0,
    //     "totalInteraction": 0
    //   },
    //   {
    //     "id": "17990017001108664",
    //     "url": "https://www.instagram.com/reel/CxbEVrMJWmu/",
    //     "title": "Sambucha is Scared.... \n#sambucha #scary #horror #geoguessr #scared #watchuntiltheend #viral #videos #reels \n\nFollow--> @sambuchalive",
    //     "platform": null,
    //     "likeCount": 0,
    //     "viewCount": 0,
    //     "coverImage": "1361/thumb/17990017001108664.jpg",
    //     "like_count": 0,
    //     "shareCount": 0,
    //     "view_count": 0,
    //     "commentCount": 0,
    //     "totalInteraction": 0
    //   },
    //   {
    //     "id": "17999747657303500",
    //     "url": "https://www.instagram.com/reel/CxYfiiqJDfz/",
    //     "title": "Chucky > Sambucha \n#sambucha #horror #chucky #geoguessr #scary #viral #videos #reels \n\nFollow--> @sambuchalive",
    //     "platform": null,
    //     "likeCount": 0,
    //     "viewCount": 0,
    //     "coverImage": "1361/thumb/17999747657303500.jpg",
    //     "like_count": 0,
    //     "shareCount": 0,
    //     "view_count": 0,
    //     "commentCount": 0,
    //     "totalInteraction": 0
    //   },
    //   {
    //     "id": "17994079739240434",
    //     "url": "https://www.instagram.com/reel/CxV6wSUBNHx/",
    //     "title": "Sambucha Plays Horror GeoGuessr \n#sambucha #horror #geoguessr #scary #scared #night #viral #videos #reels \n\nFollow--> @sambuchalive",
    //     "platform": null,
    //     "likeCount": 0,
    //     "viewCount": 0,
    //     "coverImage": "1361/thumb/17994079739240434.jpg",
    //     "like_count": 0,
    //     "shareCount": 0,
    //     "view_count": 0,
    //     "commentCount": 0,
    //     "totalInteraction": 0
    //   },
    //   {
    //     "id": "18003602750031948",
    //     "url": "https://www.instagram.com/p/CxV6aL9utXq/",
    //     "title": "Sam Took A Trip To Egypt!",
    //     "platform": null,
    //     "likeCount": 0,
    //     "viewCount": 0,
    //     "coverImage": "1361/thumb/18003602750031948.jpg",
    //     "like_count": 0,
    //     "shareCount": 0,
    //     "view_count": 0,
    //     "commentCount": 0,
    //     "totalInteraction": 0
    //   },
    //   {
    //     "id": "18382215631003311",
    //     "url": "https://www.instagram.com/reel/CxTV5nHtxs3/",
    //     "title": "Sambucha LOVES Zach King \n#sambucha #tiktok #zachking #popular #videos #views #viral #reels \n\nFollow--> @sambuchalive",
    //     "platform": null,
    //     "likeCount": 0,
    //     "viewCount": 0,
    //     "coverImage": "1361/thumb/18382215631003311.jpg",
    //     "like_count": 0,
    //     "shareCount": 0,
    //     "view_count": 0,
    //     "commentCount": 0,
    //     "totalInteraction": 0
    //   },
    //   {
    //     "id": "17914012583728395",
    //     "url": "https://www.instagram.com/reel/CxQxG-Avbrp/",
    //     "title": "Sambucha Gets His Mind Blown \n#sambucha #zachking #opticalillusion #tiktok #mindblown #viral #videos #reels \n\nFollow--> @sambuchalive",
    //     "platform": null,
    //     "likeCount": 0,
    //     "viewCount": 0,
    //     "coverImage": "1361/thumb/17914012583728395.jpg",
    //     "like_count": 0,
    //     "shareCount": 0,
    //     "view_count": 0,
    //     "commentCount": 0,
    //     "totalInteraction": 0
    //   },
    //   {
    //     "id": "17970530252419081",
    //     "url": "https://www.instagram.com/reel/CxOMTdHPKxy/",
    //     "title": "Sambucha Seems Jealous \n#sambucha #bellapoarch #tiktok #viral #popular #ranking #videos #reels \n\nFollow--> @sambuchalive",
    //     "platform": null,
    //     "likeCount": 0,
    //     "viewCount": 0,
    //     "coverImage": "1361/thumb/17970530252419081.jpg",
    //     "like_count": 0,
    //     "shareCount": 0,
    //     "view_count": 0,
    //     "commentCount": 0,
    //     "totalInteraction": 0
    //   },
    //   {
    //     "id": "18379500871065233",
    //     "url": "https://www.instagram.com/reel/CxLnhWepEmi/",
    //     "title": "Sambucha Finally Likes One \n#sambucha #tiktok #videos #reels #viral #popular #baby \n\nFollow--> @sambuchalive",
    //     "platform": null,
    //     "likeCount": 0,
    //     "viewCount": 0,
    //     "coverImage": "1361/thumb/18379500871065233.jpg",
    //     "like_count": 0,
    //     "shareCount": 0,
    //     "view_count": 0,
    //     "commentCount": 0,
    //     "totalInteraction": 0
    //   },
    //   {
    //     "id": "17874657875914311",
    //     "url": "https://www.instagram.com/reel/CxJCuEbPaeA/",
    //     "title": "Sambucha is Annoyed \n#sambucha #videos #tiktok #popular #billieeilish #viral  #reels \n\nFollow--> @sambuchalive",
    //     "platform": null,
    //     "likeCount": 0,
    //     "viewCount": 0,
    //     "coverImage": "1361/thumb/17874657875914311.jpg",
    //     "like_count": 0,
    //     "shareCount": 0,
    //     "view_count": 0,
    //     "commentCount": 0,
    //     "totalInteraction": 0
    //   },
    //   {
    //     "id": "18298811437143328",
    //     "url": "https://www.instagram.com/reel/CxGd8Axoee5/",
    //     "title": "Sambucha Hates TikTok \n#sambucha #tiktok #hates #popular #videos #viral #reels \n\nFollow--> @sambuchalive",
    //     "platform": null,
    //     "likeCount": 0,
    //     "viewCount": 0,
    //     "coverImage": "1361/thumb/18298811437143328.jpg",
    //     "like_count": 0,
    //     "shareCount": 0,
    //     "view_count": 0,
    //     "commentCount": 0,
    //     "totalInteraction": 0
    //   }
    // ]
  const [tiktokList, setTiktokList] = React.useState();
  const [youtubePagination, setYoutubePagination] = React.useState();
  const [instagramPagination, setInstagramPagination] = React.useState();
  const [tiktokPagination, setTiktokPagination] = React.useState();
  const [activeTabName, setActiveTabName] = React.useState("Sponsored"); //Instagram TikTok
  const [tabIndex, setTabIndex] = React.useState(0);
  const [loading, setIsloading] = React.useState(false)


  const tabIndexMap = { Sponsored: 0, Instagram: 1, YouTube: 2, TikTok: 3 };

  const handleChange = (event, newValue) => {
    setIsloading(false)
    setActiveTabName(event.target.innerText);
    setValue(newValue);
    setTabIndex(tabIndexMap[event.target.innerText]);
  };

  useEffect(() => {
    setInstagramPagination({
      pageNo: 1,
      pageSize: 20,
      platform: "instagram",
      mediaKitId: props?.mediakitId,
    });
    setYoutubePagination({
      pageNo: 1,
      pageSize: 20,
      platform: "youtube",
      mediaKitId: props?.mediakitId,
    });
    setTiktokPagination({
      pageNo: 1,
      pageSize: 20,
      platform: "tiktok",
      mediaKitId: props?.mediakitId,
    });
  }, []);

  useEffect(() => {
    if (activeTabName === "YouTube") {
      getYoutubeList();
    }
  }, [youtubePagination]);
  useEffect(() => {
    if (activeTabName === "Instagram") {
      getInstagramList();
    }
  }, [instagramPagination]);
  useEffect(() => {
    if (activeTabName === "TikTok") {
      getTiktokList();
    }
  }, [tiktokPagination]);

  useEffect(() => {
    if (activeTabName === "Instagram") {
      getInstagramList();
    } else if (activeTabName === "YouTube") {
      getYoutubeList();
    } else if (activeTabName === "TikTok") {
      getTiktokList();
    } else {
      if (sponsoredList == null) getSponsoredList();
    }
  }, [activeTabName]);

  const getSponsoredList = () => {
    HttpService.getSponsoredList(props?.mediakitId)
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
  const getInstagramList = () => {
    setIsloading(true)
    HttpService.getPlatformVideoList(instagramPagination)
      .then((res) => {
        setIsloading(false)
        if (
          res !== undefined &&
          res?.data?.success !== undefined &&
          res?.data?.success === true
        ) {
          console.log("res.data=",res.data)
          setInstagramList(res.data.data);
        }
      })
      .catch((error) => {
        setIsloading(false)
        console.log("Error in getSponsoredList", error);
      });
  };

  const getYoutubeList = () => {
    if (
      youtubeList === null ||
      youtubeList?.request.pageSize !== youtubePagination.pageSize
    ) {
      setIsloading(true)
      HttpService.getPlatformVideoList(youtubePagination)
        .then((res) => {
          setIsloading(false)
          if (
            res !== undefined &&
            res?.data?.success !== undefined &&
            res?.data?.success === true
          ) {
            setYoutubeList(res.data.data);
          }
        })
        .catch((error) => {
          setIsloading(false)
          console.log("Error in getYoutubelist", error);
        });
    }
  };

  const getTiktokList = () => {
    setIsloading(true)
    HttpService.getPlatformVideoList(tiktokPagination)
      .then((res) => {
        setIsloading(false)
        if (
          res !== undefined &&
          res?.data?.success !== undefined &&
          res?.data?.success === true
        ) {
          setTiktokList(res.data.data);
        }
      })
      .catch((error) => {
        setIsloading(false)
        console.log("Error in getSponsoredList", error);
      });
  };

  const selectVideoCallback = (req) => {
    HttpService.addSponsored(props?.mediakitId, req)
      .then((res) => {
        if (
          res !== undefined &&
          res?.data?.success !== undefined &&
          res?.data?.success === true
        ) {
          setSponsoredList(res.data.data);
          setValue(0);
          setTabIndex(0);
        }
      })
      .catch((error) => {
        console.log("Error in getSponsoredList", error);
      });
  };

  const removeSponsored = (req) => {
    HttpService.removeSponsored(props?.mediakitId, req.id)
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

  return (
    <Grid
      container
      alignContent="center"
      justifyContent="center"
      style={{ height: "100%" }}
    >
      <Grid
        item
        xs={0.5}
        sm={0.5}
        md={2}
        lg={3}
        xl={3}
        xxl={3.75}
        xel={4}
        xxel={4.75}
        el={5}
      />
      <Grid
        item
        xs={11}
        sm={11}
        md={8}
        lg={6}
        xl={5.32}
        xxl={4.5}
        xel={3.5}
        xxel={2.5}
        el={2}
      >
        <MDBCard
          sx={{ m: 0, px: 2.5, pt: 2.5, height: "auto", width: "inherit" }}
        >
          {/* Title : Settings */}
          <Grid
            container
            mb={3}
            mt={2}
            justifyContent="space-between"
            alignContent="center"
          >
            <MDBTypography
              color="white"
              fontWeight="medium"
              fontSize="4xl"
              lineHeightSize="5xl"
            >
              Sponsored List
            </MDBTypography>

            <CloseButton callback={props.closeCallback} />
          </Grid>
          {/* Basic Tabs */}
          <Grid sx={{ width: "100%" }}>
            <Grid>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Sponsored" {...a11yProps(0)} />
                {props?.platforms[1]?.isConnected && (
                  <Tab label="Instagram" {...a11yProps(1)} />
                )}
                {props?.platforms[0]?.isConnected && (
                  <Tab label="YouTube" {...a11yProps(2)} />
                )}
                {props?.platforms[2]?.isConnected && (
                  <Tab label="TikTok" {...a11yProps(3)} />
                )}
              </Tabs>
              <Divider sx={{ my: 0, height: "2px", mt: "-2px" }} />
            </Grid>
            <TabPanel value={tabIndex} index={0}>
              <SelectedSponsoredVideos
                data={sponsoredList}
                removeSponsored={removeSponsored}
              />
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
              <PlatformVideos
                isLoading={loading}
                pagination= {instagramPagination}
                setPagination={setInstagramPagination}
                data={instagramList}
                selectVideo={selectVideoCallback}
              />
            </TabPanel>
            <TabPanel value={tabIndex} index={2}>
              <PlatformVideos
                isLoading={loading}
                pagination= {youtubePagination}
                setPagination={setYoutubePagination}
                data={youtubeList}
                selectVideo={selectVideoCallback}
              />
            </TabPanel>
            <TabPanel value={tabIndex} index={3}>
              <PlatformVideos
                isLoading={loading}
                pagination= {tiktokPagination}
                setPagination={setTiktokPagination}
                data={tiktokList}
                selectVideo={selectVideoCallback}
              />
            </TabPanel>
          </Grid>
        </MDBCard>
      </Grid>
      <Grid
        item
        xs={0.5}
        sm={0.5}
        md={2}
        lg={3}
        xl={3}
        xxl={3.75}
        xel={4}
        xxel={4.75}
        el={5}
      />
    </Grid>
  );
}
