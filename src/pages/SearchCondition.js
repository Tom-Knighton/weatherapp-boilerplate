import { h, render, Component } from "preact";
import { route } from "preact-router";
import Card from "../components/card";
import style from "./style.less";
import APIClient from "../lib/APIClient";
export class SearchCondition extends Component {

    constructor(props) {
        super(props);

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


        APIClient.fetchForecastForLocation(7).then((data) => {
          this.setState({
            forecast: data.forecast,

          });
        });

    }

    onChangeValue(event) {
        //console.log(event.target.value);
        this.setState({weather: event.target.value});
    }

    onChangeValue2(event) {
        //console.log(event.target.value);

        this.setState({day: event.target.value});

        let current = new Date();
        let maxDate = new Date();
        maxDate.setDate(current.getDate() + 2)

        //let currentDateString = `"${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}"`;
        //let maxDateString = `"${current.getFullYear()}-${current.getMonth()+1}-${current.getDate() + 7}"`;



        let stateDate = new Date(this.state.day)

        if(stateDate.getTime() > maxDate.getTime() || stateDate.getTime() < current.getTime()){
            alert('Invalid Date! Search is limited to 3 days because of the API license.');
        }

    }





    searchFunc(){
      let chosenWeather = this.state.weather
      this.state.searchList = []
      console.log("LISTB",this.state.searchList)
      function matchWeather(weather,match){
        //Takes the chosenWeather from the user, and figures out which conditions need to be searched for.
        //To change, add a new key called the weather condtion to look for, and the value as a list of the substituted weather conditions.

        let weatherDic = {
        "Sunny": ["Sunny"],
        "Thunderstorm":  ["Thundery outbreaks possible","Patchy light snow with thunder","Moderate or heavy snow with thunder","Patchy light rain with thunder","Moderate or heavy rain with thunder"],
        "Clear Sky": ["Clear"],
        "Snow":  ["Blowing snow","Patchy light snow","Light snow","Patchy moderate snow","Moderate snow","Patchy heavy snow","Heavy snow","Light snow showers",
      "Moderate or heavy snow showers","Patchy light snow with thunder","Moderate or heavy snow with thunder"],
        "Light Showers":  ["Patchy rain possible","Patchy light rain with thunder","Light rain shower"]
        }

        for (let i = 0; i < weatherDic[weather].length; i++){
          if (match == weatherDic[weather][i]){
            return true
          }
        }
        return false
      }

      let chosenDay = this.state.day
      //Grab 7 day forecast, or a chosn day is there is one, filter by chosenWeather.

      //This section should be in an if, it should only trigger if a day was not chosen, otherwise, forecast becomes
      // forecastday of that date.
      let forecast = this.state.forecast.forecastday;
      console.log(forecast,chosenDay)
      let toListHour = []
      for (let index = 0; index < forecast.length;index ++){
        if (!(chosenDay == null || chosenDay == '')){
          if (chosenDay != forecast[index].date){
            continue
          }
        }

        if (chosenWeather != null){
          //If filtering by Weather
          for (let hour = 0; hour <= 23; hour++) {
              if (matchWeather(chosenWeather,forecast[index].hour[hour].condition.text)){
                let htmlCrate = ''+ forecast[index].hour[hour]
                //htmlCrate is a single hour, extract all data needed, time, condition, icon, and wrap in appropriate weather object.
                toListHour = toListHour.concat(htmlCrate)
              }
          }



      } else {
        //Not filtering by hours weather, append All hours of that day
        let htmlCrate = ''+ forecast[index].hour
        //htmlCrate needs to be unwraped into all hours in this branch.
        //then extract all data needed, time, condition, icon, and wrap in appropriate weather object.
        toListHour = toListHour.concat(htmlCrate)
      }
    }
    console.log(toListHour)
    if (toListHour.length == 0){
      this.state.searchList =  ["Why wont this work"];
      console.log("NON",this.state.searchList )
      this.forceUpdate()

    }
    else{
      this.state.searchList = toListHour
      console.log("Fill",this.state.searchList )
      this.forceUpdate()
    }

  }


    render() {
        return (
            <div class={style.app}>
                <header>
                <h3>Search by Weather and Day</h3>
                </header>
                <div class={style.inputFields}>
                <h4>Weather</h4>

                <div onChange={this.onChangeValue}>
                <input type="radio" value="Sunny" name="weather" /> Sunny
                <p></p>
                <input type="radio" value="Thunderstorm" name="weather" /> Thunderstorm
                <p></p>
                <input type="radio" value="Clear Sky" name="weather" /> Clear Night Sky
                <p></p>
                <input type="radio" value="Snow" name="weather" /> Snow
                <p></p>
                <input type="radio" value="Light Showers" name="weather" /> Light Showers
                <p></p>

                </div>


                <h4>Day</h4>
                <div onChange={this.onChangeValue2}>
                <input type="date" id="start" name="selected-day"

                        min="2022-01-01" max="2022-12-31"></input>
                </div>
                </div>

                <button class={style.button && style.button1} onClick={() => {this.searchFunc()}}>Search</button>

                <ul id = "searchList">{this.state.searchList.map((hour) => (<li>{hour}</li>))}</ul>
            </div>
        );
    }

}
