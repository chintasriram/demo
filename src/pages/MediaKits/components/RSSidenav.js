import MDBCard from 'components/MDBCard'
import MDBTypography from 'components/MDBTypography'
import React, { useState } from 'react'
import EditIcon from 'assets/images/icons/svg/medium/EditIcon1818.svg'
import UpDown from 'assets/images/icons/svg/medium/UpDown.svg'
import { Divider, Grid, Modal } from '@mui/material'
import MDBButton from 'components/MDBButton'
import EditRates from '../cards/EditRates'
import EditAbout from '../cards/EditAbout'
import EditCampaign from '../cards/EditCampaign'

export default function RSSidenav(props) {
    const [aboutOpen, setAboutOpen] = useState(false);
    const [campaignsOpen, setCampaignsOpen] = useState(false);
    const [youtubeOpen, setYoutubeOpen] = useState(false);
    const [tiktokOpen, setTiktokOpen] = useState(false);
    const [instagramOpen, setInstagramOpen] = useState(false);
    const [ratesOpen, setRatesOpen] = useState(false);

    const handleRatesOpen = () => setRatesOpen(true);
    const handleRatesClose = (isRefreshMediakit) => {
        if(isRefreshMediakit !== undefined && isRefreshMediakit === true){
            props?.refreshCallback();
        }
        setRatesOpen(false)
    };

    const handleAboutOpen = () => setAboutOpen(true);
    const handleAboutClose = (isRefreshMediakit) => {
        if(isRefreshMediakit !== undefined && isRefreshMediakit === true){
            props?.refreshCallback();
        }
        setAboutOpen(false);
    }

    const handleCampaignsOpen = () => setCampaignsOpen(true)
    const handleCampaignsClose = (isRefreshMediakit) => {
        if(isRefreshMediakit !== undefined && isRefreshMediakit === true){
            props?.refreshCallback();
        }
        setCampaignsOpen(false)
    }

    const handleYoutubeOpen = (e) => {
        e.preventDefault();
        props?.youtubeScrollRef?.current?.scrollIntoView({ behavior: "smooth", block: 'center' });
    };
    const handleYoutubeClose = () => setYoutubeOpen(false);

    const handleInstagramOpen = (e) => {
        e.preventDefault();
        props?.instaScrollRef?.current?.scrollIntoView({ behavior: "smooth", block: 'center' });
    };
    const handleInstagramClose = () => setInstagramOpen(false);

    const handleTiktokOpen = (e) => {
        e.preventDefault();
        props?.tiktokScrollRef?.current?.scrollIntoView({ behavior: "smooth", block: 'center' });
    };
    const handleTiktokClose = () => setTiktokOpen(false);

    const handleSponsoredOpen = (e) => {
        e.preventDefault();
        props?.sponsoredScrollRef?.current?.scrollIntoView({ behavior: "smooth", block: 'center' });
    };
    const handleSponsoredClose = () => setTiktokOpen(false);

  return (
    <div>
        {/* Right hadnd side sidenav */}
        <MDBCard
            bgcolor="cardBg"
            borderRadius="0"
            isBorder={false}
            sx={{m:0, width: "inherit"}}
        >
            {/* Title of Sidenav */}
            <Grid sx={{px: 3, pb: 40, pt: 6}}>
                <MDBTypography
                    color = "white"
                    fontWeight = "medium"
                    fontSize = "xl"
                    lineHeightSize = "2xxl"
                    pb={3}
                >
                    Media Kit Editor
                </MDBTypography>

                <Grid>
                    <Grid container justifyContent="space-between" onClick={handleAboutOpen} sx={{cursor: "pointer"}}>
                        {/* About */}
                        <Grid item>
                            <MDBTypography
                                color = "white"
                                fontWeight = "regular"
                                fontSize = "md"
                                lineHeightSize = "2xl"
                                pt={1}
                            >
                                About
                            </MDBTypography>
                        </Grid>
                        <Grid item>
                            <MDBButton
                                iconOnly={true}
                                circular={true}
                                bgColor="transparent"
                                ml={1}
                            >
                                <MDBTypography
                                    component="img"
                                    src={EditIcon}
                                />
                            </MDBButton>
                        </Grid>
                    </Grid>

                    {/* Modal to link About You */}
                    <Modal
                        open={aboutOpen}
                        onClose={handleAboutClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        style={{ overflow: "scroll" }}
                    >
                        <EditAbout closeCallback={handleAboutClose} data={props.mediakit}/>
                    </Modal>

                    <Divider sx={{my: 2}}/>

                    <Grid container justifyContent="space-between" onClick={handleCampaignsOpen} sx={{cursor: "pointer"}}>
                        {/* PastCampaigns */}
                        <Grid item>
                            <MDBTypography
                                color = "white"
                                fontWeight = "regular"
                                fontSize = "md"
                                lineHeightSize = "2xl"
                                pt={1}
                            >
                                Past Campaigns
                            </MDBTypography>
                        </Grid>
                        <Grid item>
                            <MDBButton
                                iconOnly={true}
                                circular={true}
                                bgColor="transparent"
                                ml={1}
                            >
                                <MDBTypography
                                    component="img"
                                    src={EditIcon}
                                />
                            </MDBButton>
                        </Grid>
                    </Grid>

                    {/* Modal to link Instagram */}
                    <Modal
                        open={campaignsOpen}
                        onClose={handleCampaignsClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        style={{ overflow: "scroll" }}
                    >
                        <EditCampaign closeCallback={handleCampaignsClose} mediakitId={props.mediakit?.id}/>
                    </Modal>

                    <Divider sx={{my: 2}}/>

                    
                    <Grid container justifyContent="space-between" onClick={handleRatesOpen} sx={{cursor: "pointer"}}>
                        {/* Rates */}
                        <Grid item>
                            <MDBTypography
                               color = "white"
                               fontWeight = "regular"
                               fontSize = "md"
                               lineHeightSize = "2xl"
                               pt={1}
                            >
                                Rates
                            </MDBTypography>
                        </Grid>
                        <Grid item>
                            <MDBButton
                                iconOnly={true}
                                circular={true}
                                bgColor="transparent"
                                ml={1}
                            >
                                <MDBTypography
                                    component="img"
                                    src={EditIcon}
                                />
                            </MDBButton>
                        </Grid>
                    </Grid>

                    {/* Modal to link Edit Rates */}
                    <Modal
                        open={ratesOpen}
                        onClose={handleRatesClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        style={{ overflow: "scroll" }}
                    >
                        <EditRates closeCallback={handleRatesClose}  data={props.mediakit}/>
                    </Modal>

                    <Divider sx={{my: 2}}/>

                    
                    <Grid container justifyContent="space-between" 
                        onClick={(e)=>handleYoutubeOpen(e)} 
                        sx={{cursor: "pointer"}}
                    >
                        {/* Youtube */}
                        <Grid item>
                            <MDBTypography
                               color = "white"
                               fontWeight = "regular"
                               fontSize = "md"
                               lineHeightSize = "2xl"
                               pt={1}
                            >
                                YouTube
                            </MDBTypography>
                        </Grid>
                        <Grid item>
                            <MDBButton
                                iconOnly={true}
                                circular={true}
                                bgColor="transparent"
                                ml={1}
                            >
                                <MDBTypography
                                    component="img"
                                    src={UpDown}
                                />
                            </MDBButton>
                        </Grid>
                    </Grid>

                    <Divider sx={{my: 2}}/>
 
                    <Grid container justifyContent="space-between" 
                        onClick={(e)=>handleTiktokOpen(e)} 
                        sx={{cursor: "pointer"}}
                    >
                        {/* Tiktok */}
                        <Grid item>
                            <MDBTypography
                                color = "white"
                                fontWeight = "regular"
                                fontSize = "md"
                                lineHeightSize = "2xl"
                                pt={1}
                            >
                                TikTok
                            </MDBTypography>
                        </Grid>
                        <Grid item>
                            <MDBButton
                                iconOnly={true}
                                circular={true}
                                bgColor="transparent"
                                ml={1}
                            >
                                <MDBTypography
                                    component="img"
                                    src={UpDown}
                                />
                            </MDBButton>
                        </Grid>
                    </Grid>

                    <Divider sx={{my: 2}}/>
                    
                    <Grid container justifyContent="space-between" 
                        onClick={(e)=>handleInstagramOpen(e)} 
                        sx={{cursor: "pointer"}}
                    >
                        {/* Instagram */}
                        <Grid item>
                            <MDBTypography
                                color = "white"
                                fontWeight = "regular"
                                fontSize = "md"
                                lineHeightSize = "2xl"
                                pt={1}
                            >
                                Instagram
                            </MDBTypography>
                        </Grid>
                        <Grid item>
                            <MDBButton
                                iconOnly={true}
                                circular={true}
                                bgColor="transparent"
                                ml={1}
                            >
                                <MDBTypography
                                    component="img"
                                    src={UpDown}
                                />
                            </MDBButton>
                        </Grid>
                    </Grid>

                    <Divider sx={{my: 2}}/>

                    <Grid container justifyContent="space-between" 
                        onClick={(e)=>handleSponsoredOpen(e)} 
                        sx={{cursor: "pointer"}}
                    >
                        {/* Instagram */}
                        <Grid item>
                            <MDBTypography
                                color = "white"
                                fontWeight = "regular"
                                fontSize = "md"
                                lineHeightSize = "2xl"
                                pt={1}
                            >
                                Sponsored 
                            </MDBTypography>
                        </Grid>
                        <Grid item>
                            <MDBButton
                                iconOnly={true}
                                circular={true}
                                bgColor="transparent"
                                ml={1}
                            >
                                <MDBTypography
                                    component="img"
                                    src={UpDown}
                                />
                            </MDBButton>
                        </Grid>
                    </Grid>

                    <Divider sx={{my: 2}}/>

                </Grid>
            </Grid>
        </MDBCard>
    </div>
  )
}
