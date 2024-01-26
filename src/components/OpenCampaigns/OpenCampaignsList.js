import React from 'react'
import OpenCamp from './OpenCampaigns';
import BoxIcon from "assets/images/icons/social/box.png";
import InstaIcon from "assets/images/icons/social/instagram.png";
import DividerLine from './DividerLine';
import { Box } from '@mui/system';
import { Grid, List, Paper } from '@mui/material';


export default function OpenCampaignsList() {
  return (
    <div>
      <OpenCamp smIcon={<img src ={InstaIcon}/>} heading={"F/W 2022 Tops"} subHeading ="$200"/>
      <DividerLine/>
      <OpenCamp smIcon={<img src={BoxIcon}/>} heading={"F/W 2022 Tops"} subHeading ={"item"}/>
      <DividerLine/>       
      <OpenCamp smIcon={<img src ={InstaIcon}/>} heading={"F/W 2022 Tops"} subHeading ={"$700"}/>
    </div>
  )
}
