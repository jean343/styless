import path from "path";
import findBabelConfig from 'find-babel-config';
import Less from "less/lib/less/";
import FileManager from "less/lib/less-node/file-manager";
import _utils from "less/lib/less/utils";
import Variable from "../tree/Variable";
import Condition from "../tree/Condition";
import Negative from "../tree/Negative";
import Dimension from "../tree/Dimension";
import JavaScript from "../tree/JavaScript";
import * as functions from '../functions';
import {genCSS, anonymousEval, nodeParse} from "./utils";

const transpile = (less, source, filename, opts = {}) => {
    let banner = "";
    if (opts.import) {
        banner += `@import (reference) "${opts.import}";`;
    }
    const paths = [path.dirname(filename)];

    // Add the last semi-colon if needed
    source = source.trim();
    if (!source.endsWith(";")) {
        source += ";";
    }

    switch (opts.cwd) {
        case "babelrc":
            paths.push(path.dirname(findBabelConfig.sync(filename).file));
            break;
        default:
        case "cwd":
            paths.push(process.cwd());
            break;
    }

    const parseOpts = Object.assign(
        {},
        {
            math: 0,
            paths,
            banner,
            syncImport: true,
        },
        opts.lessOptions
    );

    let root, imports, options;
    less.parse(source, parseOpts, (e, _root, _imports, _options) => {
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
};

export default (source, filename, opts) => {
    const fileManager = new FileManager();
    // Adding support for scoped packages by removing the leading '~'
    fileManager.loadFile = function (filename, currentDirectory, options, environment, callback) {
        return FileManager.prototype.loadFile.call(this, filename.replace(/^~/, ""), currentDirectory, options, environment, callback);
    };

    const less = new Less(undefined, [fileManager]);
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
        less.tree.JavaScript = JavaScript;
        less.tree.Expression.prototype.genCSS = genCSS(less);
        less.tree.Anonymous.prototype.eval = anonymousEval(less);

        // Changes the function joinSelector to allow & selectors in the root element. Useful for overriding styles with higher specificity.
        const {Paren, Selector, Element} = less.tree;
        const joinSelector = less.tree.Ruleset.prototype.joinSelector.toString().replace("if (el.value !== '&') {", "if (el.value !== '&' || context.length === 0) {");
        let utils = _utils;
        eval(`less.tree.Ruleset.prototype.joinSelector = ${joinSelector}`);

        less.functions.functionRegistry.addMultiple(functions);
        less.PluginLoader = class PluginLoader {
        };

        return transpile(less, source, filename, opts);
    } finally {
        delete less.tree.Node.prototype.parse;
        Object.assign(less.tree, oldTree);
        less.tree.Expression.prototype.genCSS = oldGenCSS;
        less.tree.Anonymous.prototype.eval = oldEval;
        less.tree.Ruleset.prototype.joinSelector = oldJoinSelector;
        less.functions.functionRegistry._data = oldFunctionRegistry;
    }
}
