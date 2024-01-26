
// Material Dashboard  React base styles
import boxShadows from "assets/bia-theme/base/boxShadows";
import typography from "assets/bia-theme/base/typography";
import colors from "assets/bia-theme/base/colors";
import borders from "assets/bia-theme/base/borders";

// Material Dashboard  React helper functions
import pxToRem from "assets/bia-theme/functions/pxToRem";

const { md } = boxShadows;
const { size } = typography;
const { text, background, black } = colors;
const { borderRadius } = borders;

const menu = {
  defaultProps: {
    disableAutoFocusItem: true,
  },

  styleOverrides: {
    paper: {
      minWidth: pxToRem(160),
      height: pxToRem(130),
      boxShadow: md,
      padding: `${pxToRem(16)} ${pxToRem(8)}`,
      margin: `${pxToRem(3)} ${pxToRem(0)}`,
      fontSize: size.sm,
      color: text.main,
      textAlign: "left",
      backgroundColor:"rgba(17, 19, 21, 0.88) !important",
      borderRadius: borderRadius.md,
      backdropFilter: `blur(${pxToRem(8)})`,
    },
  },
};

export default menu;
