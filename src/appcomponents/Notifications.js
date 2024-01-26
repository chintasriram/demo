import React, { useEffect, useState } from 'react'
import MDBTypography from 'components/MDBTypography';
import MDBCard from 'components/MDBCard';
import NotificationService from "service/NotificationService";
import { Divider, Grid } from '@mui/material';
import YourReachLayerImag from 'assets/images/YourReachLayer.svg'


export default function Notifications(props) {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        NotificationService.getAllIncomingNotifications(getNotificationsCallback);
    }, [])

    const getNotificationsCallback = (res) => {
        if (res != undefined) {
            setNotifications(res);
        }
    }

    //Get initial letter
    const getInitialLetter = (name) => {
        var names = name?.split(' ');
        if (names?.length > 0) {
            let initials = names[0].substring(0, 1).toUpperCase();
            return initials;
        }
        return "";
    }
    // Get time
    function getTime(time) {
        let date = new Date(time);
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        return hours + ':' + minutes.substr(-2);
    }

    return (
        <Grid sx={{ width: "inherit" }}>

            <Grid container justifyContent="center" alignContent="center" mt={5}>
                <Grid
                    item
                    xs={0.5}
                    sm={0.5}
                    md={1}
                    lg={2}
                    xl={2}
                    xxl={2}
                    xel={2}
                    xxel={2}
                    el={3}
                />
                <Grid
                    item
                    xs={11}
                    sm={11}
                    md={10}
                    lg={8}
                    xl={8}
                    xxl={8}
                    xel={8}
                    xxel={8}
                    el={6}
                >
                    <MDBCard
                        bgcolor="cardBg"
                        borderRadius="xl"
                        sx={{ p: 0, mx: 0, width: "inherit" }}
                    >
                        <Grid>
                            <MDBTypography
                                color="white"
                                fontWeight="medium"
                                fontSize="4xl"
                                lineHeightSize="5xl"
                                sx={{ mt: 3, pl: 2 }}
                            >
                                Notifications
                            </MDBTypography>

                            <Divider sx={{ mt: 2, mb: (notifications?.length > 0) !== true ? 0 : 2 }} />
                        </Grid>
                        <Grid sx={{ p: 0, maxHeight: "500px", overflowY: "auto" }}>
                            {
                                notifications?.map((data, idx) => (
                                    <Grid
                                        key={idx}
                                    >
                                        <Grid
                                            container
                                            direction="row"
                                            alignItems="center"
                                            sx={{ px: 5, mb: 1.5 }}
                                        >
                                            <Grid item sx={{ pt: 0.5 }} xs={3} sm={2} md={1} lg={1} xl={1} xxl={1} xel={1} xxel={1} el={1}>
                                                <MDBTypography
                                                    color="white"
                                                    fontWeight="medium"
                                                    fontSize="md"
                                                    lineHeightSize="2xl"
                                                    sx={{ borderRadius: "48px", border: "1px solid #D2D2D3", width: "36px", height: "36px", px: 1.5, py: 0.8 }}
                                                >
                                                    {(getInitialLetter(data.title)) ? (getInitialLetter(data.title)) : (getInitialLetter("Planning"))}
                                                </MDBTypography>
                                            </Grid>

                                            <Grid item alignSelf="center" width="inherit" xs={9} sm={10} md={11} lg={11} xl={11} xxl={111} xel={11} xxel={11} el={11}>
                                                <Grid
                                                    container
                                                    justifyContent="space-between"
                                                >
                                                    <Grid item>
                                                        <MDBTypography
                                                            fontWeight="medium"
                                                            fontSize="md"
                                                            lineHeight="xl"
                                                            sx={{
                                                                display: '-webkit-box',
                                                                overflow: 'hidden',
                                                                WebkitBoxOrient: 'vertical',
                                                                WebkitLineClamp: 1,
                                                            }}
                                                        >
                                                            {(data.title) ? (data.title) : "Planning"}
                                                        </MDBTypography>
                                                    </Grid>
                                                    <Grid item >
                                                        <MDBTypography
                                                            fontWeight="regular"
                                                            fontSize="sm"
                                                            lineHeight="xxl"
                                                            color="grayScale"
                                                        >
                                                            {getTime(data.createdAt)}

                                                        </MDBTypography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                            <Grid container>
                                                <MDBCard
                                                    sx={{ p: 0, m: 0, p: 1, mt: 2, width: "inherit" }}
                                                    borderRadius="md"
                                                    bgcolor="transparent"
                                                >
                                                    <MDBTypography
                                                        fontWeight="regular"
                                                        fontSize="sm"
                                                        lineHeight="xxl"
                                                        color="grayScale"
                                                    >
                                                        {data.content}
                                                    </MDBTypography>
                                                </MDBCard>
                                            </Grid>

                                        </Grid>
                                        {(idx < notifications?.length - 1) && <Divider sx={{ backgroundColor: "#3B3D40", width: "inherit" }} />}

                                    </Grid>

                                ))
                            }
                            {((notifications?.length > 0) !== true) &&
                                <Grid
                                    container justifyContent="center" alignContent="center"
                                    sx={{ height: "252px", borderRadius: "0 0 12px 12px",  background: `url(${YourReachLayerImag})` }}
                                >
                                    <Grid item>
                                        <MDBTypography
                                            color="grayScale"
                                            fontWeight="medium"
                                            fontSize="md"
                                            lineHeightSize="xxl"
                                            px={3} textAlign="center"
                                        >
                                            No Notifications Yet
                                        </MDBTypography>
                                    </Grid>
                                </Grid>
                            }
                        </Grid>
                    </MDBCard>
                </Grid>
                <Grid
                    item
                    xs={0.5}
                    sm={0.5}
                    md={1}
                    lg={2}
                    xl={2}
                    xxl={2}
                    xel={2}
                    xxel={2}
                    el={3}
                />
            </Grid>
        </Grid>
    )
}
