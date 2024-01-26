
// Material Dashboard  React Base Styles
import colors from "assets/bia-theme/base/colors";

// Material Dashboard  React Helper Functions
import pxToRem from "assets/bia-theme/functions/pxToRem";

const { white } = colors;

const baseProperties = {
  fontFamily: 'aktiv-grotesk,sans-serif',
  fontWeightLighter: 100,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium : 500,
  fontWeightBold: 700,
  fontSizeXXS: pxToRem(10.4),
  fontSizeXS: pxToRem(12),
  fontSizeSM: pxToRem(14),
  fontSizeMD: pxToRem(16),
  fontSizeLG: pxToRem(18),
  fontSizeXL: pxToRem(20),
  fontSize2XL: pxToRem(24),
  fontSize3XL: pxToRem(30),
  fontSize4XL: pxToRem(32),
  fontSize4XXL: pxToRem(40),
  fontSize8XL: pxToRem(56),

  fontSizeHXS: pxToRem(26),
  fontSizeHSM: pxToRem(26),
  fontSizeHMD: pxToRem(30),
  fontSizeHLG: pxToRem(34),
  fontSizeHXL: pxToRem(38),
  fontSizeHXXL: pxToRem(50), 
  fontSizeHXXEL: pxToRem(55),
  fontSizeHEL: pxToRem(60), 
};

const baseHeadingProperties = {
  fontFamily: baseProperties.fontFamily,
  color: white.main,
  fontWeight: baseProperties.fontWeightBold,
};

const baseDisplayProperties = {
  fontFamily: baseProperties.fontFamily,
  color: white.main,
  fontWeight: baseProperties.fontWeightLight,
  lineHeight: 1.2,
};

const typography = {
  fontFamily: baseProperties.fontFamily,
  fontWeightLighter: baseProperties.fontWeightLighter,
  fontWeightLight: baseProperties.fontWeightLight,
  fontWeightRegular: baseProperties.fontWeightRegular,
  fontWeightMedium: baseProperties.fontWeightMedium,
  fontWeightBold: baseProperties.fontWeightBold,

  h1: {
    fontSize: pxToRem(48),
    lineHeight: 1.25,
    ...baseHeadingProperties,
  },

  h2: {
    fontSize: pxToRem(36),
    lineHeight: 1.3,
    ...baseHeadingProperties,
  },

  h3: {
    fontSize: pxToRem(30),
    lineHeight: 1.375,
    ...baseHeadingProperties,
  },

  h4: {
    fontSize: pxToRem(24),
    lineHeight: 1.375,
    ...baseHeadingProperties,
  },

  h5: {
    fontSize: pxToRem(20),
    lineHeight: 1.375,
    ...baseHeadingProperties,
  },

  h6: {
    fontSize: pxToRem(16),
    lineHeight: 1.625,
    ...baseHeadingProperties,
  },

  subtitle1: {
    fontFamily: baseProperties.fontFamily,
    fontSize: baseProperties.fontSizeXL,
    fontWeight: baseProperties.fontWeightLight,
    lineHeight: 1.625,
  },

  subtitle2: {
    fontFamily: baseProperties.fontFamily,
    fontSize: baseProperties.fontSizeMD,
    fontWeight: baseProperties.fontWeightLight,
    lineHeight: 1.6,
  },

  body1: {
    fontFamily: baseProperties.fontFamily,
    fontSize: baseProperties.fontSizeXL,
    fontWeight: baseProperties.fontWeightRegular,
    lineHeight: 1.625,
  },

  body2: {
    fontFamily: baseProperties.fontFamily,
    fontSize: baseProperties.fontSizeMD,
    fontWeight: baseProperties.fontWeightLight,
    lineHeight: 1.6,
  },

  button: {
    fontFamily: baseProperties.fontFamily,
    fontSize: baseProperties.fontSizeSM,
    fontWeight: baseProperties.fontWeightLight,
    lineHeight: 1.5,
    textTransform: "capitalize",
  },

  caption: {
    fontFamily: baseProperties.fontFamily,
    fontSize: baseProperties.fontSizeXS,
    fontWeight: baseProperties.fontWeightLight,
    lineHeight: 1.25,
  },

  overline: {
    fontFamily: baseProperties.fontFamily,
  },

  d1: {
    fontSize: pxToRem(80),
    ...baseDisplayProperties,
  },

  d2: {
    fontSize: pxToRem(72),
    ...baseDisplayProperties,
  },

  d3: {
    fontSize: pxToRem(64),
    ...baseDisplayProperties,
  },

  d4: {
    fontSize: pxToRem(56),
    ...baseDisplayProperties,
  },

  d5: {
    fontSize: pxToRem(48),
    ...baseDisplayProperties,
  },

  d6: {
    fontSize: pxToRem(40),
    ...baseDisplayProperties,
  },

  size: {
    xxs: baseProperties.fontSizeXXS,
    xs: baseProperties.fontSizeXS,
    sm: baseProperties.fontSizeSM,
    md: baseProperties.fontSizeMD,
    lg: baseProperties.fontSizeLG,
    xl: baseProperties.fontSizeXL,
    "2xl": baseProperties.fontSize2XL,
    "3xl": baseProperties.fontSize3XL,
    "4xl": baseProperties.fontSize4XL,
    "4xxl": baseProperties.fontSize4XXL,
    "8xl": baseProperties.fontSize8XL,
    

    "hxs": baseProperties.fontSizeHXS,
    "hsm": baseProperties.fontSizeHSM,
    "hmd": baseProperties.fontSizeHMD,
    "hlg": baseProperties.fontSizeHLG,
    "hxl": baseProperties.fontSizeHXL,
    "hxxl": baseProperties.fontSizeHXXL,
    "hxxel": baseProperties.fontSizeHXXEL,
    "hel": baseProperties.fontSizeHEL,
    "hxel": pxToRem(50),

    "h2xs": pxToRem(26),
    "h2sm":pxToRem(26),
    "h2md": pxToRem(26),
    "h2lg": pxToRem(30),
    "h2xl":pxToRem(38),
    "h2xxl": pxToRem(34),
    "h2xxel":pxToRem(36),
    "h2el": pxToRem(38)
  },

  lineHeight: {
    xxs: pxToRem(10.4),
    xs: pxToRem(12),
    sm: pxToRem(14),
    md: pxToRem(16),
    lg: pxToRem(18),
    xl: pxToRem(20),
    "xxl": pxToRem(22),
    "2xl": pxToRem(24),
    "2xxl": pxToRem(26),
    "3xl": pxToRem(30),
    "4xl" : pxToRem(32),
    "5xl" : pxToRem(40),
    "6xl": pxToRem(44),
    "8xl": pxToRem(64),


    hxs: pxToRem(28),
    hsm: pxToRem(28),
    hmd: pxToRem(34),
    hlg: pxToRem(38),
    hxl: pxToRem(40),
    hxxl: pxToRem(56),
    hxxel: pxToRem(60),
    hel: pxToRem(62),
   
  },
};

export default typography;
