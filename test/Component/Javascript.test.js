import React from "react";
import renderer from "react-test-renderer";
import styled from "styled-components";
import "jest-styled-components";

test("Support javascript", () => {
  const Div = styled.div`
    @import "javascript.less";
    @color: green;
    color: @echoColor(@color);
    background: @primary-1;
    border: 1px solid @primary-2;
  `;
  expect(renderer.create(<Div />).toJSON()).toMatchSnapshot();
  expect(renderer.create(<Div color="red" />).toJSON()).toMatchSnapshot();
});
