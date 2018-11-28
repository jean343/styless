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

test('#32, Fail to escape variable with string and variable', () => {
    const Div = styled.div`
        @font-family-no-number : "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
        @font-family : "Monospaced Number", @font-family-no-number;
        font-family: @font-family;
	`;
    expect(renderer.create(<Div/>).toJSON()).toMatchSnapshot();
});

test('#32, Fail to escape variable with string and variable from import', () => {
    const Div = styled.div`
        @import (reference) "import.less";
        font-family: @font-family;
	`;
    expect(renderer.create(<Div/>).toJSON()).toMatchSnapshot();
    expect(renderer.create(<Div font-family-no-number="font-family-no-number"/>).toJSON()).toMatchSnapshot();
});

test('Nested variables', () => {
    const Div = styled.div`
        @font-family3 : "Third";
        @font-family2 : "Number", @font-family3;
        @font-family1 : "Monospaced", @font-family2;
        font-family: "root", @font-family1;
	`;
    expect(renderer.create(<Div/>).toJSON()).toMatchSnapshot();
    expect(renderer.create(<Div font-family3="Arial"/>).toJSON()).toMatchSnapshot();
});

test('#34', () => {
    const Link = styled.div``;
    const antBtnClassName = "ant-btn";
    const size = {xlarge: "3.2rem"};
    const AntButton = styled(Link)`
      fluid: @fluid;
      &.${antBtnClassName} {
        font-size: ${size.xlarge};
        font-weight: 700;
        width: 40px;
        text-decoration: none;
        padding: @padding;

        &,
        &:hover,
        &:focus,
        &:active,
        &.active {
          background: none;
          border-color: transparent;
        }
      }
    `;
    const Div = styled(({fluid, ...rest}) => <AntButton {...rest} />)`
      && {
        width: if(@fluid, 100%, auto);
      }
    `;
    expect(renderer.create(<Div/>).toJSON()).toMatchSnapshot();
    expect(renderer.create(<Div fluid padding="1rem"/>).toJSON()).toMatchSnapshot();
});