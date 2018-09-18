import React from 'react';
import renderer from 'react-test-renderer';
import styled from 'styled-components';
import 'jest-styled-components';

test('Test and', () => {
    const Div = styled.div`
	    opacity1: if((@errorText) and (@warning), 1, 0);
	    opacity2: if(@errorText and @warning, 1, 0);
	`;
    expect(renderer.create(<Div/>).toJSON()).toMatchSnapshot();
    expect(renderer.create(<Div errorText/>).toJSON()).toMatchSnapshot();
    expect(renderer.create(<Div warning/>).toJSON()).toMatchSnapshot();
    expect(renderer.create(<Div errorText warning/>).toJSON()).toMatchSnapshot();
});

test('Test or', () => {
    const Div = styled.div`
	    opacity1: if((@errorText) or (@warning), 1, 0);
	    opacity2: if(@errorText or @warning, 1, 0);
	`;
    expect(renderer.create(<Div/>).toJSON()).toMatchSnapshot();
    expect(renderer.create(<Div errorText/>).toJSON()).toMatchSnapshot();
    expect(renderer.create(<Div warning/>).toJSON()).toMatchSnapshot();
    expect(renderer.create(<Div errorText warning/>).toJSON()).toMatchSnapshot();
});