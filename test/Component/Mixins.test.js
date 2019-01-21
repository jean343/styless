import React from 'react';
import renderer from 'react-test-renderer';
import styled, {css} from "styled-components";
import 'jest-styled-components';

test('Not Outputting the Mixin', () => {
    const Div = styled.div`
        .my-mixin {
          color: black;
        }
        .my-other-mixin() {
          background: white;
        }
        .class {
            .my-mixin();
            .my-other-mixin();
        }
	`;
    expect(renderer.create(<Div/>).toJSON()).toMatchSnapshot();
});

test('Namespaces', () => {
    const Div = styled.div`
        #outer() {
            .inner {
              color: red;
            }
        }
        
        .c {
          #outer > .inner();
        }
	`;
    expect(renderer.create(<Div/>).toJSON()).toMatchSnapshot();
});

test('Guarded Namespaces', () => {
    const Div = styled.div`
        #namespace when (@mode = huge) {
          .mixin1() {
              color: red1;
          }
        }
        
        #namespace {
          .mixin2() when (@mode = huge) {
              color: red2;
          }
        }
        #namespace.mixin1();
        #namespace.mixin2();
	`;
    expect(renderer.create(<Div mode="large"/>).toJSON()).toMatchSnapshot();
    expect(renderer.create(<Div mode="huge"/>).toJSON()).toMatchSnapshot();
});

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

test('Test simple mixin guards', () => {

    const Div = styled.div`
        .false(@a) when ((1 = 1) and (2 = 3)) {
          color: red;
        }
        .true(@a) when ((1 = 1) and (2 = 2)) {
          color: green;
        }
        .classFalse { .false(red) }
        .classTrue { .true(red) }
    `;
    expect(renderer.create(<Div/>).toJSON()).toMatchSnapshot();
});

test('Test mixin variable', () => {
    const Div = styled.div`
        .mixin(@a) {
          color: @a;
        }
        .class1 { .mixin(red) }
    `;
    expect(renderer.create(<Div/>).toJSON()).toMatchSnapshot();
});

test('Test mixin guards', () => {
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
        .class1v { .mixin(@c1) }
        .class2v { .mixin(@c2) }
    `;
    expect(renderer.create(<Div c1="#ddd" c2="#555"/>).toJSON()).toMatchSnapshot();
});

// test.skip('Test Less loops', () => {
//     const Div = styled.div`
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
//     expect(renderer.create(<Div/>).toJSON()).toMatchSnapshot();
// });