import React from 'react';
import renderer from 'react-test-renderer';
import styled from 'styled-components';
import 'jest-styled-components';

test( 'Darkens the primary color 20%', () => {
	const Div = styled.div`
		color: darken(@primary, 20%);
	`;
	const tree = renderer.create( <Div primary="red"/> ).toJSON()
	expect( tree ).toMatchSnapshot();
} );