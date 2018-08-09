import convert from "./convert";

export default source => {
    // https://regex101.com/r/WcrEPe/2
    source = source.replace(/if\s*\(\s*([\w-#@]+)\s*,\s*([\w-#@]+)\s*(?:,\s*([\w-#@]+)\s*)?\)/g, (match, m1, m2, m3) => {
        return `\${props => ${convert(m1)} ? ${convert(m2)} : ${convert(m3)}}` // Replaces if(@a, @b)
    });

    source = source.replace(/(\w*)\s*\(@\s*([\w-]+)\s*\)/g, (match, func, param) => {
        return `\${props => ${func}(${convert(param)})}` // Replaces function(@a)
    });

    source = source.replace(/(@[\w-]+)/g, (match, m1) => {
        return `\${props => ${convert(m1)}}` // Replaces @a
    });
}