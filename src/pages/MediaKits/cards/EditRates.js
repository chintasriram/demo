import React, { useEffect, useState, useRef } from "react";
import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  Modal,
  FormLabel,
  Radio,
  RadioGroup
} from "@mui/material";
import MDBButton from "components/MDBButton";
import MDBCard from "components/MDBCard";
import MDBInput from "components/MDBInput";
import MDBox from "components/MDBox";
import MDBTypography from "components/MDBTypography";
import Instagram from "assets/images/icons/svg/large/Instagram3030.svg";
import Youtube from "assets/images/icons/svg/large/YouTube4028.svg";
import TikTok from "assets/images/icons/svg/large/TikTok3539.svg";
import Delete from "assets/images/icons/svg/medium/DeleteIcon1818.svg";
import Dollar from "assets/images/icons/svg/medium/DollarIcon.svg";
import Add from "assets/images/icons/svg/medium/AddIcon.svg";
import EditIcon from "assets/images/icons/svg/medium/EditIcon1818.svg";
import MDAvatar from "components/MDAvatar";
import AddGiftingAddress from "./AddGiftingAddress";
import AddSetPackage from "./AddSetPackage";
import { useLocation } from "react-router-dom";
import httpService from "service/HttpService";
import DeletePopup from "./DeletePopup";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";
import { useWidth } from "components/Hooks/UseWidth";
import { Tooltip } from "@material-ui/core";
import UserService from "service/UserService";
import NumberFormatService from "service/NumberFormatService";
import toastIcon from 'assets/images/icons/svg/medium/ToastSuccess.svg'

const validationSchema = yup.object({
  price: yup
    .number()
    .required("Minimum rate is required")
    .min(1, "Minimum rate must be greater than 0"),
});

