import { Divider, Grid } from '@mui/material'
import CloseButton from 'components/CloseButton'
import BasicSelect from 'components/AdvancedDropdown'
import MDBButton from 'components/MDBButton'
import MDBCard from 'components/MDBCard'
import MDBInput from 'components/MDBInput'
import MDBTypography from 'components/MDBTypography'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import httpService from 'service/HttpService'
import { toast } from 'react-toastify'
import { Country, State, City }  from 'country-state-city';
import toastIcon from 'assets/images/icons/svg/medium/ToastSuccess.svg'

const validationSchema = yup.object({
    address1: yup
      .string()
      .required('Address 1 is required')
      .min(4,'Address 1  Must be atleast 4 characters')
      .max(40,'Address 1  Must have upto 40 characters')
      .matches(/^[a-zA-Z0-9_]+.*$/,'First character should be Alphabet'), 
    postalCode: yup
      .string()
      .required('Postal Code is required')
      .min(4,'Postal Code Must be atleast 4 characters')
      .max(10,'Postal Code max 10 characters'),
    city: yup
    .string()
    .required('City is required')
    .matches(/^[a-zA-Z0-9_]+.*$/,'Please select city'), 
    country: yup
    .string()
    .required('Country is required')
    .matches(/^[a-zA-Z0-9_]+.*$/,'Please select Country'), 
    state: yup
    .string()
    .required('State is required')
    .matches(/^[a-zA-Z0-9_]+.*$/,'Please select State'), 

});

