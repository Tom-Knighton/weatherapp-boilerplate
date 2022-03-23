import $ from "jquery";

const baseUrl = "https://api.weatherapi.com/v1";
const apiKey = "4fd48e8a399548589a9172904210405";

let locationData = null;

export default {
	fetchWeatherForLocation(locationName) {
		return new Promise((resolve, reject) => {
			this.getLocation().then(loc => {
				locationName = locationName ? locationName : loc.name;
				$.ajax({
					url: `${baseUrl}/current.json?q=${locationName}&aqi=no&key=${apiKey}`,
					dataType: "json",
					success: (data) => resolve(data),
					error: (error) => reject(error)
				});
			})
		});
	},

	fetchForecastForLocation(days = 10, locationName = null) {
		return new Promise((resolve, reject) => {
			this.getLocation().then(loc => {
				locationName = locationName ? locationName : loc.name;
				$.ajax({
					url: `${baseUrl}/forecast.json?q=${locationName}&aqi=yes&alerts=no&days=${days}&key=${apiKey}`,
					dataType: "json",
					success: (data) => resolve(data),
					error: (error) => reject(error)
				});
			})
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
	},

	getLocation(lat = null, lon = null) {
		return new Promise((resolve, reject) => {

			if (lat && lon) {
				$.ajax({
					url: `${baseUrl}/current.json?q=${lat},${lon}&aqi=no&key=${apiKey}`,
					dataType: "json",
					success: (data) => {
						// this.locationData = { lat, lon, name: data.location.name };
						resolve({ lat, lon, name: data.location.name, time: data.location.localtime});
					}
				});
			}

			else if (!lat && !lon && this.locationData) {
				resolve(this.locationData);
			}

			else if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition((pos) => {
					const lat = pos.coords.latitude;
					const lon = pos.coords.longitude;

					$.ajax({
						url: `${baseUrl}/current.json?q=${lat},${lon}&aqi=no&key=${apiKey}`,
						dataType: "json",
						success: (data) => {
							this.locationData = { lat, lon, name: data.location.name, time: data.location.localtime};
							resolve(this.locationData);
						}
					});
				});
			}
			else if (lat && lon) {
				reject('No location permissions');
			}
		});
	}
};
