// import preact
import { h, render, Component } from 'preact';
import style from "./style";

export default class Button extends Component {
	render() {
		return (
			<div>
				<button onClick={this.props.onClick} className={style.button}>
					{this.props.children}
				</button>
			</div>
		);
	}
}
