
// Material Dashboard  React base styles
import borders from "assets/bia-theme/base/borders";
import colors from "assets/bia-theme/base/colors";

// Material Dashboard  React helper functions
import pxToRem from "assets/bia-theme/functions/pxToRem";

const { borderRadius } = borders;
const { light, supaLight } = colors;

const linearProgress = {
  styleOverrides: {
    root: {
      height: pxToRem(4),
      width: pxToRem(232),
      borderRadius: borderRadius.smd,
      overflow: "visible",
      position: "relative",
    },

    colorPrimary: {
      backgroundColor: supaLight.main,
    },

    colorSecondary: {
      backgroundColor: supaLight.main,
    },

    bar: {
      height: pxToRem(4),
      borderRadius: borderRadius.smd,
      position: "absolute",
      transform: `translate(0, 0) !important`,
      transition: "width 0.6s ease !important",
    },
     
  },
};

export default linearProgress;
