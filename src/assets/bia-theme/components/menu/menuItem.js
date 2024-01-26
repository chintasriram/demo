
// Material Dashboard  React base styles
import colors from "assets/bia-theme/base/colors";
import borders from "assets/bia-theme/base/borders";
import typography from "assets/bia-theme/base/typography";

// Material Dashboard  React helper functions
import pxToRem from "assets/bia-theme/functions/pxToRem";
import rgba from "assets/bia-theme/functions/rgba";

const { dark, white, background, multiSelect } = colors;
const { borderRadius } = borders;
const { size, fontWeightRegular } = typography;

const menuItem = {
  styleOverrides: {
    root: {
      minWidth: pxToRem(160),
      minHeight: "unset",
      padding: `${pxToRem(4)} ${pxToRem(16)}`,
      // borderRadius: borderRadius.md,
      fontSize: size.sm,
      fontWeight: fontWeightRegular,
      color: white.main,
      transition: "background-color 300ms ease, color 300ms ease",

      "&:hover, &:focus, &.Mui-selected, &.Mui-selected:hover, &.Mui-selected:focus": {
        backgroundColor: multiSelect.menuItem,
        color: white.main,
      },
    },
  },
};

export default menuItem;
