import { Divider } from '@mui/material'
import MDBCard from 'components/MDBCard'
import MDBTypography from 'components/MDBTypography'
import React from 'react'
import MDBox from 'components/MDBox'
import MDBButton from 'components/MDBButton'

export default function DeletePopup(props) {
    // Onclose handle to close the delete popup
    const onCancelHandle = (e)=>{
        e?.preventDefault()
        props.cancelCallback()
    }

    //Delete handle
    const onOkHandle = (e)=>{
        e?.preventDefault()
        props.okCallback(props.type)
    }
    
  return (
    <div>
        {/* Remove Popup */}
        <MDBCard
            borderRadius = "xl"
            bgcolor = "cardBg"
            sx={{p:0, ml:"auto", mr:"auto", mt: "250px"}}
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
                    Are you sure you want to Delete ?
                </MDBTypography>
            </MDBox>

            {/* Card Divider */}
            <Divider/>

            {/* Card Footer */}
            <MDBox sx={{px: 5, pb: 3}} ml="auto">
                <MDBButton
                    size="small"
                    variant= "text"
                    color= "white"
                    bgColor= "cardBg"
                    fontWeight = "medium"
                    fontSize = "md"
                    mr={4}
                    onClick={(e)=>{onCancelHandle(e)}}
                >
                    No
                </MDBButton>
                <MDBButton
                    size="small"
                    variant= "contained"
                    color= "black"
                    bgColor= "light_green"
                    fontWeight = "bold"
                    fontSize = "md"
                    borderSize = "md"
                    onClick={(e)=>{onOkHandle(e)}}
                >
                    Yes
                </MDBButton>
            </MDBox>
        </MDBCard>
    </div>
  )
}
