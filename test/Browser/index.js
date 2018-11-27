import Less from "less/lib/less/";
import * as functions from '../../src/functions';
import Variable from "../../src/tree/Variable";
import Condition from "../../src/tree/Condition";
import Negative from "../../src/tree/Negative";
import Dimension from "../../src/tree/Dimension";
import {anonymousEval, genCSS, nodeParse} from "../../src/visitors/utils";
import JavaScript from "../../src/tree/JavaScript";

const less = new Less();

let source = `
    box-shadow: if(not @disabled, inset 0 0 0 30px rgba(255, 255, 255, 0.5));
`;

const transpile = async (less, source, filename, opts = {}) => {
    const parseOpts = Object.assign({}, {math: 0},);

    const {root, imports, options} = await new Promise(resolve => {
        less.parse(source, parseOpts, (e, root, imports, options) => resolve({root, imports, options}));
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
};

Object.defineProperty(less.tree.Node.prototype, 'parse', nodeParse(less));
less.tree.Variable = Variable;
less.tree.Condition = Condition;
less.tree.Negative = Negative;
less.tree.Dimension = Dimension;
less.tree.JavaScript = JavaScript;
less.tree.Expression.prototype.genCSS = genCSS(less);
less.tree.Anonymous.prototype.eval = anonymousEval(less);

// Changes the function joinSelector to allow & selectors in the root element. Useful for overriding styles with higher specificity.
const {Paren, Selector, Element} = less.tree;
const joinSelector = less.tree.Ruleset.prototype.joinSelector.toString().replace("if (el.value !== '&') {", "if (el.value !== '&' || context.length === 0) {");
eval(`less.tree.Ruleset.prototype.joinSelector = ${joinSelector}`);

less.functions.functionRegistry.addMultiple(functions);
less.PluginLoader = class PluginLoader {
};

transpile(less, source, "filename", {}).then(console.log.bind(console));