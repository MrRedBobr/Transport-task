import React from 'react';
import ReactDom from 'react-dom';

import './main.css';
import InputTable from './components/InputTable.jsx';
import Methods from './components/Methods.jsx';

const defaultSettings = {
	masA: [10, 20, 30],
	masB: [15, 20, 25],
	masC: [
		[5, 3, 1],
		[3, 2, 4],
		[4, 1, 2]
	]
};

ReactDom.render(
	<React.Fragment>
		<InputTable settings={defaultSettings} />
		<Methods />
	</React.Fragment>,
	document.getElementById('cont')
);
