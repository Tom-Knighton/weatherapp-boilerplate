import { h, render, Component, createRef } from "preact";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import style from "./style.less";
import APIClient from "../../lib/APIClient";

mapboxgl.accessToken =
	"pk.eyJ1IjoidG9ta25pZ2h0b24iLCJhIjoiY2p0ZWhyb2s2MTR1NzN5bzdtZm9udmJueSJ9.c4dShyMCfZ6JhsnFRf72Rg";

export class MapComponent extends Component {
	constructor(props) {
		super(props);

		// Create a reference for our map object so we can refer to it
		this.mapContainer = createRef();
	}

	componentDidUpdate() {
		// Every time the page updates, if we've loaded and we don't have a location, fly to the location we set from the search bar in the parent
		if (this.state.hasLoaded || !this.props.loc) {
			if (typeof this.state.map !== "undefined") {
				if (this.props.setnew[0]) {
					this.state.map.flyTo({ center: this.props.setnew[1] });
					this.state.marker.setLngLat(this.props.setnew[1]);
				}
			}
			return;
		}

		// Get the lat, lon from the props
		const { lon, lat } = this.props.loc;

		// Create a new Mapbox map object
		const map = new mapboxgl.Map({
			container: this.mapContainer.current,
			style: "mapbox://styles/mapbox/streets-v11",
			center: [lon, lat],
			zoom: 11,
		});

		// If a marker should be drawn, draw a marker at the location and handle dragging actions
		if (this.props.enableMarker) {
			const marker = new mapboxgl.Marker({
				draggable: true,
			})
				.setLngLat([lon, lat])
				.addTo(map);
			this.setState({
				marker: marker,
			});

			if (this.props.onMarkerDrag) {
				this.setState({
					perf: this.props.onMarkerDrag,
				});

				marker.on("dragend", () => {
					this.props.onMarkerDrag(marker.getLngLat()); // Call the callback function onMarkerDrag to tell the parent about new coordinates
				});
				this.props.onMarkerDrag({ lat, lng: lon });
			}
		}

		// Disable the dragging of the map from swiping the page as well
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
			map: map,
		});
	}

	onDragEnd() {
		// When the marker is dragged, call the callback function to let parent know new coordinates
		this.props.onMarkerDrag();
	}

	render() {
		return <div class={style.map} ref={this.mapContainer}></div>;
	}
}
