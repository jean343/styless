'use strict';
const lessToJs = require( "less-vars-to-json" );
const stripJsonComments = require( "strip-json-comments" );
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
	if( !val ) return val;
	if( !val.startsWith( "@" ) ){
		return `"${val}"`;
	}
	val = val.substring( 1 );
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

				if( !source.includes( "@" ) )
					return;

				source = stripJsonComments( source );

				// https://regex101.com/r/WcrEPe/2
				source = source.replace( /if\s*\(\s*([\w-#@]+)\s*,\s*([\w-#@]+)\s*(?:,\s*([\w-#@]+)\s*)?\)/g, ( match, m1, m2, m3 ) => {
					return `\${props => ${convert( m1 )} ? ${convert( m2 )} : ${convert( m3 )}}` // Replaces if(@a, @b)
				} );
				source = source.replace( /(\w*)\s*\(\s*([\w-#@]+)\s*,\s*([\w-%]+)\s*\)/g, ( match, func, param1, param2 ) => {
					switch( func ){
						case "lighten":
						case "darken":
							return `\${props => require("polished").${func}(${parseInt( param2, 10 ) / 100}, ${convert( param1 )})}` // Replaces func(#aaabbb, 20%)
					}
					return match;
				} );

				source = source.replace( /(\w*)\s*\(@\s*([\w-]+)\s*\)/g, ( match, func, param ) => {
					return `\${props => ${func}(${convert( param )})}` // Replaces function(@a)
				} );

				source = source.replace( /(@[\w-]+)/g, ( match, m1 ) => {
					return `\${props => ${convert( m1 )}}` // Replaces @a
				} );

				path.replaceWithSourceString( source );
			},

		}
	};
};
