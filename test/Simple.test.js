import React from 'react';
import renderer from 'react-test-renderer';
import styled from 'styled-components';

const App = styled.div`
	color: @text;
`;

// const Title = styled.h1`
// 	font-size: 1.5em;
// 	color: @highlight;
// 	b {
// 		color: lighten(@highlight, 20%);
// 	}
// `;
//
// const Wrapper = styled.section`
// 	text-align: center;
// 	padding: 4em;
// 	background-color: @background;
// `;
//
// const Button = styled.a`
// 	cursor: pointer;
// 	cursor: if(@disabled, not-allowed);
// 	color: white;
// 	padding: 10px 30px;
// 	border: 1px solid rgba(0, 0, 0, 0.21);
// 	border-bottom: 4px solid rgba(0, 0, 0, 0.21);
// 	border-radius: 4px;
// 	text-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
// 	background: linear-gradient(@highlight 0%, darken(@highlight, 5%) 100%);
// 	&:active {
// 		background: darken(@highlight, 10%);
// 	}
// `;

test( 'Link changes the class when hovered', () => {
	const App = styled.div`
		color: @text;
	`;
	const component = renderer.create(
		<App>Facebook</App>,
	);
	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );