import {convertNode as c} from './convert';
import VariableNode from "./VariableNode";
import Keyword from 'less/lib/less/tree/keyword';

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
        const convert = o => {
            if (o instanceof Keyword && o.value !== "true" && o.value !== "false") {
                return `"${o.value}"`;
            }
            return o.value ? o.value : c(a);
        };

        let a = convert(this.lvalue.eval(context));
        let b = convert(this.rvalue.eval(context));
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
                } else if (b === "false") {
                    result = `!${a}`;
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