import React from 'react';
import renderer from 'react-test-renderer';
import styled from 'styled-components';
import 'jest-styled-components';

test( 'Sets a complex variable in an if check', () => {
	const Div = styled.div`
		cursor: if(@disabled, not-allowed);
	`;
	const tree = renderer.create( <Div/> ).toJSON()
	expect( tree ).toMatchSnapshot();

	const tree2 = renderer.create( <Div disabled/> ).toJSON()
	expect( tree2 ).toMatchSnapshot();
} );