import convert from './convert';
import Node from 'less/lib/less/tree/node';

class VariableNode extends Node {
    constructor(value, longValue) {
        super()
        this.value = value;
        this.longValue = longValue;
    }

    genCSS(context, output) {
        output.add(this.longValue);
    }

    toCSS(context, doNotCompress) {
        return this.value;
    }
}

export default class Variable {
    constructor(name, index, currentFileInfo) {
        this.name = name;
        this._index = index;
        this._fileInfo = currentFileInfo;
    }

    eval() {
        return new VariableNode(convert(this.name), `\${props => ${convert(this.name)}}`);
    }
}