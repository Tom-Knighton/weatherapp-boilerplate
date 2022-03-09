// import preact
import { h, Component } from 'preact';

// import required Components from 'components/'
import Iphone from './iphone';

export default class App extends Component {
//var App = React.createClass({

	/*
		A render method to display the required Component on screen (iPhone or iPad) : selected by checking component's isTablet state
	*/
	render(){
		return (
			<div id="app">
				<Iphone/ >
			</div>
		);
	}
}