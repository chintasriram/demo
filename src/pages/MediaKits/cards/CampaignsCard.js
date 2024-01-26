import { Divider, Grid, Modal } from '@mui/material'
import MDBButton from 'components/MDBButton'
import MDBCard from 'components/MDBCard'
import MDBTypography from 'components/MDBTypography'
import React, { useEffect, useState } from 'react'
import NoImage from 'assets/images/icons/svg/medium/GalleryIcon.svg';
import Add from 'assets/images/icons/svg/medium/AddIcon.svg'
import MDAvatar from 'components/MDAvatar'
import AddPastcampaign from './AddCampaign'
import { useLocation } from 'react-router-dom'
import httpService from 'service/HttpService'
import { toast } from 'react-toastify'
import CloseButton from 'components/CloseButton'
import toastIcon from 'assets/images/icons/svg/medium/ToastSuccess.svg'


export default function CampaignsCard(props) {
    //Configure the Toast
    toast.configure();

    //Navigation to the page
    const [open, setOpen] = useState(false);
    const [deletePopupOpen, setDeletePopupOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [mediakitId, setMediakitId] = useState("")
    const [campaigns, setCampaigns] = useState([])
    const [selectedRowId, setSelectedRowId] = useState(0)
    const [selectedRow, setSelectedRow] = useState(null)
    const { state } = useLocation();
    const [mediakit, setMediakit] = useState({})

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = (isRefreshCampaigns) => {
        setOpen(false);

        if (isRefreshCampaigns === true) {
            // Get campaigns
            getCampaigns();
        }
    }

    // Edit Modal close and open
    const editModalOpenHandle = (row) => {
        if (row !== undefined) {
            setSelectedRow(row)
            setEditModalOpen(true);
        }
    }

    const editModalCloseHandle = (isRefreshCampaigns) => {
        setEditModalOpen(false);

        if (isRefreshCampaigns === true) {
            // Get campaigns
            getCampaigns();
        }
    }

    const handleDeletePopupOpen = (rowId) => {
        if (rowId !== undefined && rowId !== 0) {
            setSelectedRowId(rowId)
            setDeletePopupOpen(true);
        } else {
            setSelectedRowId(0)
        }
    };

    const handleDeletePopupClose = () => setDeletePopupOpen(false);

    useEffect(() => {
        setSelectedRowId(0)
        //Check mediakit router param
        if (state !== undefined && state !== null && state?.mediakitId !== undefined && state?.mediakitId !== null) {
            setMediakitId(state.mediakitId)
            getMediakit(state.mediakitId)
            if (props?.setMediaKitCallback) {
                props.setMediaKitCallback(state.mediakit)
            }
            if (props?.setMediaKitIdCallback) {
                props.setMediaKitIdCallback(state.mediakitId)
            }
        }

        //get campaigns
        getCampaigns();
    }, [])

    // Get Mediakit by id
    const getMediakit = (id) => {
        httpService.getMediaKitById(id).then((res) => {
            if (res !== undefined && res?.data?.success !== undefined && res?.data?.success === true) {
                setMediakit(res.data.data)
            }
        })
    }

    const getCampaigns = () => {
        let user = getUserFromSession();

        if (user !== null && user?.clientId !== undefined && user?.clientId !== "" && user?.clientId !== null && state?.mediakitId !== undefined && state?.mediakitId !== "" && state?.mediakitId !== null) {
            let camapignsReq = {
                "userId": user?.id,
                "clientId": user?.clientId,
                "mediakitId": state?.mediakitId
            }

            httpService.getCampaigns(camapignsReq).then((res) => {
                // check success is true or not
                if (res !== null && res !== undefined && res?.data?.data !== null && res?.data?.data !== undefined) {
                    // Check  campaigns data
                    if (res.data.data?.length > 0) {
                        setCampaigns(res.data.data)
                    } else {
                        setCampaigns([])
                    }
                }
            }).catch((error) => {
                console.log(error)
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

    //Ok callback handler
    const handleOk = () => {
        if (selectedRowId !== undefined && selectedRowId !== 0) {
            handleDeletePopupClose();

            //Delete Api integration
            deleteCampaign(selectedRowId);
        } else {
            handleDeletePopupClose();
            //message : unable to delete campaign. Please try again
            // Throw error
            toast.error("Unable to delete campaign. Please try again", { position: toast.POSITION.TOP_LEFT, hideProgressBar: true });
        }
    }

    const deleteCampaign = (campaignId) => {
        httpService.deleteCampaignById(campaignId).then((res) => {
            if (res !== undefined && res !== null && res?.data?.success && res?.data?.success === true) {
                // Success Message
                toast.success("Deleted successfully", { position: toast.POSITION.TOP_LEFT, hideProgressBar: true,icon:<img src={toastIcon} /> });

                //get campaigns
                getCampaigns();
            } else {
                // Throw error
                toast.error("Unable to delete campaign. Please try again", { position: toast.POSITION.TOP_LEFT, hideProgressBar: true });
            }
        }).catch((error) => {
            console.log(error)
            // Throw error
            toast.error("Unable to delete campaign. Please try again", { position: toast.POSITION.TOP_LEFT, hideProgressBar: true });
        })
    }
    return (
        <MDBCard sx={{ p: 0, mx: "auto", my: "104px", width: "500px" }}>
            {/* Card Header */}
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ display: "flex", mt: 3, px: 4}}
            >
                <MDBTypography
                    fontWeight="medium"
                    fontSize="xl"
                    lineHeight="2xxl"
                >
                    Past Campaigns
                </MDBTypography>

                <CloseButton callback={props.closeCallback} />
            </Grid>

            {/* Divider */}
            <Divider />

            <Grid
                pt={1} px={4} pb={3}
                sx={{ height: "500px", overflowY: "scroll" }}
            >
                <MDBTypography
                    fontWeight="regular"
                    fontSize="md"
                    sx={{ mb: 2 }}
                    lineHeight="2xl"
                >
                    Campaigns
                </MDBTypography>

                {/* Campaigns Added List */}
                {(campaigns?.length > 0) &&
                    campaigns?.map((campaign, idx) => (
                        <Grid key={idx}>
                            <Grid container justifyContent="space-between">
                                <Grid item display="flex">
                                    {(campaign?.imageUrl && campaign?.imageUrl !== undefined && campaign?.imageUrl !== "") ?
                                        <MDBTypography
                                            component="img"
                                            src={httpService.getMediaBaseUrl(campaign?.imageUrl)}
                                            width="48px"
                                            height="48px"
                                            sx={{ borderRadius: "100%" }}
                                        />
                                        :
                                        <MDBTypography
                                            component="img"
                                            width="48px"
                                            height="48px"
                                            src={NoImage}
                                            sx={{ borderRadius: "48px", border: "1px solid #8A8F93" }}
                                        />
                                    }
                                    <Grid ml={2}>
                                        <MDBTypography
                                            fontWeight="regular"
                                            fontSize="md"
                                            color="white"
                                            lineHeight="2xl"
                                        >
                                            {campaign?.brandName}
                                        </MDBTypography>
                                        <MDBTypography
                                            fontWeight="regular"
                                            fontSize="sm"
                                            color="grayScale"
                                            lineHeight="xxl"
                                            maxWidth="280px"
                                        >
                                            {campaign?.description}
                                        </MDBTypography>
                                    </Grid>
                                </Grid>
                                <Grid item display="flex">
                                    <Grid item ml="auto" alignSelf="center">
                                        <MDBButton
                                            size="large"
                                            variant="text"
                                            color="light_green"
                                            bgColor=""
                                            fontWeight="regular"
                                            fontSize="md"
                                            onClick={() => { handleClose(); props?.closeCallback(campaign); }}
                                        >Select</MDBButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Divider sx={{ my: 2 }} />
                        </Grid>
                    ))
                }

                {/* Add Campaigns modal to open campaigns popup */}
                <Modal
                    open={editModalOpen}
                    onClose={() => { editModalCloseHandle(false) }}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <AddPastcampaign closeCallback={editModalCloseHandle} campaign={selectedRow} />
                </Modal>

                {/* Add Button for Campaigns */}
                <Grid container
                    onClick={handleOpen}
                    sx={{ cursor: "pointer" }}
                >
                    <MDAvatar
                        size="xs"
                    >
                        <MDBButton
                            variant="contained"
                            bgColor="light_green"
                        >
                            <MDBTypography
                                component="img"
                                src={Add}
                            />
                        </MDBButton>
                    </MDAvatar>
                    <MDBTypography
                        color="light_green"
                        fontWeight="regular"
                        fontSize="sm"
                        lineHeightSize="xxl"
                        pl={1} pt={0.3}
                    >
                        Add Campaign
                    </MDBTypography>
                </Grid>

                {/* Add Campaigns modal to open campaigns popup */}
                <Modal
                    open={open}
                    onClose={() => { handleClose(false) }}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <AddPastcampaign closeCallback={handleClose} mediakitId={mediakitId} />
                </Modal>
            </Grid>
        </MDBCard>
    )
}