export default function AddGiftingAddress(props) {
    //Configure the Toast
    toast.configure();
    const countries = Country.getAllCountries();
    let updatedCountries = countries.map((country) => ({
        label: country.name,
        value: country.isoCode
      })); 
    const [isFormSubmit, setIsFormSubmit] = useState(false)
    const [selectedCountry, setSelectedCountry] = useState("0")
    const [selectedState, setSelectedState] = useState("0")
    const [selectedCity, setSelectedCity] = useState("0")
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    useEffect(() => {
        let statesResult = [];
        //Country
        if(props?.giftingAddress?.country !== undefined){
            setSelectedCountry(props?.giftingAddress?.country)
        }

        //State
        if(props?.giftingAddress?.state !== undefined){
            statesResult = updateStates(props?.giftingAddress?.country); 
            setSelectedState(props?.giftingAddress?.state)
        }
         //State
         if(props?.giftingAddress?.city !== undefined){
            updateCitiesByStates(props?.giftingAddress?.state,statesResult);
            setSelectedCity(props?.giftingAddress?.city)
        }
    }, [props.giftingAddress])
    

    const formik = useFormik({
        initialValues: {
            address1:  (props?.giftingAddress?.address1 )?(props?.giftingAddress?.address1 ): "",
            address2:  (props?.giftingAddress?.address2 )?(props?.giftingAddress?.address2 ): "",
            city:  (props?.giftingAddress?.city )?(props?.giftingAddress?.city ): "",
            country :  (props?.giftingAddress?.country )?(props?.giftingAddress?.country ): "",
            state :  (props?.giftingAddress?.state )?(props?.giftingAddress?.state ): "",
            postalCode:  (props?.giftingAddress?.postalCode )?(props?.giftingAddress?.postalCode ): "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setIsFormSubmit(true)
            if(selectedCountry !== "0" && selectedState !== "0"){
                // Check id
                if(props?.giftingAddress?.id !== undefined && props?.giftingAddress?.id !== null){
                    //Update Gifting Address by id
                    updateRatesGiftingAddress(props.giftingAddress.id, values)
                }else{
                    //Create Gifting Address integration
                    createRatesGifting(values);
                } 
            }
        },
    });

    //Country List
    const selectCountry = ["America", "USA", "UK", "India"]

    //State List
    const selectState = ["AP", "KN", "MD", "GU"]
    
    //Countries dropdown onchange callback
    const selectCountryOnchangeCallback = (countryVal)=>{ 
        setIsFormSubmit(false)
        if(countryVal !== undefined && countryVal !== null){
            setSelectedCountry(countryVal)
        }
       updateStates(countryVal);
       setSelectedState("");
       setSelectedCity("");
       formik.setFieldValue("country",countryVal);
    }
    const updateStates = (countryVal) => {
        var sCountry = updatedCountries.find(item => item.label === countryVal); 
        let statelist = State.getStatesOfCountry(sCountry.value);
        const updatedStates = statelist.map((state) => ({
            label: state?.name,
            value: state?.isoCode,
            countryCode:state?.countryCode
          })); 
        setStates(updatedStates);
        return updatedStates;
    }

    //Region/State onchange callback
    const selectStateOnchangeCallback= (stateVal)=>{
        setIsFormSubmit(false)
        if(stateVal !== undefined && stateVal !== null){
            setSelectedState(stateVal)
        }
        setSelectedCity("");
        updateCities(stateVal);
        formik.setFieldValue("state",stateVal); 
    }
    const updateCities = (stateVal) => {
        var sState = states.find(item => item.label === stateVal); 
        let cityList = City.getCitiesOfState(sState.countryCode,sState.value);
        let updatedCities = cityList.map((city) => ({
            label: city?.name,
            value: city?.isoCode
          }));  
        setCities(updatedCities);
    }

    const updateCitiesByStates = (stateVal,stateList) => {
        var sState = stateList.find(item => item.label === stateVal); 
        let cityList = City.getCitiesOfState(sState.countryCode,sState.value);
        const updatedCities = cityList.map((city) => ({
            label: city?.name,
            value: city?.isoCode
          }));  
        setCities(updatedCities);
    }

    //Region/State onchange callback
    const selectCityOnchangeCallback= (cityVal)=>{
        setIsFormSubmit(false)
        if(cityVal !== undefined && cityVal !== null){
            setSelectedCity(cityVal)
        }
        formik.setFieldValue("city",cityVal);

    }

    // Create Gifting address
    const createRatesGifting =(values)=>{
        let user = getUserFromSession();
        if(user !== null && props?.mediakitId !== undefined && props?.mediakitId !== "" && props?.mediakitId!== null){
            setIsFormSubmit(true)
            let createGiftingReq = {
                "userId": user?.id,
                "clientId":user?.clientId,
                "mediakitId": props?.mediakitId,
                "address1": values?.address1?.trim(),
                "address2": values?.address2?.trim(),
                "city": selectedCity,
                "postalCode": values?.postalCode,
                "country": selectedCountry,
                "state": selectedState
            }

            httpService.createRatesGiftingAddress(createGiftingReq).then((res)=>{
                if(res !== undefined && res !== null && res?.data?.success && res?.data?.success === true){
                    setIsFormSubmit(false);

                    // Success Message
                    toast.success("Gifting address created successfully", {position: toast.POSITION.TOP_LEFT,
                        hideProgressBar: true, icon:<img src={toastIcon} />});

                    //close popup
                    props.closeCallback(true);
                }else{
                    setIsFormSubmit(false);

                    // Throw error
                    toast.error(res.data.message, {position: toast.POSITION.TOP_LEFT,hideProgressBar: true});
                }
            }).catch((error)=>{
                //close popup
                props.closeCallback(false);

                setIsFormSubmit(false);
                // Throw error
                toast.error("Unable to created the Gifting address. Please try again", {position: toast.POSITION.TOP_LEFT,hideProgressBar: true});
            })
        }
    }


    // Update Gifting Address
    const updateRatesGiftingAddress =(id,values)=>{
        if(values !== undefined){
            setIsFormSubmit(true)

            let updateGiftingAddressReq = {
                "address1": values.address1?.trim(),
                "address2": values.address2?.trim(),
                "city": selectedCity,
                "postalCode": values.postalCode,
                "country": selectedCountry,
                "state": selectedState
            }

            //Update package
            httpService.updateRatesGiftingAddressById(id, updateGiftingAddressReq).then((res)=>{
                if(res !== undefined && res !== null && res?.data?.success && res?.data?.success === true){
                    setIsFormSubmit(false);

                    // Success Message
                    toast.success("Gifting Address updated successfully", {position: toast.POSITION.TOP_LEFT,hideProgressBar: true, icon:<img src={toastIcon} />});

                    //close popup
                    props.closeCallback(true);
                }else{
                    setIsFormSubmit(false);

                    // Throw error
                    toast.error( res.data.message, {position: toast.POSITION.TOP_LEFT,hideProgressBar: true});
                }
            }).catch((error)=>{
                //close popup
                props.closeCallback(false);

                setIsFormSubmit(false);
                // Throw error
                toast.error("Unable to update the Gifting Address. Please try again", {position: toast.POSITION.TOP_LEFT,hideProgressBar: true});
            })
        }
    } 

    //Get user from session
    const getUserFromSession = () => {
        if(window.localStorage.getItem("user")){
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
        <MDBCard sx={{p:0, mx:2, my: 10}}>
            {/*Header */}
            <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                sx={{mt:4, px:3 }}
            >
                <MDBTypography 
                    fontWeight="medium" 
                    fontSize ="xl" 
                >
                    Add Gifting Address
                </MDBTypography>

                {/* Close Icon */}
                <CloseButton callback={props.closeCallback}/>
            </Grid>

            {/* Divider */}
            <Divider/>
            
            <Grid
                component = "form"
                onSubmit={formik.handleSubmit}
                autocomplete="off"
            >
                {/* card body */}
                <Grid sx={{py: 2, px: 5}}>
                    <Grid container mb={3}>
                        <MDBTypography
                            color="white"
                            fontSize = "md"
                            fontWeight ="medium"
                            lineHeight = "2xl"
                        >
                            Where do you want gifts sent?
                        </MDBTypography>
                    </Grid>
                
                    <Grid container columnSpacing={2}>
                        <Grid item mb={1}>
                            <MDBTypography
                                color="white"
                                fontSize = "xs"
                                fontWeight ="regular"
                                lineHeight = "md"
                                textTransform = "uppercase"
                            >
                                Address 1
                            </MDBTypography>
                            <MDBInput 
                                type = "text" 
                                placeholder = "123 4th Street"
                                width="222px"
                                id="address1"
                                name="address1"
                                value={formik.values.address1}
                                onChange={formik.handleChange}
                                error={formik.touched.address1 && Boolean(formik.errors.address1)}
                                helperText={formik.touched.address1 && formik.errors.address1}
                                mt={2}
                            />
                        </Grid>
                        <Grid item>
                            <MDBTypography
                                color="white"
                                fontSize = "xs"
                                fontWeight ="regular"
                                lineHeight = "md"
                                textTransform = "uppercase"
                            >
                                Address 2
                            </MDBTypography>
                            <MDBInput 
                                type = "text" 
                                placeholder = "APT 2" 
                                width="222px"
                                id="address2"
                                name="address2"
                                value={formik.values.address2}
                                onChange={formik.handleChange}
                                error={formik.touched.address2 && Boolean(formik.errors.address2)}
                                helperText={formik.touched.address2 && formik.errors.address2}
                                mt={2}
                            />
                        </Grid>
                    </Grid>
                    <Grid container mt={3}>
                        <Grid item mr={2} mb={1}>
                            <MDBTypography
                                    color="white"
                                    fontSize = "xs"
                                    fontWeight ="regular"
                                    lineHeight = "md"
                                    textTransform = "uppercase"
                                >
                                    Country
                                </MDBTypography>
                            <BasicSelect width="222px" 
                                property="Country"
                                error = {((isFormSubmit && selectedCountry ==="0" )||Boolean(formik.errors.country))}
                                 defaultValue={props?.giftingAddress?.country} placeholder="Select country" contents={updatedCountries}  basicSelectCallback={selectCountryOnchangeCallback} />
                             
                        </Grid>
                        <Grid item>
                            <MDBTypography
                                    color="white"
                                    fontSize = "xs"
                                    fontWeight ="regular"
                                    lineHeight = "md"
                                    textTransform = "uppercase"
                                >
                                    State
                                </MDBTypography>
                            <BasicSelect width="222px"  
                                property="Region / State"
                                error = {((isFormSubmit && selectedState ==="0" )||Boolean(formik.errors.state))}
                                defaultValue={props?.giftingAddress?.state} 
                                contents={states} placeholder="Region / State"  basicSelectCallback={selectStateOnchangeCallback}/>
                             
                        </Grid>
                    </Grid>
                    <Grid container my={3} columnSpacing={2}>
                        <Grid item mb={1}>
                            <MDBTypography
                                    color="white"
                                    fontSize = "xs"
                                    fontWeight ="regular"
                                    lineHeight = "md"
                                    textTransform = "uppercase"
                                >
                                    City 
                                </MDBTypography>
                            <BasicSelect width="222px" property="City"
                                error = {((isFormSubmit && selectedCity ==="0" )||Boolean(formik.errors.city))}
                                defaultValue={props?.giftingAddress?.city} contents={cities} placeholder="Select city"  basicSelectCallback={selectCityOnchangeCallback}/>
                                
                            </Grid> 
                            <Grid item >
                                <MDBTypography
                                    color="white"
                                    fontSize = "xs"
                                    fontWeight ="regular"
                                    lineHeight = "md"
                                    textTransform = "uppercase"
                                >
                                    Postal Code
                                </MDBTypography>
                                <MDBInput 
                                    type = "number" 
                                    placeholder = "92100" 
                                    width="222px"
                                    id="postalCode"
                                    name="postalCode"
                                    value={formik.values.postalCode}
                                    onChange={formik.handleChange}
                                    error={formik.touched.postalCode && Boolean(formik.errors.postalCode)}
                                    helperText={formik.touched.postalCode && formik.errors.postalCode}
                                    mt={2}
                                />
                            </Grid> 
                        </Grid>
                    
                </Grid>

                {/* Bottom Divider */}
                <Divider/>

                {/* Footer */}
                <Grid  container  px={3} pb={3}>
                    <Grid ml="auto">
                        <MDBButton
                            size = "medium"
                            variant= "contained"
                            color= "black"
                            bgColor= "light_green"
                            fontWeight = "bold"
                            fontSize = "md"
                            borderSize = "md"
                            //disabled={isFormSubmit? true : false}
                            isLoading={isFormSubmit}
                            type="submit"
                        >
                            Save
                        </MDBButton>
                    </Grid>
                </Grid>
            </Grid>
        </MDBCard>    
    </Grid>
  )
}
