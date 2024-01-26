
// Material Dashboard  React base styles
import colors from "assets/bia-theme/base/colors";

// Material Dashboard  React helper functions
import pxToRem from "assets/bia-theme/functions/pxToRem";

const { transparent, grayScale, grey, input, primary } = colors;


const select = {
  styleOverrides: {
    select: {
      // padding: `${pxToRem(7)} ${pxToRem(16)} !important`,

      "& .Mui-selected": {
        backgroundColor: transparent.main,
      },
    },

    selectMenu: {
      background: "none",
      height: "none",
      minHeight: "none",
      overflow: "unset",
    },

    icon: {
      color : grey[400],
      width : "30px",
      height : "26px",
      top : 10
    },
  },
};

export default select;
