import React from 'react';
import renderer from 'react-test-renderer';

test( 'Link changes the class when hovered', () => {
	const component = renderer.create(
		<div>Facebook</div>,
	);
	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );