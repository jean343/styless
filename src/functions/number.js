import VariableNode from "../tree/VariableNode";
import {convertNode as c} from "../tree/convert";

export const percentage = value => {
    return new VariableNode(`(parseFloat(${c(value)}) * 100) + "%"`);
};
export const mod = (x, y) => {
    const apply = (x, y) => parseFloat(x) % parseFloat(y) + ('' + x).replace(/[\d.-]*/, "");
    return new VariableNode(`(${apply})(${c(x)}, ${c(y)})`);
};
export const pow = (x, y) => {
    const apply = (x, y) => Math.pow(parseFloat(x), parseFloat(y)) + ('' + x).replace(/[\d.-]*/, "");
    return new VariableNode(`(${apply})(${c(x)}, ${c(y)})`);
};