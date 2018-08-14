import VariableNode from "../tree/VariableNode";
import {convertNode as c} from "../tree/convert";

export const isnumber = value => {
    return new VariableNode(`(!isNaN(parseFloat(${c(value)}))).toString()`);
};