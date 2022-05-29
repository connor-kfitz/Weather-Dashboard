var APIKey = "eae30589ae86d52103436bee50214263";
var city = "Toronto";
var queryURL = "http://api.openweathermap.org/data/2.5/weather?units=metric&q=" + city + "&current.uvi=true&appid=" + APIKey;
var temp;
var wind;
var humidity;
var uvIndex;
var fiveDayTemp = [0, 0, 0, 0, 0];
var fiveDayWind = [0, 0, 0, 0, 0];
var fiveDayHumidity = [0, 0, 0, 0, 0];


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
        console.log(humidity); // %
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

            
            for(var i=0; i < 5; i++){
            fiveDayTemp[i] += data.daily[i].temp.day;
            fiveDayWind[i] += data.daily[i].wind_speed;
            fiveDayHumidity[i] += data.daily[i].humidity;
            }
            console.log(fiveDayTemp);
            console.log(fiveDayWind);
            console.log(fiveDayHumidity);
        })
      });

// Link search bar and button
var searchButton = $('#searchButton');
var searchHistory = $('.searchHistory');

searchButton.on('click', function (){
    var city = $('#searchBar').val();
    console.log(city);
    searchHistory.append("<div>" + city + "</div>");

    $('#todayLocAndDate').text(city + ", " + moment().format('MMM Do YY'));
    $('#weatherIcon').append('')
    $('#todayTemp').text(temp.toString());
    $('#todayWind').text(wind.toString());
    $('#todayHumidity').text(humidity.toString());
    $('#todayUV').text(uvIndex.toString());

    var boxTempDates =['#oneDayDate', '#twoDayDate', '#threeDayDate', '#fourDayDate', '#fiveDayDate'];
    var boxTempIDs =['#oneDayTemp', '#twoDayTemp', '#threeDayTemp', '#fourDayTemp', '#fiveDayTemp'];
    var boxWindIDs =['#oneDayWind', '#twoDayWind', '#threeDayWind', '#fourDayWind', '#fiveDayWind'];
    var boxHumidityIDs =['#oneDayHumidity', '#twoDayHumidity', '#threeDayHumidity', '#fourDayHumidity', '#fiveDayHumidity'];
    
    for(var i =0; i < 5; i++){
        $(boxTempDates[i]).text(moment().add(i, 'days').format('MMM Do YY'))
        $(boxTempIDs[i]).text(fiveDayTemp[i]);
        $(boxWindIDs[i]).text(fiveDayWind[i]);
        $(boxHumidityIDs[i]).text(fiveDayHumidity[i]);
    }
    

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


