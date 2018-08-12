import transpileLess from "../../src/visitors/transpileLess";

test('darken function', () => {
    expect(transpileLess(`color: darken(@highlight, 30%);`))
        .toBe('color: ${props => require("polished").darken(0.3, props["highlight"] || (props.theme || {})["highlight"])};');
    expect(transpileLess(`background-color: darken(hsl(90, 80%, 50%), 20%);`))
        .toBe('background-color: ${props => require("polished").darken(0.2, "hsl(90, 80%, 50%)")};');
    expect(transpileLess(`background: linear-gradient(@highlight 0%, darken(@highlight, 5%) 100%);`))
        .toBe('background: linear-gradient(${props => props["highlight"] || (props.theme || {})["highlight"]} 0%, ${props => require("polished").darken(0.05, props["highlight"] || (props.theme || {})["highlight"])} 100%);');

    expect(transpileLess(`background-color: lighten(darken(hsl(90, 80%, 50%), 20%), 20%);`))
        .toBe('background-color: ${props => require("polished").lighten(0.2, require("polished").darken(0.2, "hsl(90, 80%, 50%)"))};');
});