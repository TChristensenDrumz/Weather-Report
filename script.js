var apiKey = "28f1a1d1d41e500695c02fdd28b46d2a";

$("#search").on("click", function(event){
    event.preventDefault();

    var newButton = $("<button class='cities'>").text($("#inputCity").val());
    $(".buttons").append(newButton);
});

function getWeather(city){
    $.ajax({
        url: "api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey,
        method: "GET"
    }).then(function(response){
        console.log(response);
    });
}

function getUVI(lat, lon){
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey,
        method: "GET"
    }).then(function(response){
        console.log(response);
    });
}

function getForecast(city){
    $.ajax({
        url: "api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey,
        method: "GET"
    }).then(function(response){
        console.log(response);
    });
}