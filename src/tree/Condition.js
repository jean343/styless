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
        let a = c(this.lvalue.eval(context));
        let b = c(this.rvalue.eval(context));
        let result;
        switch (this.op) {
            case 'and':
                result = `${a} && ${b}`;
                break;
            case 'or':
                result = `${a} || ${b}`;
                break;
            case '=':
                result = `${a} === ${b}`;
                break;
            default:
                result = `${a} ${this.op} ${b}`;
                break;
        }

        if (this.negate) {
            return new VariableNode(`!${result}`);
        } else {
            return new VariableNode(result);
        }
    }
}