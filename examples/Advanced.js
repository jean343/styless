import React, {Component} from 'react';
import styled from 'styled-components';

const Style = styled.div`
  margin-top: 20px;
`;
const S = styled.div`
  width: 800px;
  margin: 8px auto;
  padding: 8px;
`;

const samples = {
    "background-color: darken(@highlight, 30%);": S.extend`background-color: darken(@highlight, 30%);`,
    "background-color: darken(hsl(90, 80%, 50%), 20%);": S.extend`background-color: darken(hsl(90, 80%, 50%), 20%);`,
    "background-color: darken(  rgb(  251  ,  90 , 79 ), 20% )  ;": S.extend`background-color: darken(  rgb(  251  ,  90 , 79 ), 20% )  ;`,
    "background-color: lighten(darken(hsl(90, 80%, 50%), 20%), 40%);": S.extend`background-color: lighten(darken(hsl(90, 80%, 50%), 20%), 40%);`,
};

export default class extends Component {
    render() {
        return <Style>
            {Object.keys(samples).map(key => {
                const Comp = samples[key];
                return <Comp key={key}>{key}</Comp>;
            })}
        </Style>
    }
}