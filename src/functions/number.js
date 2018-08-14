import VariableNode from "../tree/VariableNode";
import {convertNode as c} from "../tree/convert";

export const min = (...args) => {
    const min = arr => arr[arr.reduce((iMax, x, i) => parseFloat(x) < parseFloat(arr[iMax]) ? i : iMax, 0)];
    return new VariableNode(`(${min})([${args.map(a => c(a)).join(", ")}])`);
};
export const max = (...args) => {
    const max = arr => arr[arr.reduce((iMax, x, i) => parseFloat(x) > parseFloat(arr[iMax]) ? i : iMax, 0)];
    return new VariableNode(`(${max})([${args.map(a => c(a)).join(", ")}])`);
};
export const mod = (x, y) => {
    const apply = (x, y) => parseFloat(x) % parseFloat(y) + ('' + x).replace(/[\d.-]*/, "");
    return new VariableNode(`(${apply})(${c(x)}, ${c(y)})`);
};
export const pow = (x, y) => {
    const apply = (x, y) => Math.pow(parseFloat(x), parseFloat(y)) + ('' + x).replace(/[\d.-]*/, "");
    return new VariableNode(`(${apply})(${c(x)}, ${c(y)})`);
};
export const percentage = value => {
    return new VariableNode(`(parseFloat(${c(value)}) * 100) + "%"`);
};