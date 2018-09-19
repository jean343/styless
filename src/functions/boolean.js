import VariableNode from '../tree/VariableNode';
import {convertNode as c} from "../tree/convert";

export const boolean = condition => {
    return new VariableNode(`!!(${c(condition)})`);
};

const _if = (condition, trueValue, falseValue) => {
    return new VariableNode(`(${c(condition)}) ? ${c(trueValue)} : ${c(falseValue)}`);
};
export {_if as if};