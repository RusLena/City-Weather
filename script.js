// Initial array of cities
var cities = [];
var APIKey = ".....";
function fetchDataForCity(city) {
var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&appid=" + APIKey;



// Fetch call to the OpenWeatherMap API
fetch(queryURL)
  .then(function (response) {
    // Calling .json() to access the json data 
    return response.json();
  })
  // Store all of the retrieved data 
  .then(function (data) {

    // Log the queryURL
    console.log(queryURL);
// Log the resulting object
    console.log(data);
      // Data that will be damped in the cards
$(".city").text("City: " + data.name);
$(".wind").text("Wind Speed: " + data.wind.speed);
$(".humidity").text("Humidity: " + data.main.humidity);
$(".temp").text("Temperature: " + data.main.temp);

// Convert the temp to Celsius
var tempC = data.main.temp - 273.15;

// add temp content to html
$(".tempC").text("Temperature (C) " + tempC.toFixed(2));
})
// APIKey error 401
    .catch(function(error) {
        console.error("Error fetching weather data:", error);
    }); 

}
fetchDataForCity("London");