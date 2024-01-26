import { Divider, Grid, InputLabel } from '@mui/material'
import DragandDrop from 'components/DragandDrop'
import MDBButton from 'components/MDBButton'
import MDBCard from 'components/MDBCard'
import MDBInput from 'components/MDBInput'
import MDBTypography from 'components/MDBTypography'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import CloseButton from '../../../components/CloseButton'
import * as yup from 'yup';
import httpService from 'service/HttpService'
import { toast } from 'react-toastify'
import toastIcon from 'assets/images/icons/svg/medium/ToastSuccess.svg'

const validationSchema = yup.object({
    brandName: yup.string('Enter brandName').required('Brand Name is required')
        .max(30, 'Brand Name should not exceed 30 characters')
        .matches(/^[a-zA-Z]/, 'First character should be Alphabet'),
});

export default function AddCampaign(props) {
    //Configure the Toast
    toast.configure();

    const [isFormSubmit, setIsFormSubmit] = useState(false)
    const [imageUrl, setImageUrl] = useState("");
    const [campaignImage, setCampaignImage] = useState("");

    useEffect(() => {
        setIsFormSubmit(false)
    }, [])
    useEffect(() => {
        setCampaignImage(props?.campaign?.imageUrl);
    }, [props.campaign])
    const formik = useFormik({
        initialValues: {
            brandName: props?.campaign?.brandName,
            description: props?.campaign?.description,
            imageUrl: props?.campaign?.imageUrl,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Check id
            if (props?.campaign?.id !== undefined && props?.campaign?.id !== null) {
                //Update campaign by id
                updateCampaign(props.campaign.id, values)
            } else {
                //Create Campaign integration
                createCampaign(values);
            }
        },
    });

    // Create Campaign
    const createCampaign = (values) => {
        let user = getUserFromSession();
        if (user !== null && props?.mediakitId !== undefined && props?.mediakitId !== "" && props?.mediakitId !== null) {
            setIsFormSubmit(true)

            let createCamapignReq = {
                "userId": user?.id,
                "clientId": user?.clientId,
                "mediakitId": props?.mediakitId,
                "brandName": values.brandName?.trim(),
                "imageUrl": imageUrl,
                "description": values.description?.trim()
            }

            httpService.createCampaign(createCamapignReq).then((res) => {
                if (res !== undefined && res !== null && res?.data?.success && res?.data?.success === true) {
                    setIsFormSubmit(false);
                    // Success Message
                    toast.success("Campaign created successfully", { position: toast.POSITION.TOP_LEFT, 
                        hideProgressBar: true,icon:<img src={toastIcon} /> });

                    //close popup
                    props.closeCallback(true);
                } else {
                    setIsFormSubmit(false);

                    // Throw error
                    toast.error("Unable to created the campaign. Please try again", { position: toast.POSITION.TOP_LEFT, hideProgressBar: true });

                    //close popup
                    props.closeCallback(false);
                }

            }).catch((error) => {
                //close popup
                props.closeCallback(false);

                setIsFormSubmit(false);
                // Throw error
                toast.error("Unable to created the campaign. Please try again", { position: toast.POSITION.TOP_LEFT, hideProgressBar: true });
            })
        }
    }

    // Update Campaign
    const updateCampaign = (id, values) => {
        if (values !== undefined) {
            setIsFormSubmit(true)
            let newImageUrl = (imageUrl !== "" ? imageUrl : values.imageUrl);

            let updateCamapignReq = {
                "brandName": values.brandName?.trim(),
                "imageUrl": newImageUrl,
                "description": values.description?.trim()
            }

            //Update campaign
            httpService.updateCampaignById(id, updateCamapignReq).then((res) => {
                if (res !== undefined && res !== null && res?.data?.success && res?.data?.success === true) {
                    setIsFormSubmit(false);
                    // Success Message
                    toast.success("Campaign updated successfully", { position: toast.POSITION.TOP_LEFT, 
                        hideProgressBar: true, icon:<img src={toastIcon} /> });

                    //close popup
                    props.closeCallback(true);
                } else {
                    setIsFormSubmit(false);

                    // Throw error
                    toast.error("Unable to update the campaign. Please try again", { position: toast.POSITION.TOP_LEFT, hideProgressBar: true });

                    //close popup
                    props.closeCallback(false);
                }

            }).catch((error) => {
                //close popup
                props.closeCallback(false);

                setIsFormSubmit(false);
                // Throw error
                toast.error("Unable to update the campaign. Please try again", { position: toast.POSITION.TOP_LEFT, hideProgressBar: true });
            })
        }
    }

    //Get user from session
    const getUserFromSession = () => {
        if (window.localStorage.getItem("user")) {
            let userInfo = JSON.parse(window.localStorage.getItem("user"));
            return userInfo;
        }
        return null;
    };
    const imageChangeHandler = (imageUrl) => {
        setImageUrl(imageUrl);
    }
    return (
        <div>
            <Grid
                container
                alignContent="center"
                justifyContent="center"
                style={{ minHeight: "100vh" }}
            >
                <Grid item xs={0.5} sm={0.5} md={2} lg={3} xl={3} xxl={3.75} xel={4} xxel={4.6} el={5} />
                <Grid item xs={11} sm={11} md={8} lg={5.7} xl={5.55} xxl={4.5} xel={3.5} xxel={2.8} el={2}>
                    <MDBCard sx={{ p: 0, mx: 2, my: 10, width: "inherit" }}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{ mt: 4, px: 3 }}
                        >
                            <MDBTypography
                                fontWeight="medium"
                                fontSize="xl"
                            >
                                Past Campaigns
                            </MDBTypography>

                            <CloseButton callback={props.closeCallback} />
                        </Grid>

                        {/* Divider */}
                        <Divider />
                        <Grid component="form" onSubmit={formik.handleSubmit} autocomplete="off">
                            <Grid sx={{ mt: 4.25, mb: 1 }}>
                                <MDBTypography
                                    fontWeight="medium"
                                    fontSize="md"
                                    sx={{ mt: 6.1, mb: 1, ml: 5 }}
                                >
                                    Campaign {(props?.isNewCampaign === true) ? (props?.campaignsLength + 1) : ""}
                                </MDBTypography>

                                {/* Drag and drop images */}
                                <DragandDrop
                                    imageChangeHandler={imageChangeHandler}
                                    entity="campaign"
                                    imageUrl={campaignImage}
                                />
                            </Grid>

                            <Grid sx={{ mx: 5 }}>
                                <InputLabel sx={{ mt: 1, mb: 1 }}>
                                    <MDBTypography
                                        fontWeight="regular"
                                        fontSize="xs"
                                    >
                                        BRAND NAME
                                    </MDBTypography>
                                </InputLabel>
                                <MDBInput
                                    type="text"
                                    placeholder="Enter Brand Name"
                                    id="brandName"
                                    name="brandName"
                                    value={formik.values.brandName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.brandName && Boolean(formik.errors.brandName)}
                                    helperText={formik.touched.brandName && formik.errors.brandName}
                                    sx={{ mb: 1 }}
                                />

                                <InputLabel sx={{ mt: 1, mb: 1 }}>
                                    <MDBTypography
                                        fontWeight="regular"
                                        fontSize="xs"
                                    >
                                        DESCRIPTION
                                    </MDBTypography>
                                </InputLabel>
                                <MDBInput
                                    type="text"
                                    placeholder="Describe what you did (optional)"
                                    id="description"
                                    name="description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    error={formik.touched.description && Boolean(formik.errors.description)}
                                    helperText={formik.touched.description && formik.errors.description}
                                    sx={{ mb: 2 }}
                                />
                            </Grid>

                            <Divider />
                            {/* boderRadius pending and fonts styles */}
                            <Grid
                                container
                                direction="row"
                                justifyContent="flex-end"
                                alignItems="flex-end"
                                sx={{ mb: 3 }}
                            >
                                <MDBButton
                                    variant="contained"
                                    size="small"
                                    bgColor="light_green"
                                    color="biaAssist"
                                    fontSize="md"
                                    fontWeight="bold"
                                    borderSize="lg"
                                    //disabled={isFormSubmit ? true : false}
                                    isLoading={isFormSubmit}
                                    sx={{ mr: 3, px: 3, py: 1.5 }}
                                    type="submit"
                                >
                                    Save
                                </MDBButton>
                            </Grid>
                        </Grid>
                    </MDBCard>
                </Grid>
                <Grid item xs={0.5} sm={0.5} md={2} lg={3} xl={3} xxl={3.75} xel={4} xxel={4.6} el={5} />
            </Grid>
        </div>
    )
}
