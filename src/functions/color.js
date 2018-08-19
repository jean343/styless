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

export const hsvhue = color => {
    return new VariableNode(`Math.round(require("tinycolor2")(${c(color)}).toHsv().h)`);
};
export const hsvsaturation = color => {
    return new VariableNode(`Math.round(require("tinycolor2")(${c(color)}).toHsv().s * 100) + "%"`);
};
export const hsvvalue = color => {
    return new VariableNode(`Math.round(require("tinycolor2")(${c(color)}).toHsv().v * 100) + "%"`);
};

export const red = color => {
    return new VariableNode(`require("tinycolor2")(${c(color)}).toRgb().r`);
};
export const green = color => {
    return new VariableNode(`require("tinycolor2")(${c(color)}).toRgb().g`);
};
export const blue = color => {
    return new VariableNode(`require("tinycolor2")(${c(color)}).toRgb().b`);
};
export const alpha = color => {
    return new VariableNode(`Math.round(require("tinycolor2")(${c(color)}).toRgb().a * 100) / 100`);
};

export const luma = color => {
    return new VariableNode(`require("tinycolor2")(${c(color)}).getLuminance() * 100`);
};
export const luminance = color => {
    const compute = rgb => ((0.2126 * rgb.r / 255) + (0.7152 * rgb.g / 255) + (0.0722 * rgb.b / 255)) * rgb.a;
    return new VariableNode(`(${compute})(require("tinycolor2")(${c(color)}).toRgb()) * 100`);
};
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