import React from 'react';
import style from './table/table.module.css';

import ColOrRow from './table/ColOrRow.jsx';
import MasC from './table/MasC.jsx';

const Table = (props) => {
	return <React.Fragment>
		<div>A\B</div>
		<ColOrRow mas={props.masB}
			but={false}
		/>
		<ColOrRow mas={props.masA}
			but={false}
		/>
		<MasC mas={props.masC}/>
	</React.Fragment>
}

function arr(a,b){
	let mas = [];
	for(let i=0; i<a; i++){
		mas[i] = [];
		for(let j=0; j<b; j++){
			mas[i][j] = 0;
		}
	}
	return mas;
}

export default class Methods extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			components: '',
			str: ''
		}
	}
	EastWestNode = () => {
		if(this.state.components) return this.setState(()=> ({components: '', str: ''}));
		let masA = Array.from(document.getElementById('A').getElementsByTagName('input')).map(val => Number(val.value));
		let masB = Array.from(document.getElementById('B').getElementsByTagName('input')).map(val => Number(val.value));
		let masC = Array.from(document.getElementById('C').getElementsByTagName('input')).map(val => Number(val.value)).map((_, i, a) => a.slice(i * masB.length, i * masB.length + masB.length)).filter((el) => el.length);
		let masH = [];
		let mas = [];
		for(let i=0; i<masA.length; i++) {
			masH[i] = [];
			for(let j=0; j<masB.length; j++) {
				if(masA[i]<masB[j]) {
					masH[i][j] = masA[i];
					masB[j] = masB[j] - masA[i];
					masA[i] = 0;
					break;
				}
				masH[i][j] = masB[j];
				masA[i] = masA[i] - masB[j];
				masB[j] = 0;
			}
			mas.push(<div className={style.table} key={mas.length}><Table masA={masA.slice()} masB={masB.slice()} masC={masH.map((value) => value.map(val => val))}/></div>);
		}
		let str = '0', ansver = 0;
		masH.map((value, i) => 
		value.map((val, j) => {
			if(val > 0){
				str = str + ' + ' + val + '*' + masC[i][j];
				ansver = ansver + val*masC[i][j];
			}
		}));
		this.setState(state => ({components: mas, str: str+' = '+ansver}));
	}
	MinimalElement = () => {
		if(this.state.components) return this.setState(()=> ({components: '', str: ''}));
		let masA = Array.from(document.getElementById('A').getElementsByTagName('input')).map(val => Number(val.value));
		let masB = Array.from(document.getElementById('B').getElementsByTagName('input')).map(val => Number(val.value));
		let masC = Array.from(document.getElementById('C').getElementsByTagName('input')).map(val => Number(val.value)).map((_, i, a) => a.slice(i * masB.length, i * masB.length + masB.length)).filter((el) => el.length);
		let masH = arr(masA.length, masB.length);
		let pushValues = masA.length + masB.length - 1;
		let mas = [];
		while(pushValues){
			let mini=0, minj=0, min = 100;
			for(let i=0; i< masA.length; i++){
				for(let j=0; j< masB.length; j++){
					if(masC[i][j] < min){
						if(masA[i] !== 0 && masB[j] !== 0){
							mini = i;
							minj = j;
							min = masC[i][j];
						}
					}
				}
			}
			if(masA[mini] < masB[minj]){
				masH[mini][minj] = masA[mini];
				masB[minj] = masB[minj] - masA[mini];
				masA[mini] = 0;
				pushValues = pushValues - 1;
			} else {
				masH[mini][minj] = masB[minj];
				masA[mini] = masA[mini] - masB[minj];
				masB[minj] = 0;
				pushValues = pushValues - 1;
			}
			mas.push(<div className={style.table} key={mas.length}><Table masA={masA.slice()} masB={masB.slice()} masC={masH.map((value) => value.map(val => val))}/></div>);
		}
		let str = '0', ansver = 0;
		masH.map((value, i) => 
		value.map((val, j) => {
			if(val > 0){
				str = str + ' + ' + val + '*' + masC[i][j];
				ansver = ansver + val*masC[i][j];
			}
		}));
		this.setState(state => ({components: mas, str: str+' = '+ansver}));
	}
	render() {
		return <React.Fragment>
			<button onClick={this.EastWestNode}>East-West Node method</button>
			<button onClick={this.MinimalElement}>Minimal element method</button>
			{this.state.components}
			{this.state.str}
		</React.Fragment>
	}
}