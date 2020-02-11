import React from 'react';

export default class ColOrRow extends React.Component {
	plus = () =>{
		this.props.plus(this.props.type);
	}
	minus = () =>{
		if(this.props.mas.length !== 1) this.props.minus(this.props.type);
	}
	button = (func, type) => {
		if(this.props.but) return <button onClick={func}>{type}</button>
	}
	render() {
		return <div id={this.props.type}>
			{this.props.mas.map((value,index) => 
			<input key={index}
			type='number'
			min={0}
			defaultValue={value} />)}
			{this.button(this.plus, '+')}
			{this.button(this.minus, '-')}
		</div>
	}
}
