import { Grid } from '@mui/material'
import React from 'react'
import MDBButton from './MDBButton'
import MDBTypography from './MDBTypography'
import Add from 'assets/images/icons/svg/medium/AddIcon.svg'
import MDAvatar from './MDAvatar'

export default function AddCollaborator(props) {
  return (
    <div>
        <Grid container>
            <MDAvatar
                size= "xs"
            >
                <MDBButton
                    variant="contained"
                    bgColor= "light_green"
                >
                    <MDBTypography
                        component ="img"
                        src={Add}
                    />
                </MDBButton>
            </MDAvatar>
            <Grid item>
                <MDBTypography
                    color = "light_green"
                    fontWeight = "regular"
                    fontSize = "sm"
                    lineHeightSize = "xxl"
                >
                    {props.addText}
                </MDBTypography>
            </Grid>
        </Grid>
    </div>
  )
}
