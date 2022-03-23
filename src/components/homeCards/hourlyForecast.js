import { h, render, Component } from "preact";
import style from "./style";
import APIClient from "../../lib/APIClient";
import Card from "../card";

export default class HourlyForecast extends Component {
	constructor(props) {
		super(props);

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

		const dateOptions = { hour: "2-digit", minute: "2-digit" };

		let divs = [];
		const maxToDisplay = 32;
		const upcomingHours = this.state.forecast
			.flatMap((fd) => fd.hour)
			.filter((h) => new Date(h.time) > new Date());
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
