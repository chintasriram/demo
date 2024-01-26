import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Custom styles for MDBTypography
import MDBTypographyRoot from "./MDBTypographyRoot";

// Material Dashboard 2 React contexts
import { useMaterialUIController } from "context";

const MDBTypography = forwardRef(
  (
    { color, fontWeight, textTransform, verticalAlign, textGradient, opacity, children, fontSize, lineHeightSize, bgColor, ...rest },
    ref
  ) => {
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;

    return (
      <MDBTypographyRoot
        {...rest}
        ref={ref}
        ownerState={{
          color,
          textTransform,
          verticalAlign,
          fontWeight,
          opacity,
          textGradient,
          fontSize,
          lineHeightSize,
          darkMode,
          bgColor
        }}
      >
        {children}
      </MDBTypographyRoot>
    );
  }
);

// Setting default values for the props of MDTypography
MDBTypography.defaultProps = {
  bgColor: "",
  color : "white",
  fontWeight : "medium",
  fontSize : "md",
  // opacity : 0.8,
  lineHeightSize : "",
  textTransform: "none",
  verticalAlign: "unset",
  textGradient: false,
};

// Typechecking props for the MDTypography
MDBTypography.propTypes = {
  color: PropTypes.oneOf([
    "inherit",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
    "text",
    "white",
  ]),
  fontWeight: PropTypes.oneOf([false, "light", "regular", "regularMedium", "medium", "bold"]),
  fontSize: PropTypes.oneOf(["xxs", "xs", "sm", "md", "lg", "xl"]),
  textTransform: PropTypes.oneOf(["none", "capitalize", "uppercase", "lowercase"]),
  verticalAlign: PropTypes.oneOf([
    "unset",
    "baseline",
    "sub",
    "super",
    "text-top",
    "text-bottom",
    "middle",
    "top",
    "bottom",
  ]),
  lineHeightSize: PropTypes.oneOf(["xxs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"]),
  textGradient: PropTypes.bool,
  children: PropTypes.node.isRequired,
  opacity: PropTypes.number,
};

export default MDBTypography;
