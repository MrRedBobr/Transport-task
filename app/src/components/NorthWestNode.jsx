import React from 'react';
import style from './table/table.module.css';

import ColOrRow from './table/ColOrRow.jsx';
import MasC from './table/MasC.jsx';

const Table = (props) => {
	return <div className={style.table}>
		<div>A\B</div>
		<ColOrRow mas={props.masB}
			but={false}
		/>
		<ColOrRow mas={props.masA}
			but={false}
		/>
		<MasC mas={props.masC}/>
	</div>
}

export default class NorthWestNode extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			components: ''
		}
	}
	handleClick = () => {
		if(this.state.components) return this.setState(()=> ({components: ''}));
		let masA = Array.from(document.getElementById('A').getElementsByTagName('input')).map(val => Number(val.value));
		let masB = Array.from(document.getElementById('B').getElementsByTagName('input')).map(val => Number(val.value));
		//let masC = Array.from(document.getElementById('C').getElementsByTagName('input')).map(val => Number(val.value)).map((_, i, a) => a.slice(i * masB.length, i * masB.length + masB.length)).filter((el) => el.length);
		let masC = [];
		let mas = [];
		for(let i=0; i<masA.length; i++) {
			masC[i] = [];
			for(let j=0; j<masB.length; j++) {
				if(masA[i]<masB[j]) {
					masC[i][j] = masA[i];
					masB[j] = masB[j] - masA[i];
					masA[i] = 0;
					break;
				}
				masC[i][j] = masB[j];
				masA[i] = masA[i] - masB[j];
				masB[j] = 0;
			}
			mas.push(<Table masA={masA.slice()} masB={masB.slice()} masC={masC.slice()}/>)
		}
		this.setState(state => ({components: mas}));
	}
	render() {
		return <React.Fragment>
			<button onClick={this.handleClick}>East-West Node method</button>
			{this.state.components}
		</React.Fragment>
	}
}