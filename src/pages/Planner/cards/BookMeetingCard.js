import React, { useEffect, useState, useRef } from 'react'
import { Divider, Grid } from '@mui/material'
import CloseButton from 'components/CloseButton'
import MDBButton from 'components/MDBButton'
import MDBCard from 'components/MDBCard'
import MDBInput from 'components/MDBInput'
import MDBox from 'components/MDBox'
import MDBTypography from 'components/MDBTypography'
import { useFormik } from 'formik';
import * as yup from 'yup';
import Googlemeet from 'assets/images/icons/svg/medium/GMeetIcon.svg';
import Zoom from 'assets/images/icons/svg/medium/ZoomIcon.svg';
import EventService from "service/EventService"
import DateService from "service/DateService"
import UserService from "service/UserService"
import MultiChip from 'appcomponents/Chip/MultiChip'

const Images = {
    "Gmeet": Googlemeet,
    "Zoom": Zoom,
}
const validationSchema = yup.object({
    name: yup
        .string()
        .required('Name is required'),
    // .min(4, 'name  Must be atleast 2 characters')
    // .max(40, 'name  Must have upto 40 characters')
    // .matches(/^[a-zA-Z0-9_]+.*$/, 'First letter should be Alphabet'),
    email: yup
        .string()
        .required('Email is required'),
    message: yup
        .string()
        .required('Message is required')
});

