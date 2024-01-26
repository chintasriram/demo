import MDBox from 'components/MDBox'
import React from 'react'
import Cross from "assets/images/icons/svg/medium/CrossIcon.svg"
import MDBButton from 'components/MDBButton'
import { Grid, Tooltip } from '@mui/material'
import MDAvatar from 'components/MDAvatar'

export default function CloseButton(props) {
  // Onclose handle for Add past campaign
  const onCloseHandle = (e)=>{
    e?.preventDefault()
    props.callback(false)
  }
  return (
    <div>
      <Grid container>
        <MDAvatar
          sx={{border : "1px solid #8A8F93"}} 
          size = "md"
          onClick={(e)=>{onCloseHandle(e)}}
        >
          <Tooltip title="Close">
            <MDBButton
              variant="contained"
              bgColor= "transparent"
              padding = "0"
              sx={{padding: '0'}}
            >
              <MDBox
                component = "img"
                src = {Cross}
              />
            </MDBButton>
          </Tooltip>
        </MDAvatar>
      </Grid>
    </div>
  )
}
