import less from "less";

test('Less should still compile normally', () => {
    const transpileLess = require("../../src/visitors/transpileLess").default;
    transpileLess("", "");

    const input = `
        @color: red;
        div {
            color: @color;
            darken: darken(@color, 20%);
        }
    `;
    less.render(input).then(({css}) => {
        expect(css).toMatchSnapshot();
    });
});