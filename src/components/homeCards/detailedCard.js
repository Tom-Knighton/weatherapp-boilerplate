import { h, render, Component } from "preact";
import style from "./style";
import APIClient from "../../lib/APIClient";
import Card from "../card";

export default class detailedCard extends Component {
	constructor(props) {
		super(props);

		APIClient.fetchWeatherForLocation(this.props.loc).then((data) => {
			this.setState({
				currentCloud: data.current.cloud,
				currentWindSpeed: data.current.gust_mph,
				currentRainfall: data.current.precip_mm,
				currentVisibility: data.current.vis_miles
			});
		});
	}

	render() {
		return (
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
		);
	}
}
