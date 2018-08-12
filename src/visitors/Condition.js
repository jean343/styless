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
            switch (op) {
                case 'and':
                    return `${a.value} && ${b.value}`;
                case 'or':
                    return `${a.value} || ${b.value}`;
                case '=':
                    return `${a.value} === ${b.value}`;
                default:
                    return `${a.value} ${op} ${b.value}`;
            }
        })(this.op, this.lvalue.eval(context), this.rvalue.eval(context));

        return this.negate ? !result : result;
    }
}