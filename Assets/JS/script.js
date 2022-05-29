var APIKey = "eae30589ae86d52103436bee50214263";
var city = "Toronto";
var queryURL = "http://api.openweathermap.org/data/2.5/weather?units=metric&q=" + city + "&current.uvi=true&appid=" + APIKey;
var temp;
var wind;
var humidity;
var uvIndex;


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
            iconCode = data.current.weather[0].icon;
            console.log(iconCode);
        })
      });

// Link search bar and button
var searchButton = $('#searchButton');
var searchHistory = $('.searchHistory');

searchButton.on('click', function (){
    var city = $('#searchBar').val();
    console.log(city);
    $('#todayLocAndDate').text(city + ", " + moment().format('MMM Do YY'));
    $('#weatherIcon').append('')
    $('#todayTemp').text(temp.toString());
    $('#todayWind').text(wind.toString());
    $('#todayHumidity').text(humidity.toString());
    $('#todayUV').text(uvIndex.toString());
    searchHistory.append("<div>" + city + "</div>");

    //UV Index Colour
    if(uvIndex < 3) {
        $('#todayUV').css('background', 'yellow');
        console.log('yes');
    } 
    else if(uvIndex < 6) {
        $('#todayUV').css('background', 'green');
    } 
    else {
        $('#todayUV').css('background', 'red');
    }
})


