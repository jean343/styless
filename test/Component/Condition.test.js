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

test('Test =', () => {
    const Div = styled.div`
	    opacity1: if(@a = @b, 1, 0);
	`;
    expect(renderer.create(<Div a={1} b={1}/>).toJSON()).toMatchSnapshot();
    expect(renderer.create(<Div a={1} b={0}/>).toJSON()).toMatchSnapshot();
    expect(renderer.create(<Div a="lala" b="lala"/>).toJSON()).toMatchSnapshot();
    expect(renderer.create(<Div a="lala" b={false}/>).toJSON()).toMatchSnapshot();
});

test('Test greater than', () => {
    const Div = styled.div`
	    opacity: if(luma(@bg) > 50%, 1, 0);
	    opacity: if(luma(@bg) >= 50%, 1, 0);
	    opacity: if(luma(@bg) < 50%, 1, 0);
	    opacity: if(luma(@bg) <= 50%, 1, 0);
	`;
    expect(renderer.create(<Div bg="black"/>).toJSON()).toMatchSnapshot();
    expect(renderer.create(<Div bg="white"/>).toJSON()).toMatchSnapshot();
});

test('If with function', () => {
    const Div = styled.div`
	  cursor: if(@onClick, pointer);
	`;
    expect(renderer.create(<Div onClick={() => false}/>).toJSON()).toMatchSnapshot();
});