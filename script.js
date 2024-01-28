// Initial array of cities
var cities = [];
//var APIKey = "172e14c8b1f9b91de3f6976630d9864a";
//var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&appid=" + APIKey;



// Fetch call to the OpenWeatherMap API
fetch(queryURL)
  .then(function (response) {
    // Calling .json() to access the json data 
    return response.json();
  })
  // Store all of the retrieved data 
  .then(function (data) {

    // Log the queryURL
    console.log(data);
// Log the resulting object
    console.log(data);
    
})
// APIKey error 401
    .catch(function(error) {
        console.error("Error fetching weather data:", error);
    }); 

   