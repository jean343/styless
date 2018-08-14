import VariableNode from "../tree/VariableNode";
import {convertNode as c} from "../tree/convert";

export const iscolor = value => {
    const is = col => {
        try {
            require("polished").parseToRgb(col);
            return true;
        } catch (e) {
            return false;
        }
    }
    return new VariableNode(`(${is})(${c(value)}).toString()`);
};
export const isnumber = value => {
    return new VariableNode(`(!isNaN(parseFloat(${c(value)}))).toString()`);
};
export const isstring = value => {
    return new VariableNode(`(('' + ${c(value)})[0] === '"').toString()`);
};