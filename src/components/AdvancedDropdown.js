import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { createStyles, makeStyles } from '@material-ui/core';
import MDBTypography from "./MDBTypography";

const useStyles = makeStyles((theme) =>
  createStyles({
    input:{
      backgroundColor: "transparent",

      "& .MuiOutlinedInput-notchedOutline": {
        borderWidth:"1px",
        borderColor: "rgb(255,255,255, 0.3)",
      },
    }
  })  
)

export default function AdvancedSelect(props) {
  const classes = useStyles();
  const [select, setSelect] = React.useState("");

  const handleChange = (event) => { 
    if(event?.target?.value !== undefined && event?.target?.value !== ""){
      setSelect(event.target.value);
      //Basic Select onchange handler callback
      props?.basicSelectCallback(event.target.value)
    }
  };

  return (
    <div>
      <FormControl>
        <Select 
          className={classes.input}
          sx={{width: props.width, height: props.height}}
          defaultValue={(props?.defaultValue !== undefined) ? props.defaultValue : "0"}
          onChange={handleChange}
        >
          <MenuItem sx={{display: "none"}}  disabled={true} value="0" key={0}>{props?.placeholder}</MenuItem>
         {props?.contents?.map((item,idx) => (
            <MenuItem value={item.label} key={idx}>{item.label}</MenuItem>
          ))}
        </Select>
        {
            props?.error && 
            <MDBTypography  
                pt={1}
                fontWeight = "sm"
                fontSize = "sm"
                color="error"
            >
                {props?.property} is required
            </MDBTypography> 
        }
      </FormControl>
    </div>
  );
}
