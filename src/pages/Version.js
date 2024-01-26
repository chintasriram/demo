import { Divider, Grid, InputLabel } from "@mui/material";
import MDBCard from "components/MDBCard";
import MDBTypography from "components/MDBTypography";
import React from "react";
import BiaLayout from "layouts/biaLayout";
import config from "app.config";
import Stack from '@mui/material/Stack';

export default function Version() {
  return (
    <BiaLayout>
      <Grid
        container
        alignContent="center"
        justifyContent="center"
        style={{ height: "100%" }}
        position="relative"
        top="120px"
      >
        <Grid
          item
          xs={1}
          sm={1.5}
          md={2}
          lg={3}
          xl={3}
          xxl={4}
          xel={4}
          xxel={4.5}
          el={5}
        />
        <Grid
          item
          xs={10}
          sm={9}
          md={8}
          lg={6}
          xl={6}
          xxl={4}
          xel={3.5}
          xxel={3}
          el={2}
        >
          <MDBCard sx={{ p: 0, m: 0, mb: 2, width: "inherit" }}>
            <Grid px={5} pt={6}>
              <MDBTypography
                color="white"
                fontWeight="medium"
                fontSize="4xl"
                lineHeightSize="5xl"
              >
                Build version details
              </MDBTypography>
            </Grid>
            <Divider />
            <Grid px={5.5}></Grid>
            <Grid sx={{ pt: 1.5, pb: 4, px: 5 }}>
              <Grid mb={4}>
                
                <Stack direction="row" spacing={2} sx={{ mt: 1, mb: 1 }}>
                  <InputLabel >
                    <MDBTypography
                      fontWeight="regular"
                      fontSize="lg"
                      lineHeight="2xl"
                      color="light_green"
                    >
                      Build No: 
                    </MDBTypography>
                  </InputLabel>
                  <InputLabel >
                    <MDBTypography
                      fontWeight="bold"
                      fontSize="lg"
                      lineHeight="2xl"
                    >
                      {config.buildNo}
                    </MDBTypography>
                  </InputLabel>
                  </Stack>

                  <Stack direction="row" spacing={2} sx={{ mt: 1, mb: 1 }}>
                  <InputLabel >
                    <MDBTypography
                      fontWeight="regular"
                      fontSize="lg"
                      lineHeight="2xl"
                      color="light_green"
                    >
                      Build Date: 
                    </MDBTypography>
                  </InputLabel>
                  <InputLabel >
                    <MDBTypography
                      fontWeight="bold"
                      fontSize="lg"
                      lineHeight="2xl"
                    >
                      {config.buildDate}
                    </MDBTypography>
                  </InputLabel>
                  </Stack>



                  <Stack direction="row" spacing={2} sx={{ mt: 1, mb: 1 }}>
                  <InputLabel >
                    <MDBTypography
                      fontWeight="regular"
                      fontSize="lg"
                      lineHeight="2xl"
                      color="light_green"
                    >
                      Environment: 
                    </MDBTypography>
                  </InputLabel>
                  <InputLabel >
                    <MDBTypography
                      fontWeight="bold"
                      fontSize="lg"
                      lineHeight="2xl"
                    >
                      {config.environment}
                    </MDBTypography>
                  </InputLabel>
                  </Stack>


                  <Stack direction="row" spacing={2} sx={{ mt: 1, mb: 1 }}>
                  <InputLabel >
                    <MDBTypography
                      fontWeight="regular"
                      fontSize="lg"
                      lineHeight="2xl"
                      color="light_green"
                    >
                      Comments : 
                    </MDBTypography>
                  </InputLabel>
                  <InputLabel >
                    <MDBTypography
                      fontWeight="bold"
                      fontSize="lg"
                      lineHeight="2xl"
                    >
                      {config.comments}
                    </MDBTypography>
                  </InputLabel>
                  </Stack>


                  
                 
                  

               
              </Grid>
            </Grid>
          </MDBCard>
        </Grid>
        <Grid
          item
          xs={1}
          sm={1.5}
          md={2}
          lg={3}
          xl={3}
          xxl={4}
          xel={4}
          xxel={4.5}
          el={5}
        />
      </Grid>
    </BiaLayout>
  );
}
