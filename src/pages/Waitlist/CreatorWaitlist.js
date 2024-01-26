import MDBButton from 'components/MDBButton'
import MDBTypography from 'components/MDBTypography'
import React from 'react'
import { Grid, InputLabel, Modal, Popover } from '@mui/material'
import MDBInput from 'components/MDBInput'
import * as yup from 'yup';
import { useFormik } from 'formik'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import httpService from "service/HttpService"
import { Link } from "react-router-dom";
import ReferralCodeModal from './ReferralCodeModal'

const validationSchema = yup.object({
    name: yup
        .string('Enter Full name')
        .trim('Full name cannot contain white space')
        // .matches(/^'?\p{L}+(?:[' ]\p{L}+)*'?/u,'Please enter your full name.')
        .min(4, 'Full name must be at least 4 characters')
        .max(20, 'Full name must have upto 20 characters')
        .matches(/^[a-zA-Z]/, 'First letter should be Alphabet')
        .required('Full name is required'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        //   .matches(
        //     ".*\\S+.*",
        //     "This field cannot contain white space"
        //   )
        .required('Email is required'),
});

export default function CreatorWaitlist() {
    const [isFormSubmit, setIsFormSubmit] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    // State Mangement for Referral Code Modal
    const [openReferralModal, setOpenReferralModal] = useState(false);
    const handleReferralModalOpen = () => setOpenReferralModal(true);
    const handleReferralModalClose = () => setOpenReferralModal(false);

    useEffect(() => {
        setIsFormSubmit(false);

    }, []);

    // configured the Toast
    toast.configure();
    //For Navigation
    const history = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            referralCode: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setIsFormSubmit(true);
            setErrorMessage("");
            let request = {
                name: values.name.trim(),
                email: values.email.trim(),
                type: "Creator",
            }

            httpService.createWaitlist(request).then((result) => {
                window.localStorage.setItem('waitlist', JSON.stringify(result.data.data));
                setIsFormSubmit(false);
                if (result?.data) {
                    if (result.data.success === true) {
                        history('/waitlist/success');
                    } else {
                        setErrorMessage(result.data.message);
                    }
                }
            })
                .catch(error => {
                    setIsFormSubmit(false);
                    console.log(error)
                })
        },
    });
    return (
        <Grid>
            {/* <SocialLogin
                type="CREATOR"
                google="Sign Up with Google"
                apple="Sign Up with Apple"
                facebook="Sign Up with Facebook"
            /> 
            <DividerWithText>or</DividerWithText>
            */}
            <form onSubmit={formik.handleSubmit}>
                <Grid
                    component="form"
                    // sx={{
                    //     '& .MuiTextField-root': { width: '25ch' },
                    // }}
                    noValidate
                    autoComplete="off"
                    sx={{ pt: 1 }}
                >
                    <Grid mb={4}>
                        <InputLabel>
                            <MDBTypography
                                color="white"
                                fontWeight="regular"
                                fontSize="xs"
                                lineHeightSize="md"
                                textTransform="uppercase"
                                pb={1}
                            >
                                Full Name
                            </MDBTypography>
                        </InputLabel>
                        <MDBInput type="text"
                            placeholder="Enter full name"
                            id="name"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name} />
                    </Grid>
                    <Grid mb={4}>
                        <InputLabel>
                            <MDBTypography
                                color="white"
                                fontWeight="regular"
                                fontSize="xs"
                                lineHeightSize="md"
                                textTransform="uppercase"
                                pb={1}
                            >
                                email address
                            </MDBTypography>
                        </InputLabel>
                        <MDBInput
                            type="email"
                            placeholder="Enter your email"
                            id="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                    </Grid>
                </Grid>

                <Grid sx={{ textAlign: "center", mx: "auto", my: 4 }}>
                    <MDBTypography
                        color="grayScale"
                        fontWeight="regular"
                        fontSize="xs"
                        lineHeightSize="md"
                    >
                        By signing up for our waitlist, you agree to bia’s
                    </MDBTypography>
                    <Grid
                        component={Link}
                        to="/terms"
                    >
                        <MDBButton
                            variant="text"
                            color="white"
                            bgColor="black"
                            fontWeight="regular"
                            fontSize="xs"
                            sx={{ textDecoration: "underline" }}
                        >
                            Terms & Conditions
                        </MDBButton>
                    </Grid>
                </Grid>
                <Grid >
                    {errorMessage ?
                        <p style={{ color: '#d50000', fontSize: 12, fontWeight: '14' }}>
                            {errorMessage}
                        </p>
                        : <></>}
                </Grid>

                <MDBButton
                    type="submit"
                    size="inherit"
                    variant="contained"
                    color="black"
                    bgColor="light_green"
                    fontWeight="medium"
                    fontSize="md"
                    borderSize="md"
                    //disabled={isFormSubmit ? true : false}
                    isLoading={isFormSubmit}
                >
                    Join waitlist
                </MDBButton>
            </form>
            <MDBTypography
                color="grey400"
                fontWeight="regular"
                fontSize="xs"
                lineHeightSize="md"
                sx={{ textAlign: "center", my: 3 }}
            >
                If you have a referral code, enter it below
            </MDBTypography>
            <MDBButton
                // component={Link}
                // to="/register"
                size="inherit"
                variant="outlined"
                color=""
                bgColor=""
                fontWeight="medium"
                fontSize="md"
                borderSize="smd"
                onClick={handleReferralModalOpen}
            >
                Enter Your Referral Code
            </MDBButton>
            <MDBTypography

                color="grey400"
                fontWeight="regular"
                fontSize="xs"
                lineHeightSize="md"
                sx={{ textAlign: "center", my: 3 }}
            >
                or if you have an account
            </MDBTypography>
            <MDBButton
                component={Link}
                to="/login"
                size="inherit"
                variant="outlined"
                color=""
                bgColor=""
                fontWeight="medium"
                fontSize="md"
                borderSize="smd"
            >
                Log in
            </MDBButton>

            {/* Popover for Referral code */}   
            <Modal
                open={openReferralModal}
                onClose={handleReferralModalClose}
            >
                <ReferralCodeModal closeCallback ={handleReferralModalClose} userRoleTabIdx={0} />
            </Modal>
        </Grid>
    )
}