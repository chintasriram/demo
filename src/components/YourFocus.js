import React from 'react'
import MDBCard from './MDBCard';
import MDBTypography from './MDBTypography';
import { Divider, Grid } from '@mui/material';
import TickSymbol from 'assets/images/icons/svg/GreenTick.svg'
import { useWidth } from './Hooks/UseWidth';

function YourFocus(props) {
    const screenSize = useWidth()[0]
    const yourFocus = [
        {
            Step: 1,
            StepInfo: "Set up profile",
            isCompleted: props?.isUser
        },
        {
            Step: 2,
            StepInfo: "Create Media Kit",
            isCompleted: props?.mediakit
        },
        {
            Step: 3,
            StepInfo: "Connect Payments"
        }
    ]

    return (
        <Grid>
            <MDBCard
                bgcolor="supaLight"
                sx={{ m: 0, px: screenSize === "xl"? 2 : 3, pt: 3, pb: 5, width: "inherit" }}
            >
                <Grid container>
                    {/* Your Focus Title */}
                    <MDBTypography
                        color="light_green"
                        fontWeight="medium"
                        fontSize="xl"
                        lineHeightSize="2xxl"
                        pb={2.5}
                    >
                        Your Focus
                    </MDBTypography>
                </Grid>

                {/* {props?.yourFocus_data?.map((data,idx)=>(
            <>
                <Grid container >
                    <Grid item pr={1} xs={2.5} sm={12} md={0.75} lg={2.5}  xxl={2.5} el={2.5}>
                        <MDBTypography
                            component = "img"
                            src = {data.icon}
                            height = "32px"
                            width="32px"
                        />
                    </Grid>
                    <Grid item xs={9.5} sm={12} md={11.25} lg={9.5}  xxl={9.5} el={9.5} >
                        <MDBTypography
                            color = "grayScale"
                            fontWeight = "regular"
                            fontSize = "sm"
                            lineHeightSize = "xxl"
                        >
                            {data.content}
                        </MDBTypography>
                    </Grid>
                
                </Grid>
                <Grid >
                {
                    (idx === ( props?.yourFocus_data?.length-1))? "": <Divider  sx={{height : "1px", width : "inherit", background : "#3B3D40", m: 0, my: 1.5}} />
                }
                </Grid>
            </>
            ))} */}

                {yourFocus?.map((item, idx) => (
                    <Grid key={idx}>
                        <Grid container>
                            <Grid item pr={2}>
                                <MDBTypography
                                    color="black"
                                    fontWeight="medium"
                                    fontSize="md"
                                    lineHeightSize="lg"
                                    bgColor={item?.isCompleted === true ? "white" : "light_green"}
                                    sx={{ width: "32px", height: "32px", borderRadius: "100%", textAlign: "center", py: 1 }}
                                >
                                    {item?.isCompleted !== true ? item?.Step : <MDBTypography component="img" src={TickSymbol} />}
                                </MDBTypography>
                            </Grid>
                            <Grid item alignSelf="center">
                                <MDBTypography
                                    color="white"
                                    fontWeight="medium"
                                    fontSize="md"
                                    lineHeightSize="lg"
                                >
                                    {item?.StepInfo}
                                </MDBTypography>
                            </Grid>
                        </Grid>
                        {(idx === (yourFocus?.length - 1)) ? "" : <Divider sx={{ m: 0, my: 2 }} />}
                    </Grid>
                ))}
            </MDBCard>
        </Grid>
    )
}

export default YourFocus;