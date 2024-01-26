import { Grid } from "@mui/material";
import React from "react";

export default function ResponsiveText(props) {
  return (
    <>
      <Grid
        display={{
          xs: "none",
          sm: "none",
          lg: "block",
          md: "block",
          xl: "block",
          xxl: "block",
        }}
        pl={props?.pl ? props?.pl : 0}
      >
        {props?.text}
      </Grid>
      <Grid
        display={{
          xs: "block",
          sm: "block",
          lg: "none",
          md: "none",
          xl: "none",
          xxl: "none",
        }}
      >
        {props?.mobileText}
      </Grid>
    </>
  );
}
