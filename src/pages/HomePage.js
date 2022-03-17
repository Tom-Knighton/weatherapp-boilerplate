import { h, render, Component } from "preact";
import Card from "../components/card";
import { DetailedCard, HourlyForecast, TopCard, UpcomingWeatherFeaturesCard } from "../components/homeCards";
import APIClient from "../lib/APIClient";
import style from "./style.less";

export default class HomePage extends Component {

    constructor(props) {
		super(props);

		this.setState({
			locationName: "Loading... ",
		});

		APIClient.getLocation().then((data) => {
			this.setState({
				locationName: data.name,
			});
		});
	}

	render() {
		return (
			<div class={style.app} >
				<h1>
					{this.state.locationName}{" "}
					{new Date().toLocaleTimeString([], {
						hour: "numeric",
						minute: "numeric",
						hour12: true,
					})}
				</h1>
				<TopCard />
				<UpcomingWeatherFeaturesCard />
				<HourlyForecast />
				<DetailedCard />
				<Card>Tips go here</Card>
			</div>
		);
	}
}
