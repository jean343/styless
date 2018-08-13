import React from 'react';
import renderer from 'react-test-renderer';
import styled from 'styled-components';
import 'jest-styled-components';

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