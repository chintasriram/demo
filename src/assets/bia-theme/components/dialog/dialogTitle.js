
// Material Dashboard  React base styles
import typography from "assets/bia-theme/base/typography";

// Material Dashboard  React helper functions
import pxToRem from "assets/bia-theme/functions/pxToRem";

const { size } = typography;

const dialogTitle = {
  styleOverrides: {
    root: {
      padding: pxToRem(16),
      fontSize: size.xl,
    },
  },
};

export default dialogTitle;
