import VariableNode from '../tree/VariableNode';
import {convertNode as c} from "../tree/convert";

export const lighten = (color, amount, method) => {
    return new VariableNode(`require('tinycolor2')(${c(color)}).lighten(${amount.value}).toString()`);
};

export const darken = (color, amount, method) => {
    return new VariableNode(`require('tinycolor2')(${c(color)}).darken(${amount.value}).toString()`);
};