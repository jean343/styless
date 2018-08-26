## Cool, how does it work :question:
The {less} parser is used to generate an abstract syntax tree (AST) of the styled-components source,
all less functions that would operate on variables are modified to generate dynamic code.

For example, `color: darken(@color, 15%)`; is converted to the following snippet. Note that it is using `tinycolor2` for the color conversion,
and that `@color` is resolved in `props` and `props.theme`. See the [darken](https://github.com/jean343/styless/blob/master/src/functions/color.js#L91) code.
```jsx
color: require('tinycolor2')([props["color"],(props.theme || {})["color"]].filter(v => v !== void 0)[0]).darken(parseFloat("15%")).toHex8String();
```

As this code is executed at run time, I am looking at ways to shorten the code and make it execute faster. Send a PR if you have an :bulb:!

----

An if statement `if(@c, green, red);` would be converted to the following, See the [boolean](https://github.com/jean343/styless/blob/master/src/functions/boolean.js#L9) code.
```jsx
([props["c"],(props.theme || {})["c"]].filter(v => v !== void 0)[0] === true) ? "green" : "red"
```