import variable from 'less/lib/less/tree/variable';
import convert, {convertNode as c} from './convert';
import VariableNode from './VariableNode';

export default class Variable extends variable {
    constructor(name, index, currentFileInfo) {
        super(name, index, currentFileInfo);
        this.name = name;
        this._index = index;
        this._fileInfo = currentFileInfo;
    }

    eval(context) {
        let localVariable;
        try {
            localVariable = super.eval(context);
        } finally {
            return new VariableNode(convert(this.name, c(localVariable, {cssFragment: true})));
        }
    }
}