import MDBButton from 'components/MDBButton'
import MDBCard from 'components/MDBCard'
import MDBox from 'components/MDBox'
import MDBTypography from 'components/MDBTypography'
import React from 'react'
import SocialConnect from 'components/SocialConnect'
import MultipleSelect from 'components/MultipleSelect'
import {  Divider, InputLabel } from '@mui/material'
import ImageUpload from 'appcomponents/ImageUpload'
import Collaborators from 'components/Collaborators'
import AddCollaborator from 'components/AddCollaborator'
import Add from 'assets/images/icons/svg/medium/AddIcon.svg'

const content = [
  'Apparel',
  'Fitness',
  'Gaming',
  'Interactive',
  'Beauty / Cosmetics',
  'Vlogs',
  'All'
];

export default function BrandWelcome() {
  return (
    <div>
        <MDBCard sx={{p:0, ml: "auto", mr:"auto"}}>
          <MDBox sx={{height: "740px"}}>
            <MDBox  pt={6} pb={1} pl={5} pr={4}>
              <MDBTypography
                color = "white"
                fontWeight = "medium"
                fontSize = "2xl"
                lineHeightSize = "4xl"
                textTransform="capitalize"
                pb={4}
              >
                Welcome, Sam!
              </MDBTypography>
              {/* Image Upload for Add profile Image */}
              <ImageUpload 
                ButtonText = "Add Profile Image"
                Icon = {Add}
              />
              <MDBox>
                {/* Social Connecting platforms For Instagram, Tiktok & Youtube */}
                <SocialConnect/>
              </MDBox>

              <MDBox>
                {/* Multiple Select dropdown with Delete Chips */}
                <InputLabel sx={{mt: 2,mb:1 }}>
                  <MDBTypography 
                    fontWeight="medium"
                    fontSize ="md"
                    lineHeight ="2xl"
                  > 
                   What type of content do you make?
                  </MDBTypography>

                  <MDBTypography
                    color="grayScale"
                    fontWeight="regular"
                    fontSize="sm"
                    lineHeightSize="lg"
                  >
                    Select up to 5 categories that best describe your content.
                  </MDBTypography>
                </InputLabel>
                <MultipleSelect content={content} />
                
              </MDBox>

              <MDBox mt={4}>
                {/* Collaborators Invitation*/}
                <Collaborators/>
                
                {/* Add Collaborator */}
                <AddCollaborator addText="Add Collaborators"/>
              </MDBox>
            </MDBox>
          </MDBox>
          
          {/* Card Divider */}
          <Divider/>
          <MDBox pr={5} pb={3} ml="auto">
            <MDBButton
              size="small"
              variant= "contained"
              color= "black"
              bgColor= "light_green"
              fontWeight = "medium"
              fontSize = "md"
              borderSize = "md"
              sx={{ py: 1, px: 5}} 
            >  
              Finish
            </MDBButton>
          </MDBox>
        </MDBCard>
    </div>  
  )
}
