import React from 'react';
import renderer from 'react-test-renderer';
import styled, {css} from "styled-components";
import 'jest-styled-components';

test('Support the styled-components syntax', () => {
    const Div = styled.div`
		width: ${400}px;
		width: 400px;
		border: 1px solid #000;
		border: ${"1px"} ${"solid"} ${"#000"};
        background: ${props => props.primary ? 'palevioletred' : 'white'};
        color: ${props => props.primary ? 'white' : 'palevioletred'};
		color2: ${props => props.noChild && "#5cb85c"}; // @brand-success
		color3: @color;
	`;
    expect(renderer.create(<Div color="red" primary noChild/>).toJSON()).toMatchSnapshot();
});

test('Attaching additional props', () => {
    const Input = styled.input.attrs({
        // we can define static props
        type: 'password',

        // or we can define dynamic ones
        margin: props => props.size || '1em',
        padding: props => props.size || '1em'
    })`
        color: palevioletred;
        font-size: 1em;
        border: 2px solid palevioletred;
        border-radius: 3px;

        /* here we use the dynamically computed props */
        margin: ${props => props.margin};
        padding: ${props => props.padding};

        margin2: @margin;
        padding2: @padding;
`;
    expect(renderer.create(<div>
        <Input placeholder="A small text input" size="1em"/>
        <br/>
        <Input placeholder="A bigger text input" size="2em"/>
    </div>).toJSON()).toMatchSnapshot();
});

test.skip('Support the styled-components css', () => {
    const Div = styled.div`
		flex-direction: @direction;
		${props => props.bordered && css`
			border: 1px solid @border;
		`}
	`;
    expect(renderer.create(<Div direction="column" border="red"/>).toJSON()).toMatchSnapshot();
    expect(renderer.create(<Div bordered direction="column" border="red"/>).toJSON()).toMatchSnapshot();
});

test('Support @media queries', () => {
    const Div = styled.div`
		@media screen and (min-width: 900px) {
            article {
              padding: @padding;
            }
        }
	`;
    expect(renderer.create(<Div padding="1rem" media="foo"/>).toJSON()).toMatchSnapshot();
});