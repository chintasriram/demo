import { Grid, Modal } from '@mui/material';
import React, { useState,useEffect } from 'react'
import MDBCard from '../../../components/MDBCard';
import MDBTypography from '../../../components/MDBTypography';
import MDBButton from '../../../components/MDBButton';
import CampaignsCard from './CampaignsCard';
import {ThreeDots} from 'react-loader-spinner';
import { ReactSearchAutocomplete } from "react-search-autocomplete";

function PlatformVideos(props) {
    console.log("props=",props)
    const [instagramVideosList, setInstagramVideosList] = useState(props?.data?.videos);
    // props?.data?.videos
    const [isSelected, setSelected] = useState(false)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false)
    const [selectedItem, setSelectedItem] = useState({})
    const campaignSelectionCallback = (campaign) => {
        let req = {
            mediaKitId: props?.data?.request?.mediaKitId,
            campaignImage: campaign.imageUrl,
            campaignBrand: campaign.brandName,
            campaignId: campaign.id,
            platform: props?.data?.request?.platform,
            coverImage: selectedItem?.coverImage,
            url: selectedItem?.url,
            title: selectedItem?.name,
            likeCount: selectedItem?.likeCount,
            viewCount: selectedItem?.viewCount,
            commentCount: selectedItem?.commentCount
        }
        props?.selectVideo(req);
    }
    const videoSelected = (item) => {
        handleOpen();
        setSelectedItem(item);
        setSelected(item)
    }

    const campaignSelected = (campaign) => {
        handleClose();
        campaignSelectionCallback(campaign);
    }

    // On scroll handler
    const onScrollHandler=(e)=>{
        if(e){
            const bottom = (e?.target?.scrollHeight - e?.target?.scrollTop === e?.target?.clientHeight);
            if (bottom && props?.setPagination &&  props?.pagination) {
                props?.setPagination({
                    pageNo: props.pagination["pageNo"],
                    pageSize: props.pagination["pageSize"]+10,
                    platform: props.pagination["platform"],
                    mediaKitId: props.pagination["mediaKitId"]
                })
            }else{
                props?.setPagination({
                    pageNo: props.pagination["pageNo"],
                    pageSize: 10,
                    platform: props.pagination["platform"],
                    mediaKitId: props.pagination["mediaKitId"]
                })
            }
        }
    }

    // Load more handler
    const loadMoreVideos=(e)=>{
        if(e){
            e?.preventDefault()
            // Check pagination
            if (props?.setPagination &&  props?.pagination) {
                props?.setPagination({
                    pageNo: props.pagination["pageNo"],
                    pageSize: props.pagination["pageSize"]+10,
                    platform: props.pagination["platform"],
                    mediaKitId: props.pagination["mediaKitId"]
                })
            }
        }
    }

    const handleOnSearch = (string, results) => {
        setInstagramVideosList(results.length > 0 ? results : props?.data)
      };

      const handleOnHover = (result) => {
      };
    
      const handleOnSelect = (item) => {
        setInstagramVideosList([item])
      };
    
      const handleOnFocus = () => {
      };
    
      const handleOnClear = () => {
        setInstagramVideosList(props?.data)
      };

      console.log("instagramVideosList=",instagramVideosList)

    return (
        <Grid sx={{ overflowY: "scroll", height: "50vh" }}>
             {props?.pagination?.platform === "instagram" && <ReactSearchAutocomplete
                            items={props?.data}
                            onSearch={handleOnSearch}
                            onHover={handleOnHover}
                            onSelect={handleOnSelect}
                            onFocus={handleOnFocus}
                            onClear={handleOnClear}
                            fuseOptions={{ keys: ["title", "url"] }}
                            resultStringKeyName={'title'}
                            styling={{ zIndex: 4 }} // To display it on top of the search box below
                            autoFocus
                        />}
            {
                instagramVideosList?.map((item, idx) => (

                    
                    <MDBCard
                        key={idx}
                        borderRadius="md"
                        sx={{ border: "1px solid #404344", m: 0, mb: 1, width: "100%" }}
                    >
                       
                        <Grid container >
                            <Grid item sx={{ pr: 1.5 }} alignSelf="center">
                                <MDBTypography
                                    component="img"
                                    width="80px"
                                    height="60px"
                                    src={item.coverImage}
                                />
                            </Grid>

                            <Grid item alignSelf="center">
                                <MDBTypography
                                    color="white"
                                    fontWeight="medium"
                                    fontSize="md"
                                    lineHeightSize="xl"
                                    maxWidth="290px"
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
                                    onClick={() => videoSelected(item)}
                                >
                                    {
                                        isSelected === true ?
                                            "Selected" : "Select"
                                    }
                                </MDBButton>
                            </Grid>
                        </Grid>
                    </MDBCard>
                ))
            }

            {props?.data?.videos?.length === 0 &&
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
                                No videos
                            </MDBTypography>
                        </Grid>
                    </Grid>
                </MDBCard>
            }

            {/* Modal to link the video */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <CampaignsCard closeCallback={campaignSelected} mediakitId={props.mediakitId} />
            </Modal>
            {/* {((props?.data?.videos?.length !== undefined) && (props?.data?.request?.totalCount !== undefined) && (props?.data?.videos?.length !== props?.data?.request?.totalCount)) &&
                <Grid container justifyContent="center" alignContent="center">
                    {(props?.isLoading) ?
                        <ThreeDots 
                            height="58" 
                            width="58" 
                            radius="9"
                            color="#BBDCD2" 
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            visible={true}
                        /> :
                        <MDBButton
                            size="large"
                            variant="outlined"
                            bgColor="transparent"
                            color="light_green"
                            fontWeight="regular"
                            fontSize="md"
                            sx={{borderRadius:"6px"}}
                            onClick={(e)=> loadMoreVideos(e)}
                        >
                            Load more
                        </MDBButton>
                    }
                </Grid> 
            } */}
        </Grid>
    )
}

export default PlatformVideos;