import React from 'react'
import MDBTypography from 'components/MDBTypography'
import ActiveLayer from "assets/images/ImagesSvg/NotificationComingsoon.svg";
import { Grid } from '@mui/material';

export default function Notifications() {
    return (
        // <div>
        //     <MDBCard
        //         borderRadius = "xl"
        //         bgcolor = "cardBg"
        //         sx={{p:0,  m: 0, width: "100%"}}
        //     >
        //         <Grid container sx={{pt: 3, pb: 0.5, px: 2}} justifyContent="space-between">
        //             <Grid item>
        //                 <MDBTypography
        //                     color = "white"
        //                     fontWeight = "medium"
        //                     fontSize = "xl"
        //                     lineHeightSize = "2xxl"
        //                     px={1.5} py={1}
        //                 >
        //                     Notifications
        //                 </MDBTypography>
        //             </Grid>
        //             <Grid item>
        //                 <MDBButton
        //                     size="small"
        //                     variant= "contained"
        //                     color= "black"
        //                     bgColor= "light_green"
        //                     fontWeight = "bold"
        //                     fontSize = "md"
        //                     borderSize = "md"
        //                     sx={{py: 1.2}}
        //                     disabled
        //                 >
        //                     Save Changes
        //                 </MDBButton>
        //             </Grid>
        //         </Grid>

        //         <Divider/>


        //         <MDBox sx={{pt: 1, px: 3, pb: 5}}>
        //             <FormGroup>
        //                 <MDBTypography
        //                     color = "white"
        //                     fontWeight = "medium"
        //                     fontSize = "md"
        //                     lineHeightSize = "2xl"
        //                     pb={2}
        //                 >
        //                     Receive notifications for
        //                 </MDBTypography>
        //                 <FormControlLabel 
        //                     control={<Checkbox defaultChecked/>} 
        //                     label={
        //                         <MDBTypography
        //                             fontSize = "md"
        //                         >
        //                             Calendar updates
        //                         </MDBTypography>
        //                     } 
        //                 />
        //                 <FormControlLabel 
        //                     control={<Checkbox />} 
        //                     label={
        //                         <MDBTypography
        //                             fontSize = "md"
        //                         >
        //                             Goals
        //                         </MDBTypography>
        //                     } 
        //                 />
        //                 <FormControlLabel 
        //                     control={<Checkbox />} 
        //                     label={
        //                         <MDBTypography
        //                             fontSize = "md"
        //                         >
        //                             Messages
        //                         </MDBTypography>
        //                     } 
        //                 />
        //                 <FormControlLabel 
        //                     control={<Checkbox />} 
        //                     label={
        //                         <MDBTypography
        //                             fontSize = "md"
        //                         >
        //                             Proposals
        //                         </MDBTypography>
        //                     } 
        //                 />
        //                 <FormControlLabel 
        //                     control={<Checkbox />} 
        //                     label={
        //                         <MDBTypography
        //                             fontSize = "md"
        //                         >
        //                             Reminders
        //                         </MDBTypography>
        //                     } 
        //                 />
        //             </FormGroup>
        //         </MDBox>
        //     </MDBCard>
        // </div>
        <Grid
            container
            sx={{
                height: "394px",
                borderRadius: "12px",
                background: `url(${ActiveLayer})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
            }}
        >
            <Grid
                container
                justifyContent="center"
                alignContent="center"
                sx={{
                    background: `rgba(17, 19, 21, 0.8)`,
                    width: "inherit",
                    backdropFilter: "blur(3px)",
                    borderRadius: "12px",
                    border: "1px solid #3B3D40",
                }}
            >
                <MDBTypography
                    color="grayScale"
                    fontWeight="medium"
                    fontSize="md"
                    lineHeightSize="xxl"
                    px={3}
                >
                    Coming Soon
                </MDBTypography>
            </Grid>
        </Grid>
    )
}
