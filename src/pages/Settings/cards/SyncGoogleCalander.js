import { Divider, Grid } from '@mui/material'
import CloseButton from 'components/CloseButton'
import MDBCard from 'components/MDBCard'
import MDBTypography from 'components/MDBTypography'
import React from 'react'
import MDBButton from 'components/MDBButton'
import BiaSetting from"assets/images/icons/svg/large/BiaLogo2940.svg"
import Calender from"assets/images/icons/svg/large/GoogleCalender4040.svg"
import Arrows from"assets/images/icons/svg/medium/Arrows.svg"
import MDBox from 'components/MDBox'
import Radio from '@mui/material/Radio'
import { useState,useEffect} from 'react'
import httpService from "service/HttpService";
import {useNavigate} from 'react-router-dom';



export default function SyncGoogleCalender(props) {
    const [user, setUser] = useState(JSON.parse(window.localStorage.getItem("user")));
    const [syncCalender, setsyncCalender]=useState("null")
    const [errorMessage, setErrorMessage] = useState(false);
   
    useEffect(() => {
       getUserDetails();
         }, []);
         
     //For Navigation
  const history = useNavigate();


    //To get selected categories
    const getUserDetails = () => {
    httpService
      .getUserDetails(user.userId == undefined ? user.id : user.userId)
      .then((res) => {
        setUser(user);
      });
  };
   
    const selectHandler=(e)=>{
    setsyncCalender(e.target.value)
    
   }
   const nextHandler=(e)=>{
    history('/SyncGoogleCalenderType');
    
   }

    return(
    <div>
    <MDBCard sx={{p:0, mx:"auto", mt: "100px"}}>
        {/*Header */}
        <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            sx={{mt:4 }}
        >
            <MDBTypography 
                fontWeight="medium" 
                fontSize ="xl" 
                sx={{ml:3}}
            >
                Sync Google Calendar
            </MDBTypography>


            {/* Close Icon */}
            <CloseButton callback={props.closeCallback}/>
        </Grid>

        {/* Divider */}
        <Divider/>
        <MDBox
                

                autocomplete="off"
            >
                {/* card body */}
               
               <MDBCard borderRadius="xl" bgcolor="cardBg" sx={{  width: "450px" }}>
               <Grid sx={{ml:1}} display="flex">
               <Grid item  >    
               <img src={BiaSetting} />
               </Grid>
               <Grid item ml={2} >    
                <img src={Arrows} />
               </Grid>
               <Grid item ml={2}>    
                <img src={Calender} />
               </Grid>
               <Grid item ml={32} pb={2}>    
               <Radio
               value="BiaToGoogle"
               checked={syncCalender==="BiaToGoogle"}
               onChange={selectHandler}/>
               </Grid>

             </Grid>    
             <Grid container>
                <Grid>
                <MDBTypography
                color="white"
                fontWeight="Medium"
                fontSize="md"
                lineHeightSize="2xxl"
                mt={0.5}
              >
                Sync bia events to Google Calendar
              </MDBTypography>
                </Grid>
                <Grid>
                <MDBTypography
                color="grayScale"
                fontWeight="regular"
                fontSize="sm"
                lineHeightSize="2xxl"
                mt={0.5}
              >
                Events created in bia will automatically synced to Google Calendar
              </MDBTypography>
                </Grid>
             </Grid>
            </MDBCard>

            <MDBCard borderRadius="xl"  bgcolor="cardBg" sx={{  width: "450px" }}>
               <Grid sx={{ml:1}} display="flex">
               <Grid item  >    
               <img src={Calender} />
               </Grid>
               <Grid item ml={2} >    
                <img src={Arrows} />
               </Grid>
               <Grid item ml={2}>    
                <img src={BiaSetting} />
               </Grid>
               <Grid item ml={32} pb={2}>    
                <Radio
                value="GoogleToBia"
                checked={syncCalender==="GoogleToBia"}
                onChange={selectHandler}/>
               </Grid>

             </Grid>    
             <Grid container>
                <Grid>
                <MDBTypography
                color="white"
                fontWeight="Medium"
                fontSize="md"
                lineHeightSize="2xxl"
                mt={0.5}
              >
                Sync Google Calendar events to bia
              </MDBTypography>
                </Grid>
                <Grid>
                <MDBTypography
                color="grayScale"
                fontWeight="regular"
                fontSize="sm"
                lineHeightSize="2xxl"
                mt={0.5}
              >
                Events created in bia will automatically synced to Google Calendar
              </MDBTypography>
                </Grid>
             </Grid>
               

                 </MDBCard>
                 
                {/* Bottom Divider */}
                <Divider/>

                {/* Footer */}
                <Grid  container  px={2} pb={2}>
                    <Grid ml="auto">

                        <MDBButton
                            size = "medium"
                            variant= "contained"
                            color= "black"
                            bgColor= "light_green"
                            fontWeight = "bold"
                            fontSize = "md"
                            borderSize = "md"
                            disabled={syncCalender ==="null"}
                            onClick={(e)=>nextHandler(e)}
                        >
                            Next
                        </MDBButton>
                        <MDBox py={1}>
                    {errorMessage? 
                    <p style={{color:'#d50000', fontSize:12, fontWeight:'14'}}>
                    {errorMessage} 
                    </p>
                    :<></>} 
                    </MDBox>
                    
                    </Grid>
                </Grid>
            </MDBox>
        </MDBCard>
        </div>
)
}
