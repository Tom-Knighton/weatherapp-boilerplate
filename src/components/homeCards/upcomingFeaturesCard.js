import { h, render, Component } from "preact";
import style from "./style";
import APIClient from "../../lib/APIClient";
import Card from "../card";

export default class UpcomingWeatherFeaturesCard extends Component {
	constructor(props) {
		super(props);

		APIClient.fetchForecastForLocation("London", 2).then((data) => {
			this.setState({
				forecast: data.forecast,
				currentWeather: data.current,
				astro: data.forecast.forecastday[0].astro,
				date: data.forecast.forecastday[0].date,
			});
		});
	}

	getUpcomingFeatures() {
		if (!this.state.forecast || !this.state.astro) {
			return []; // If data is somehow null, return
		}

		let features = [];

		// Adding basic sunset/sunrise data
		features.push({
			date: new Date(`${this.state.date} ${this.state.astro.sunrise}`),
			name: "Sunrise",
		});
		features.push({
			date: new Date(`${this.state.date} ${this.state.astro.sunset}`),
			name: "Sunset",
		});

		// Calculating golden hours data by subtracting one hour from sunrise/sunset, and adding to features
		let riseGoldenHourDate = new Date(
			`${this.state.date} ${this.state.astro.sunrise}`
		);
		riseGoldenHourDate.setHours(riseGoldenHourDate.getHours() - 1);
		features.push({ date: riseGoldenHourDate, name: "Golden Hour" });

		let setGoldenHourDate = new Date(
			`${this.state.date} ${this.state.astro.sunset}`
		);
		setGoldenHourDate.setHours(setGoldenHourDate.getHours() - 1);
		features.push({ date: setGoldenHourDate, name: "Golden Hour" });

		// Adds all upcoming weather conditions that are not the same as current conditions
		let hasSeenDifferentWeather = false;
		this.state.forecast.forecastday.map((forecastDay) => {
			forecastDay.hour.map((forecast) => {
				const forecastDate = new Date(forecast.time);
				if (forecastDate < new Date()) {
					return; // Ignore all forecast data before current time
				}
				if (
					!hasSeenDifferentWeather &&
					forecast.condition.code === this.state.currentWeather.condition.code
				) {
                    hasSeenDifferentWeather = true;
					return; // Ignore all forecast data that is the same as our current conditions, if we haven't seen any different yet
				}

				features.push({ date: forecastDate, name: forecast.condition.text });
			});
		});

		features = features.filter((f) => f.date >= new Date()); // Remove golden hours/sunsets etc. that are in past
		features = features.sort((a, b) => a.date - b.date); // Sort the entire array by date

		// Create a new array, removing any elements of the features array that are the same as the next element
		// I.e. if there are two 'features' next to eachother that are both 'sunny', we only take the first one and remove the second
		let result = [];
		for (let i = 0; i < features.length - 1; ++i) {
			if (features[i].name === features[i + 1].name) {
				continue;
			}
			result.push(features[i]);
		}

		// Return the first 4 features
		return result.slice(0, 4);
	}

	getMinsBetween(date1, date2) {
		const diff = Math.abs(date1 - date2);
		return Math.floor(diff / 1000 / 60);
	}

	getDateString(feature) {
		const dateOptions = { hour: "2-digit", minute: "2-digit" };

		if (feature.name === "Golden Hour") {
			return ` from ${feature.date.toLocaleTimeString([], dateOptions)}`;
		}

		const minsBetween = this.getMinsBetween(feature.date, new Date());
		switch (true) {
			case minsBetween >= 0 && minsBetween <= 60:
				return " in the next hour";
			case minsBetween > 60 && minsBetween <= 120:
				return " in the next 2 hours";
			default:
				return ` at ${feature.date.toLocaleTimeString([], dateOptions)}`;
		}
	}

	render() {
		return (
			<Card>
				<div class={style.container}>
					<h3>Upcoming Weather Features: </h3>
					<div class={style.upcomingList}>
						{this.getUpcomingFeatures().map((feature) => (
							<span>
								<strong>{feature.name}</strong>
								{this.getDateString(feature)}
							</span>
						))}
					</div>
				</div>
			</Card>
		);
	}
}
