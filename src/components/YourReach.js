import { Grid } from "@mui/material";
import MDBTypography from "components/MDBTypography";
import React from "react";
import MDBCard from "./MDBCard";
import formatter from "./../service/NumberFormatService";
import { Tooltip } from "@mui/material";
import MDBox from "./MDBox";


export default function YourReach(props) {
  return (
    <Grid sx={{ flexGrow: 1 }}>
      <Grid item>
        <MDBCard
          bgcolor="transparent"
          borderRadius="md"
          sx={{
            m: 0,
            mb: 2,
            p: 0,
            py: 2,
            pl: 2,
            mr: 2,
            width: props?.width ?? "inherit",
          }}
        >

          <Grid container>
          
            <MDBTypography component="img" src={props.icon} mb={2} />
          
          </Grid>

          <Grid container>
            <MDBTypography
              color="grey400"
              fontWeight="regular"
              fontSize="sm"
              lineHeightSize="xxl"
            >
              {props.metrics}
            </MDBTypography>
          </Grid>
          <Grid container pb={1}>
            <Grid item mr={2} alignSelf="center">
            <Tooltip title={props?.valueTooltip}placement="right"> 
              <MDBTypography
                color="white"
                fontWeight="medium"
                fontSize="2xl"
                lineHeightSize="4xl"
              >
                {props?.value?.toString().includes("%")
                  ? props?.value
                  : formatter.format(props?.value)}
              </MDBTypography>
              </Tooltip>
            </Grid>
            <Grid item>
              <MDBTypography
                component="img"
                src={props.graph}
                width="54px"
                height="14px"
              />
            </Grid>
          </Grid>
          {props.subValue &&
          props.subValue != "" &&
          props.subValue != "0" &&
          props.subValue != 0 ? (
            
            <Grid container>
              <Grid item pr={0.2}>
                <MDBTypography
                  component="img"
                  src={props.arrow}
                  height="12px"
                  width="12px"
                />
              </Grid>
              <Grid item alignSelf="center">
              <Tooltip title={props?.subvalueTooltip}placement="right">
                <MDBTypography
                  color="green"
                  fontWeight="regular"
                  fontSize="sm"
                  lineHeightSize="xxl"
                >
                  {props?.subValue?.toString().includes("%")
                    ? props?.subValue
                    : props?.subValue
                    ? formatter.format(props?.subValue)
                    : ""}
                     
                </MDBTypography>
                </Tooltip>
              </Grid>
            </Grid>
           
          ) : (

                <MDBox>
            <Grid container height="33px">
              <Grid item pr={0.2}>
                <MDBTypography
                  component="text"
                  //src={props.arrow}
                  height="33px"
                  width="12px"
                />
              </Grid>
              <Grid item alignSelf="center">
 
                <MDBTypography
                  color="green"
                  fontWeight="regular"
                  fontSize="sm"
                  lineHeightSize="xxl"
                ></MDBTypography>
                
              </Grid>
            </Grid>
            </MDBox>
           
          )}
        </MDBCard>
      </Grid>
    </Grid>
  );
}
