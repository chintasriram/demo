import React from 'react'
import { Grid, Popover, Switch } from '@mui/material'
import MDBButton from 'components/MDBButton'
import MDBTypography from 'components/MDBTypography'
import MDBCard from './MDBCard'
import HelpIcon from "assets/images/icons/svg/medium/HelpIcon.svg"
import MDBox from './MDBox'

export default function BiaAssist() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  return (
    <Grid>
      <MDBox display={{ xs: "block", sm: "block", md: "block", lg: "block", xl: "none", xxl: "none", xel: "none" }}>
        <Grid sx={{ position: "relative" }}>
          <MDBCard sx={{ m: 0, p: 0, m: 2, p: 2, opacity: 0.6 }} bgcolor="biaAssist" isBorder={false}
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            <Grid container pb={0.5}>
              <Grid item pr={1}>
                <Switch disabled/>
              </Grid>
              <Grid item alignSelf="center">
                <MDBTypography
                  fontWeight="regular"
                  fontSize="lg"
                  lineHeightSize="xxl"
                >
                  bia Assist
                </MDBTypography>
              </Grid>
            </Grid>
            <Grid pb={2}>
              <MDBTypography
                color="blackScale"
                fontWeight="regular"
                fontSize="sm"
                lineHeightSize="xl"
              >
                Get help on bia features.
              </MDBTypography>
            </Grid>
            <Grid container>
              <MDBButton
                size="medium"
                variant="contained"
                color="light_green"
                bgColor="supaLight"
                fontWeight="bold"
                fontSize="md"
                borderSize="md"
                sx={{ px: 6, py: 1.5 }}
                disabled
              >
                <MDBTypography
                  component="img"
                  src={HelpIcon}
                  color="light_green"
                  pr={1} pb={0.2}
                />
                Get Help
              </MDBButton>
            </Grid>
          </MDBCard>
          <Grid container sx={{ position: "absolute", top: 0, left: "45%" }}>
            <MDBCard
              sx={{ m: 2, p: 1, zIndex: 10 , display : "none"}} isBorder={false} bgcolor="white"
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
            >
              <MDBTypography
                color="black"
                fontWeight="medium"
                fontSize="xs"
                lineHeightSize="md"
              >
                Coming Soon
              </MDBTypography>
            </MDBCard>
          </Grid>
        </Grid>
      </MDBox>

      {/* For large screen */}
      <MDBox display={{ xs: "none", sm: "none", md: "none", lg: "none", xl: "block", xxl: "block", xel: "block" }}>
        <Grid sx={{ position: "relative" }}>
          <MDBCard sx={{ m: 0, p: 0, m: 1, p: 2, mt: 8, opacity: 0.65 }} bgcolor="biaAssist" isBorder={false}
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            <Grid container pb={0.5}>
              <Grid item pr={1}>
                <Switch disabled />
              </Grid>
              <Grid item alignSelf="center">
                <MDBTypography
                  fontWeight="regular"
                  fontSize="lg"
                  lineHeightSize="xxl"
                >
                  bia Assist
                </MDBTypography>
              </Grid>
            </Grid>

            <Grid pb={2} >
              <MDBTypography
                color="blackScale"
                fontWeight="regular"
                fontSize="sm"
                lineHeightSize="xl"
              >
                Get help on bia features.
              </MDBTypography>

            </Grid>
            <Grid container >
              <MDBButton
                size="medium"
                variant="contained"
                color="light_green"
                bgColor="supaLight"
                fontWeight="bold"
                fontSize="md"
                borderSize="md"
                disabled
                sx={{ px: 9, py: 1.5 }}
              >
                <MDBTypography
                  component="img"
                  src={HelpIcon}
                  color="light_green"
                  pr={1} pb={0.2}
                />
                Get Help
              </MDBButton>
            </Grid>
          </MDBCard>
          <Grid container sx={{ position: "absolute", top: 0, left: "52%" }}>
            <MDBCard
              sx={{ m: 2.2, p: 1, zIndex: 10 }} isBorder={false} bgcolor="white"
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
            >
              <MDBTypography
                color="black"
                fontWeight="medium"
                fontSize="xs"
                lineHeightSize="md"
              >
                Coming Soon
              </MDBTypography>
            </MDBCard>
          </Grid>
        </Grid>
      </MDBox>

      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        {/* Popover card with message */}
        <MDBCard
          borderRadius="xl"
          bgcolor="black"
          shadow="0px 4px 24px rgba(0, 0, 0, 0.48)"
          sx={{ m: 0, p: 2, border: "1px solid #3B3D40" }}
        >
          <MDBTypography
            color="white"
            fontWeight="regular"
            fontSize="md"
            lineHeightSize="2xl"
          >
            Feature coming soon!
          </MDBTypography>
          <MDBTypography
            color="grayScale"
            fontWeight="regular"
            fontSize="sm"
            lineHeightSize="xxl"
            maxWidth="209px"
          >
            We will update you when this feature is released
          </MDBTypography>
        </MDBCard>
      </Popover>
    </Grid>
  )
}
