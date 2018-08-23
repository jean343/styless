import {isStyled} from "../utils/detectors";
import transpileLess from "./transpileLess";

const regex = /`([\s\S]*)`/;

export default (path, state, {types: t}) => {
    if (!isStyled(path.node.tag, state)) {
        return;
    }

    // Find the TemplateLiteral in the TaggedTemplateExpression
    path.traverse({
        TemplateLiteral(p) {
            if (p.isClean) return;

            const rawSource = p.getSource();
            if (!rawSource) return;

            const [foo, source] = regex.exec(rawSource);
            if (!source) return;
            p.isClean = true;

            const raw = transpileLess(source);

            // p.replaceWith(t.templateLiteral([t.templateElement({raw})], []));
            p.replaceWithSourceString('`' + raw + '`');
        },
    });
}