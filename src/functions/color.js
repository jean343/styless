import VariableNode from "../tree/VariableNode";
import {convertNode as c} from "../tree/convert";

const parse = color => {
    return new VariableNode(`require("tinycolor2")(${c(color)}).toHex8String()`);
};

export const rgb = (r, g, b) => {
    return rgba(r, g, b, 1);
};
export const rgba = (r, g, b, a) => {
    if (g) {
        return new VariableNode(`require("tinycolor2")({ r: ${c(r)}, g: ${c(g)}, b: ${c(b)}, a: ${c(a)} }).toHex8String()`);
    } else {
        return parse(r);
    }
};
export const hsl = (h, s, l) => {
    return hsla(h, s, l, 1);
};
export const hsla = (h, s, l, a) => {
    if (s) {
        return new VariableNode(`require("tinycolor2")({ h: ${c(h)}, s: ${c(s)}, l: ${c(l)}, a: ${c(a)} }).toHex8String()`);
    } else {
        return parse(h);
    }
};
export const hsv = (h, s, v) => {
    return hsva(h, s, v, 1);
};
export const hsva = (h, s, v, a) => {
    if (s) {
        return new VariableNode(`require("tinycolor2")({ h: ${c(h)}, s: ${c(s)}, v: ${c(v)}, a: ${c(a)} }).toHex8String()`);
    } else {
        return parse(h);
    }
};
export const hue = color => {
    return new VariableNode(`Math.round(require("tinycolor2")(${c(color)}).toHsl().h)`);
};
export const saturation = color => {
    return new VariableNode(`Math.round(require("tinycolor2")(${c(color)}).toHsl().s * 100) + "%"`);
};
export const lightness = color => {
    return new VariableNode(`Math.round(require("tinycolor2")(${c(color)}).toHsl().l * 100) + "%"`);
};
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