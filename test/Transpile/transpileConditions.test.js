import transpileLess from "../../src/visitors/transpileLess";

test('condition function', () => {
    expect(transpileLess(`cursor: if(@disabled, not-allowed);`))
        .toBe('cursor: ${props => props["disabled"] || (props.theme || {})["disabled"] === true ? "not-allowed" : ""};');
});