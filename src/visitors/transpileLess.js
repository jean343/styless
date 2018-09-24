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
import {genCSS, anonymousEval, nodeParse} from "./utils";

const transpile = (less, source, filename) => {
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
};

export default (source, filename) => {
    const less = new Less(undefined, [new FileManager()]);
    const oldGenCSS = less.tree.Expression.prototype.genCSS;
    const oldEval = less.tree.Anonymous.prototype.eval;
    const oldTree = Object.assign({}, less.tree);
    const oldFunctionRegistry = Object.assign({}, less.functions.functionRegistry._data);
    const oldJoinSelector = less.tree.Ruleset.prototype.joinSelector;
    try {
        Object.defineProperty(less.tree.Node.prototype, 'parse', nodeParse(less));
        less.tree.Variable = Variable;
        less.tree.Condition = Condition;
        less.tree.Negative = Negative;
        less.tree.Dimension = Dimension;
        less.tree.Expression.prototype.genCSS = genCSS(less);
        less.tree.Anonymous.prototype.eval = anonymousEval(less);

        // Changes the function joinSelector to allow & selectors in the root element. Useful for overriding styles with higher specificity.
        const {Paren, Selector, Element} = less.tree;
        const joinSelector = less.tree.Ruleset.prototype.joinSelector.toString().replace("if (el.value !== '&') {", "if (el.value !== '&' || context.length === 0) {");
        eval(`less.tree.Ruleset.prototype.joinSelector = ${joinSelector}`);

        less.functions.functionRegistry.addMultiple(functions);
        less.PluginLoader = class PluginLoader {
        };

        return transpile(less, source, filename);
    } finally {
        delete less.tree.Node.prototype.parse;
        Object.assign(less.tree, oldTree);
        less.tree.Expression.prototype.genCSS = oldGenCSS;
        less.tree.Anonymous.prototype.eval = oldEval;
        less.tree.Ruleset.prototype.joinSelector = oldJoinSelector;
        less.functions.functionRegistry._data = oldFunctionRegistry;
    }
}