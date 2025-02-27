// Cities Array
var cities = [];
var APIKey = config.WEATHER_API_KEY;

// Function to create btns for cities
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
  console.log(city);
  var formattedCity = city.toUpperCase();
  var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;

  // Fetch call to the OpenWeatherMap API
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(queryURL);
      console.log(data);

      // Data that will be dumped in the today's weather section
      $("#today .city").text("City: " + data.name);
      $("#today .wind").text("Wind Speed: " + data.wind.speed +"m/s");
      $("#today .humidity").text("Humidity: " + data.main.humidity + "%");
      $("#today .temp").text("Temperature: " + data.main.temp);

      // Convert the temp to Celsius
      var tempC = data.main.temp - 273.15;
      // Add temp content to html
      $("#today .tempC").text("Temperature: " + tempC.toFixed(2));

      // Weather icon
      var iconCode = data.weather[0].icon;
      var iconURL = `http://openweathermap.org/img/w/${iconCode}.png`;
      $("#wicon").attr("src", iconURL);

      // Add the city to the list of cities
      cities.push(data.name);

      // Render buttons
      renderButtons();
      var lat = data.coord.lat;
      var lon = data.coord.lon;

      // Store in local Storage
      localStorage.setItem("cities", JSON.stringify(cities));
      getFiveDayForecast(lat, lon);
      // Log the data in 
      console.log("Wind Speed: " + data.wind.speed);
      console.log("Humidity: " + data.main.humidity);
      console.log("Temperature (C): " + tempC);
      console.log("Weather Icon Code:", iconCode);
      console.log("Weather Icon URL:", iconURL);
    })
    .catch(function (error) {
      console.error("Error fetching weather data:", error);
    });
}

// Function to update 5-day forecast
function getFiveDayForecast(lat, lon) {
  var queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (forecastData) {
      console.log(queryURL);
      console.log("five day", forecastData);

      // Clear forecast cards
      console.log(forecastData);
      $("#forecast").empty();

      // Loop through the forecast data and create cards for each day
      for (var i = 0; i < forecastData.list.length; i += 8) {
        var forecast = forecastData.list[i];

        // Get info from the forecast data
        var date = forecast.dt_txt.split(" ")[0];
        var temperature = forecast.main.temp;
        var iconCode = forecast.weather[0].icon;
        var humidity = forecast.main.humidity; 
        var windSpeed = forecast.wind.speed;

        // temperature to Celsius
        var tempC = temperature - 273.15;

        // Create a card for each forecast and append it to the forecast section
        var card = $("<div>").addClass("card");
        var cardBody = $("<div>").addClass("card-body");

        // Add forecast info to the card
        cardBody.append($("<p>").text("Date: " + date));
        cardBody.append(
          $("<p>").text("Temperature: " + tempC.toFixed(2) + " °C")
        );

        cardBody.append($("<p>").text("Humidity: " + humidity + "%")); // Added line
        cardBody.append($("<p>").text("Wind Speed: " + windSpeed + " m/s"))

        // Add an image tag for the weather icon
        var iconURL = `http://openweathermap.org/img/w/${iconCode}.png`;
        var iconImg = $("<img>")
          .attr("src", iconURL)
          .attr("alt", "Weather icon");
        cardBody.append(iconImg);

        // Append the card to the forecast section
        card.append(cardBody);
        $("#forecast").append(card);
      }
    });
}

// Event listener for adding a new city
$("#search-form").submit(function (event) {
  event.preventDefault();
  var cityInput = $("#search-input");
  var city = cityInput.val().trim();

  if (city !== "") {
    getCurrentWeather(city);
    cityInput.val("");
  }
});

// Event listener for clicking on a city button
$(document).on("click", ".city", function () {
  var selectedCity = $(this).attr("data-weather");
  getCurrentWeather(selectedCity);
});

// Get cities from localStorage
var storedCities = localStorage.getItem("cities");
if (storedCities) {
  cities = JSON.parse(storedCities);
  renderButtons();
}
