import VariableNode from "../tree/VariableNode";
import {convertNode as c} from "../tree/convert";

export const iscolor = value => {
    return new VariableNode(`require('tinycolor2')(${c(value)}).isValid().toString()`);
};
export const isnumber = value => {
    return new VariableNode(`(!isNaN(parseFloat(${c(value)}))).toString()`);
};
export const isstring = value => {
    return new VariableNode(`(('' + ${c(value)})[0] === '"').toString()`);
};
export const ispixel = value => {
    return new VariableNode(`(('' + ${c(value)}).endsWith("px")).toString()`);
};
export const ispercentage = value => {
    return new VariableNode(`(('' + ${c(value)}).endsWith("%")).toString()`);
};
export const isem = value => {
    return new VariableNode(`(('' + ${c(value)}).endsWith("em")).toString()`);
};
export const isunit = (value, unit) => {
    return new VariableNode(`(('' + ${c(value)}).endsWith("${unit.value}")).toString()`);
};