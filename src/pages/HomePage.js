import { h, render, Component } from "preact";
import Card from "../components/card";
import {
	DetailedCard,
	HourlyForecast,
	TopCard,
	UpcomingWeatherFeaturesCard,
} from "../components/homeCards";
import APIClient from "../lib/APIClient";
import style from "./style.less";
import Button from "../components/Button";
import { route } from "preact-router";

export default class HomePage extends Component {
	constructor(props) {
		super(props);

		this.setState({
			locationName: "Loading... ",
		});

		APIClient.getLocation(
			this.props.lat ? this.props.lat : null,
			this.props.lon ? this.props.lon : null
		).then((data) => {
			console.log("Called location got " + data.name);
			this.setState({
				locationName: data.name,
				locationTime: data.time,
			});
		});
	}

	getTime() {
		if (!this.state.locationTime) {
			return null;
		}

		return new Date(this.state.locationTime).toLocaleTimeString([], {
			hour: "numeric",
			minute: "numeric",
			hour12: true,
		});
	}

	getLocName() {
		if (this.props.lat && this.props.lon) {
			return `${this.props.lat},${this.props.lon}`;
		}

		return null;
	}

	render() {
		return (
			<div class={style.app}>
				{this.props.lat && <Button onClick={() => { history.go(-1) }}>Go Back</Button> }
				<h1>
					{this.state.locationName} {this.getTime()}
				</h1>
				<TopCard loc={this.getLocName()}/>
				<UpcomingWeatherFeaturesCard loc={this.getLocName()}/>
				<HourlyForecast loc={this.getLocName()}/>
				<DetailedCard loc={this.getLocName()}/>
				{ !this.props.lat && <Card>Tips go here</Card> }
			</div>
		);
	}
}
