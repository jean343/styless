import VariableNode from "./VariableNode";

const varRgx = /^[@$]/;
export default (val, defaultValue) => {
    if (!val) return val;
    if (!val.startsWith("@")) {
        return `"${val}"`;
    }
    val = val.replace(varRgx, '');
    const parts = [
        `props["${val}"]`,
        `(props.theme || {})["${val}"]`,
        defaultValue,
    ]
    return parts.filter(v => !!v).join(" || ");
};

export const convertNode = v => {
    if (!v)
        return undefined;
    const value = v.toCSS();
    if (v instanceof VariableNode) {
        return value;
    }
    return `"${value}"`;
};