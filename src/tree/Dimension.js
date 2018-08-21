import dimension from 'less/lib/less/tree/dimension';
import convert from './convert';
import VariableNode from "./VariableNode";

export default class Dimension extends dimension {
    constructor(value, unit) {
        super(value, unit);
    }

    static operate(context, self, op, other) {
        let unit = self.unit;
        if (!unit) {
            unit = `('' + ${self.value}).replace(/[\\d.-]*/, "")`;
        } else {
            unit = `"${unit}"`;
        }
        return new VariableNode(`parseFloat(${self.value}) ${op} parseFloat(${other.value}) + ${unit}`);
    }

    operate(context, op, other) {
        return Dimension.operate(context, this, op, other);
    }
}