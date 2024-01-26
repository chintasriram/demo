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
import React, { useState } from 'react'
import CloseButton from 'components/CloseButton'
import MDBInput from 'components/MDBInput'
import { useEffect, useFormik } from "formik";
import ReviewOpenCampaign from "./ReviewOpenCampaign";
import Instagram from '../../assets/images/icons/svg/large/Instagram4040.svg'
import Tiktok from '../../assets/images/icons/svg/large/TikTok4040.svg'
import Youtube from '../../assets/images/icons/svg/large/YouTube4040.svg'
import Tik from '../../assets/images/icons/svg/medium/CheckIcon1414.svg'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from "react-router-dom";
import MDBox from "components/MDBox";
import httpService from "service/HttpService"
import { toast } from 'react-toastify';


function CreateOpenCampaign(props) {

    const [steps, setSteps] = useState(1);
    const [values, setValues] = React.useState({});
    const [platformType, setPlatformType ] = useState('')
    const history = useNavigate();


    const handleNext = (e) => {
        e?.preventDefault();
        console.log("cameeee=",steps)
        setSteps(steps + 1);
    }

    const validate = values => {
        const errors = {};
        if (!values.title) {
          errors.title = 'Required';
        } 
        // else if (values.firstName.length > 15) {
        //   errors.firstName = 'Must be 15 characters or less';
        // }
        if (!values.projectType) {
          errors.projectType = 'Title Required';
        }
        if (!values.applicationDeadline) {
          errors.applicationDeadline = 'Start Date Required';
        } 
        if (!values.campaignDeadline) {
            errors.campaignDeadline = 'End Date Required';
        }
        if (!values.description) {
            errors.description = 'Description Required';
        }
        if (!values.platform) {
            errors.platform = 'Platform Required';
        }
        if (!values.price) {
            errors.price = 'Price Required';
        }
        // if (!values.totalReach) {
        //     errors.totalReach = 'Total Reach Required';
        // }
        // if (!values.AudienceGender) {
        //     errors.AudienceGender = 'Audience Gende Required';
        // }
        // if (!values.geography) {
        //     errors.geography = 'Geography Required';
        // }
        if (!values.avgPrice) {
            errors.avgPrice = 'Average Price Required';
        }
      
        return errors;
      };

      const formik = useFormik({
        initialValues: {
          title: '',
          projectType: '',
          applicationDeadline: 'Test',
          campaignDeadline: '',
          description: '',
          platform: '',
          price: '',
          totalReach: 0,
          AudienceGender: 0,
          geography: 0,
          avgPrice: ''
        },
        // onSubmit: values => {
        //     alert(console.log("FinalValues=",values));
        //     history("/c/campaigns/review");
        //   },
        // validate,
        onSubmit: values => {
            
            // history("/c/campaigns/review");
            const data = {
                audienceGender: values.AudienceGender,
                applicationDeadline: values.applicationDeadline,
                avgPrice: values.avgPrice,
                campaignDeadline: values.campaignDeadline,
                description: values.description,
                geography: values.geography,
                platform: platformType,
                price: values.price,
                projectType: values.projectType,
                title: values.title,
                totalReach: values.totalReach,
                clientId: JSON.parse(window.localStorage.getItem("user")).id || ''
            }
            reviewCampaignPage(data);
            console.log("FinalValues=",data);
            httpService
            .createCampaign(data)
            .then((res) => {
                toast.success("Campaign Created Successfully");
                // setCalendars(res?.data?.data);
                // UserService.updateUserSession(payload?.id,updateSessionCallback);
                // getUserDetails();
        
      });
        },
      });

      const reviewCampaignPage =  (data) => {
          console.log("vachinmdi")
              history("/c/campaigns/review", { state: { data: data } });
      }


      const handleChange = event => {
        setValues(prevValues => ({
          ...prevValues,
          // we use the name to tell Formik which key of `values` to update
          [event.target.name]: event.target.value
        }))
      }

      const handlePlatformChange = (e) => {
        console.log("e.target=",e.target.name)
        setPlatformType(e.target.name)
    }

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
                            >   Create Open Campaign
                            </MDBTypography>
                        </Grid>
                        <Grid item>
                            <CloseButton color={"#fff"} callback={props?.onCloseCallback} />
                        </Grid>
                    </Grid>

                    <Divider sx={{ m: 0 }} />
                    {/* body */}
                    {/* Formik Validation */}
                    <Grid
                        component="form"
                        onSubmit={formik.handleSubmit}
                        autocomplete="off"
                        sx={{ my: 3 }}
                    >
                        {
                            steps === 1 &&
                            <Grid sx={{ maxHeight: "413px", overflowY: "scroll" }}>
                                <MDBTypography sx={{ mx: 2.5 }}>
                                    Let's start with the title
                                </MDBTypography>
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
                                        placeholder="Describe what needs to be done"
                                        id="title"
                                        name="title"
                                        value={formik.values.title}
                                        onChange={formik.handleChange}
                                        // error={formik.touched.price && Boolean(formik.errors.price)}
                                        helperText={formik.touched.price && formik.errors.price}
                                        sx={{ mb: 2 }}
                                    />
                                    {formik.errors.title ? <div>{formik.errors.title}</div> : null}
                                    <MDBTypography>
                                        Examples
                                    </MDBTypography>
                                    <ul>
                                        <li>2 TikToks highlighting new collection</li>
                                        <li>Sponsored YouTube Shorts review</li>
                                    </ul>

                                    <Grid>
                                        {/* Project Type - radio buttons */}
                                        <FormControl>
                                            <FormLabel id="demo-row-radio-buttons-group-label">
                                                <MDBTypography
                                                    fontWeight="medium"
                                                    fontSize="md"
                                                    lineHeight="2xl"
                                                >
                                                    What type of project is this?
                                                </MDBTypography>
                                            </FormLabel>
                                            <RadioGroup
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group projectType"
                                                id="projectType"
                                                // name="projectType"
                                                onChange={formik.handleChange}
                                                defaultValue={formik.values.projectType}
                                                // defaultValue={(props?.data?.rates?.viewRates === false) ? "private" : "public"}
                                            >
                                                <FormControlLabel
                                                    id="pt-paid-deal"
                                                    name="projectType"
                                                    value="Paid Deal"
                                                    control={<Radio />}
                                                    label={
                                                        <MDBTypography
                                                            fontWeight="regular"
                                                            fontSize="sm"
                                                            lineHeight="2xxl"
                                                        >
                                                            Paid Deal
                                                        </MDBTypography>
                                                    }
                                                />
                                                <FormControlLabel
                                                    id="pt-Affiliate-Link-Campaign"
                                                    name="projectType"
                                                    value="Affiliate Link Campaign"
                                                    control={<Radio />}
                                                    label={
                                                        <MDBTypography
                                                            fontWeight="regular"
                                                            fontSize="sm"
                                                            lineHeight="2xxl"
                                                        >
                                                            Affiliate Link Campaign
                                                        </MDBTypography>
                                                    }
                                                />
                                                <FormControlLabel
                                                    id="pt-Gifting"
                                                    name="projectType"
                                                    value="Gifting"
                                                    control={<Radio />}
                                                    label={
                                                        <MDBTypography
                                                            fontWeight="regular"
                                                            fontSize="sm"
                                                            lineHeight="2xxl"
                                                        >
                                                            Gifting
                                                        </MDBTypography>
                                                    }
                                                />
                                                <FormControlLabel
                                                    id="pt-Event-Appearance"
                                                    name="projectType"
                                                    value="Event Appearance"
                                                    control={<Radio />}
                                                    label={
                                                        <MDBTypography
                                                            fontWeight="regular"
                                                            fontSize="sm"
                                                            lineHeight="2xxl"
                                                        >
                                                            Event Appearance
                                                        </MDBTypography>
                                                    }
                                                />



                                            </RadioGroup>
                                            {formik.errors.projectType ? <div>{formik.errors.projectType}</div> : null}
                                            {/* {errorMessage !== "" && ratesVisibility === "" && (
                                            <MDBTypography
                                                mt={1}
                                                fontWeight="sm"
                                                fontSize="md"
                                                sx={{ color: "#E53935" }}
                                            >
                                                {errorMessage}
                                            </MDBTypography>
                                        )} */}
                                        </FormControl>
                                    </Grid>

                                    <Grid container justifyContent='space-around' alignContent="center" gap="1" sx={{ mt: 2 }}>
                                        <Grid item>
                                        {/* <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DatePicker
       renderInput={(inputProps) => <TextField {...props} variant="outlined" />}
       slotProps={{ textField: { variant: 'outlined' } }}
 /> */}
                                        <MDBInput
                                         defaultValue="Sai" 
                                        type="date"
                                        label="Application Deadline"
                                                        id="applicationDeadline"
                                                        name="applicationDeadline"
                                                        value={formik.values.applicationDeadline}
                                                        onChange={formik.handleChange} /> 
                                        {/* </LocalizationProvider> */}
                                           
                                        </Grid>
                                        {formik.errors.applicationDeadline ? <div>{formik.errors.applicationDeadline}</div> : null}
                                        <Grid item>
                                            <MDBInput type="date" placeholder="Campaign Deadline" 
                                                        id="campaignDeadline"
                                                        name="campaignDeadline"
                                                        value={formik.values.campaignDeadline}
                                                        onChange={formik.handleChange}/>
                                        </Grid>
                                        {formik.errors.campaignDeadline ? <div>{formik.errors.campaignDeadline}</div> : null}
                                    </Grid>

                                </Grid>
                            </Grid>
                        }
                        {
                            steps === 2 &&
                            <Grid sx={{ maxHeight: "413px", overflowY: "scroll" }}>
                                <MDBTypography sx={{ mx: 2.5 }}>
                                    Select Platform(s)
                                </MDBTypography>
                                <Grid container sx={{ mx: 2.5 }}>
                                    <Grid item xs={12} md={4}>
                                    
                                        <MDBCard
                                            sx={{
                                                mx: 0, mt: 2, p: 0, width: "120px",
                                                cursor: "pointer",
                                                // border: (instaUserId !== "") ? "1px solid #ffff" : "1px solid #3B3D40",
                                                // "&:hover": { border: '1px solid white' }
                                                border: "1px solid #3B3D40", "&:hover": { border: '1px solid white' }
                                            }}
                                            borderRadius="xl"
                                            bgcolor="transparent"
                                            id="platform"
                                            name="platform"
                                            // value={formik.values.platform}
                                            // onClick={formik.handleChange}
                                           
                                        >
                                            <Grid container justifyContent="center" alignContent="center" style={{ height: "120px" }}>
                                            <Grid item pr={1.0}>
                                                {platformType === "Instagram" && <MDBTypography
                                                        component="img"
                                                        height="12px"
                                                        src={Tik}
                                                    />}
                                            </Grid>
                                                <MDBTypography
                                                    component="img"
                                                    src={Instagram}
                                                    // id="Instagram"
                                                    // name="Instagram"
                                                    label={"Instagram"}
                                                    value="Instagram"
                                                    name="Instagram"
                                                    onClick={handlePlatformChange}
                                                />


                                            </Grid>
                                        </MDBCard>


                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <MDBCard
                                            sx={{
                                                mx: 0, mt: 2, p: 0, width: "120px",
                                                cursor: "pointer",
                                                // border: (tiktokUserId !== "") ? "1px solid #ffff" : "1px solid #3B3D40",
                                                // "&:hover": { border: '1px solid white' }
                                                border: "1px solid #3B3D40", "&:hover": { border: '1px solid white' }
                                            }}
                                            borderRadius="xl"
                                            bgcolor="transparent"
                                            // onClick={formik.handleChange}
                                        // onClick={tiktokClick}
                                        >
                                            <Grid container justifyContent="center" alignContent="center" style={{ height: "120px" }}>
                                            <Grid item pr={1.0}>
                                                {platformType === "Tiktok" && <MDBTypography
                                                        component="img"
                                                        height="12px"
                                                        src={Tik}
                                                    />}
                                            </Grid>
                                                <MDBTypography
                                                    component="img"
                                                    src={Tiktok}
                                                    id="Tiktok"
                                                    name="Tiktok"
                                                    onClick={handlePlatformChange}
                                                />


                                            </Grid>
                                        </MDBCard>
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <MDBCard
                                            sx={{
                                                mx: 0, mt: 2, p: 0, width: "120px",
                                                cursor: "pointer",
                                                // border: (youtubeUserId !== "") ? "1px solid #ffff" : "1px solid #3B3D40",
                                                border: "1px solid #3B3D40",
                                                "&:hover": { border: '1px solid white' }
                                            }}
                                            borderRadius="xl"
                                            bgcolor="transparent"
                                        // onClick={googleClick}
                                        >
                                            <Grid container justifyContent="center" alignContent="center" style={{ height: "120px" }}>
                                            <Grid item pr={1.0}>
                                                {platformType === "Youtube" && <MDBTypography
                                                        component="img"
                                                        height="12px"
                                                        src={Tik}
                                                    />}
                                            </Grid>
                                                <MDBTypography
                                                    component="img"
                                                    src={Youtube}
                                                    id="Youtube"
                                                    name="Youtube"
                                                    onClick={handlePlatformChange}
                                                />


                                            </Grid>
                                        </MDBCard>


                                    </Grid>
                                </Grid>
                            </Grid>
                        }
                        {
                            steps === 3 &&
                            <Grid sx={{ maxHeight: "413px", overflowY: "scroll" }}>
                                <MDBTypography sx={{ mx: 2.5 }}>
                                    Describe
                                </MDBTypography>
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
                                        placeholder="Describe your Project"
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
                                <MDBTypography sx={{ mx: 2.5 }}>
                                    Campaign Budget
                                </MDBTypography>
                                <Grid sx={{ mx: 2.5 }}>
                                    <InputLabel sx={{ mt: 1, mb: 1 }}>
                                        <MDBTypography
                                            fontWeight="regular"
                                            fontSize="xs"
                                            lineHeight="md"
                                        >
                                            Price
                                        </MDBTypography>
                                        {/* </Grid> */}
                                    </InputLabel>
                                    {/* Adding dollar in input box */}
                                    <MDBInput
                                        type="text"
                                        placeholder="$0000"
                                        id="price"
                                        name="price"
                                        value={formik.values.price}
                                        onChange={formik.handleChange}
                                        // error={formik.touched.price && Boolean(formik.errors.price)}
                                        // helperText={formik.touched.price && formik.errors.price}
                                        sx={{ mb: 2 }}
                                    />
                                </Grid>
                            </Grid>
                        }
                        {
                            steps === 4 &&
                            <Grid sx={{ maxHeight: "413px", overflowY: "scroll" }}>
                                <MDBTypography sx={{ mx: 2.5, mb: 2 }}>
                                    Set Requirements
                                </MDBTypography>
                                <Grid sx={{ mx: 2.5 }}>
                                    <FormControl fullWidth mb={2}>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="totalReach"
                                            name="totalReach"
                                            value={formik.values.totalReach}
                                            label="totalReach"
                                            mb={2}
                                            sx={{ mb: 2 }}
                                            onChange={formik.handleChange}
                                        >
                                            <MenuItem value={0}>Total Reach</MenuItem>
                                            <MenuItem value={20}>{">5k"}</MenuItem>
                                            <MenuItem value={30}>{">10k"}</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth mb={2}>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="AudienceGender"
                                            name="AudienceGender"
                                            value={formik.values.AudienceGender}
                                            label="AudienceGender"
                                            sx={{ mb: 2 }}
                                            onChange={formik.handleChange}
                                        >
                                            <MenuItem value={0}>Audience Gender</MenuItem>
                                            <MenuItem value={"Male"}>{"Male"}</MenuItem>
                                            <MenuItem value={"Female"}>{"Female"}</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth mb={2}>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="geography"
                                            name="geography"
                                            // value="geography"
                                            value={formik.values.geography}
                                            label="geography"
                                            sx={{ mb: 2 }}
                                            onChange={formik.handleChange}
                                        >
                                            <MenuItem value={0}>Geography</MenuItem>
                                            <MenuItem value={"United State"}>{"United State"}</MenuItem>
                                            <MenuItem value={"Asia"}>{"Asia"}</MenuItem>
                                            <MenuItem value={"Latin America"}>{"Latin America"}</MenuItem>
                                            <MenuItem value={"Africa"}>{"Africa"}</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth mb={2}>
                                        <InputLabel >
                                            <MDBTypography
                                                fontWeight="regular"
                                                fontSize="xs"
                                                lineHeight="md"
                                            >
                                                AVERAGE PER COST
                                            </MDBTypography>
                                            {/* </Grid> */}
                                        </InputLabel>
                                        {/* Adding dollar in input box */}
                                        <MDBInput
                                            type="text"
                                            placeholder="$0000"
                                            id="avgPrice"
                                            name="avgPrice"

                                            value={formik.values.avgPrice}
                                            onChange={formik.handleChange}
                                            // error={formik.touched.price && Boolean(formik.errors.price)}
                                            // helperText={formik.touched.price && formik.errors.price}
                                            sx={{ mt: 5 }}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        }

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
                                {
                                    steps !== 1 &&
                                    <MDBButton
                                        variant="text"
                                        size="small"
                                        bgColor="black"
                                        color="white"
                                        fontSize="md"
                                        fontWeight="medium"
                                        borderSize="md"
                                        sx={{ px: 3, py: 1.5, mr: 1 }}
                                        onClick={(e) => setSteps(steps - 1)}
                                    >
                                        Back
                                    </MDBButton>
                                }

                                {
                                    steps === 4 ?
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
                                        >Finish & Review</MDBButton> :
                                        <MDBButton
                                            variant="contained"
                                            size="small"
                                            bgColor="light_green"
                                            color="biaAssist"
                                            fontSize="md"
                                            fontWeight="bold"
                                            borderSize="md"
                                            sx={{ px: 3, py: 1.5, mr: 3 }}
                                            type="button"
                                            onClick={handleNext}
                                        // disabled={isFormSubmit ? true : false}
                                        // isLoading={isFormSubmit}
                                        >
                                            Next
                                        </MDBButton>
                                }

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
        </Grid >
    )
}

export default CreateOpenCampaign