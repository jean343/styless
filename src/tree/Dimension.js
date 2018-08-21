import dimension from 'less/lib/less/tree/dimension';
import VariableNode from "./VariableNode";

export default class Dimension extends dimension {
    constructor(value, unit) {
        super(value, unit);
    }

    static operate(context, self, op, other) {
        let unit = (self.unit && self.unit.toString()) || (other.unit && other.unit.toString());
        if (unit) {
            unit = `"${unit}"`;
        } else {
            unit = `(('' + ${self.value}).replace(/[\\d.-]*/, "") || ('' + ${other.value}).replace(/[\\d.-]*/, ""))`;
        }
        return new VariableNode(`parseFloat(${self.value}) ${op} parseFloat(${other.value}) + ${unit}`);
    }

    operate(context, op, other) {
        return Dimension.operate(context, this, op, other);
    }
}