import React from 'react';
import MDBTypography from 'components/MDBTypography';
import MDBCard from 'components/MDBCard';
import { Grid } from '@mui/material';
import ProfileTabs from './ProfileTabs';

export default function Settings() {
  return (
    <Grid sx={{ width: "100%" }}>
      <Grid container justifyContent="center" alignContent="center" style={{ height: "100%" }}>
        <Grid item xs={1} sm={1.5} md={1.7} lg={2.5} xl={2.2} xxl={3} xel={3.5} xxel={4.5} el={4.5}></Grid>
        <Grid item xs={10} sm={9} md={8.6} lg={7} xl={7.6} xxl={6} xel={6} xxel={3} el={3}>
          <MDBCard
            sx={{ p: 0, m: 0 }}
            bgcolor="black"
            isBorder={false}
            
          >
            {/* Title : Settings */}
            <Grid>
              <MDBTypography
                color="white"
                fontWeight="medium"
                fontSize="4xl"
                lineHeightSize="5xl"
                my={4.5}
              >
                Profile
              </MDBTypography>
            </Grid>
            <ProfileTabs />
          </MDBCard>
        </Grid>
        <Grid item xs={1} sm={1.5} md={1.7} lg={2.5} xl={2.2} xxl={3} xel={2.5} xxel={4.5} el={4.5}></Grid>
      </Grid>
    </Grid>
  );
}
