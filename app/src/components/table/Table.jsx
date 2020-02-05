import React from 'react';

import Line from './components/Line.jsx';
import Pathpay from './components/Pathpay.jsx';

import style from './../../style/table.module.css';
import { hot } from 'react-hot-loader';

class Table extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rows: 2,
			columns: 4
		}
	}
	plus = (type) => {
		this.setState((state, props) => {
			return type==='columns' ?
			({ columns: state.columns + 1 }) : ({ rows: state.rows + 1 });
		});
	}
	minus = (type) => {
		if (this.state[type] === 1) return
		this.setState((state, props) => {
			return type==='columns' ?
			({ columns: state.columns - 1 }) : ({ rows: state.rows - 1 });
		});
	}
	render() {
		let row = <Line length={this.state.columns}/>;
		return <React.Fragment>
			<div className={style.table}>
				<div>
					a\b
				</div>
				<div>
					{row}
					<button className={style.button} onClick={() => this.plus('columns')}>+</button>
					<button onClick={() => this.minus('columns')}>-</button>
				</div>
				<div>
					<Line length={this.state.rows}/>
					<button onClick={() => this.plus('rows')}>+</button>
					<button onClick={() => this.minus('rows')}>-</button>
				</div>
				<Pathpay length={this.state.rows}>
					{row}
				</Pathpay>
			</div>
			<button className={style.ansverButton}>Ok</button>
		</React.Fragment>
	}
}

export default hot(module)(Table);