import React from 'react';
import renderer from 'react-test-renderer';
import styled from 'styled-components';
import 'jest-styled-components';

test('String characters @url', () => {
    const Div = styled.div`
      background-image: url('images/lamp-post.png?v=1');
	`;
    expect(renderer.create(<Div/>).toJSON()).toMatchSnapshot();
});