import { Divider, Grid } from '@mui/material'
import MDBCard from 'components/MDBCard'
import MDBTypography from 'components/MDBTypography'
import React from 'react'
import MDBox from 'components/MDBox'
import MDBButton from 'components/MDBButton'

export default function Popup(props) {

  return (
    <div>
        {/* Remove Popup */}
        <MDBCard
            borderRadius = "xl"
            bgcolor = "cardBg"
            sx={{p:0, ml:"auto", mr:"auto", mt:"250px"}}
        >
            {/* Card Body */}
            <MDBox sx={{pt: 8, pb: 4, px: 5, textAlign: "center"}}>
                <MDBTypography
                    color = "white"
                    fontWeight = "medium"
                    fontSize = "2xl"
                    lineHeightSize = "4xl"
                    mb={1}
                >
                    {/* Are you sure you want to remove? */}
                    {props.heading}
                </MDBTypography>
                <MDBTypography
                    color = "grayScale"
                    fontWeight = "regular"
                    fontSize = "lg"
                    lineHeightSize = "2xxl"
                    maxWidth="460px"
                >
                    {/* You will not be able to accept ACH / Wiring payments until this account is reconnected.  */}
                    {props.body}
                </MDBTypography>
            </MDBox>

            {/* Card Divider */}
            <Divider/>

            {/* Card Footer */}
            <MDBox sx={{px: 3, pb: 3}} ml="auto">
                    <MDBButton
                        size="small"
                        variant= "text"
                        color= "white"
                        bgColor= "cardBg"
                        fontWeight = "medium"
                        fontSize = "md"
                    >
                        Cancel
                    </MDBButton>
                    <MDBButton
                        size="small"
                        variant= "contained"
                        color= "black"
                        bgColor= "light_green"
                        fontWeight = "bold"
                        fontSize = "md"
                        borderSize = "md"
                    >
                        OK
                    </MDBButton>
            </MDBox>
        </MDBCard>
    </div>
  )
}
