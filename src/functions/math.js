import VariableNode from "../tree/VariableNode";
import {convertNode as c} from "../tree/convert";

const apply = (fn, n) => fn(parseFloat(n)) + ('' + n).replace(/[\d.-]*/, "");

const applyAngle = (fn, n, funit = "") => {
    const angle = {
        rad: 1,
        deg: Math.PI / 180,
        grad: Math.PI / 200,
        turn: Math.PI * 2,
    };
    const unit = ('' + n).replace(/[\d.-]*/, "") || "rad";
    return fn(parseFloat(n) * angle[unit]).toFixed(6) + funit;
};

export const ceil = value => {
    return new VariableNode(`(${apply})(Math.ceil, ${c(value)})`);
};
export const floor = value => {
    return new VariableNode(`(${apply})(Math.floor, ${c(value)})`);
};
export const sqrt = value => {
    return new VariableNode(`(${apply})(Math.sqrt, ${c(value)})`);
};
export const abs = value => {
    return new VariableNode(`(${apply})(Math.abs, ${c(value)})`);
};
export const tan = value => {
    return new VariableNode(`(${applyAngle})(Math.tan, ${c(value)})`);
};
export const sin = value => {
    return new VariableNode(`(${applyAngle})(Math.sin, ${c(value)})`);
};
export const cos = value => {
    return new VariableNode(`(${applyAngle})(Math.cos, ${c(value)})`);
};
export const atan = value => {
    return new VariableNode(`(${applyAngle})(Math.atan, ${c(value)}, "rad")`);
};
export const asin = value => {
    return new VariableNode(`(${applyAngle})(Math.asin, ${c(value)}, "rad")`);
};
export const acos = value => {
    return new VariableNode(`(${applyAngle})(Math.acos, ${c(value)}, "rad")`);
};
export const round = (value, fraction = {}) => {
    return new VariableNode(`(${apply})(num => num.toFixed(${fraction.value}), ${c(value)})`);
};