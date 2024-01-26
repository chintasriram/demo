import MDBCard from 'components/MDBCard'
import MDBox from 'components/MDBox'
import InfluencerHome from 'assets/images/InfluencerHome.png'
import React from 'react'
import MDBTypography from 'components/MDBTypography'
import MDBButton from 'components/MDBButton'
export default function CreateMediaKit() {
  return (
    <div>
        <MDBCard sx={{p:0,mx:"auto",my:"auto"}}>
            <MDBCard 
                isBorder ={false}
                sx={{p:0,m:0,borderRadius : "12px 12px 0 0"}}
            >
                <MDBTypography
                    component = "img"
                    src = {InfluencerHome}
                    sx={{pt: 9, pl: 11.7, pr :11.6}}
                bgColor= "red"

                    // bgColor= "light_green_rgb"
                    style ={{backgroundColor: "rgba(187, 220, 210, 0.24)",borderRadius : "12px 12px 0 0"}}
                />
            </MDBCard>
            {/* #BBDCD2uced 1px mt as top container taking 1px ectra nedd to sort ! */}
            <MDBox sx={{mt: 4, mx: "auto", mb: 2}}>
                <MDBTypography
                    fontWeight = "medium"
                    fontSize = "2xl"
                    lineHeight = "4xl"
                    sx={{mb:0.5 }}             
                >
                    Create Media Kit
                </MDBTypography>
                <MDBTypography
                    fontWeight = "regular"
                    fontSize = "lg"
                    lineHeight = "2xxl"
                    color = "grayScale"
                    sx={{mt:0.5}}
                >
                    It's never been easier 
                </MDBTypography>
            </MDBox> 
            <MDBButton
                    variant = "contained"
                    size = "small"
                    bgColor ="light_green"
                    color ="black"
                    borderSize = "md"
                    sx={{px: 3, py: 1.5, mt : 2, ml: 27.6,mb: 6}}
                >
                    Let's Go!
                </MDBButton> 
        </MDBCard>
    </div>
  )
}
