import path from "path";
import deasync from "deasync";
import Less from "less/lib/less/";
import FileManager from "less/lib/less-node/file-manager";
import Variable from "../tree/Variable";
import Condition from "../tree/Condition";
import Negative from "../tree/Negative";
import Dimension from "../tree/Dimension";
import * as functions from '../functions';

export default (source, filename) => {
    const less = new Less(undefined, [new FileManager()]);
    let lastSelf;
    Object.defineProperty(less.tree.Node.prototype, 'parse', {
        get: () => lastSelf,
        set: self => {
            lastSelf = self;
            const parseJS = orig => {
                const val = orig();
                if (val)
                    return val;

                let name;
                self.parserInput.save();
                if (self.parserInput.currentChar() === '$' && (name = self.parserInput.$re(/^\${[\s\S]*?}/))) {
                    const anonymous = new (less.tree.Anonymous)(name, self.parserInput.i, self.fileInfo);
                    anonymous.noSpacing = self.parserInput.prevChar() !== " ";
                    return anonymous;
                }
                self.parserInput.restore();
            };

            self.parsers.declaration = parseJS.bind(null, self.parsers.declaration.bind(self.parsers));
            self.parsers.entities.variable = parseJS.bind(null, self.parsers.entities.variable.bind(self.parsers));
        },
        configurable: true
    });
    less.tree.Variable = Variable;
    less.tree.Condition = Condition;
    less.tree.Negative = Negative;
    less.tree.Dimension = Dimension;
    less.tree.Expression.prototype.genCSS = function (context, output) {
        for (var i = 0; i < this.value.length; i++) {
            this.value[i].genCSS(context, output);
            if (!(this.noSpacing || this.value[i].noSpacing) && i + 1 < this.value.length) {
                output.add(' ');
            }
        }
    };
    less.tree.Anonymous.prototype.eval = function () {
        const anonymous = new less.tree.Anonymous(this.value, this._index, this._fileInfo, this.mapLines, this.rulesetLike, this.visibilityInfo());
        anonymous.noSpacing = this.noSpacing;
        return anonymous;
    };
    less.functions.functionRegistry.addMultiple(functions);
    less.PluginLoader = class PluginLoader {
    };

    const parse = deasync((input, options, callback) => less.parse(input, options, (e, root, imports, options) => callback(e, {root, imports, options})));
    const {root, imports, options} = parse(source, {math: 0, paths: path.dirname(filename)});
    if (!root) {
        console.error("Failed to parse", source);
        return source;
    }
    // Disables the validation: Properties must be inside selector blocks. They cannot be in the root
    root.firstRoot = false;

    const parseTree = new less.ParseTree(root, imports);
    const {css} = parseTree.toCSS(options);
    return css;
}