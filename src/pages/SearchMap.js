import { h, render, Component } from "preact";
import Button from "../components/button";
import { MapComponent } from "../components/map";
import APIClient from "../lib/APIClient";
import style from "./style.less";

export class SearchMap extends Component {
	constructor(props) {
		super(props);

        APIClient.getLocation().then((data) => {
            this.setState({
                loc: data
            });
        })
	}

    onMarkerDragged = (loc) => {
		this.setState({
			lat: loc.lat,
			lon: loc.lng
		});
		console.log('Set' + loc.lat + ' ' + loc.lng);
	};

	render() {
		return (
			<div class={style.app} >
                <h3 className="bigTitle">Search Weather at..</h3>
                <MapComponent class={style.mapContainer} loc={this.state.loc} enableMarker={true} onMarkerDrag={this.onMarkerDragged}/>
                <Button onClick={() => { this.goToWeatherPage() }}>Get Weather Here</Button>
			</div>
		);
	}
}
