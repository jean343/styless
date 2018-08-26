## Cool, how does it work :question:
The {less} parser is used to generate an abstract syntax tree (AST) of the styled component source, all less functions that would operate on variables were modified to generate dynamic code.

For example, `darken(@color, 15%)` could be converted to `${props => require("color").darken(props.color || props.theme.color || default, "15%")}`. An if statement `if(@c, @t, @f)` would be converted to `${props => props.a ? props.b ：props.c}`.
Note that those examples were simplified, the actual code is below:
https://github.com/jean343/styless/blob/master/src/functions/color.js#L91
https://github.com/jean343/styless/blob/master/src/functions/boolean.js#L9