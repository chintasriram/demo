import React from 'react'
import { Grid, Switch, Divider, Popover } from '@mui/material'
import MDBTypography from 'components/MDBTypography'
import MDBCard from './MDBCard'
import Help from 'assets/images/icons/svg/large/MiniSideNavHelp5656.svg'

export default function MiniSidenavBiaAssist() {
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
      <MDBCard isBorder={false} sx={{margin:"0 !important", padding:"0 !important"}} 
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <Divider sx={{mx:2,mt:4,mb:1,color:"#404344"}} />
        <Grid container justifyContent="center">
          <Grid item>
            <Switch disabled/>
          </Grid>
          <Grid alignSelf="center" item>
            <MDBTypography
              fontWeight = "regular"
              fontSize = "lg"
            >
              bia Assist
            </MDBTypography>
          </Grid>
          <Grid item mt={1}>
            <MDBTypography 
              component = "img"
              src={Help} 
              color = "light_green"
              width={56}
              height={56}
            />
          </Grid>
        </Grid>
      </MDBCard>

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
