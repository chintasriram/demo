
// @mui material components
import Fade from "@mui/material/Fade";

// Material Dashboard  React base styles
import colors from "assets/bia-theme/base/colors";
import typography from "assets/bia-theme/base/typography";
import borders from "assets/bia-theme/base/borders";

// Material Dashboard  React helper functions
import pxToRem from "assets/bia-theme/functions/pxToRem";

const { black, white,cardBg } = colors;
const { size, fontWeightRegular } = typography;
const { borderRadius } = borders;

const tooltip = {
  defaultProps: {
    arrow: true,
    TransitionComponent: Fade,
  },

  styleOverrides: {
    tooltip: {
      fontFamily: 'aktiv-grotesk,sans-serif',
      maxWidth: pxToRem(250),
      backgroundColor: cardBg.main,
      color: white.main,
      fontSize: size.sm,
      fontWeight: fontWeightRegular,
      textAlign: "center",
      borderRadius: borderRadius.md,
      opacity: 0.7,
      padding: `${pxToRem(5)} ${pxToRem(8)} ${pxToRem(4)}`,
    },

    arrow: {
      color: black.main,
    },
  },
};

export default tooltip;
