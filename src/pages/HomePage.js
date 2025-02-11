import { h, render, Component } from "preact";
import Card from "../components/card";
import {
	DetailedCard,
	HourlyForecast,
	TopCard,
	UpcomingWeatherFeaturesCard
} from "../components/homeCards";
import APIClient from "../lib/APIClient";
import style from "./style.less";
import Button from "../components/button";
import { route } from "preact-router";
import TipsCard from "../components/homeCards/tipsCard";

export default class HomePage extends Component {
	constructor(props) {
		super(props);

		// Sets locationName to loading just to inform user that operations are being completed
		this.setState({
			locationName: "Loading... "
		});

		// Gets the current location (or the one passed to the component if it exists), and sets the name and time as returned
		APIClient.getLocation(
			this.props.lat ? this.props.lat : null,
			this.props.lon ? this.props.lon : null
		).then((data) => {
			this.setState({
				locationName: data.name,
				locationTime: data.time
			});
		});

		// Gets the weather for the relevant location
		APIClient.fetchWeatherForLocation(this.getLocName()).then((data) => {
			data = data.current.condition.text;
			this.props.getWeather(data); // Calls the callback function from app.js
		});
	}

	// Gets the current time as HH:mm
	getTime() {
		if (!this.state.locationTime) { // If the api call has not returned yet, just return now and wait until later
			return null;
		}

		return new Date(this.state.locationTime).toLocaleTimeString([], {
			hour: "numeric",
			minute: "numeric",
			hour12: false
		});
	}

	// Returns a lat,lon string or null depending on if a lat and lon has been passed
	getLocName() {
		if (this.props.lat && this.props.lon) {
			return `${this.props.lat},${this.props.lon}`;
		}
		return null;
	}

	//update the time state
	updateTime() {
		APIClient.fetchWeatherForLocation(this.getLocName()).then((data) => {
			this.setState({
				locationTime: data.location.localtime
			});
		});
	}

	//creating the timer
	componentDidMount() {
	  this.interval = setInterval(() => {this.updateTime();}, 60*1000);
	}

	//removing the timer
	componentWillUnmount() {
	  clearInterval(this.interval);
	}

	render() {
		return (
			<div className={[style.app, this.props.lat ? "bg" : ""].join(" ")}>
				{this.props.lat && (<Button onClick={() => {history.go(-1);}}>Go Back</Button>)}
				<h1>
					{this.state.locationName}&nbsp;{this.getTime()}
				</h1>
				<TopCard loc={this.getLocName()} />
				<UpcomingWeatherFeaturesCard loc={this.getLocName()} />
				<HourlyForecast loc={this.getLocName()} />
				<DetailedCard loc={this.getLocName()} />
				{!this.props.lat && <TipsCard />}
			</div>
		);
	}
}
