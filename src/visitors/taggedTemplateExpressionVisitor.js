import {isStyled} from "../utils/detectors";
import transpileLess from "./transpileLess";
import generate from '@babel/generator';

const regex = /`([\s\S]*)`/;

export default (path, state, {types: t}) => {
    if (!isStyled(t)(path.node.tag, state)) {
        return;
    }

    // Find the TemplateLiteral in the TaggedTemplateExpression
    path.traverse({
        TemplateLiteral(p) {
            if (p.isClean) return;

            let rawSource = p.getSource();
            if (!rawSource) {
                const {code} = generate({
                    type: 'Program',
                    body: [p.node]
                });
                rawSource = code;
            }

            const [foo, source] = regex.exec(rawSource);
            if (!source) return;
            p.isClean = true;

            const raw = transpileLess(source, state.file.opts.filename);
            if (source !== raw) {
                p.replaceWithSourceString('`' + raw + '`');
            }
        },
    });
}