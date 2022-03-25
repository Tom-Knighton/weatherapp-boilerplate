import $ from "jquery";

const baseUrl = "https://api.weatherapi.com/v1";
const apiKey = "4fd48e8a399548589a9172904210405";

let locationData = null;

export default {
	// All API methods get the relevant location (either current or one passed) and call the relevant endpoint and just return the data straight away

	// Fetches the current weather for a location
	fetchWeatherForLocation(locationName) {
		return new Promise((resolve, reject) => {
			this.getLocation().then((loc) => {
				locationName = locationName ? locationName : loc.name+","+loc.region+","+loc.country;
				$.ajax({
					url: `${baseUrl}/current.json?q=${locationName}&aqi=no&key=${apiKey}`,
					dataType: "json",
					success: (data) => resolve(data),
					error: (error) => reject(error),
				});
			});
		});
	},

	// Fetches the next n days of weather forecast data for a location
	fetchForecastForLocation(days = 10, locationName = null) {
		return new Promise((resolve, reject) => {
			this.getLocation().then((loc) => {
				locationName = locationName ? locationName : loc.name+","+loc.region+","+loc.country;
				$.ajax({
					url: `${baseUrl}/forecast.json?q=${locationName}&aqi=yes&alerts=no&days=${days}&key=${apiKey}`,
					dataType: "json",
					success: (data) => resolve(data),
					error: (error) => reject(error),
				});
			});
		});
	},

	// Returns a location from the WeatherAPI based on a common name
	searchForLocation(locationName) {
		return new Promise((resolve, reject) => {
			$.ajax({
				url: `${baseUrl}/search.json?q=${locationName}&key=${apiKey}`,
				dataType: "json",
				success: (data) => resolve(data),
				error: (error) => reject(error),
			});
		});
	},

	// Returns only the astronomy data for a location
	getAstronomyData(locationName) {
		return new Promise((resolve, reject) => {
			$.ajax({
				url: `${baseUrl}/astronomy.json?q=${locationName}&key=${apiKey}`,
				dataType: "json",
				success: (data) => resolve(data),
				error: (error) => reject(error),
			});
		});
	},

	// Returns any sporting data for a location
	getSportData(locationName) {
		return new Promise((resolve, reject) => {
			$.ajax({
				url: `${baseUrl}/sports.json?q=${locationName}&key=${apiKey}`,
				dataType: "json",
				success: (data) => resolve(data),
				error: (error) => reject(error),
			});
		});
	},

	// Returns the name,time  and lat/lon coords of either the current location or one passed
	getLocation(lat = null, lon = null) {
		return new Promise((resolve, reject) => {
			if (lat && lon) {
				// If a lat,lon object was passed, get the location for the lat,lon coordinates
				$.ajax({
					url: `${baseUrl}/current.json?q=${lat},${lon}&aqi=no&key=${apiKey}`,
					dataType: "json",
					success: (data) => {
						// Return the
						resolve({
							lat,
							lon,
							name: data.location.name,
							country:data.location.country,
							region: data.location.region,
							time: data.location.localtime,
						});
					},
				});
			} else if (!lat && !lon && this.locationData) {
				// If no coord was passed and we've already cached location data, return that
				resolve(this.locationData);
			} else if (navigator.geolocation) {
				// If we have permission to get the location, get the current coords and return the relevant date,place data
				navigator.geolocation.getCurrentPosition((pos) => {
					const lat = pos.coords.latitude;
					const lon = pos.coords.longitude;

					$.ajax({
						url: `${baseUrl}/current.json?q=${lat},${lon}&aqi=no&key=${apiKey}`,
						dataType: "json",
						success: (data) => {
							this.locationData = {
								lat,
								lon,
								name: data.location.name,
								country:data.location.country,
								region: data.location.region,
								time: data.location.localtime,
							};
							resolve(this.locationData);
						},
					});
				});
			} else if (lat && lon) {
				// Otherwise error out
				reject("No location permissions");
			}
		});
	},
};
