
// Material Dashboard  React base styles
import borders from "assets/bia-theme/base/borders";
import colors from "assets/bia-theme/base/colors";

// Material Dashboard  React helper functions
import pxToRem from "assets/bia-theme/functions/pxToRem";
import linearGradient from "assets/bia-theme/functions/linearGradient";

const { borderWidth, borderColor } = borders;
const { transparent, info, light_green } = colors;

const radio = {
  styleOverrides: {
    root: {
      "& .MuiSvgIcon-root": {
        width: pxToRem(12),
        height: pxToRem(12),
        color: transparent.main,
        border: `${borderWidth[1]} solid ${borderColor}`,
        borderRadius: "50%",
      },

      "&:after": {
        transition: "opacity 250ms ease-in-out",
        content: `""`,
        position: "absolute",
        width: pxToRem(12),
        height: pxToRem(12),
        borderRadius: "50%",
        backgroundImage: linearGradient(light_green.main, light_green.main),
        opacity: 0,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        margin: "auto",
      },

      "&:hover": {
        backgroundColor: transparent.main,
      },

      "&.Mui-focusVisible": {
        border: `${borderWidth[2]} solid ${info.main} !important`,
      },
    },

    colorPrimary: {
      color: borderColor,

      "&.Mui-checked": {
        color: info.main,

        "& .MuiSvgIcon-root": {
          borderColor: info.main,
        },

        "&:after": {
          opacity: 1,
        },
      },
    },

    colorSecondary: {
      color: borderColor,

      "&.Mui-checked": {
        color: info.main,

        "& .MuiSvgIcon-root": {
          borderColor: info.main,
        },

        "&:after": {
          opacity: 1,
        },
      },
    },
  },
};

export default radio;
