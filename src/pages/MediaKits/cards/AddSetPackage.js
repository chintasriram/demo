import { Divider, FormControl, FormControlLabel, Grid, InputLabel, Radio, RadioGroup } from '@mui/material'
import MDBButton from 'components/MDBButton'
import MDBCard from 'components/MDBCard'
import MDBInput from 'components/MDBInput'
import MDBox from 'components/MDBox'
import MDBTypography from 'components/MDBTypography'
import React, { useEffect, useState } from 'react'
import CloseButton from 'components/CloseButton'
import SocialPlatformSelect from 'components/SocialPlatformSelect';
import Dollar from "assets/images/icons/svg/medium/DollarIcon.svg";
import * as yup from 'yup';
import { Field, useFormik } from 'formik'
import httpService from 'service/HttpService'
import { toast } from 'react-toastify'
import Tick from 'assets/images/icons/svg/large/CheckIcon4030.svg'
import toastIcon from 'assets/images/icons/svg/medium/ToastSuccess.svg'

const validationSchema = yup.object({
  packageName: yup
    .string()
    .required('Package Name is required')
    .min(4, 'Package Name Must be atleast 4 characters')
    .max(30, 'Package Name Must have upto 30 characters')
    .matches(/^[a-zA-Z0-9]/, ''),
  price: yup
    .number()
    .required('Price of package is required')
    .min(1, "Price of package must be greater than 0")
});

