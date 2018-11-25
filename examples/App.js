import React, {Component} from 'react';
import styled from 'styled-components';
import Advanced from './Advanced';

const App = styled.div`
  color: @text;
`;

const Title = styled.h1`
	font-size: 1.5em;
	color: @highlight;
	b {
		color: lighten(@highlight, 20%);
	}
`;

const Wrapper = styled.section`
	text-align: center;
	padding: 4em;
	background-color: @background;
`;

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

const Box = styled.div`
  @import "javascript.less";
  color: @echoColor(green);
  background: @primary-1;
  border: 1px solid @primary-2;
`;

export default class extends Component {
    state = {open: false};
    onClick = e => this.setState({open: !this.state.open});

    render() {
         return <App>
            <Wrapper>
                <Title>
                    Hello World, this is my first styled <b>component</b>!
                </Title>
                <Title highlight="#9C5068">
                    Hello World, this is my first styled <b>component</b>!
                </Title>
                <Button onClick={this.onClick}>Click me</Button> <Button highlight="hsl(153, 100%, 33%)" onClick={this.onClick}>Or me</Button> <Button disabled small>But not me</Button>
                <Box>We can also use javascript functions</Box>
                {this.state.open && <Advanced/>}
            </Wrapper>
        </App>
    }
}
