
// Material Dashboard  React base styles
import typography from "assets/bia-theme/base/typography";
import borders from "assets/bia-theme/base/borders";
import colors from "assets/bia-theme/base/colors";

// Material Dashboard  React helper functions
import pxToRem from "assets/bia-theme/functions/pxToRem";

const { size, fontWeightMedium } = typography;
const { borderRadius } = borders;
const { grayScale } = colors;

const tab = {
  styleOverrides: {
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      flexDirection: "row",
      flex: "1 1 auto",
      textAlign: "center",
      maxWidth: "fit-content !important",
      minWidth: "unset !important",
      minHeight: "unset !important",
      fontSize: size.md,
      fontWeight: fontWeightMedium,
      textTransform: "none",
      lineHeight: "24px",
      padding: `${pxToRem(4)} ${pxToRem(0)} ${pxToRem(16)} ${pxToRem(0)}`,
      margin: `${pxToRem(0)} ${pxToRem(24)} ${pxToRem(0)} ${pxToRem(0)}`,
      borderRadius: borderRadius.lg,
      color: grayScale.main,
      opacity: "1 !important",

      "& .material-icons, .material-icons-round": {
        marginBottom: "0 !important",
        marginRight: pxToRem(6),
      },

      "& svg": {
        marginBottom: "0 !important",
        marginRight: pxToRem(6),
      },
    },

    labelIcon: {
      paddingTop: pxToRem(4),
    },
  },
};

export default tab;
