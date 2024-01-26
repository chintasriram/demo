
// Material Dashboard 2 React Base Styles
import colors from "assets/bia-theme/base/colors";
import borders from "assets/bia-theme/base/borders";
import typography from "assets/bia-theme/base/typography";

// Material Dashboard 2 React helper functions
import pxToRem from "assets/bia-theme/functions/pxToRem";
import rgba from "assets/bia-theme/functions/rgba";

const { inputBorderColor, info, grey, transparent, white,light,input, primary } = colors;

const { borderRadius } = borders;
const { size } = typography;

const inputOutlined = {
  styleOverrides: {
    root: {
      width:'100%',
      backgroundColor: input.background,
      fontSize: size.md,
      borderRadius: borderRadius.md,

      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: white.main,
        borderWidth:"1px",
      },

      "&.Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": {
          backgroundColor: "none !important",
          borderWidth:"1px",
          borderColor: input.focused,
        },
      },
    },
      "&.input:-internal-autofill-selected":{
         backgroundColor:"none !important"
      },

      
    // notchedOutline: {
    //   borderColor: rgba(inputBorderColor, 0.4),
    // },

    input: {
      color: input.text,
      padding: pxToRem(12),
      backgroundColor: transparent.main,

      "&::-webkit-input-placeholder": {
        color: grey[100],
      },
    },

    inputSizeSmall: {
      fontSize: size.xs,
      padding: pxToRem(10),
    },

    multiline: {
      color: grey[700],
      padding: 0,
    },
  },
};

export default inputOutlined;
