[![Build Status](https://travis-ci.org/jean343/styless.svg?branch=master)](https://travis-ci.org/jean343/styless)
[![npm](https://img.shields.io/npm/v/babel-plugin-styless.svg)](https://www.npmjs.com/package/babel-plugin-styless)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)

# :gem:Styless:gem:

Styless enables [less](http://lesscss.org/) syntax in your [styled-components](https://www.styled-components.com)

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
    color: hsv(90, 100%, 50%);
```

- Migrate less to styled-components seamlessly.

    There is no confusion when transitioning from less to styled-components caused by `width: 3px * 2`.

- Supports variable overwritten
```less
    const Button = styled.button`
        @highlight: blue;                           // can be overwritten by theme or props
        background: darken(@highlight, 5%);         // make green darken by 5%
    `;
```

```jsx   
    <ThemeProvider theme={{highlight: "red"}}>
        <Button highlight="green">click me</Button> // green (set in props) overwrites red (set in theme)
    </ThemeProvider>
```

- Supports imports and mixins
```less
    const Button = styled.button`
        @import (reference) "variables";
        .bg-light-blue;
    `;
```

- Still supports the styled-components syntax for more complex jobs!
```jsx
    `${props => props.main}`
```

## Your first Styless component
```less
const Button = styled.button`
    @main: palevioletred;
    @size: 1em;
    
    font-size: @size;
    margin: @size;
    padding: @size / 4 @size;
    border-radius: @size / 2;
    
    color: @main;
    border: 2px solid @main;
    background-color: white;
`;
```
```jsx
<Button>Normal</Button>
<Button main="mediumseagreen">Themed</Button>
<Button main="mediumseagreen" size="1.5em">Themed large</Button>
```

This is what you'll see in your browser :tada:, play with it on [codesandbox](https://codesandbox.io/s/p30ywzqkr7)

![](https://i.imgur.com/vb7wo7i.png)

## Advanced Styless component example
```less
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
```
```jsx
// Notice that the @highlight variable is resolved from the theme, and overwritten from a props in the second button.
<ThemeProvider theme={{highlight: "palevioletred"}}>
    <Button>Click me</Button>
    <Button highlight="hsl(153, 100%, 33%)">Or me</Button>
    <Button disabled small>But not me</Button>
</ThemeProvider>
```

This is what you'll see in your browser :tada:, play with it on [codesandbox](https://codesandbox.io/s/6zq4jyo5qz)

![](https://i.imgur.com/01eETHm.png)


*Note* that with [webstorm-styled-components](https://github.com/styled-components/webstorm-styled-components),
we get syntax highlighting, color preview and ctrl+click access to variables!
![](https://i.imgur.com/t8Qw6ty.png")

## FAQ
 - How to refer to a `constants.less` file, see the receipe for [theme](docs/receipe-theme.md).
 - Cool, how does it work? Head over to the [explanations](docs/explanation.md).
 - Why less? The `@color` systax reduces the confusion from `$color` when comparing to the SC syntax `${props}`. If there is enough demand, a scss plugin could be created.
 - The styled-components mixins such as `${hover};` must be terminated with a semi colon. The following will not work. 
```less
const Button = styled.button`
  ${hover}
  color: red;
`;
```
 - How to import a less files for all components? As SC components are small in nature, it can be convenient to have a common less file be imported in all components. Add the following to your `.babelrc` to have `common.less` imported automatically.
 ```
 [
   "styless",
   {
     "cwd": "babelrc",
     "import": "../../InvestigatorUI/ui/less/common.less"
   }
 ]
```
