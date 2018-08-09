import transpileFunctions from "./transpileFunctions";
import transpileSyntax from "./transpileSyntax";

export default source => {
    return transpileSyntax(transpileFunctions(source));
}