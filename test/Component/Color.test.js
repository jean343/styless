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

test('Creates an opaque color object from hue, saturation and lightness (HSL) values.', () => {
    const Div = styled.div`
		hsl: hsl(90, 100%, 50%);
		hsl1: hsl(@h, @s, @l);

		@old: hsl(90, 100%, 50%);
		new: hsl(hue(@old), 45%, 90%);

		hsla: hsla(90, 100%, 50%, 0.5);
		hsla: hsla(@h, @s, @l, @a);
	`;
    expect(renderer.create(<Div h={90} s="100%" l="50%" a={0.5}/>).toJSON()).toMatchSnapshot();
});

test('Creates an opaque color object from hue, saturation and value (HSV) values.', () => {
    const Div = styled.div`
		hsv1: hsv(90, 100%, 50%);
		hsv2: hsv(@h, @s, @v);
		
		hsva1: hsva(90, 100%, 50%, 0.5);
		hsva2: hsva(@h, @s, @v, @a);
	`;
    expect(renderer.create(<Div h={90} s="100%" v="50%" a={0.5}/>).toJSON()).toMatchSnapshot();
});

test('Extracts the hue channel of a color object in the HSL color space.', () => {
    const Div = styled.div`
		hue: hue(hsl(90, 100%, 50%));
		hue: hue(#80ff00);
		hue: hue(@color);
		hue: hue(@color2);
	`;
    expect(renderer.create(<Div color="#80ff00" color2="hsl(90, 100%, 50%)"/>).toJSON()).toMatchSnapshot();
});