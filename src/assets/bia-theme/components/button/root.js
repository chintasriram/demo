
// Material Dashboard  React Base Styles
import typography from "assets/bia-theme/base/typography";
import borders from "assets/bia-theme/base/borders";

// Material Dashboard  React Helper Functions
import pxToRem from "assets/bia-theme/functions/pxToRem";

const { fontWeightMedium, size } = typography;
const { borderRadius } = borders;

const root = {
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: size.xs,
  fontWeight: fontWeightMedium,
  // borderRadius: borderRadius.xl,
  // padding: `${pxToRem(6.302)} ${pxToRem(16.604)}`,
  lineHeight: 1.4,
  textAlign: "center",
  textTransform: "none",
  userSelect: "none",
  backgroundSize: "150% !important",
  backgroundPositionX: "25% !important",
  transition: "all 150ms ease-in",

  "&:disabled": {
    pointerEvent: "none",
    opacity: 0.65,
  },

  "& .material-icons": {
    fontSize: pxToRem(15),
    marginTop: pxToRem(-2),
  },
};

export default root;
