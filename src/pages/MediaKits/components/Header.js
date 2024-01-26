import { Grid, IconButton, Modal, Popover } from "@mui/material";
import MDBButton from "components/MDBButton";
import MDBCard from "components/MDBCard";
import MDBTypography from "components/MDBTypography";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ResponsiveText from "appcomponents/ResponsiveText";
import BiaLogo from "assets/images/icons/svg/large/BiaLogoWithText8648.svg";
import EyeIcon from "assets/images/icons/svg/medium/EyeIcon.svg";
import ShareIcon from "assets/images/icons/svg/medium/ShareIcon.svg";
import SaveIcon from "@mui/icons-material/Save";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import EditIcon from "assets/images/icons/svg/medium/EditIcon.svg";
import RSSidenav from "./RSSidenav";
import CloseIcon from "assets/images/icons/svg/medium/Cross1414.svg";
import SharePopover from "pages/SharePopover";

export default function Header(props) {
  let history = useNavigate();

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  // Redirect to Preview mediakit
  const redirectToPreviewMediakit = (e) => {
    e?.preventDefault();
    if (
      props?.mediakit.id !== undefined &&
      props?.mediakit.id !== null &&
      props?.mediakit.id !== ""
    ) {
      history("/c/media-kit/preview", {
        state: { mediakitId: props.mediakit.id },
      });
    }
  };

  // Redirect to External Mediakit
  const redirectToExternalMediakit = (e) => {
    e?.preventDefault();
    if (
      props?.mediakit.id !== undefined &&
      props?.mediakit.id !== null &&
      props?.mediakit.id !== ""
    ) {
      history("/@" + props?.mediakit?.bioHandler, { state: { mediakitId: props?.mediakit?.id } });
    }
  };


  // Share Popover
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openShare = Boolean(anchorEl);
  const id = openShare ? 'simple-popover' : undefined;
  const handleShareClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseShare = () => {
    setAnchorEl(null);
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
            component={Link}
            to="/c/media-kit"
            fontWeight="medium"
            fontSize="md"
            lineHeightSize="2xl"
            color="grayScale"
            pb={0.5}

          >
            <SaveIcon color="white" sx={{ mr: 1 }} />
            Save Media Kit
          </MDBTypography>
        </MenuItem>
        <MenuItem>
          <MDBTypography
            fontWeight="medium"
            fontSize="md"
            lineHeightSize="2xl"
            color="grayScale"
            pb={0.5}
            onClick={(e) => redirectToPreviewMediakit(e)}

          >
            <MDBTypography component="img" src={EyeIcon} pr={1} />
            Preview Media Kit
          </MDBTypography>
        </MenuItem>
        <MenuItem>
          <MDBTypography
            fontWeight="medium"
            fontSize="md"
            lineHeightSize="2xl"
            color="grayScale"
            // onClick={(e) => redirectToExternalMediakit(e)}
            onClick={handleShareClick}
          >
            <MDBTypography component="img" src={ShareIcon} pr={1} />
            Share Media Kit
          </MDBTypography>
        </MenuItem>
      </MDBCard>
    </Popover>
  );



  return (
    <Grid container>
      <MDBCard
        borderRadius="0"
        bgcolor={props?.isPreview === true ? "transparent" : "cardBg"}
        isBorder={false}
        sx={{ m: 0, width: "100%", borderBottom: "1px solid rgba(255, 255, 255, 0.32)" }}
      >
        <Grid sx={{ py: 1, px: 3, display: "flex" }}>
          <Grid>
            <Grid component={Link} to="/c/home">
              <MDBTypography component="img" py={1} src={BiaLogo} />
            </Grid>
          </Grid>

          <Grid
            container
            alignItems="center"
            justifyContent="flex-end"
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            {props?.isPreview !== true && (
              <Grid container alignItems="center" justifyContent="flex-end">
                <Grid mr={2}>
                  <MDBButton
                    size="medium"
                    variant="outlined"
                    bgColor="grey400"
                    color=""
                    borderSize="md"
                    fontWeight="medium"
                    fontSize="md"
                    // onClick={(e) => redirectToExternalMediakit(e)}
                    onClick={handleShareClick}
                  >
                    <MDBTypography component="img" py={1} src={ShareIcon} />
                    <ResponsiveText text="Share Media Kit" pl={1} />
                  </MDBButton>
                </Grid>

                <Grid mr={2}>
                  <MDBButton
                    size="medium"
                    variant="outlined"
                    bgColor="grey400"
                    color=""
                    borderSize="md"
                    fontWeight="medium"
                    fontSize="md"
                    onClick={(e) => redirectToPreviewMediakit(e)}
                  >
                    <MDBTypography component="img" py={1} src={EyeIcon} />
                    <ResponsiveText text="Preview Media Kit" pl={1} />
                  </MDBButton>
                </Grid>

                <Grid>
                  <MDBButton
                    component={Link}
                    to="/c/media-kit"
                    size="medium"
                    variant="contained"
                    bgColor="light_green"
                    color="black"
                    borderSize="md"
                    fontWeight="bold"
                    fontSize="md"
                  >
                    Finish
                  </MDBButton>
                </Grid>
              </Grid>
            )}

            {props?.isPreview === true && (
              <MDBButton
                size="medium"
                variant="contained"
                bgColor="white"
                color="black"
                borderSize="md"
                fontWeight="bold"
                fontSize="md"
                sx={{ px: 2.5, my: 0.5 }}
                onClick={(e) => history(-1)}
              >
                <MDBTypography
                  component="img"
                  src={CloseIcon}
                  style={{ filter: "brightness(0)" }}
                  pr={1}
                />
                Close
              </MDBButton>
            )}
          </Grid>

          {props?.isPreview !== true && (
            <Grid
              container
              sx={{ display: { xs: "flex", md: "none" } }}
              justifyContent="flex-end"
            >
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
          )}

          {props?.isPreview !== true && (
            <Grid
              sx={{ display: { xs: "flex", md: "flex", lg: "flex", xl: "none" } }}
              justifyContent="flex-end"
            >
              <IconButton
                size="large"
                aria-label="show more"
                onClick={handleOpen}
                color="inherit"
              >
                <MDBButton
                  variant="contained"
                  bgColor="light_green"
                  color="black"
                  borderSize="md"
                  fontWeight="bold"
                  fontSize="md"
                  iconOnly={true}
                >
                  <MDBTypography
                    component="img"
                    src={EditIcon}
                    sx={{ width: "16px", height: "16px" }}
                  />
                </MDBButton>
              </IconButton>
            </Grid>
          )}
        </Grid>
        {renderMobileMenu}
      </MDBCard>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ overflow: "scroll" }}
      >
        <Grid sx={{ width: "300px", position: "fixed", right: 0 }}>
          <RSSidenav
            mediakit={props?.mediakit}
            refreshCallback={props?.refreshCallback}
            youtubeScrollRef={props?.youtubeScrollRef}
            instaScrollRef={props?.instaScrollRef}
            tiktokScrollRef={props?.tiktokScrollRef}
            sponsoredScrollRef={props?.sponsoredScrollRef}
            isMobile={true}
          />
        </Grid>
      </Modal>
      
      {/* Share mediakit modal */}
      <Modal
        id={id}
        open={openShare}
        onClose={handleCloseShare}
      >
        <SharePopover onCloseCallback={handleCloseShare} bioHandler={props?.mediakit?.bioHandler}/>
      </Modal>
    </Grid>
  );
}
