import { Grid } from '@mui/material';
import React from 'react'
import Oura from 'assets/images/icons/Oura.png'
import ActiveCampaign1 from 'assets/images/ImagesSvg/ActiveCampaign1.svg'
import MDBTypography from 'components/MDBTypography';
import MDBInput from "components/MDBInput";
import MDBButton from 'components/MDBButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import TikTokIcon from 'assets/images/icons/social/icons_large/tiktok.png'
import ChatIcon from 'assets/images/icons/Chat_Icon.png'
import CalenderIcon from 'assets/images/icons/Calendar_Icon.png'
import StarIcon from 'assets/images/icons/Star.png'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function PastCampaigns(props) {

  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Grid container
      sx={{
        border: props?.isHome === true ? "none" : "1px solid #3B3D40",
        borderRadius: "12px", background: `#1C1F21`
      }}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Grid container justifyContent={'space-between'} alignItems={'flex-start'} alignSelf={'stretch'} px={3} py={3} borderBottom={'1px solid #8A8F93'}>
              <Grid item xs={6} sm={6} md={6} lg={6} justifyContent={'left'}>
                <MDBInput
                  type="text"
                  icon="search"
                  placeholder="Search Brand"
                  name="search"
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} justifyContent={'right'}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={10}
                    label="Age"
                  // onChange={handleChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container justifyContent={'space-between'} alignItems={'flex-start'} alignSelf={'stretch'} px={3} py={3}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <List sx={{ width: '100%', maxWidth: '100%' }}>
                  <ListItem alignItems="flex-start"
                  >
                    <ListItemSecondaryAction sx={{ top: '8%' }}>
                      <Grid container justifyContent={'space-around'} alignItems={'center'} gap={1}>
                        <Grid>
                          <MDBTypography style={{ fontSize: '14px', fontWeight: '400' }}>Completed on 09/23/22</MDBTypography>
                        </Grid>
                      </Grid>
                    </ListItemSecondaryAction>
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src={Oura} />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Oura"
                      secondary={
                        <React.Fragment>
                          <MDBTypography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            // color="text.primary"
                            style={{ fontSize: '14px', fontWeight: '400' }}
                          >
                            Create a branded Youtube short
                          </MDBTypography>
                          <MDBTypography
                            style={{ fontSize: '14px', color: '#D2D2D3', fontWeight: '400' }}>
                            Hey Sam,  great content! We're a leading wearable tech brand looking to expand our...
                          </MDBTypography>
                          <Grid container justifyContent={'flex-start'} alignItems={'center'} gap={3} mt={3} mb={2}>
                            <Grid>
                              <MDBTypography
                                style={{ fontSize: '14px', color: '#D2D2D3', fontWeight: '400' }}>
                                Type: Paid Deal
                              </MDBTypography>
                            </Grid>
                            <Grid>
                              <MDBTypography
                                style={{ fontSize: '14px', color: '#D2D2D3', fontWeight: '400' }}>
                                Platforms: <MDBTypography component="img" src={TikTokIcon} style={{width: '15px'}} />
                              </MDBTypography>
                            </Grid>
                          </Grid>

                          <Grid container>
                            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} style={{ background: 'transparent', border: '1px solid #3B3D40' }}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon fontSize='24px' style={{color: '#D2D2D3', fontSize: '20px'}} />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                              >
                                <Grid container justifyContent={'flex-start'} alignItems={'center'} gap={1}>
                                  <Grid>
                                    <Avatar alt="Remy Sharp" src={Oura} />
                                  </Grid>
                                  <Grid>
                                    <MDBTypography sx={{ width: '100%', flexShrink: 0 }}>
                                      Oura
                                    </MDBTypography>
                                  </Grid>
                                  <Grid>
                                    <MDBTypography component="img" src={StarIcon} /><MDBTypography component="img" src={StarIcon} /><MDBTypography component="img" src={StarIcon} /><MDBTypography component="img" src={StarIcon} /><MDBTypography component="img" src={StarIcon} />
                                  </Grid>
                                  <Grid>
                                    <MDBTypography>5.0</MDBTypography>
                                  </Grid>
                                </Grid>
                              </AccordionSummary>
                              <AccordionDetails >
                                <MDBTypography style={{ fontSize: '14px', color: '#D2D2D3', fontWeight: '400' }} pl={5}>
                                  We loved working with Sam. The content he produced fit our brand perfectly, I would highly recommend him to anyone.
                                </MDBTypography>
                              </AccordionDetails>
                            </Accordion>

                          </Grid>
                        </React.Fragment>
                      }
                    />

                  </ListItem>

                </List>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default PastCampaigns;