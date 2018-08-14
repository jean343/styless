import React from 'react';
import renderer from 'react-test-renderer';
import styled from 'styled-components';
import 'jest-styled-components';

test('Returns true if a value is a number, false otherwise.', () => {
    const Div = styled.div`
        number1: isnumber(#ff0);     // false
        number2: isnumber(blue);     // false
        number3: isnumber("string"); // false
        number4: isnumber(1234);     // true
        number5: isnumber(56px);     // true
        number6: isnumber(7.8%);     // true
        number7: isnumber(keyword);  // false
        number8: isnumber(url("http://yadi")); // false
	`;
    expect(renderer.create(<Div/>).toJSON()).toMatchSnapshot();
});