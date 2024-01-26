import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import ClearIcon from 'assets/images/icons/svg/medium/CrossIcon.svg'
import _without from "lodash/without";
import { createStyles, makeStyles } from '@material-ui/core';
import MDBTypography from './MDBTypography';
import { useEffect } from 'react'
import MDBox from './MDBox';
import { Grid } from '@mui/material';
import categoryIcons from 'categoryIcons';

const useStyles = makeStyles((theme) =>
  createStyles({
    chip: {
      backgroundColor: "#2C3334",
      borderRadius: "8px",
      color: "#FFFFFF",
      padding: " 1px"
    },
    deleteIcon: {
      Color: "#D2D2D3",

      marginLeft: "20px",
      marginRight: "20px",
    },
    input: {
      backgroundColor: "#1C1F21",
      width: "100% !important",

      "& .MuiOutlinedInput-notchedOutline": {
        backgroundColor: "none !important",
        borderWidth: "1px",
        borderColor: "rgb(255,255,255, 0.3)",
      },
    }
  })
);

export default function MultipleSelect(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [contentNames, setContentNames] = React.useState([]);
  const [maxLimitErrMsg, setMaxLimitErrMsg] = useState("")

  useEffect(() => {
    if (props.selected !== undefined && props.selected !== null && props.selected?.length !== undefined) {
      let selectedContentTypes = [];
      // TODO: Need to remove below once categories was set
      props.selected?.map((data, idx) => {
        selectedContentTypes.push({ uuId: "", id: "", bcName: data })
      })
      setContentNames(selectedContentTypes);
    }
  }, [props.selected]);

  const handleChange = (event) => {
    setMaxLimitErrMsg("")
    let selectedValues = [];
    const {
      target: { value },
    } = event;


    // On autofill we get a stringified value.
    if (typeof value === 'string') {
      selectedValues = value.split(',')
    } else {
      selectedValues = value;
    }

    if (selectedValues?.length > 0)
      selectedValues = selectedValues.filter((v, i, a) => a.findIndex(v2 => (v2.bcName === v.bcName)) === i)

    // Check limit- max limit is 5
    if (selectedValues?.length <= 5) {
      setContentNames(selectedValues);
      // Callback 
      props?.multiSelectHandler(selectedValues)
    } else {
      setMaxLimitErrMsg("Select up to 5 categories that best describe your content")
    }
  };

  const handleDelete = (e, value) => {
    e.preventDefault();
    setMaxLimitErrMsg("")
    let updatedValues = contentNames.filter((v) => v.bcName !== value.bcName);
    setContentNames((current) => _without(current, value));
    // Callback 
    props?.multiSelectHandler(updatedValues)
  };

  return (
    <div>
      <FormControl sx={{ width: "-webkit-fill-available" }}>
        <MDBTypography
          color="white"
          fontWeight="medium"
          fontSize="md"
          lineHeightSize="2xl"
          pb={0.5}
        >
          {props.title}
        </MDBTypography>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={contentNames}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" className={classes.input} />}
          renderValue={(selected) => (
            <Grid sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, width: "100%" }}>
              {selected.map((value, idx) => (
                <Chip
                  className={classes.chip}
                  key={idx}
                  label={value.bcName}
                  icon={
                    <MDBTypography
                      component="img"
                      src={categoryIcons[value.bcName.toLowerCase().replaceAll(" ", "").replaceAll("&", "")]}
                      height="18px"
                      onMouseDown={(event) => event.stopPropagation()}
                      // style={{filter: "brightness(1.5)"}}
                    />
                  }
                  deleteIcon={
                    <MDBTypography
                      component="img"
                      src={ClearIcon}
                      width="14px"
                      height="14px"
                      onMouseDown={(event) => event.stopPropagation()}
                    />
                  }
                  onDelete={(e) => handleDelete(e, value)}
                />
              ))}
            </Grid>
          )}
        >
          {props?.content?.map((category, idx) => (
            <MenuItem
              key={idx}
              value={category}
            >
              <MDBTypography
                component="img"
                src={categoryIcons[category?.bcName.toLowerCase().replaceAll(" ", "").replaceAll("&", "")]}
                height="18px"
                style={{filter: "brightness(1.5)"}}
                pr={1}
              />
              <MDBTypography
                color="white"
                fontWeight="regular"
                fontSize="sm"
                lineHeightSize="xxl"
              >
                {category?.bcName}
              </MDBTypography>

            </MenuItem>
          ))}
        </Select>
        <MDBox mt={0.5}>
          <p
            style={{
              color: "#d50000",
              fontSize: 12,
              fontWeight: "11",
            }}
          >
            {maxLimitErrMsg}
          </p>
        </MDBox>
      </FormControl>
    </div>
  );
}

