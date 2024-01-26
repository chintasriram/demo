import { Grid } from '@mui/material'
import BasicSelect from 'components/Dropdown'
import MDBCard from 'components/MDBCard'
import MDBTypography from 'components/MDBTypography'
import NavIcons from 'components/NavIcons'
import HorizontalStackBarChart from 'appcomponents/Charts/BarCharts/HorizontalStackBarChart'
import DefaultDoughnutChart from 'appcomponents/Charts/DoughnutCharts/DefaultDoughnutChart'
import doughnutChartData from 'appcomponents/Charts/data/doughnutChartData'
import hrBarChartData from 'appcomponents/Charts/data/hrBarChartData'
import hrBarChart_1 from 'appcomponents/Charts/data/hrBarChart_1'
import React, { useEffect, useState } from 'react'
import Graph from 'assets/images/icons/reach/Vector14.png'
import Arrow from 'assets/images/icons/reach/arrow.png'
import User from 'assets/images/icons/social/UserIcon.png'
import PlatformStatisticsCard from './PlatformStatisticsCard'
import Click from 'assets/images/icons/social/ClickIcon.png'
import Eye from 'assets/images/icons/social/EyeIcon.png'
  
export default function Statistics() {
    const timePeriods = [
        {id: "1", name: 'Last 30 Days'},
        {id: "2", name: 'Week'},
        {id: "3", name: 'Day'},
    ]
    
    
    const countries = [
        {id: "1", name: 'India'},
        {id: "2", name: 'USA'},
        {id: "3", name: 'UK'},
    ]
    

    //Countries dropdown onchange callback
    const countryOnchangeCallback = (selectedCountry)=>{
        console.log(selectedCountry)
    }

    //Time period onchange callback
    const timePeriodOnchangeCallback= (selectedTimePeriod)=>{
        console.log(selectedTimePeriod)
    }

    return (
        <div>
            <MDBCard
                bgcolor="black"
                sx={{p:3}}
            >
                <Grid >
                    <Grid display="flex" justifyContent="space-between">
                        <Grid item>
                            <MDBTypography
                                color = "white"
                                fontWeight = "medium"
                                fontSize = "xl"
                                lineHeightSize = "2xxl"
                            >
                                Reach
                            </MDBTypography>
                            <NavIcons content="Instagram"/>
                        </Grid>
                        <Grid item>
                            <BasicSelect contents={timePeriods}  basicSelectCallback={timePeriodOnchangeCallback} />
                        </Grid>
                    </Grid>

                    <Grid container >
                        <Grid item mb={2}>
                            <PlatformStatisticsCard
                                icon= {User}
                                metrics= "Followers"
                                value= "6.05M"
                                graph= {Graph}
                                arrow= {Arrow}
                                subValue= "522,248 Followers"
                            />
                        </Grid>
                        <Grid item mx={2} mb={2}>
                            <PlatformStatisticsCard
                                icon= {Click}
                                metrics= "Engagement Rate"
                                value= "2.08%"
                                graph= {Graph}
                                arrow= {Arrow}
                                subValue= "0.04%"
                            />
                        </Grid>
                        <Grid item mb={2}   >
                            <PlatformStatisticsCard
                                icon= {Eye}
                                metrics= "Views"
                                value= "82M"
                                graph= {Graph}
                                arrow= {Arrow}
                                subValue= "25m"
                            /> 
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item >
                            <Grid  mr={1}>
                                <MDBCard
                                    borderRadius = "md"
                                    bgcolor="black"
                                    sx={{m:0}}
                                >
                                    <MDBTypography
                                        fontWeight = "regular"
                                        fontSize = "md"
                                        lineHeightSize = "2xl"
                                    >
                                        Gender Distribution
                                    </MDBTypography>
                                    <HorizontalStackBarChart
                                        chart = {hrBarChartData}
                                        height = "45px"
                                        width = "455px"
                                    />
                                </MDBCard>
                            </Grid>
                            <Grid my={1} mr={1}>
                                <MDBCard
                                    borderRadius = "md"
                                    bgcolor="black"
                                    sx={{m:0}}
                                >
                                    <MDBTypography
                                        fontWeight = "regular"
                                        fontSize = "md"
                                        lineHeightSize = "2xl"
                                    >
                                        Age Distribution
                                    </MDBTypography>
                                    <HorizontalStackBarChart
                                        chart = {hrBarChart_1}
                                        width = "455px"
                                        height = "45px"
                                    />
                                </MDBCard>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <MDBCard
                                borderRadius = "md"
                                bgcolor="black"
                                sx={{m:0}}
                            >
                                <Grid container justifyContent="space-between">
                                    <MDBTypography
                                        fontWeight = "regular"
                                        fontSize = "md"
                                        lineHeightSize = "2xl"
                                        pb={1.62}
                                    >
                                        Geographic Distribution
                                    </MDBTypography>
                                    <BasicSelect contents={countries} basicSelectCallback={countryOnchangeCallback} />
                                </Grid>
                                <DefaultDoughnutChart
                                    chart={doughnutChartData}
                                    width = "455px"
                                    height = "160px"
                                />
                            </MDBCard>
                        </Grid>
                    </Grid>
                </Grid>
            </MDBCard>
        </div>
    )
}
