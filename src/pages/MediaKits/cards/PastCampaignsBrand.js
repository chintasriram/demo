import { Divider, Grid } from '@mui/material'
import CloseButton from 'components/CloseButton'
import MDBCard from 'components/MDBCard'
import MDBTypography from 'components/MDBTypography'
import React, { useEffect, useState } from 'react'
import HttpService from 'service/HttpService'

export default function PastCampaignsBrand(props) {
    const [campaigns, setCampaigns] = useState([])

    useEffect(()=>{
        //Check mediakitId
        if(props?.mediakitId?.id !== undefined && props?.mediakitId?.id !== null && props?.mediakitId?.id !== ""){
            // Get campaigns by MediakitId
            getCampaignsByMediakitId(props?.mediakitId?.id)
        }
    },[props.mediakitId])
    
    // Get campaigns by Mediakit Id
    const getCampaignsByMediakitId=(id)=>{
        if(id !== undefined && id !== null && id !== ""){
        let userDetails = props?.user;
        if(userDetails!==null && userDetails!==undefined){
            let camapignsReq = {
            "userId": userDetails?.id,
            "clientId": userDetails?.clientId,
            "mediakitId": id
            }
            HttpService.getCampaignsByPagination(camapignsReq).then((res)=>{
            if(res !== undefined && res?.data?.success !== undefined && res?.data?.success === true){
                //Set Campaigns
                setCampaigns(res.data.data)
            }
            }).catch((error)=>{
            console.log("Error in getCampaignsByMediakitId",error)
            })
        }
    }}

    //Get user from session
    const getUserFromSession = () => {
        if(window.localStorage.getItem("user")){
        let parsedUserInfo = JSON.parse(window.localStorage.getItem("user"));
        return parsedUserInfo;
        }
        return null;
    };

    return (
        <Grid
            container
            alignContent="center"
            justifyContent="center"
            style={{ minHeight: "100vh" }}
        >
            <MDBCard sx={{ p: 0, m: 0, width: '540px'}}>
                {/* Header */}
                <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mt: 4, px: 3 }}
                >
                    <Grid item display="flex" >
                        <MDBTypography
                            fontWeight="medium"
                            fontSize="xl"
                            lineHeight="2xxl"
                        >
                            Past Campaigns
                        </MDBTypography>
                    </Grid>

                    {/* close button */}
                    <CloseButton callback={props.closeCallback}/>
                </Grid>

                {/* Divider */}
                <Divider />

                {/* body */}
                <Grid sx={{ maxHeight: "580px", overflowY: "scroll" }} pb={2.5}>
                    {campaigns?.map((data, idx) => (
                        <Grid>
                            <Grid
                                container
                                justifyContent="space-between"
                                sx={{ px: 5 }}
                                key={idx}
                            >
                                <Grid item display="flex">

                                    {/* logo */}
                                    <MDBTypography
                                        component="img"
                                        src={HttpService.getMediaBaseUrl(data?.imageUrl)}
                                        sx={{borderRadius: "48px"}}
                                        width="48px"
                                        height="48px"
                                    />
                                    <Grid sx={{ ml: 2 }}>

                                        <MDBTypography
                                            fontWeight="regular"
                                            fontSize="md"
                                            lineHeight="2xl"

                                        >
                                            {data.brandName}
                                        </MDBTypography>
                                        <MDBTypography
                                            fontWeight="regular"
                                            fontSize="sm"
                                            lineHeight="xxl"
                                            color="grayScale"
                                            maxWidth="350px"
                                            pb={2}
                                        >
                                            {data.description}
                                        </MDBTypography>

                                        <Grid container alignItems="center">
                                            {/* stars /rating */}
                                            {/* <Grid item>
                                                <MDBTypography
                                                    component="img"
                                                    src={data.brandRating}
                                                />
                                            </Grid> */}
                                            {/* rating number */}
                                            {/* <Grid item>
                                                <MDBTypography
                                                    fontWeight="regular"
                                                    fontSize="xs"
                                                    lineHeight="md"
                                                    sx={{ ml: 1, mr: 1 }}

                                                >
                                                    {data.brandNumberRating}
                                                </MDBTypography>
                                            </Grid> */}
                                        </Grid>

                                        {/* description */}
                                        {/* <MDBTypography
                                            fontWeight="regular"
                                            fontSize="xs"
                                            lineHeight="md"
                                            maxWidth="396px"
                                            color="grayScale"
                                            pb={2}
                                        >
                                            {data.description}
                                        </MDBTypography> */}
                                    </Grid>
                                </Grid>
                                {/* logo */}
                                {/* need to set w/o margin and padding */}

                                <Grid>
                                    <MDBTypography
                                        component="img"
                                        src={data.biaLogo}
                                    />
                                </Grid>
                            </Grid>
                            {/* divider */}
                            {  (idx < campaigns.length-1) && <Divider sx={{ m:0, mx:5, my:1.5 }} />}
                        </Grid>
                    ))}
                </Grid>
            </MDBCard>
        </Grid>
    )
}
