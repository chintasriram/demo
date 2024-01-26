import React from 'react'
import MDBCard from './MDBCard'
import MDBTypography from './MDBTypography'

export default function PopoverCard() {
  return (
    <MDBCard 
        borderRadius = "xl"
        bgcolor = "black"
    >
        <MDBTypography
            color = "white"
            fontWeight = "regular"
            fontSize = "md"
            lineHeightSize = "2xl"
        >
            Reached Limit
        </MDBTypography>
        <MDBTypography
            color = "grayScale"
            fontWeight = "regular"
            fontSize = "sm"
            lineHeightSize = "xxl"
            maxWidth="209px"
        >
            There is a limit of 1 collaborator for creators.
        </MDBTypography>
    </MDBCard>
  )
}
