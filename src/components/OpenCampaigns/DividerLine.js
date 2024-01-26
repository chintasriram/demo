// divider line for openCampign
import { Grid } from '@mui/material'
import React from 'react'
import Border_top from "assets/images/icons/social/Border_top.png"

export default function DividerLine() {
  return (
    <Grid container mx={3} >
      <img src ={Border_top} sx= {{width:"312px", height :"2px"}}/>
    </Grid>
  )
}
