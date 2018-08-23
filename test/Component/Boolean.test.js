import React from 'react';
import renderer from 'react-test-renderer';
import styled from 'styled-components';
import 'jest-styled-components';

test('Sets a complex variable in an if check', () => {
    const Div = styled.div`
		cursor: if(@disabled, not-allowed);
	`;
    const tree = renderer.create(<Div/>).toJSON();
    expect(tree).toMatchSnapshot();

    const tree2 = renderer.create(<Div disabled/>).toJSON();
    expect(tree2).toMatchSnapshot();
});

test('Sets conditional margins', () => {
    const Div = styled.div`
		margin: if(@val, 6px);
	`;
    const tree = renderer.create(<Div/>).toJSON();
    expect(tree).toMatchSnapshot();

    const tree2 = renderer.create(<Div val/>).toJSON();
    expect(tree2).toMatchSnapshot();
});

test('Sets conditional margins with variables', () => {
    const Div = styled.div`
		margin: if(@val, @t, @f);
	`;
    const tree = renderer.create(<Div t="20px" f="0px"/>).toJSON();
    expect(tree).toMatchSnapshot();

    const tree2 = renderer.create(<Div t="20px" f="0px" val/>).toJSON();
    expect(tree2).toMatchSnapshot();
});

test('Sets color to the inverse of the bg luma', () => {
    const Div = styled.div`
        @bg: if(@checked, @navy, white);
        @bg-light: boolean(luma(@bg) > 50%);
        background: @bg; 
        color: if(@bg-light, black, white);
	`;
    const tree = renderer.create(<Div navy="#001F3F" checked/>).toJSON();
    expect(tree).toMatchSnapshot();

    const tree2 = renderer.create(<Div navy="#001F3F"/>).toJSON();
    expect(tree2).toMatchSnapshot();
});