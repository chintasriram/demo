import React from 'react'
import { Divider, Grid } from '@mui/material'
import MDBCard from 'components/MDBCard'
import MDBox from 'components/MDBox'
import MDBTypography from 'components/MDBTypography'
import { Link, useNavigate } from 'react-router-dom'

export default function ProfileModel(props) {
    const history = useNavigate();

    const handleLogout = (event) => {
        window.localStorage.removeItem('user');
        history('/login');
    }

    // on profile items click event handler
    const onProfileItemSelect=(e)=>{
        // Close callback
        props.closeCallback();
    }

    return (

        <Grid sx={{ mx: 2, my: 2 }}>
            <MDBox>
                <MDBCard
                    bgcolor="biaAssist"
                    sx={{ width: "192px", p: 0, m: 0 }}
                >
                    <Grid>
                        <MDBTypography
                            fontWeight="medium"
                            fontSize="xl"
                            lineHeightSize="2xxl"
                            sx={{ mt: 2, pl: 2 }}
                        >
                            Profile
                        </MDBTypography>
                    </Grid>

                    <Divider />

                    <Grid sx={{ pl: 2 }}>
                        <Grid
                            sx={{ mt: 3}}

                        >
                            <MDBTypography
                                fontWeight="medium"
                                fontSize="md"
                                lineHeightSize="2xl"
                                color="grayScale"
                                sx={{cursor: "pointer", "&:hover": {color: "white !important"} }}
                                component = {Link}
                                to="/c/settings"
                                state={{ tabIdx: 0 }}
                                onClick={(e)=>onProfileItemSelect(e)}
                            >
                                Edit Profile
                            </MDBTypography>
                        </Grid>

                        <Grid
                            sx={{ mt: 2}}
                        >
                            <MDBTypography
                                fontWeight="medium"
                                fontSize="md"
                                lineHeightSize="2xl"
                                color="grayScale"
                                sx={{cursor: "pointer", "&:hover": {color: "white !important"}  }}
                                component = {Link}
                                to="/c/settings"
                                state={{ tabIdx: 1 }}
                                onClick={(e)=>onProfileItemSelect(e)}
                            >
                                Change Password
                            </MDBTypography>
                        </Grid>
                        <Grid
                            sx={{ mt: 2}}
                        >
                            <MDBTypography
                                fontWeight="medium"
                                fontSize="md"
                                lineHeightSize="2xl"
                                color="grayScale"
                                sx={{cursor: "pointer", "&:hover": {color: "white !important"}  }}
                                component = {Link}
                                to="/c/settings"
                                state={{ tabIdx: 2 }}
                                onClick={(e)=>onProfileItemSelect(e)}
                            >
                                Notifications
                            </MDBTypography>
                        </Grid>
                        <Grid
                            sx={{ mt: 2}}
                        >
                            <MDBTypography
                                fontWeight="medium"
                                fontSize="md"
                                lineHeightSize="2xl"
                                color="grayScale"
                                sx={{cursor: "pointer", "&:hover": {color: "white !important"}  }}
                                component = {Link}
                                to="/c/settings"
                                state={{ tabIdx: 3 }}
                                onClick={(e)=>onProfileItemSelect(e)}
                            >
                                Payments
                            </MDBTypography>
                        </Grid>
                        <Grid
                            sx={{ mt: 2}}
                        >
                            <MDBTypography
                                fontWeight="medium"
                                fontSize="md"
                                lineHeightSize="2xl"
                                color="grayScale"
                                sx={{cursor: "pointer", "&:hover": {color: "white !important"}  }}
                                component = {Link}
                                to="/c/settings"
                                state={{ tabIdx: 4 }}
                                onClick={(e)=>onProfileItemSelect(e)}
                            >
                                Reviews
                            </MDBTypography>
                        </Grid>
                    </Grid>

                    <Divider sx={{ mx: 2 }}/>

                    <Grid sx={{ pl: 2 }}>
                        <MDBTypography
                            fontWeight="medium"
                            fontSize="md"
                            lineHeightSize="2xl"
                            color="grayScale"
                            sx={{ mt: 2, mb: 2, cursor: "pointer", "&:hover": {color: "white !important"}  }}
                            onClick={handleLogout}
                        >
                            Log Out
                        </MDBTypography>
                        <MDBTypography
                            fontWeight="medium"
                            fontSize="md"
                            lineHeightSize="2xl"
                            color="grayScale"
                            sx={{ mt: 2, mb: 2, cursor: "pointer", display: "none", "&:hover": {color: "white !important"}  }}
                        >
                            Help Center
                        </MDBTypography>

                    </Grid>
                </MDBCard>
            </MDBox>
        </Grid>
    )
}
