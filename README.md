# styless
Style your components declaratively with familiar less syntax


## Proposal

Plugin is useful to map less variables in styles components to props and themes.

## Usage Example 


```javascript
const NavBarTab = styled.div`
    border-bottom: @border-height solid transparent;
    border-bottom-color: if(@selected, @accent-color);
    color: @color;
`
```

```javascript
<NavBarTab border-height="3px" selected={true} color={red}>tab</NavBarTab>
```

Note that `@border-height` is a prop and `@accent-color` is a theme variable. If both are defined, it will take the prop variable.
When using the `if(@selected, @accent-color)` syntax, it will set `@accent-color` if `@selected` is truthy.

## Installation

```sh
$ yarn add --dev babel-plugin-styled-theme
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["babel-plugin-styled-theme"]
}
```
