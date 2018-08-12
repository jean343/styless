import Less from "less/lib/less/";
import Variable from "./Variable";
import Condition from "./Condition";
import * as functions from './functions';

export default source => {
    const less = new Less();
    less.tree.Variable = Variable;
    less.tree.Condition = Condition;
    less.functions.functionRegistry.addMultiple(functions);
    less.PluginLoader = class PluginLoader {
    };

    let root, imports, options;
    less.parse(source, {}, (e, _root, _imports, _options) => {
        root = _root;
        imports = _imports;
        options = _options;
    });
    // Disables the validation: Properties must be inside selector blocks. They cannot be in the root
    root.firstRoot = false;

    const parseTree = new less.ParseTree(root, imports);
    const {css} = parseTree.toCSS(options);
    return css;
}