import React from 'react';
import renderer from 'react-test-renderer';
import styled, {css} from "styled-components";
import 'jest-styled-components';

test('Support inline mixins', () => {
    const Div = styled.div`
        .my-mixin {
          color: @color;
        }
        .my-other-mixin() {
          background: @background;
        }
        .class {
          .my-mixin();
          .my-other-mixin();
        }
	`;
    expect(renderer.create(<Div color="red" background="white"/>).toJSON()).toMatchSnapshot();
});