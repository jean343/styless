import React from 'react';
import renderer from 'react-test-renderer';
import styled from 'styled-components';
import 'jest-styled-components';

test('Does some math.', () => {
    const Div = styled.div`
        width: 100px + 100;
        width: 100 + 100px;
        width1: @a + @b;
        width1: @a - @b;
        width1: @a * @b;
        width1: @a / @b;
        
        width2: @b + @a;
        width2: @b - @a;
        width2: @b * @a;
        width2: @b / @a;
	`;
    expect(renderer.create(<Div a="100px" b="50"/>).toJSON()).toMatchSnapshot();
});

test('Rounds up to the next highest integer.', () => {
    const Div = styled.div`
        ceil: ceil(2.4);
        ceil: ceil(@value);
        ceil: ceil(2.4px);
        ceil: ceil(@value2);
	`;
    expect(renderer.create(<Div value={2.4} value2="2.4px"/>).toJSON()).toMatchSnapshot();
});

test('Rounds down to the next lowest integer.', () => {
    const Div = styled.div`
        floor: floor(2.6);
        floor: floor(@value);
        floor: floor(2.6em);
        floor: floor(@value2);
	`;
    expect(renderer.create(<Div value={2.6} value2="2.6em"/>).toJSON()).toMatchSnapshot();
});

test('Converts a floating point number into a percentage string.', () => {
    const Div = styled.div`
        p: percentage(0.5);
        p: percentage(0.5em);
        p: percentage(@value);
	`;
    expect(renderer.create(<Div value={0.5}/>).toJSON()).toMatchSnapshot();
});

test('Applies rounding.', () => {
    const Div = styled.div`
        round: round(1.67);
        round: round(@value);
        round: round(1.67px);
        round: round(@value2);
	`;
    expect(renderer.create(<Div value={1.67} value2="1.67px"/>).toJSON()).toMatchSnapshot();
});

test('Calculates square root of a number. Keeps units as they are.', () => {
    const Div = styled.div`
        sqrt: sqrt(25cm);
        sqrt: sqrt(@value);
	`;
    expect(renderer.create(<Div value="25cm"/>).toJSON()).toMatchSnapshot();
});

test('Calculates absolute value of a number. Keeps units as they are.', () => {
    const Div = styled.div`
        abs: abs(25cm);
        abs: abs(-18.6%);
        abs: abs(@value);
        abs: abs(@value2);
	`;
    expect(renderer.create(<Div value="25cm" value2="-18.6%"/>).toJSON()).toMatchSnapshot();
});

test('Calculates sine function.', () => {
    const Div = styled.div`
        sin: sin(@value); // sine of 1 radian
        deg: sin(1deg); // sine of 1 degree
        grad: sin(1grad); // sine of 1 gradian
        turn: sin(0.2turn); // sine of 1 gradian
	`;
    expect(renderer.create(<Div value={1}/>).toJSON()).toMatchSnapshot();
});

test('Calculates arcsine (inverse of sine) function.', () => {
    const Div = styled.div`
        asin: asin(0.5);
        asin: asin(@zero);
        asin: asin(2);
	`;
    expect(renderer.create(<Div zero="0"/>).toJSON()).toMatchSnapshot();
});

test('Calculates cosine function.', () => {
    const Div = styled.div`
        sin: cos(@value); // cos of 1 radian
        deg: cos(1deg); // cos of 1 degree
        grad: cos(1grad); // cos of 1 gradian
        turn: cos(0.2turn); // cos of 1 gradian
	`;
    expect(renderer.create(<Div value={1}/>).toJSON()).toMatchSnapshot();
});

test('Calculates arccosine (inverse of cosine) function.', () => {
    const Div = styled.div`
        acos: acos(0.5);
        acos: acos(@one);
        acos: acos(2);
	`;
    expect(renderer.create(<Div one="1"/>).toJSON()).toMatchSnapshot();
});

test('Calculates tangent function.', () => {
    const Div = styled.div`
        tan: tan(1); // tangent of 1 radian
        tan: tan(1deg); // tangent of 1 degree
        tan: tan(1grad); // tangent of 1 gradian
	`;
    expect(renderer.create(<Div value={1}/>).toJSON()).toMatchSnapshot();
});

test('Calculates arctangent (inverse of tangent) function.', () => {
    const Div = styled.div`
        atan: atan(-1.5574077246549023);
        atan: atan(@zero);
        atan: round(atan(22), 6); // arctangent of 22 rounded to 6 decimal places
	`;
    expect(renderer.create(<Div zero="0"/>).toJSON()).toMatchSnapshot();
});

test('PI', () => {
    const Div = styled.div`
        pi: pi();
	`;
    expect(renderer.create(<Div/>).toJSON()).toMatchSnapshot();
});

test('Returns the value of the first argument raised to the power of the second argument.', () => {
    const Div = styled.div`
        pow: pow(0cm, 0px);
        pow: pow(25, -2);
        pow: pow(25, 0.5);
        pow: pow(-25, 0.5);
        pow: pow(-25%, -0.5);
        pow: pow(@x, @y);
	`;
    expect(renderer.create(<Div x={25} y={2}/>).toJSON()).toMatchSnapshot();
});

test('Returns the value of the first argument modulus second argument.', () => {
    const Div = styled.div`
        mod: mod(0cm, 0px);
        mod: mod(11cm, 6px);
        mod: mod(-26%, -5);
        mod: mod(@x, @y);
	`;
    expect(renderer.create(<Div x={27} y={5}/>).toJSON()).toMatchSnapshot();
});

test('Returns the lowest of one or more values.', () => {
    const Div = styled.div`
        min: min(5, 10);
        min: min(3px, 42px, 2px, 16px);
        min: min(@a, @b, @c);
	`;
    expect(renderer.create(<Div a={5} b="3px" c={72}/>).toJSON()).toMatchSnapshot();
});

test('Returns the highest of one or more values.', () => {
    const Div = styled.div`
        max: max(5, 10);
        max: max(3%, 42%, 1%, 16%);
        max: max(@a, @b, @c);
	`;
    expect(renderer.create(<Div a={5} b={3} c="72cm"/>).toJSON()).toMatchSnapshot();
});