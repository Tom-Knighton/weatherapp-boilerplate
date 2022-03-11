// import preact
import { h, render, Component } from "preact";
// import stylesheets for ipad & button
import style from "./style";
// import the Button component
import APIClient from "../../lib/APIClient";
import Card from "../card";
import { HourlyForecast, UpcomingWeatherFeaturesCard, TopCard, DetailedCard } from "../homeCards";


export default class Iphone extends Component {
	//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props) {
		super(props);

		this.setState({
			locationName: "Loading... "
		});

		APIClient.getLocation().then(data => {
			this.setState({
				locationName: data.name
			});
		});
	}

	// the main render method for the iphone component
	render() {
		// display all weather data
		return (
			<div class={style.container}>
				<h1 class={style.bigTitle}>
					{this.state.locationName}
					{" "}
					{new Date().toLocaleTimeString([], {
						hour: "numeric",
						minute: "numeric",
						hour12: true
					})}
				</h1>
				<TopCard />
				<UpcomingWeatherFeaturesCard />
				<HourlyForecast />
				<DetailedCard />
				<Card>Tips g o here</Card>
			</div>
		);
	}
}
