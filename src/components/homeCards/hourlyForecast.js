import { h, render, Component } from "preact";
import style from "./style";
import APIClient from "../../lib/APIClient";
import Card from "../card";

export default class HourlyForecast extends Component {
	constructor(props) {
		super(props);

		APIClient.fetchForecastForLocation("London").then((data) => {
            
			this.setState({
				
				
                
				icon2: data.forecast.forecastday[0],
                icon3: "https://".concat(data.forecast.forecastday[0].hour[2].condition.icon),
                icon4: "https://".concat(data.forecast.forecastday[0].hour[3].condition.icon),
				icon5: "https://".concat(data.forecast.forecastday[0].hour[4].condition.icon),
                time2: data.forecast.forecastday[0].hour[1].time,
                time3: data.forecast.forecastday[0].hour[3].time,

                
			})
		});

        APIClient.fetchWeatherForLocation("London").then((data) => {
			
			this.setState({date: data.location.localtime})
			this.setState({currentTemp: data.current.temp_c});
			this.setState({currentWeatherIcon: "https://".concat(data.current.condition.icon)})

		 });
    }

    //returns future hours
    theHour(toAdd){

        let dayTimeArray = this.state.date;
		dayTimeArray = dayTimeArray.split(" ");

		let hour = dayTimeArray[1];
		let hourArray = hour.split(":");
		hour = parseInt(hourArray[0]) + toAdd;



		if (hour > 12 && hour < 24){
            
            return <h3>{hour-12}pm</h3>;

		}
        
        if (hour == 0){
            return <h3>{12}am</h3>;

        }
        if (hour == 12){
            return <h3>{hour}pm</h3>;

        }
        if (hour < 12){
            
            return <h3>{hour}am</h3>;

		}
        return <h3>{hour-24}am</h3>;
        
    }



    //returns hour for appropriate icon
    hourForIcon(toAdd){

        let dayTimeArray = this.state.date;
		dayTimeArray = dayTimeArray.split(" ");

		let hour = dayTimeArray[1];
		let hourArray = hour.split(":");
		hour = parseInt(hourArray[0]) + toAdd;

        //greater than 24 means next day: to do
        if (hour > 24){
            
            return hour-12;

		}
        
       
        return hour

    }
    //greater than 24 means next day: to do
    theIcon(toAdd){
        let number = this.hourForIcon(toAdd)
        
        return <img src ={"https://".concat(this.state.icon2.hour[number].condition.icon)} alt = "error" ></img>;
    }


        render() {
            return (
                <Card>
                    
                    <div class={style.container}>
                        
                        <div class={style.row}>
                            <h3>Now</h3>
                            <img src ={this.state.currentWeatherIcon} alt = "error"></img>
                        </div>

                        <div class={style.row}>
                            {this.state.date && this.theHour(1)}
                            {this.state.icon2 && this.theIcon(1)}
                        </div>

                        <div class={style.row}>
                            {this.state.date && this.theHour(2)}
                            {this.state.icon2 && this.theIcon(2)}
                        </div>

                        <div class={style.row}>
                            {this.state.date && this.theHour(3)}
                            {this.state.icon2 && this.theIcon(3)}
                        </div>

                        <div class={style.row}>
                            {this.state.date && this.theHour(4)}
                            {this.state.icon2 && this.theIcon(4)}
                        </div>
                    </div>
                    
                </Card>
            );
        }


}



   