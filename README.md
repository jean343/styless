[![Build Status](https://travis-ci.org/jean343/styless.svg?branch=master)](https://travis-ci.org/jean343/styless)
[![npm](https://img.shields.io/npm/v/babel-plugin-styless.svg)](https://www.npmjs.com/package/babel-plugin-styless)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)

# :gem:Styless:gem:
Style your components declaratively with the familiar less syntax.

## Idea
Instead of writing the Tagged Template Literals `${props => props.theme.main}`, let's leave that job to a babel plugin and let's use the {less} syntax `@main`!
The entire Less syntax has been implemented, letting us use variables, operations, functions, etc. directly in the style component.

## Your first Styless component
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

This is what you'll see in your browser:

<div align="center">
    <img alt="Screenshot of the above code ran in a browser" src="https://i.imgur.com/01eETHm.png" />
</div>

## Why?
- The syntax is familiar to less developers `darken(@highlight, 5%)` and it removes the need to add an import of `darken`.
There is no confusion when transitioning from less to styled-components caused by `width: 3px * 2`.
- Supports rgb, hsl and hsv color spaces.
- Does the math for you, try `@size * 3` instead of `${props => parseFloat(props.size) * 3 + "px"}`.
- Supports props from variables, theme, and props, overwritten in that order.
One can replace the less variable or theme variable with a React props.
- Still supports the Tagged Template Literal syntax for more complex jobs!

## Installation
```sh
$ yarn add --dev babel-plugin-styless
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["babel-plugin-styless"]
}
```

## Special thanks
Thanks for the awesome [less](http://lesscss.org/) syntax and extensible compiler.

Thanks to [styled-components](https://www.styled-components.com) for making this plugin possible.