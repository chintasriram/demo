// @mui material components
import { Card } from "@mui/material";
import { styled } from "@mui/material/styles";

export default styled(Card)(({ theme, ownerState }) => {
    const { palette, boxShadows, borders, functions } = theme;
    const { bgcolor, borderRadius, shadow, opacity, coloredShadow , color, isBorder} = ownerState;

    const { white, input } = palette;
    const { borderRadius: radius, borderWidth } = borders;
    const { colored } = boxShadows;
    const { rgba } = functions;
    
    const validBorderRadius = ["xs", "sm", "md", "lg", "xl", "xxl", "section"];
    const validBoxShadows = ["xs", "sm", "md", "lg", "xl", "xxl", "inset"];


    // borderRadius value
    let borderRadiusValue = borderRadius;

    if (validBorderRadius.find((el) => el === borderRadius)) {
        borderRadiusValue = radius[borderRadius];
    }

    // background value
    let backgroundValue = palette[bgcolor] ? palette[bgcolor].main : palette.transparent.main;


    // boxShadow value
    let boxShadowValue = "none";

    if (validBoxShadows.find((el) => el === shadow)) {
        boxShadowValue = boxShadows[shadow];
    } else if (coloredShadow) {
        boxShadowValue = colored[coloredShadow] ? colored[coloredShadow] : "none";
    }


    // color value
    let colorValue = palette[color] ? palette[color].main : white.main;

    // border color value
    let borderValue = (isBorder !== undefined && isBorder === false)? "none" : `${borderWidth[1]} solid ${rgba(input.background, 1)}`

    return {
        opacity,
        border: borderValue,
        borderRadius: borderRadiusValue,
        background: backgroundValue,
        color: colorValue,
        boxShadow: boxShadowValue,
    };
});
