import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Custom styles for MDBInput
import MDBInputRoot from "components/MDBInput/MDBInputRoot";

const MDBInput = forwardRef(({ error, success, search, disabled, width, ...rest }, ref) => (
  <MDBInputRoot 
    {...rest} 
    ref={ref} 
    ownerState={{ error, success, search, disabled, width }} 
  />
));

// Setting default values for the props of MDBInput
MDBInput.defaultProps = {
  width:"100%",
  error: false,
  success: false,
  search: false,
  disabled: false,
};

// Typechecking props for the MDBInput
MDBInput.propTypes = {
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default MDBInput;
