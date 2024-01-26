
// Material Dashboard  React Base Styles
import colors from "assets/bia-theme/base/colors";
import borders from "assets/bia-theme/base/borders";
import boxShadows from "assets/bia-theme/base/boxShadows";

// Material Dashboard  React Helper Function
import rgba from "assets/bia-theme/functions/rgba";
import pxToRem from "assets/bia-theme/functions/pxToRem";

const { black, background } = colors; 
const { borderWidth, borderRadius } = borders;
const { md } = boxShadows;

const card = {
  styleOverrides: {
    root: {
      // display: "flex",
      // flexDirection: "column",
      // position: "relative",
      width: "fit-content",
      wordWrap: "break-word",
      // backgroundImage: "none",
      // backgroundColor: background.biaCard,
      // backgroundClip: "border-box",
      // border: `${borderWidth[1]} solid ${rgba(black.main, 0.125)}`,
      overflow: "visible",
      padding: `${pxToRem(16)} ${pxToRem(16)} ${pxToRem(16)} ${pxToRem(16)}`,
      margin: `${pxToRem(16)} ${pxToRem(16)} ${pxToRem(16)} ${pxToRem(16)}`
    },
  },
};

export default card;
