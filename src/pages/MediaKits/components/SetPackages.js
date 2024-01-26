import React, { useEffect } from "react";
import { Divider, Grid, Modal } from "@mui/material";
import MDBButton from "components/MDBButton";
import MDBCard from "components/MDBCard";
import MDBTypography from "components/MDBTypography";
import Instagram from 'assets/images/icons/svg/large/Instagram3940.svg';
import Youtube from 'assets/images/icons/svg/large/YouTube4028.svg';
import Tiktok from 'assets/images/icons/svg/large/TikTok3539.svg';
import Lock from 'assets/images/icons/svg/medium/Lock.svg';
import LockGreen from 'assets/images/icons/svg/medium/LockGreen.svg';
import Connect from "appcomponents/Connect";
import ViewPrices from "../cards/ViewPrices";
import { useState } from "react";
import ProposalService from "service/ProposalService"
import { toast } from 'react-toastify'
import NumberFormatService from "service/NumberFormatService";
import toastIcon from 'assets/images/icons/svg/medium/ToastSuccess.svg'

export default function SetPackages(props) {
  const [open, setOpen] = React.useState(false);
  const [openViewPrices, setOpenViewPrices] = React.useState(false);
  const [isPricesView, setPricesView] = useState(false);

  useEffect(() => {
    // Check isViewPrices 
    if (props?.isPricesView !== undefined) {
      setPricesView(props.isPricesView)
    }
  }, [props.isPricesView])

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenViewPrices = () => setOpenViewPrices(true);
  const handleCloseViewPrices = () => setOpenViewPrices(false);

  //Slicing user name at first word
  const nameSlice = (name) => {
    let userName = name?.split(' ')[0]
    return userName;
  }

  const connectCallback = (payload) => {
    payload.receiverId = props?.userData.id;
    payload.content = payload.message;
    payload.senderName = payload.name;
    payload.senderEmail = payload.email;
    ProposalService.sendProposal(payload, connectApiCallback);
  }
  const connectApiCallback = (res) => {
    toast.success("Request connect sent successfully", {
      position: toast.POSITION.TOP_LEFT,
      hideProgressBar: true, icon: <img src={toastIcon} />
    });
    handleClose();
  }

  return (
    <div>
      <Grid container>
        <Grid item>
          <Grid sx={{ mb: 6.8 }}>
            <MDBTypography
              color="white"
              fontWeight="medium"
              fontSize="xl"
              lineHeightSize="2xxl"
              pb={2}
            >
              Rates
            </MDBTypography>
            <MDBCard sx={{ m: 0 }}>
              <MDBTypography
                color="white"
                fontWeight="regular"
                fontSize="md"
                lineHeightSize="2xl"
              >
                Min Per Post
              </MDBTypography>
              <Grid container>
                {isPricesView !== true &&
                  <MDBTypography
                    color="white"
                    fontWeight="regular"
                    fontSize="lg"
                    lineHeightSize="2xxl"
                    pr={0.125}
                  >
                    $
                  </MDBTypography>
                }
                <MDBTypography
                  color="white"
                  fontWeight="regular"
                  fontSize="lg"
                  lineHeightSize="2xxl"
                >
                  {isPricesView === true ? (
                    props?.minPostPrice !== undefined &&
                      props?.minPostPrice !== null ? (
                      NumberFormatService.convertPriceToUSDFormat(props?.minPostPrice)
                    ) : (
                      ""
                    )
                  ) : (
                    <MDBTypography component="img" src={Lock} pt={0.4} />
                  )}
                </MDBTypography>
              </Grid>
            </MDBCard>
          </Grid>

          <Grid>
            <MDBTypography
              color="white"
              fontWeight="regular"
              fontSize="md"
              lineHeightSize="2xl"
              textTransform="capitalize"
              pb={2}
              maxWidth="150px"
            >
              {nameSlice(props?.userInfo?.name)} Offers:
            </MDBTypography>
            {props?.offers?.map((offer, idx) => (
              <MDBCard
                key={idx}
                sx={{ p: 0, py: 1, px: 2, m: 0, mb: 1 }}
                borderRadius="md"
                bgcolor="lightestGreen"
                isBorder={false}
              >
                <MDBTypography
                  color="light_green"
                  fontWeight="medium"
                  fontSize="md"
                  lineHeightSize="2xl"
                >
                  {offer === "Paid Post" ? "Paid Posts" : offer}
                </MDBTypography>
              </MDBCard>
            ))}
          </Grid>
        </Grid>

        {/* Vertical Divider */}
        {(props?.packages?.length > 0) && (
          <Grid item px={5}>
            <Divider orientation="vertical" sx={{ height: "100%" }} />
          </Grid>
        )}

        <Grid item flexGrow={1} width="300px">
          <Grid container pb={2} pt={3} justifyContent="space-between">
            <Grid item pb={1}>
              <MDBTypography
                color="white"
                fontWeight="medium"
                fontSize="md"
                lineHeightSize="2xl"
              >
                {props?.isPreviewExternal ? "Packages" : "Set Packages"}
              </MDBTypography>
            </Grid>
            <Grid item>
              {isPricesView !== true && (
                <MDBButton
                  variant="outlined"
                  bgColor="white"
                  color=""
                  borderSize="md"
                  fontWeight="medium"
                  fontSize="md"
                  sx={{ px: 2, py: 0 }}
                  onClick={handleOpenViewPrices}
                >
                  Enter Password to View Prices
                </MDBButton>
              )}
            </Grid>
          </Grid>

          {/* Modal to open View Prices */}
          <Modal
            open={openViewPrices}
            onClose={handleCloseViewPrices}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ overflow: "scroll" }}
          >
            <ViewPrices
              mediaKitId={props?.mediaKitId}
              closeCallback={handleCloseViewPrices}
              viewPricesCallback={setPricesView}
            />
          </Modal>
          <Grid sx={{ maxHeight: "300px", overflowY: "scroll" }}>
            {props?.packages?.map((packageData, idx) => (
              <Grid>
                <Grid container justifyContent="space-between">
                  <Grid item pr={2} xs>
                    <Grid container justifyContent="space-between">
                      <Grid item xs pr={3}>
                        {/* Package and Description */}
                        <Grid container alignItems="center">
                          <MDBTypography
                            color="white"
                            fontWeight="regular"
                            fontSize="md"
                            lineHeightSize="2xl"
                            pr={2}
                          >
                            {packageData?.packageName}
                          </MDBTypography>
                          <Grid pt={0.7}>
                            {packageData?.platforms !== null &&
                              packageData?.platforms?.length > 0 && (
                                <Grid sx={{ display: "flex" }} >
                                  {packageData?.platforms.map((platform, idx) => (
                                    <Grid pr={1.5} key={idx}>
                                      {platform === "instagram" && (
                                        <Grid
                                          component="img"
                                          src={Instagram}
                                          width="18px"
                                          height="18px"
                                        />
                                      )}
                                      {platform === "tiktok" && (
                                        <Grid
                                          component="img"
                                          src={Tiktok}
                                          width="18px"
                                          height="18px"
                                        />
                                      )}
                                      {platform === "youtube" && (
                                        <Grid
                                          component="img"
                                          src={Youtube}
                                          width="18px"
                                          height="18px"
                                        />
                                      )}
                                    </Grid>
                                  ))}
                                </Grid>
                              )}
                          </Grid>
                          {isPricesView !== true &&
                            <MDBTypography
                              color="green"
                              fontWeight="regular"
                              fontSize="md"
                              lineHeightSize="2xl"
                            >
                              $
                            </MDBTypography>
                          }
                          <MDBTypography
                            color="green"
                            fontWeight="regular"
                            fontSize="md"
                            lineHeightSize="2xl"
                          >
                            {isPricesView === true ? (
                              (packageData?.price) ? (NumberFormatService.convertPriceToUSDFormat(packageData?.price)) : ""
                            ) : (
                              <MDBTypography component="img" src={LockGreen} />
                            )}
                          </MDBTypography>
                        </Grid>

                        <Grid pb={1.5}>
                          <MDBTypography
                            color="grayScale"
                            fontWeight="regular"
                            fontSize="sm"
                            lineHeightSize="xxl"
                          >
                            {packageData?.description}
                          </MDBTypography>
                        </Grid>
                      </Grid>

                      {/* platforms */}
                      {/* <Grid item alignSelf="center">
                      {packageData?.platforms !== null &&
                        packageData?.platforms?.length > 0 && (
                          <Grid sx={{ display: "flex" }} pb={1}>
                            {packageData?.platforms.map((platform, idx) => (
                              <MDBCard
                                bgcolor="cardBg"
                                isBorder={false}
                                borderRadius="xl"
                                sx={{
                                  p: 0,
                                  m: 0,
                                  mr: 0.8,
                                  // p: "14px",
                                  p: "12px",
                                  height: "48px",
                                }}
                                key={idx}
                              >
                                <Grid columnSpacing={1}>
                                  {platform === "instagram" && (
                                    <Grid
                                      component="img"
                                      src={Instagram}
                                      width="24px"
                                      height="24px"
                                    />
                                  )}
                                  {platform === "tiktok" && (
                                    <Grid
                                      component="img"
                                      src={Tiktok}
                                      width="24px"
                                      height="24px"
                                    />
                                  )}
                                  {platform === "youtube" && (
                                    <Grid
                                      component="img"
                                      src={Youtube}
                                      width="24px"
                                      height="24px"
                                    />
                                  )}
                                </Grid>
                              </MDBCard>
                            ))}
                          </Grid>
                        )}
                    </Grid> */}
                    </Grid>
                  </Grid>
                  <Grid item alignSelf="center" pr={1.5}>
                    {/* request button */}
                    <MDBButton
                      variant="contained"
                      bgColor="light_green"
                      color="black"
                      borderSize="md"
                      fontWeight="bold"
                      fontSize="md"
                      sx={{ px: 2 }}
                      onClick={handleOpen}
                    >
                      Request
                    </MDBButton>
                  </Grid>
                </Grid>
                {(idx < 0) ? "" : <Divider sx={{ my: 2 }} />}
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Contact Us Form Modal */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{ overflow: "scroll" }}
        >
          <Connect userId={props?.userInfo?.id} closeCallback={handleClose} connectCallback={connectCallback} isRates={true} />
        </Modal>
      </Grid>
    </div>
  );
}
