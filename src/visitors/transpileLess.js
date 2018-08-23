import Less from "less/lib/less/";
import Variable from "../tree/Variable";
import Condition from "../tree/Condition";
import Negative from "../tree/Negative";
import Dimension from "../tree/Dimension";
import * as functions from '../functions';

export default source => {
    const less = new Less();
    Object.defineProperty(less.tree.Node.prototype, 'parse', {
        set: self => {
            const old_declaration = self.parsers.declaration;
            self.parsers.declaration = function () {
                const val = old_declaration.call(self.parsers);
                if (val)
                    return val;

                let name;
                self.parserInput.save();
                if (self.parserInput.currentChar() === '$' && (name = self.parserInput.$re(/^\${[\s\S]*?}/))) {
                    return new (less.tree.Anonymous)(name, self.parserInput.i, self.fileInfo);
                }
                self.parserInput.restore();
            };

            const old_variable = self.parsers.entities.variable;
            self.parsers.entities.variable = function () {
                const val = old_variable.call(self);
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
        },
        enumerable: true,
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

    let root, imports, options;
    less.parse(source, {math: 0}, (e, _root, _imports, _options) => {
        if (e) {
            console.error(e);
        }
        root = _root;
        imports = _imports;
        options = _options;
    });
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