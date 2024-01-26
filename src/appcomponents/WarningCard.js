import { Grid } from '@mui/material'
import MDBButton from 'components/MDBButton'
import MDBCard from 'components/MDBCard'
import MDBTypography from 'components/MDBTypography'
import React from 'react'

export default function WarningCard(props) {
    return (
        <div>
            <Grid container justifyContent="center" alignContent="center" style={{ minHeight: "100vh" }} onClick={props?.close}>
                <MDBCard
                    borderRadius="xl"
                    bgcolor="light"
                    sx={{ border: "1px solid #3B3D40", boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.48)" }}
                >
                    {props?.warning_Data?.map((item, idx) => (
                        <Grid sx={{ py: 3.875, px: 2.875, textAlign: "center" }} key={idx}>
                            <MDBTypography
                                color="white"
                                fontWeight="medium"
                                fontSize="2xl"
                                lineHeightSize="4xl"
                            >
                                {item.header}
                            </MDBTypography>
                            <MDBTypography
                                color="grayScale"
                                fontWeight="regular"
                                fontSize="md"
                                lineHeightSize="2xl"
                                maxWidth="460px"
                                pt={1} pb={3}
                            >
                                {item.body}
                            </MDBTypography>
                            <MDBButton
                                size="medium"
                                variant="contained"
                                color="black"
                                bgColor="light_green"
                                fontWeight="medium"
                                fontSize="md"
                                borderSize="md"
                                onClick={props?.facebookClick}
                            >
                                {item.button_text}
                            </MDBButton>
                        </Grid>
                    ))
                    }
                </MDBCard>
            </Grid>
        </div>
    )
}
