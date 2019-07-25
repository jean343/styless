import React from 'react';
import renderer from 'react-test-renderer';
import styled from "styled-components";
import 'jest-styled-components';

test('Support import from scoped npm', () => {
    const Div = styled.div`
        @import "./import-scoped";
        color: @foo;
	`;
    expect(renderer.create(<Div/>).toJSON()).toMatchSnapshot();
});