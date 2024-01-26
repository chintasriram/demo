import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Custom styles for MDProgress
import { Box, Grid } from "@mui/material";
import MDBProgressRoot from "./MDBProgressRoot";
import MDBTypography from "components/MDBTypography";

const MDBProgress = forwardRef(({ variant, color, percentage, value, maxValue, label, title, ...rest }, ref) => (
  <Grid sx={{ width: "inherit" }}>
    {label && (
      <Grid container justifyContent="space-between" mb={2}>
        <MDBTypography
          fontWeight="regular"
          fontSize="md"
          lineHeightSize="2xl"
        >
          {title}
        </MDBTypography>
        <MDBTypography
          variant="button"
          fontWeight="regular"
          fontSize="md"
          lineHeightSize="2xl"
        >
          {percentage}%
        </MDBTypography>
      </Grid>

    )}
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <MDBProgressRoot
        {...rest}
        ref={ref}
        variant="determinate"
        value={percentage}
        title={title}
        ownerState={{ color, percentage, variant, title }}
        sx={{ width: "100%" }}
      />
    </Box>
    <Grid container justifyContent="space-between" mb={1.5}>
      <MDBTypography
        color="light_green"
        fontWeight="regular"
        fontSize="sm"
        lineHeightSize="lg"
        opacity={0.8}
        marginLeft={(percentage <= 80) ? `${percentage}%` : "0"}
        mt={1}
      >
        {(percentage <= 80) ? value : ""}
      </MDBTypography>
      <MDBTypography
        fontWeight="regular"
        fontSize="sm"
        lineHeightSize="lg"
        opacity={0.8}
        mt={1}
      >
        {maxValue}
      </MDBTypography>
    </Grid>
  </Grid>
));

// Setting default percentages for the props of MDBProgress
MDBProgress.defaultProps = {
  variant: "contained",
  color: "light_green",
  title: "2022",
  percentage: "0",
  label: true,
};

// Typechecking props for the MDBProgress
MDBProgress.propTypes = {
  variant: PropTypes.oneOf(["contained", "gradient"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  percentage: PropTypes.number,
  label: PropTypes.bool,
};

export default MDBProgress;
