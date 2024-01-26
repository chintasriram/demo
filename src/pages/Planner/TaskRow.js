import React from 'react'
import { Grid } from '@mui/material'
import MDBTypography from 'components/MDBTypography'
import Calendarcomp from 'assets/images/icons/svg/medium/DigitalCoIcon.svg'
import DateService from 'service/DateService';
import MDBox from 'components/MDBox';

export default function TaskRow(props) {
  const images = {
    "task": Calendarcomp,
    "event": Calendarcomp,
  }

  return (
    <MDBox sx={{px:1}}>
      <Grid 
        container
        display="flex"
        alignItems="baseline"
        direction="row"
      >
        <Grid item xs={2}>
          <MDBTypography
            component='img'
            src={props?.event?.type in images ? images[props?.event?.type] : Calendarcomp}
            // lineHeight= "4xl"
          />
        </Grid>
        <Grid item md={10} xs={10}>
          <MDBTypography
            fontWeight="bold"
            fontSize="xxs"
            // lineHeight='md'
            sx={{
              ml:"4px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical"
            }}
          >
            {props?.event?.title?.trim()}
          </MDBTypography>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{mt:0}}
      >
        <Grid item>
          <MDBTypography
            fontWeight="regular"
            fontSize="xxs"
            lineHeight='md'
          >
            {(DateService.getMcEventStartTime(props?.event?.start))+" - "+(DateService.getMcEventEndTime(props?.event?.start, props?.event?.end))}
          </MDBTypography>
        </Grid>
      </Grid>
    </MDBox>
  )
}
