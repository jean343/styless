import React from 'react';
import renderer from 'react-test-renderer';
import styled from 'styled-components';
import 'jest-styled-components';

test.skip('Returns the number of elements in a value list', () => {
    const Div = styled.div`
        @list: "banana", "tomato", "potato", "peach";
        n: length(@list);
        n2: length(1px solid #0080ff);
	`;
    expect(renderer.create(<Div/>).toJSON()).toMatchSnapshot();
});

test.skip('Returns the value at a specified position in a list.', () => {
    const Div = styled.div`
        @list: apple, pear, coconut, orange;
        value: extract(@list, 3);
	`;
    expect(renderer.create(<Div/>).toJSON()).toMatchSnapshot();
});