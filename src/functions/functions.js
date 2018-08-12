import VariableNode from '../tree/VariableNode';
import {convertNode as c} from "../tree/convert";

export const lighten = (color, amount, method) => {
    return new VariableNode(`require("polished").lighten(${amount.value / 100}, ${c(color)})`);
};

export const darken = (color, amount, method) => {
    return new VariableNode(`require("polished").darken(${amount.value / 100}, ${c(color)})`);
};