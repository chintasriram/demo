import React,{useEffect,useState,useRef} from 'react'

import { Divider,Grid, InputLabel } from '@mui/material'
import DragandDrop from 'components/DragandDrop'
import MDBButton from 'components/MDBButton'
import MDBCard from 'components/MDBCard'
import MDBInput from 'components/MDBInput'
import MDBox from 'components/MDBox'
import MDBTypography from 'components/MDBTypography'
import MultipleSelect from 'components/MultipleSelect'
import httpService from 'service/HttpService'
import * as yup from 'yup'
import { useFormik } from 'formik'
import {toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const content = [
    'Apparel',
    'Fitness',
    'Gaming',
    'Interactive',
    'Beauty / Cosmetics',
    'Vlogs',
    'All'
  ];
export default function CreateMediaKit() {
    const [categories, setCategories]= useState();
    const [contentTypes, setContentTypes] = useState("");
    const [isFormSubmit, setIsFormSubmit] = useState(false);
    const contentTypeRef = useRef(null)

    //Configure the Toast
    toast.configure();

    let history = useNavigate();
    
    useEffect(() => {
        setIsFormSubmit(false);
        //Get Categories
        getCategories();
    }, []);

    // Formik handlers
    const formik = useFormik({
        //Initial values
        initialValues: {
          location:"",
          age:"",
          bio:"" ,
          bioHanlder:""
        },
        //validation schema
        validationSchema: yup.object({}),
        //On submit handler
        onSubmit: (values) => {
            // Get user from session
            let user = getUserFromSession();
            setIsFormSubmit(true);
            if(user!==null && user!==undefined && values!==undefined && contentTypes!==""){
                // Save the Media Kit
                let req = {
                    userId: user.id,
                    "clientId": user?.clientId,
                    "imageUrl": "",
                    "location": values?.location,
                    "contentType": contentTypes,
                    "age": values?.age,
                    "bio": values?.bio,
                    "bioHandler": values?.bioHanlder
                }
                saveMediaKit(req);
            }else{
                if(contentTypes === "" && contentTypeRef?.current){
                    contentTypeRef?.current?.scrollIntoView();
                }
            }
        },
    });

    //Get user from session
    const getUserFromSession = () => {
        if(window.localStorage.getItem("user")){
        let userInfo = JSON.parse(window.localStorage.getItem("user"));
        return userInfo;
        }
        return null;
    };

    //multiselect handler
    const multiSelectHandler=(selectedCts)=>{
        setIsFormSubmit(false)
        if(selectedCts?.length>0){
            setContentTypes(selectedCts?.join(","));
        }
    }
    
    //Get Categories
    const getCategories=()=>{
        httpService.brandCategories().then((res)=>{
            if(res?.data?.data !== null && res?.data?.data !== undefined && res?.data?.data?.length>0){
                setCategories(res.data.data)
            }
        })
    }

    // Save Media Kit
    function saveMediaKit(req){
        httpService.saveMediaKit(req).then((res)=>{
            setIsFormSubmit(false);
            if(res!==undefined && res?.data!==undefined && res?.data!==null && res?.data?.success !== undefined){
                if(res?.data?.success===true){
                    toast.success("Media kit saved successfully", {position: toast.POSITION.TOP_LEFT,hideProgressBar: true});
                    
                    //Redirect to media-kit page
                    history("/media-kit")
                }else{
                    // Throw error
                    toast.error("Unable to save Mediakit. Please try again", {position: toast.POSITION.TOP_LEFT,hideProgressBar: true});
                }
            }
        }).catch((error)=>{
            setIsFormSubmit(false);
            // Throw error
            toast.error("Unable to save Mediakit. Please try again", {position: toast.POSITION.TOP_LEFT,hideProgressBar: true});
        })
    }

    return (
        <div>
            <MDBCard sx={{px:0,my:8, mx:"300px"}}>
                <Grid
                    container   
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{display : "flex" ,mt:4 }}>
                    <MDBTypography 
                        fontWeight="medium" 
                        fontSize ="xl" 
                        lineHeight = "2xxl"
                        sx={{ml:3}}
                    >
                        About You
                    </MDBTypography>
                    <MDBTypography 
                        fontWeight="regular" 
                        fontSize ="md" 
                        color= "light_green" 
                        lineHeight ="2xl"
                        sx={{mr: 3}}
                    >
                        1/3
                    </MDBTypography>
                </Grid>

                <Divider />

                <Grid>
                    <MDBTypography                         
                        fontWeight="medium" 
                        fontSize ="md"
                        lineHeight ="2xl"
                        sx ={{ml:5, mt :5}}
                    >
                        Media Kit Image
                    </MDBTypography>
                    
                    {/* Drag and Drop Image */}
                    <DragandDrop sx={{ml :5}} />

                    <MDBTypography 
                        fontWeight="regular" 
                        fontSize ="md" 
                        color= "light_green"
                        lineHeight = "2xl"
                        sx ={{ml:5, mb :2}}

                    >
                        Use Profile Image
                    </MDBTypography>
                </Grid>
                <div ref={contentTypeRef}>
                    <MDBox sx ={{ml :5}}>
                        <MDBTypography                         
                            fontWeight="regular" 
                            fontSize ="md"
                            lineHeight ="2xl"
                            sx ={{mt : 2,mb:2.5}}
                        >
                            Content Type
                        </MDBTypography>
                            <MultipleSelect 
                                
                                content= {categories}
                                multiSelectHandler={multiSelectHandler}
                            />
                            {
                                (isFormSubmit===true && contentTypes === "") && 
                                <MDBTypography  style={{color:'#ff4d4d', fontSize:12, fontWeight:'14'}} pt={1}>
                                    Please select atleast one content type
                                </MDBTypography> 
                            }
                    </MDBox>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <MDBox sx ={{px :5}}>
                        <MDBTypography 
                            fontWeight="medium" 
                            fontSize ="md"
                            lineHeight ="2xl"
                            sx={{mt:4.3,mb: 1}}
                        >
                            About you
                        </MDBTypography>

                        <InputLabel  sx={{mt:1 ,mb:1}}>
                            <MDBTypography 
                                fontWeight="regular" 
                                fontSize ="xs"
                                lineHeight ="md"

                            > 
                                LOCATION
                            </MDBTypography>
                        </InputLabel>
                        <MDBInput 
                            type = "text" 
                            placeholder = " Enter a City" 
                            sx={{mb:2 }} 
                            id="location"
                            name="location"
                            value={formik.values.location}
                            onChange={formik.handleChange}
                            error={formik.touched.location && Boolean(formik.errors.location)}
                            helperText={formik.touched.location && formik.errors.location}
                        />

                        <InputLabel sx={{mt: 2,mb:1 }}>
                            <MDBTypography 
                                fontWeight="regular"
                                fontSize ="xs"
                                lineHeight ="md"
                            > 
                            AGE
                            </MDBTypography>
                        </InputLabel>
                        <MDBInput 
                            type = "number" 
                            placeholder = "Age" 
                            sx={{mb: 2}}
                            id="age"
                            name="age"
                            value={formik.values.age}
                            onChange={formik.handleChange}
                            error={formik.touched.age && Boolean(formik.errors.age)}
                            helperText={formik.touched.age && formik.errors.age}
                        />

                        <InputLabel sx={{mt:2 ,mb:1 }}>
                            <MDBTypography 
                                fontWeight="regular" 
                                fontSize ="xs"
                                lineHeight ="md"
                            > 
                                BIO
                            </MDBTypography>
                        </InputLabel>
                        <MDBInput 
                            type = "textarea" 
                            placeholder = "Enter your bio here"  
                            multiline
                            rows={4}
                            id="bio"
                            name="bio"
                            value={formik.values.bio}
                            onChange={formik.handleChange}
                            error={formik.touched.bio && Boolean(formik.errors.bio)}
                            helperText={formik.touched.bio && formik.errors.bio}
                        />
                        <InputLabel sx={{mt:2 ,mb:1 }}>
                            <MDBTypography 
                                fontWeight="regular" 
                                fontSize ="xs"
                                lineHeight ="md"
                            > 
                                BIO HANDLER
                            </MDBTypography>
                        </InputLabel>
                        <MDBInput 
                            type = "text" 
                            placeholder = "Bio Handler"  
                            id="bioHandler"
                            name="bioHandler"
                            value={formik.values.bioHandler}
                            onChange={formik.handleChange}
                            error={formik.touched.bioHandler && Boolean(formik.errors.bioHandler)}
                            helperText={formik.touched.bioHandler && formik.errors.bioHandler}
                        />
                    </MDBox>

                    <Divider/>
                    {/* boderRadius pending and fonts styles */}
                    <Grid               
                        container   
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{mb:3}}
                    >
                        <MDBTypography 
                            fontWeight="regular" 
                            fontSize ="md" 
                            color= "light_green" 
                            lineHeight ="2xl"
                            sx={{ml:3}}
                        >
                            1/5
                        </MDBTypography>
                        <MDBButton 
                            type="submit"
                            variant = "contained"
                            size = "small"
                            bgColor = "light_green"
                            color = "biaAssist"     
                            fontSize = "md"
                            fontWeight ="bold"
                            borderSize = "lg"
                            sx={{mr : 3, px:3, py:1.5}}
                            lineHeight = "2xl"
                            disabled={isFormSubmit?true:false}
                        >
                            Next
                        </MDBButton>
                    </Grid>
                </form>
            </MDBCard>   
        </div>
    )
}
    