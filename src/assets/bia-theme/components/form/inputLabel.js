
// Material Dashboard  React Base Styles
import colors from "assets/bia-theme/base/colors";
import typography from "assets/bia-theme/base/typography";

const { text, info,dark, white} = colors;
const { size } = typography;

const inputLabel = {
  styleOverrides: {
    root: {
      fontSize: size.sm,
      color: "transparent",
      lineHeight: 1.5,

      "&.Mui-focused": {
        color: "transparent",
      },

      "&.MuiInputLabel-shrink": {
        // lineHeight: 1.5,
        // fontSize: size.lg,
        // color: white.main,

        // "~ .MuiInputBase-root .MuiOutlinedInput-notchedOutline legend": {
        //   fontSize: "0.85em",
        // },
      },
    },

    sizeSmall: {
      fontSize: size.xs,
      lineHeight: 1.625,

      "&.MuiInputLabel-shrink": {
        lineHeight: 1.6,
        fontSize: size.sm,
        color:"transparent",

        "~ .MuiInputBase-root .MuiOutlinedInput-notchedOutline legend": {
          fontSize: "0.72em",
        },
      },
    },
  },
};

export default inputLabel;
