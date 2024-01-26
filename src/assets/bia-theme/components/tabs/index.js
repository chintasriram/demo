
// Material Dashboard  React base styles
import colors from "assets/bia-theme/base/colors";
import borders from "assets/bia-theme/base/borders";
import boxShadows from "assets/bia-theme/base/boxShadows";

// Material Dashboard  React helper functions
import pxToRem from "assets/bia-theme/functions/pxToRem";

const { background, chartColor1, transparent, light_green } = colors;
const { borderRadius } = borders;
const { md } = boxShadows;

const tabs = {
  styleOverrides: {
    root: {
      position: "relative",
      backgroundColor: transparent.main,
      // borderRadius: borderRadius.xl,
      minHeight: "unset",
      padding:  `${pxToRem(0)} ${pxToRem(0)} ${pxToRem(0)} ${pxToRem(0)}`,

      "& .MuiTab-root.Mui-selected": {
        color: light_green.main
      },
    },
   
 
    flexContainer: {
      height: "100%",
      position: "relative",
      zIndex: 10,
    },

    fixed: {
      overflow: "unset !important",
      overflowX: "unset !important",
    },

    vertical: {
      "& .MuiTabs-indicator": {
        width: "2%",
      },
    },

    indicator: {
      // height: "100%",
      borderRadius: borderRadius.xl,
      backgroundColor: light_green.main,
      boxShadow: md,
      transition: "all 500ms ease",
    },
  },
};

export default tabs;
