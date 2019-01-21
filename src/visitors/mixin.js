import Node from 'less/lib/less/tree/node';

class MixinNode extends Node {
    constructor(condition, value) {
        super();
        this.condition = condition;
        this.value = value;
    }

    genCSS(context, output) {
        output.add(`\${props => ${this.condition.value} && css\``);
        for (let value of this.value) {
            value.genCSS(context, output);
        }
        output.add(`\`}`);
    }

    toCSS(context, doNotCompress) {
        return this.value;
    }
}

export default less => {
    less.tree.mixin.Definition.prototype.matchCondition = function (args, context) {
        if (!this.condition) return true;
        const result = this.condition.eval(
            new less.contexts.Eval(context,
                [this.evalParams(context, /* the parameter variables */
                    new less.contexts.Eval(context, this.frames ? this.frames.concat(context.frames) : context.frames), args, [])]
                    .concat(this.frames || []) // the parent namespace/mixin frames
                    .concat(context.frames)));
        return result;
    };

    less.tree.mixin.Call.prototype.eval = function (context) {
        let mixins, args = [], rules = [];
        this.selector = this.selector.eval(context);

        const noArgumentsFilter = function (rule) {
            return rule.matchArgs(null, context);
        };

        for (let i = 0; i < this.arguments.length; i++) {
            const arg = this.arguments[i];
            let argValue = arg.value.eval(context);
            if (arg.expand && Array.isArray(argValue.value)) {
                argValue = argValue.value;
                for (let m = 0; m < argValue.length; m++) {
                    args.push({value: argValue[m]});
                }
            } else {
                args.push({name: arg.name, value: argValue});
            }
        }

        for (let i = 0; i < context.frames.length; i++) {
            if ((mixins = context.frames[i].find(this.selector, null, noArgumentsFilter)).length > 0) {
                for (let m = 0; m < mixins.length; m++) {
                    let mixin = mixins[m].rule;
                    const match = mixin.matchCondition(args, context);

                    try {
                        if (!(mixin instanceof less.tree.mixin.Definition)) {
                            const originalRuleset = mixin.originalRuleset || mixin;
                            mixin = new less.tree.mixin.Definition('', [], mixin.rules, null, false, null, originalRuleset.visibilityInfo());
                            mixin.originalRuleset = originalRuleset;
                        }
                        const evalCall = mixin.evalCall(context, args, this.important);
                        const newRules = match === true ? evalCall.rules : [new MixinNode(match, evalCall.rules)];
                        this._setVisibilityToReplacement(newRules);
                        Array.prototype.push.apply(rules, newRules);
                    } catch (e) {
                        throw {message: e.message, index: this.getIndex(), filename: this.fileInfo().filename, stack: e.stack};
                    }
                }
            }
        }

        if (rules.length) {
            return rules;
        }
    };
};