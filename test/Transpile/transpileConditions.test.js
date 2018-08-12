import transpileLess from "../../src/visitors/transpileLess";

test('condition function', () => {
    expect(transpileLess(`cursor: if(@disabled, not-allowed);`))
        .toBe('cursor: ${props => props["disabled"] || (props.theme || {})["disabled"] === true ? "not-allowed" : undefined};');
    expect(transpileLess(`margin: if(true, 6px);`))
        .toBe('margin: ${props => true === true ? "6px" : undefined};');
    expect(transpileLess(`margin: if(false, 6px);`))
        .toBe('margin: ${props => false === true ? "6px" : undefined};');
});