import React from 'react';
import renderer from 'react-test-renderer';
import styled from 'styled-components';
import 'jest-styled-components';

test('Darkens the primary color 20%', () => {
    const Div = styled.div`
		color: darken(@primary, 20%);
	`;
    const tree = renderer.create(<Div primary="red"/>).toJSON();
    expect(tree).toMatchSnapshot();
});

test('Darkens the colors in linear-gradient', () => {
    const Div = styled.div`
		background: linear-gradient(lighten(@start, 20%) 0%, darken(@end, 20%) 100%);
	`;
    const tree = renderer.create(<Div start="red" end="blue"/>).toJSON();
    expect(tree).toMatchSnapshot();
});