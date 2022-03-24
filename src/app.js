// import preact
import {h, Component, createRef} from "preact";
import Router from "preact-router";
import SwipeableViews from "react-swipeable-views/lib/SwipeableViews";
import WeatherDict from "./lib/WeatherDict";
import HomePage from "./pages/HomePage";
import { SearchCondition } from "./pages/SearchCondition";
import { SearchMap } from "./pages/SearchMap";
// import required Components from 'components/'



export default class App extends Component {
	//var App = React.createClass({

	// once the components are loaded, checks if the url bar has a path with "ipad" in it, if so sets state of tablet to be true
	componentDidMount() {
		const urlBar = window.location.href;
	}

	// callback function
	getWeather = (weather) => {
		this.setState({bg: WeatherDict[weather]});
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
