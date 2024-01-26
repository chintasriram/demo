
// Material Dashboard  React helper functions
import pxToRem from "assets/bia-theme/functions/pxToRem";

// Material Dashboard  React base styles
import colors from "assets/bia-theme/base/colors";
import boxShadows from "assets/bia-theme/base/boxShadows";
import borders from "assets/bia-theme/base/borders";

const { transparent } = colors;
const { md } = boxShadows;
const { borderRadius } = borders;

const popover = {
  styleOverrides: {
    paper: {
      backgroundColor: transparent.main,
      boxShadow: md,
      padding: pxToRem(8),
      borderRadius: borderRadius.md,
    },
  },
};

export default popover;
