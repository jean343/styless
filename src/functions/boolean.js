import VariableNode from '../tree/VariableNode';
import {convertNode as c} from "../tree/convert";

export const boolean = condition => {
    return new VariableNode(`!!(${c(condition)})`);
};

const _if = (condition, trueValue, falseValue) => {
    const flags = {
        cssFragment: true
    };
    return new VariableNode(`(${c(condition)}) ? ${c(trueValue, flags)} : ${c(falseValue, flags)}`);
};
export {_if as if};