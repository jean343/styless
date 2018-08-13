import VariableNode from "../tree/VariableNode";
import {convertNode as c} from "../tree/convert";

export const percentage = value => {
    return new VariableNode(`(parseFloat(${c(value)}) * 100) + "%"`);
};