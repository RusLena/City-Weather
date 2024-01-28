// Initial array of cities

var cities = [];
var APIKey = "172e14c8b1f9b91de3f6976630d9864a";

/// Function to render buttons for cities
function renderButtons() {
  $("#history").empty();

  for (var i = 0; i < cities.length; i++) {
    var button = $("<button>");
    button.addClass("city");
    button.attr("data-weather", cities[i]);
    button.text(cities[i]);
    $("#history").append(button);
  }
}

// Function to get current weather data
function getCurrentWeather(city) {
  var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;

  // Fetch call to the OpenWeatherMap API
  fetch(queryURL)
    .then(function (response) {
      // Calling .json() to access the json data
      return response.json();
    })
    .then(function (data) {
      // Log the queryURL
      console.log(queryURL);
      // Log the resulting object
      console.log(data);

      // Data that will be dumped in the cards
      $(".city").text("City: " + data.name);
      $(".wind").text("Wind Speed: " + data.wind.speed);
      $(".humidity").text("Humidity: " + data.main.humidity);
      $(".temp").text("Temperature: " + data.main.temp);

      // Convert the temp to Celsius
      var tempC = data.main.temp - 273.15;

      // Add temp content to html
      $(".tempC").text("Temperature (C) " + tempC.toFixed(2));

      // Add the city to the list of cities and render buttons
      cities.push(data.name);
      renderButtons();

      // Log the data in the console as well
      console.log("Wind Speed: " + data.wind.speed);
      console.log("Humidity: " + data.main.humidity);
      console.log("Temperature (C): " + tempC);
    })
    // APIKey error 401
    .catch(function (error) {
      console.error("Error fetching weather data:", error);
    });
}

// Event listener for adding a new city
$("#search-form").submit(function (event) {
  event.preventDefault();
  var cityInput = $("#search-input");
  var city = cityInput.val().trim();

  if (city !== "") {
    getCurrentWeather(city);
    cityInput.val(""); // Clear the input field after submitting
  }
});
