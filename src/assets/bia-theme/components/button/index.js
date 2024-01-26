
// Material Dashboard  React Button Styles
import root from "assets/bia-theme/components/button/root";
import contained from "assets/bia-theme/components/button/contained";
import outlined from "assets/bia-theme/components/button/outlined";
import buttonText from "assets/bia-theme/components/button/text";

const button = {
  defaultProps: {
    disableRipple: false,
  },
  styleOverrides: {
    root: { ...root },
    contained: { ...contained.base },
    containedSizeSmall: { ...contained.small },
    containedSizeMedium: { ...contained.medium },
    containedSizeLarge: { ...contained.large },
    containedSizeExtraLarge: { ...contained.extraLarge },
    containedSizeInherit: { ...contained.inherit },
    containedPrimary: { ...contained.primary },
    containedSecondary: { ...contained.secondary },
    outlined: { ...outlined.base },
    outlinedSizeSmall: { ...outlined.small },
    outlinedSizeLarge: { ...outlined.large },
    outlinedPrimary: { ...outlined.primary },
    outlinedSecondary: { ...outlined.secondary },
    outlinedSizeExtraLarge: { ...outlined.extraLarge },
    outlinedSizeInherit: { ...outlined.inherit },
    text: { ...buttonText.base },
    textSizeSmall: { ...buttonText.small },
    textSizeLarge: { ...buttonText.large },
    textPrimary: { ...buttonText.primary },
    textSecondary: { ...buttonText.secondary },
  },
};

export default button;
