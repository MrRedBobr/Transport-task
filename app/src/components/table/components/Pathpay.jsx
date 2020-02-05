import React from 'react';
import { render } from 'react-dom';

export default class Pathpay extends React.Component {
	render() {
		let tableLength = this.props.length;
		let TableLine = new Array(tableLength).fill(1);
		return <div>
			{TableLine.map((value, index) => <div key={index} id={'C'+index}>
				{this.props.children}
			</div>)}
		</div>
	}
}