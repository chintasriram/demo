import React, { useState, useEffect} from "react";
import MDBox from "components/MDBox";
import Chip from "@mui/material/Chip";
import MDBTypography from "components/MDBTypography";
import MDBInput from "components/MDBInput";
import { Grid} from "@mui/material";
import { createStyles, makeStyles } from "@material-ui/core";
import { useTheme } from "@mui/material/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    input: {
      backgroundColor: "#3B3D40",
      color: "#D2D2D3",
      width: "100%",
      border: "none",
      padding: "0 0 4px 8px",
      "& fieldset": { border: "none" },
    },
  })
);

export default function MultiChip(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState("");
  const [chips, setChips] = useState([]);

  useEffect(() => {
    setChips(props?.data);
  }, [props.data])

  /**
   * Check keydown event
   * @param {} e
   */
  const checkKeyDown = (e) => {
    //Check key code- on Enter and space
    if (e?.keyCode && e?.keyCode == 13) {
      //Create callbackt
      addItem(e.target.value);
      setValue("");
    }
  };

  // Chip delete event handler
  const deleteChipHandler = (name) => {
    if (chips?.length !== undefined && chips?.length > 0) {
      let newChips = chips?.filter((im) => im !== name);
      setChips(newChips);
      props.onChangeCallback(newChips);
    }
    setValue("");
  };

  //Create chip handler
  const createChipHandler = (e) => {
    if (e.target.value && e.target.value !== "") {
      //Create callback
      addItem(e.target.value);
      setValue("");
    }
  };

  const addItem = (item) => {
    if (item.trim() === "") return;
    // Check email is valid or not
    let isValid = true;
    if (props?.validate) {
      isValid = props.validate(item);
    }
    let isExist = isChipExist(item);
    if (isValid && isExist === false) {
      let newChips = [...chips, item.trim()];
      setChips(newChips);
      props.onChangeCallback(newChips);
    } else {
      //Throw error message
      if (isExist) {
        props.onErrorCallback(props.label+" is already taken. Try another one");
      } else {
        props.onErrorCallback("Enter valid "+props.label);
      }
    }
  };

  /**
   * Check chip is exist or not
   * @param- eventName, chipName
   */
  function isChipExist(name) {
    // Check exist chip idx
    if (chips.indexOf(name.trim()) > -1) return true;
    else return false;
  }

  //On change handler
  const onChangehandler = (e) => {
    props.onErrorCallback("");
    setValue(e.target.value);
  };

  return (
    <Grid>
      <Grid container pb={1}>
        <MDBInput
          width={props.width ? props.width : "100%"}
          type="text"
          placeholder={props.placeholder}
          id="chipInput"
          name="chipInput"
          value={value}
          onKeyDown={(e) => checkKeyDown(e)}
          onBlur={(e) => createChipHandler(e)}
          onChange={(e) => onChangehandler(e)}
          // className={classes.input}
        />
        <MDBTypography
          color="white"
          fontSize="xs"
          fontWeight="regular"
          lineHeight="2xl"
          sx={{ my: 0.25, mx: 1.5 }}
        >
          {props.suggestionTxt}
        </MDBTypography>
      </Grid>
      {chips && chips?.length > 0 ? (
        <MDBox
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            flexWrap: "wrap",
            listStyle: "none",
            p: 0.5,
            m: 0,
            width: "100%",
            borderRadius: "6px",
            maxHeight: "120px",
            overflow: "scroll",
          }}
          component="ul"
        >
          {chips?.map((chipLabel, eIdx) => (
            <MDBox component="li" key={eIdx}>
              <Chip
                variant="outlined"
                label={chipLabel}
                onDelete={() => deleteChipHandler(chipLabel)}
                sx={{
                  color: "#D2D2D3",
                  m: 0.25,
                  "& .MuiChip-deleteIcon": {
                    color: "#D2D2D3",
                    width: "20px",
                    height: "20px",
                  },
                  "& .MuiChip-deleteIcon:hover": {
                    color: "#D2D2D3",
                  },
                }}
              />
            </MDBox>
          ))}
        </MDBox>
      ) : (
        <></>
      )}
    </Grid>
  );
}
