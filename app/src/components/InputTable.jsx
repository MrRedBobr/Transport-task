import React from 'react';

import ColOrRow from './table/ColOrRow.jsx';
import MasC from './table/MasC.jsx';
import style from './table/table.module.css';

export default class InputTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = props.settings;
		console.log(this.state);
	}
	handleChengeMasMinus = (namemas) => {
		switch(namemas){
			case 'A':
				this.setState((state) => ({
					masA: state.masA.splice(0, state.masA.length - 1),
					masC: this.state.masC.splice(0, this.state.masC.length - 1)
				}));
			break;
			case 'B':
				this.setState((state) => ({
					masB: state.masB.splice(0, state.masB.length - 1),
					masC: this.state.masC.map(value => value.splice(0, value.length - 1))
				}));
			break;
		}
		console.log(this.state);
		
	}
	handleChengeMasPlus = (namemas) => {
		switch(namemas){
			case 'A':
				let masA = this.state.masA;
				masA.push(1);
				let masC = this.state.masC;
				masC.push(new Array(masC[0].length).fill(1));
				this.setState((state) => ({
					masA: masA,
					masC: masC
				}));
			break;
			case 'B':
				let masB = this.state.masB;
				masB.push(1);
				masC = this.state.masC;
				masC.forEach(value => value.push(1));
				this.setState((state) => ({
					masB: masB,
					masC: masC
				}));
			break;
		}
		console.log(this.state);
	}
	render() {
		return <div className={style.table}>
			<div>A\B</div>
			<ColOrRow mas={this.state.masB}
				type={'B'}
				but={true}
				minus={this.handleChengeMasMinus}
				plus={this.handleChengeMasPlus}
			/>
			<ColOrRow mas={this.state.masA}
				type={'A'}
				but={true}
				minus={this.handleChengeMasMinus}
				plus={this.handleChengeMasPlus}
			/>
			<MasC mas={this.state.masC} type={'C'}/>
		</div>
	}
}
