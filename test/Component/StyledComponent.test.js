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
		${props => props.disabled ? "" : "box-shadow: inset 0 0 0 30px rgba(255, 255, 255, 0.3)"};
	`;
    expect(renderer.create(<Div color="red" primary noChild/>).toJSON()).toMatchSnapshot();
});

test('Attaching additional props', () => {
    const Input = styled.input.attrs(props => ({
        // we can define static props
        type: 'password',

        // or we can define dynamic ones
        margin: props.size || '1em',
        padding: props.size || '1em'
    }))`
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

test('Support the styled-components css', () => {
    const Div = styled.div`
        padding: @padding;
        ${props => props.bordered && css`
          border: 1px solid @border;
        `}
	`;
    expect(renderer.create(<Div padding="1rem" border="red"/>).toJSON()).toMatchSnapshot();
    expect(renderer.create(<Div bordered padding="1rem" border="red"/>).toJSON()).toMatchSnapshot();
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

test('Support &&&', () => {
    const Div = styled.div`
        &&& {
            color: palevioletred;
            font-weight: @bold;
        }
        &&&second {
            color: red;
        }
	`;
    expect(renderer.create(<Div/>).toJSON()).toMatchSnapshot();
    expect(renderer.create(<Div bold="bold"/>).toJSON()).toMatchSnapshot();
});

test('Support Element', () => {
    const Div = styled.div`
        a {
            color: red;
            &.is-focused:not(.is-open) > .Select-control {
                cursor: text;
            }
        }
	`;
    expect(renderer.create(<Div/>).toJSON()).toMatchSnapshot();
});

test('Support placeholder on the root', () => {
    const Div = styled.div`
        &::placeholder {
            color: HSL(216, 15%, 65%);
        }
	`;
    expect(renderer.create(<Div/>).toJSON()).toMatchSnapshot();
});

test('Support styling other components', () => {
    const Child1 = styled.div`
        color: brown;
	`;
    const Child2 = styled.div`
        color: red;
	`;
    const Div = styled.div`
        ${Child1},
        ${Child2}{
            width: 400px;
        }
	`;
    expect(renderer.create(<Div><Child1/><Child2/></Div>).toJSON()).toMatchSnapshot();
});

test('Support SC mixins', () => {
    const hover = css`
        &:hover {
            text-decoration: underline;
        }
    `;
    const Icon = styled.div``;
    const Div = styled.div`
	    ${hover};
	    ${props => hover};
	    border-bottom: @color;
	    
		&:hover, &:hover ${Icon} {
			color: inherit;
		}
	`;
    expect(renderer.create(<span><Icon/><Div color="red"/></span>).toJSON()).toMatchSnapshot();
});

test('#20, not', () => {
    const Div = styled.div`
	    box-shadow: if(not (@disabled), inset 0 0 0 30px red);
	`;
    expect(renderer.create(<Div/>).toJSON()).toMatchSnapshot();
    expect(renderer.create(<Div disabled/>).toJSON()).toMatchSnapshot();
});

test('#20, box-shadow', () => {
    const Div = styled.div`
        box-shadow: if(not @disabled, inset 0 0 0 30px rgba(255, 255, 255, 0.5));
	`;
    expect(renderer.create(<Div/>).toJSON()).toMatchSnapshot();
    expect(renderer.create(<Div disabled/>).toJSON()).toMatchSnapshot();
});

test('#39, box-shadow', () => {
    const Div = styled.div`
         .column {
             &.frozen&:empty::before {
                 content: '\\200B';
             }
         }
	`;
    expect(renderer.create(<Div/>).toJSON()).toMatchSnapshot();
});