import VariableNode from "../tree/VariableNode";
import {convertNode as c} from "../tree/convert";

// rgb
// rgba
// hsl
// hsla
// hsv
// hsva
export const hue = color => {
    return new VariableNode(`require("tinycolor2")(${c(color)}).toHsl().h * 100`);
};
// saturation
// lightness
// hsvhue
// hsvsaturation
// hsvvalue
// red
// green
// blue
// alpha
export const luma = color => {
    return new VariableNode(`require("tinycolor2")(${c(color)}).getLuminance() * 100`);
};
// luminance
// saturate
// desaturate
// lighten
// darken
// fadein
// fadeout
// fade
// spin
// mix
// greyscale
// contrast
// contrast
// argb
// color
// tint
// shade