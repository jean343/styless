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

    const Div2 = styled.div`
        number1: isnumber(@v1);     // false
        number2: isnumber(@v2);     // false
        number3: isnumber(@v3);     // false
        number4: isnumber(@v4);     // true
        number5: isnumber(@v5);     // true
        number6: isnumber(@v6);     // true
        number7: isnumber(@v7);     // false
        number8: isnumber(@v8);     // false
	`;
    expect(renderer.create(<Div2 v1="#ff0" v2="blue" v3="string" v4="1234" v5="56px" v6="7.8%" v7="keyword" v8={'url("http://yadi")'}/>).toJSON()).toMatchSnapshot();
});

test('Returns true if a value is a string, false otherwise.', () => {
    const Div = styled.div`
        string1: isstring(#ff0);     // false
        string2: isstring(blue);     // false
        string3: isstring("string"); // true
        string4: isstring(1234);     // false
        string5: isstring(56px);     // false
        string6: isstring(7.8%);     // false
        string7: isstring(keyword);  // false
        string8: isstring(url("http://yadi")); // false
	`;
    expect(renderer.create(<Div/>).toJSON()).toMatchSnapshot();

    const Div2 = styled.div`
        string1: isstring(@v1);     // false
        string2: isstring(@v2);     // false
        string3: isstring(@v3);     // true
        string4: isstring(@v4);     // false
        string5: isstring(@v5);     // false
        string6: isstring(@v6);     // false
        string7: isstring(@v7);     // false
        string1: isstring(@v8);     // false
	`;
    expect(renderer.create(<Div2 v1="#ff0" v2="blue" v3={"\"string\""} v4="1234" v5="56px" v6="7.8%" v7="keyword" v8={'url("http://yadi")'}/>).toJSON()).toMatchSnapshot();
});

test('Returns true if a value is a color, false otherwise.', () => {
    const Div = styled.div`
        v1: iscolor(#ff0);     // true
        v2: iscolor(blue);     // true
        v3: iscolor("string"); // false
        v4: iscolor(1234567);     // false
        v5: iscolor(56px);     // false
        v6: iscolor(7.8%);     // false
        v7: iscolor(keyword);  // false
        v8: iscolor(url("http://yadi")); // false
	`;
    expect(renderer.create(<Div/>).toJSON()).toMatchSnapshot();

    const Div2 = styled.div`
        v1: iscolor(@v1);     // true
        v2: iscolor(@v2);     // true
        v3: iscolor(@v3);     // false
        v4: iscolor(@v4);     // false
        v5: iscolor(@v5);     // false
        v6: iscolor(@v6);     // false
        v7: iscolor(@v7);     // false
        v8: iscolor(@v8);     // false
	`;
    expect(renderer.create(<Div2 v1="#ff0" v2="blue" v3={"\"string\""} v4="1234567" v5="56px" v6="7.8%" v7="keyword" v8={'url("http://yadi")'}/>).toJSON()).toMatchSnapshot();
});

test('Returns true if a value is a number in pixels, false otherwise.', () => {
    const Div = styled.div`
        is: ispixel(56px);
	`;
    expect(renderer.create(<Div/>).toJSON()).toMatchSnapshot();

    const Div2 = styled.div`
        is: ispixel(@v);
	`;
    expect(renderer.create(<Div2 v="56px"/>).toJSON()).toMatchSnapshot();
});

test('Returns true if a value is an em value, false otherwise.', () => {
    const Div = styled.div`
        is: isem(56em);
	`;
    expect(renderer.create(<Div/>).toJSON()).toMatchSnapshot();

    const Div2 = styled.div`
        is: isem(@v);
	`;
    expect(renderer.create(<Div2 v="56em"/>).toJSON()).toMatchSnapshot();
});

test('Returns: true if value is a percentage value, false otherwise.', () => {
    const Div = styled.div`
        is: ispercentage(7.8%);
	`;
    expect(renderer.create(<Div/>).toJSON()).toMatchSnapshot();

    const Div2 = styled.div`
        is: ispercentage(@v);
	`;
    expect(renderer.create(<Div2 v="7.8%"/>).toJSON()).toMatchSnapshot();
});

test('Returns: true if value is a number in specific units, false otherwise.', () => {
    const Div = styled.div`
        is: isunit(11px, px);
        isNot: isunit(11px, %);
	`;
    expect(renderer.create(<Div/>).toJSON()).toMatchSnapshot();

    const Div2 = styled.div`
        is: isunit(@v, %);
        isNot: isunit(@v, px);
        width: @v;
	`;
    expect(renderer.create(<Div2 v="7.8%"/>).toJSON()).toMatchSnapshot();
});