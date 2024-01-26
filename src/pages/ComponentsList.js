import { Grid } from '@mui/material'
import AddCollaborator from 'components/AddCollaborator'
import Collaborators from 'components/Collaborators'
import DividerWithText from 'components/DividerWithText'
import ImageUpload from 'appcomponents/ImageUpload'
import React from 'react'
import Add from 'assets/images/icons/svg/medium/AddIcon.svg'
import MultipleSelect from 'components/MultipleSelect'
import PopoverCard from 'components/PopoverCard'
import SocialConnect from 'components/SocialConnect'
import SocialLogin from 'components/SocialLogin'
import WarningCard from 'appcomponents/WarningCard'
import Disconnect from 'appcomponents/Disconnect'
import BasicTabs from './Signup/BasicTabs'
import NewPassword from './Login/NewPassword'
import ResetPassword from './Login/ResetPassword'
import SignIn from './Login/SignIn'
import BrandSignup from './Signup/BrandSignup'
import CreatorSignup from './Signup/CreatorSignup'
import BrandWelcome from './Signup/BrandWelcome'
import CreatorWelcome from './Signup/CreatorWelcome'
import Signup from './Signup/Signup'
import Account from './Settings/Account'
import PaymentGateway from './Settings/PaymentGateway'
import Settings from './Settings'
import Notifications from './Settings/Notifications'


const content = [
    'Apparel',
    'Fitness',
    'Gaming',
    'Interactive',
    'Beauty / Cosmetics',
    'Vlogs',
    'All'
  ];
export default function ComponentsList() {

  return (
    <div >
        {/* Header */}
        <Grid container  m={5}>
            <Grid container my={3}>
                <AddCollaborator/>
            </Grid>
            <Grid container my={3}>
                <Collaborators/>
            </Grid>
                <DividerWithText> Hello </DividerWithText>
            <Grid container my={3}>
                <ImageUpload Icon={Add} ButtonText="Add profile Image"/>
            </Grid>
            <Grid container my={3}>
                <MultipleSelect content={content}/>
            </Grid>

            <Grid container my={3}>
                <PopoverCard/>
            </Grid>

            <Grid container my={3}>
                <SocialConnect/>
            </Grid>

            <Grid container my={3}  md={6}>
                <SocialLogin/>
            </Grid>

            <Grid container my={3}  md={6}>
                <WarningCard/>
            </Grid>

            <Grid container my={3}  md={6}>
                <Disconnect/>
            </Grid>

            <Grid container my={3}  md={6}>
                <BasicTabs/>
            </Grid>

            <Grid container my={3}  md={6}>
                <NewPassword/>
            </Grid>

            <Grid container my={3}  md={6}>
                <ResetPassword/>
            </Grid>

            <Grid container my={3}  md={6}>
                <SignIn/>
            </Grid>

            <Grid container my={3}  md={6}>
                <BrandSignup/>
            </Grid>

            <Grid container my={3}  md={6}>
                <CreatorSignup/>
            </Grid>

            <Grid container my={3}  md={6}>
                <BrandWelcome/>
            </Grid>

            <Grid container my={3}  md={6}>
                <CreatorWelcome/>
            </Grid>

            <Grid container my={3}  md={6}>
                <Signup/>
            </Grid>

            <Grid container my={3}  md={6}>
                <Account />
            </Grid>

            <Grid container my={3}  md={6}>
                <Notifications/>
            </Grid>


            <Grid container my={3} md={6}>
                <PaymentGateway/>
            </Grid>

            <Grid container my={3}  md={6}>
                <Settings/>
            </Grid>

        </Grid>
    </div>
  )
}
