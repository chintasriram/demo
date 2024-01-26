import React,{useState,useEffect} from 'react'
import { Divider, Grid, InputLabel } from '@mui/material'
import MDBButton from 'components/MDBButton'
import MDBCard from 'components/MDBCard'
import MDBInput from 'components/MDBInput'
import MDBTypography from 'components/MDBTypography'
import BiaLayout from 'layouts/biaLayout'
import {useFormik} from "formik";
import * as Yup from "yup";
import MDBox from 'components/MDBox'
import { useLocation, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import UserService from "service/UserService";
import toastIcon from 'assets/images/icons/svg/medium/ToastSuccess.svg'

export default function NewPassword() {
    //Configure the Toast
    toast.configure();
    let history = useNavigate();
    const location = useLocation()
    const [isFormSubmit, setIsFormSubmit] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [token, setToken] = useState("")

    useEffect(() => {
        const params = new URLSearchParams(location.search); 
        if(params && params?.get("token"))
            setToken(params?.get("token"))
    }, [location])

    // Formik handlers
    const formik = useFormik({
        //Initial values
        initialValues: {
            password: ""
        },
        //validation schema
        validationSchema: Yup.object({
            password: Yup.string('Enter your password')
                .min(6, 'Password must be at least 6 characters.')
                .matches(
                    ".*\\S+.*",
                    "Password cannot contain white space"
                )
                .trim('Password cannot contain white space')
                .required('Password is required'),
        }),
        //On submit handler
        onSubmit: (values) => {
            setErrorMsg("");
            if(token !== ""){
                setIsFormSubmit(true);
                let payload = {"token": token.trim(), "password":values.password.trim()}
                UserService.updatePassword(payload,updatePasswordSuccessCallback,updatePasswordErrorCallback)
            }else{
                setErrorMsg("Unable to update password. Please try again.")
            }
        }
    });

    //Update password success callback
    const updatePasswordSuccessCallback=(data)=>{
        setIsFormSubmit(false)
        if(data?.success && data?.success === true){
            UserService.updateUserSessionWithUser(data.data);
            toast.success("Password updated successfully", {position: toast.POSITION.TOP_LEFT,
                hideProgressBar: true,autoClose:3000,icon:<img src={toastIcon} />});
            history('/c/home');
        }else{
            setErrorMsg(data.message)
        }
    }

     //Update password error callback
     const updatePasswordErrorCallback=(error)=>{
        setIsFormSubmit(false)
        setErrorMsg("Password is not updated. Please try again")
    }

    return (
        <BiaLayout>
            <Grid
                container
                display="flex"
                alignContent="center"
                justifyContent="center"
                position="relative" 
                top="150px"
            >
                <Grid item xs={1} sm={1.5} md={2} lg={3} xl={3} xxl={4} xel={4} xxel={4.5} el={5} />
                <Grid item xs={10} sm={9} md={8} lg={6} xl={6} xxl={4} xel={3.5} xxel={3} el={2}>
                    <MDBCard sx={{ p: 0, m: 0, mb:2, width: "inherit" }}>
                        <Grid px={5} pt={6} >
                            <MDBTypography
                                color="white"
                                fontWeight="medium"
                                fontSize="4xl"
                                lineHeightSize="5xl"
                                pb={1}
                            >
                                New Password
                            </MDBTypography>
                        </Grid>
                        <Divider />
                        <Grid pt={1} px={5}>
                            <form 
                                onSubmit={formik.handleSubmit} 
                                noValidate
                                autoComplete="off"
                            >
                                <Grid mb={2}>
                                    <InputLabel>
                                        <MDBTypography
                                            fontWeight="regular"
                                            fontSize="sm"
                                            lineHeight="md"
                                            textTransform="uppercase" pb={1}
                                        >
                                            Password
                                        </MDBTypography>
                                    </InputLabel>
                                    <MDBInput 
                                        type="password" 
                                        placeholder="Enter password"
                                        id="password"
                                        name="password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                        helperText={formik.touched.password && formik.errors.password}
                                     />
                                </Grid>
                                <Grid sx={{ mt: 2, mb: 5 }}>
                                    <p style={{ color: "#d50000", fontSize: 12, fontWeight: "14",marginBottom:"4px"}}>
                                        {errorMsg}
                                    </p>
                                    <MDBButton
                                        size="inherit"
                                        variant="contained"
                                        color="black"
                                        bgColor="light_green"
                                        fontWeight="medium"
                                        fontSize="md"
                                        borderSize="md"
                                        type="submit"
                                        //disabled={isFormSubmit ? true : false}
                                        isLoading={isFormSubmit}
                                    >
                                        Save New Password
                                    </MDBButton>
                                </Grid>
                            </form>
                        </Grid>
                    </MDBCard>
                </Grid>
                <Grid item xs={1} sm={1.5} md={2} lg={3} xl={3} xxl={4} xel={4} xxel={4.5} el={5} />
            </Grid>
        </BiaLayout>
    )
}
