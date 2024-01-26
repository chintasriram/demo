import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'; 
import { Divider } from '@mui/material';
import CreatorWaitlist from './CreatorWaitlist';
import BrandWaitlist from './BrandWaitlist';

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

export default function WaitlistTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

  return (
    <Box sx={{ width: '100%' }}>
      <Box>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{pl: 5}} > 
          <Tab label="For Creators" {...a11yProps(0)} />
          <Tab label="For Brands" {...a11yProps(1)}   />
        </Tabs>
        <Divider sx={{m: 0, mt: "-2px", height: "2px"}}/>
      </Box>
      <TabPanel value={value} index={0} >
        <CreatorWaitlist/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <BrandWaitlist/>
      </TabPanel>
    </Box>
  );
}
