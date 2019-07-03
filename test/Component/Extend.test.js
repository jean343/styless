import React from 'react';
import renderer from 'react-test-renderer';
import styled from 'styled-components';
import 'jest-styled-components';

test('Extend a styled div', () => {
    const Div = styled.div`
		color: @primary;
	`;
    const Div2 = styled(Div)`
		color: @primary;
	`;
    expect(renderer.create(<Div primary="red"/>).toJSON()).toMatchSnapshot();
    expect(renderer.create(<Div2 primary="red"/>).toJSON()).toMatchSnapshot();
});

test('Extend styled-components example', () => {
    // The Button from the last section without the interpolations
    const Button = styled.button`
        color: palevioletred;
        font-size: 1em;
        margin: 1em;
        padding: 0.25em 1em;
        border: 2px solid palevioletred;
        border-radius: 3px;
    `;

    // We're extending Button with some extra styles
    const TomatoButton = styled(Button)`
        color: @color;
        border-color: tomato;
    `;
    expect(renderer.create(<div>
        <Button>Normal Button</Button>
        <TomatoButton color="tomato">Tomato Button</TomatoButton>
    </div>).toJSON()).toMatchSnapshot();
});