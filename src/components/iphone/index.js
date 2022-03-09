// import preact
import { h, render, Component } from "preact";
// import stylesheets for ipad & button
import style from "./style";
import style_iphone from "../button/style_iphone";
// import jquery for API calls
import $ from "jquery";
// import the Button component
import Button from "../button";
import APIClient from "../../lib/APIClient";
import Card from "../card";

export default class Iphone extends Component {
	//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props) {
		super(props);
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState({ display: true });

		APIClient.fetchWeatherForLocation("London").then((data) => { console.log(data); });
	}

	// the main render method for the iphone component
	render() {
		// display all weather data
		return (
			<div class={style.container}>
				<Card/>
				<Card/>
				<Card/>
			</div>
		);
	}
}
