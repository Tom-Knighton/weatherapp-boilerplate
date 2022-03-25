import { h, render, Component } from "preact";
import style from "./style";
import APIClient from "../../lib/APIClient";
import Card from "../card";

export default class TopCard extends Component {
	constructor(props) {
		/*Top card of start up page displays:
			Image representing current condition: pulled directly from APIClient
			Current temperature
			A prediction for the next change in weather
		*/

		super(props);
		APIClient.fetchWeatherForLocation(this.props.loc).then((data) => {
			this.setState({
				currentTemp: data.current.temp_c,
				currentIcon: `https://${data.current.condition.icon}`
			});

			APIClient.fetchForecastForLocation(10, this.props.loc).then((data) => {
				this.setState({
					forecast: data.forecast.forecastday
				});
			});
		});
	}

	rainToday() {
		//Function purpose: Caculates the next change in weather, and returns what it will change too, and how long until that happens.
		//Returns an html object containing this information

		if (!this.state.forecast) {
			return;
		}

		let twelveHourCount = 0;
		//starting from the current hour, grab the next twelve hours and report if and when the next rain will come.

		//grab the bits of the forecast we care about, the list of weather predictions by hour for the day.
		let todaysForecast = this.state.forecast[0];
		todaysForecast = todaysForecast.hour;

		let tomorrowsForecast = this.state.forecast[1];
		tomorrowsForecast = tomorrowsForecast.hour;

		// figure out what time to start from
		let hour = new Date().getHours();
		//starting from the current hour, grab the next twelve hours and report if and when the next rain will come.
		//
		let currentCondition = todaysForecast[hour].condition.text;
		for (let checkHour = hour; checkHour <= 32; checkHour++) {
			let forecastHour;

			if (checkHour > 23){
				forecastHour = tomorrowsForecast[checkHour-24];
			}
			else {
				forecastHour = todaysForecast[checkHour];
			}

			if (currentCondition !== forecastHour.condition.text) {
				if (twelveHourCount == 0 || twelveHourCount == 1) {
					//weather change within the hour
					return (
						<p class={style.rightRainForcast}>
							In 1 hour: <br/>
							{forecastHour.condition.text}
						</p>
					);
				}
				return (
					<p class={style.rightRainForcast}>
						Coming up in {twelveHourCount} hours: <br/>
						{forecastHour.condition.text}
					</p>
				);
			}

			if (twelveHourCount == 12) {
				//The next twelve hours will be the same.
				return (
					<p class={style.rightRainForcast}>
						{currentCondition} <br/> All today
					</p>
				);
			}

			twelveHourCount++;
		}
	}

	render(){
		return (
			<Card>
				<div Class={style.topCard}>
					<img src={this.state.currentIcon} alt="Image borked" Class={style.leftIcon}/>
					<h1>{this.state.currentTemp}°C</h1>
					<div>
						{this.state.forecast && this.rainToday()}
					</div>
				</div>
			</Card>);

	}

}
