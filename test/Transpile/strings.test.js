import transpileLess from "../../src/visitors/transpileLess";

test('string function', () => {
    expect(transpileLess(`escape('a=1')`))
        .toBe('a%3D1');
});