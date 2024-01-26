import MDBCard from 'components/MDBCard'
import MDBTypography from 'components/MDBTypography'
import React from 'react'
import { Grid } from '@mui/material'
import MDBButton from 'components/MDBButton'

export default function RemoveImage(props) {
    
    const removeImage=()=>{
       props.conformatioCallback(true);
    }

    // Onclose handle for Edit About You
    const onCloseHandle = (e)=>{
        e?.preventDefault()
        props.conformatioCallback(false);
   
    }
return(

    <Grid
    container
    alignContent="center"
    justifyContent="center"
    style={{ minHeight: "100vh" }}
>
    <Grid sx={{p:0, width:"550px"}}> 
        <MDBCard 
            borderRadius = "xl"
            bgcolor = "light"
            sx={{boxShadow :"0px 4px 24px rgba(0, 0, 0, 0.48)"}}
        >
            <Grid  sx={{pt: 3, px: 1 , textAlign : "center"}}>
                
                <MDBTypography
                    color = "white"
                    fontWeight = "medium"
                    fontSize = "2xl"
                    lineHeightSize = "4xl"
                >
                   Do you want to Remove Profile Image?
                </MDBTypography>
                <Grid spacing={6} sx={{pt: 3,pb: 4, px: 4 , textAlign : "center"}}>
                 <MDBButton   
                 variant="contained" 
                 color="black" 
                 bgColor="light_green" 
                 component="span"
                 fontWeight = "bold"
                 fontSize = "md"
                 borderSize = "md"
                  sx={{alignSelf : "center", py: "7px", px:1, ml: 1}}
                  onClick={removeImage}
                  
                   >
                    Yes
                </MDBButton>
                <MDBButton   
                  variant="contained" 
                  color="black" 
                  bgColor="light_green" 
                  component="span"
                  fontWeight = "bold"
                  fontSize = "md"
                  borderSize = "md"
                  sx={{alignSelf : "center", py: "7px", px:1, ml: 1}}
                  onClick={(e)=>{onCloseHandle(e)}}
                   >
                    No
                </MDBButton>
                </Grid>

            </Grid>
        </MDBCard>
    </Grid>  
</Grid>
)
}
