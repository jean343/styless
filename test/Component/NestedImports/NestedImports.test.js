import React from 'react';
import renderer from 'react-test-renderer';
import styled from 'styled-components';
import 'jest-styled-components';

test('#29, nested imports', () => {
    const Div = styled.div`
      @import "tmp.less";
      @import (reference) "reference.less";
      &.light {
        color: @text-color;
        background: @layout-sider-background-light;
      }
    
      &.dark {
        background: @layout-header-background;
        color: @layout-trigger-color;
      }
	`;
    expect(renderer.create(<Div/>).toJSON()).toMatchSnapshot();
});