import VariableNode from "../tree/VariableNode";
import {convertNode as c} from "../tree/convert";

const apply = (fn, n) => fn(parseFloat(n)) + ('' + n).replace(/[\d.]*/, "");

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
    return new VariableNode(`(${apply})(Math.tan, ${c(value)})`);
};
export const sin = value => {
    return new VariableNode(`(${apply})(Math.sin, ${c(value)})`);
};
export const cos = value => {
    return new VariableNode(`(${apply})(Math.cos, ${c(value)})`);
};
export const atan = value => {
    return new VariableNode(`(${apply})(Math.atan, ${c(value)})`);
};
export const asin = value => {
    return new VariableNode(`(${apply})(Math.asin, ${c(value)})`);
};
export const acos = value => {
    return new VariableNode(`(${apply})(Math.acos, ${c(value)})`);
};
export const round = value => {
    return new VariableNode(`(${apply})(Math.round, ${c(value)})`);
};