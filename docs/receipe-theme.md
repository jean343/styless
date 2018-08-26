##To use a less constants file in your theme

Styless is using the `ThemeProvider` from `styled-components`, and as we can see in the following example, the theme is a JSON object defining
the less variables.

```javascript
<ThemeProvider theme={{highlight: "red"}}>
    <Button>click me</Button>
</ThemeProvider>
```

One can use [less-vars-to-js](https://www.npmjs.com/package/less-vars-to-js) to parse a less file congaing variables and populate the theme.

```javascript
import {ThemeProvider} from 'styled-components';
import lessToJs from 'less-vars-to-js';
import fs from 'fs';

const constants = lessToJs(fs.readFileSync(__dirname + "/variables.less", "utf8"), {resolveVariables: true, stripPrefix: true});

<ThemeProvider theme={constants}>
    {this.props.children}
</ThemeProvider>
```

The full example can be seen on [github](https://github.com/jean343/styless/blob/master/examples/Theme.js).