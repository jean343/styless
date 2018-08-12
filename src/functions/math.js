import VariableNode from "../tree/VariableNode";
import {convertNode as c} from "../tree/convert";

export const ceil = value => {
    return new VariableNode(`Math.ceil(${c(value)})`);
};
export const floor = value => {
    return new VariableNode(`Math.floor(${c(value)})`);
};
export const sqrt = value => {
    return new VariableNode(`Math.sqrt(${c(value)})`);
};
export const abs = value => {
    return new VariableNode(`Math.abs(${c(value)})`);
};
export const tan = value => {
    return new VariableNode(`Math.tan(${c(value)})`);
};
export const sin = value => {
    return new VariableNode(`Math.sin(${c(value)})`);
};
export const cos = value => {
    return new VariableNode(`Math.cos(${c(value)})`);
};
export const atan = value => {
    return new VariableNode(`Math.atan(${c(value)})`);
};
export const asin = value => {
    return new VariableNode(`Math.asin(${c(value)})`);
};
export const acos = value => {
    return new VariableNode(`Math.acos(${c(value)})`);
};
export const round = value => {
    return new VariableNode(`Math.round(${c(value)})`);
};