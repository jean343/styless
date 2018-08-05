import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const App = styled.div`
	color: red;
	background-color: @bg;
`;

ReactDOM.render( <App bg="green">App</App>, document.getElementById( 'root' ) );