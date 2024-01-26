import MDBCard from 'components/MDBCard'
import MDBTypography from 'components/MDBTypography'
import React, { useEffect, useState } from 'react'
import { Grid, Modal } from '@mui/material'
import HttpService from 'service/HttpService'
import NoImage from 'assets/images/icons/svg/medium/GalleryIcon.svg';
import Star from 'assets/images/icons/svg/medium/Star2020.svg';
import PastCampaignsBrand from "../cards/PastCampaignsBrand";
import { useWidth } from 'components/Hooks/UseWidth'
import dot from 'assets/images/icons/svg/dot.svg'

export default function PastCampaigns(props) {
    const breakpoint = useWidth()[0]

    const [campaigns, setCampaigns] = useState([])
    const [open, setOpen] = React.useState(false);
    const [campaignPaginationObj, setCampaignPaginationObj] = useState({
        "pageNo": 1,
        "pageSize": 5,
        "total": 0
    })

    useEffect(() => {
        //Check mediakitId
        if (props?.mediakit?.id !== undefined && 
            props?.mediakit?.id !== null && 
            props?.mediakit?.id !== "" && props?.user?.id &&
            campaigns.length==0) {
            // Get campaigns by MediakitId
            getCampaignsByMediakitId(props?.mediakit?.id, campaignPaginationObj.pageNo, campaignPaginationObj.pageSize)
        }
    }, [props.mediakit])

    useEffect(() => {
        //Check mediakitId
        if (props?.mediakit?.id !== undefined && 
            props?.mediakit?.id !== null && 
            props?.mediakit?.id !== "" && 
            props?.user?.id &&
            campaigns.length==0) {
            // Get campaigns by MediakitId
            getCampaignsByMediakitId(props?.mediakit?.id, campaignPaginationObj.pageNo, campaignPaginationObj.pageSize)
        }
    }, [props?.user])

    // Get campaigns by Mediakit Id
    const getCampaignsByMediakitId = (id, pageNo, pageSize, isLoadMore) => {
        if (id !== undefined && id !== null && id !== "") { 
            let userDetails = props?.user;
            if (userDetails !== null && userDetails !== undefined) {
                let camapignsReq = {
                    "userId": userDetails?.id,
                    "clientId": userDetails?.clientId,
                    "mediakitId": id
                }
                HttpService.getCampaignsByPagination(camapignsReq, pageNo, pageSize).then((res) => {
                    if (res !== undefined && res?.data?.success !== undefined && res?.data?.success === true) {
                        //Check load more
                        if (isLoadMore === true) {
                            setCampaigns([...campaigns, ...res.data.data]);
                        } else {
                            setCampaigns(res.data.data)
                        }
                        // Set total records
                        if (res?.data?.total !== undefined && res?.data?.total !== null) {
                            let updatedPagiantionObj = {
                                "pageNo": campaignPaginationObj?.pageNo,
                                "pageSize": campaignPaginationObj.pageSize,
                                "total": res.data.total
                            }
                            setCampaignPaginationObj(updatedPagiantionObj)
                        }
                    }
                }).catch((error) => {
                    console.log("Error in getCampaignsByMediakitId", error)
                })
            }
        }
    }

    // Get more campaigns
    function getMoreCampaigns(e) {
        e?.preventDefault();
        let nextPage = campaignPaginationObj.pageNo + 1;
        let updatedPagiantionObj = {
            "pageNo": nextPage,
            "pageSize": campaignPaginationObj.pageSize,
            "total": campaignPaginationObj.total
        }
        setCampaignPaginationObj(updatedPagiantionObj)
        // Refresh campaigns
        getCampaignsByMediakitId(props?.mediakit?.id, nextPage, campaignPaginationObj.pageSize, true)
    } 

    return (
        <Grid container>
            <MDBCard
                borderRadius="none"
                bgcolor="cardBg"
                color=""
                isBorder={false}
                sx={{ m: 0, px: breakpoint === "sm" || breakpoint === "xs" ? 3 : 12, width: "inherit" }}
            >
                <Grid
                    sx={{ py: 8 }}
                >
                    <Grid container>
                        <Grid sx={{ mr: 6.8 }}>
                            <MDBTypography
                                color="white"
                                fontWeight="medium"
                                fontSize="4xl"
                                lineHeightSize="5xl"
                                pb={2}
                            >
                                Past Campaigns
                            </MDBTypography>
                            <Grid container pb={1}>
                                <MDBTypography
                                    color="white"
                                    fontWeight="regular"
                                    fontSize="md"
                                    lineHeightSize="2xl"
                                    opacity={0.8}
                                    pr={0.5}
                                >
                                    {campaignPaginationObj?.total}
                                </MDBTypography>
                                <MDBTypography
                                    color="white"
                                    fontWeight="regular"
                                    fontSize="md"
                                    lineHeightSize="2xl"
                                    opacity={0.8} pr={2}
                                >
                                    {
                                        (campaignPaginationObj?.total !== undefined) ?
                                            ((campaignPaginationObj?.total == 1) ? "Past Deal" : "Past Deals") :
                                            "Past Deals"
                                    }

                                </MDBTypography>
                                <MDBTypography
                                    component="img"
                                    src={dot}
                                   pr={2} 
                                    

                                />
                                <MDBTypography
                                    component="img"
                                    src={Star}
                                    height="20px"
                                    pr={1}

                                />
                                <MDBTypography
                                    color="white"
                                    fontWeight="regular"
                                    fontSize="md"
                                    lineHeightSize="2xl"
                                    opacity={0.8}
                                    pr={0.5}
                                >
                                    5.0
                                </MDBTypography>
                                <MDBTypography
                                    color="white"
                                    fontWeight="regular"
                                    fontSize="md"
                                    lineHeightSize="2xl"
                                    opacity={0.8}
                                >
                                    Rating
                                </MDBTypography>
                            </Grid>
                        </Grid>

                        <Grid item alignSelf="center">
                            <Grid container
                                sx={{ cursor: "pointer" }}
                                onClick={() => { setOpen(true) }}
                            >
                                <Grid item>
                                    <Grid container>
                                        {campaigns?.map((campaign, idx) => (
                                            <Grid item>
                                                {
                                                    (campaign.imageUrl !== null && campaign.imageUrl !== undefined && campaign.imageUrl !== "") ?
                                                        <Grid item alignSelf="center">
                                                            <MDBTypography
                                                                key={idx}
                                                                component="img"
                                                                src={HttpService.getMediaBaseUrl(campaign.imageUrl)}
                                                                mr={5}
                                                                width="48px"
                                                                height="48px"
                                                                sx={{ borderRadius: "50%" }}
                                                            />
                                                        </Grid> :
                                                        <Grid item alignSelf="center">
                                                            <MDBTypography
                                                                component="img"
                                                                width="48px"
                                                                height="48px"
                                                                src={NoImage}
                                                                sx={{ borderRadius: "48px", border: "1px solid #8A8F93" }}
                                                                mr={5}
                                                            />
                                                        </Grid>
                                                }
                                            </Grid>
                                        ))
                                        }
                                    </Grid>
                                </Grid>
                                <Grid item alignSelf="center">
                                    {(campaignPaginationObj.total !== campaigns.length) &&
                                        <Grid >
                                            <MDBTypography
                                                color="grayScale"
                                                fontWeight="regular"
                                                fontSize="md"
                                                lineHeightSize="2xl"
                                                pb={0.5}
                                            >
                                                + 5 more
                                            </MDBTypography>
                                        </Grid>
                                    }
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* Modal to open all campaigns */}
                        <Modal
                            open={open}
                            onClose={() => { setOpen(false) }}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            style={{ overflow: "scroll" }}
                        >
                            <Grid
                                container
                                alignContent="center"
                                justifyContent="center"
                                style={{ height: "100%" }}
                            >
                                <Grid item xs={0.5} sm={0.5} md={2} lg={3} xl={3} xxl={3.75} xel={4} xxel={4.75} el={5} />
                                <Grid item xs={11} sm={11} md={8} lg={6} xl={5.32} xxl={4.5} xel={3.5} xxel={2.5} el={2}>{props?.user?.id}
                                    <PastCampaignsBrand closeCallback={() => { setOpen(false) }} mediakitId={props?.mediakit}  user={props?.user} />
                                </Grid>
                                <Grid item xs={0.5} sm={0.5} md={2} lg={3} xl={3} xxl={3.75} xel={4} xxel={4.75} el={5} />
                            </Grid>
                        </Modal>
                    </Grid>
                </Grid>
            </MDBCard>
        </Grid>
    )
}
