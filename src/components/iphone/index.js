// import preact
import { h, render, Component } from "preact";
// import stylesheets for ipad & button
import style from "./style";
// import the Button component
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
		APIClient.fetchForecastForLocation("London", 10).then((data) => { console.log(data); });
		APIClient.searchForLocation("London").then((data) => { console.log(data); });
		APIClient.getAstronomyData("London").then((data) => { console.log(data); });
		APIClient.getSportData("London").then((data) => { console.log(data); });
	}

	// the main render method for the iphone component
	render() {
		// display all weather data
		return (
			<div class={style.container}>
				<Card><div><p>Test 1!</p></div></Card>
				<Card>Test 2</Card>
				<Card>Test 3</Card>
			</div>
		);
	}
}