export default function Rates(props) {
  //Configure the Toast
  toast.configure();
  const { state } = useLocation();
  const breakpoint = useWidth()[0];

  const [open, setOpen] = React.useState(false);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const [giftingDeletePopupOpen, setGiftingDeletePopupClose] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [giftingAddEditModalOpen, setGiftingAddEditModalOpen] = useState(false);
  const [openAddAddress, setOpenAddAddress] = React.useState(false);
  const [mediakitId, setMediakitId] = useState("");
  const [packages, setPackages] = useState([]);
  const [giftingsAddress, setGiftingsAddress] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const [campaignTypes, setCampaignTypes] = useState([]);
  const [selectedCampaignTypes, setSelectedCampaignTypes] = useState([]);
  const [ctData, setCtData] = useState({});
  const [isFormSubmit, setIsFormSubmit] = useState(false);
  const [ratesVisibility, setRatesVisibility] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const pwdRef = useRef(null);

  useEffect(() => {
    setIsFormSubmit(false)
    setRatesVisibility("")
    if (props.data !== undefined && props.data !== null) {
      setMediakitId(props.data?.id);
      //Set default campaign types
      setDefaultCampainTypes(props?.data?.rates?.campaignTypes);
    }

    // Get campaigntypes
    getCampaignTypes();

    // Get All rates campaigns integration
    getRatesPackages();

    //Get All gifting address integration
    getRatesGiftingAddress();
  }, []);

  useEffect(() => {
    let rVisibility = (props.data.rates?.viewRates === false) ? "private" : "public"
    setRatesVisibility(rVisibility)
  }, [props.data?.rates?.viewRates])

  //Set default campaign types
  const setDefaultCampainTypes = (cts) => {
    if (cts?.length > 0) {
      let defaultcts = {};
      cts?.map((ct, idx) => {
        defaultcts[ct] = true;
      });
      setCtData(defaultcts);
    }
  };

  // Get campaign types
  function getCampaignTypes() {
    httpService.getCampaignTypes().then((res) => {
      if (
        res !== undefined &&
        res?.data?.success !== undefined &&
        res?.data?.success === true
      ) {
        setCampaignTypes(res.data.data);
      }
    });
  }

  const handleOpen = () => setOpen(true);
  const handleClose = (isRefreshPackages) => {
    setOpen(false);
    if (isRefreshPackages === true) {
      // Get Packages
      getRatesPackages();
    }
  };

  const handleDeletePopupOpen = (rowId) => {
    if (rowId !== undefined && rowId !== 0) {
      setSelectedRowId(rowId);
      setDeletePopupOpen(true);
    } else {
      setSelectedRowId(0);
    }
  };

  const handleDeletePopupClose = () => setDeletePopupOpen(false);

  const handleGiftingDeletePopupOpen = (rowId) => {
    if (rowId !== undefined && rowId !== 0) {
      setSelectedRowId(rowId);
      setGiftingDeletePopupClose(true);
    } else {
      setSelectedRowId(0);
    }
  };

  const handleGiftingDeletePopupClose = () => setGiftingDeletePopupClose(false);

  // Edit Modal close and open for add package
  const editModalOpenHandle = (row) => {
    if (row !== undefined) {
      setSelectedRow(row);
      setEditModalOpen(true);
    }
  };

  const editModalCloseHandle = (isRefreshPackages) => {
    setEditModalOpen(false);

    if (isRefreshPackages === true) {
      // Get Packages
      getRatesPackages();
    }
  };

  // Edit Modal close and open for gifting address
  const giftingAddEditModalOpenHandle = (giftingAddressRow) => {
    if (giftingAddressRow !== undefined) {
      setSelectedRow(giftingAddressRow);
      setGiftingAddEditModalOpen(true);
    }
  };

  const giftingAddEditModalCloseHandle = (isRefreshGiftings) => {
    setGiftingAddEditModalOpen(false);

    if (isRefreshGiftings === true) {
      // Get Gifting address
      getRatesGiftingAddress();
    }
  };

  const handleOpenAddAddress = () => setOpenAddAddress(true);
  const handleCloseAddAddress = (isRefreshGiftings) => {
    setOpenAddAddress(false);
    if (isRefreshGiftings === true) {
      //Get All gifting address integration
      getRatesGiftingAddress();
    }
  };

  //Form onSubmit handler
  const formik = useFormik({
    initialValues: {
      price:
        props?.data?.rates?.minimumPrice !== null &&
          props?.data?.rates?.minimumPrice !== undefined
          ? (props?.data?.rates?.minimumPrice)
          : "",
      password: (props?.data?.rates?.password && props?.data?.rates?.password !== null) ?
        (props?.data?.rates?.password) : "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let user = UserService.getUserFromSession();
      let selectedCts = setRateSelectedCts(ctData);
      if (props.data && user !== null && ((ratesVisibility === "private" && values.password !== "") || ratesVisibility === "public")) {
        setIsFormSubmit(true);
        //Check rates
        if (props.data?.rates === null) {
          // Create rate
          createRate(values, user, selectedCts);
        } else {
          //update rate
          updateRate(values, props?.data?.rates?.id, selectedCts);
        }
      } else {
        if (ratesVisibility === "") {
          setErrorMessage("Please select Rates visibility")
        } else if (ratesVisibility === "private" && values.password === "") {
          setErrorMessage("Please enter Password")
        }
      }
    },
  });

  // Create Rate
  const createRate = (values, user, selectedCts) => {
    let rateReq = {
      userId: user?.id,
      clientId: user?.clientId,
      mediakitId:
        mediakitId !== ""
          ? mediakitId
          : props?.mediakitId
            ? props.mediakitId
            : "",
      minimumPrice: values.price,
      campaignTypes: selectedCts,
      viewRates: (ratesVisibility === "private") ? false : true,
      password: (ratesVisibility === "private" && values.password !== "") ? (values.password?.trim()) : ""
    };
    httpService
      .createRate(rateReq)
      .then((res) => {
        if (
          res !== undefined &&
          res?.data?.success !== undefined &&
          res?.data?.success === true
        ) {
          setIsFormSubmit(false);
          // Success Message
          toast.success("Rates saved successfully", {
            position: toast.POSITION.TOP_LEFT,
            hideProgressBar: true,
            icon: <img src={toastIcon} />
          });
          props.closeCallback(true);
          // Set rates visibility
          if (res.data?.data?.viewRates !== null && res.data?.data?.viewRates !== undefined)
            setRatesVisibility((res.data.data.viewRates === false ? "private" : "public"))
        } else {
          setIsFormSubmit(false);
          // Throw error
          toast.error("Unable to save the Rates", {
            position: toast.POSITION.TOP_LEFT,
            hideProgressBar: true,
          });
        }
      })
      .catch((error) => {
        setIsFormSubmit(false);
        // Throw error
        toast.error("Unable to save the Rates", {
          position: toast.POSITION.TOP_LEFT,
          hideProgressBar: true,
        });
      });
  };

  // Update Rate
  const updateRate = (values, id, selectedCts) => {
    let rateReq = {
      minimumPrice: values.price,
      campaignTypes: selectedCts,
      viewRates: (ratesVisibility === "private") ? false : true,
      password: (ratesVisibility === "private" && values.password !== "") ? (values.password?.trim()) : ""
    };
    httpService
      .editRate(id, rateReq)
      .then((res) => {
        if (
          res !== undefined &&
          res?.data?.success !== undefined &&
          res?.data?.success === true
        ) {
          setIsFormSubmit(false);
          // Success Message
          toast.success("Rates saved successfully", {
            position: toast.POSITION.TOP_LEFT,
            hideProgressBar: true,
            icon: <img src={toastIcon} />
          });
          props.closeCallback(true);
          // Set rates visibility
          if (res.data?.data?.viewRates !== null && res.data?.data?.viewRates !== undefined)
            setRatesVisibility((res.data.data.viewRates === false ? "private" : "public"))
        } else {
          setIsFormSubmit(false);
          // Throw error
          toast.error("Unable to save the Rates", {
            position: toast.POSITION.TOP_LEFT,
            hideProgressBar: true,
          });
        }
      })
      .catch((error) => {
        setIsFormSubmit(false);
        // Throw error
        toast.error("Unable to create the Rates", {
          position: toast.POSITION.TOP_LEFT,
          hideProgressBar: true,
        });
      });
  };

  const getRatesPackages = () => {
    let user = getUserFromSession();

    if (
      user !== null &&
      user?.clientId !== undefined &&
      user?.clientId !== "" &&
      user?.clientId !== null &&
      state?.mediakitId !== undefined &&
      state?.mediakitId !== "" &&
      state?.mediakitId !== null
    ) {
      let packagesReq = {
        userId: user?.id,
        clientId: user?.clientId,
        mediakitId: state?.mediakitId,
      };

      httpService
        .getRatesPackages(packagesReq)
        .then((res) => {
          // check success is true or not
          if (
            res !== null &&
            res !== undefined &&
            res?.data?.data !== null &&
            res?.data?.data !== undefined
          ) {
            // Check  packages data
            if (res.data.data?.length > 0) {
              setPackages(res.data.data);
            } else {
              setPackages([]);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const getRatesGiftingAddress = () => {
    let user = getUserFromSession();

    if (
      user !== null &&
      user?.clientId !== undefined &&
      user?.clientId !== "" &&
      user?.clientId !== null &&
      state?.mediakitId !== undefined &&
      state?.mediakitId !== "" &&
      state?.mediakitId !== null
    ) {
      let giftingReq = {
        userId: user?.id,
        clientId: user?.clientId,
        mediakitId: state?.mediakitId,
      };

      httpService
        .getRatesGiftingAddress(giftingReq)
        .then((res) => {
          // check success is true or not
          if (
            res !== null &&
            res !== undefined &&
            res?.data?.data !== null &&
            res?.data?.data !== undefined
          ) {
            // Check  Giftings data
            if (res.data.data?.length > 0) {
              setGiftingsAddress(res.data.data);
            } else {
              setGiftingsAddress([]);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //Get user from session
  const getUserFromSession = () => {
    if (window.localStorage.getItem("user")) {
      let userInfo = JSON.parse(window.localStorage.getItem("user"));
      return userInfo;
    }
    return null;
  };

  //Campaign type onchange event
  const campaignTypeOnchangeHandler = (e, campaignType) => {
    setIsFormSubmit(false);
    if (e?.target?.checked !== undefined) {
      setCtSelectedData(campaignType);
    }
  };

  //Set campaign types selected data
  const setCtSelectedData = (campaignType) => {
    setCtData({ ...ctData, [campaignType]: !ctData[campaignType] });
  };

  //Set selected campaign types
  function setRateSelectedCts(ctsData) {
    let selectedPlatforms = [];
    if (ctsData !== undefined && ctsData !== null) {
      Object.keys(ctsData).map((ct, idx) => {
        if (ctsData[ct] === true) {
          selectedPlatforms.push(ct);
        }
      });
      setSelectedCampaignTypes(selectedPlatforms);
    }
    return selectedPlatforms;
  }

  //  Ok callback handler for Delete packages
  const handleOk = (type) => {
    if (selectedRowId !== undefined && selectedRowId !== 0) {
      handleDeletePopupClose();
      handleGiftingDeletePopupClose();

      //Delete Api integration. Check type
      if (type === "giftingAddress") {
        // Delete Gifting Address
        deleteRatesGiftingAddress(selectedRowId);
      } else if (type === "package") {
        // Delete package
        deletePackage(selectedRowId);
      }
    } else {
      handleDeletePopupClose();
      handleGiftingDeletePopupClose();
      // Throw error
      toast.error("Unable to delete " + type + ". Please try again", {
        position: toast.POSITION.TOP_LEFT,
        hideProgressBar: true,
      });
    }
  };

  const deletePackage = (packageId) => {
    httpService
      .deletePackageById(packageId)
      .then((res) => {
        if (
          res !== undefined &&
          res !== null &&
          res?.data?.success &&
          res?.data?.success === true
        ) {
          // Success Message
          toast.success("Deleted successfully", {
            position: toast.POSITION.TOP_LEFT,
            hideProgressBar: true,
            icon: <img src={toastIcon} />
          });

          //get package
          getRatesPackages();
        } else {
          // Throw error
          toast.error("Unable to delete package. Please try again", {
            position: toast.POSITION.TOP_LEFT,
            hideProgressBar: true,
          });
        }
      })
      .catch((error) => {
        // Throw error
        toast.error("Unable to delete package. Please try again", {
          position: toast.POSITION.TOP_LEFT,
          hideProgressBar: true,
        });
      });
  };

  const deleteRatesGiftingAddress = (giftingId) => {
    httpService
      .deleteRatesGiftingAddressById(giftingId)
      .then((res) => {
        if (
          res !== undefined &&
          res !== null &&
          res?.data?.success &&
          res?.data?.success === true
        ) {
          // Success Message
          toast.success("Deleted Successfully", {
            position: toast.POSITION.TOP_LEFT,
            hideProgressBar: true,
            icon: <img src={toastIcon} />
          });

          //get gifting address
          getRatesGiftingAddress();
        } else {
          // Throw error
          toast.error("Unable to delete gifting address. Please try again", {
            position: toast.POSITION.TOP_LEFT,
            hideProgressBar: true,
          });
        }
      })
      .catch((error) => {
        // Throw error
        toast.error("Unable to delete gifting address. Please try again", {
          position: toast.POSITION.TOP_LEFT,
          hideProgressBar: true,
        });
      });
  };

  // Onclose handle for Edit About You
  const onCloseHandle = (e) => {
    e?.preventDefault();
    props.closeCallback(true);
  };

  //On Rates visibility change handler
  const onRatesVisibilityChange = (e) => {
    if (e?.target?.value) {
      setErrorMessage("")
      // Clear password field
      if (formik?.values?.password)
        formik.values.password = ""
      // Set rates visibility
      setRatesVisibility(e?.target?.value?.toLowerCase())
    }
  }

  return (
    <Grid
      container
      alignContent="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid
        item
        xs={0.5}
        sm={0.5}
        md={2}
        lg={3}
        xl={3}
        xxl={3.75}
        xel={4}
        xxel={4.75}
        el={5}
      />
      <Grid
        item
        xs={11}
        sm={11}
        md={8}
        lg={6}
        xl={5.32}
        xxl={4.5}
        xel={3.5}
        xxel={2.5}
        el={2}
      >
        <MDBCard sx={{ p: 0, mx: 0, my: 10, width: "inherit" }}>
          {/* Header */}
          <Grid sx={{ display: "flex", mt: 4 }}>
            <MDBTypography
              fontWeight="medium"
              fontSize="xl"
              lineHeight="2xxl"
              sx={{ ml: 3 }}
            >
              Edit Rates
            </MDBTypography>
          </Grid>

          <Divider sx={{ mb: 0 }} />

          {/* body */}
          {/* Formik Validation */}
          <Grid
            component="form"
            onSubmit={formik.handleSubmit}
            autocomplete="off"
          >
            <Grid sx={{ maxHeight: "413px", overflowY: "scroll" }}>
              <Grid sx={{ mx: 5 }}>
                <InputLabel sx={{ mt: 5, mb: 1 }}>
                  <MDBTypography
                    fontWeight="regular"
                    fontSize="xs"
                    lineHeight="md"
                  >
                    Minimum Per Post
                  </MDBTypography>
                  {/* </Grid> */}
                </InputLabel>
                {/* Adding dollar in input box */}
                <MDBInput
                  type="number"
                  placeholder="Enter your minimum rate"
                  id="price"
                  name="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: <MDBox component="img" src={Dollar} />,
                  }}
                />

                <Grid>
                  {/* Rates - radio buttons */}
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      <MDBTypography
                        fontWeight="medium"
                        fontSize="md"
                        lineHeight="2xl"
                      >
                        Rates visibility
                      </MDBTypography>
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      id="ratesVisibility"
                      onChange={(e) => onRatesVisibilityChange(e)}
                      defaultValue={(props?.data?.rates?.viewRates === false) ? "private" : "public"}
                    >
                      <FormControlLabel
                        id="rv-public"
                        name="ratesVisibility"
                        value="public"
                        control={<Radio />}
                        label={
                          <MDBTypography
                            fontWeight="regular"
                            fontSize="sm"
                            lineHeight="2xxl"
                          >
                            Public
                          </MDBTypography>
                        }
                      />
                      {(ratesVisibility === "public") && (
                        <Grid pl={2.9} pb={1}>
                          <MDBTypography
                            color="grayScale"
                            fontWeight="regular"
                            fontSize="xs"
                            lineHeight="2xxl"
                          >
                            Everyone can see your Media Kit rates.
                          </MDBTypography>
                        </Grid>
                      )}
                      <FormControlLabel
                        id="rv-private"
                        name="ratesVisibility"
                        value="private"
                        control={<Radio
                        />}
                        label={
                          <MDBTypography
                            fontWeight="regular"
                            fontSize="sm"
                            lineHeight="2xxl"
                          >
                            Protected
                          </MDBTypography>
                        }
                      />
                      {(ratesVisibility === "private") && (
                        <Grid pl={2.9}>
                          <MDBTypography
                            color="grayScale"
                            fontWeight="regular"
                            fontSize="xs"
                            lineHeight="2xxl"
                          >
                            Rates are protected with a password. Only people who have your password can see your Media Kit rates.
                          </MDBTypography>
                        </Grid>
                      )}
                    </RadioGroup>
                    {errorMessage !== "" && ratesVisibility === "" && (
                      <MDBTypography
                        mt={1}
                        fontWeight="sm"
                        fontSize="md"
                        sx={{ color: "#E53935" }}
                      >
                        {errorMessage}
                      </MDBTypography>
                    )}
                  </FormControl>

                  {/* Password */}
                  {(ratesVisibility === "private") && (
                    <Grid sx={{ mt: 2, mb: 2, pl: 2.9 }}>
                      <MDBInput
                        type="text"
                        placeholder="Enter Password"
                        id="password"
                        name="password"
                        ref={pwdRef}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.password &&
                          Boolean(formik.errors.password)
                        }
                        helperText={
                          formik.touched.password && formik.errors.password
                        }
                      />
                      <MDBTypography
                        mt={0.5}
                        color="grayScale"
                        fontWeight="regular"
                        fontSize="xs"
                        lineHeight="2xxl"
                      >
                        Note: We recommend making your rates public to ensure you get the most opportunities. Otherwise. you will need to manually share your password each time someone messages you.
                      </MDBTypography>
                      {errorMessage !== "" && (ratesVisibility === "private" && formik?.values?.password === "") && (
                        <MDBTypography
                          mt={1}
                          fontWeight="sm"
                          fontSize="md"
                          sx={{ color: "#E53935" }}
                        >
                          {errorMessage}
                        </MDBTypography>
                      )}
                    </Grid>
                  )}
                </Grid>

                <Grid sx={{ mt: 2, mb: 2 }}>
                  <InputLabel>
                    <MDBTypography
                      fontWeight="medium"
                      fontSize="md"
                      lineHeight="2xl"
                    >
                      Choose your desired campaign types
                    </MDBTypography>
                  </InputLabel>
                  {/* check boxes */}
                  <FormGroup>
                    {campaignTypes?.map((campaignType, ctIdx) => (
                      <FormControlLabel
                        key={ctIdx}
                        control={
                          <Checkbox
                            checked={
                              ctData[campaignType.campaignType] ? true : false
                            }
                            onChange={(e) => {
                              campaignTypeOnchangeHandler(
                                e,
                                campaignType.campaignType
                              );
                            }}
                          />
                        }
                        label={
                          <MDBTypography fontSize="sm" fontWeight="regular">
                            {campaignType.campaignType}
                          </MDBTypography>
                        }
                        sx={{ mb: 0 }}
                      />
                    ))}
                  </FormGroup>
                </Grid>
              </Grid>

              {/* Set Packages */}
              {/* Condition to checked the paid post checkbox */}
              {ctData["Paid Post"] === true && (
                <Grid>
                  <MDBox sx={{ mt: 4, ml: 5 }}>
                    <MDBTypography
                      fontWeight="medium"
                      fontSize="md"
                      sx={{ mb: 1 }}
                    >
                      Set Packages
                    </MDBTypography>
                  </MDBox>
                  {/* Rates Packages Data */}
                  {packages?.length > 0 &&
                    packages?.map((packageData, idx) => (
                      <Grid container justifyContent="space-between" key={idx}>
                        {/* onClick at add collabrator button the data from AddSetPackage will display dynamicaly here */}
                        <Grid
                          item
                          display="flex"
                          sx={{ ml: 5 }}
                          alignItems="center"
                        >
                          {packageData?.platforms !== null &&
                            packageData?.platforms?.length > 0 && (
                              <Grid sx={{ writingMode: "vertical-lr" }}>
                                {packageData?.platforms.map((platform, idx) => (
                                  <Grid key={idx}>
                                    {platform === "instagram" && (
                                      <Grid
                                        component="img"
                                        src={Instagram}
                                        width="18px"
                                        height="18px"
                                        mr={1}
                                      />
                                    )}
                                    {platform === "tiktok" && (
                                      <Grid
                                        component="img"
                                        src={TikTok}
                                        width="18px"
                                        height="18px"
                                        mr={1}
                                      />
                                    )}
                                    {platform === "youtube" && (
                                      <Grid
                                        component="img"
                                        src={Youtube}
                                        width="18px"
                                        height="18px"
                                        mr={1}
                                      />
                                    )}
                                  </Grid>
                                ))}
                              </Grid>
                            )}
                          <Grid container>
                            <Grid item>
                              <Tooltip title={packageData.packageName}>
                                <MDBTypography
                                  fontWeight="regular"
                                  fontsize="md"
                                  lineHeight="2xl"
                                  maxWidth={
                                    breakpoint === "xs" ? "80px" : "200px"
                                  }
                                  sx={{
                                    ml: 0,
                                    mr: 1,
                                    display: "-webkit-box",
                                    overflow: "hidden",
                                    WebkitBoxOrient: "vertical",
                                    WebkitLineClamp: 1,
                                  }}
                                >
                                  {packageData.packageName}
                                </MDBTypography>
                              </Tooltip>
                            </Grid>
                            <Grid item>
                              {/* <MDBTypography
                                fontWeight="regular"
                                fontsize="md"
                                color="openCampGreenColor"
                                lineHeight="2xl"
                              >
                                $
                              </MDBTypography> */}
                            </Grid>
                            <Grid item>
                              <MDBTypography
                                fontWeight="regular"
                                fontsize="md"
                                color="openCampGreenColor"
                                lineHeight="2xl"
                              >
                                {
                                  (packageData?.price) ?
                                    (NumberFormatService.convertPriceToUSDFormat(packageData?.price)) : ""
                                }
                              </MDBTypography>
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item display="flex" sx={{ mr: 5, mb: 1 }}>
                          <Grid>
                            <MDAvatar size="sm">
                              <MDBButton
                                variant="contained"
                                bgColor="transparent"
                                onClick={() => {
                                  editModalOpenHandle(packageData);
                                }}
                              >
                                <MDBox component="img" src={EditIcon} />
                              </MDBButton>
                            </MDAvatar>
                          </Grid>
                          <Grid>
                            <MDAvatar size="sm">
                              <MDBButton
                                variant="contained"
                                bgColor="transparent"
                                padding="0"
                                onClick={() => {
                                  handleDeletePopupOpen(packageData.id);
                                }}
                              >
                                <MDBox component="img" src={Delete} />
                              </MDBButton>
                            </MDAvatar>
                          </Grid>
                        </Grid>
                      </Grid>
                    ))}

                  {/* Modal */}
                  <Modal
                    open={deletePopupOpen}
                    onClose={handleDeletePopupClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    {/* Delete Popup */}
                    <DeletePopup
                      cancelCallback={handleDeletePopupClose}
                      okCallback={handleOk}
                      type="package"
                    />
                  </Modal>

                  {/* Edit package modal to open packages popup */}
                  <Modal
                    open={editModalOpen}
                    onClose={() => {
                      editModalCloseHandle(false);
                    }}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    style={{ overflow: "scroll" }}
                  >
                    <AddSetPackage
                      closeCallback={editModalCloseHandle}
                      package={selectedRow}
                    />
                  </Modal>

                  {/* Add Packages */}
                  <Grid sx={{ ml: 5, mt: 1, mb: 4 }}>
                    <Grid
                      container
                      onClick={handleOpen}
                      sx={{ cursor: "pointer" }}
                    >
                      <MDAvatar size="xs">
                        <MDBButton variant="contained" bgColor="light_green">
                          <MDBTypography component="img" src={Add} />
                        </MDBButton>
                      </MDAvatar>
                      <MDBTypography
                        color="light_green"
                        fontWeight="regular"
                        fontSize="sm"
                        lineHeightSize="xxl"
                        pl={1}
                        pt={0.3}
                      >
                        Add Packages
                      </MDBTypography>
                    </Grid>
                  </Grid>
                </Grid>
              )}

              {/* Modal */}
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{ overflow: "scroll" }}
              >
                <AddSetPackage
                  closeCallback={handleClose}
                  mediakitId={mediakitId}
                />
              </Modal>

              {ctData["Gifting"] === true && (
                <Grid>
                  {/* Gifting address */}
                  {/* Condition to checked the Gifting checkbox */}
                  <Grid sx={{ mt: 4, ml: 5, mb: 1 }}>
                    <MDBTypography
                      fontWeight="medium"
                      fontSize="md"
                      sx={{ mb: 1 }}
                    >
                      Gifting Address
                    </MDBTypography>
                  </Grid>

                  {giftingsAddress?.length > 0 &&
                    giftingsAddress?.map((address, idx) => (
                      <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                        key={idx}
                      >
                        {/* onClick at add collabrator button the data from AddSetPackage will display dynamicaly here */}
                        <Grid
                          item
                          display="flex"
                          sx={{ ml: 5 }}
                          alignItems="center"
                        >
                          <MDBTypography
                            fontWeight="regular"
                            fontSize="md"
                            lineHeight="2xl"
                            maxWidth={{ xs: "150px", sm: "220px", md: "340px" }}
                            pr={1}
                          >
                            {address?.address1 +
                              " " +
                              address.address2 +
                              " " +
                              address.city +
                              ", " +
                              (address.state !== null ? address.state : "") +
                              " " +
                              (address.country !== null
                                ? address.country
                                : "") +
                              " " +
                              address.postalCode}
                          </MDBTypography>
                        </Grid>

                        <Grid item display="flex" sx={{ mr: 5 }}>
                          <Grid>
                            <MDAvatar size="sm">
                              <MDBButton
                                variant="contained"
                                bgColor="transparent"
                                onClick={() => {
                                  giftingAddEditModalOpenHandle(address);
                                }}
                              >
                                <MDBox component="img" src={EditIcon} />
                              </MDBButton>
                            </MDAvatar>
                          </Grid>
                          <Grid>
                            <MDAvatar size="sm">
                              <MDBButton
                                variant="contained"
                                bgColor="transparent"
                                onClick={() => {
                                  handleGiftingDeletePopupOpen(address.id);
                                }}
                              >
                                <MDBox component="img" src={Delete} />
                              </MDBButton>
                            </MDAvatar>
                          </Grid>
                        </Grid>
                      </Grid>
                    ))}

                  {/* Add Gifting Address */}
                  <Grid sx={{ ml: 5, mt: 1 }}>
                    <Grid
                      container
                      onClick={handleOpenAddAddress}
                      sx={{ cursor: "pointer" }}
                    >
                      <MDAvatar size="xs">
                        <MDBButton variant="contained" bgColor="light_green">
                          <MDBTypography component="img" src={Add} />
                        </MDBButton>
                      </MDAvatar>
                      <MDBTypography
                        color="light_green"
                        fontWeight="regular"
                        fontSize="sm"
                        lineHeightSize="xxl"
                        pl={1}
                        pt={0.3}
                      >
                        Add address
                      </MDBTypography>
                    </Grid>
                  </Grid>
                </Grid>
              )}

              {/* Edit package modal to open packages popup */}
              <Modal
                open={giftingAddEditModalOpen}
                onClose={() => {
                  giftingAddEditModalCloseHandle(false);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{ overflow: "scroll" }}
              >
                <AddGiftingAddress
                  closeCallback={giftingAddEditModalCloseHandle}
                  giftingAddress={selectedRow}
                />
              </Modal>

              {/* Delete Modal */}
              <Modal
                open={giftingDeletePopupOpen}
                onClose={handleGiftingDeletePopupClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                {/* Delete Popup */}
                <DeletePopup
                  cancelCallback={handleGiftingDeletePopupClose}
                  okCallback={handleOk}
                  type="giftingAddress"
                />
              </Modal>

              {/*Add Gifting Address Modal */}
              <Modal
                open={openAddAddress}
                onClose={handleCloseAddAddress}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{ overflow: "scroll" }}
              >
                <AddGiftingAddress
                  closeCallback={handleCloseAddAddress}
                  mediakitId={mediakitId}
                />
              </Modal>
            </Grid>

            <Divider />

            {/* footer */}
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              sx={{ mb: 3 }}
            >
              {/* <MDBTypography
                        fontWeight="regular"
                        fontSize="md"
                        color="light_green"
                        lineHeight="2xl"
                        sx={{ ml: 3 }}
                    >
                        3/3
                    </MDBTypography> */}
              <Grid item>
                <MDBButton
                  variant="text"
                  size="small"
                  bgColor="black"
                  color="white"
                  fontSize="md"
                  fontWeight="medium"
                  borderSize="md"
                  sx={{ px: 3, py: 1.5, mr: 1 }}
                  onClick={(e) => onCloseHandle(e)}
                >
                  Cancel
                </MDBButton>
                <MDBButton
                  variant="contained"
                  size="small"
                  bgColor="light_green"
                  color="biaAssist"
                  fontSize="md"
                  fontWeight="bold"
                  borderSize="md"
                  sx={{ px: 3, py: 1.5, mr: 3 }}
                  type="submit"
                  disabled={isFormSubmit ? true : false}
                  isLoading={isFormSubmit}
                >
                  Save
                </MDBButton>
              </Grid>
            </Grid>
          </Grid>
        </MDBCard>
      </Grid>
      <Grid
        item
        xs={0.5}
        sm={0.5}
        md={2}
        lg={3}
        xl={3}
        xxl={3.75}
        xel={4}
        xxel={4.75}
        el={5}
      />
    </Grid>
  );
}
