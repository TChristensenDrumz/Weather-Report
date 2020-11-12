var apiKey = "28f1a1d1d41e500695c02fdd28b46d2a";
var forecast = $(".col");
var index = [5, 12, 21, 29, 37];

$("#search").on("click", function(event){
    event.preventDefault();
    if($("#inputCity").val() !== ""){
        var newButton = $("<button>").attr("class", "cities").text($("#inputCity").val());
        $(".buttons").append(newButton);
    }
});

function getWeather(city){
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey,
        method: "GET"
    }).then(function(response){
        var today = moment().format("(MM/D/YYYY)");
        $("#main").text(response.name + " " + today);
        $("#temp").text("Temperature: " + Math.ceil(response.main.temp) + " F");
        $("#humidity").text("Humidity: " + response.main.humidity + "%");
        $("#wind").text("Wind Speed: " + response.wind.speed + " MPH");

        var weatherIcon = $("<img>");
        var iconURL = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
        weatherIcon.attr("src", iconURL);
        $("#main").append(weatherIcon);


        var latitude = response.coord.lat;
        var longitude = response.coord.lon;
        getUVI(latitude, longitude);
    });
}

function getUVI(lat, lon){
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey,
        method: "GET"
    }).then(function(response){
        var span = $("<span>");
        span.text(response.value);
        if(response.value < 3){
            span.attr("class", "safe");
        }
        else if(response.value > 3 && response.value <= 5){
            span.attr("class", "moderate");
        }
        else if(response.value > 5 && response.value < 8){
            span.attr("class", "high");
        }
        else{
            span.attr("class", "danger");
        }
        $("#uvi").text("UV Index: ").append(span);
    });
}

function getForecast(city){
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey,
        method: "GET"
    }).then(function(response){
        for(let i = 0; i < forecast.length; i++){
            var day = moment().add(i + 1, "days").format("MM/D/YYYY");
            $(forecast[i]).text(day);

            var weatherIcon = $("<img>");
            var iconURL = "http://openweathermap.org/img/w/" + response.list[index[i]].weather[0].icon + ".png";
            weatherIcon.attr("src", iconURL);
            $(forecast[i]).append(weatherIcon);            

            var newDivT = $("<div>").text("Temperature: " + Math.ceil(response.list[index[i]].main.temp));
            $(forecast[i]).append(newDivT);

            var newDivH = $("<div>").text("Humidity: " + response.list[index[i]].main.humidity + "%");
            $(forecast[i]).append(newDivH);
        }

    });
}

$(document).on("click", ".cities", function(){
    getWeather($(this).text());
    getForecast($(this).text());
});