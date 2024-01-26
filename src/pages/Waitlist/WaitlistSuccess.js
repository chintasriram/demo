
import Disconnect from 'appcomponents/Disconnect'
import MDBox from 'components/MDBox'
import MDBButton from 'components/MDBButton'
import { useState } from "react";
import MDBCard from 'components/MDBCard'
import MDBTypography from 'components/MDBTypography'
import { Grid } from '@mui/material'
import { Link } from "react-router-dom";
import success from "assets/images/success.png"

export default function WaitlistSuccess() {
    const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('waitlist')));

    return (
        <Grid
            container
            alignContent="center"
            justifyContent="center"
            style={{ minHeight: "100vh" }}
        >
            <Grid sx={{p:0, width:"550px"}}> 
                <MDBCard 
                    borderRadius = "xl"
                    bgcolor = "light"
                    sx={{boxShadow :"0px 4px 24px rgba(0, 0, 0, 0.48)"}}
                >
                    <Grid sx={{pt: 9.5,pb: 7.3, px: 4.875 , textAlign : "center"}}>
                        <img src={success}  />
                        <MDBTypography
                            color = "white"
                            fontWeight = "medium"
                            fontSize = "2xl"
                            lineHeightSize = "4xl"
                        >
                            Hi {user.name}, 
                        </MDBTypography>

                        <MDBTypography
                            color = "grayScale"
                            fontWeight = "regular"
                            fontSize = "md"
                            lineHeightSize = "2xl"
                            maxWidth="460px"
                            pt={1} pb={3}
                        >
                            Thank you for joining our waitlist, we’ll let you know as soon as we launch.
                        </MDBTypography>
                        <MDBButton
                            component={Link}
                            to="/"
                            size= "medium"
                            variant= "contained"
                            color= "black"
                            bgColor= "light_green"
                            fontWeight= "bold"
                            fontSize= "md"
                            borderSize= "md"
                        >
                            Home
                        </MDBButton>
                    </Grid>
                </MDBCard>
            </Grid>  
        </Grid>
    )
}