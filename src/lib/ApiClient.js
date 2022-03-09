import $ from "jquery";

const baseUrl = "https://api.weatherapi.com/v1";
const apiKey = "4fd48e8a399548589a9172904210405";

export default {
	fetchWeatherForLocation(locationName) {
		return new Promise((resolve, reject) => {
			$.ajax({
				url: `${baseUrl}/current.json?q=${locationName}&aqi=no&key=${apiKey}`,
				dataType: "json",
                success: (data) => resolve(data),
                error: (error) => reject(error)
			});
		});
	},
};
