var APIKey = "eae30589ae86d52103436bee50214263";
var city = "Toronto";
var queryURL = "http://api.openweathermap.org/data/2.5/weather?units=metric&q=" + city + "&current.uvi=true&appid=" + APIKey;
var temp;
var wind;
var humidity;
var uvIndex

fetch(queryURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        temp = (data.main.temp); // Cel
        console.log(temp);
        wind = (data.wind.speed); // m/s
        console.log(wind);
        humidity = (data.main.humidity);
        console.log(humidity);
        var lat = data.coord.lat;
        console.log(lat);
        var long = data.coord.lon;
        console.log(long);
        var newQueryURL = "http://api.openweathermap.org/data/2.5/onecall?units=metric&lat=" + lat + "&lon=" + long + "&appid=" + APIKey;
        fetch(newQueryURL)
            .then(function (response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            uvIndex = data.current.uvi;
            console.log(uvIndex);
        })
      });

// Link search bar and button
var searchButton = $('#searchButton');
var searchHistory = $('.searchHistory');

searchButton.on('click', function (){
    var city = $('#searchBar').val();
    console.log(city);
    $('#todayTemp').text(temp.toString());
    $('#todayWind').text(wind.toString());
    $('#todayHumidity').text(humidity.toString());
    $('#todayUV').text(uvIndex.toString());
    searchHistory.append("<h2>" + city + "</h2>");
})


