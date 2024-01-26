import React, { useEffect, useState, useRef } from 'react'
import { Divider, Grid, InputLabel } from '@mui/material'
import DragandDrop from 'components/DragandDrop'
import MDBButton from 'components/MDBButton'
import MDBCard from 'components/MDBCard'
import MDBInput from 'components/MDBInput'
import MDBTypography from 'components/MDBTypography'
import MultipleSelect from 'components/MultipleSelect'
import httpService from 'service/HttpService'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { useNavigate, useLocation } from 'react-router-dom'
import InputAdornment from "@material-ui/core/InputAdornment";
import MDBox from 'components/MDBox'


export default function AboutYou() {
    //Configure the Toast
    toast.configure();
    let history = useNavigate();
    const { state } = useLocation();
    const [categories, setCategories] = useState();
    const [contentTypes, setContentTypes] = useState([]);
    const [isFormSubmit, setIsFormSubmit] = useState(false);
    const [user, setUser] = useState(null)
    const contentTypeRef = useRef(null)
    const [imageUrl, setImageUrl] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [biaUrlErrMsg, setBiaUrlErrMsg] = useState("")
    const origin = window.location.origin;

    useEffect(() => {
        setIsFormSubmit(false);
        getUserFromSession();
        //Get Categories
        getCategories();
        setProfileImage("");
    }, [])

    useEffect(() => {
        setInitialContentTypes();
    }, [state?.data])

    // Set initial content types
    function setInitialContentTypes() {
        if (state !== undefined && state?.data !== undefined && state?.data !== null) {
            // set content types
            if (state.data.contentTypes?.length > 0) {
                setContentTypes(state.data.contentTypes)
            }
            if(state?.data?.imageUrl){
                setProfileImage(state?.data?.imageUrl)
                setImageUrl(state?.data?.imageUrl)
            }
        }
    }
    const imageChangeHandler = (imageUrl) => {
        setImageUrl(imageUrl);
        setProfileImage("");
    }
    // Formik handlers
    const formik = useFormik({
        //Initial values
        initialValues: {
            location: (state !== undefined && state?.data?.location) ? (state?.data?.location) : "",
            age: (state !== undefined && state?.data?.age) ? (state?.data?.age) : "",
            bio: (state !== undefined && state?.data?.bio) ? (state?.data?.bio) : "",
            bioHandler: (state !== undefined && state?.data?.bioHandler) ? (state?.data?.bioHandler) : "",
        },
        //validation schema
        validationSchema: yup.object({
            location: yup.string().required('Location is required')
                .max(20, 'Location should not exceed  20 characters')
                .matches(/^[a-zA-Z]/, 'First character should be Alphabet'),
            age: yup.number().required('Age is required')
                .min(1, "Age must be greater than 0")
                .max(99, "Age must be less than 100"),
            bio: yup.string().required('Bio is required')
                .min(4, 'Bio should contain atleast 4 characters')
                .max(300, 'Bio should not exceed 300 characters')
                .matches(/^[a-zA-Z]/, 'First characters should be an Alphabet'),
            bioHandler: yup.string().required('bia handle is required')
                .trim("bia handle should not contain white space")
                .matches(/^[a-zA-Z0-9_]+$/, "Avoid white spaces, special characters in bia handle ")
        }),

       
        //On submit handler
        onSubmit: (values) => {
            // Get user from session
            let user = getUserFromSession();
          
            setIsFormSubmit(true);
            setBiaUrlErrMsg("");
            if (user !== null && user !== undefined && values !== undefined && contentTypes?.length > 0) {
                // Check the id
                if (state !== undefined && state?.data !== undefined && state?.data !== null) {
                    // update mediakit
                    let req = {
                        "imageUrl": imageUrl,
                        "location": values?.location?.trim(),
                        "contentTypes": contentTypes,
                        "age": values?.age,
                        "bio": values?.bio?.trim(),
                        "bioHandler": values?.bioHandler?.trim(),
                        "clientId": user?.clientId,
                    }
                    updateMediakit(state?.data?.id, req);
                } else {
                    // Save the Media Kit
                   
                    let req = {
                        "userId": user?.id,
                        "clientId": user?.clientId,
                        "imageUrl": imageUrl,
                        "location": values?.location?.trim(),
                        "contentTypes": contentTypes,
                        "age": values?.age,
                        "bio": values?.bio?.trim(),
                        "bioHandler": values?.bioHandler?.trim(),
                    }
                    createMediaKit(req);
                }
            } else {
                if (contentTypes?.length <= 0 && contentTypeRef?.current) {
                    contentTypeRef?.current?.scrollIntoView();
                }
            }
        },
    });

    //Get user from session
    const getUserFromSession = () => {
        if (window.localStorage.getItem("user")) {
            let userInfo = JSON.parse(window.localStorage.getItem("user"));

            // Set user info
            setUser(userInfo)
            if (userInfo?.userBrandCategories?.length !== undefined && userInfo?.userBrandCategories?.length > 0)
                setContentTypes(userInfo.userBrandCategories)

            return userInfo;
        }
        return null;
    };

    //multiselect handler
    const multiSelectHandler = (selectedCts) => {
        let selectedContentTypes = [];
        setIsFormSubmit(false)
        if (selectedCts?.length !== undefined) {
            selectedCts?.map((selectedCat, idx) => {
                selectedContentTypes.push(selectedCat.bcName)
            })
            setContentTypes(selectedContentTypes);
        }
    }

    //Get Categories
    const getCategories = () => {
        httpService.brandCategories().then((res) => {
            if (res?.data?.data !== null && res?.data?.data !== undefined && res?.data?.data?.length > 0) {
                setCategories(res.data.data)
            }
        })
    }
    const userProfileImage = () => {
        setImageUrl(user?.profileImg);
        setProfileImage(user?.profileImg);
    }
    // Save Media Kit
    function createMediaKit(req) {
        httpService.createMediaKit(req).then((res) => {
            setIsFormSubmit(false);
            if (res !== undefined && res?.data !== undefined && res?.data !== null && res?.data?.success !== undefined) {
                if (res?.data?.success === true) {
                    if(res.data.data !== null && res.data.data?.id !== null){
                        //Redirect to mediakit campaign page
                        history("/c/media-kit/campaigns", { state: { mediakitId: res?.data?.data?.id } })
                    }else{
                        // Show error message as BIA URL is already exist
                        setBiaUrlErrMsg(req.bioHandler+" is already exist. Try with another one")
                    }
                } else {
                    // Throw error
                    toast.error("Unable to save Media Kit. Please try again", { position: toast.POSITION.TOP_LEFT, hideProgressBar: true });
                }
            }
        }).catch((error) => {
            setIsFormSubmit(false);
            // Throw error
            toast.error("Unable to save Media Kit. Please try again", { position: toast.POSITION.TOP_LEFT, hideProgressBar: true });
        })
    }

    // Update mediakit
    const updateMediakit = (id, req) => {
        httpService.updateMediakit(id, req).then((res) => {
            setIsFormSubmit(false);
            if (res !== undefined && res?.data !== undefined && res?.data !== null && res?.data?.success !== undefined) {
                if (res?.data?.success === true) {
                    if(res.data.data !== null && res.data.data?.id !== null){
                        //Redirect to mediakit campaign page
                        history("/c/media-kit/campaigns", { state: { mediakitId: res?.data?.data?.id } })
                    }else{
                        // Show error message as BIA URL is already exist
                        setBiaUrlErrMsg(req.bioHandler+" is already exist. Try with another one")
                    }  
                } else {
                    // Throw error
                    toast.error("Unable to update Media Kit. Please try again", { position: toast.POSITION.TOP_LEFT, hideProgressBar: true });
                }
            }
        }).catch((error) => {
            setIsFormSubmit(false);
            // Throw error
            toast.error("Unable to update Media Kit. Please try again", { position: toast.POSITION.TOP_LEFT, hideProgressBar: true });
        })
    }

    return (
        <div>
            <Grid container justifyContent="center">
                <Grid item xs={0.5} sm={0.5} md={2} lg={3} xl={3} xxl={3.2} xel={3.75} xxel={4.6} el={5} />
                <Grid item xs={11} sm={11} md={8} lg={5.7} xl={5.55} xxl={5.6} xel={4.5} xxel={2.8} el={2}>
                    <MDBCard sx={{ px: 0, my: 8, mx: 0, width: "inherit" }}>
                        <Grid
                            container
                            alignItems="center"
                            sx={{ mt:1}}
                        >
                            <MDBTypography
                                fontWeight="medium"
                                fontSize="xl"
                                lineHeight="2xxl"
                                sx={{ ml: 3 }}
                            >
                                About You
                            </MDBTypography>
                        </Grid>

                        <Divider sx={{ mb: 0 }} />

                        <form onSubmit={formik.handleSubmit} autocomplete="off">
                            <Grid>
                                <Grid>
                                    <MDBTypography
                                        fontWeight="medium"
                                        fontSize="md"
                                        lineHeight="2xl"
                                        sx={{ ml: 5, mt: 5 }}
                                    >
                                        Media Kit Profile Picture
                                    </MDBTypography>

                                    {/* Drag and Drop Image */}
                                    <DragandDrop
                                        imageChangeHandler={imageChangeHandler}
                                        entity="mediakit"
                                        profileImage={profileImage}
                                        userId={user?.id}
                                    />

                                    <MDBTypography
                                        fontWeight="regular"
                                        fontSize="md"
                                        color="light_green"
                                        lineHeight="2xl"
                                        display ="inline" 
                                        sx={{pl:5,mb: 2, cursor: "pointer"}}
                                        onClick={userProfileImage}
                                    >
                                        Use Profile Image
                                    </MDBTypography>
                                </Grid>
                                <div ref={contentTypeRef}>
                                    <Grid sx={{ mx: 5 }}>
                                        <MDBTypography
                                            fontWeight="medium"
                                            fontSize="md"
                                            lineHeight="2xl"
                                            sx={{ mt: 2, mb: 2.5 }}
                                        >
                                            Content Type
                                        </MDBTypography>
                                        <MultipleSelect
                                            content={categories}
                                            multiSelectHandler={multiSelectHandler}
                                            selected={(state !== undefined && state?.data?.contentTypes) ? (state?.data?.contentTypes) : (user?.userBrandCategories)}
                                        />
                                        {
                                            (isFormSubmit === true && contentTypes?.length <= 0) &&
                                            <MDBTypography style={{ color: '#ff4d4d', fontSize: 12, fontWeight: '14' }} pt={1}>
                                                Please select atleast one content type
                                            </MDBTypography>
                                        }
                                    </Grid>
                                </div>
                                <Grid sx={{ px: 5 }}>
                                    <MDBTypography
                                        fontWeight="medium"
                                        fontSize="md"
                                        lineHeight="2xl"
                                        sx={{ mt: 4.3, mb: 1 }}
                                    >
                                        About you
                                    </MDBTypography>

                                    <InputLabel sx={{ mt: 1, mb: 1 }}>
                                        <MDBTypography
                                            fontWeight="regular"
                                            fontSize="xs"
                                            lineHeight="md"
                                        >
                                            LOCATION
                                        </MDBTypography>
                                    </InputLabel>
                                    <MDBInput
                                        type="text"
                                        placeholder="Enter a City"
                                        sx={{ mb: 2 }}
                                        id="location"
                                        name="location"
                                        value={formik.values.location}
                                        onChange={formik.handleChange}
                                        error={formik.touched.location && Boolean(formik.errors.location)}
                                        helperText={formik.touched.location && formik.errors.location}
                                    />

                                    <InputLabel sx={{ mt: 2, mb: 1 }}>
                                        <MDBTypography
                                            fontWeight="regular"
                                            fontSize="xs"
                                            lineHeight="md"
                                        >
                                            AGE
                                        </MDBTypography>
                                    </InputLabel>
                                    <MDBInput
                                        type="number"
                                        placeholder="Enter Age"
                                        sx={{ mb: 2 }}
                                        id="age"
                                        name="age"
                                        value={formik.values.age}
                                        onChange={formik.handleChange}
                                        error={formik.touched.age && Boolean(formik.errors.age)}
                                        helperText={formik.touched.age && formik.errors.age}
                                    />

                                    <InputLabel sx={{ mt: 2, mb: 1 }}>
                                        <MDBTypography
                                            fontWeight="regular"
                                            fontSize="xs"
                                            lineHeight="md"
                                        >  BIO
                                        </MDBTypography>
                                    </InputLabel>
                                    <MDBInput
                                        type="textarea"
                                        placeholder="Enter your bio here"
                                        multiline
                                        rows={4}
                                        id="bio"
                                        name="bio"
                                        value={formik.values.bio}
                                        onChange={formik.handleChange}
                                        error={formik.touched.bio && Boolean(formik.errors.bio)}
                                        helperText={formik.touched.bio && formik.errors.bio}
                                    />
                                    
                                    <InputLabel sx={{ mt: 3, mb: 1 }}>
                                        <MDBTypography
                                            fontWeight="regular"
                                            fontSize="xs"
                                            lineHeight="md"
                                        >
                                            bia HANDLE
                                        </MDBTypography>
                                    </InputLabel>
                                    <MDBInput
                                        type="text"
                                        placeholder="Enter your desired bia handle"
                                        id="bioHandler"
                                        name="bioHandler"
                                        startAdornment={<InputAdornment position="start">www.joinbia.com/@</InputAdornment>}
                                        value={formik.values.bioHandler}
                                        onChange={formik.handleChange}
                                        error={formik.touched.bioHandler && Boolean(formik.errors.bioHandler)}
                                        helperText={formik.touched.bioHandler && formik.errors.bioHandler}
                                    />
                                    {
                                        (biaUrlErrMsg !=="") &&
                                        <Grid item container>
                                            <MDBox sx={{color: "#E53935 !important", fontSize: "16px", fontWeight: "300", marginTop:"10px" }}>
                                                {biaUrlErrMsg}
                                            </MDBox>
                                        </Grid>
                                    } 
                                    <MDBTypography
                                        fontWeight="medium"
                                        fontSize="xs"
                                        lineHeight="md"
                                        color ="light_green"
                                        mt={1}
                                    >
                                        bia URL : {origin}/@{formik.values.bioHandler}
                                    </MDBTypography>   
                                </Grid>
                            </Grid>

                            <Divider sx={{mt: 5}}/>
                            {/* boderRadius pending and fonts styles */}
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                sx={{ mb: 1 }}
                            >
                                <MDBTypography
                                    fontWeight="regular"
                                    fontSize="md"
                                    color="light_green"
                                    lineHeight="2xl"
                                    sx={{ ml: 3 }}
                                >
                                    1/3
                                </MDBTypography>
                                <MDBButton
                                    type="submit"
                                    variant="contained"
                                    size="small"
                                    bgColor="light_green"
                                    color="biaAssist"
                                    fontSize="md"
                                    fontWeight="medium"
                                    borderSize="lg"
                                    sx={{ mr: 3, px: 3, py: 1.5 }}
                                    lineHeight="2xl"
                                    //disabled={isFormSubmit ? true : false}
                                   
                                >
                                    Next
                                </MDBButton>
                            </Grid>
                        </form>
                    </MDBCard>
                </Grid>
                <Grid item xs={0.5} sm={0.5} md={2} lg={3} xl={3} xxl={3.2} xel={3.75} xxel={4.6} el={5} />
            </Grid>
        </div>
    )
}
