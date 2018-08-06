const varRgx = /^[@$]/;
export default val => {
    if (!val) return val;
    if (!val.startsWith("@")) {
        return `"${val}"`;
    }
    val = val.replace(varRgx, '');
    const parts = [
        `props["${val}"]`,
        `(props.theme || {})["${val}"]`,
    ]
    return parts.filter(v => !!v).join(" || ");
};