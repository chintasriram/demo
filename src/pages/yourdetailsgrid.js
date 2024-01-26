import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ChatIcon from '@mui/icons-material/Chat';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import BrandingWatermarkRoundedIcon from '@mui/icons-material/BrandingWatermarkRounded';


export default function BasicCard() {
  return (
    <Card 
      sx={{borderRadius:2 ,maxWidth:345}}  
      backgroundColor={'#BBDCD2'}
    >
      <CardContent 
        className="box" 
        sx={{minHeight:310}}
      >
          <Typography 
            ml={3} 
            fontSize={18} 
            mr={24.5} 
            fontWeight={500}
          >
            Your Focus
          </Typography>
          <Avatar 
            className='chatcon' 
            sx={{backgroundColor:'black',borderRadius:'-100px'}} 
            ml={19.9} 
          >
            <ChatIcon fontSize='small'  />
          </Avatar>
          <Box 
            component="div" 
            sx={{ whiteSpace: 'normal' }}
          >
            <Typography  
              fontSize={16} 
              ml={8.9} mt={-4.4} 
              opacity={0.8}
            >  
              Unread messages you should consider clearing your inbox
            </Typography> 
          </Box>  

          <Box 
            sx={{ borderTop: 1,visibilty:'visible',borderWidth:3 }} 
            color={'#a5c6bd'} 
            mt={1.9}  
            fullWidth className='border'
          />
          <Avatar 
            className='chatcon2' 
            sx={{backgroundColor:'black'}}
          >
            <FlagRoundedIcon fontSize='small' />
          </Avatar>
          <Box 
            component="div" 
            sx={{ whiteSpace: 'normal' }} 
          >
            <Typography  
              fontSize={16} 
              ml={8.9} mt={-2.4} 
              opacity={0.8}
            >
              Youtube campaign with Robolox has deadlines approaching
            </Typography> 
          </Box>

          <Box 
            sx={{ borderTop: 1,visibilty:'visible',borderWidth:3 }} 
            color={'#a5c6bd'} 
            mt={2.9} 
            fullWidth 
            className='border'
          />
          <Avatar 
            className='chatcon3' 
            sx={{backgroundColor:'black'}}
          >
            <BrandingWatermarkRoundedIcon fontSize='small' />
          </Avatar>
          <Typography 
            fontSize={16} 
            ml={9.5} mt={-2.4} 
            opacity={0.8}
          >
            Brand outreach emails have not been answered in 7 or more days; 
            click here to reach out
          </Typography>                                       
      </CardContent>
    </Card>
  );
}