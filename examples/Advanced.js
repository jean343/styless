import React, {Component} from 'react';
import styled from 'styled-components';
import withCheckbox from './withCheckbox';

const Style = styled.div`
  margin-top: 20px;
`;
const S = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  width: 800px;
  margin: 8px auto;
  padding: 8px;
`;
const Content = styled.div`
  text-align: left;
  white-space: pre;
`;

const samples = {
    "background-color: darken(@highlight, 30%);": S.extend`background-color: darken(@highlight, 30%);`,
    "@local: palevioletred;\n@width: if(@checked, 20px, 0);\nbackground-color: @local;\nborder-radius: @width;": withCheckbox(S.extend`
      @local: palevioletred;
      @width: if(@checked, 20px, 0);
      background-color: @local;
      border-radius: @width;
    `),
    "background-color: darken(hsl(90, 80%, 50%), 20%);": S.extend`background-color: darken(hsl(90, 80%, 50%), 20%);`,
    "background-color: darken(  rgb(  251  ,  90 , 79 ), 20% )  ;": S.extend`background-color: darken(  rgb(  251  ,  90 , 79 ), 20% )  ;`,
    "background-color: lighten(darken(hsl(90, 80%, 50%), 20%), 40%);": S.extend`background-color: lighten(darken(hsl(90, 80%, 50%), 20%), 40%);`,
    "background-color: if(@checked, DeepPink, palevioletred)": withCheckbox(S.extend`background-color: if(@checked, DeepPink, palevioletred);`),
    "background-color: if(@checked, darken(@highlight, 30%), @highlight);": withCheckbox(S.extend`background-color: if(@checked, darken(@highlight, 30%), @highlight);`),
    "margin: if(@checked, 16px auto);": withCheckbox(S.extend`margin: if(@checked, 16px auto);`),
};

export default class extends Component {
    render() {
        return <Style>
            {Object.keys(samples).map(key => {
                const Comp = samples[key];
                return <Comp key={key}>
                    <Content>{key}</Content>
                </Comp>;
            })}
        </Style>
    }
}