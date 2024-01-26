import {
  Divider,
  Grid,
  FormControlLabel,
 Checkbox,
} from "@mui/material";
import CloseButton from "components/CloseButton";
import MDBCard from "components/MDBCard";
import MDBTypography from "components/MDBTypography";
import React from "react";
import MDBButton from "components/MDBButton";
import MDBox from "components/MDBox";
import { useState, useEffect } from "react";
import httpService from "service/HttpService";
import BasicSelect from 'components/Dropdown';
import {useNavigate} from 'react-router-dom';


export default function SyncGoogleCalenderType(props) {
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );
  const [email, setEmail] = useState();
  const [selectedType,setSelectedType] = useState([])
  const selectCountry = ["Connect Account"]
  const syncGoogleTypes = [ { name: "Dedlines" }, { name: "Tasks" }, { name: "Meetings" }, ];
  const [synctypes, setSyncTypes] = useState([]);
  const [isFormSubmit, setIsFormSubmit] = useState(false)
  const [account,setAccount] = useState();
 
 
  useEffect(() => {
    getUserDetails();
    setSyncTypes(syncGoogleTypes);
  }, []);

  //For Navigation
  const history = useNavigate();
 
  //To get selected categories
  const getUserDetails = () => {
    httpService
      .getUserDetails(user.userId == undefined ? user.id : user.userId)
      .then((res) => {
        setUser(user);
        setEmail(res.data.data.email);
      });
  };
  
  //Multi selector checkbox handler
  const handleChange = (e) => {
     const { name,value, checked } = e.target;
    if(checked){
      setSelectedType([...selectedType, name])
    }else{
      setSelectedType(selectedType.filter((e)=> e !== name))
    }
    
  if (name === "All") {
      let tempType = synctypes.map((types) => {
        return { ...types, isChecked: checked };
      });

      setSyncTypes(tempType);
    } else {
      let tempType = synctypes.map((types) =>
        types.name === name ? { ...types, isChecked: checked } : types
      );
      setSyncTypes(tempType);
      
    }
    };

    //Select an Account 
  const OnchangeCallback =(Account)=>{
    setIsFormSubmit(false)
    if(Account !== undefined && Account !== null){
      setAccount(Account)
  }    
  }
  
  //Fi
  const finishHandler = (Account) => {
    alert(selectedType)
  };
  return (
    <div>
      {/* Notification */}
      <MDBCard
        borderRadius="xl"
        bgcolor="cardBg"
        justifyContent="space-between"
        sx={{ p: 0, m: 0, width: "540px", ml: "auto", mr: "auto", mt: 10 }}
      >
        {/* Card header */}
        <Grid container sx={{ pt: 3, pb: 0.5, px: 2 }}>
          <Grid item xs={10}>
            <MDBTypography
              color="white"
              fontWeight="medium"
              fontSize="xl"
              lineHeightSize="2xxl"
              px={1.5}
              py={1}
            >
              Sync Google Calendar
            </MDBTypography>
          </Grid>
          <Grid item xs={2}>
            {/* Close Icon */}
            <CloseButton callback={props.closeCallback} />
          </Grid>
        </Grid>

        {/* Card Divider */}
        <Divider />

        {/* Card Body */}
        <MDBox sx={{ pt: 1, px: 6, pb: 5 }}>
          <form className="form">
          
         {/* Select Account */}
         <BasicSelect width="439px" 
         defaultValue="Select Account" 
         label="Select Account"
         contents={selectCountry}  
         basicSelectCallback={OnchangeCallback} />


            <MDBox mt={2}>
             <FormControlLabel
                control={
                  <Checkbox
                  type="checkbox"
                  value="All"
                  name="All"
                  checked={
                    synctypes.filter((types) => types?.isChecked !== true)
                      .length < 1
                  }
                  onChange={handleChange}
                  />
                }
                label={
                  <MDBTypography fontSize="md">All</MDBTypography>
                }
              />
         
            {synctypes.map((types) => (
              <FormControlLabel
                control={
                  <Checkbox
                    name={types.name}
                    value={types.name}
                    checked={types?.isChecked || false}
                    onChange={handleChange}
                  />
                }
                label={
                  <MDBTypography fontSize="md">{types.name}</MDBTypography>
                }
              />
            ))}
            </MDBox>
          </form>
        </MDBox>
        

        {/* Card Divider */}

        <Divider />
        <MDBox pl={50} pb={2} sx={{ width: "540px" }}>
          <MDBButton
            size="medium"
            variant="contained"
            color="black"
            bgColor="light_green"
            fontWeight="bold"
            fontSize="md"
            borderSize="md"
            onClick={(e) => finishHandler(e)}
          >
            Finish
          </MDBButton>
        </MDBox>
      </MDBCard>
    </div>
  );
}
