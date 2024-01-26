import { Divider, Grid, Modal } from '@mui/material'
import MDBButton from 'components/MDBButton'
import MDBCard from 'components/MDBCard'
import MDBTypography from 'components/MDBTypography'
import React, { useEffect, useState } from 'react'
import DeleteIcon from 'assets/images/icons/svg/medium/DeleteIcon1818.svg'
import EditIcon from 'assets/images/icons/svg/medium/EditIcon1818.svg'
import Add from 'assets/images/icons/svg/medium/AddIcon.svg'
import NoImage from 'assets/images/icons/svg/medium/GalleryIcon.svg';
import MDAvatar from 'components/MDAvatar'
import AddPastcampaign from './AddCampaign'
import httpService from 'service/HttpService'
import DeletePopup from './DeletePopup'
import { toast } from 'react-toastify'
import { useWidth } from 'components/Hooks/UseWidth'
import toastIcon from 'assets/images/icons/svg/medium/ToastSuccess.svg'


export default function EditCampaign(props) {
    const breakpoint = useWidth()[0]
    //Configure the Toast
    toast.configure();

    const [open, setOpen] = useState(false);
    const [deletePopupOpen, setDeletePopupOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [mediakit, setMediakit] = useState({})
    const [mediakitId, setMediakitId] = useState("")
    const [campaigns, setCampaigns] = useState([])
    const [selectedRowId, setSelectedRowId] = useState(0)
    const [selectedRow, setSelectedRow] = useState(null)
    const [isFormSubmit, setIsFormSubmit] = useState(false);

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
        setIsFormSubmit(false)
        setSelectedRowId(0)
        //Check mediakit router param
        if (props?.mediakitId !== undefined && props?.mediakitId !== null) {
            setMediakitId(props?.mediakitId)
            getMediakit(props?.mediakitId)
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

        if (user !== null && user?.clientId !== undefined && user?.clientId !== "" && user?.clientId !== null && props?.mediakitId !== undefined && props?.mediakitId !== "" && props?.mediakitId !== null) {
            let camapignsReq = {
                "userId": user?.id,
                "clientId": user?.clientId,
                "mediakitId": props?.mediakitId
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
                toast.success("Deleted successfully", { position: toast.POSITION.TOP_LEFT, hideProgressBar: true, icon:<img src={toastIcon} /> });

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

    // Onclose handle for Edit Campaigns
    const onCloseHandle = (e) => {
        e?.preventDefault()
        props.closeCallback(true)
    }

    //update Campaign
    const updateCampaign = (e) => {

        e?.preventDefault()
        props.closeCallback(true)
        setIsFormSubmit(true)
    }

    return (
        <Grid
            container
            alignContent="center"
            justifyContent="center"
            style={{ minHeight: "100vh" }}
        >
            <Grid item xs={0.5} sm={0.5} md={2} lg={3} xl={3} xxl={3.75} xel={4} xxel={4.75} el={5} />
            <Grid item xs={11} sm={11} md={8} lg={6} xl={5.32} xxl={4.5} xel={3.5} xxel={2.5} el={2}>
                <MDBCard sx={{ p: 0, mx: 0, my: 10, width: "inherit" }}>
                    {/* Card Header */}
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ display: "flex", mt: 4 }}
                    >
                        <MDBTypography
                            fontWeight="medium"
                            fontSize="xl"
                            lineHeight="2xxl"
                            sx={{ ml: 3 }}
                        >
                            Past Campaigns
                        </MDBTypography>
                    </Grid>

                    {/* Divider */}
                    <Divider />

                    <Grid
                        px={5}
                        sx={{ height: "380px", overflowY: "scroll" }}
                    >
                        <MDBTypography
                            fontWeight="medium"
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
                                    <Grid container>
                                      <Grid item xs={2.5} md={1.8}>
                                        {(campaign?.imageUrl && campaign?.imageUrl !== undefined && campaign?.imageUrl !== "") ?
                                            <MDBTypography
                                                component="img"
                                                src={httpService.getMediaBaseUrl(campaign?.imageUrl)}
                                                width="48px"
                                                height="48px"
                                                sx={{ borderRadius: "48px" }}
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
                                      </Grid>
                                      <Grid item xs={9.5} md={10.2}>
                                        <Grid container>
                                            <Grid item xs={9.5}>
                                                <MDBTypography
                                                    fontWeight="regular"
                                                    fontSize="md"
                                                    color="white"
                                                    lineHeight="2xl"
                                                >
                                                    {campaign?.brandName}
                                                </MDBTypography> 
                                            </Grid>
                                            <Grid item xs={2.5} display="flex">
                                                <Grid pr={1}>
                                                    <MDBButton
                                                        variant="outlined"
                                                        bgColor="transparent"
                                                        color=""
                                                        iconOnly={true}
                                                        circular={true}
                                                        onClick={() => { handleDeletePopupOpen(campaign.id) }}
                                                    >
                                                        <MDBTypography
                                                            component="img"
                                                            src={DeleteIcon}
                                                        />
                                                    </MDBButton>
                                                </Grid>
                                                <Grid>
                                                    <MDBButton
                                                        variant="outlined"
                                                        bgColor="transparent"
                                                        color=""
                                                        iconOnly={true}
                                                        circular={true}
                                                        onClick={() => { editModalOpenHandle(campaign) }}
                                                    >
                                                        <MDBTypography
                                                            component="img"
                                                            src={EditIcon}
                                                        />
                                                    </MDBButton>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <MDBTypography
                                                fontWeight="regular"
                                                fontSize="sm"
                                                color="grayScale"
                                                lineHeight="xxl"
                                            >
                                                {campaign?.description} 
                                            </MDBTypography>   
                                        </Grid>
                                      </Grid>
                                    </Grid>

                                    <Divider sx={{ my: 2 }} />
                                </Grid>
                            ))
                        }

                        {/* Modal */}
                        <Modal
                            open={deletePopupOpen}
                            onClose={handleDeletePopupClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            {/* Delete Popup */}
                            <DeletePopup cancelCallback={handleDeletePopupClose} okCallback={handleOk} />
                        </Modal>

                        {/* Add Campaigns modal to open campaigns popup */}
                        <Modal
                            open={editModalOpen}
                            onClose={() => { editModalCloseHandle(false) }}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            style={{ overflow: "scroll" }}
                        >
                            <AddPastcampaign closeCallback={editModalCloseHandle} campaign={selectedRow} isEditCampaign={true} isNewCampaign={false} />
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
                            style={{ overflow: "scroll" }}
                        >
                            <AddPastcampaign closeCallback={handleClose} mediakitId={mediakitId} campaignsLength={campaigns?.length} isNewCampaign={true} />
                        </Modal>
                    </Grid>

                    {/* Divider */}
                    <Divider />

                    {/* Card Footer */}
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                        sx={{ mb: 3 }}
                    >
                        <Grid item>
                            <MDBButton
                                variant="text"
                                size="small"
                                bgColor="black"
                                color="white"
                                fontSize="md"
                                fontWeight="medium"
                                borderSize="md"
                                sx={{ px: 3, py: 1.5, mr: 1 }}
                                onClick={(e) => { onCloseHandle(e) }}
                            >
                                Cancel
                            </MDBButton>
                            <MDBButton
                                variant="contained"
                                size="small"
                                bgColor="light_green"
                                color="biaAssist"
                                fontSize="md"
                                fontWeight="bold"
                                borderSize="md"
                                sx={{ px: 3, py: 1.5, mx: 3 }}
                                onClick={(e) => { updateCampaign(e) }}
                                isLoading={isFormSubmit}
                            >
                                Save
                            </MDBButton>
                        </Grid>
                    </Grid>
                </MDBCard>
            </Grid>
            <Grid item xs={0.5} sm={0.5} md={2} lg={3} xl={3} xxl={3.75} xel={4} xxel={4.75} el={5} />
        </Grid>
    )
}
