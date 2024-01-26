import MDBTypography from 'components/MDBTypography'
import React from 'react'
import User from 'assets/images/icons/social/UserIcon.png'
import Eye from 'assets/images/icons/social/EyeIcon.png'
import Click from 'assets/images/icons/social/ClickIcon.png'
import { Grid } from '@mui/material'
import MDBCard from 'components/MDBCard'
import Graph from 'assets/images/icons/reach/Vector14.png'
import Arrow from 'assets/images/icons/reach/arrow.png'

export default function PlatformStatisticsCardsList() {
  const StatisticsCardData = [
    {
      icon: User,
      metrics: "Followers",
      value: "6.05M",
      graph: Graph,
      arrow: Arrow,
      subValue: "522,248 Followers"
    }, 
    {
      icon: Click,
      metrics: "Engagement Rate",
      value: "2.08%",
      graph: Graph,
      arrow: Arrow,
      subValue: "0.04%"
    }, 
    {
      icon: Eye,
      metrics: "Views",
      value: "82M",
      graph: Graph,
      arrow: Arrow,
      subValue: "25m"
    }
  ]

  return (
    <div>
      <Grid container>
        { StatisticsCardData?.map((data, idx)=>(
          <Grid item>
            <MDBCard
              key={idx}
              bgcolor= "black"
              sx={{m:0, mx:1}}
            >
              <MDBTypography
                component="img"
                src={data.icon}
                mb={2}
              />
              <MDBTypography
                color = "grey400"
                fontWeight = "regular"
                fontSize = "sm"
                lineHeightSize = "xxl"
              >
                {data.metrics}
              </MDBTypography>

              <Grid container>
                <MDBTypography
                  color = "white"
                  fontWeight = "medium"
                  fontSize = "2xl"
                  lineHeightSize = "4xl"
                  mr={2} mb={2}
                >
                  {data.value}
                </MDBTypography>
                <MDBTypography
                  component="img"
                  src={data.graph}
                  height="14px" 
                  mt={0.5} mr={20.7}
                />
              </Grid>
              <Grid container>
                <MDBTypography
                  component="img"
                  src={data.arrow}
                  height="12px" 
                  mt={0.5} mr={0.125}
                >

                </MDBTypography>
                <MDBTypography
                  color = "green"
                  fontWeight = "regular"
                  fontSize = "sm"
                  lineHeightSize = "xxl"
                >
                  {data.subValue}
                </MDBTypography>
              </Grid>
            </MDBCard>
          </Grid>
          ))
        }
      </Grid>
    </div>
  )
}
