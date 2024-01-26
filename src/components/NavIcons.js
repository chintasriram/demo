import { Box, Grid } from '@mui/material'
import React from 'react'
import MDBTypography from 'components/MDBTypography'
import InstagramIcon from '../assets/images/icons/svg/medium/InstagramIcon.svg'
import YouTubeIcon from '../assets/images/icons/svg/medium/YouTubeIcon.svg'
import TikTokIcon from '../assets/images/icons/svg/medium/TikTokIcon.svg'
import ProfileIcon from '../assets/images/icons/svg/medium/ProfileIcon.svg'
import LeftArrowIcon from '../assets/images/icons/svg/medium/LeftArrowIcon.svg'
import RightArrowIcon from '../assets/images/icons/svg/medium/RightArrowIcon.svg'

export default function NavIcons({content,clickHandler}) {

    // Get sm icons
    const getSmIcons=(platformName)=>{
        // Check Platform name
        if(platformName === "instagram"){
            return InstagramIcon;
        }else if(platformName === "youtube"){
            return YouTubeIcon;
        }else if(platformName === "tiktok"){
            return TikTokIcon;
        }else{
            return ProfileIcon;
        }
    }

    const displayPlatformNames={
        instagram : "Instagram",
        youtube : "YouTube",
        tiktok : "TikTok"
    }

    return (
        // Icons component for Creator your reach card
        <Box sx={{display : "flex", alignItems : "center"}} mt ={3.8}  mb={2}>
            <MDBTypography
                component = "img"
                src = {getSmIcons(content)}
                pr={1}
            />
            <MDBTypography
                fontWeight = "medium"
                fontSize = "md"
                lineHeightSize = "2xl"
                pr = {1.5} mt={0.3}
            >
                {displayPlatformNames[content]}
            </MDBTypography>

            {/* Left & Right Arrow icons */}
            <MDBTypography 
                component = "img"
                src = {LeftArrowIcon}
                pr = {0.5}
                pl = {1.5}
                onClick={clickHandler}
                style={{cursor:"pointer"}}
            />
            <MDBTypography 
                component = "img"
                src = {RightArrowIcon}
                pl = {0.5}
                onClick={clickHandler}
                style={{cursor:"pointer"}}
            />
        </Box>
    )
}
