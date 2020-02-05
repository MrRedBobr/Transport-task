import React from 'react';

export default class TopRow extends React.Component {
	render() {
		let length = this.props.length;
		let elements = new Array(length).fill(1);
		
		return <React.Fragment>
			{elements.map((val, ind) => <input key={ind} type="number" min={0}/>)}
		</React.Fragment>
	}
}
