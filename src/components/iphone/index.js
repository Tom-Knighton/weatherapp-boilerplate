// import preact
import { h, render, Component } from "preact";
// import stylesheets for ipad & button
import style from "./style";
// import the Button component
import APIClient from "../../lib/APIClient";
import Card from "../card";

export default class Iphone extends Component {
	//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props) {
		super(props);
		// temperature state

		// button display state
		this.setState({ display: true });

		APIClient.fetchWeatherForLocation("London").then((data) => {
			this.setState({date: data.location.localtime})
			this.setState({currentTemp: data.current.temp_c});
			this.setState({currentIcon: "https://".concat(data.current.condition.icon)})

		 });
		APIClient.fetchForecastForLocation("London", 10).then((data) => {
			console.log("TYPE",typeof(data))
			this.setState({forecast: data.forecast.forecastday})

		});
		APIClient.searchForLocation("London").then((data) => { console.log(data); });
		APIClient.getAstronomyData("London").then((data) => { console.log(data); });
		APIClient.getSportData("London").then((data) => { console.log(data); });
	}

	rainToday(){
			//grab the bit of the forecast we care about
			console.log(this.state.forecast, typeof(this.state.forecast))

			let tempy = Object.entries(this.state.forecast)
			console.log("T",tempy)
			let todaysForecast = tempy[0];



			todaysForecast = todaysForecast.hour;
			console.log("FORECAST",todaysForecast);

					// split day and time of now.
			let nowDayTimeArray = this.state.date;
			nowDayTimeArray = nowDayTimeArray.split(" ");

			let hour = nowDayTimeArray[1];
			hour = hour.split(":");
			hour = hour[0];
			if (parseInt(hour) + 12 > 23){
					console.log("Need to check next day as well");

			}

			hour = 0;

			let twelveHourCount = 0
			//starting from the current hour, grab the next twelve hours and report if and when the next rain will come.
			//
			for (let checkHour = hour; checkHour <= 23; checkHour ++){

				//console.log("loop", todaysForecast[checkHour] );
				let forecastHour = todaysForecast[checkHour];
				if (forecastHour.will_it_rain){
					if (twelveHourCount == 0){
						//rain within the hour
						return <p class = {style.rightRainForcast}>Rain within 1 hour</p>;
					}
				return <p class = {style.rightRainForcast}>Rain will arrive in {twelveHourCount} hours</p>;
				}

				if (twelveHourCount == 12){
					return <p class = {style.rightRainForcast}>No rain expected in the next 12 hours</p>;
				}
				twelveHourCount ++;

			}
			for (let checkHour = 0; checkHour <= 12; checkHour++){
				//Check the remaining 12 hours for rain, searching the next day
				return "NOTYETDONE"


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
						{this.rainToday()}

				</div></Card>
				<Card>Test 2</Card>
				<Card>Test 3</Card>
				<Card>Test 4</Card>
				<Card>Test 5</Card>
			</div>
		);
	}
}
