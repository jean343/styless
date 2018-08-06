import convert from "./convert";

export default source => {
    return source.replace(/(\w*)\s*\(\s*([\w-#@]+)\s*,\s*([\w-%]+)\s*\)/g, (match, func, param1, param2) => {
        switch (func) {
            case "lighten":
            case "darken":
                return `\${props => require("polished").${func}(${parseInt(param2, 10) / 100}, ${convert(param1)})}` // Replaces func(#aaabbb, 20%)
        }
        return match;
    });
}