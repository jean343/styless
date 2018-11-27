import Node from 'less/lib/less/tree/node';
import operate from "./operate";

export default class VariableNode extends Node {
    constructor(value, longValue) {
        super();
        this.value = value;
    }

    genCSS(context, output) {
        if (context && context.cssFragment) {
            output.add(`\${${this.value}}`);
        } else {
            output.add(`\${props => ${this.value}}`);
        }
    }

    toCSS(context, doNotCompress) {
        return this.value;
    }

    operate(context, op, other) {
        return new VariableNode(operate(context, this, op, other));
    }
}