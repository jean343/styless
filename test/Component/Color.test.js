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

test('Extracts the saturation channel of a color object in the HSL color space.', () => {
    const Div = styled.div`
		saturation: saturation(hsl(90, 100%, 50%));
		saturation: saturation(#80ff00);
		saturation: saturation(@color);
		saturation: saturation(@color2);
		
		saturation: saturation(hsl(90, 50%, 50%));
	`;
    expect(renderer.create(<Div color="#80ff00" color2="hsl(90, 100%, 50%)"/>).toJSON()).toMatchSnapshot();
});

test('Extracts the lightness  channel of a color object in the HSL color space.', () => {
    const Div = styled.div`
		lightness: lightness(hsl(90, 100%, 50%));
		lightness: lightness(#80ff00);
		lightness: lightness(@color);
		lightness: lightness(@color2);
		
		lightness: lightness(hsl(90, 50%, 50%));
	`;
    expect(renderer.create(<Div color="#80ff00" color2="hsl(90, 100%, 50%)"/>).toJSON()).toMatchSnapshot();
});


test('Extracts the hue channel of a color object in the HSV color space.', () => {
    const Div = styled.div`
		hsvhue: hsvhue(hsv(90, 100%, 50%));
		hsvhue: hsvhue(#80ff00);
		hsvhue: hsvhue(@color);
		hsvhue: hsvhue(@color2);
	`;
    expect(renderer.create(<Div color="#80ff00" color2="hsv(90, 100%, 50%)"/>).toJSON()).toMatchSnapshot();
});

test('Extracts the saturation channel of a color object in the HSV color space.', () => {
    const Div = styled.div`
		hsvsaturation: hsvsaturation(hsv(90, 100%, 50%));
		hsvsaturation: hsvsaturation(#80ff00);
		hsvsaturation: hsvsaturation(@color);
		hsvsaturation: hsvsaturation(@color2);
		
		hsvsaturation: hsvsaturation(hsv(90, 50%, 50%));
	`;
    expect(renderer.create(<Div color="#80ff00" color2="hsv(90, 100%, 50%)"/>).toJSON()).toMatchSnapshot();
});

test('Extracts the value channel of a color object in the HSV color space.', () => {
    const Div = styled.div`
		hsvvalue: hsvvalue(hsv(90, 100%, 50%));
		hsvvalue: hsvvalue(#408000);
		hsvvalue: hsvvalue(@color);
		hsvvalue: hsvvalue(@color2);
		
		hsvvalue: hsvvalue(hsv(90, 50%, 50%));
	`;
    expect(renderer.create(<Div color="#408000" color2="hsv(90, 100%, 50%)"/>).toJSON()).toMatchSnapshot();
});


test('Extracts the red channel of a color object.', () => {
    const Div = styled.div`
		red: red(rgb(10, 20, 30));
		red: red(rgb(@r, @g, @b));
		red: red(@color);
	`;
    expect(renderer.create(<Div r={10} g={20} b={30} color="#0a141e"/>).toJSON()).toMatchSnapshot();
});

test('Extracts the green channel of a color object.', () => {
    const Div = styled.div`
		green: green(rgb(10, 20, 30));
		green: green(rgb(@r, @g, @b));
		green: green(@color);
	`;
    expect(renderer.create(<Div r={10} g={20} b={30} color="#0a141e"/>).toJSON()).toMatchSnapshot();
});

test('Extracts the blue channel of a color object.', () => {
    const Div = styled.div`
		blue: blue(rgb(10, 20, 30));
		blue: blue(rgb(@r, @g, @b));
		blue: blue(@color);
	`;
    expect(renderer.create(<Div r={10} g={20} b={30} color="#0a141e"/>).toJSON()).toMatchSnapshot();
});

test('Extracts the alpha channel of a color object.', () => {
    const Div = styled.div`
		alpha: alpha(rgba(10, 20, 30, 0.5));
		alpha: alpha(rgba(@r, @g, @b, 0.5));
		alpha: alpha(@color);
	`;
    expect(renderer.create(<Div r={10} g={20} b={30} color="#0a141e80"/>).toJSON()).toMatchSnapshot();
});


test('Calculates the luma (perceptual brightness) of a color object.', () => {
    const Div = styled.div`
		luma: luma(rgb(100, 200, 30));
		luma: luma(@color);
	`;
    expect(renderer.create(<Div color="#64c81e"/>).toJSON()).toMatchSnapshot();
});

test('Calculates the value of the luma without gamma correction.', () => {
    const Div = styled.div`
		luminance: luminance(rgb(100, 200, 30));
		luminance: luminance(@color);
		
		luminance: luminance(rgba(100, 200, 30, 0.5));
	`;
    expect(renderer.create(<Div color="#64c81e"/>).toJSON()).toMatchSnapshot();
});


test('Increase the saturation of a color in the HSL color space by an absolute amount.', () => {
    const Div = styled.div`
		saturate: saturate(hsl(90, 80%, 50%), 20%);
		saturate: saturate(@color, 20%);
		saturate: saturate(@color, @p);
	`;
    expect(renderer.create(<Div color="hsl(90, 80%, 50%)" p="20%"/>).toJSON()).toMatchSnapshot();
});
test('Decrease the saturation of a color in the HSL color space by an absolute amount.', () => {
    const Div = styled.div`
		desaturate: desaturate(hsl(90, 80%, 50%), 20%);
		desaturate: desaturate(@color, 20%);
		desaturate: desaturate(@color, @p);
	`;
    expect(renderer.create(<Div color="hsl(90, 80%, 50%)" p="20%"/>).toJSON()).toMatchSnapshot();
});


test('Increase the lightness of a color in the HSL color space by an absolute amount.', () => {
    const Div = styled.div`
		lighten: lighten(hsl(90, 80%, 50%), 20%);
		lighten: lighten(@color, 20%);
		lighten: lighten(@color, @p);
	`;
    expect(renderer.create(<Div color="hsl(90, 80%, 50%)" p="20%"/>).toJSON()).toMatchSnapshot();
});
test('Decrease the lightness of a color in the HSL color space by an absolute amount.', () => {
    const Div = styled.div`
		darken: darken(hsl(90, 80%, 50%), 20%);
		darken: darken(@color, 20%);
		darken: darken(@color, @p);
	`;
    expect(renderer.create(<Div color="hsl(90, 80%, 50%)" p="20%"/>).toJSON()).toMatchSnapshot();
});