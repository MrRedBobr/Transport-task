import React from 'react';

export default class MasC extends React.Component {
	render() {
		return <div id={this.props.type}>
			{this.props.mas.map((value,index) => <div key={index}>
				{value.map((val,ind) => 
				<input
				key={ind}
				defaultValue={val}
				type='number'
				min={1}/>)}
				</div>)}
		</div>
	}
}
