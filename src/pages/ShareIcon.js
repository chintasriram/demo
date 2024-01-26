import React from 'react'
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
} from "react-share";
import {
    EmailIcon,
    FacebookIcon,
    LinkedinIcon,
    TwitterIcon,
} from "react-share";
import { Grid } from '@mui/material'


export default function ShareIcon({ url }) {
    // Create biaUrl 
    const baseUrl = document.location.origin
    const biaUrl = url ? baseUrl + "/@" + url : baseUrl;

    return (
        <Grid container spacing={2} flexWrap='noWrap' width='min(350px,500px)' overflow='auto'>
            <Grid item><FacebookShareButton url={biaUrl} >
                <FacebookIcon size={40} round='true' />
            </FacebookShareButton></Grid>

            <Grid item><EmailShareButton url={biaUrl} >
                <EmailIcon size={40} round='true' />
            </EmailShareButton></Grid>

            <Grid item> <LinkedinShareButton url={biaUrl} >
                <LinkedinIcon size={40} round='true' />
            </LinkedinShareButton></Grid>

            <Grid item><TelegramShareButton url={biaUrl} >
                <TelegramIcon size={40} round='true' />
            </TelegramShareButton></Grid>

            <Grid item><TwitterShareButton url={biaUrl} >
                <TwitterIcon size={40} round='true' />
            </TwitterShareButton></Grid>

            <Grid item><WhatsappShareButton url={biaUrl} >
                <WhatsappIcon size={40} round='true' />
            </WhatsappShareButton></Grid>

            <Grid item><TelegramShareButton url={biaUrl} >
                <TelegramIcon size={40} round='true' />
            </TelegramShareButton></Grid>

            
        </Grid>

    )
}
