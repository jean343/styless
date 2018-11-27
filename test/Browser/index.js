import Less from "less/lib/less/";
import * as functions from '../../src/functions';
import Variable from "../../src/tree/Variable";
import VariableNode from "../../src/tree/VariableNode";
import Condition from "../../src/tree/Condition";
import Negative from "../../src/tree/Negative";
import Dimension from "../../src/tree/Dimension";
import fileManager from "less/lib/less-browser/file-manager";
import utils from "less/lib/less/utils";

let str = `
    box-shadow: if(not @disabled, inset 0 0 0 30px rgba(255, 255, 255, 0.5));
`;
const less = new Less();

less.tree.Variable = Variable;
less.tree.Condition = Condition;
less.tree.Negative = Negative;
less.tree.Dimension = Dimension;
VariableNode.prototype = new less.tree.Node();

console.log(utils)
const Paren = less.tree.Paren;
const Selector = less.tree.Selector;
const joinSelector = less.tree.Ruleset.prototype.joinSelector.toString().replace("if (el.value !== '&') {", "if (el.value !== '&' || context.length === 0) {");
eval(`less.tree.Ruleset.prototype.joinSelector = ${joinSelector}`);

less.functions.functionRegistry.addMultiple(functions);
const FileManager = fileManager({}, console);
less.FileManager = new FileManager();
less.PluginLoader = class PluginLoader {
};
let root, imports, options;
less.tree.Expression.prototype.genCSS = function (context, output) {
    const cssFragment = context.cssFragment && this.value.some(v => v instanceof VariableNode);
    if (cssFragment) output.add('`');
    for (let i = 0; i < this.value.length; i++) {
        const value = this.value[i];
        if (cssFragment && value instanceof VariableNode) {
            output.add(`\${${value.value}}`);
        } else {
            value.genCSS(context, output);
        }
        if (!(this.noSpacing || value.noSpacing) && i + 1 < this.value.length) {
            output.add(' ');
        }
    }
    if (cssFragment) output.add('`');
};
less.tree.Anonymous.prototype.eval = function () {
    const anonymous = new less.tree.Anonymous(this.value, this._index, this._fileInfo, this.mapLines, this.rulesetLike, this.visibilityInfo());
    anonymous.noSpacing = this.noSpacing;
    return anonymous;
};
let last;
Object.defineProperty(less.tree.Node.prototype, 'parse', {
    get: () => {
        return last;
    },
    set: self => {
        last = self;
        const parseJS = (orig, treeConstructor, isDeclaration) => {
            const val = orig();
            if (val)
                return val;

            let name;
            self.parserInput.save();
            if (self.parserInput.currentChar() === '$' && (name = consumeBrackets(self.parserInput))) {
                if (isDeclaration && !name.includes("css")) {
                    self.parserInput.save();
                    self.parserInput.$str(name);
                    if (self.parserInput.currentChar() !== ';') {
                        self.parserInput.restore();
                        return;
                    }
                }

                self.parserInput.$str(name);
                const anonymous = new (less.tree.Anonymous)(name, self.parserInput.i, self.fileInfo);
                anonymous.noSpacing = self.parserInput.prevChar() !== " ";
                if (treeConstructor) {
                    return treeConstructor(anonymous);
                } else {
                    return anonymous;
                }
            }
            self.parserInput.restore();
        };

        self.parsers.declaration = parseJS.bind(null, self.parsers.declaration.bind(self.parsers), undefined, true);
        self.parsers.entities.variable = parseJS.bind(null, self.parsers.entities.variable.bind(self.parsers));
        self.parsers.element = parseJS.bind(null, self.parsers.element.bind(self.parsers), anonymous => {
            const c = self.parsers.combinator();
            return new (less.tree.Element)(c, anonymous, true, self.parserInput.i, self.fileInfo);
        });

        // self.parsers.selectors = () => {
        //     let name;
        //     self.parserInput.save();
        //     if (name = self.parserInput.$re(/^[^{]*/)) {
        //         let allExtends, condition;
        //         return new (less.tree.Selector)(name, allExtends, condition, self.parserInput.i, self.fileInfo);
        //         // return new (less.tree.Anonymous)(name, self.parserInput.i, self.fileInfo);
        //     }
        //     self.parserInput.restore();
        // };
    },
    configurable: true
});

less.parse(str, {math: 0}, (e, _root, _imports, _options) => {
    console.log("2", less.tree.Node.prototype.parse)
    if (e) {
        console.error(e);
    }
    root = _root;
    imports = _imports;
    options = _options;
});
console.log("root", root);
if (!root) return;
root.firstRoot = false;

const parseTree = new less.ParseTree(root, imports);
const {css} = parseTree.toCSS(options);
console.log("result:\n", css);