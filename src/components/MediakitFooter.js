import MDBTypography from 'components/MDBTypography'
import React from 'react'
import { Grid } from '@mui/material'
import { Divider } from "@mui/material";
import IconBia from 'assets/images/icons/svg/large/BiaLogoWithText8648.svg'
import MDBButton from './MDBButton';
import { Link } from 'react-router-dom';

export default function MediakitFooter(props) {
  return (
    <div>
      <Divider sx={{ m: 0, p: 0 }} />

      <Grid display="flex">
        <Grid container pt={5}>
          <Grid item>
            <MDBTypography component="img" src={IconBia} height="32px" width="58px" sx={{ cursor: "pointer"}} />
          </Grid>
          <Grid py={0.7} pl={4.25} pr={3.375}>
            <MDBTypography
              color="grayScale"
              fontWeight="regular"
              fontSize="sm"
              lineHeightSize="2xxl"
            >
              2022 bia
            </MDBTypography>
          </Grid>
          <Grid py={0.7}>
            <MDBTypography
              color="grayScale"
              fontWeight="regular"
              fontSize="sm"
              lineHeightSize="2xxl"
            >
              All Rights Reserved
            </MDBTypography>
          </Grid>
        </Grid>

        <Grid container py={4} justifyContent="flex-end">
          <Grid pr={2.5}>
            <MDBButton
              component={Link}
              to="/privacy"
              variant="text"
              color="grayScale"
              fontWeight="regular"
              fontSize="sm"
              lineHeightSize="2xxl"
            >
              Privacy Policy
            </MDBButton>
          </Grid>
          <Grid pl={2.5}>
            <MDBButton
              component={Link}
              to="/terms"
              variant="text"
              color="grayScale"
              fontWeight="regular"
              fontSize="sm"
              lineHeightSize="2xxl"
            >
              Terms of Use
            </MDBButton>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}