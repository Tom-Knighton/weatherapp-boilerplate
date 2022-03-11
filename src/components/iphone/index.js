// import preact
import { h, render, Component } from "preact";
// import stylesheets for ipad & button
import style from "./style";
// import the Button component
import APIClient from "../../lib/APIClient";
import Card from "../card";
import { HourlyForecast, UpcomingWeatherFeaturesCard, TopCard } from "../homeCards";


export default class Iphone extends Component {
	//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props) {
		super(props);

		this.setState({
			locationName: "Loading... "
		})

		APIClient.getLocation().then(data => {
			this.setState({
				locationName: data.name
			})
		});

		APIClient.fetchWeatherForLocation().then((data) => {
			this.setState({
				date: data.location.localtime,
				currentCloud: data.current.cloud,
				currentWindSpeed: data.current.gust_mph,
				currentRainfall: data.current.precip_mm,
				currentVisibility: data.current.vis_miles,
				currentTemp: data.current.temp_c,
				currentIcon: `https://${data.current.condition.icon}`,
			});

			APIClient.fetchForecastForLocation(10).then((data) => {
				this.setState({
					forecast: data.forecast.forecastday
				});

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
						hour12: true,
					})}
				</h1>
				<TopCard />
				<UpcomingWeatherFeaturesCard />
				<HourlyForecast />
				<Card>
					<div class={style.gridContainer}>
						<div class={style.gridItem}>
							<h4>Cloud Coverage:</h4>
							<p>{this.state.currentCloud}%</p>
						</div>
						<div class={style.gridItem}>
							<h4>Wind Speed:</h4>
							<p>{this.state.currentWindSpeed} mph</p>
						</div>
						<div class={style.gridItem}>
							<h4>Rainfall:</h4>
							<p>{this.state.currentRainfall}mm</p>
						</div>
						<div class={style.gridItem}>
							<h4>Visibility:</h4>
							<p>{this.state.currentVisibility} mi</p>
						</div>
					</div>
				</Card>
				<Card>Tips g o here</Card>
			</div>
		);
	}
}
