import { h, render, Component } from "preact";
import { route } from "preact-router";
import Button from "../components/button";
import { MapComponent } from "../components/map";
import APIClient from "../lib/APIClient";
import style from "./style.less";

export class SearchMap extends Component {
	constructor(props) {
		super(props);

		this.setState({
			query: "",
			test: false
		});

		APIClient.getLocation().then((data) => {
			this.setState({
				loc: data
			});
		});
	}

	setQuery(value) {
		this.setState({
			query:value
		});
	}

	search = evt => {
		if (evt.key === "Enter") {
			APIClient.searchForLocation(this.state.query).then((data) => {
				console.log(data[0]);
				let lat = data[0].lat;
				let lon = data[0].lon;
				let name = data[0].name;
				this.setState({
					loc: {lat, lon, name},
					lat: lat,
					lon: lon,
					test: true
				});
				this.setQuery("");
				console.log(this.state.loc);
			});
		}
		else {
			this.setState({
				test: false
			});
		}
	};


	onMarkerDragged = (loc) => {
		this.setState({
			lat: loc.lat,
			lon: loc.lng
		});
		console.log('Set' + this.state.lat + ' ' + this.state.lon);
		console.log(this.state.loc);
	};

	goToWeatherPage() {
		route(`/place/${this.state.lat}/${this.state.lon}`);
	}

	render() {
		return (
			<div class={style.app} >
                <h3 className="bigTitle">Search Weather at..</h3>
				<input type="text" placeholder="Search..." onChange={e => this.setQuery(e.target.value)} value={this.state.query} onKeyPress={this.search}/>
                <MapComponent class={style.mapContainer} loc={this.state.loc} enableMarker={true} onMarkerDrag={this.onMarkerDragged} setnew={[this.state.test,this.state.loc]}/>
                <Button onClick={() => { this.goToWeatherPage(); }}>Get Weather Here</Button>
			</div>
		);
	}
}
