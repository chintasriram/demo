import { Grid, Modal } from '@mui/material';
import React, { useState } from 'react'
import MDBCard from '../../../components/MDBCard';
import MDBTypography from '../../../components/MDBTypography';
import AwayLuggage from 'assets/images/ImagesSvg/AwayImage.svg'
import Milkbar from 'assets/images/ImagesSvg/MilkBarImage.svg'
import MDBButton from '../../../components/MDBButton';
import CampaignsCard from './CampaignsCard';

function TiktokVideos(props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false)


    const inbound_Data = [
        {
            video_thumbnail: AwayLuggage,
            video_title: 'Away Luggagessdsds wdsdsfsf wdewdsd',
            // button_type: 'Paid Youtube Short',
        },
        {
            video_thumbnail: Milkbar,
            video_title: 'Milk Bar',
            // button_type: 'Tiktok Post',
        }
    ]

    return (
        <Grid>
            {
                inbound_Data?.map((item, idx) => (
                    <MDBCard
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

export default TiktokVideos;