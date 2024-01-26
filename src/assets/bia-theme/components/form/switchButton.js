
// Material Dashboard  React base styles
import colors from "assets/bia-theme/base/colors";
import borders from "assets/bia-theme/base/borders";
import boxShadows from "assets/bia-theme/base/boxShadows";

// Material Dashboard  React helper functions
// import rgba from "assets/bia-theme/functions/rgba";
import pxToRem from "assets/bia-theme/functions/pxToRem";
import linearGradient from "assets/bia-theme/functions/linearGradient";

const { white, gradients, black, transparent, toggleColor, light_green } = colors;
const { borderWidth } = borders;
const { md } = boxShadows;

const switchButton = {
  defaultProps: {
    disableRipple: false,
  },

  styleOverrides: {
    root:{
      padding: 0,
      height : 18,
      width : 30,
      borderRadius : 32,
    },
    
    switchBase: {
      color: gradients.dark.main,
      padding: 2,

      "&:hover": {
        backgroundColor: transparent.main,
      },

      "&.Mui-checked": {
        color: gradients.dark.main,

        "&:hover": {
          backgroundColor: transparent.main,
        },

        "& .MuiSwitch-thumb": {
          borderColor: `${black.main} !important`,
          backgroundColor: black.main,

          marginLeft: -7,
        },

        "& + .MuiSwitch-track": {
          backgroundColor: `${light_green.main} !important`,
          borderColor: `${light_green.main} !important`,
          opacity: 1,
        },
      },

      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: "0.3 !important",
      },

      "&.Mui-focusVisible .MuiSwitch-thumb": {
        backgroundImage: linearGradient(gradients.info.main, gradients.info.state),
      },
    },

    thumb: {
      width: pxToRem(14),
      height: pxToRem(14),
      backgroundColor: white.main,
      boxShadow: md,
      border: `${borderWidth[1]} solid ${toggleColor.main}`,
      // margin: `${pxToRem(0)} ${pxToRem(0)}`

    },

    track: {
      width: pxToRem(32),
      height: pxToRem(18),
      backgroundColor: toggleColor.main,
      border: `${borderWidth[0]} solid ${toggleColor.main}`,
      opacity: 1,
    },

    checked: {},
  },
};

export default switchButton;
