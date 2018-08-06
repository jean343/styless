'use strict';
const lessToJs = require( "less-vars-to-json" );
const stripJsonComments = require( "strip-json-comments" );
import { isStyled } from './utils/detectors'

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
	return {
		visitor: {
			TaggedTemplateExpression( path, state ){
				if( !isStyled( path.node.tag, state ) )
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
