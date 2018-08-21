import Less from "less/lib/less/";
import Variable from "../tree/Variable";
import Condition from "../tree/Condition";
import Negative from "../tree/Negative";
import Dimension from "../tree/Dimension";
import * as functions from '../functions';

export default source => {
    const less = new Less();
    less.tree.Variable = Variable;
    less.tree.Condition = Condition;
    less.tree.Negative = Negative;
    less.tree.Dimension = Dimension;
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