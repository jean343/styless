import React from 'react';
import renderer from 'react-test-renderer';
import styled from 'styled-components';
import 'jest-styled-components';

test('Rounds up to the next highest integer.', () => {
    const Div = styled.div`
        ceil: ceil(2.4);
        ceil: ceil(@value);
	`;
    expect(renderer.create(<Div value={2.4}/>).toJSON()).toMatchSnapshot();
});

test('Rounds down to the next lowest integer.', () => {
    const Div = styled.div`
        floor: floor(2.6);
        floor: floor(@value);
	`;
    expect(renderer.create(<Div value={2.6}/>).toJSON()).toMatchSnapshot();
});