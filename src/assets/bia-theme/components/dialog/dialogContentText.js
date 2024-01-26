
// Material Dashboard  React base styles
import typography from "assets/bia-theme/base/typography";
import colors from "assets/bia-theme/base/colors";

// Material Dashboard  React helper functions
import rgba from "assets/bia-theme/functions/rgba";

const { size } = typography;
const { white } = colors;

const dialogContentText = {
  styleOverrides: {
    root: {
      fontSize: size.md,
      color: rgba(white.main, 0.8),
    },
  },
};

export default dialogContentText;
