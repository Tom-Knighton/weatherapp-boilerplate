// import preact
import { h, render, Component } from "preact";
// import stylesheets for ipad & button
import style from "./style";
// import the Button component
import APIClient from "../../lib/APIClient";
import Card from "../card";
import {HourlyForecast,  UpcomingWeatherFeaturesCard } from "../homeCards";

export default class Iphone extends Component {
	//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props) {
		super(props);
		// temperature state

		// button display state
		this.setState({ display: true });

		APIClient.fetchWeatherForLocation("London").then((data) => {
			console.log("CURRENT",data);
			this.setState({date: data.location.localtime});
			this.setState({currentTemp: data.current.temp_c});
			this.setState({currentIcon: "https://".concat(data.current.condition.icon)});

		 });
		APIClient.fetchForecastForLocation("London", 10).then((data) => {
			console.log("FORECAST",data);
			this.setState({forecast: data.forecast.forecastday});

		});
		APIClient.searchForLocation("London").then((data) => { console.log("LOCATION",data); });
		APIClient.getAstronomyData("London").then((data) => { console.log("ASTRONOMY",data); });
		APIClient.getSportData("London").then((data) => { console.log("SPORTS",data); });

		APIClient.fetchWeatherForLocation("London").then((data) => {
			this.setState({
				currentCloud: data.current.cloud,
				currentWindSpeed: data.current.gust_mph,
				currentRainfall: data.current.precip_mm,
				currentVisibility: data.current.vis_miles
			});
		});
	}

	rainToday(){

		let twelveHourCount = 0;
		//starting from the current hour, grab the next twelve hours and report if and when the next rain will come.

		//grab the bit of the forecast we care about
		let todaysForecast = this.state.forecast[0];
		todaysForecast = todaysForecast.hour;
		console.log("FORECAST",todaysForecast);

		// figure out what time to start from

		let hour = (new Date()).getHours();

		let returnforecastHour = todaysForecast[hour];

		//let twelveHourCount = 0
		//starting from the current hour, grab the next twelve hours and report if and when the next rain will come.
		//
		let currentCondition = todaysForecast[hour].condition.text;
		for (let checkHour = hour; checkHour <= 23; checkHour ++){

			//console.log("loop", todaysForecast[checkHour] );
			let forecastHour = todaysForecast[checkHour];
			console.log("EQUALS",currentCondition,forecastHour.condition.text);
			if (currentCondition !== forecastHour.condition.text){
				if (twelveHourCount == 0 || twelveHourCount == 1){
					//rain within the hour
					return <p class = {style.rightRainForcast}>{forecastHour.condition.text} <br></br> 1 hour</p>;
				}
				return <p class = {style.rightRainForcast}> {forecastHour.condition.text}  {twelveHourCount} hours</p>;
			}

			if (twelveHourCount == 12){
				//The next twelve hours will be the same.
				return <p class = {style.rightRainForcast}>{currentCondition}  <br></br> All today</p>;
			}
			twelveHourCount ++;

		}
		for (let checkHour = 0; checkHour <= 12; checkHour++){
			//Check the remaining 12 hours for rain, searching the next day
			return "NOTYETDONE";


		}

	}




	// the main render method for the iphone component
	render() {
		// display all weather data
		return (
			<div class={style.container}>
				<Card>
				<div>
					<img src ={this.state.currentIcon} alt = "Image borked" class = {style.leftIcon}></img>
						<h1>{this.state.currentTemp}°C</h1>
						{this.state.forecast &&this.state.date && this.rainToday()}

				</div></Card>
				<UpcomingWeatherFeaturesCard/>
				<HourlyForecast/>
				<Card>Test 4</Card>
				<Card>Test 3</Card>
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
				<Card>Test 5</Card>
			</div>
		);
	}
}
