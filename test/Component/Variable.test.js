import React from 'react';
import renderer from 'react-test-renderer';
import styled from 'styled-components';
import 'jest-styled-components';

test('Takes the color from props', () => {
    const Div = styled.div`
		background-color: chocolate;
		color: @primary;
	`;
    const tree = renderer.create(<Div primary="red"/>).toJSON();
    expect(tree).toMatchSnapshot();
});

test('Replaces single variable in linear-gradient', () => {
    const Div = styled.div`
		background: linear-gradient(@start 0%, @end 100%);
	`;
    const tree = renderer.create(<Div start="red" end="blue"/>).toJSON();
    expect(tree).toMatchSnapshot();
});

test('Use the color defiened in the component', () => {
    const Div = styled.div`
        @main: palevioletred;
        color: @main;
	`;
    expect(renderer.create(<Div/>).toJSON()).toMatchSnapshot();
});