import React from 'react';
import renderer from 'react-test-renderer';
import styled, {css} from "styled-components";
import 'jest-styled-components';

test('Support import', () => {
    const Div = styled.div`
        @import "import.less";
        color: @color;
        .foo;
	`;
    expect(renderer.create(<Div/>).toJSON()).toMatchSnapshot();
});

test('Support import reference', () => {
    const Div = styled.div`
        @import (reference) "import.less";
        color: @color;
        .foo;
	`;
    expect(renderer.create(<Div/>).toJSON()).toMatchSnapshot();
});