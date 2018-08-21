import node from 'less/lib/less/tree/node';
import convert from './convert';
import VariableNode from './VariableNode';

export default class Negative extends node {
    constructor(node) {
        super(node);
        this.value = node;
    }

    eval(context) {
        return new VariableNode(`"-" + (${convert(this.value.name)})`);
    }
}