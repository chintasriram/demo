import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { createStyles } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import CreatorSignup from './Signup/CreatorSignup';
import BrandSignup from './Signup/BrandSignup';

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
        <Box sx={{ p: 5 }}>
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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 2, borderColor: "#3B3D40" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"> 
          <Tab label="For Creators" {...a11yProps(0)} sx={{mx: 5}} />
          <Tab label="For Brands" {...a11yProps(1)}  sx={{mr: 33}} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <CreatorSignup/>
        {/* Hello */}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <BrandSignup/>
        {/* Hello Hello */}
      </TabPanel>
    </Box>
  );
}
