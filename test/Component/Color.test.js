import React from 'react';
import renderer from 'react-test-renderer';
import styled from 'styled-components';
import 'jest-styled-components';

test('Creates an opaque color object from decimal red, green and blue (RGB) values.', () => {
    const Div = styled.div`
		rgb: rgb(90, 129, 32);
		rgba: rgba(90, 129, 32, 0.5);
	`;
    expect(renderer.create(<Div/>).toJSON()).toMatchSnapshot();
});

test('Creates a hex representation of a color in #AARRGGBB', () => {
    const Div = styled.div`
		argb: argb(rgba(90, 23, 148, 0.5));
	`;
    expect(renderer.create(<Div/>).toJSON()).toMatchSnapshot();
});

test.skip('Creates an opaque color object from hue, saturation and lightness (HSL) values.', () => {
    const Div = styled.div`
		hsl: hsl(90, 100%, 50%);
		
		@old: hsl(90, 100%, 50%);
		new: hsl(hue(@old), 45%, 90%);
	`;
    expect(renderer.create(<Div/>).toJSON()).toMatchSnapshot();
});