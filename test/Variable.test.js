import React from 'react';
import renderer from 'react-test-renderer';
import styled from 'styled-components';
import 'jest-styled-components';

test( 'Takes the color from props', () => {
	const Div = styled.div`
		background-color: chocolate;
		color: @primary;
	`;
	const tree = renderer.create( <Div primary="red"/> ).toJSON()
	expect( tree ).toMatchSnapshot();
} );

test( 'Replaces single variable in linear-gradient', () => {
	const Div = styled.div`
		background: linear-gradient(@primary 0%, darken(@primary, 5%) 100%);
	`;
	const tree = renderer.create( <Div primary="red"/> ).toJSON()
	expect( tree ).toMatchSnapshot();
} );