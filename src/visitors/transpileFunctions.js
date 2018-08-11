import convert, {variable} from "./convert";

const functionRegex = new RegExp(`(\\w*)\\s*\\(${variable},${variable}\\)`, "g");

export default source => {
    // https://regex101.com/r/9dtrfr/2
    return source.replace(functionRegex, (match, func, param1, param2) => {
        switch (func) {
            case "lighten":
            case "darken":
                return `\${props => require("polished").${func}(${parseInt(param2, 10) / 100}, ${convert(param1)})}`;
        }
        return match;
    });
}