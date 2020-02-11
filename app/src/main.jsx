import React from 'react';
import ReactDom from 'react-dom';

import InputTable from './components/InputTable.jsx';
import Methods from './components/Methods.jsx';

const defaultSettings = {
	masA: [140, 160, 130],
	masB: [150, 100, 100, 80],
	masC: [
		[2,3,4,2],
		[8,4,1,4],
		[9,7,3,6]
	]
}

ReactDom.render(<React.Fragment>
	<InputTable settings={defaultSettings}/>
	<Methods />
</React.Fragment>,
document.getElementById('cont'));