// npm i react-player {npm used}
import { Grid } from '@mui/material'
import CloseButton from 'components/CloseButton'
import React from 'react'
import ReactPlayer from 'react-player/lazy'

function VideoPlayer(props) {
    return (
        <Grid
            container
            alignContent="center"
            justifyContent="center"
            style={{ height: "100%" }}
        >
            <Grid item xs={2} sm={2} md={2} lg={2} xl={2} xxl={1.5} xel={2} xxel={3} el={3} />
            <Grid item xs={8} sm={8} md={8} lg={8} xl={3} xxl={7} xel={7} xxel={5.5} el={5}>
                <Grid item>
                    <Grid container justifyContent="flex-end" pb={3} ml={8}>
                        <CloseButton callback={props.closeCallback} />
                    </Grid>
                    <Grid container justifyContent="center">
                        <ReactPlayer
                            controls
                            muted={true}
                            url={props?.url}
                            height="526px"
                            width="inherit"
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={2} sm={2} md={2} lg={2} xl={2} xxl={1.5} xel={2} xxel={3} el={3} />
        </Grid>
    )
}
export default VideoPlayer;
