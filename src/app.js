// import preact
import {h, Component, createRef} from "preact";
import Router from "preact-router";
import SwipeableViews from "react-swipeable-views/lib/SwipeableViews";
import HomePage from "./pages/HomePage";
import { SearchCondition } from "./pages/SearchCondition";
import { SearchMap } from "./pages/SearchMap";
// import required Components from 'components/'

const weatherDic = {
	"Sunny": "bg1",
	"Clear": "bg2",

	"Partly cloudy": "bg3",
	"Cloudy": "bg3",
	"Overcast": "bg3",

	"Blowing snow": "Snow",
	"Patchy light snow": "Snow",
	"Light snow": "Snow",
	"Patchy moderate snow": "Snow",
	"Moderate or heavy sleet showers": "Snow",
	"Moderate or heavy showers of ice pellets": "Snow",
	"Light showers of ice pellets": "Snow",
	"Light sleet showers": "Snow",
	"Ice pellets": "Snow",
	"Moderate snow": "Snow",
	"Patchy heavy snow": "Snow",
	"Heavy snow": "Snow",
	"Light snow showers": "Snow",
	"Moderate or heavy snow showers": "Snow",
	"Light sleet": "Snow",
	"Moderate or heavy sleet": "Snow",
	"Blizzard": "Snow",

	"Light rain": "bg5",
	"Moderate rain": "bg5",
	"Patchy rain possible": "bg5",
	"Torrential rain shower": "bg5",
	"Moderate or heavy rain shower": "bg5",
	"Heavy rain": "bg5",
	"Moderate rain at times": "bg5",
	"Moderate or heavy freezing rain": "bg5",
	"Light freezing rain": "bg5",
	"Patchy freezing drizzle possible": "bg5",
	"Patchy light drizzle": "bg5",
	"Light drizzle": "bg5",
	"Freezing drizzle": "bg5",
	"Heavy freezing drizzle": "bg5",
	"Light rain shower": "bg5",

	"Thundery outbreaks possible": "Lightning",
	"Patchy light snow with thunder": "Lightning",
	"Moderate or heavy snow with thunder": "Lightning",
	"Patchy light rain with thunder": "Lightning",
	"Moderate or heavy rain with thunder": "Lightning",

	"Fog": "Foggy",
	"Mist": "Foggy",
	"Freezing fog": "Foggy"
};

export default class App extends Component {
	//var App = React.createClass({

	// once the components are loaded, checks if the url bar has a path with "ipad" in it, if so sets state of tablet to be true
	componentDidMount() {
		const urlBar = window.location.href;
	}

	// callback function
	getWeather = (weather) => {
		this.setState({bg: weatherDic[weather]});
	}
	/*

		A render method to display the required Component on screen (iPhone or iPad) : selected by checking component's isTablet state
	*/
	render() {
		return (
			<div id="app">
				<div class="container" id={(typeof this.state.bg !== 'undefined')?this.state.bg:"bg"}>
					<Router>
						<SwipeableViews path="/" index={1} enableMouseEvents={true}>
							<SearchCondition/>
							<HomePage getWeather={this.getWeather}/>
							<SearchMap />
						</SwipeableViews>
						<HomePage path="/place/:lat/:lon" getWeather={this.getWeather}/>
					</Router>
				</div>
			</div>
		);
	}
}
