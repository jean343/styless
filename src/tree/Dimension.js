import dimension from 'less/lib/less/tree/dimension';
import VariableNode from "./VariableNode";
import operate from "./operate";

export default class Dimension extends dimension {
    constructor(value, unit) {
        super(value, unit);
    }

    operate(context, op, other) {
        return new VariableNode(operate(context, this, op, other));
    }
}