import $ from "jquery";

const baseUrl = "https://api.weatherapi.com/v1";
const apiKey = "4fd48e8a399548589a9172904210405";

export default {
	fetchWeatherForLocation(locationName) {
		return new Promise((resolve, reject) => {
			$.ajax({
				url: `${baseUrl}/current.json?q=${locationName}&yes=no&key=${apiKey}`,
				dataType: "json",
				success: (data) => resolve(data),
				error: (error) => reject(error)
			});
		});
	},

	fetchForecastForLocation(locationName, days = 10) {
		return new Promise((resolve, reject) => {
			$.ajax({
				url: `${baseUrl}/forecast.json?q=${locationName}&aqi=yes&alerts=no&days=10&key=${apiKey}`,
				dataType: "json",
				success: (data) => resolve(data),
				error: (error) => reject(error)
			});
		});
	},

	searchForLocation(locationName) {
		return new Promise((resolve, reject) => {
			$.ajax({
				url: `${baseUrl}/search.json?q=${locationName}&key=${apiKey}`,
				dataType: "json",
				success: (data) => resolve(data),
				error: (error) => reject(error)
			});
		});
	},

	getAstronomyData(locationName) {
		return new Promise((resolve, reject) => {
			$.ajax({
				url: `${baseUrl}/astronomy.json?q=${locationName}&key=${apiKey}`,
				dataType: "json",
				success: (data) => resolve(data),
				error: (error) => reject(error)
			});
		});
	},

	getSportData(locationName) {
		return new Promise((resolve, reject) => {
			$.ajax({
				url: `${baseUrl}/sports.json?q=${locationName}&key=${apiKey}`,
				dataType: "json",
				success: (data) => resolve(data),
				error: (error) => reject(error)
			});
		});
	}
};
