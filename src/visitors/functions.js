import VariableNode from './VariableNode';
import {convertNode as c} from "./convert";

const _if = (condition, trueValue, falseValue) => {
    return new VariableNode(`${condition} ? ${c(trueValue)} : ${c(falseValue)}`);
};
export {_if as if};

export const lighten = (color, amount, method) => {
    return new VariableNode(`require("polished").lighten(${amount.value / 100}, ${c(color)})`);
};

export const darken = (color, amount, method) => {
    return new VariableNode(`require("polished").darken(${amount.value / 100}, ${c(color)})`);
};