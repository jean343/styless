import less from "less";

test('Less should still compile normally', async () => {
    const transpileLess = require("../../src/visitors/transpileLess").default;
    transpileLess("", "");

    const input = `
        @color: red;
        div {
            color: @color;
            darken: darken(@color, 20%);
        }
    `;
    const {css} = await less.render(input);
    expect(css).toMatchSnapshot();
});