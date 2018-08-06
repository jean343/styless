import React, {Component} from 'react';
import {ThemeProvider} from 'styled-components';
import lessToJs from 'less-vars-to-json';
import fs from 'fs';

const constants = lessToJs(fs.readFileSync(__dirname + "/variables.less", "utf8"));

export default class extends Component {
    render() {
        return <ThemeProvider theme={constants}>
            {this.props.children}
        </ThemeProvider>
    }
}