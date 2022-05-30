var APIKey = "eae30589ae86d52103436bee50214263";
var city = "Toronto";

var city;
var temp;
var wind;
var humidity;
var uvIndex;
var iconCode;
var fiveDayTemp = [0, 0, 0, 0, 0];
var fiveDayWind = [0, 0, 0, 0, 0];
var fiveDayHumidity = [0, 0, 0, 0, 0];
var fiveDayIconCode = ["", "", "", "", ""];

var historyMatrix = ["", "", "", "", ""];
var historyMatrixCount =0;

// Link search bar and button
var searchButton = $('#searchButton');
var searchHistory = $('.searchHistory');

var queryURL = "http://api.openweathermap.org/data/2.5/weather?units=metric&q=" + city + "&current.uvi=true&appid=" + APIKey;
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

            
            
            console.log(fiveDayIconCode);
            var cityWeather = {
                location: city,
                icon: iconCode,
                todayTemp: temp,
                todayHumid: humidity,
                todayUV: uvIndex,
                fiveDayIconCode: fiveDayIconCode,
                fiveDayTemp: fiveDayTemp,
                fiveDayWind: fiveDayWind,
                fiveDayHumidity: fiveDayHumidity
            }
            console.log(cityWeather);
            localStorage.setItem(city, JSON.stringify(cityWeather));
        })
    });

searchButton.on('click', function (){
    var city = $('#searchBar').val();

    console.log(temp);


    if(historyMatrixCount < 1){
        historyMatrix[historyMatrixCount] = city;
        $('#searchButton1').text(city);
        historyMatrixCount++;
    }   
    else if(historyMatrixCount < 2){
        historyMatrix[1] = historyMatrix[0]
        historyMatrix[0] = city;
        $('#searchButton1').text(city);
        $('#searchButton2').text(historyMatrix[1]);
        historyMatrixCount++;
    }   
    else if(historyMatrixCount < 3){
        historyMatrix[2] = historyMatrix[1]
        historyMatrix[1] = historyMatrix[0]
        historyMatrix[0] = city;
        $('#searchButton1').text(city);
        $('#searchButton2').text(historyMatrix[1]);
        $('#searchButton3').text(historyMatrix[2]);
        historyMatrixCount++;
    }   
    else if(historyMatrixCount < 4){
        historyMatrix[3] = historyMatrix[2]
        historyMatrix[2] = historyMatrix[1]
        historyMatrix[1] = historyMatrix[0]
        historyMatrix[0] = city;
        $('#searchButton1').text(city);
        $('#searchButton2').text(historyMatrix[1]);
        $('#searchButton3').text(historyMatrix[2]);
        $('#searchButton4').text(historyMatrix[3]);
        historyMatrixCount++;
    }   
    else{
      historyMatrix.pop();
      for(var i=0; i < 5; i++){
          historyMatrix[4-i]=historyMatrix[3-i];
      }
        historyMatrix[0] = city;
        $('#searchButton1').text(city);
        $('#searchButton2').text(historyMatrix[1]);
        $('#searchButton3').text(historyMatrix[2]);
        $('#searchButton4').text(historyMatrix[3]);
        $('#searchButton5').text(historyMatrix[4]);

    }
 
    $('#todayLocAndDate').text(city + ", " + moment().format('MMM Do YY'));
    $('#weatherIcon').attr("src", "http://openweathermap.org/img/wn/" + iconCode + "@2x.png");
    $('#todayTemp').text(temp.toString());
    $('#todayWind').text(wind.toString());
    $('#todayHumidity').text(humidity.toString());
    $('#todayUV').text(uvIndex.toString());

    var boxTempDates =['#oneDayDate', '#twoDayDate', '#threeDayDate', '#fourDayDate', '#fiveDayDate'];
    var boxIconIDs =['#oneDayWeatherIcon', '#twoDayWeatherIcon', '#threeDayWeatherIcon', '#fourDayWeatherIcon', '#fiveDayWeatherIcon'];
    var boxTempIDs =['#oneDayTemp', '#twoDayTemp', '#threeDayTemp', '#fourDayTemp', '#fiveDayTemp'];
    var boxWindIDs =['#oneDayWind', '#twoDayWind', '#threeDayWind', '#fourDayWind', '#fiveDayWind'];
    var boxHumidityIDs =['#oneDayHumidity', '#twoDayHumidity', '#threeDayHumidity', '#fourDayHumidity', '#fiveDayHumidity'];
    
    for(var i =0; i < 5; i++){
        $(boxTempDates[i]).text(moment().add(i, 'days').format('MMM Do YY'))
        $(boxIconIDs[i]).attr("src", "http://openweathermap.org/img/wn/" + fiveDayIconCode[i] + "@2x.png");
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

var searchButton1 = $('#searchButton1');
var searchButton2 = $('#searchButton2');
var searchButton3 = $('#searchButton3');
var searchButton4 = $('#searchButton4');
var searchButton5 = $('#searchButton5');

// searchButton1.on('click', history(historyMatrix[0]));