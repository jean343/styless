## Cool, how does it work :question:
The {less} parser is used to generate an abstract syntax tree (AST) of the styled-components source,
all less functions that would operate on variables are modified to generate dynamic code.

For example, `color: darken(@color, 15%)`; is converted to the following snippet. Note that it is using `tinycolor2` for the color conversion,
and that the `props` and `props.theme` are searched for the `@color`. 
```jsx
color: require('tinycolor2')([props["color"],(props.theme || {})["color"]].filter(v => v !== void 0)[0]).darken(parseFloat("15%")).toHex8String();
```

As this code is executed at run time, I am looking at ways to shorten the code and make it execute faster. Send a PR if you have an :idea:!

An if statement `if(@c, @t, @f)` would be converted to `${props => props.a ? props.b ：props.c}`.
Note that those examples were simplified, the actual code is below:
https://github.com/jean343/styless/blob/master/src/functions/color.js#L91
https://github.com/jean343/styless/blob/master/src/functions/boolean.js#L9