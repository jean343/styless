import convert from './convert';
import VariableNode from './VariableNode';

export default class Variable {
    constructor(name, index, currentFileInfo) {
        this.name = name;
        this._index = index;
        this._fileInfo = currentFileInfo;
    }

    eval() {
        return new VariableNode(convert(this.name));
    }
}