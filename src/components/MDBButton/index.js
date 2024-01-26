import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import Loader from 'assets/images/icons/Loader.png'

// Custom styles for MDButton
import MDBButtonRoot from "components/MDBButton/MDBButtonRoot";

// Material Dashboard 2 React contexts
import { useMaterialUIController } from "context";
import { RotatingLines} from  'react-loader-spinner'

const MDBButton = forwardRef(
  ({ color, variant, size, circular, children, fontWeight, fontSize, bgColor, borderSize, iconOnly,isLoading, ...rest }, ref) => {
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;

    return (
      <MDBButtonRoot
        {...rest}
         ref={ref}
        color="primary"
        variant={variant === "gradient" ? "contained" : variant}
        size={size}
        fontWeight = {fontWeight}
        fontSize = {fontSize}
        bgColor = {bgColor}
        borderSize = {borderSize}
        ownerState={{ color, variant, size, circular, darkMode, iconOnly, fontWeight, fontSize, bgColor, borderSize }}
      >
     {isLoading && 
      <RotatingLines
        strokeColor="#000"
        strokeWidth="5"
        animationDuration="0.75"
        width="28"
        visible={true}
      />
      }                        
    {isLoading !== true && children}
      </MDBButtonRoot>
    );
  }
);

// Setting default values for the props of MDBButton
MDBButton.defaultProps = {
  size: "",
  variant: "contained",
  color: "blue",
  bgColor: "black",
  circular: false,
  iconOnly : false,
  fontWeight : "regularMedium",
  fontSize : "",
  borderSize : "sm"
};

// Typechecking props for the MDBsButton
MDBButton.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  variant: PropTypes.oneOf(["text", "contained", "outlined", "gradient"]),
  color: PropTypes.oneOf([
    "white",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
    "blue",
  ]),
  circular: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default MDBButton;
