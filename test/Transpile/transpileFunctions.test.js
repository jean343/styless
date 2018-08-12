import transpileLess from "../../src/visitors/transpileLess";

test('darken function', () => {
    expect(transpileLess(`color: darken(@highlight, 30%);`)).toBe('color: ${props => require("polished").darken(0.3, props["highlight"] || (props.theme || {})["highlight"])};');
    expect( transpileLess(`background-color: darken(hsl(90, 80%, 50%), 20%);`)).toBe('background-color: ${props => require("polished").darken(0.2, hsl(90, 80%, 50%))};');
    // expect(transpileFunctions(`background: linear-gradient(@highlight 0%, darken(@highlight, 5%) 100%);`)).toBe('');
});