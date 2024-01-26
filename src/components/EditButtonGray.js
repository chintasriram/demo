import MDBox from 'components/MDBox'
import React from 'react'
import Edit from "assets/images/icons/svg/medium/EditIcon1818.svg"
import MDBButton from 'components/MDBButton'
import { Grid, Tooltip } from '@mui/material'
import MDAvatar from 'components/MDAvatar'

export default function EditButtonGray(props) {
  // Onclose handle for Add past campaign
  const onEditHandle = (e)=>{
    e?.preventDefault()
    props.callback(false)
  }
  return (
    <div>
      <Grid container>
        <MDAvatar
          sx={{border : "1px solid #8A8F93"}} 
          size = "md"
          onClick={(e)=>{onEditHandle(e)}}
        >
          <Tooltip title="Edit">
            <MDBButton
              variant="contained"
              bgColor= "transparent"
              padding = "0"
            >
              <MDBox
                component = "img"
                src = {Edit}
              />
            </MDBButton>
          </Tooltip>
        </MDAvatar>
      </Grid>
    </div>
  )
}
