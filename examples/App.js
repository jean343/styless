import React, { Component } from 'react';
import styled from 'styled-components';

const App = styled.div`
	color: @text;
`;

const Title = styled.h1`
	font-size: 1.5em;
	color: @highlight;
	b {
		color: darken(@highlight, 20%);
	}
`;

const Wrapper = styled.section`
	text-align: center;
	padding: 4em;
	background-color: @background;
`;

const Button = styled.a`
	cursor: pointer;
	color: white;
	padding: 10px 30px;
	border: 1px solid rgba(0,0,0,0.21);
	border-bottom: 4px solid rgba(0,0,0,0.21);
	border-radius: 4px;
	text-shadow: 0 1px 0 rgba(0,0,0,0.15);
	background: linear-gradient(@highlight 0%, @highlight 100%);
	&:active {
		background: darken(@highlight, 20%);
	}
`;

export default class extends Component {
	render(){
		return <App>
			<Wrapper>
				<Title>
					Hello World, this is my first styled <b>component</b>!
				</Title>
				<Title highlight="#9C5068">
					Hello World, this is my first styled component!
				</Title>
				<Button>Click me</Button>
			</Wrapper>
		</App>
	}
}