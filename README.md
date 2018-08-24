[![Build Status](https://travis-ci.org/jean343/styless.svg?branch=master)](https://travis-ci.org/jean343/styless)
[![npm](https://img.shields.io/npm/v/babel-plugin-styless.svg)](https://www.npmjs.com/package/babel-plugin-styless)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)

# :gem:Styless:gem:

Styless enables less syntax in your [styled-components](https://www.styled-components.com)

## Installation
```sh
$ yarn add --dev babel-plugin-styless
```

**.babelrc**

```json
{
  "plugins": ["babel-plugin-styless"]
}
```

## Key features
- Simplifies the code

    use `@main` instead of `${props => props.theme.main}`

- Uses variables directly in your styled components
```less
    @size: if(@small, 4px, 10px);
```

- Uses operations directly in your styled components

    use `@size * 3` instead of `${props => parseFloat(props.size) * 3 + "px"}`

- Uses functions directly in your styled components.
```less
    color: darken(@highlight, 5%);
```
There is no need to import `darken`.

- Supports `rgb`, `hsl` and `hsv` color spaces
```less
    color: hsv(0, 0%, 99%);
```

- Supports migrate less to styled-components seamlessly. 

    There is no confusion when transitioning from less to styled-components caused by `width: 3px * 2`.

- Supports variable overwritten
```javascript
    const Button = styled.button`
        @highlight: blue;                           // can be overwritten by theme or props
        background: darken(@highlight, 5%);         // make green darken by 5%
    `;
```

```javascript   
    <ThemeProvider theme={{highlight: "red"}}>
        <Button highlight="green">click me</Button> // green (set in props) overwrites red (set in theme)
    </ThemeProvider>
```

- Still supports the styled-components syntax for more complex jobs!
```javascript
    `${props => props.main}`
```

## Advanced Styless component example
```javascript
const Button = styled.button`
    @faded: fade(black, 21%);
    @size: if(@small, 4px, 10px);
    cursor: pointer;
    cursor: if(@disabled, not-allowed);
    color: hsv(0, 0%, 99%);
    padding: @size @size * 3;
    border: 1px solid @faded;
    border-bottom: 4px solid @faded;
    border-radius: ${4}px;
    text-shadow: 0 1px 0 @faded;
    background: linear-gradient(@highlight 0%, darken(@highlight, 5%) 100%);
    &:active {
        background: darken(@highlight, 10%);
    }
`;

// Notice that the @highlight variable is resolved from the theme, and overwritten from a props in the second button.
<ThemeProvider theme={{highlight: "palevioletred"}}>
    <Button>Click me</Button>
    <Button highlight="hsl(153, 100%, 33%)">Or me</Button>
    <Button disabled small>But not me</Button>
</ThemeProvider>
```

This is what you'll see in your browser :tada:

![](https://i.imgur.com/01eETHm.png)

-----


https://codesandbox.io/s/6zq4jyo5qz


Note that with [webstorm-styled-components](https://github.com/styled-components/webstorm-styled-components),
we get syntax highlighting, color preview and ctrl+click access to variables!
![](https://i.imgur.com/t8Qw6ty.png")


## Cool, how does it work :question:
The {less} parser is used to generate an abstract syntax tree (AST) of the styled component source, all less functions that would operate on variables were modified to generate dynamic code.

For example, `darken(@color, 15%)` could be converted to `${props => require("color").darken(props.color || props.theme.color || default, "15%")}`. An if statement `if(@c, @t, @f)` would be converted to `${props => props.a ? props.b ：props.c}`.
Note that those examples were simplified, the actual code is below:
https://github.com/jean343/styless/blob/master/src/functions/color.js#L91
https://github.com/jean343/styless/blob/master/src/functions/boolean.js#L9



###To use a less constants file in your theme
```javascript
```
