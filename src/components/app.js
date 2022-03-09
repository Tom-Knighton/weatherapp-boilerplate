// import preact
import { h, Component } from 'preact';

// import required Components from 'components/'
import Iphone from './iphone';

export default class App extends Component {
//var App = React.createClass({

	// once the components are loaded, checks if the url bar has a path with "ipad" in it, if so sets state of tablet to be true
	componentDidMount() {
		const urlBar = window.location.href;
		this.setState({
			"isTablet": false
		});
	}

	/*
		A render method to display the required Component on screen (iPhone or iPad) : selected by checking component's isTablet state
	*/
	render(){
		return (
			<div id="app">
				<Iphone/>
			</div>
		);

	}
}
