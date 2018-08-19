import React from 'react';
import renderer from 'react-test-renderer';
import styled from 'styled-components';
import 'jest-styled-components';

test('Creates an opaque color object from decimal red, green and blue (RGB) values.', () => {
    const Div = styled.div`
		rgb: rgb(90, 129, 32);
		rgba: rgba(90, 129, 32, 0.5);
		rgb: rgb(@r, @g, @b);
		rgba: rgba(@r, @g, @b, @a);

		rgb: rgb(rgb(90, 129, 32));
		rgba: rgba(rgba(90, 129, 32, 0.5));
		rgb: rgb(rgb(@r, @g, @b));
		rgba: rgba(rgba(@r, @g, @b, @a));
		
		rgb: rgb(rgb(500, 300, 256));
	`;
    expect(renderer.create(<Div r={90} g={129} b={32} a={0.5}/>).toJSON()).toMatchSnapshot();
});

test('Creates a hex representation of a color in #AARRGGBB', () => {
    const Div = styled.div`
		argb: argb(rgba(90, 23, 148, 0.5));
		argb: argb(rgba(@r, @g, @b, @a));
	`;
    expect(renderer.create(<Div r={90} g={23} b={148} a={0.5}/>).toJSON()).toMatchSnapshot();
});

test.skip('Creates an opaque color object from hue, saturation and lightness (HSL) values.', () => {
    const Div = styled.div`
		hsl: hsl(90, 100%, 50%);
		
		@old: hsl(90, 100%, 50%);
		new: hsl(hue(@old), 45%, 90%);
	`;
    expect(renderer.create(<Div/>).toJSON()).toMatchSnapshot();
});