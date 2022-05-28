var APIKey = "eae30589ae86d52103436bee50214263";
var city = "Austin";
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

fetch(queryURL);