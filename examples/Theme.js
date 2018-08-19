import React, {Component} from 'react';
import {ThemeProvider} from 'styled-components';
import lessToJs from 'less-vars-to-js';
import fs from 'fs';

const constants = lessToJs(fs.readFileSync(__dirname + "/variables.less", "utf8"), {resolveVariables: true, stripPrefix: true});

export default class extends Component {
    render() {
        return <ThemeProvider theme={constants}>
            {this.props.children}
        </ThemeProvider>
    }
}