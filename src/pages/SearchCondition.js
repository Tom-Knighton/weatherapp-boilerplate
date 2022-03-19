import { h, render, Component } from "preact";
import { route } from "preact-router";
import Card from "../components/card";
import style from "./style.less";

export class SearchCondition extends Component {

    constructor(props) {
        super(props);

        this.state = {
            weather: "default"
            };
        this.state = {
            day: new Date()
            };    

        this.onChangeValue = this.onChangeValue.bind(this);

        this.onChangeValue2 = this.onChangeValue2.bind(this);
        
    }

    onChangeValue(event) {
        //console.log(event.target.value);
        this.setState({weather: event.target.value});
       
    }

    onChangeValue2(event) {
        //console.log(event.target.value);
        
        this.setState({day: event.target.value});
    }

    
   
     
        
    

    test(){

        return <h3>{this.state.weather}</h3>
    }
    test2(){

        return <h3>{this.state.day}</h3>
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
                <input type="radio" value="Clear Sky" name="weather" /> Clear Sky
                <p></p>
                <input type="radio" value="Snow" name="weather" /> Snow
                <p></p>
                <input type="radio" value="Light Showers" name="weather" /> Light Showers
                <p></p>
                 
                </div>
                {this.state.weather && this.test()}
                <p></p>

                <h4>Day</h4>
                <div onChange={this.onChangeValue2}>
                <input type="date" id="start" name="selected-day"
                        
                        min="2022-01-01" max="2022-12-31"></input>
                </div>
                </div>
                {this.state.day && this.test2()}
                <button class={style.button && style.button1} onClick={() => {this.test2()}}>Search</button>
                
            </div>
        );
    }

}





