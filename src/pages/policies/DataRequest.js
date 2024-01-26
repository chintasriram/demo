import { Divider, Grid, Modal } from "@mui/material";
import MDBCard from "components/MDBCard";
import React, { useState } from "react";
import BiaLayout from "layouts/biaLayout";
import MDBTypography from "components/MDBTypography";
import { InputLabel } from "@material-ui/core";
import MDBInput from "components/MDBInput";
import MDBButton from "components/MDBButton";
import { useFormik } from 'formik';
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom';
import success from "assets/images/icons/Success.jpg"


const validationSchema = yup.object({
    name: yup
        .string('Enter your name'),
    email: yup
        .string('Enter your email')
        .required('Email is required'),
    message: yup
        .string('Enter your message')
});

export default function DataRequest() {
    let history = useNavigate();
    const [isFormSubmit, setIsFormSubmit] = useState(false);
    const [dataRequest, setDataRequest] = useState({});
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            message: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (values !== "" && values !== undefined) {
                setDataRequest(values)
                setIsFormSubmit(true)
                setOpen(true)
            }
        },
    });

    const redirectToHome = () =>{
       //Redirect to welcome page
       history("/");
    }

    return (
        <BiaLayout>
            <Grid
                container
                alignContent="center"
                justifyContent="center"
                style={{ height: "100%" }}
                position="relative"
                top="120px"
            >
                <Grid
                    item
                    xs={1}
                    sm={1.5}
                    md={2}
                    lg={3}
                    xl={3}
                    xxl={4}
                    xel={4}
                    xxel={4.5}
                    el={5}
                />
                <Grid
                    item
                    xs={10}
                    sm={9}
                    md={8}
                    lg={6}
                    xl={6}
                    xxl={4}
                    xel={3.5}
                    xxel={3}
                    el={2}
                >
                    <MDBCard sx={{ p: 0, m: 0, mb: 0, width: "inherit" }} >
                        <form onSubmit={formik.handleSubmit}>
                            <Grid sx={{ px: 5, pt: 6, pb: 3 }}>
                                <MDBTypography
                                    color="white"
                                    fontWeight="medium"
                                    fontSize="4xl"
                                    lineHeightSize="5xl"
                                >
                                    Request Form
                                </MDBTypography>
                            </Grid>
                            <Divider sx={{ m: 0 }} />
                            <Grid sx={{ p: 5 }}>
                                <Grid pb={4}>
                                    <InputLabel>
                                        <MDBTypography
                                            color="white"
                                            fontWeight="regular"
                                            fontSize="xs"
                                            lineHeightSize="md"
                                            textTransform="uppercase"
                                            pb={1}
                                        >
                                            Name
                                        </MDBTypography>
                                    </InputLabel>
                                    <MDBInput
                                        type="text"
                                        placeholder="Enter your name"
                                        name="name"
                                        id="name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name}
                                    />
                                </Grid>
                                <Grid pb={4}>
                                    <InputLabel>
                                        <MDBTypography
                                            color="white"
                                            fontWeight="regular"
                                            fontSize="xs"
                                            lineHeightSize="md"
                                            textTransform="uppercase"
                                            pb={1}
                                        >
                                            Email
                                        </MDBTypography>
                                    </InputLabel>
                                    <MDBInput
                                        type="email"
                                        placeholder="Enter your email"
                                        name="email"
                                        id="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                    />
                                </Grid>
                                <Grid>
                                    <InputLabel>
                                        <MDBTypography
                                            color="white"
                                            fontWeight="regular"
                                            fontSize="xs"
                                            lineHeightSize="md"
                                            textTransform="uppercase"
                                            pb={1}
                                        >
                                            Message
                                        </MDBTypography>
                                    </InputLabel>
                                    <MDBInput
                                        type="textarea"
                                        placeholder="Enter your message"
                                        multiline
                                        rows={4}
                                        name="message"
                                        id="message"
                                        value={formik.values.message}
                                        onChange={formik.handleChange}
                                        error={formik.touched.message && Boolean(formik.errors.message)}
                                        helperText={formik.touched.message && formik.errors.message}
                                    />
                                </Grid>
                            </Grid>
                            <Divider sx={{ m: 0 }} />

                            <Grid container justifyContent="flex-end" pr={5} py={3}>
                                <MDBButton
                                    type="submit"
                                    size="medium"
                                    variant="contained"
                                    color="black"
                                    bgColor="light_green"
                                    fontWeight="medium"
                                    fontSize="md"
                                    borderSize="md"
                                    disabled={isFormSubmit ? true : false}
                                >
                                    Submit
                                </MDBButton>
                            </Grid>
                        </form>
                    </MDBCard>
                </Grid>
                <Grid
                    item
                    xs={1}
                    sm={1.5}
                    md={2}
                    lg={3}
                    xl={3}
                    xxl={4}
                    xel={4}
                    xxel={4.5}
                    el={5}
                />
            </Grid>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Grid
                    container
                    spacing={0}
                    alignContent="center"
                    justifyContent="center"
                    style={{ minHeight: "100vh" }}
                >
                    <MDBCard
                        borderRadius="xl"
                        bgcolor="cardBg"
                        sx={{ p: 0, px: 10, py: 5, m: 0, ml: "auto", mr: "auto" }}
                    >
                        <Grid container justifyContent="center" pb={2}>
                            <img src={success} width="90px" height="90px" />
                        </Grid>
                        <MDBTypography
                            color="white"
                            fontWeight="medium"
                            fontSize="2xl"
                            lineHeightSize="3xl"
                            mb={1}
                        >
                            Your Request Sent Successfully!
                        </MDBTypography>
                        <MDBTypography
                            color="grayScale"
                            fontWeight="regular"
                            fontSize="md"
                            lineHeightSize="2xxl"
                            mb={4} textAlign="center"
                        >
                            We will process your request.
                        </MDBTypography>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <MDBButton
                                    size="medium"
                                    variant="contained"
                                    color="black"
                                    bgColor="light_green"
                                    fontWeight="bold"
                                    fontSize="lg"
                                    borderSize="md"
                                    onClick={()=>{redirectToHome()}}
                                >
                                    OK
                                </MDBButton>
                            </Grid>
                        </Grid>
                    </MDBCard>
                </Grid>
            </Modal>
        </BiaLayout>
    );
}
