import transpileFunctions from "../../src/visitors/transpileFunctions";

test('darken function', () => {
    expect(transpileFunctions(`color: darken(@primary, 20%);`)).toBe('color: ${props => require("polished").darken(0.2, props["primary"] || (props.theme || {})["primary"])};');
});