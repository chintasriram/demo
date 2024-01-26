import { Divider, Grid, Modal } from '@mui/material'
import CloseButton from 'components/CloseButton'
import MDBButton from 'components/MDBButton'
import MDBCard from 'components/MDBCard'
import MDBInput from 'components/MDBInput'
import MDBTypography from 'components/MDBTypography'
import React, { useState } from 'react'
import RequestPassword from './RequestPassword'
import * as yup from 'yup';
import { useFormik } from 'formik'
import httpService from 'service/HttpService'

const validationSchema = yup.object({
    password: yup
        .string('Enter your password')
        .required('Password is required'),
});

export default function ViewPrices(props) {
    const [open, setOpen] = useState(false);
    const [isError, setError] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        props.closeCallback()
    }

    const formik = useFormik({
        initialValues: {
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // To disable the error message
            setError(false)

            let request = {
                id: props?.mediaKitId,
                password: values.password
            }
            httpService.validateMediaKitPassword(request).then((res) => {
                if (res?.data?.data) {
                    props.closeCallback();
                    props.viewPricesCallback(true)
                } else {
                    // To enable the error message 
                    setError(true)
                }
            }).catch((error) => {
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
                                    View Prices
                                </MDBTypography>
                            </Grid>
                            <Grid item>
                                <CloseButton callback={props.closeCallback} />
                            </Grid>
                        </Grid>

                        <Divider />

                        {/* Card Body */}
                        <Grid pt={2} pb={1} px={5}>
                            <MDBTypography
                                color="white"
                                fontWeight="medium"
                                fontSize="md"
                                lineHeightSize="2xl"
                                textTransform="uppercase"
                                mb={2}
                            >
                                Password
                            </MDBTypography>
                            <MDBInput
                                sx={{ mb: 2 }}
                                type="password"
                                placeholder="Enter Password"
                                id="password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                            {
                                isError === true &&
                                <MDBTypography
                                    mt={-1}
                                    color="error"
                                    fontWeight="medium"
                                    fontSize="md"
                                >
                                    Please enter valid password
                                </MDBTypography>
                            }
                            <Grid>
                                <MDBButton
                                    variant="text"
                                    color="light_green"
                                    fontWeight="regular"
                                    fontSize="md"
                                    sx={{ p: 0 }}
                                    onClick={handleOpen}
                                >
                                    Request Password
                                </MDBButton>
                            </Grid>
                        </Grid>

                        {/* Modal for Request Password */}
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            style={{ overflow: "scroll" }}
                        >
                            {/* Request password Component */}
                            <RequestPassword mediaKitId={props?.mediaKitId} closeCallback={handleClose} />
                        </Modal>

                        <Divider />

                        {/* Card Footer */}
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
                                >
                                    Submit
                                </MDBButton>
                            </Grid>
                        </Grid>
                    </MDBCard>
                </form>
            </Grid>
            <Grid item xs={0.5} sm={0.5} md={2} lg={3} xl={3} xxl={3.75} xel={4} xxel={4.75} el={5} />
        </Grid>
    )
}
