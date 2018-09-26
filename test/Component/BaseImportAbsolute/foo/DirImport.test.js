import React from 'react';
import renderer from 'react-test-renderer';
import styled from 'styled-components';
import 'jest-styled-components';

test('It should find the base import in sub folders with absolute paths', () => {
    const Div = styled.div`
		color: @base-color;
		.base-mixin;
	`;
    expect(renderer.create(<Div/>).toJSON()).toMatchSnapshot();
});