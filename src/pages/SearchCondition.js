import { h, render, Component } from "preact";
import { route } from "preact-router";
import Card from "../components/card";
import style from "./style.less";
import APIClient from "../lib/APIClient";
export class SearchCondition extends Component {

	constructor(props) {
		super(props);
		// Page needs to store, the weather the person wants to search for
		// The day the person wants to search for
		// A list of the searchResults.

		this.state = {
			weather: "default"
		};
		this.state = {
			day: new Date()
		};
		this.state = {
			searchList: []
		};

		this.onChangeValue = this.onChangeValue.bind(this);

		this.onChangeValue2 = this.onChangeValue2.bind(this);

		//An call to the client to grab the weather forecast for 3 days ahea, limited because of the license used.
		APIClient.fetchForecastForLocation(7).then((data) => {
			this.setState({
				forecast: data.forecast
			});
		});

	}
	//The events that grab the users choice of weather and date. Date is checked to see if the day can be searched for in the forecast from the APIClient
	onChangeValue(event) {
		//
		this.setState({weather: event.target.value});
	}

	onChangeValue2(event) {
		//
		this.setState({day: event.target.value});


	}

	searchFunc(){
		// searchFunction, changes searchList to contain the searchResults, which is called in the render function to display the results.
		let current = new Date();
		let maxDate = new Date();
		maxDate.setDate(current.getDate() + 3);
		let stateDate = new Date(this.state.day);

		if (stateDate.getTime() > maxDate.getTime() || stateDate.getTime() < current.getTime()){
			alert('Invalid Date! Search is limited to 3 days because of the API license.');
			return false;
		}

		let chosenWeather = this.state.weather;
		this.state.searchList = [];
		this.state.successfulSearch = true;
		function matchWeather(weather,match){
			//Takes the chosenWeather from the user, and figures out which conditions need to be searched for.
			//To change, add a new key called the weather condtion to look for, and the value as a list of the substituted weather conditions.
			let weatherDic = {
				"Clear": ["Sunny", "Clear"],
				"Cloudy": ["Partly cloudy", "Cloudy", "Overcast"],
				"Snow":  ["Blowing snow","Patchy light snow","Light snow","Patchy moderate snow","Moderate snow","Patchy heavy snow","Heavy snow","Light snow showers",
					"Moderate or heavy snow showers","Patchy light snow with thunder","Moderate or heavy snow with thunder", "Blizzard"],
				"Rain":["Patchy rain possible","Patchy light rain with thunder","Light rain shower"],
				"Lightning" :  ["Thundery outbreaks possible","Patchy light snow with thunder","Moderate or heavy snow with thunder","Patchy light rain with thunder","Moderate or heavy rain with thunder"],
				"Foggy" : ["Fog", "Mist"]
			};

			for (let i = 0; i < weatherDic[weather].length; i++){
				if (match == weatherDic[weather][i]){
					return true;
				}
			}
			return false;
		}

		let chosenDay = this.state.day;
		let forecast = this.state.forecast.forecastday;
		let toListHour = [];

		// Search Logic is as follows
		/*
        Grab the entire forecast, filter by weather and date
        If a date was chosen, Take that days forecast only.
        If not, continue with every day.

          If there is a weather chosen, take hours where that weather is predicted
          If not; take every hour of that chosen day

      */

		for (let index = 0; index < forecast.length;index ++){
			if (!(chosenDay == null || chosenDay == '')){
				if (chosenDay != forecast[index].date){
					continue;
				}
			}

			if (chosenWeather != null){
				//If filtering by Weather
				for (let hour = 0; hour <= 23; hour++) {
					if (matchWeather(chosenWeather,forecast[index].hour[hour].condition.text)){
						let htmlCrate = forecast[index].hour[hour];
						//htmlCrate is a single hour, extract all data needed, time, condition, icon, and wrap in appropriate weather object.
						toListHour = toListHour.concat(htmlCrate);
					}
				}
			} else {
				//Not filtering by hours weather, append All hours of that day
				let htmlCrate = forecast[index].hour;
				toListHour = toListHour.concat(htmlCrate);
			}
		}

		//Checks if there are no search results.
		if (toListHour.length == 0){
			this.state.successfulSearch = false;
			this.forceUpdate();
		}
		else {
			this.state.searchList = toListHour;
			this.forceUpdate();
		}

	}


	render() {
		return (
			<div class={style.app}>
				<div class={style.inputFields} id = 'SearchConditionSearch'>
					<header>
						<h3>Search by Weather and Day</h3>
					</header>
					<hr/>
					<h4>Weather</h4>
					<div onChange={this.onChangeValue}>
						<div class = {style.parentRadio}>
							<div class = {style.childRadio}>
								<input type="radio" value="Clear" name="weather" /> Clear
								<br/>
								<input type="radio" value="Cloudy" name="weather" /> Cloudy
								<br/>
								<input type="radio" value="Snow" name="weather" /> Snow
							</div>
							<div class = {style.childRadio}>
								<input type="radio" value="Rain" name="weather" /> Rain
								<br/>
								<input type="radio" value="Lightning" name="weather" /> Lightning
								<br/>
								<input type="radio" value="Foggy" name="weather" /> Foggy

							</div>
						</div>
					</div>
					<h4>Day</h4>
					<div onChange={this.onChangeValue2}>
						<input type="date" id="start" name="selected-day" min="2022-01-01" max="2022-12-31"/>
					</div>
					<p></p>
					<button class={style.button && style.button1} onClick={() => {this.searchFunc();}}>Search</button>
				</div>
				<div id = "searchList"> {
					this.state.successfulSearch ?
						this.state.searchList.map((hour) => (
							<Card> { hour.time.split("-")[2].split(" ")[0]}/{parseInt(hour.time.split("-")[1])} {hour.condition.text}  { hour.time.split(" ")[1]} </Card>
						))
						: <Card>No search results --:-- </Card>}
				</div>
			</div>
		);
	}
}
