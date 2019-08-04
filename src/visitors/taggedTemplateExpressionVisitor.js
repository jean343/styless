import {isStyled, isHelper, isPureHelper} from "../utils/detectors";
import transpileLess from "./transpileLess";
import generate from '@babel/generator';

const regex = /`([\s\S]*)`/;

export default (path, state, {types: t}) => {
    if (!(isStyled(t)(path.node.tag, state) || isPureHelper(t)(path.node.tag || path.node.callee, state))) {
        return;
    }

    // Find the TemplateLiteral in the TaggedTemplateExpression
    path.traverse({
        TemplateLiteral(p) {
            if (p.isClean) return;
            p.stop(); // Only traverse the first TemplateLiteral of TaggedTemplateExpression

            let rawSource = p.getSource();
            if (!rawSource) {
                const {code} = generate({
                    type: 'Program',
                    body: [path.node]
                });
                rawSource = code;
            }

            const [foo, source] = regex.exec(rawSource);
            if (!source) return;
            p.isClean = true;

            try {
                const raw = transpileLess(source, state.file.opts.filename, state.opts);
                if (source !== raw) {
                    p.replaceWithSourceString('`' + raw + '`');
                }
            } catch (e) {
                console.error("Error converting the less syntax for the file:", state.file.opts.filename, rawSource, e);
            }
        },
    });
}