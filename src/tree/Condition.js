import {convertNode as c} from './convert';

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
        var result = (function (op, a, b) {
            a = c(a, false);
            b = c(b, false);
            switch (op) {
                case 'and':
                    return `${a} && ${b}`;
                case 'or':
                    return `${a} || ${b}`;
                case '=':
                    return `${a} === ${b}`;
                default:
                    return `${a} ${op} ${b}`;
            }
        })(this.op, this.lvalue.eval(context), this.rvalue.eval(context));

        if (this.negate) {
            return `!${result}`;
        } else {
            return result;
        }
    }
}