export default function BookMeetingCard(props) {
    const [inviteEmails, setInviteEmails] = useState([]);
    const [inviteMobiles, setInviteMobiles] = useState([]);
    const [isFormSubmit, setIsFormSubmit] = useState(false)
    const [inviteEmailErrMsg, setInviteEmailErrMsg] = useState("")
    const [invitePhoneNumberErrMsg, setinvitePhoneNumberErrMsg] = useState("")
    const [endDtErrMsg, setEndDtErrMsg] = useState("")
    const endDateRef = useRef(null)

    const event = props?.scheduler?.edited;
    const userInfo = UserService.getUserFromSession();

    useEffect(() => {
        // Set exist inviteEmails and phone numbers
        setInviteEmailsAndMobiles();
    }, [props?.scheduler?.edited])

    // Set exist inviteEmails and phone numbers
    const setInviteEmailsAndMobiles = () => {
        if (event) {
            // Set exist invite Emails
            if (event?.attendees?.length > 0) {
                if (event?.attendees?.length > 0) {
                    let existInviteEmails = [];
                    event?.attendees?.forEach((ie) => { existInviteEmails.push(ie.email) })
                    setInviteEmails(existInviteEmails)
                }
            }

            //Set exist Phone numbers
            if (event?.phoneAttendees?.length > 0)
                setInviteMobiles(event?.phoneAttendees)
        }
    }

    const formik = useFormik({
        initialValues: {
            id: event?.event_id ? event?.event_id : "",
            googleEventId: event?.googleEventId ? event?.googleEventId : "",
            name: event?.title ? event?.title : "",
            email: event?.email ? event?.email : userInfo.email,
            startdate: event?.start ? DateService.formatDate(event?.start) : DateService.formatDate(props?.scheduler?.state?.start?.value),
            enddate: event?.end ? DateService.formatDate(event?.end) : DateService.formatDate(props?.scheduler?.state?.end?.value),
            message: event?.description ? event?.description : "",
            addemail: "",
            number: "",
            location: event?.location ? event?.location : "",
            eventType: event?.eventType ? event?.eventType : "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setIsFormSubmit(true)
            setinvitePhoneNumberErrMsg("")
            setInviteEmailErrMsg("")
            setEndDtErrMsg("")

            // Check End date and start date
            if ((values?.startdate) && (values?.enddate) && (new Date(values.enddate) > new Date(values.startdate))) {
                //Create or update event
                eventCreateOrUpdate(values);
            } else {
                setIsFormSubmit(false)
                // Throw error msg
                setEndDtErrMsg("End date should be greater than start date")
                if (endDateRef?.current) {
                    endDateRef.current?.scrollIntoView()
                }
            }
        }
    });

    //Create or update event
    function eventCreateOrUpdate(e) {
        let event = {
            id: e.id,
            googleEventId: e.googleEventId,
            title: e.name,
            email: e.email,
            start: e.startdate,
            end: e.enddate,
            description: e.message,
            location: e.location,
            eventType: "event",
        }
        //Attendees
        event.attendees = getAttendeeEmails();
        //Phone attendees
        event.phoneAttendees = inviteMobiles;
        props?.scheduler.loading(true);
        EventService.createOrUpdate(event, createOrUpdateCallback);
    }
    function createOrUpdateCallback(event) {
        props?.scheduler.onConfirm(event, props?.scheduler?.edited ? "edit" : "create");
        props?.scheduler.close();
        props?.scheduler.loading(false);
        setIsFormSubmit(false)
        //props?.scheduler.refreshCallback();
    }
    function modalClose() {
        props?.scheduler.close();
    }

    //Get Attendees emails
    function getAttendeeEmails() {
        let newInviteEmails = [];
        if (inviteEmails?.length > 0) {
            inviteEmails?.forEach((ie) => { newInviteEmails.push({ "email": ie }) })
        }
        return newInviteEmails;
    }

    /**
     * Validate email
     * @param- email
     */
    function validateEmail(email) {
        //Regular Expression for email validation format
        let businessEmailRgx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email !== undefined && email !== "") {
            let isValid = businessEmailRgx.test(email);
            return isValid;
        } else {
            return false;
        }
    }

    /**
     * Validate phone number
     * @param- phoneNumber
     */
    function validatePhoneNumber(phoneNumber) {
        //Regular Expression for phone number validation format
        let phoneNumberRegex = /^(?=.*[0-9])[- +()0-9]+$/;
        if (phoneNumber !== undefined && phoneNumber !== "") {
            let isValid = phoneNumberRegex.test(phoneNumber);
            return isValid;
        } else {
            return false;
        }
    }

    // Check keydown event hanlder
    const onFormcheckKeyDown = (e) => {
        if (e?.keyCode == 13 && e.target.localName && e.target.localName !== "textarea") {
            e.preventDefault();
        }
    };

    return (
        <Grid>
            <MDBCard sx={{ p: 0, m: 0, width: "inherit" }}>
                {/*Header */}
                <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mt: 4, px: 3 }}
                >
                    <MDBTypography
                        fontWeight="medium"
                        fontSize="xl"
                        lineHeight="2xxl"
                    >
                        Book a Meeting
                    </MDBTypography>

                    {/* Close Icon */}
                    <CloseButton callback={modalClose} />
                </Grid>

                {/* Divider */}
                <Divider />

                <Grid
                    component="form"
                    onSubmit={formik.handleSubmit}
                    autocomplete="off"
                    onKeyDown={(e) => onFormcheckKeyDown(e)}
                    container
                >
                    {/* card body */}
                    <Grid container sx={{ pt: 2, px: 5 }} columnSpacing={1}>
                        {/* Name and email  */}
                        <Grid item xs={12} md={6} pb={1}>
                            <MDBTypography
                                color="white"
                                fontSize="xs"
                                fontWeight="regular"
                                lineHeight="md"
                                textTransform="uppercase"
                                sx={{ mb: 1 }}
                            >
                                Name
                            </MDBTypography>
                            <MDBInput
                                type="text"
                                placeholder="Enter Name"
                                id="name"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                                width="100%"
                                mt={2}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} pb={1}>
                            <MDBTypography
                                color="white"
                                fontSize="xs"
                                fontWeight="regular"
                                lineHeight="md"
                                textTransform="uppercase"
                                sx={{ mb: 1 }}
                            >
                                Email
                            </MDBTypography>
                            <MDBInput
                                type="text"
                                placeholder="Enter Email"
                                id="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                width="100%"
                                mt={2}
                            />
                        </Grid>
                    </Grid>

                    {/* Start date and end date  */}
                    <Grid container sx={{ pt: 2, px: 5 }} columnSpacing={1}>
                        <Grid item xs={12} md={6} pb={1}>
                            <MDBTypography
                                color="white"
                                fontSize="xs"
                                fontWeight="regular"
                                lineHeight="md"
                                textTransform="uppercase"
                                sx={{ mb: 1 }}
                            >
                                Start Date
                            </MDBTypography>
                            <MDBInput
                                type="datetime-local"
                                placeholder="Enter Start Date"
                                id="startdate"
                                name="startdate"
                                value={formik.values.startdate}
                                onChange={formik.handleChange}
                                error={formik.touched.startdate && Boolean(formik.errors.startdate)}
                                helperText={formik.touched.startdate && formik.errors.startdate}
                                mt={2}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} pb={1}>
                            <MDBTypography
                                color="white"
                                fontSize="xs"
                                fontWeight="regular"
                                lineHeight="md"
                                textTransform="uppercase"
                                type="datetime-local"
                                sx={{ mb: 1 }}
                            >
                                End Date
                            </MDBTypography>
                            <MDBInput
                                ref={endDateRef}
                                type="datetime-local"
                                placeholder="Enter End Date"
                                id="enddate"
                                name="enddate"
                                value={formik.values.enddate}
                                onChange={formik.handleChange}
                                error={formik.touched.enddate && Boolean(formik.errors.enddate)}
                                helperText={formik.touched.enddate && formik.errors.enddate}
                                mt={2}
                            />
                            {
                                (endDtErrMsg !== "") &&
                                <p style={{ color: "#E53935", fontSize: "16px", marginTop: "10px", marginLeft: "2px" }}>
                                    {endDtErrMsg}
                                </p>
                            }
                        </Grid>
                    </Grid>

                    {/* message */}
                    <Grid container sx={{ py: 2, px: 5 }}>
                        <Grid sx={{ width: "100%" }}>
                            <MDBTypography
                                color="white"
                                fontSize="xs"
                                fontWeight="regular"
                                lineHeight="md"
                                textTransform="uppercase"
                                type="datetime-local"
                                sx={{ mb: 1 }}
                            >
                                Message
                            </MDBTypography>
                            <MDBInput
                                type="text"
                                placeholder="Enter Message"
                                // sx={{height :"96px"}}
                                id="message"
                                name="message"
                                value={formik.values.message}
                                onChange={formik.handleChange}
                                error={formik.touched.message && Boolean(formik.errors.message)}
                                helperText={formik.touched.message && formik.errors.message}
                                mt={2}
                            />
                        </Grid>
                    </Grid>

                    {/* Invite people to meeting */}

                    <Grid container mx={5} mb={3}>
                        <MDBTypography
                            color="white"
                            fontSize="md"
                            fontWeight="medium"
                            lineHeight="2xl"
                        >
                            Invite People to Meeting
                        </MDBTypography>
                    </Grid>

                    {/* email */}
                    <Grid px={5} mb={2} sx={{ width: "100%" }}>
                        <Grid>
                            <MDBTypography
                                color="white"
                                fontSize="xs"
                                fontWeight="regular"
                                lineHeight="md"
                                textTransform="uppercase"
                                type="datetime-local"
                                sx={{ mb: 1 }}
                            >
                                add by email
                            </MDBTypography>
                        </Grid>

                        <Grid>
                            <MultiChip
                                data={inviteEmails}
                                onChangeCallback={setInviteEmails}
                                onErrorCallback={setInviteEmailErrMsg}
                                validate={validateEmail}
                                eventName="email"
                                placeholder="name@email.com"
                                label="Email"
                                suggestionTxt="Please enter to add emails"
                            />
                            <Grid mt={0.5}>
                                <p
                                    style={{
                                        color: "#d50000",
                                        fontSize: 12,
                                        fontWeight: "11",
                                    }}
                                >
                                    {inviteEmailErrMsg}
                                </p>
                            </Grid>

                        </Grid>
                    </Grid>
                    {/* email */}
                    <Grid px={5} mb={3} sx={{ width: "100%" }}>
                        <Grid>
                            <MDBTypography
                                color="white"
                                fontSize="xs"
                                fontWeight="regular"
                                lineHeight="md"
                                textTransform="uppercase"
                                type="datetime-local"
                                sx={{ mb: 1 }}
                            >
                                Add by phone number
                            </MDBTypography>
                        </Grid>

                        <Grid>
                            <Grid>
                                <MultiChip
                                    data={inviteMobiles}
                                    onChangeCallback={setInviteMobiles}
                                    onErrorCallback={setinvitePhoneNumberErrMsg}
                                    validate={validatePhoneNumber}
                                    eventName="number"
                                    placeholder="(123) 456-789"
                                    label="Phone number"
                                    suggestionTxt="Please enter to add Phone numbers"
                                />
                            </Grid>
                            <Grid mt={0.5}>
                                <p
                                    style={{
                                        color: "#d50000",
                                        fontSize: 12,
                                        fontWeight: "11",
                                    }}
                                >
                                    {invitePhoneNumberErrMsg}
                                </p>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* zoom and google meets */}
                    <Grid container px={5} columnSpacing={1}>
                        <Grid item xs={12} md={6}>
                            <a href='https://meet.google.com/' target='_blank' >
                                <MDBButton
                                    size="inherit"
                                    variant="outlined"
                                    color=""
                                    fontWeight="medium"
                                    fontSize="md"
                                    borderSize="smd"
                                    sx={{ mb: 2, pt: 1.5, width: "100%" }}
                                >
                                    <MDBTypography
                                        component="img"
                                        src={Images.Gmeet}
                                        sx={{ mr: 1, pb: 1 }}
                                    />
                                    Add Google Hangouts
                                </MDBButton>
                            </a>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <a href='https://zoom.us/' target='_blank'>
                                <MDBButton
                                    size="inherit"
                                    variant="outlined"
                                    color=""
                                    fontWeight="medium"
                                    fontSize="md"
                                    borderSize="smd"
                                    sx={{ mb: 2, pt: 1.5, width: "100%" }}
                                >
                                    <MDBTypography
                                        component="img"
                                        src={Images.Zoom}
                                        sx={{ mr: 1, pb: 1 }}
                                    />
                                    Add Zoom Meeting
                                </MDBButton>
                            </a>
                        </Grid>
                    </Grid>

                    {/* location */}
                    <Grid container sx={{ py: 2, px: 5 }}>
                        <Grid xs={12}>
                            <MDBTypography
                                color="white"
                                fontSize="xs"
                                fontWeight="regular"
                                lineHeight="md"
                                textTransform="uppercase"
                                type="datetime-local"
                                sx={{ mb: 1 }}
                            >
                                Location
                            </MDBTypography>
                            <MDBInput
                                type="text"
                                placeholder="Enter Location"
                                // sx={{height :"96px"}}
                                id="location"
                                name="location"
                                value={formik.values.location}
                                onChange={formik.handleChange}
                                error={formik.touched.location && Boolean(formik.errors.location)}
                                helperText={formik.touched.location && formik.errors.location}
                                mt={2}
                            />
                        </Grid>
                    </Grid>


                    {/* footer */}
                    <Grid container>
                        <Divider sx={{width: "100%"}}/>
                    </Grid>

                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                        sx={{ mb: 3, px: 2 }}
                    >

                        <MDBButton
                            variant="text"
                            size="small"
                            bgColor="black"
                            color="white"
                            fontSize="md"
                            fontWeight="medium"
                            borderSize="md"
                            sx={{ px: 3, py: 1.5, mr: 1 }}
                            onClick={props?.scheduler?.close}
                        >
                            Back
                        </MDBButton>
                        <MDBButton
                            variant="contained"
                            size="small"
                            bgColor="light_green"
                            color="biaAssist"
                            fontSize="md"
                            fontWeight="bold"
                            borderSize="md"
                            sx={{ px: 3, py: 1.5, mr: 3 }}
                            type="submit"
                            disabled={isFormSubmit ? true : false}
                        >
                            Confirm
                        </MDBButton>
                    </Grid>
                </Grid>
            </MDBCard>
        </Grid>
    )
}
