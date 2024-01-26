import {
  Grid,
  InputAdornment,
  MenuItem,
  Popover,
  Toolbar,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import MDBox from "components/MDBox";
import CommunicationIcon from "assets/images/icons/svg/medium/CommunicationIcon.svg";
import NotificationIcon from "assets/images/icons/svg/medium/NotificationIcon.svg";
import SearchIcon from "assets/images/icons/svg/medium/SearchIcon.svg";
import MDBTypography from "components/MDBTypography";
import MDBInput from "components/MDBInput";
import MDAvatar from "./MDAvatar";
import MDBadge from "./MDBadge";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import httpService from "service/HttpService";
import ProposalService from "service/ProposalService";
import NotificationService from "service/NotificationService";
import { useMaterialUIController, setMiniSidenav } from "context";
import ProfileModel from "appcomponents/ProfileModel";
import NotificationModel from "appcomponents/NotificationModel";
import MessagePopup from "appcomponents/MessagePopup";
import MDBCard from "./MDBCard";
import { Box } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";

export default function SearchBar(props) {
  const settingsRef = useRef(null);
  const history = useNavigate();

  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav } = controller;

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);

  // state management for message icon button
  const [open, setOpen] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [proposals, setProposals] = useState([]);
  const [proposalCount, setProposalCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [openProfile, setOpenProfile] = useState(false);
  const [user, setUser] = useState(JSON.parse(window.localStorage.getItem("user")));

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleOpen = (e) => { };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    ProposalService.getUnreadProposalCount(setProposalCount);
    NotificationService.getUnreadNotificationsCount(setNotificationCount);
  }, []);

  // state management for profile icon button
  const handleProfileMenu = (e) => setOpenProfile(true);
  const handleProfileClose = () => setOpenProfile(false);

  // state management for Notification icon button
  const handleNotificationMenu = (e) => {
    //setOpenNotification(true);
    NotificationService.getUnreadNotifications(getNotificationsCallback);
    NotificationService.updateReadStatus(setNotificationCount);
  };
  const handleNotificationClose = () => setOpenNotification(false);

  const onMessageIconClick = (e) => {
    handleOpen(e);
    ProposalService.getUnreadProposals(getProposalsCallback);
    ProposalService.updateReadStatus(setProposalCount);
  };

  const getProposalsCallback = (res) => {
    if (res) {
      setProposals(res);
      setOpen(true);
    }
  };
  const getNotificationsCallback = (res) => {
    if (res) {
      setNotifications(res);
      setOpenNotification(true);
    }
  };
  // const handleMasssageRowClick = () => {
  //   ProposalService.updateReadStatus(setProposalCount);
  //   handleClose();
  // }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = (event) => {
    window.localStorage.removeItem('user');
    history('/login');
  }

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Popover
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MDBCard
        bgcolor="black"
        isBorder={false}
        borderRadius="lg"
        sx={{ m: 0, p: 0, px: 1, py: 2 }}
      >
        <MenuItem>
          <MDBTypography
            fontWeight="medium"
            fontSize="md"
            lineHeightSize="2xl"
            color="grayScale"
            component={Link}
            to="/c/settings"
            state={{ tabIdx: 0 }}
            pb={0.5}
          >
            Profile
          </MDBTypography>
        </MenuItem>
        <MenuItem>
          <MDBadge
            color="error"
            variant="gradient"
            size="sm"
            container={true}
            indicator={true}
            badgeContent={proposalCount}
            circular={true}
            onClick={onMessageIconClick}
          >
            <MDBTypography
              fontWeight="medium"
              fontSize="md"
              lineHeightSize="2xl"
              color="grayScale"
              pb={0.5} pr={1}
              component={Link}
              to="/c/proposals"
            >
              Messages
            </MDBTypography>
          </MDBadge>
        </MenuItem>
        <MenuItem
          component={Link}
          to="/c/notifications"
        >
          <MDBadge
            color="error"
            variant="gradient"
            size="sm"
            container={true}
            indicator={true}
            badgeContent={notificationCount}
            circular={true}
          >
            <MDBTypography
              fontWeight="medium"
              fontSize="md"
              lineHeightSize="2xl"
              color="grayScale"
              pb={0.5} pr={1}
            >
              Notification
            </MDBTypography>
          </MDBadge>
        </MenuItem>
        <MenuItem
          component={Link}
          to="/c/notifications"
        >
          <MDBTypography
            fontWeight="medium"
            fontSize="md"
            lineHeightSize="2xl"
            color="grayScale"
            pb={0.5} pr={1}
            onClick={handleLogout}
          >
            Log Out
          </MDBTypography>
        </MenuItem>
      </MDBCard>
    </Popover>
  );

  return (
    <Grid
      sx={{
        py: "22px",
        pl: "35px",
        pr: "25px",
        borderBottom: "2px solid #1C1F21", ml: -3
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          minHeight: 64,
          left: 0,
          px: 2,
        }}
      >
        {/* Menu Icon */}
        <IconButton
          size="large"
          disableRipple
          color="inherit"
          // sx={navbarMobileMenu}
          onClick={handleMiniSidenav}
          sx={{
            display: {
              xs: "inline-flex",
              xl: "none",
            },
          }}
        >
          <MenuIcon sx={{ color: "#fff" }} />
        </IconButton>

        {/* Search bar */}
        <Grid sx= {{display : "none"}}>
          <MDBInput
            search={true}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {/* <SvgIcon
                  fontSize="large"
                >
                  <Search />
                </SvgIcon> */}
                  <MDBTypography component="img" src={SearchIcon} />
                </InputAdornment>
              ),
            }}
            placeholder="Search Brands"
            variant="outlined"
            width="400px"
          />
        </Grid>
        <MDBox sx={{ flexGrow: 1 }} />

        {/* Message Icon */}
        <MDBox sx={{ display: { xs: "none", md: "flex" } }}>
          <Grid alignSelf="center">
          <Tooltip title="Messages">
            <IconButton >
              <MDBadge
                color="error"
                variant="gradient"
                size="sm"
                container={false}
                indicator={true}
                badgeContent={proposalCount}
                onClick={onMessageIconClick}
              >
                <MDBTypography component="img" src={CommunicationIcon} sx={{"&:hover": {filter: "brightness(2)"}}}/>
              </MDBadge>
            </IconButton>
          </Tooltip>
          </Grid>

          {/* Bell Notification Icon */}
          <Grid ml={3} alignSelf="center">
            <Tooltip title="Notifications">
              <IconButton>
                <MDBadge
                  color="error"
                  variant="gradient"
                  size="sm"
                  container={false}
                  indicator={true}
                  badgeContent={notificationCount}
                  onClick={handleNotificationMenu}
                >
                  <MDBTypography component="img" src={NotificationIcon} sx={{"&:hover": {filter: "brightness(2)"}}}/>
                </MDBadge>
              </IconButton>
            </Tooltip>
          </Grid>

          {/* Profile Image*/}
          <MDAvatar
            ref={settingsRef}
            sx={{
              cursor: "pointer",
              height: 48,
              width: 48,
              ml: 4.5,
            }}
            src={httpService.getMediaBaseUrl(user.profileImg)}
            alt="profile"
            onClick={handleProfileMenu}
          />
        </MDBox>

        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MDAvatar
              ref={settingsRef}
              sx={{
                cursor: "pointer",
                height: 48,
                width: 48,
                ml: 4.5,
              }}
              src={httpService.getMediaBaseUrl(user.profileImg)}
              alt="profile"
            />
          </IconButton>
        </Box>
      </Toolbar>
      {renderMobileMenu}

      {/* modal for message icon button */}
      <Popover
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MessagePopup proposals={proposals} closeCallback={handleClose}  />
      </Popover>

      {/* modal for profile icon button */}
      <Popover
        open={openProfile}
        onClose={handleProfileClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <ProfileModel closeCallback={handleProfileClose} />
      </Popover>

      {/* modal for notification */}
      <Popover
        open={openNotification}
        onClose={handleNotificationClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <NotificationModel notifications={notifications} closeCallback={handleNotificationClose} />
      </Popover>
    </Grid>
  );
}
