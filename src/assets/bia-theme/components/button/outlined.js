
// Material Dashboard  React Base Styles
import colors from "assets/bia-theme/base/colors";
import typography from "assets/bia-theme/base/typography";

// Material Dashboard  React Helper Functions
import pxToRem from "assets/bia-theme/functions/pxToRem";

const { transparent, light, info, secondary, blackScale } = colors;
const { size } = typography;

const outlined = {
  base: {
    minHeight: pxToRem(34),
    // color: light.main,
    borderColor: blackScale.main,
    padding: `${pxToRem(8)} ${pxToRem(8)}`,

    "&:hover": {
      opacity: 0.75,
      backgroundColor: transparent.main,
    },

    "& .material-icon, .material-icons-round, svg": {
      fontSize: `${pxToRem(16)} !important`,
    },
  },

  small: {
    minHeight: pxToRem(40),
    padding: `${pxToRem(6)} ${pxToRem(18)}`,
    fontSize: size.xs,

    "& .material-icon, .material-icons-round, svg": {
      fontSize: `${pxToRem(12)} !important`,
    },
  },

  large: {
    minHeight: pxToRem(48),
    padding: `${pxToRem(10)} ${pxToRem(21)}`,
    fontSize: size.sm,

    "& .material-icon, .material-icons-round, svg": {
      fontSize: `${pxToRem(22)} !important`,
    },
  },

  extraLarge: {
    minHeight: pxToRem(48),
    padding: `${pxToRem(10)} ${pxToRem(120)}`,
    fontSize: size.sm,

    "& .material-icon, .material-icons-round, svg": {
      fontSize: `${pxToRem(20)} !important`,
    },
  },

  inherit: {
    minHeight: pxToRem(48),
    width: "100%",
    fontSize: size.sm,

    "& .material-icon, .material-icons-round, svg": {
      fontSize: `${pxToRem(20)} !important`,
    },
  },


  primary: {
    backgroundColor: transparent.main,
    borderColor: info.main,

    "&:hover": {
      backgroundColor: transparent.main,
    },
  },

  secondary: {
    backgroundColor: transparent.main,
    borderColor: secondary.main,

    "&:hover": {
      backgroundColor: transparent.main,
    },
  },
};

export default outlined;
