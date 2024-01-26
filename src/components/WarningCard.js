import React from 'react'
import MDBButton from './MDBButton'
import MDBCard from './MDBCard'
import MDBox from './MDBox'
import MDBTypography from './MDBTypography'

export default function WarningCard(props) {
    const warning_Data = [
        {
            header : " You will now be directed to Facebook",
            body : "In order to connect your Instagram successfully, your account must be connected to a Facebook page and be a business profile. When connecting your Instagram, please grant all Facebook permissions to be connected successfully",
            button_text : "Let’s Go!"
        }
    ]
     const okHandler = (event) => {
        if(props.okHandler !== undefined){
           props.okHandler()
         }
     }

  return (
    <div>
        <MDBCard
            borderRadius = "xl"
            bgcolor = "light"
            sx={{boxShadow :"0px 4px 24px rgba(0, 0, 0, 0.48)", mx: "auto", my: "220px"}}
        >
            { warning_Data?.map((item,idx)=>(
                <MDBox sx={{py: 3.875, px: 2.875 , textAlign : "center"}} key={idx}>
                    <MDBTypography
                        color = "white"
                        fontWeight = "medium"
                        fontSize = "2xl"
                        lineHeightSize = "4xl"
                    >
                       {item.header}
                    </MDBTypography>
                    <MDBTypography
                    color = "grayScale"
                    fontWeight = "regular"
                    fontSize = "md"
                    lineHeightSize = "2xl"
                    maxWidth="460px"
                    pt={1} pb={3}
                    >
                        {item.body}
                    </MDBTypography>
                    <MDBButton
                        size= "medium"
                        variant= "contained"
                        color= "black"
                        bgColor= "light_green"
                        fontWeight= "bold"
                        fontSize= "md"
                        borderSize= "md"
                        onClick={(e)=>okHandler(e)}
                    >
                        {item.button_text}
                    </MDBButton>
                </MDBox>
            ))
            }
        </MDBCard>
    </div>
  )
}
