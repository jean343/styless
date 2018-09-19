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

test.skip('Test mixin guards 1', () => {
	const Div = styled.div`
        .theme (@mode) when (@mode = "dark") {
        	background-color: darkblue;
        }
        .theme (@mode) when (@mode = "light") {
        	background-color: lightblue;
        }
        .theme (@mode) when (default()) {
  			background-color: @mode;
		}
  		.theme(@scheme);
    `;
	expect(renderer.create(<Div scheme="dark"/>).toJSON()).toMatchSnapshot();
});


test.skip('Test mixin guards 2', () => {
	const Div = styled.div`
		.mixin(@a) when (lightness(@a) >= 50%) {
		  background-color: black;
		}
		.mixin(@a) when (lightness(@a) < 50%) {
		  background-color: white;
		}
		.mixin(@a) {
		  color: @a;
		}
		.class1 { .mixin(#ddd) }
		.class2 { .mixin(#555) }
    `;
	expect(renderer.create(<Div/>).toJSON()).toMatchSnapshot();
});