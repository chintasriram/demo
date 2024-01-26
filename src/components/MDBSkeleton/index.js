import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import MDBox from 'components/MDBox';
import MDBCard from 'components/MDBCard';

function SkeletonCard(props) {
  return (
    <Grid container wrap="nowrap" sx={{p:0, ml:8, mt:8, mr:"600px"}}>
      <MDBCard sx={{p:0, ml:8, mt:8}}>
        <Skeleton
          sx={{ bgcolor: 'rgba(255, 255, 255, 0.16)' }}
          variant="rectangular"
          width={394}
          height={232}
          animation="wave"
        />
        <MDBox sx={{ml:3,mt:2,mb:3}}>
          <Skeleton
            sx={{ bgcolor: 'rgba(255, 255, 255, 0.16)',px:3, py:1.6, mr :1,mb:1.5}}
            variant="rectangular"
            animation="wave"
            width={200} 
            height={30}
          />
          <MDBox sx={{display:"flex"}}>
            <Skeleton
              sx={{ bgcolor: 'rgba(255, 255, 255, 0.16)',px:3, py:1.6, mr :1,borderRadius:1}}
              variant="rectangular"
              animation="wave"
              width={60} 
              height={30}
            />
            <Skeleton
              sx={{ bgcolor: 'rgba(255, 255, 255, 0.16)',px:3, py:1.3,ml:1,borderRadius:1}}
              variant="rectangular"
              animation="wave"
              width={60} 
              height={30}
            />
          </MDBox>
        </MDBox>
      </MDBCard>
    </Grid>
  );
}

export default function MDBSkeleton() {
  return (
    <Box sx={{ overflow: 'hidden' }}>
      <SkeletonCard />
    </Box>
  );
}
