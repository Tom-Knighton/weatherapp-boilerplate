import { h, render, Component, createRef } from "preact";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import style from "./style.less";
import APIClient from "../../lib/APIClient";

mapboxgl.accessToken =
	"pk.eyJ1IjoidG9ta25pZ2h0b24iLCJhIjoiY2p0ZWhyb2s2MTR1NzN5bzdtZm9udmJueSJ9.c4dShyMCfZ6JhsnFRf72Rg";

export class MapComponent extends Component {
	constructor(props) {
		super(props);

		this.mapContainer = createRef();
	}

	componentDidUpdate() {
		if (this.state.hasLoaded || !this.props.loc) {
			return;
		}

		const { lon, lat } = this.props.loc;
		const map = new mapboxgl.Map({
			container: this.mapContainer.current,
			style: "mapbox://styles/mapbox/streets-v11",
			center: [lon, lat],
			zoom: 11,
		});

		if (this.props.enableMarker) {
			const marker = new mapboxgl.Marker({
				draggable: true,
			})
				.setLngLat([lon, lat])
				.addTo(map);

			if (this.props.onMarkerDrag) {
				this.setState({
					perf: this.props.onMarkerDrag,
				});

				console.log(this.props.onMarkerDrag);
				marker.on("dragend", () => {
					this.props.onMarkerDrag(marker.getLngLat());
				});
				this.props.onMarkerDrag({ lat, lng: lon });
			}
		}

		this.mapContainer.current.addEventListener("mousemove", function (e) {
			e.stopPropagation();
		});

		this.mapContainer.current.addEventListener("touchmove", function (e) {
			e.stopPropagation();
		});

		this.setState({
			hasLoaded: true,
			chosenLat: this.props.loc.lat,
			chosenLon: this.props.loc.lon,
		});
	}

	onDragEnd() {
		this.props.onMarkerDrag();
	}

	render() {
		return <div class={style.map} ref={this.mapContainer}></div>;
	}
}
