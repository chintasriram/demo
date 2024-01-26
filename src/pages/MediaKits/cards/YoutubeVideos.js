import { Grid, Modal } from '@mui/material';
import React, { useState } from 'react'
import MDBCard from '../../../components/MDBCard';
import MDBTypography from '../../../components/MDBTypography';
import MDBButton from '../../../components/MDBButton';
import CampaignsCard from './CampaignsCard';

function YoutubeVideos(props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false)

    return (
        <Grid sx={{overflowY: "scroll", maxHeight: "500px"}}>
            {
                inbound_Data?.map((item, idx) => (
                    <MDBCard
                        key={idx}
                        borderRadius="md"
                        sx={{ border: "1px solid #404344", m: 0, mb: 1, width: "100%" }}
                    >
                        <Grid container >
                            <Grid item sx={{ pr: 1.5 }} alignSelf="center">
                                <MDBTypography
                                    component="img"
                                    width="80px"
                                    height="60px"
                                    src={item.video_thumbnail}
                                />
                            </Grid>

                            <Grid item alignSelf="center">
                                <MDBTypography
                                    color="white"
                                    fontWeight="medium"
                                    fontSize="md"
                                    lineHeightSize="xl"
                                    maxWidth="300px"
                                >
                                    {item.video_title}
                                </MDBTypography>
                            </Grid>
                            <Grid item ml="auto" alignSelf="center">
                                <MDBButton
                                    size="large"
                                    variant="text"
                                    color="light_green"
                                    bgColor=""
                                    fontWeight="regular"
                                    fontSize="md"
                                    onClick={handleOpen}
                                >
                                    Select
                                </MDBButton>
                            </Grid>
                        </Grid>
                    </MDBCard>
                ))
            }
             {/* Modal to link the video */}
             <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <CampaignsCard closeCallback={handleClose} mediakitId={props.mediakitId} />
            </Modal>
        </Grid>
    )
}

export default YoutubeVideos;