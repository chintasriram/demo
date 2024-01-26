import { Grid, Modal } from '@mui/material'
import MDBTypography from 'components/MDBTypography'
import { useEffect, useState } from 'react';
import httpService from 'service/HttpService'
import MDBButton from 'components/MDBButton';
import AddSponsoredVideo from '../cards/AddSponsoredVideo';
import MultiCarousel from 'pages/Carousel';

export default function SponsoredPostsCard(props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const [sponsoredList, setSponsoredList] = useState([]);

    useEffect(() => {
        getSponsoredList();
    }, [props.mediakitId]);

    const handleClose = (isRefresh) => {
        setOpen(false);
        //get youtube links
        getSponsoredList()
    }

    const getSponsoredList = () => {
        httpService.getSponsoredList(props?.mediakitId)
            .then((res) => {
                if (
                    res !== undefined &&
                    res?.data?.success !== undefined &&
                    res?.data?.success === true
                ) {
                    setSponsoredList(res.data.data);
                }
            })
            .catch((error) => {
                console.log("Error in getSponsoredList", error);
            });
    }

    return (
        <div>
            {(props?.isEdit === true || sponsoredList?.length > 0) &&
                <Grid my={2}>
                    {/* Sponsored Posts Card Title */}
                    <Grid container justifyContent="space-between" mb={3}>
                        <Grid item >
                            <Grid container>
                                <Grid item alignSelf="center" mr={3} pb={1}>
                                    <MDBTypography
                                        color="white"
                                        fontWeight="medium"
                                        fontSize="2xl"
                                        lineHeightSize="4xl"
                                        pr={1}
                                    >
                                        Sponsored Posts
                                    </MDBTypography>
                                </Grid>
                                {/* Sponsored Posts to link the Videos */}
                                {!props?.isPreview && (
                                    <Grid item>
                                        <MDBButton
                                            size="medium"
                                            variant="outlined"
                                            bgColor="grayScale"
                                            color="grayScale"
                                            borderSize="md"
                                            fontWeight="medium"
                                            fontSize="md"
                                            onClick={handleOpen}
                                        >
                                            Add Sponsored Post
                                        </MDBButton>
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                        <Grid item >
                            <MDBTypography
                                color="white"
                                fontWeight="regular"
                                fontSize="sm"
                                lineHeightSize="2xl"
                                mt={0.5}
                            >
                                {/* See More */}
                            </MDBTypography>
                        </Grid>
                    </Grid>
                    <Grid >
                        <MultiCarousel videos={sponsoredList} width="100%" height="min(250px,275px)" isSponsored={true} />
                    </Grid>

                    {/* Modal to link the video for Sponsored Posts */}
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        style={{ overflow: "scroll" }}
                    >
                        <AddSponsoredVideo closeCallback={handleClose} mediakitId={props.mediakitId} platforms={props.platforms} />
                    </Modal>
                </Grid>
            }
        </div>
    )
}
