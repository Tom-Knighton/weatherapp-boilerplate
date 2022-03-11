import { h, render, Component } from "preact";
import style from "./style";
import APIClient from "../../lib/APIClient";
import Card from "../card";

export default class TopCard extends Component {
	constructor(props) {
		super(props);

    APIClient.fetchWeatherForLocation().then((data) => {
      this.setState({
        currentTemp: data.current.temp_c,
        currentIcon: `https://${data.current.condition.icon}`,
      });

      APIClient.fetchForecastForLocation(10).then((data) => {
        this.setState({
          forecast: data.forecast.forecastday
        });

      });
    });
  }

  rainToday() {

    if (!this.state.forecast) {
      return;
    }

    let twelveHourCount = 0;
    //starting from the current hour, grab the next twelve hours and report if and when the next rain will come.

    //grab the bit of the forecast we care about
    let todaysForecast = this.state.forecast[0];
    todaysForecast = todaysForecast.hour;

    // figure out what time to start from

    let hour = new Date().getHours();

    let returnforecastHour = todaysForecast[hour];

    //let twelveHourCount = 0
    //starting from the current hour, grab the next twelve hours and report if and when the next rain will come.
    //
    let currentCondition = todaysForecast[hour].condition.text;
    for (let checkHour = hour; checkHour <= 23; checkHour++) {
      //console.log("loop", todaysForecast[checkHour] );
      let forecastHour = todaysForecast[checkHour];
      if (currentCondition !== forecastHour.condition.text) {
        if (twelveHourCount == 0 || twelveHourCount == 1) {
          //rain within the hour
          return (
            <p class={style.rightRainForcast}>
              {forecastHour.condition.text} <br></br> 1 hour
            </p>
          );
        }
        return (
          <p class={style.rightRainForcast}>
            {" "}
            {forecastHour.condition.text}  <br></br>  {twelveHourCount} hours
          </p>
        );
      }

      if (twelveHourCount == 12) {
        //The next twelve hours will be the same.
        return (
          <p class={style.rightRainForcast}>
            {currentCondition} <br></br> All today
          </p>
        );
      }
      twelveHourCount++;
    }
    for (let checkHour = 0; checkHour <= 12; checkHour++) {
      //Check the remaining 12 hours for rain, searching the next day
      return "NOTYETDONE";
    }
  }



  render(){
    return (
    <Card>
      <div>

        <img
          src={this.state.currentIcon}
          alt="Image borked"
          class={style.leftIcon}
        ></img>
        <h1>{this.state.currentTemp}°C</h1>
        {this.state.forecast && this.rainToday()}
      </div>
    </Card>);

  }

}
