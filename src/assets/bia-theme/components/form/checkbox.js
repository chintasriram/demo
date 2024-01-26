
// Material Dashboard  React base styles
import borders from "assets/bia-theme/base/borders";
import colors from "assets/bia-theme/base/colors";

// Material Dashboard  React helper functions
import pxToRem from "assets/bia-theme/functions/pxToRem";
import linearGradient from "assets/bia-theme/functions/linearGradient";

const { borderWidth, borderColor } = borders;
const { transparent, info, light_green } = colors;

const checkbox = {
  styleOverrides: {
    root: {
      "& .MuiSvgIcon-root": {
        backgroundPosition: "center",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        width: pxToRem(16),
        height: pxToRem(16),
        color: transparent.main,
        border: `${borderWidth[1]} solid ${borderColor}`,
        borderRadius: pxToRem(2),
      },
      "& .checked": {
        "& .MuiIconButton-label": {
          position: "relative",
          zIndex: 0
        },
        "& .MuiIconButton-label:after": {
          content: '""',
          left: 4,
          top: 4,
          height: 15,
          width: 15,
          position: "absolute",
          backgroundColor: "green",
          zIndex: -1
        }
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
        color: light_green.main,
        
        "& .MuiSvgIcon-root": {
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3e%3cpath fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2.5' d='M5 13l4 4L19 7'/%3e%3c/svg%3e"), ${linearGradient(
            light_green.main,
            light_green.main
          )}`,
          borderColor: light_green.main,
        },
      },
    },
    
    colorSecondary: {
      color: borderColor,

      "& .MuiSvgIcon-root": {
        color: info.main,
        "&.Mui-checked": {
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 -1 22 22'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2.5' d='M6 10l3 3l6-6'/%3e%3c/svg%3e"), ${linearGradient(
            info.main,
            info.main
          )}`,
          borderColor: info.main,
        },
      },
    },
  },
};

export default checkbox;
