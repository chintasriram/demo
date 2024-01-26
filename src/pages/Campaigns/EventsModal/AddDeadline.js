import React from 'react'
import {
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Select,
    MenuItem
} from "@mui/material";
import MDBButton from 'components/MDBButton'
import MDBCard from 'components/MDBCard'
import MDBTypography from 'components/MDBTypography'
import CloseButton from 'components/CloseButton'
import MDBInput from 'components/MDBInput'
import { useFormik } from "formik";
import httpService from "service/HttpService"
import { toast } from 'react-toastify';

function AddDeadline(props) {
console.log("props=",props)

let userInfo = JSON.parse(window.localStorage.getItem("user"));

console.log("userInfo=",userInfo)

    const formik = useFormik({
        initialValues: {
          title: '',
          description: '',
          addDate: '',
          addTime: '',
        },
        // validate,
        onSubmit: values => {
            const data = {
                title: values.title,
                description: values.description,
                addDate: values.addDate,
                addTime: values.addTime,
            }
            console.log("FinalValues=",data);
            httpService
            .addDeadLine(userInfo.id, data.addDate)
            .then((res) => {
                toast.success("Deadline added Successfully");
        
      });
        },
      });

    return (
        <Grid container
            alignContent="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
        >
            <Grid
                item
                xs={0.5}
                sm={0.5}
                md={2}
                lg={3}
                xl={3}
                xxl={3.75}
                xel={4}
                xxel={4.75}
                el={5}
            />
            <Grid
                item
                xs={11}
                sm={11}
                md={8}
                lg={6}
                xl={5.32}
                xxl={4.5}
                xel={3.5}
                xxel={2.5}
                el={2}
            >
                <MDBCard sx={{ p: 0, mx: 0, my: 10, width: "inherit" }} >
                    <Grid container sx={{ px: 2.5, py: 3 }} justifyContent="space-between">
                        <Grid item>
                            <MDBTypography
                                color="white"
                                fontWeight="medium"
                                fontSize="xl"
                                lineHeightSize="2xxl"
                                sx={{ mt: 1 }}
                            >   Add Deadline
                            </MDBTypography>
                        </Grid>
                        <CloseButton color={"#fff"} callback={props?.onCloseCallback} />
                    </Grid>
                    <Grid 
                        component="form"
                        onSubmit={formik.handleSubmit}
                        // autocomplete="off"
                        // sx={{ my: 3 }}
                        >
                            
                       
                    <Divider sx={{ m: 0 }} />
                    <Grid sx={{ maxHeight: "413px", overflowY: "scroll" }}>
                        <Grid sx={{ mx: 2.5 }}>
                            <InputLabel sx={{ mt: 1, mb: 1 }}>
                                <MDBTypography
                                    fontWeight="regular"
                                    fontSize="xs"
                                    lineHeight="md"
                                >
                                    Title
                                </MDBTypography>
                                {/* </Grid> */}
                            </InputLabel>
                            {/* Adding dollar in input box */}
                            <MDBInput
                                type="text"
                                placeholder="Title of Event"
                                id="title"
                                name="title"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                // error={formik.touched.price && Boolean(formik.errors.price)}
                                // helperText={formik.touched.price && formik.errors.price}
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid sx={{ mx: 2.5 }}>
                            <InputLabel sx={{ mt: 1, mb: 1 }}>
                                <MDBTypography
                                    fontWeight="regular"
                                    fontSize="xs"
                                    lineHeight="md"
                                >
                                    DESCRIPTION
                                </MDBTypography>
                                {/* </Grid> */}
                            </InputLabel>
                            {/* Adding dollar in input box */}
                            <MDBInput
                                type="text"
                                placeholder="Description"
                                id="description"
                                name="description"
                                rows={4}
                                multiline
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                // error={formik.touched.price && Boolean(formik.errors.price)}
                                // helperText={formik.touched.price && formik.errors.price}
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid container justifyContent='space-around' alignContent="center" gap="1" sx={{ mt: 2 }}>
                        <Grid item>
                        <InputLabel sx={{ mt: 1, mb: 1 }}>
                                <MDBTypography
                                    fontWeight="regular"
                                    fontSize="xs"
                                    lineHeight="md"
                                >
                                    Add Date
                                </MDBTypography>
                                {/* </Grid> */}
                            </InputLabel>
                            {/* Adding dollar in input box */}
                            <MDBInput
                                type="date"
                                placeholder="Add Date"
                                id="addDate"
                                name="addDate"
                                
                                value={formik.values.addDate}
                                onChange={formik.handleChange}
                                // error={formik.touched.price && Boolean(formik.errors.price)}
                                // helperText={formik.touched.price && formik.errors.price}
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item>
                        <InputLabel sx={{ mt: 1, mb: 1 }}>
                                <MDBTypography
                                    fontWeight="regular"
                                    fontSize="xs"
                                    lineHeight="md"
                                >
                                    Add Time
                                </MDBTypography>
                                {/* </Grid> */}
                            </InputLabel>
                            {/* Adding dollar in input box */}
                            <MDBInput
                                type="time"
                                placeholder="Add Time"
                                id="addTime"
                                name="addTime"
                                
                                value={formik.values.addTime}
                                onChange={formik.handleChange}
                                // error={formik.touched.price && Boolean(formik.errors.price)}
                                // helperText={formik.touched.price && formik.errors.price}
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        </Grid>
                    </Grid>

                    <Divider />
                    {/* footer */}
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                        sx={{ mb: 3 }}
                    >
                        <Grid item>
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
                            // onClick={handleNext}
                            // disabled={isFormSubmit ? true : false}
                            // isLoading={isFormSubmit}
                            >
                                Create Event
                            </MDBButton>
                        </Grid>
                    </Grid>
                    </Grid>
                </MDBCard>
            </Grid>
            <Grid
                item
                xs={0.5}
                sm={0.5}
                md={2}
                lg={3}
                xl={3}
                xxl={3.75}
                xel={4}
                xxel={4.75}
                el={5}
            />
        </Grid>
    )
}

export default AddDeadline