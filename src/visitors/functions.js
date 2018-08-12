import Color from "less/lib/less/tree/color";
import VariableNode from './VariableNode';

const c = v => {
    if (!v)
        return `""`;
    const value = v.toCSS();
    if (v instanceof VariableNode) {
        return value;
    }
    return `"${value}"`;
};

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