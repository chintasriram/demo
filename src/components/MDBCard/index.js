import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Material Dashboard 2 React components
import MDBCardRoot from "./MDBCardRoot";

// Custom styles for MDBCard
const MDBCard = forwardRef(({ variant, bgcolor, border, borderRadius, shadow, coloredShadow, color, isBorder, ...rest }, ref) => (
  <>
    <MDBCardRoot
      {...rest}
      ref={ref}
      bgcolor = {bgcolor}
      color = {color}
      isBorder={isBorder}
      borderRadius = {borderRadius}
      ownerState={{ bgcolor, variant, borderRadius, shadow, coloredShadow, color, isBorder}}
    />
  </>
));

// Setting default values for the props of MDProgress
MDBCard.defaultProps = {
  borderRadius : "xl",
  bgcolor : "cardBg",
  color : "",
  shadow: "none",
  isBorder : true ,
  coloredShadow: "none",
};

// Typechecking props for the MDProgress
MDBCard.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  opacity: PropTypes.number,
  borderRadius: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl", "xxl", "section"]),
  shadow: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl", "xxl", "inset"]),
  coloredShadow: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
    "none",
  ]),
};

export default MDBCard;
