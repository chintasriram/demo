
// Material Dashboard  React base styles
import colors from "assets/bia-theme/base/colors";

// Material Dashboard  React helper functions
import rgba from "assets/bia-theme/functions/rgba";
import pxToRem from "assets/bia-theme/functions/pxToRem";

const { dark, transparent, white, primary, dividerColor } = colors;

const divider = {
  styleOverrides: {
    root: {
      backgroundColor: dividerColor.main,
      // backgroundImage: `linear-gradient(to right, ${rgba(dark.main, 0)}, ${white.main}, ${rgba(
      //   dark.main,
      //   0
      // )}) !important`,
      height: pxToRem(1),
      margin: `${pxToRem(24)} 0`,
      borderBottom: "none",
    },

    vertical: {
      backgroundColor: `${rgba(dividerColor.main,  0.48)}`,
      // backgroundImage: `linear-gradient(to bottom, ${rgba(dark.main, 0)}, ${white.main}, ${rgba(
      //   dark.main,
      //   0
      // )}) !important`,
      width: pxToRem(1),
      height: "auto",
      margin: `${pxToRem(0)} ${pxToRem(0)}`,
      borderRight: "none",
    },

    light: {
      backgroundColor: dividerColor.main,
      backgroundImage: `linear-gradient(to right, ${rgba(white.main, 0)}, ${rgba(
        dark.main,
        0.4
      )}, ${rgba(white.main, 0)}) !important`,

      "&.MuiDivider-vertical": {
        backgroundImage: `linear-gradient(to bottom, ${rgba(white.main, 0)}, ${rgba(
          dark.main,
          0.4
        )}, ${rgba(white.main, 0)}) !important`,
      },
    },
  },
};

export default divider;
