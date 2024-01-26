
// Material Dashboard  React base styles
import typography from "assets/bia-theme/base/typography";
import borders from "assets/bia-theme/base/borders";
import colors from "assets/bia-theme/base/colors";

// Material Dashboard  React helper functions
import pxToRem from "assets/bia-theme/functions/pxToRem";
import rgba from "assets/bia-theme/functions/rgba";

const { size } = typography;
const { white } = colors;
const { borderWidth, borderColor } = borders;

const dialogContent = {
  styleOverrides: {
    root: {
      padding: pxToRem(16),
      fontSize: size.md,
      color: rgba(white.main, 0.8),
    },

    dividers: {
      borderTop: `${borderWidth[1]} solid ${rgba(borderColor, 0.6)}`,
      borderBottom: `${borderWidth[1]} solid ${rgba(borderColor, 0.6)}`,
    },
  },
};

export default dialogContent;
