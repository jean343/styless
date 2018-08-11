import React, {Component} from 'react';
import styled from 'styled-components';

const samples = {
    "color: darken(@highlight, 30%);": styled.div`color: darken(@highlight, 30%);`,
    "background-color: darken(hsl(90, 80%, 50%), 20%);": styled.div`background-color: darken(hsl(90, 80%, 50%), 20%);`,
    "background-color: darken(  rgb(  181 , 72 , 61 ) , 40% )  ;": styled.div`background-color: darken(rgb( 251 , 90 , 79 ), 20% )  ;`,
};

export default class extends Component {
    render() {
        return <div>
            {Object.keys(samples).map(key => {
                const Comp = samples[key];
                return <Comp>{key}</Comp>;
            })}
        </div>
    }
}