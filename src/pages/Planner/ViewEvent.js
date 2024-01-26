import { Grid, Tooltip } from '@mui/material'
import MDBButton from 'components/MDBButton'
import MDBCard from 'components/MDBCard'
import MDBTypography from 'components/MDBTypography'
import React from 'react'
import Planning from 'assets/images/icons/svg/medium/PlanningIcon.svg'
import AvatarGroup from '@mui/material/AvatarGroup'
import MDAvatar from 'components/MDAvatar'
import NotesIcon from '@mui/icons-material/Notes';
import EventRoundedIcon from '@mui/icons-material/EventRounded';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import DateService from 'service/DateService'

export default function ViewEvent(props) {
    //Get initial letter
    const getInitialLetter = (name) => {
        var names = name?.split(' ');
        if (names?.length > 0) {
            let initials = names[0].substring(0, 1).toUpperCase();
            return initials;
        }
        return "";
    }

    // To open the link
    const linkToOpen=()=>{
        window.open(props?.event?.location,"_blank");
    }

    return (
        <div>
            <MDBCard
                sx={{ m: 0, p: 0, width: "min-content" }}
                borderRadius="md"
                bgcolor="black"
                isBorder={false}
            >
                <Grid sx={{ px: 3, pt: 0, pb: 2, maxHeight: "500px", overflowY:"auto" }}>
                    <Grid>
                        {/* Event Title */}
                        <Grid container alignItems="center">
                            <Grid item pr={1}>
                                <MDBButton
                                    variant="text"
                                    color="white"
                                    bgColor="transparent"
                                    circular={true}
                                    iconOnly={true}
                                >
                                    <MDBTypography component="img" src={Planning} sx={{ filter: "brightness(10)" }} />
                                </MDBButton>
                            </Grid>
                            <Grid item>
                                <MDBTypography
                                    color="white"
                                    fontWeight="medium"
                                    fontSize="xl"
                                    lineHeightSize="2xxl"
                                >
                                    {props?.event?.title}
                                </MDBTypography>
                            </Grid>
                        </Grid>

                        {/* Event Time and Date */}
                        <Grid container pb={1} pl={5.8}>
                            <MDBTypography
                                color="grayScale"
                                fontWeight="regular"
                                fontSize="md"
                                lineHeightSize="2xl"
                            >
                                {DateService.timeStampToDateFormate(props?.event?.start, props?.event?.end)}
                            </MDBTypography>
                        </Grid>

                        {/* Event Location */}
                        { props?.event?.location !== "" && props?.event?.location !== undefined &&
                        <Grid container pb={1} alignItems="center" pt={2}>
                            <Grid item pr={1} xs={1.6}>
                                <LocationOnOutlinedIcon fontSize='large' />
                            </Grid>
                            <Grid item xs={10.4}>
                                <MDBTypography
                                    color="white"
                                    fontWeight="medium"
                                    fontSize="md"
                                    lineHeightSize="2xl" pb={1}
                                    onClick={linkToOpen}
                                    sx={{cursor: "pointer", textDecoration: "underline"}}
                                >
                                    {props?.event?.location}
                                </MDBTypography>
                            </Grid>
                        </Grid>
                        }

                        {/* Event Guests profiles */}
                        { props?.event?.attendees?.length >0 &&
                        <Grid container px={5.8} pb={1}>
                            <Grid container pb={1}>
                                {/* Profiles */}
                                <AvatarGroup max={6}>
                                    {props?.event?.attendees?.map((mail, idx) => (
                                        <MDAvatar
                                            key={idx}
                                            alt="avatar"
                                            src="/broken-image.jpg"
                                            bgColor="bbbg"
                                            size="sm"
                                            sx={{ color: "#000" }}
                                        >
                                            {getInitialLetter(mail?.email)}
                                        </MDAvatar>
                                    ))}
                                </AvatarGroup>
                            </Grid>
                        </Grid>
                        }

                        {/* No of Guest Details */}
                        { props?.event?.attendees?.length >0 &&
                        <Grid container pb={1}>
                            <Grid item pr={1} xs={1.6}>
                                <GroupOutlinedIcon fontSize='medium' />
                            </Grid>
                            <Grid item xs={10.4}>
                                <MDBTypography
                                    color="white"
                                    fontWeight="medium"
                                    fontSize="md"
                                    lineHeightSize="2xl"
                                >
                                    {props?.event?.attendees?.length} Guests
                                </MDBTypography>
                            </Grid>
                        </Grid>
                        }

                        {/* Event guest email details */}
                        <Grid container  px={5.8} pb={1}>
                            {props?.event?.attendees?.map((mail, idx) => (
                                <Grid container alignitems="center" pb={1} key={idx}>
                                    <Grid item pr={1} xs={1.4}>
                                        <MDAvatar
                                            alt="Avatar"
                                            src="/broken-image.jpg"
                                            bgColor="light_blue"
                                            size="xs"
                                        >
                                            {getInitialLetter(mail?.email)}
                                        </MDAvatar>
                                    </Grid>
                                    <Grid item xs={10.6}>
                                        <Tooltip title={mail?.email}  placement="right">
                                            <MDBTypography
                                                color="white"
                                                fontWeight="medium"
                                                fontSize="md"
                                                lineHeightSize="2xl"
                                                maxWidth="280px"
                                                sx={{
                                                    display: '-webkit-box',
                                                    overflow: 'hidden',
                                                    WebkitBoxOrient: 'vertical',
                                                    WebkitLineClamp: 1,
                                                }}
                                            >
                                                {mail?.email}
                                            </MDBTypography>
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>

                        {/* Event guest mobile details */}
                        { props?.event?.phoneAttendees?.length > 0 &&
                        <Grid container   pb={1}>
                            <Grid item pr={1} xs={1.6}>
                                <PhoneAndroidOutlinedIcon fontSize='medium' />
                            </Grid>
                            <Grid item xs={10.4}>
                                <Grid conatiner>
                            {props?.event?.phoneAttendees?.map((mobile, idx) => (
                                <Grid item alignitems="center" pb={1} key={idx}>
                                    <Grid >
                                        <Tooltip title={mobile} placement="right">
                                            <MDBTypography
                                                color="white"
                                                fontWeight="medium"
                                                fontSize="md"
                                                lineHeightSize="2xl"
                                                maxWidth="280px"
                                                sx={{
                                                    display: '-webkit-box',
                                                    overflow: 'hidden',
                                                    WebkitBoxOrient: 'vertical',
                                                    WebkitLineClamp: 1,
                                                }}
                                            >
                                                {mobile} 
                                            </MDBTypography>
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            ))}
                            </Grid>
                            </Grid>
                        </Grid>
                        }

                        {/* Event Description */}
                        {props?.event?.description !== "" && props?.event?.description !== undefined &&
                        <Grid container pb={1}>
                            <Grid item pr={1} xs={1.2}>
                                <NotesIcon fontSize='medium' />
                            </Grid>
                            <Grid item xs={10.8}>
                                <MDBTypography
                                    color="grayScale"
                                    fontWeight="regular"
                                    fontSize="md"
                                    lineHeightSize="2xl"
                                >
                                    {props?.event?.description}
                                </MDBTypography>
                            </Grid>
                        </Grid>
                        }

                        {/* Event Host */}
                        <Grid container pb={1}>
                            <Grid item pr={1} xs={1.2}>
                                <EventRoundedIcon fontSize='medium' />
                            </Grid>
                            <Grid item xs={10.8}>
                                <MDBTypography
                                    color="white"
                                    fontWeight="regular"
                                    fontSize="md"
                                    lineHeightSize="2xl"
                                >
                                    {props?.event?.email}
                                </MDBTypography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </MDBCard>
        </div>
    )
}
