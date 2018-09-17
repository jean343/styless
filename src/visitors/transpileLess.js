import path from "path";
import deasync from "deasync";
import Less from "less/lib/less/";
import FileManager from "less/lib/less-node/file-manager";
import utils from "less/lib/less/utils";
import Variable from "../tree/Variable";
import Condition from "../tree/Condition";
import Negative from "../tree/Negative";
import Dimension from "../tree/Dimension";
import * as functions from '../functions';

const consumeBrackets = parserInput => {
    let inComment = false;
    let blockDepth = 0;
    const blockStack = [];
    const input = parserInput.getInput();
    const length = input.length;
    const lastPos = parserInput.i;
    let i = parserInput.i;
    let prevChar, nextChar;

    do {
        prevChar, nextChar = input.charAt(i);
        if (blockDepth === 0 && prevChar === "}") {
            return input.substr(lastPos, i - lastPos);
        } else {
            if (inComment) {
                if (nextChar === '*' &&
                    input.charAt(i + 1) === '/') {
                    i++;
                    blockDepth--;
                    inComment = false;
                }
                i++;
                continue;
            }
            switch (nextChar) {
                case '/':
                    if (input.charAt(i + 1) === '*') {
                        i++;
                        inComment = true;
                        blockDepth++;
                    }
                    break;
                case "'":
                case '"':
                    let quote = parserInput.$quoted(i);
                    if (quote) {
                        i += quote[1].length - 1;
                    }
                    break;
                case '{':
                    blockStack.push('}');
                    blockDepth++;
                    break;
                case '(':
                    blockStack.push(')');
                    blockDepth++;
                    break;
                case '[':
                    blockStack.push(']');
                    blockDepth++;
                    break;
                case '}':
                case ')':
                case ']':
                    var expected = blockStack.pop();
                    if (nextChar === expected) {
                        blockDepth--;
                    } else {
                        return expected;
                    }
            }
            i++;
        }
        prevChar = nextChar;
    } while (i <= length);
};

export default (source, filename) => {
    const less = new Less(undefined, [new FileManager()]);
    let lastSelf;
    Object.defineProperty(less.tree.Node.prototype, 'parse', {
        get: () => lastSelf,
        set: self => {
            lastSelf = self;
            const parseJS = (orig, treeConstructor, isDeclaration) => {
                const val = orig();
                if (val)
                    return val;

                let name;
                self.parserInput.save();
                if (self.parserInput.currentChar() === '$' && (name = consumeBrackets(self.parserInput))) {
                    // Makes the assumption that all nested code blocks have css in them.
                    if (isDeclaration && !name.includes("css")) {
                        return;
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

    // Changes the function joinSelector to allow & selectors in the root element. Useful for overriding styles with higher specificity.
    const Paren = less.tree.Paren;
    const Selector = less.tree.Selector;
    const Element = less.tree.Element;
    const joinSelector = less.tree.Ruleset.prototype.joinSelector.toString().replace("if (el.value !== '&') {", "if (el.value !== '&' || context.length === 0) {");
    eval(`less.tree.Ruleset.prototype.joinSelector = ${joinSelector}`);

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