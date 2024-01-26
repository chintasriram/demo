import { Divider, Grid, Modal } from '@mui/material'
import CloseButton from 'components/CloseButton'
import MDBButton from 'components/MDBButton'
import MDBCard from 'components/MDBCard'
import MDBInput from 'components/MDBInput'
import MDBTypography from 'components/MDBTypography'
import React, { useState } from 'react'
import * as yup from 'yup';
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import httpService from 'service/HttpService'
import SuccessEmail from './SuccessEmail'

const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    request: yup
        .string('Enter your request')
        .required('Request is required'),
});

export default function RequestPassword(props) {
    const [isFormSubmit, setIsFormSubmit] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        props?.closeCallback()
    }

    // configured the Toast
    toast.configure();
    //For Navigation
    const history = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            request: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setIsFormSubmit(true)
            let req = {
                email: values.email,
                description: values.request,
                id: props?.mediaKitId
            }
            httpService.requestMediaKitPassword(req).then((res) => {

                if (res !== undefined && res !== null && res?.data?.data && res?.data?.data === true) {
                    // To open Success email popup
                    handleOpen()
                    setIsFormSubmit(false)
                }

            }).catch((error) => {
                setIsFormSubmit(false)
                console.log("Error in validate password", error)
            })
        },
    });
    return (
        <Grid
            container
            alignContent="center"
            justifyContent="center"
            style={{ height: "100%" }}
        >
            <Grid item xs={0.5} sm={0.5} md={2} lg={3} xl={3} xxl={3.75} xel={4} xxel={4.75} el={5} />
            <Grid item xs={11} sm={11} md={8} lg={6} xl={5.32} xxl={4.5} xel={3.5} xxel={2.5} el={2}>
                <form onSubmit={formik.handleSubmit}>
                    <MDBCard
                        borderRadius="xl"
                        bgcolor="cardBg"
                        sx={{ p: 0, m: 0, width: "inherit" }}
                    >
                        {/* Card Header */}
                        <Grid container px={3} pt={4} justifyContent="space-between">
                            <Grid item alignSelf="center">
                                <MDBTypography
                                    color="white"
                                    fontWeight="medium"
                                    fontSize="xl"
                                    lineHeightSize="2xxl"
                                >
                                    Request to View
                                </MDBTypography>
                            </Grid>
                            <Grid item>
                                <CloseButton callback={props.closeCallback} />
                            </Grid>
                        </Grid>

                        <Divider />

                        <Grid pt={2} pb={1} px={5}>
                            <MDBTypography
                                color="white"
                                fontWeight="regular"
                                fontSize="xs"
                                lineHeightSize="md"
                                textTransform="uppercase"
                                mb={1}
                            >
                                Enter Email
                            </MDBTypography>
                            <MDBInput
                                sx={{ mb: 2 }}
                                type="email"
                                placeholder="user@email.com"
                                id="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />

                            <MDBTypography
                                color="white"
                                fontWeight="regular"
                                fontSize="xs"
                                lineHeightSize="md"
                                textTransform="uppercase"
                                mb={1}
                            >
                                Enter Request
                            </MDBTypography>
                            <MDBInput
                                type="text"
                                placeholder="Type Here..."
                                id="request"
                                name="request"
                                value={formik.values.request}
                                onChange={formik.handleChange}
                                error={formik.touched.request && Boolean(formik.errors.request)}
                                helperText={formik.touched.request && formik.errors.request}
                            />
                        </Grid>

                        <Divider />

                        <Grid container px={3} pb={3} justifyContent="flex-end">
                            <Grid item >
                                <MDBButton
                                    type="submit"
                                    size="medium"
                                    variant="contained"
                                    color="black"
                                    bgColor="light_green"
                                    fontWeight="bold"
                                    fontSize="md"
                                    borderSize="md"
                                    disabled={isFormSubmit ? true : false}
                                >
                                    Submit
                                </MDBButton>
                            </Grid>
                        </Grid>
                    </MDBCard>
                </form>
            </Grid>
            <Grid item xs={0.5} sm={0.5} md={2} lg={3} xl={3} xxl={3.75} xel={4} xxel={4.75} el={5} />

            {/* Modal for Email sent successfully */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{ overflow: "scroll" }}
            >
                {/* Email sent successfully componet */}
                <SuccessEmail closeCallback={handleClose} />
            </Modal>
        </Grid>
    )
}
