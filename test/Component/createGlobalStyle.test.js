import React from 'react';
import renderer from 'react-test-renderer';
import {createGlobalStyle} from 'styled-components';
import 'jest-styled-components';

export const getCSS = scope => Array.from(scope.querySelectorAll('style')).map(tag => tag.innerHTML).join('\n');

test('Should theme the global style', () => {
    const GlobalStyle = createGlobalStyle`
    html {
      color: @color;
    }
`;
    renderer.create(<GlobalStyle color="color"/>);
    expect(getCSS(document)).toMatchSnapshot();
});