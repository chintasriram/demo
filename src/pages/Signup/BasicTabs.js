import React, {useEffect,useState} from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CreatorSignup from "./CreatorSignup";
import BrandSignup from "./BrandSignup";
import { Divider } from "@mui/material";
import {useLocation, useNavigate, useSearchParams} from 'react-router-dom'

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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const location = useLocation();
  const history = useNavigate();
  const params = new URLSearchParams(location.search);
  const [value, setValue] = React.useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Check tabIdx
    if (
      params &&
      params?.get("tabIdx") !== undefined &&
      params?.get("tabIdx") !== null
    ) {
      setValue(parseInt(params?.get("tabIdx")));
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // Check tabIdx param is exist
    removeUrlParam("tabIdx")
  };

  // Remove url param
  function removeUrlParam(paramKey){
    if (searchParams.has(paramKey)) {
      searchParams.delete(paramKey);
      setSearchParams(searchParams);
    }
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{ pl: 5 }}
        >
          <Tab label="For Creators" {...a11yProps(0)} />
          <Tab label="For Brands" {...a11yProps(1)} />
        </Tabs>
        <Divider sx={{ m: 0, mt: "-2px", height: "2px" }} />
      </Box>
      <TabPanel value={value} index={0}>
        <CreatorSignup />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <BrandSignup />
      </TabPanel>
    </Box>
  );
}
