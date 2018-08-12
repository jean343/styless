import Node from 'less/lib/less/tree/node';

export default class VariableNode extends Node {
    constructor(value, longValue) {
        super()
        this.value = value;
    }

    genCSS(context, output) {
        output.add(`\${props => ${this.value}}`);
    }

    toCSS(context, doNotCompress) {
        return this.value;
    }
}