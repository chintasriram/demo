import MDBCard from 'components/MDBCard'
import MDBox from 'components/MDBox'
import MediakitEdit from 'assets/images/MediakitEdit.png'
import React from 'react'
import MDBTypography from 'components/MDBTypography'
import MDBButton from 'components/MDBButton'
import { Link } from 'react-router-dom'

export default function MediaKitCard(props) {
  return (
    <div>
        {/* TODO : To Change Searchbar */}
        <MDBCard sx={{p:0, ml:8, mt:8, mr:"600px"}}>
            <MDBTypography
                component = "img"
                src={MediakitEdit}
                // border = "1px solid white"
                sx ={{ borderRadius: "12px 12px 0 0"}}
            />

            <MDBox sx={{ml:3,mt:2,mb:3}}>
                <MDBTypography
                    fontWeight = "md"
                    fontSize = "2xl"
                    lineHeight ="4xl"
                    textTransform= "capitalize"
                    sx={{mb:1.5}}
                >
                    {props?.userName} Media Kit
                </MDBTypography>
                <MDBButton
                    component={Link}
                    to="/mediakits/edit"
                    variant = "contained"
                    size = "small"
                    bgColor = "light_green"
                    color = "biaAssist"     
                    fontSize = "md"
                    fontWeight ="bold"
                    borderSize = "lg"
                    // lineHeight = "2xl"
                    sx={{ px:3, py:1.6, mr :1}}
                >
                    Edit
                </MDBButton>
                <MDBButton
                    variant = "outlined"
                    size = "large"
                    bgColor = "black"
                    color = ""     
                    fontSize = "md"
                    fontWeight ="bold"
                    borderSize = "lg"
                    sx={{ px:3, py:1.3,ml:1}}
                >
                    Preview
                </MDBButton>
            </MDBox>
        </MDBCard>
    </div>
  )
}
