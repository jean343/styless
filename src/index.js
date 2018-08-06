'use strict';
const lessToJs = require( "less-vars-to-json" );
const fs = require( "fs" );

function importLocalName( name, state ){
	let localName = name === 'default' ? 'styled' : name

	state.file.path.traverse( {
		ImportDeclaration: {
			exit( path ){
				const { node } = path

				if( node.source.value === 'styled-components' ){
					for( const specifier of path.get( 'specifiers' ) ){
						if( specifier.isImportDefaultSpecifier() ){
							localName = specifier.node.local.name
						}

						if( specifier.isImportSpecifier() && specifier.node.imported.name === name ){
							localName = specifier.node.local.name
						}

						if( specifier.isImportNamespaceSpecifier() ){
							localName = specifier.node.local.name
						}
					}
				}
			}
		}
	} )

	return localName
}

function isStyled( t, tag, state ){
	/* Matches the extend blocks such as
	const Block = Div.extend`
	  color: @color
	`
	 */
	if( tag.property && tag.property.name === "extend" ){
		return true;
	}
	if( t.isCallExpression( tag ) && t.isMemberExpression( tag.callee ) && tag.callee.property.name !== 'default' /** ignore default for #93 below */ ){
		// styled.something()
		return isStyled( t, tag.callee.object, state )
	} else {
		return (
			(t.isMemberExpression( tag ) && tag.object.name === importLocalName( 'default', state )) ||
			(t.isCallExpression( tag ) && tag.callee.name === importLocalName( 'default', state )) ||

			/**
			 * #93 Support require()
			 * styled-components might be imported using a require()
			 * call and assigned to a variable of any name.
			 * - styled.default.div``
			 * - styled.default.something()
			 */
			(state.styledRequired && t.isMemberExpression( tag ) && t.isMemberExpression( tag.object ) && tag.object.property.name === 'default' && tag.object.object.name === state.styledRequired) ||
			(state.styledRequired && t.isCallExpression( tag ) && t.isMemberExpression( tag.callee ) && tag.callee.property.name === 'default' && tag.callee.object.name === state.styledRequired)
		)
	}
}

function convert( val ){
	const parts = [
		`props["${val}"]`,
		`(props.theme || {})["${val}"]`,
	]
	return parts.filter( v => !!v ).join( " || " );
}

// Babel plugin to replace the @variables from the styled-components to theme getters.
// It will convert `background-color: @color;` into `background-color: ${props => props["color"]};`
module.exports = function( babel ){
	let t = babel.types;
	return {
		visitor: {
			TaggedTemplateExpression( path, state ){
				if( !isStyled( t, path.node.tag, state ) )
					return;

				let source = path.getSource();
				console.log( "source before", source );

				if( !source.includes( "@" ) )
					return;

				source = source.replace( /\/\*(.|[\r\n])*?\*\//g, '' ) // Replace multi line comments
				source = source.replace( /\/\/.*/gm, '' ) // Replace // comments

				source = source.replace( /if\s*\(\s*@([\w-]+)\s*,\s*@([\w-]+)\s*(?:,\s*@([\w-]+)\s*)?\)/g, ( match, m1, m2, m3 ) => {
					return `\${props => ${convert( m1 )} ? ${convert( m2 )} : ${convert( m3 )}}` // Replaces if(@a, @b)
				} );
				source = source.replace( /(\w*)\s*\(\s*@([\w-]+)\s*\)/g, ( match, func, param ) => {
					return `\${props => ${func}(${convert( param )})}` // Replaces function(@a)
				} );
				source = source.replace( /@([\w-]+)/g, ( match, m1 ) => {
					return `\${props => ${convert( m1 )}}` // Replaces @a
				} );

				console.log( "source after", source );
				path.replaceWithSourceString( source );
			},

		}
	};
};
