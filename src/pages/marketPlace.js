// import * as React from "react";
import React, { useEffect, useState, useCallback } from "react";
import { Divider, Grid, Modal } from "@mui/material";
import MDBCard from "components/MDBCard";
import MDBTypography from 'components/MDBTypography';
import { useWidth } from "components/Hooks/UseWidth";
import { InfluencerItem } from 'components/InfluencerItem';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Switch from '@mui/material/Switch';
import Slider from '@mui/material/Slider';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import httpService from "service/HttpService"
import InfluencerDetails from './Marketplace/InfluencerDetails';

function valuetext(value) {
  return `$${value}`;
}

export default function MarketPlace() {
  const screenSize = useWidth()[0]

  const [data, setData] = React.useState([])
  const [latestData, setLatestData] = useState([])
  const [openDetailsPopup, setOpenDetailsPopup] = React.useState(false)
  const [selectedDetailsInfo, setSelectedDetailsInfo] = useState([]) 
  console.log("selectedDetailsInfo=",selectedDetailsInfo)

  const PRODUCTS =  [
        {
            "uuId": "5318f03c-7d2f-4693-97a5-516b7fe4afdf",
            "id": 2440,
            "clientId": 820,
            "userId": 45,
            "mediakitId": 123,
            "platform": "Youtube",
            "requirements": null,
            "status": null,
            "imageUrl": null,
            "brandName": null,
            "description": "Description fina",
            "audienceGender": "Male",
            "applicationDeadline": "2023-07-12",
            "avgPrice": "1000",
            "campaignDeadline": "2023-07-14",
            "geography": "Asia",
            "price": "2200",
            "projectType": "Event Appearance",
            "title": "My Second Title",
            "totalReach": "19"
        },
        {
            "uuId": "f8a206e4-8b94-44df-a035-5266c26d7259",
            "id": 2144,
            "clientId": 820,
            "userId": 45,
            "mediakitId": 2143,
            "platform": "Tiktok",
            "requirements": null,
            "status": null,
            "imageUrl": null,
            "brandName": "Test",
            "description": "Description Second",
            "audienceGender": "Female",
            "applicationDeadline": "2023-08-12",
            "avgPrice": "2000",
            "campaignDeadline": "2023-08-14",
            "geography": "USA",
            "price": "1200",
            "projectType": "Gifting",
            "title": "My latest title",
            "totalReach": "20"
        },
        {
            "uuId": "f8a206e4-8b94-44df-a035-5266c26d7260",
            "id": 2145,
            "clientId": 820,
            "userId": 45,
            "mediakitId": 123,
            "platform": "Instagram",
            "requirements": null,
            "status": null,
            "imageUrl": null,
            "brandName": "test1",
            "description": "Description latest",
            "audienceGender": "Male",
            "applicationDeadline": "2023-09-12",
            "avgPrice": "1000",
            "campaignDeadline": "2023-09-14",
            "geography": "Latin America",
            "price": "1200",
            "projectType": "Paid Post",
            "title": "My final title",
            "totalReach": "20"
        },
        {
            "uuId": "14287356-2c6b-4e21-98bb-11949c8d5df6",
            "id": 2453,
            "clientId": null,
            "userId": 45,
            "mediakitId": null,
            "platform": null,
            "requirements": null,
            "status": null,
            "imageUrl": null,
            "brandName": null,
            "description": "2",
            "audienceGender": null,
            "applicationDeadline": null,
            "avgPrice": null,
            "campaignDeadline": null,
            "geography": null,
            "price": null,
            "projectType": null,
            "title": null,
            "totalReach": null
        },
        {
            "uuId": "3e22e9e6-f511-47f0-8d76-ceeb09508e8e",
            "id": 2454,
            "clientId": null,
            "userId": 45,
            "mediakitId": null,
            "platform": "Tiktok",
            "requirements": null,
            "status": null,
            "imageUrl": null,
            "brandName": null,
            "description": "3",
            "audienceGender": "Male",
            "applicationDeadline": "2023-09-17",
            "avgPrice": "5",
            "campaignDeadline": "2023-09-20",
            "geography": "Asia",
            "price": "4",
            "projectType": "Paid Deal",
            "title": "2",
            "totalReach": "30"
        }
    ]


  const handleFilterChange = (event) => {
      let filters = new Set()
      let marketData = data;

      if(event.target.value === "All"){
        marketData = data;
      }
      
      if (event.target.checked) {
        filters.add(event.target.value)
      } else {
        marketData = latestData
        filters.delete(event.target.value)
      }
      if (filters.size) {
        if((event.target.value === "Instagram") || (event.target.value === "Tiktok") || (event.target.value === "Youtube")){
          marketData = marketData.filter(product => {
            return filters.has(product.platform)
          })
        }
      }
      // setData(marketData);
      if (filters.size) {
        if((event.target.value === "Paid Post") || (event.target.value === "Gifting") || (event.target.value === "Event Appearance")){
          marketData = marketData.filter(product => {
            return filters.has(product.projectType)
        })
      }
      }


      setData(marketData);
      
      return {
        filters,
        marketData,
      }
  }

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  const getCampaigns = () => {
    httpService
    .getAllCampaigns()
    .then((res) => {
      setData(res.data.data);
      setLatestData(res.data.data)
    });
  }

  console.log("43_data111=",latestData)
  console.log("43_PRODUCTS=",PRODUCTS)

  useEffect(() => {
    getCampaigns();
  }, []); 

  const handleInfluencerClick = (item) => {
    console.log("iteeeee=",item)
    setSelectedDetailsInfo(item);
    setOpenDetailsPopup(true)
  }

  const handleClosePopup = () => {
    setOpenDetailsPopup(false)
  }

  return (
    <Grid pt={5} pl={5.25} pr={5} pb={5}>
      <Grid container>
        <Grid item pr={{ sm: 0, xs: 0, md: 0, lg: 2, xl: 2, xxl: 2, el: 2 }} xs={12} sm={12} md={12} lg={8.8} xxl={9} el={10.55}>
          <Grid container mb={3}>
            <Grid item >
              <Stack direction="row" spacing={1}>
                <Chip
                  label="Clickable Deletable"
                  onClick={handleClick}
                  onDelete={handleDelete}
                />
                <Chip
                  label="Clickable Deletable"
                  onClick={handleClick}
                  onDelete={handleDelete}
                />
                <Chip
                  label="Clear All"
                  clickable
                />
              </Stack>
            </Grid>
          </Grid>
          {
            data.length > 0 ?
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                  {data.map((item, index) => (
                    <Grid item xs={2} sm={3} md={3} key={index}>
                      {/* <Item> */}
                      <InfluencerItem
                        className="influencer-item-instance"
                        property1="default"
                        socialPropertyInstaClassName="design-component-instance-node"
                        selectedItem = {item}
                        onOpenCallback={() => handleInfluencerClick(item)}
                      />
                      {/* </Item> */}
                    </Grid>
                  ))}
                </Grid>
              </Box>
              :
              <Grid container justifyContent={'center'} alignContent={'center'} alignItems={'center'} textAlign={'center'} mt={5}>
                <Grid item>
                  <MDBTypography>We're Sorry -</MDBTypography>
                  <MDBTypography>The filters you selected did not return any results.</MDBTypography>
                  <Chip
                    label="Clear All"
                    clickable
                  />
                </Grid>
              </Grid>
          }

        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={3.2} el={1.4} xxl={3}>
          <Grid container>
            <Grid pb={2} xs={12} sm={12} md={12} lg={12} xxl={12} el={12}>
              <Grid>
                <MDBCard
                  bgcolor="supaLight"
                  sx={{ m: 0, px: screenSize === "xl" ? 2 : 3, pt: 3, pb: 5, width: "inherit" }}
                >
                  <Grid container>
                    {/* Your Focus Title */}
                    <MDBTypography
                      color="light_green"
                      fontWeight="medium"
                      fontSize="xl"
                      lineHeightSize="2xxl"
                    // pb={1}
                    >
                      Brand Search
                    </MDBTypography>
                  </Grid>
                  <Divider />
                  <Grid>
                    <FormGroup>
                      <FormControlLabel control={<Switch />} label="Open Campaigns" />
                    </FormGroup>
                  </Grid>
                  <Grid mt={2}>
                    <MDBTypography>Platform</MDBTypography>
                    <FormGroup onClick={handleFilterChange}>
                      <FormControlLabel control={<Checkbox />} value="All" label="All" />
                      <FormControlLabel control={<Checkbox />} value="Instagram" label="Instagram" />
                      <FormControlLabel control={<Checkbox />} value="Tiktok" label="Tiktok" />
                      <FormControlLabel control={<Checkbox />} value="Youtube" label="Youtube" />
                    </FormGroup>
                  </Grid>
                  {/* <Grid mt={2}>
                    <MDBTypography>Sponsorship Type</MDBTypography>
                    <FormGroup onClick={handleFilterChange}>
                      <FormControlLabel control={<Checkbox />} value="Paid Post" label="Paid Post" />
                      <FormControlLabel control={<Checkbox />} value="Gifting" label="Gifting" />
                      <FormControlLabel control={<Checkbox />} value="Event Appearance" label="Event Appearance" />
                    </FormGroup>
                  </Grid> */}
                  <Grid mt={2}>
                    <MDBTypography>Target Post Min</MDBTypography>
                    <Slider
                      track={false}
                      aria-labelledby="track-false-slider"
                      getAriaValueText={valuetext}
                    // defaultValue={30}
                    // marks={marks}
                    />
                  </Grid>
                </MDBCard>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Modal
        open={openDetailsPopup}
        onClose={handleClosePopup}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <InfluencerDetails onCloseCallback={handleClosePopup} selectedDetailsInfo={selectedDetailsInfo}/>
      </Modal>
    </Grid>
  );
}
