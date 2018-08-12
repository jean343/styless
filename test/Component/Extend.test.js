import React from 'react';
import renderer from 'react-test-renderer';
import styled from 'styled-components';
import 'jest-styled-components';

test('Extend a styled div', () => {
    const Div = styled.div`
		color: @primary;
	`;
    const Div2 = Div.extend`
		color: @primary;
	`;
    expect(renderer.create(<Div primary="red"/>).toJSON()).toMatchSnapshot();
    expect(renderer.create(<Div2 primary="red"/>).toJSON()).toMatchSnapshot();
});