
import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { createStyles, makeStyles } from '@material-ui/core';

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

export default function BasicSelect(props) {
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
          defaultValue={(props?.defaultValue !== undefined) ? props.defaultValue : "placeholder"}
          onChange={handleChange}
        >
          <MenuItem sx={{display: "none"}} value="placeholder">{props.placeholder}</MenuItem>
          {props?.contents?.map((value) => (
            <MenuItem value={value} key={value}>{value}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
