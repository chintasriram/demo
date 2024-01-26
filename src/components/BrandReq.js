import { Divider, Grid } from '@mui/material'
import MDTypography from 'components/MDTypography'
import React from 'react'
import Tiktok from "../assets/images/Tiktok.png"
import Instagram from "../assets/images/Instagram.png"

export default function BrandReq() {
  return (
    <Grid container  >
        <Grid item  pl={1} pr={2} py={2}>
            <MDTypography
                fontWeight = "regular"
                fontSize= "sm" 
                opacity= "0.8"
            >
                Primary Platforms
            </MDTypography>
            <MDTypography>
                <MDTypography 
                    component = "img"
                    src = {Tiktok}
                    pr={0.5}
                />
                <MDTypography 
                    component = "img"
                    src = {Instagram}
                    pl={0.5}
                />
            </MDTypography>
        </Grid> 
        <Divider orientation="vertical" sx={{height : "40px", my: "20px" }} />
        <Grid item pl={3} pr={1.125} py={2}>
            <MDTypography
                fontWeight = "regular"
                fontSize= "sm" 
                opacity= "0.8"
            >
                Total Reach
            </MDTypography>
            <MDTypography
                fontWeight = "regularMedium"
                fontSize= "md"
            >
                500k min
            </MDTypography>
        </Grid> 
        <Divider orientation="vertical" sx={{height : "40px", my: "20px" }} />
        <Grid item pl={3} pr={2} py={2}>
            <MDTypography
                fontWeight = "regular"
                fontSize= "sm" 
                opacity= "0.8"
            >
                Audience Gender
            </MDTypography>
            <MDTypography
                fontWeight = "regularMedium"
                fontSize= "md"
            >
                No Preference
            </MDTypography>
        </Grid>  
        <Divider orientation="vertical" sx={{height : "40px", my: "20px" }} />
        <Grid item pl={3} pr={9.5} py={2}>
            <MDTypography
                fontWeight = "regular"
                fontSize= "sm" 
                opacity= "0.8"
            >
                Geography
            </MDTypography>
            <MDTypography
                fontWeight = "regularMedium"
                fontSize= "md"
                maxWidth= "130px"
            >
                USA, Canada
            </MDTypography>
        </Grid>  
    </Grid>
  )
}
