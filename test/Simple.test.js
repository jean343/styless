import React from 'react';
import renderer from 'react-test-renderer';
import styled from 'styled-components';
import 'jest-styled-components';

test( 'Div takes the color from props', () => {
	const Div = styled.div`
		background-color: chocolate;
		color: @primary;
	`;
	const tree = renderer.create( <Div primary="red">Facebook</Div> ).toJSON()
	expect( tree ).toMatchSnapshot();
} );