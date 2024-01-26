import { Divider, Grid, Tooltip } from '@mui/material'
import MDBButton from 'components/MDBButton'
import MDBCard from 'components/MDBCard'
import MDBTypography from 'components/MDBTypography'
import React, { useEffect, useState } from 'react'
import ShareComponent from './ShareIcon'
import ShareIcon from '../assets/images/icons/svg/medium/ShareIcon.svg'
import CloseButton from 'components/CloseButton'
import MDBInput from 'components/MDBInput'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import InputAdornment from "@mui/material/InputAdornment";

export default function SharePopover(props) {
    const [isCopied, setIsCopied] = useState(false);

    const biaUrl = document.location.origin; 
    
    const copyText = (e) => {
        setIsCopied(true);
        navigator?.clipboard?.writeText(props?.bioHandler ? biaUrl + "/@" + props?.bioHandler : biaUrl);
    } 

    useEffect(() => {
        if (isCopied) {
            setTimeout(setCopied, 15000)            
        }
      }, [isCopied]);

    const setCopied = () => {
        setIsCopied(false)
    }

    const openMediaKit = () => {
        window.open(window.location.origin+"/@"+props?.bioHandler,"_blank");
    }

    return (
        <Grid container
            alignContent="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
        >
            <MDBCard bgcolor="black" sx={{ px: 0, pt:0, pb: 1.5, width:"min-content"}} >
                <Grid container sx={{ px: 2.5, py: 3 }} justifyContent="space-between">
                    <Grid item>
                        <MDBTypography
                            color="white"
                            fontWeight="medium"
                            fontSize="xl"
                            lineHeightSize="2xxl"
                            sx={{ mt: 1 }}
                        >   Share your Media Kit
                        </MDBTypography>
                    </Grid>
                    <Grid item>
                        <CloseButton callback={props?.onCloseCallback}/>
                    </Grid>
                </Grid>

                <Divider sx={{ m: 0 }} />

                <Grid sx={{ px: 2.5, py: 2 }}>
                    <MDBTypography sx={{ pb: 1 }}>
                        Share a Link
                    </MDBTypography>
                    <ShareComponent url={props?.bioHandler} />
                </Grid>

                <Divider sx={{ m: 0 }} />

                <Grid container sx={{ px: 2.5, py: 2 }}>
                    <Grid>
                        <MDBTypography sx={{ pb: 1 }}>
                            Website Link:
                        </MDBTypography>
                    </Grid>
                    <Grid container pb={1.5} onClick={copyText}>
                        <Tooltip  title={isCopied?"Copied!":"Click to copy"}>
                            <MDBInput
                                sx={{ input: { cursor: 'pointer' } }}
                                value={props?.bioHandler ? biaUrl + "/@" + props?.bioHandler : biaUrl}
                                InputProps={{
                                    endAdornment: (
                                    <InputAdornment position="start"  sx={{cursor:"pointer !important"}}>
                                        <ContentCopyIcon style={{ fill: isCopied ? "#fff" : "" }}/>
                                    </InputAdornment>
                                    )
                                }}
                            />
                        </Tooltip>
                    </Grid>
                    <Grid container justifyContent="flex-end">
                            <MDBButton
                                size="medium"
                                variant="contained"
                                color="black"
                                bgColor="light_green"
                                fontWeight="medium"
                                fontSize="md"
                                borderSize="md"
                                lineHeight="2xxl"
                                onClick={openMediaKit}
                            >
                                <MDBTypography
                                    component="img"
                                    src={ShareIcon}
                                    width="20px"
                                    height="20px" mr={1}
                                    sx={{filter: "brightness(0)"}}
                                />
                                View your Media Kit
                            </MDBButton>
                    </Grid>
                </Grid>
            </MDBCard>
        </Grid>
    )
}
