import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MDBButton from "components/MDBButton";
import MDBCard from "components/MDBCard";
import MDBox from "components/MDBox";
import MDBTypography from "components/MDBTypography";
import React, { useState } from "react";
import { Grid } from "@mui/material";

export default function CalenderRow(props) {
    const ITEM_HEIGHT = 20;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
 return(
    <MDBox sx={{ px: 5, pr: 1 }}>
    <MDBTypography
      color="white"
      fontWeight="medium"
      fontSize="md"
      lineHeightSize="2xl"
      pb={0.5}
    >
      Calenders
    </MDBTypography>
    
    {/* Need to make component for calender block */}
    {/* <CalenderRow imgSrc="" isConnted=true connectCallback={} editCallback={} removeCallback={} /> */}
    <MDBCard borderRadius="xl" bgcolor="cardBg" sx={{ width: "450px" }}>
      <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
        <img src={props.imgGoogleSrc} />
        <MDBTypography
          component={Link}
          to="/SyncGoogleCalender"
          color="secondary"
          fontWeight="medium"
          fontSize="md"
          lineHeightSize="2xl"
          pb={0.5}
          onClick={props.handleConnect}
        >
          Connect
        </MDBTypography>
      </Grid>
    </MDBCard>
    <MDBCard borderRadius="xl" bgcolor="cardBg" sx={{ width: "450px" }}>
      <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
        <MDBox mt={1}>
          <img src={props.imageOutlookSrc} />
        </MDBox>
        <Grid>

        {/* <MDBTypography
          component={Link}
          to="/SyncGoogleCalender"
          color="secondary"
          fontWeight="medium"
          fontSize="md"
          lineHeightSize="2xl"
          pb={0.5}
          onClick={handleConnect}
        >
          Connect
        </MDBTypography> */}
          <MDBButton
            size="small"
            variant="contained"
            color="light_green"
            bgColor="supaLight"
            fontWeight="regular"
            fontSize="md"
            borderSize="md"
          >
            <MDBTypography component="img" src={props.imgVectorSrc} pr={1} />
            Connected
          </MDBButton>

          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            color="white"
            onClick={props.handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            mt={4}
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            onClose={props.handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "20ch",
                color: "#FFFFFF",
              },
            }}
          >
          <MenuItem onClick={props.handleEdit}>Edit</MenuItem>
          <MenuItem onClick={props.handleDisconnect}>Disconnect</MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </MDBCard>
  </MDBox>
 )
}




