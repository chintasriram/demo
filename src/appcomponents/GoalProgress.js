import { Divider, Grid } from '@mui/material';
import React from 'react'
import MDBCard from '../components/MDBCard';
import MDBTypography from '../components/MDBTypography';
import GoalsLayer from 'assets/images/ImagesSvg/Goals.png'

function GoalProgress(props) {
    
  return (
    <>
        <MDBCard sx={{m:0, p:0, pt: 3, width: "inherit"}}>
            <Grid  px={3}>
                <MDBTypography
                    color="white"
                    fontWeight = "medium"
                    fontSize = "xl"
                    lineHeightSize = "2xxl"
                    pb={2}
                >
                    Goal Progress
                </MDBTypography>
            </Grid>
            <Divider sx={{my:0}}/>

            <Grid 
                container justifyContent="center" alignContent="center" 
                sx={{ background: `url(${GoalsLayer})`, borderRadius: "0 0 12px 12px", backgroundRepeat:"no-repeat", backgroundSize:"cover" }}
                height="294px"
            >
                <Grid item>
                    <MDBTypography
                        color= "grayScale"
                        fontWeight= "medium"
                        fontSize= "md"
                        lineHeightSize= "xxl" 
                        px={3}
                    >
                        {/* No goals yet */}
                        Coming Soon
                    </MDBTypography>
                </Grid>
            </Grid> 
            {/* {
                props?.data?.map((item,idx)=>(
                <Grid  key={idx}>
                    <MDBProgress 
                        title={item.title}
                        percentage={item.percentage}
                        value={item.value}
                        maxValue={item.maxValue}
                    />
                </Grid>
            ))
            } */}
        </MDBCard>
    </>
  )
}

export default GoalProgress;