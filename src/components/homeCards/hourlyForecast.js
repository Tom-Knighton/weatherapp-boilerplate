import { h, render, Component } from "preact";
import style from "./style";
import APIClient from "../../lib/APIClient";
import Card from "../card";

export default class HourlyForecast extends Component {
	constructor(props) {
		super(props);

		APIClient.fetchForecastForLocation().then((data) => {
			this.setState({
				icon2: data.forecast.forecastday[0],
				icon3: "https://".concat(
					data.forecast.forecastday[0].hour[2].condition.icon
				),
				icon4: "https://".concat(
					data.forecast.forecastday[0].hour[3].condition.icon
				),
				icon5: "https://".concat(
					data.forecast.forecastday[0].hour[4].condition.icon
				),
				time2: data.forecast.forecastday[0].hour[1].time,
				time3: data.forecast.forecastday[0].hour[3].time,
			});
		});

		APIClient.fetchWeatherForLocation().then((data) => {
			this.setState({ date: data.location.localtime });
			this.setState({
				currentWeatherIcon: "https://".concat(data.current.condition.icon),
			});
		});
	}

	//returns future hours
	theHour(toAdd) {
		const hour = (new Date()).getHours();
		let thisHour = hour
		thisHour = hour + toAdd

		if (thisHour > 12 && thisHour < 24) {
			return <h3>{thisHour - 12}pm</h3>;
		}

		if (thisHour == 0) {
			return <h3>{12}am</h3>;
		}
		if (thisHour == 12) {
			return <h3>{thisHour}pm</h3>;
		}
		if (thisHour < 12) {
			return <h3>{thisHour}am</h3>;
		}
		return <h3>{thisHour - 24}am</h3>;
	}

	//returns hour for appropriate icon
	hourForIcon(toAdd) {

		const hour = new Date().getHours();
		let thisHour = hour
		thisHour = hour + toAdd

		//greater than 24 means next day: to do
		if (thisHour > 24) {
			return thisHour - 12;
		}

		return thisHour;
	}
	//greater than 24 means next day: to do
	theIcon(toAdd) {

        let number = this.hourForIcon(toAdd);

        if (!this.state.icon2.hour[number]) {
            return;
        }


		return (
			<img
				src={"https://".concat(this.state.icon2.hour[number].condition.icon)}
				alt="error"
			></img>
		);
	}

	render() {
		return (
			<Card>
				{this.state.icon2 && (
					<div class={style.horizontal}>
						<div class={style.row}>
							<h3>Now</h3>
							<img src={this.state.currentWeatherIcon} alt="error"></img>
						</div>

						<div class={style.row}>
							{this.state.date && this.theHour(1)}
							{this.state.icon2 && this.theIcon(1)}
						</div>

						<div class={style.row}>
							{this.state.date && this.theHour(2)}
							{this.state.icon2 && this.theIcon(2)}
						</div>

						<div class={style.row}>
							{this.state.date && this.theHour(3)}
							{this.state.icon2 && this.theIcon(3)}
						</div>

						<div class={style.row}>
							{this.state.date && this.theHour(4)}
							{this.state.icon2 && this.theIcon(4)}
						</div>
					</div>
				)}
			</Card>
		);
	}
}
