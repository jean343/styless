import Less from "less/lib/less/";
import Color from "less/lib/less/tree/color";
import Variable from "./Variable";
import VariableNode from './VariableNode';

const c = color => {
    const value = color.toCSS();
    if (color instanceof Color) {
        return `"${value}"`;
    }
    return value;
}

export default source => {
    const less = new Less();

    less.tree.Variable = Variable;

    less.functions.functionRegistry.addMultiple({
        lighten(color, amount, method) {
            return new VariableNode(`require("polished").lighten(${amount.value / 100}, ${c(color)})`);
        },
        darken(color, amount, method) {
            return new VariableNode(`require("polished").darken(${amount.value / 100}, ${c(color)})`);
        },
    });

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