import VariableNode from '../tree/VariableNode';
import {convertNode as c} from "../tree/convert";

export const boolean = condition => {
    return new VariableNode(`!!(${condition})`);
};

const _if = (condition, trueValue, falseValue) => {
    return new VariableNode(`(${condition}) ? ${c(trueValue)} : ${c(falseValue)}`);
};
export {_if as if};