export default function AddSetPackage(props) {
  //Configure the Toast
  toast.configure();

  const [platforms, setPlaforms] = useState([])
  const [isFormSubmit, setIsFormSubmit] = useState(false)
  const [projectTypes, setProjectTypes] = useState([])
  const [selectedProjectType, setSelectedProjectType] = useState("")
  const [isPtError, setIsPtError] = useState(false)

  useEffect(() => {
    // Get Project types
    getProjectTypes();
    setIsPtError(false)
  }, [])

  // Get Project types
  function getProjectTypes() {
    httpService.getProjectTypes().then((res) => {
      if (res !== undefined && res?.data?.success !== undefined && res?.data?.success === true) {
        setProjectTypes(res.data.data)
      }
    })
  }

  // Platforms Callback handler
  function platformCallBackHandler(data) {
    setIsFormSubmit(false)
    let selectedPlatforms = []
    if (data !== undefined && data !== null) {
      Object.keys(data).map((platform, idx) => {
        if (data[platform] === true) {
          selectedPlatforms.push(platform)
        }
      })
      setPlaforms(selectedPlatforms)
    }
  }

  const formik = useFormik({
    initialValues: {
      packageName: (props?.package?.packageName) ? (props?.package?.packageName) : "",
      price: (props?.package?.price) ? (props?.package?.price) : "",
      description: (props?.package?.description) ? (props?.package?.description) : "",
      projectType: (props?.package?.projectType) ? (props?.package?.projectType) : "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setSelectedProjectType(values.projectType)
      setIsPtError(false)
      // Check package type
      if (values.projectType !== "") {
        setIsFormSubmit(true)
        // Check id
        if (props?.package?.id !== undefined && props?.package?.id !== null) {
          //Update package by id
          updatePackage(props.package.id, values)
        } else {
          if (platforms.length > 0) {
            //Create Package integration
            createPackage(values);
          }
        }
      } else {
        setIsPtError(true)
      }
    },
  });

  // Create Package
  const createPackage = (values) => {
    let user = getUserFromSession();
    if (user !== null && props?.mediakitId !== undefined && props?.mediakitId !== "" && props?.mediakitId !== null) {
      // setIsFormSubmit(true)
      let createPackagesReq = {
        "clientId": user?.clientId,
        "userId": user?.id,
        "mediakitId": props?.mediakitId,
        "platforms": platforms,
        "packageName": values.packageName?.trim(),
        "price": values.price,
        "description": values.description?.trim(),
        "projectType": values.projectType
      }

      httpService.createPackages(createPackagesReq).then((res) => {
        if (res !== undefined && res !== null && res?.data?.success && res?.data?.success === true) {
          setIsFormSubmit(false);

          // Success Message
          toast.success("Package created successfully", { position: toast.POSITION.TOP_LEFT, hideProgressBar: true,icon:<img src={toastIcon} /> });

          //close popup
          props.closeCallback(true);
        } else {
          setIsFormSubmit(false);

          // Throw error
          toast.error(res.data.message, { position: toast.POSITION.TOP_LEFT, hideProgressBar: true });
        }

      }).catch((error) => {
        //close popup
        props.closeCallback(false);

        setIsFormSubmit(false);
        // Throw error
        toast.error("Unable to created the package. Please try again", { position: toast.POSITION.TOP_LEFT, hideProgressBar: true });
      })
    }
  }

  // Update Package
  const updatePackage = (id, values) => {
    if (values !== undefined) {
      setIsFormSubmit(true)

      let updatePackageReq = {
        "platforms": platforms,
        "packageName": values.packageName?.trim(),
        "price": values.price,
        "description": values.description?.trim(),
        "projectType": values.projectType
      }

      //Update package
      httpService.updatePackageById(id, updatePackageReq).then((res) => {
        if (res !== undefined && res !== null && res?.data?.success && res?.data?.success === true) {
          setIsFormSubmit(false);

          // Success Message
          toast.success("Package updated successfully", { position: toast.POSITION.TOP_LEFT,
             hideProgressBar: true,icon:<img src={toastIcon} />});
          // toast.success(<div><img src={Dollar} />{"Package updated successfully"}</div>);
          //close popup
          props.closeCallback(true);
        } else {
          setIsFormSubmit(false);

          // Throw error
          toast.error(res.data.message, { position: toast.POSITION.TOP_LEFT, hideProgressBar: true });
        }
      }).catch((error) => {
        //close popup
        props.closeCallback(false);

        setIsFormSubmit(false);
        // Throw error
        toast.error("Unable to update the package. Please try again", { position: toast.POSITION.TOP_LEFT, hideProgressBar: true });
      })
    }
  }

  //Get user from session
  const getUserFromSession = () => {
    if (window.localStorage.getItem("user")) {
      let userInfo = JSON.parse(window.localStorage.getItem("user"));
      return userInfo;
    }
    return null;
  };

  return (
    <Grid
      container
      alignContent="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={0.5} sm={0.5} md={2} lg={3} xl={2.6} xxl={3.75} xel={4} xxel={4.75} el={5} />
      <Grid item xs={11} sm={11} md={8} lg={6} xl={6.8} xxl={4.5} xel={3.5} xxel={2.5} el={2}>
        <MDBCard sx={{ p: 0, m: 0, my: 10, width: "inherit"  }}>
          {/* header */}
          <Grid sx={{ mt: 4, px: 3 }} container justifyContent="space-between">
            <MDBTypography
              fontWeight="medium"
              fontSize="xl"
              lineHeight="2xxl"
            >
              Add Set Package
            </MDBTypography>

            {/* Card Close button */}
            <CloseButton callback={props.closeCallback} />
          </Grid>

          <Divider />

          <Grid
            component="form"
            onSubmit={formik.handleSubmit}
            autocomplete="off"
          >
            <Grid>
              {/* social */}
              <Grid sx={{ mt: 5, mb: 2, ml: 5 }}>
                <MDBTypography
                  fontWeight="medium"
                  fontSize="md"
                  lineHeight="2xxl"
                  sx={{ mb: 2.5 }}
                >
                  Select Platform
                </MDBTypography>

                {/* Social platform Select */}
                <SocialPlatformSelect insta={true} callBackHandler={platformCallBackHandler} selectedPlatforms={props?.package?.platforms} />
                {
                  (isFormSubmit === true && platforms.length <= 0) &&
                  <MDBTypography
                    pt={1}
                    fontWeight="sm"
                    fontSize="xs"
                    color="error"
                  >
                    Please select atleast one platform
                  </MDBTypography>
                }
              </Grid>

              {/* inputs */}
              <Grid sx={{ mx: 5, mb: 5 }}>
                <InputLabel sx={{ mb: 1 }}>
                  <MDBTypography
                    fontWeight="regular"
                    fontSize="xs"
                    lineHeight="md"
                    textTransform="Uppercase"
                  >
                    Package Name
                  </MDBTypography>
                </InputLabel>
                <MDBInput
                  type="text"
                  placeholder="Enter Package Name"
                  id="packageName"
                  name="packageName"
                  value={formik.values.packageName}
                  onChange={formik.handleChange}
                  error={formik.touched.packageName && Boolean(formik.errors.packageName)}
                  helperText={formik.touched.packageName && formik.errors.packageName}
                  sx={{ mb: 2 }}
                />
                <InputLabel sx={{ mt: 2, mb: 1 }}>
                  <MDBTypography
                    fontWeight="regular"
                    fontSize="xs"
                    lineHeight="md"
                    textTransform="Uppercase"
                  >
                    Price Of Package
                  </MDBTypography>
                </InputLabel>
                <MDBInput
                  type="number"
                  placeholder="How much does this package cost"
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

                <InputLabel sx={{ mt: 2, mb: 1 }}>
                  <MDBTypography
                    fontWeight="regular"
                    fontSize="xs"
                    lineHeight="md"
                  >
                    DESCRIPTION
                  </MDBTypography>
                </InputLabel>
                <MDBInput
                  type="text"
                  placeholder="Describe what you will do (optional)"
                  id="description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                  multiline
                  rows={3}
                />

                {/* Radio Buttons */}
                <Grid>
                  <FormControl>
                    <MDBTypography
                      color="white"
                      fontWeight="medium"
                      fontSize="md"
                      lineHeightSize="2xl"
                      pb={2} pt={3}
                    >
                      What type of project is this?
                    </MDBTypography>
                    <RadioGroup
                      aria-labelledby="projectType"
                      id="projectType"
                      sx={{ width: "460px" }}
                      defaultValue={(props?.package?.projectType && props?.package?.projectType !== "") ? (props?.package?.projectType) : ""}
                      error={formik.touched.radioGroup && Boolean(formik.errors.radioGroup)}
                      helperText={formik.touched.radioGroup && formik.errors.radioGroup}
                    >
                      <Grid >
                        {
                          projectTypes?.map((projectType, ptIdx) => (
                            <Grid key={ptIdx}>
                              <FormControlLabel
                                sx={{ my: 0, py: 0 }}
                                id={projectType.id}
                                value={projectType.projectType}
                                name="projectType"
                                control={<Radio
                                  checked={Field.value}
                                  onChange={formik.handleChange}
                                  error={formik.touched.projectType && Boolean(formik.errors.projectType)}
                                  helperText={formik.touched.projectType && formik.errors.projectType}
                                />}
                                label={
                                  <MDBTypography
                                    fontSize="sm"
                                    fontWeight="light"
                                    opacity={0.8}
                                  >
                                    {projectType.projectType}
                                  </MDBTypography>
                                }
                              />
                            </Grid>
                          ))
                        }
                      </Grid>
                    </RadioGroup>
                    {
                      (isPtError && selectedProjectType === "") &&
                      <MDBTypography
                        pt={1}
                        fontWeight="sm"
                        fontSize="xs"
                        color="error"
                      >
                        Please select project type
                      </MDBTypography>
                    }
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Divider />

            {/* Footer */}
            <Grid
              container
              sx={{ mb: 2.5 }}
              justifyContent="flex-end  "
            >
              <MDBButton
                variant="contained"
                size="small"
                bgColor="light_green"
                color="biaAssist"
                fontSize="md"
                fontWeight="bold"
                borderSize="md"
                sx={{ mr: 3, px: 3, py: 1.5 }}
                lineHeight="2xl"
                //disabled={isFormSubmit ? true : false}
                isLoading={isFormSubmit}
                type="submit"
              >
                Save
              </MDBButton>
            </Grid>
          </Grid>
        </MDBCard>
      </Grid>
      <Grid item xs={0.5} sm={0.5} md={2} lg={3} xl={2.6} xxl={3.75} xel={4} xxel={4.75} el={5} />
    </Grid>
  )
}
