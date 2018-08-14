import VariableNode from "../tree/VariableNode";
import {convertNode as c} from "../tree/convert";

export const luma = color => {
    return new VariableNode(`require("polished").getLuminance(${c(color)}) * 100`);
};