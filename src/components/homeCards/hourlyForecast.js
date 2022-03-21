import { h, render, Component } from "preact";
import style from "./style";
import APIClient from "../../lib/APIClient";
import Card from "../card";

export default class HourlyForecast extends Component {
	constructor(props) {
		super(props);

		APIClient.fetchForecastForLocation(3, this.props.loc).then((data) => {
			this.setState({
				icon2: data.forecast.forecastday[0],
				nextDayIcon: data.forecast.forecastday[1]
			});
		});

		APIClient.fetchWeatherForLocation().then((data) => {
			this.setState({ date: data.location.localtime });
			this.setState({
				currentWeatherIcon: "https://".concat(data.current.condition.icon)
			});
		});
	}

	//returns future hours
	theHour(toAdd) {
		let thisHour = new Date().getHours() + toAdd;
		thisHour = thisHour%24;
		if (thisHour === 24 || thisHour === 0) {
			return <h3>{12}am</h3>;
		}
		if (thisHour === 12) {
			return <h3>{thisHour}pm</h3>;
		}
		if (thisHour > 12 && thisHour < 24) {
			return <h3>{thisHour - 12}pm</h3>;
		}
		if (thisHour < 12) {
			return <h3>{thisHour}am</h3>;
		}
		return <h3>{thisHour - 24}am</h3>;
	}

	//greater than 24 means next day
	theIcon(toAdd) {
		let number = new Date().getHours() + toAdd;
		if (number >= 24) {
			number = number - 24;
			if (!this.state.nextDayIcon.hour[number]) {
				return;
			}
			if (!this.state.icon2.hour[number]) {
				return;
			}
			return (
				<img src={"https://".concat(this.state.nextDayIcon.hour[number].condition.icon)} alt="error"/>
			);
		}

		if (!this.state.nextDayIcon.hour[number]) {
			return;
		}
		if (!this.state.icon2.hour[number]) {
			return;
		}

		return (
			<img src={"https://".concat(this.state.icon2.hour[number].condition.icon)} alt="error"/>
		);
	}

	DynamicHourly() {
		// add the html to an array (divs) that then gets added to the card
		let divs = [];
		const time = new Date().getHours();
		// if it's 8 or later display the next day's hourly forecast
		// for some reason midnight next day doesnt appear so I'll just not show midnight
		const stop = ((time > 19) ? ((24-time)+23) : 24-time);
		for (let i=1; i <= stop; i++) {
			divs.push(
				<div className={style.row}>
					{this.state.date && this.theHour(i)}
					{(this.state.icon2 || this.state.nextDayIcon) && this.theIcon(i)}
				</div>
			);
		}
		return divs;
	}

	render() {
		return (
			<Card>
				{(this.state.icon2 && this.state.nextDayIcon) && (
					<div class={style.horizontal}>
						<div class={style.row}>
							<h3>Now</h3>
							<img src={this.state.currentWeatherIcon} alt="error"/>
						</div>

						{this.DynamicHourly()}

					</div>
				)}
				{/*
					<h1>Original</h1>
					{(this.state.icon2 && this.state.nextDayIcon) && (
						<div class={style.horizontal}>
							<div class={style.row}>
								<h3>Now</h3>
								<img src={this.state.currentWeatherIcon} alt="error"/>
							</div>
							<div className={style.row}>
								{this.state.date && this.theHour(1)}
								{(this.state.icon2 || this.state.nextDayIcon) && this.theIcon(1)}
							</div>
							<div className={style.row}>
								{this.state.date && this.theHour(2)}
								{(this.state.icon2 || this.state.nextDayIcon) && this.theIcon(2)}
							</div>
							<div className={style.row}>
								{this.state.date && this.theHour(3)}
								{(this.state.icon2 || this.state.nextDayIcon) && this.theIcon(3)}
							</div>
							<div className={style.row}>
								{this.state.date && this.theHour(4)}
								{(this.state.icon2 || this.state.nextDayIcon) && this.theIcon(4)}
							</div>
						</div>
					)}
				*/}
			</Card>
		);
	}
}
