import {convertNode as c} from './convert';
import VariableNode from "./VariableNode";

export default class Condition {
    constructor(op, l, r, i, negate) {
        this.op = op.trim();
        this.lvalue = l;
        this.rvalue = r;
        this._index = i;
        this.negate = negate;
    }

    accept(visitor) {
        this.lvalue = visitor.visit(this.lvalue);
        this.rvalue = visitor.visit(this.rvalue);
    }

    eval(context) {
        let a = this.lvalue.eval(context);
        let b = this.rvalue.eval(context);
        a = a.value ? a.value : c(a);
        b = b.value ? b.value : c(b);
        let result;
        switch (this.op) {
            case 'and':
                result = `${a} && ${b}`;
                break;
            case 'or':
                result = `${a} || ${b}`;
                break;
            case '=':
                if (b === "true") {
                    result = `!!${a}`;
                } else {
                    result = `${a} == ${b}`;
                }
                break;
            default:
                result = `parseFloat(${a}) ${this.op} parseFloat(${b})`;
                break;
        }

        if (this.negate) {
            return new VariableNode(`!${result}`);
        } else {
            return new VariableNode(result);
        }
    }
}