
// Material Dashboard  React Base Styles
import colors from "assets/bia-theme/base/colors";
import typography from "assets/bia-theme/base/typography";
import borders from "assets/bia-theme/base/borders";

// Material Dashboard  React Helper Functions
import rgba from "assets/bia-theme/functions/rgba";
import linearGradient from "assets/bia-theme/functions/linearGradient";

const { info, inputBorderColor, dark, grey, white, grayScale } = colors;
const { size } = typography;
const { borderWidth } = borders;

const input = {
  styleOverrides: {
    root: {
      fontSize: size.sm,
      color: white.main,

      "&:hover:not(.Mui-disabled):before": {
        borderBottom: `${borderWidth[1]} solid ${rgba(inputBorderColor, 0.6)}`,
      },

      "&:before": {
        borderColor: rgba(inputBorderColor, 0.6),
      },

      "&:after": {
        borderColor: grey[100],
      },

      input: {
        color: white.main,

        "&::-webkit-input-placeholder": {
          color: grey[100],
        },
      },
    },
  },
};

export default input;
