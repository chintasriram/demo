// @mui material components
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export default styled(Button)(({ theme, ownerState }) => {
  const { palette, functions, borders, boxShadows, typography } = theme;
  const { color, variant, circular, fontWeight, fontSize, bgColor, borderSize, iconOnly } = ownerState;

  const { white, text, transparent, gradients, grey, black } = palette;
  const { boxShadow, linearGradient, pxToRem, rgba } = functions;
  const { borderRadius, borderWidth } = borders;
  const { colored } = boxShadows;
  const { fontWeightLight, fontWeightRegular, fontWeightMedium, fontWeightBold, size, lineHeight, borderRadiusSize } = typography;

  // fontWeight styles
  const fontWeights = {
    light: fontWeightLight,
    regular: fontWeightRegular,
    medium: fontWeightMedium,
    bold: fontWeightBold,
  };

  // styles for the button with variant="contained"
  const containedStyles = () => {
    // background color value
    const backgroundValue = palette[bgColor] ? palette[bgColor].main : white.main;

    // backgroundColor value when button is focused
    const focusedBackgroundValue = palette[color] ? palette[color].focus : white.focus;

    // boxShadow value
    const boxShadowValue = colored[color]
      ? `${boxShadow([0, 3], [3, 0], palette[color].main, 0.15)}, ${boxShadow(
          [0, 3],
          [1, -2],
          palette[color].main,
          0.2
        )}, ${boxShadow([0, 1], [5, 0], palette[color].main, 0.15)}`
      : "none";

    // boxShadow value when button is hovered
    const hoveredBoxShadowValue = colored[color]
      ? `${boxShadow([0, 14], [26, -12], palette[color].main, 0.4)}, ${boxShadow(
          [0, 4],
          [23, 0],
          palette[color].main,
          0.15
        )}, ${boxShadow([0, 8], [10, -5], palette[color].main, 0.2)}`
      : "none";

    // color value
    let colorValue = palette[color] ? palette[color].main : white.main;

    // if (!darkMode && (color === "white" || color === "light" || !palette[color])) {
    //   colorValue = text.main;
    // } else if (darkMode && (color === "white" || color === "light" || !palette[color])) {
    //   colorValue = grey[600];
    // }

    // color value when button is focused
    let focusedColorValue = white.main;

    if (color === "white") {
      focusedColorValue = text.main;
    } else if (color === "primary" || color === "error" || color === "dark") {
      focusedColorValue = white.main;
    }

    //border radius value
    let borderRadiusValue = borderRadius[borderSize]

    return {
      borderRadius: borderRadiusValue,
      background: backgroundValue,
      color: colorValue,
      boxShadow: boxShadowValue,

      "&:hover": {
        backgroundColor: backgroundValue,
        boxShadow: hoveredBoxShadowValue,
      },

      "&:focus:not(:hover)": {
        // backgroundColor: focusedBackgroundValue,
        // boxShadow: palette[color]
        //   ? boxShadow([0, 0], [0, 3.2], palette[color].main, 0.5)
        //   : boxShadow([0, 0], [0, 3.2], white.main, 0.5),
      },

      "&:disabled": {
        backgroundColor: backgroundValue,
        color: focusedColorValue,
      },
    };
  };



  // styles for the button with variant="outlined"
  const outliedStyles = () => {
    // background color value
    const backgroundValue = color === "white" ? rgba(white.main, 0.1) : transparent.main;

    // color value
    const colorValue = palette[color] ? palette[color].main : white.main;

    // boxShadow value
    const boxShadowValue = palette[color]
      ? boxShadow([0, 0], [0, 3.2], palette[color].main, 0.5)
      : boxShadow([0, 0], [0, 3.2], white.main, 0.5);

    // border color value
    let borderColorValue = palette[color] ? palette[color].main : rgba(white.main, 0.75);

    if (color === "white") {
      borderColorValue = rgba(white.main, 0.75);
    }

    // border width value
    const borderWidthValue = borderWidth[1];

    
    //border radius value
    let borderRadiusValue = borderRadius[borderSize]

    return {
      background: backgroundValue,
      color: colorValue,
      borderWidth: borderWidthValue,
      borderColor: borderColorValue,
      borderRadius: borderRadiusValue,


      "&:hover": {
        background: transparent.main,
        borderColor: colorValue,
      },

      "&:focus:not(:hover)": {
        // background: transparent.main,
        // boxShadow: boxShadowValue,
      },

      "&:active:not(:hover)": {
        // backgroundColor: colorValue,
        color: white.main,
        opacity: 0.85,
      },

      "&:disabled": {
        color: colorValue,
        borderColor: colorValue,
      },
    };
  };


  

  // styles for the button with variant="text"
  const textStyles = () => {
    // color value
    const colorValue = palette[color] ? palette[color].main : white.main;

    // color value when button is focused
    const focusedColorValue = palette[color] ? palette[color].focus : white.focus;

    // padding value
    let paddingValue = `${pxToRem(10)} ${pxToRem(11)} ${pxToRem(10)}`;

    if (size === "small") {
      paddingValue = pxToRem(5);
    } else if (size === "large") {
      paddingValue = `${pxToRem(10)} ${pxToRem(17)}`;
    }

    return {
      color: colorValue,
      padding: paddingValue,

      "&:hover": {
        // color: focusedColorValue,
      },

      "&:focus:not(:hover)": {
        // color: focusedColorValue,
      },
    };
  };

  // styles for the button with circular={true}
  const circularStyles = () => ({
    borderRadius: borderRadius.section,
  });

  // styles for the button with iconOnly={true}
  const iconOnlyStyles = () => {
    // width, height, minWidth and minHeight values
    let sizeValue = pxToRem(38);

    if (size === "small") {
      sizeValue = pxToRem(25.4);
    } else if (size === "large") {
      sizeValue = pxToRem(52);
    }

    // padding value
    let paddingValue = `${pxToRem(11)} ${pxToRem(11)} ${pxToRem(10)}`;

    if (size === "small") {
      paddingValue = pxToRem(4.5);
    } else if (size === "large") {
      paddingValue = pxToRem(16);
    }

    return {
      width: sizeValue,
      minWidth: sizeValue,
      height: sizeValue,
      minHeight: sizeValue,
      padding: paddingValue,

      "& .material-icons": {
        marginTop: 0,
      },

      "&:hover, &:focus, &:active": {
        transform: "none",
      },
    };
  };


  //font size value
  let fontSizeValue = size[fontSize]
  return {
    ...(variant === "contained" && containedStyles()),
    ...(variant === "outlined" && outliedStyles()),
    ...(variant === "text" && textStyles()),
    ...(circular && circularStyles()),
    ...(iconOnly && iconOnlyStyles()),
    fontWeight: fontWeights[fontWeight] && fontWeights[fontWeight],
    fontSize :  fontSizeValue,
  };
});
