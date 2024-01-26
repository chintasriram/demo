
// Material Dashboard  React Base Styles
import colors from "assets/bia-theme/base/colors";
import typography from "assets/bia-theme/base/typography";

// Material Dashboard  React Helper Functions
import pxToRem from "assets/bia-theme/functions/pxToRem";

const { info, secondary,gradients } = colors;
const { size } = typography;

const contained = {
  base: {
    // backgroundColor: white.main,
    minHeight: pxToRem(40),
    // color: text.main,
    padding: `${pxToRem(7.5)} ${pxToRem(38)}`,

    "&:hover": {
      backgroundColor: gradients.bbbg.main,
    },

    "&:active, &:active:focus, &:active:hover": {
      opacity: 0.85,
    },

    "& .material-icon, .material-icons-round, svg": {
      fontSize: `${pxToRem(16)} !important`,
    },
  },

  small: {
    minHeight: pxToRem(36),
    padding: `${pxToRem(6)} ${pxToRem(14)}`,
    fontSize: size.xs,

    "& .material-icon, .material-icons-round, svg": {
      fontSize: `${pxToRem(12)} !important`,
    },
  },

  medium: {
    minHeight: pxToRem(48),
    padding: `${pxToRem(12)} ${pxToRem(21)}`,
    fontSize: size.sm,

    "& .material-icon, .material-icons-round, svg": {
      fontSize: `${pxToRem(22)} !important`,
    },
  },


  large: {
    minHeight: pxToRem(53),
    padding: `${pxToRem(14)} ${pxToRem(78)}`,
    fontSize: size.sm,

    "& .material-icon, .material-icons-round, svg": {
      fontSize: `${pxToRem(22)} !important`,
    },
  },

  extraLarge: {
    minHeight: pxToRem(48),
    padding: `${pxToRem(12)} ${pxToRem(171)}`,
    fontSize: size.md,

    "& .material-icon, .material-icons-round, svg": {
      fontSize: `${pxToRem(22)} !important`,
    },
  },

  inherit: {
    minHeight: pxToRem(48),
    width: "100%",
    fontSize: size.md,

    "& .material-icon, .material-icons-round, svg": {
      fontSize: `${pxToRem(22)} !important`,
    },
  },
  
  primary: {
    backgroundColor: info.main,

    "&:hover": {
      // backgroundColor: info.main,
    },

    "&:focus:not(:hover)": {
      // backgroundColor: info.focus,
    },
  },

  secondary: {
    backgroundColor: secondary.main,

    "&:hover": {
      backgroundColor: secondary.main,
    },
  },
};

export default contained;
