// import preact
import { h, render, Component } from "preact";
import style from "./style";

export default class Card extends Component {

	constructor(props) {
		super(props);

	}

	render() {
		return <div class={style.card}>{this.props.children}</div>;
	}
}
