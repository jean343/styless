import React from 'react';
import renderer from 'react-test-renderer';
import styled, {css} from "styled-components";
import 'jest-styled-components';

test('Basic css prop', () => {
    // https://www.styled-components.com/docs/api#css-prop
    expect(renderer.create(<div
        css={`
            background: papayawhip;
            color: ${"green"};
        `}
    />).toJSON()).toMatchSnapshot();
    expect(renderer.create(<button
        css="padding: 0.5em 1em;"
    />).toJSON()).toMatchSnapshot();

    expect(renderer.create(<div
        css={css`
            background: papayawhip;
            color: ${"green"};
        `}
    />).toJSON()).toMatchSnapshot();
    expect(renderer.create(<button
        css={css`padding: 0.5em 1em;`}
    />).toJSON()).toMatchSnapshot();
});

test('Styless css prop', () => {
    // https://www.styled-components.com/docs/api#css-prop
    expect(renderer.create(<div
        css={`
            background: papayawhip;
            color1: @c;
        `}
        c="yellow"
    />).toJSON()).toMatchSnapshot();
    expect(renderer.create(<button
        css="padding1: @p;"
        p="20px"
    />).toJSON()).toMatchSnapshot();

    expect(renderer.create(<div
        css={css`
            background: papayawhip;
            color2: @c;
        `}
        c="blue"
    />).toJSON()).toMatchSnapshot();
    expect(renderer.create(<button
        css={css`padding2: @p;`}
        p="1px"
    />).toJSON()).toMatchSnapshot();
});

test('Styless css prop from import', () => {
    expect(renderer.create(<button css="color: @base-color;"/>).toJSON()).toMatchSnapshot();
    expect(renderer.create(<button css={`color: @base-color;`}/>).toJSON()).toMatchSnapshot();
    expect(renderer.create(<button css={css`color: @base-color;`}/>).toJSON()).toMatchSnapshot();
});