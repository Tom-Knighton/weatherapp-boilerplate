import { h, render, Component } from "preact";
import { route } from "preact-router";
import Button from "../components/button";
import { MapComponent } from "../components/map";
import APIClient from "../lib/APIClient";
import style from "./style.less";

export class SearchMap extends Component {
	constructor(props) {
		super(props);

		// Sets the initial states
		this.setState({
			query: "",
			moveMap: false
		});


		// Grabs the current location and sets the 'loc' state to the data received
		APIClient.getLocation().then((data) => {
			this.setState({
				loc: data
			});
		});
	}

	// setter for query state
	setQuery(value) {
		this.setState({
			query:value
		});
	}

	// Find the location of the name and then tells the map it can move and resets query (and searchbar)
	search = evt => {
		if (evt.key === "Enter") {
			APIClient.searchForLocation(this.state.query).then((data) => {
				let lat = data[0].lat;
				let lon = data[0].lon;
				let name = data[0].name;
				this.setState({
					loc: {lat, lon, name},
					lat: lat,
					lon: lon,
					moveMap: true
				});
				this.setQuery("");
			});
		}
		else {
			this.setState({
				moveMap: false
			});
		}
	};


	// When the user finishes moving the marker, set our 'lat' and 'lon' states to the new location
	onMarkerDragged = (loc) => {
		this.setState({
			lat: loc.lat,
			lon: loc.lng,
			moveMap: false
		});
	};

	// Call the route method to replace the current page with the place/ route (From app.js)
	goToWeatherPage() {
		route(`/place/${this.state.lat}/${this.state.lon}`);
	}

	render() {
		return (
			<div class={style.app} >
                <h3 className="bigTitle">Search Weather at..</h3>
				<input type="text" placeholder="Search..." className={style.searchField} onChange={e => this.setQuery(e.target.value)} value={this.state.query} onKeyPress={this.search}/>
                <MapComponent class={style.mapContainer} loc={this.state.loc} enableMarker={true} onMarkerDrag={this.onMarkerDragged} setnew={[this.state.moveMap,this.state.loc]}/>
                <Button onClick={() => { this.goToWeatherPage(); }}>Get Weather Here</Button>
			</div>
		);
	}
}
