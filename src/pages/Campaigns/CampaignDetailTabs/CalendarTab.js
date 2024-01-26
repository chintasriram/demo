import React, { useState } from 'react'
import { Divider, Grid, List, ListItem, ListItemText, ListItemAvatar, Avatar, Modal } from '@mui/material'
import MDBTypography from "components/MDBTypography";
import MDBButton from "components/MDBButton";
import MDBCard from "components/MDBCard";
import { useWidth } from "components/Hooks/UseWidth"
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import './CalendarStyle.css'
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Popover from '@mui/material/Popover';
import AddDeadline from '../EventsModal/AddDeadline';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pb: 4, mt: 4 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const localizer = momentLocalizer(moment)

function CalendarTab() {
  const screenSize = useWidth()[0]

  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDeadlinePopup, setOpenDeadlinePopup] = useState(false)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenDeadlinePopup = () => {
    setOpenDeadlinePopup(true)
    setAnchorEl(null)
  }

  const handleCloseDeadlinePopup = () => {
    setOpenDeadlinePopup(false)
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={8.8} xxl={9} el={10.55}>
        <Calendar
          localizer={localizer}
          // events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={3.2} el={1.4} xxl={3}>
        {/* <Grid container sx={{ borderTop: '1px solid #3B3D40', borderRight: '1px solid #3B3D40', borderBottom: '1px solid #3B3D40', background: '#1C1F21' }}>
          <Grid item sx={{ padding: '9px 10px', width: '100%' }}>
            <MDBButton
              variant="contained"
              size="small"
              bgColor="light_green"
              color="biaAssist"
              fontSize="md"
              fontWeight="bold"
              borderSize="md"
              sx={{ mr: 3 }}
              style={{ padding: '6px' }}
              type="button"
            // onClick={handleNext}
            // disabled={isFormSubmit ? true : false}
            // isLoading={isFormSubmit}
            >Send Availibility</MDBButton>
            </Grid>
            <Divider /><br/>
            <MDBTypography style={{ fontSize: '16px', color: '#FFF', fontWeight: '500', fontStyle: 'normal', lineHeight: '24px' }}>Schedule</MDBTypography>
        </Grid>*/}
        <MDBCard
          bgcolor="supaLight"
          sx={{ m: 0, p: 0, width: "inherit", }}
          style={{ borderRadius: "0", background: '#1C1F21', height: 500 }}
        >
          <MDBButton
            variant="contained"
            size="small"
            bgColor="light_green"
            color="biaAssist"
            fontSize="md"
            fontWeight="bold"
            borderSize="md"
            sx={{ mr: 3 }}
            style={{ padding: '6px', top: '12px', left: '15px' }}
            type="button"
          >Send Availibility</MDBButton>
          <Divider style={{ margin: '19px 0px' }} />
          <MDBTypography style={{ fontSize: '16px', color: '#FFF', fontWeight: '500', fontStyle: 'normal', lineHeight: '24px', padding: '15px' }}>Schedule</MDBTypography>
          <Grid item style={{padding: "0px 15px"}}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Upcoming" {...a11yProps(0)} />
              <Tab label="Completed" {...a11yProps(1)} />
            </Tabs>
            <Divider sx={{ m: 0, mt: "-2px", height: "2px" }} />
          </Grid>
          <Grid item style={{padding: "0px 15px"}}>
          <TabPanel value={value} index={0}>
            {/* Campaign Tab */}
            <p>xxxx</p>
          </TabPanel>
          <TabPanel value={value} index={1}>
            {/* Messaging Tab */}
            <p>yyy</p>
          </TabPanel>
          </Grid>
          <Divider />
          <Grid container justifyContent={'right'}>
            <MDBButton 
              variant="outlined"
                size="small"
                bgColor="black"
                color=""
                fontSize="md"
                fontWeight="bold"
                borderSize="md"
                sx={{ mr: 3 }}
                style={{ padding: '6px', top: '12px', left: '15px' }}
                type="button"
                onClick={handleClick}
                aria-describedby={id}
                >
                  Add Event
                </MDBButton>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                  >
                    <ul style={{background: "rgba(17, 19, 21, 0.88)", border: '1px solid #3B3D40', boxShadow: '0px 4px 16px 0px rgba(0, 0, 0, 0.32)', listStyle: 'none', paddingLeft: '0px', width: '180px'}}>
                      <li onClick={handleOpenDeadlinePopup}><MDBTypography sx={{ p: 1, cursor: 'pointer' }}>Deadline</MDBTypography></li>
                      <li><MDBTypography sx={{ p: 1, cursor: 'pointer' }}>Task</MDBTypography></li>
                      <li><MDBTypography sx={{ p: 1, cursor: 'pointer' }}>Meeting</MDBTypography></li>
                    </ul>
                    
                  </Popover>
                </Grid>
                <Modal 
            open={openDeadlinePopup}
            onClose={handleCloseDeadlinePopup}
            style={{display:'flex',alignItems:'center',justifyContent:'center'}}
            >
              <AddDeadline onCloseCallback={handleCloseDeadlinePopup}/>
            </Modal>
        </MDBCard>
      </Grid>
    </Grid>
  )
}

export default CalendarTab