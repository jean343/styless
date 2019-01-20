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

test.skip('Test mixin guards', () => {
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

// test.skip('Test Less loops', () => {
// 	const Div = styled.div`
// 		.make-variants(@i:1) when (@i =< 3) {
// 			.variant-@{i} {
// 				width: @i * 40px;
// 				height: @i * 20px;
// 				background-color: orange;
// 				margin-bottom: 10px;
// 			}
// 		  .make-variants(@i + 1); // increment function
// 		}
// 		.make-variants();
// 	`;
// 	expect(renderer.create(<Div/>).toJSON()).toMatchSnapshot();
// });