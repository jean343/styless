import VariableNode from "../tree/VariableNode";

export const consumeBrackets = parserInput => {
    let inComment = false;
    let blockDepth = 0;
    const blockStack = [];
    const input = parserInput.getInput();
    const length = input.length;
    const lastPos = parserInput.i;
    let i = parserInput.i;
    let prevChar, nextChar;

    do {
        prevChar, nextChar = input.charAt(i);
        if (blockDepth === 0 && prevChar === "}") {
            return input.substr(lastPos, i - lastPos);
        } else {
            if (inComment) {
                if (nextChar === '*' &&
                    input.charAt(i + 1) === '/') {
                    i++;
                    blockDepth--;
                    inComment = false;
                }
                i++;
                continue;
            }
            switch (nextChar) {
                case '/':
                    if (input.charAt(i + 1) === '*') {
                        i++;
                        inComment = true;
                        blockDepth++;
                    }
                    break;
                case "'":
                case '"':
                    let quote = parserInput.$quoted(i);
                    if (quote) {
                        i += quote[1].length - 1;
                    }
                    break;
                case '{':
                    blockStack.push('}');
                    blockDepth++;
                    break;
                case '(':
                    blockStack.push(')');
                    blockDepth++;
                    break;
                case '[':
                    blockStack.push(']');
                    blockDepth++;
                    break;
                case '}':
                case ')':
                case ']':
                    var expected = blockStack.pop();
                    if (nextChar === expected) {
                        blockDepth--;
                    } else {
                        return expected;
                    }
            }
            i++;
        }
        prevChar = nextChar;
    } while (i <= length);
};

export const genCSS = less => function (context, output) {
    const cssFragment = context.cssFragment && this.value.some(v => v instanceof VariableNode);
    if (cssFragment) output.add('`/*styless*/');
    for (let i = 0; i < this.value.length; i++) {
        const value = this.value[i];
        if (cssFragment && value instanceof VariableNode) {
            output.add(`\${${value.toCSS()}}`);
        } else {
            value.genCSS(context, output);
        }
        if (!(this.noSpacing || value.noSpacing) && i + 1 < this.value.length) {
            output.add(' ');
        }
    }
    if (cssFragment) output.add('`');
};
export const anonymousEval = less => function () {
    const anonymous = new less.tree.Anonymous(this.value, this._index, this._fileInfo, this.mapLines, this.rulesetLike, this.visibilityInfo());
    anonymous.noSpacing = this.noSpacing;
    return anonymous;
};