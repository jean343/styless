import VariableNode from "../tree/VariableNode";
import {convertNode as c} from "../tree/convert";

export const rgb = (r, g, b) => {
    return rgba(r, g, b, 1);
};
export const rgba = (r, g, b, a) => {
    if (g) {
        return new VariableNode(`require("tinycolor2")({ r: ${c(r)}, g: ${c(g)}, b: ${c(b)}, a: ${c(a)} }).toHex8String()`);
    } else {
        return new VariableNode(`require("tinycolor2")(${c(r)}).toHex8String()`);
    }
};
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
export const argb = color => {
    return new VariableNode(`${c(rgba(color))}.replace(/#(\\w{6})(\\w{2})/, "#$2$1")`);
};
// color
// tint
// shade