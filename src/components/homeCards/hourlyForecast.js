import { h, render, Component } from "preact";
import style from "./style";
import APIClient from "../../lib/APIClient";
import Card from "../card";

export default class HourlyForecast extends Component {
	constructor(props) {
		super(props);

		// Fetches the next 3 days of forecast information
		APIClient.fetchForecastForLocation(3, this.props.loc).then((data) => {
			this.setState({
				forecast: data.forecast.forecastday,
				date: data.location.localtime,
				currentWeatherIcon: "https://".concat(data.current.condition.icon),
			});
		});
	}

	UpcomingForecasts() {
		if (!this.state.date) {
			return;
		}

		// Date formatting options
		const dateOptions = { hour: "2-digit", minute: "2-digit" };

		// Create array of divs to push to
		let divs = [];
		const maxToDisplay = 32;

		// Grab a list of all the 'hour' objects in our array only, and filter them to only include hours in the future
		const upcomingHours = this.state.forecast
			.flatMap((fd) => fd.hour)
			.filter((h) => new Date(h.time) > new Date());


		// For each of these hours, push a div with the relevant information
		for (let i = 0; i <= maxToDisplay; i++) {
			divs.push(
				<div className={style.row}>
					<h3>
						{new Date(upcomingHours[i].time).toLocaleTimeString(
							[],
							dateOptions
						)}
					</h3>
					<img src={`https://${upcomingHours[i].condition.icon}`} alt="error" />
				</div>
			);
		}

		return divs;
	}

	render() {
		return (
			<Card>
				{this.state.date && (
					<div class={style.horizontal}>
						<div class={style.row}>
							<h3>Now</h3>
							<img src={this.state.currentWeatherIcon} alt="error" />
						</div>

						{this.UpcomingForecasts()}
					</div>
				)}
			</Card>
		);
	}
}
