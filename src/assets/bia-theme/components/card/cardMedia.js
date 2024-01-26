
// Material Dashboard  React Base Styles
import borders from "assets/bia-theme/base/borders";

// Material Dashboard  React Helper Functions
import pxToRem from "assets/bia-theme/functions/pxToRem";

const { borderRadius } = borders;

const cardMedia = {
  styleOverrides: {
    root: {
      borderRadius: borderRadius.xl,
      margin: `${pxToRem(16)} ${pxToRem(16)} 0`,
    },

    media: {
      width: "auto",
    },
  },
};

export default cardMedia;
