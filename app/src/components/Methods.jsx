import React from 'react';
import style from './table/table.module.css';

import ColOrRow from './table/ColOrRow.jsx';
import MasC from './table/MasC.jsx';

const reducer = (accumulator, currentValue) => accumulator + currentValue;
const getMaxOfArray = numArray => numArray.indexOf(Math.max(...numArray));
const getMinOfArray = numArray => numArray.indexOf(Math.min(...numArray));
const Table = props => {
	return (
		<React.Fragment>
			<div>A\B</div>
			<ColOrRow mas={props.masB} but={false} />
			<ColOrRow mas={props.masA} but={false} />
			<MasC mas={props.masC} />
		</React.Fragment>
	);
};
const Table2 = props => {
	let masC = props.masC.map((value, index) => value);
	masC.map((value, index) => value.push(props.masRazA[index]));
	masC.push(props.masRazB);

	console.log(masC);
	return (
		<React.Fragment>
			<div>A\B</div>
			<ColOrRow mas={props.masB} but={false} />
			<ColOrRow mas={props.masA} but={false} />
			<MasC mas={masC} />
		</React.Fragment>
	);
};

function arr(a, b) {
	let mas = [];
	for (let i = 0; i < a; i++) {
		mas[i] = [];
		for (let j = 0; j < b; j++) {
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
		};
	}
	eastWestNode = () => {
		if (this.state.components)
			return this.setState(() => ({ components: '', str: '' }));
		let masA = Array.from(
			document.getElementById('A').getElementsByTagName('input')
		).map(val => Number(val.value));
		let masB = Array.from(
			document.getElementById('B').getElementsByTagName('input')
		).map(val => Number(val.value));
		let masC = Array.from(
			document.getElementById('C').getElementsByTagName('input')
		)
			.map(val => Number(val.value))
			.map((_, i, a) => a.slice(i * masB.length, i * masB.length + masB.length))
			.filter(el => el.length);
		let masH = [];
		let mas = [];
		if (masA.reduce(reducer) < masB.reduce(reducer))
			return this.setState(() => ({ components: '', str: 'Не сходится' }));
		for (let i = 0; i < masA.length; i++) {
			masH[i] = [];
			for (let j = 0; j < masB.length; j++) {
				if (masA[i] < masB[j]) {
					masH[i][j] = masA[i];
					masB[j] = masB[j] - masA[i];
					masA[i] = 0;
					break;
				}
				masH[i][j] = masB[j];
				masA[i] = masA[i] - masB[j];
				masB[j] = 0;
			}
			mas.push(
				<div className={style.table} key={mas.length}>
					<Table
						masA={masA.slice()}
						masB={masB.slice()}
						masC={masH.map(value => value.map(val => val))}
					/>
				</div>
			);
		}
		let str = '0',
			ansver = 0;
		masH.map((value, i) =>
			value.map((val, j) => {
				if (val > 0) {
					str = str + ' + ' + val + '*' + masC[i][j];
					ansver = ansver + val * masC[i][j];
				}
			})
		);
		this.setState(state => ({ components: mas, str: str + ' = ' + ansver }));
	};
	minimalElement = () => {
		if (this.state.components)
			return this.setState(() => ({ components: '', str: '' }));
		let masA = Array.from(
			document.getElementById('A').getElementsByTagName('input')
		).map(val => Number(val.value));
		let masB = Array.from(
			document.getElementById('B').getElementsByTagName('input')
		).map(val => Number(val.value));
		let masC = Array.from(
			document.getElementById('C').getElementsByTagName('input')
		)
			.map(val => Number(val.value))
			.map((_, i, a) => a.slice(i * masB.length, i * masB.length + masB.length))
			.filter(el => el.length);
		let masH = arr(masA.length, masB.length);
		let pushValues = masA.length + masB.length - 1;
		let mas = [];
		if (masA.reduce(reducer) < masB.reduce(reducer))
			return this.setState(() => ({ components: '', str: 'Не сходится' }));
		while (pushValues) {
			let mini = 0,
				minj = 0,
				min = 100;
			for (let i = 0; i < masA.length; i++) {
				for (let j = 0; j < masB.length; j++) {
					if (masC[i][j] < min) {
						if (masA[i] !== 0 && masB[j] !== 0) {
							mini = i;
							minj = j;
							min = masC[i][j];
						}
					}
				}
			}
			if (masA[mini] < masB[minj]) {
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
			mas.push(
				<div className={style.table} key={mas.length}>
					<Table
						masA={masA.slice()}
						masB={masB.slice()}
						masC={masH.map(value => value.map(val => val))}
					/>
				</div>
			);
		}
		let str = '0',
			ansver = 0;
		masH.map((value, i) =>
			value.map((val, j) => {
				if (val > 0) {
					str = str + ' + ' + val + '*' + masC[i][j];
					ansver = ansver + val * masC[i][j];
				}
			})
		);
		this.setState(state => ({ components: mas, str: str + ' = ' + ansver }));
	};
	proximation = () => {
		let masA = Array.from(
			document.getElementById('A').getElementsByTagName('input')
		).map(val => Number(val.value));
		let masB = Array.from(
			document.getElementById('B').getElementsByTagName('input')
		).map(val => Number(val.value));
		let masC = Array.from(
			document.getElementById('C').getElementsByTagName('input')
		)
			.map(val => Number(val.value))
			.map((_, i, a) => a.slice(i * masB.length, i * masB.length + masB.length))
			.filter(el => el.length);

		let AA = masA.slice();
		let BB = masB.slice();
		let numberOfIteration = masA.length + masB.length - 1;
		let masH = masC.map(value => value.slice());
		let row = new Array(masA.length).fill(0).map((value, index) => index);
		let col = new Array(masB.length).fill(0).map((value, index) => index);
		let str = '0';
		let ansver = 0;
		let mas = [];
		while (numberOfIteration > 0) {
			let difference = [];
			difference[0] = new Array(masA.length);
			difference[1] = new Array(masB.length);
			let i = 0;
			for (; i < masA.length; i++) {
				let min = masH[i][0],
					premin;
				let j = 1;
				for (; j < masB.length; j++) {
					if (min >= masH[i][j]) {
						premin = min;
						min = masH[i][j];
					} else if (masH[i][j] < premin || !premin) {
						premin = masH[i][j];
					}
				}
				if (!premin) premin = min;
				difference[0][i] = premin - min;
			}
			// debugger;
			for (let i = 0; i < masB.length; i++) {
				let min = masH[0][i],
					premin;
				for (let j = 1; j < masA.length; j++) {
					if (min >= masH[j][i]) {
						premin = min;
						min = masH[j][i];
					} else if (masH[j][i] < premin || !premin) {
						premin = masH[j][i];
					}
				}
				if (!premin) premin = min;
				difference[1][i] = premin - min;
			}
			console.log(difference);
			let minInd = getMaxOfArray([...difference[0], ...difference[1]]);
			let minDel;
			mas.push(
				<div className={style.table + ' ' + style.table2} key={mas.length}>
					<Table2
						masA={masA.slice()}
						masB={masB.slice()}
						masC={masH.map(value => value.map(val => val))}
						masRazA={difference[0].slice()}
						masRazB={difference[1].slice()}
					/>
				</div>
			);
			if (minInd < difference[0].length) {
				// по строкам
				minDel = getMinOfArray(masH[minInd]);
				if (masB[minDel] > masA[minInd]) {
					str =
						str + ' + ' + masC[row[minInd]][col[minDel]] + '*' + masA[minInd];
					ansver = ansver + masC[row[minInd]][col[minDel]] * masA[minInd];

					masC[row[minInd]][col[minDel]] = masA[minInd];

					masB[minDel] = masB[minDel] - masA[minInd];
					masA.splice(minInd, 1);
					row.splice(minInd, 1);
					masH.splice(minInd, 1);
				} else if (masB[minDel] < masA[minInd]) {
					str =
						str + ' + ' + masC[row[minInd]][col[minDel]] + '*' + masB[minDel];
					ansver = ansver + masC[row[minInd]][col[minDel]] * masB[minDel];

					masC[row[minInd]][col[minDel]] = masB[minDel];

					masA[minInd] = masA[minInd] - masB[minDel];
					masB.splice(minDel, 1);
					col.splice(minDel, 1);
					masH = masH.map(value => {
						value.splice(minDel, 1);
						return value;
					});
				} else if (masB[minDel] == masA[minInd]) {
					str =
						str + ' + ' + masC[row[minInd]][col[minDel]] + '*' + masA[minInd];
					ansver = ansver + masC[row[minInd]][col[minDel]] * masA[minInd];

					masC[row[minInd]][col[minDel]] = masA[minInd];
					masA[minInd] = 0;
					masB[minDel] = 0;
				}
				console.table(masH);
				console.log(masA);
				console.log(masB);
			} else {
				minDel = minInd - difference[0].length;
				minInd = getMinOfArray(
					[].concat(
						...masH.map(value => value.filter((val, index) => index == minDel))
					)
				);
				if (masB[minDel] > masA[minInd]) {
					str =
						str + ' + ' + masC[row[minInd]][col[minDel]] + '*' + masA[minInd];
					ansver = ansver + masC[row[minInd]][col[minDel]] * masA[minInd];

					masC[row[minInd]][col[minDel]] = masA[minInd];

					masB[minDel] = masB[minDel] - masA[minInd];
					masA.splice(minInd, 1);
					row.splice(minInd, 1);
					masH.splice(minInd, 1);
				} else if (masB[minDel] < masA[minInd]) {
					str =
						str + ' + ' + masC[row[minInd]][col[minDel]] + '*' + masB[minDel];
					ansver = ansver + masC[row[minInd]][col[minDel]] * masB[minDel];

					masC[row[minInd]][col[minDel]] = masB[minDel];

					masA[minInd] = masA[minInd] - masB[minDel];
					masB.splice(minDel, 1);
					col.splice(minDel, 1);
					masH = masH.map(value => {
						value.splice(minDel, 1);
						return value;
					});
				} else if (masB[minDel] == masA[minInd]) {
					str =
						str + ' + ' + masC[row[minInd]][col[minDel]] + '*' + masA[minInd];
					ansver = ansver + masC[row[minInd]][col[minDel]] * masA[minInd];

					masC[row[minInd]][col[minDel]] = masA[minInd];
					masA[minInd] = 0;
					masB[minDel] = 0;
				}
				console.table(masH);
				console.log(masA);
				console.log(masB);
			}
			mas.push(
				<div className={style.table} key={mas.length}>
					<Table masA={AA} masB={BB} masC={masC.map(val => val.map(v => v))} />
				</div>
			);
			numberOfIteration = numberOfIteration - 1;
		}
		console.table(masC);
		console.log(str, ansver);
		this.setState(state => ({ components: mas, str: str + ' = ' + ansver }));
	};
	render() {
		return (
			<React.Fragment>
				<button onClick={this.eastWestNode} className={style.ansverButton}>
					East-West Node method
				</button>
				<button onClick={this.minimalElement} className={style.ansverButton}>
					Minimal element method
				</button>
				<button onClick={this.proximation} className={style.ansverButton}>
					Аппроксимация Фогеля
				</button>
				<div className={style.text}>
					{this.state.components}
					{this.state.str}
				</div>
			</React.Fragment>
		);
	}
}
