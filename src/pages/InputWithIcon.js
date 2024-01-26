import * as React from "react";
import Wave from "../assets/images/icons/wave.png";
import Arrow from "../assets/images/icons/Arrow_Right.png";
import InputAdornment from "@mui/material/InputAdornment";
import MDBox from "components/MDBox";
import MDBInput from "components/MDBInput";
import MDBTypography from "components/MDBTypography";


export default function InputWithIcon() {
  return (
    <MDBox  m={2}>
      <MDBInput
        placeholder="Introduce yourself..."
        multiline
        InputProps={{
          startAdornment: (
            <InputAdornment 
              position="start"  
              sx={{marginBottom : "22px", marginLeft : "24px", display: "flex", alignSelf: "flex-end"}}>
              <MDBTypography 
                component = "img"
                src={Wave} 
                alt='Wave'
              />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment 
              position="end" 
              sx={{marginBottom : "22px", marginRight : "6px", display: "flex", alignSelf: "flex-end"}}>
              <MDBTypography
                component = "img"
                src={Arrow} 
                alt='Arrow' 
              />
            </InputAdornment>
          ),
        }}
      />  
    </MDBox>
  );
}
