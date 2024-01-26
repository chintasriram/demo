import { Divider, Grid, InputLabel } from '@mui/material'
import MDBButton from 'components/MDBButton'
import MDBCard from 'components/MDBCard'
import MDBInput from 'components/MDBInput'
import MDBTypography from 'components/MDBTypography'
import { useFormik } from 'formik'
import * as yup from 'yup';
import httpService from 'service/HttpService'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const validationSchema = yup.object({
  referral: yup
    .string('Enter a valid Referral Code')
    .required('Referral Code is required'),
});


export default function ReferralCodeModal(props) {
  const [isFormSubmit, setFormSubmit] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(false);
  //For Navigation
  const history = useNavigate();

  const formik = useFormik({
    initialValues: {
      referral: '',

    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      
      let req = {
        "code": values.referral
      }
      setFormSubmit(true);
      httpService.validateReferralCode(req).then((res) => {
        setFormSubmit(false);
        if (res.data.success === true) {
          // Check user role
          if(props?.userRoleTabIdx !== undefined && props?.userRoleTabIdx !== null){
            history("/register?tabIdx="+props.userRoleTabIdx);
          }else{
            history("/register");
          }
        } else {
          setErrorMessage("Invalid referral code "); 
        }

      }).catch((error) => { 
        setErrorMessage("Invalid referral code ");
      })
    },
  });

  return (
    <Grid container justifyContent="center" alignContent="center" style={{ minHeight: "100vh" }}>
      <MDBCard sx={{ p: 0, m: 0, m: 2 }}>
        <Grid pt={4} pb={2.5}>
          <form onSubmit={formik.handleSubmit}>
            <Grid sx={{ px: 4 }}>
              <InputLabel>
                <MDBTypography
                  color="white"
                  fontWeight="regular"
                  fontSize="xs"
                  lineHeightSize="md"
                  textTransform="uppercase"
                  pb={1}
                >
                  Please enter your code
                </MDBTypography>
              </InputLabel>
              <MDBInput
                placeholder="Enter your Referral Code"
                id="referral"
                name="referral"
                value={formik.values.referral}
                onChange={(e) => { 
                  formik.handleChange(e);
                  setErrorMessage(false);
                }}
                error={formik.touched.referral && Boolean(formik.errors.referral)}
                helperText={formik.touched.referral && formik.errors.referral} />
            </Grid>
            <Grid pt={1} ml={5}>
              {errorMessage ?
                <p style={{ color: '#d50000', fontSize: 14, fontWeight: '14' }}>
                  {errorMessage}
                </p>
                : <></>}
            </Grid>
            <Divider sx= {{mt: 1.5}}/>

            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              sx={{ mt: 2, mr: 2 }}
            >
              <MDBButton
                variant="text"
                size="small"
                color="white"
                fontSize="md"
                fontWeight="medium"
                borderSize="md"
                sx={{mr: 2 }}
                type="submit"
                onClick={props.closeCallback}

              >
                Cancel
              </MDBButton>
              <MDBButton
                variant="contained"
                size="small"
                bgColor="light_green"
                color="biaAssist"
                fontSize="md"
                fontWeight="medium"
                borderSize="md"
                sx={{ px: 1.5, py: 1, mr: 2 }}
                type="submit"
                disabled={isFormSubmit}
              >
                Next
              </MDBButton>
            </Grid>
          </form>
        </Grid>
      </MDBCard>
    </Grid>
  )
}
