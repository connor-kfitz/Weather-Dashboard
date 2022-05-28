var APIKey = "eae30589ae86d52103436bee50214263";
var city = "Toronto";
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&current.uvi=true&appid=" + APIKey;

fetch(queryURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        var temp = (data.main.temp); // Cel
        console.log(temp);
        var wind = (data.wind.speed); // m/s
        console.log(wind);
        var humidity = (data.main.humidity);
        console.log(humidity);
        var lat = data.coord.lat;
        console.log(lat);
        var long = data.coord.lon;
        console.log(long);
        var newQueryURL = "http://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&appid=" + APIKey;
        fetch(newQueryURL)
            .then(function (response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            var uvIndex = data.current.uvi;
            console.log(uvIndex);
        })
      });

// Link search bar and button
var searchButton = $('#searchButton');
searchButton.on('click', function (){
    var city = $('#searchBar').val();
    console.log(city);

})
