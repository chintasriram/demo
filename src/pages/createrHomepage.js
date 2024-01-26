import CreatorLayout from "layouts/creatorLayout";
import { Button, Grid, Stack } from "@mui/material";
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import MDTypography from "components/MDTypography";
import  React,{useState} from 'react'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import InstagramIcon from '@mui/icons-material/Instagram';
import PeopleIcon from '@mui/icons-material/People';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Divider from '@mui/material/Divider';
import { Slider } from "@mui/material";

const CreaterHomepage= ()=> {

  
  const [social, setSocial] = useState("Instagram");
  
  const getValue=(e,val)=>{
  
  }
  const handleChange = (event) => {
    setSocial(event.target.value);
   };

  

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'rgba(255, 255, 255, 0.3)',
  
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  }));
  
  
  return (

    <CreatorLayout>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

        <Grid item xs={4} md={2.6}>
          <Item sx={{ mt: -0.3, borderRadius: "50px 50px ", backgroundColor:"#1C1F21" }} > 
            <Box pl={4} py={2}>
            <Stack direction="row">
            <MDTypography color="white"  variant="body2" fontWeight="bold"  >Creator Search</MDTypography>
            <Box pl={4}>
            <Button variant="outlined"   size="small" color="white">
             Apply
            </Button>
            </Box>
            </Stack>
            <Divider color="#9e9e9e" sx={{ height: 4}} />
            <MDTypography color="white" variant="body2"  fontWeight="bold">platforms</MDTypography>
            <FormControl>
            <RadioGroup  value={social} onChange={handleChange}>
               <FormControlLabel value="Instagram" control={<Radio />} label="Insatgram" />
               <FormControlLabel value="Tik Tok" control={<Radio />} label="Tik Tok" />
               <FormControlLabel value="YouTube" control={<Radio />} label="YouTube" />
               <FormControlLabel value="other" control={<Radio />} label="Other" />
             </RadioGroup>
            </FormControl>
            <Divider color="#9e9e9e" sx={{ height: 4}} />
            <Stack direction="row">
            <MDTypography color="light" variant="body2"  fontWeight="bold">Price Range per Post  </MDTypography>
            <Box pl={4}>
            <Button variant="outlined"   size="small" color="white">
             
            </Button>
            </Box>
            </Stack>
            <Box pl={3} >
            <div  style={{width:150, marin:30}}>
            <Slider backgroundColor="black" color="primary" defaultValue={2000} max={20000} step={20} 
            onChange={getValue} />
            </div>
            </Box>
            </Box>
          </Item>
         
         </Grid>
       
       
        <Grid item xs={6} md={8}>
          <MDTypography color="white">EXPLORE bia CREATOR MARKETPLACE</MDTypography>

      <Card sx={{ maxWidth: 220 }}>
          <Box sx={{ position: 'relative' }}>
           <CardMedia
          component="img"
          
          
          image="/image 6.png"
          />
        <FavoriteBorderIcon fontSize="madium" style={{ position: "absolute", top: "5px", left: "5px", color: "white", size:"small" }}/>
        <InstagramIcon fontSize="madium" style={{ position: "absolute", top: "5px", right: "5px", color: "white", size:"small" }}/>
          <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            bgcolor: 'rgba(0, 0, 0, 0.54)',
            color: 'white',
            padding: '8px',
          }}
        > 
          <MDTypography color="white" variant="subtitle" >+$300</MDTypography>
          <PeopleIcon fontSize="large"style={{ position: "absolute",  right:"44px",  color: "gray" }}/>
          <MDTypography color="white" variant="subtitle" style={{position:"absolute", right:"1px"}}>112k</MDTypography>
          </Box>
       </Box>
     </Card>
        </Grid>
      </Grid>
    </Box>
    </CreatorLayout>
  )
}

export default CreaterHomepage;