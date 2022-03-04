// import preact
import { h, render, Component } from "preact";
import style from "./style";

export default class Card extends Component {
	render() {
		return <div class={style.card}>Test</div>;
	}
}
