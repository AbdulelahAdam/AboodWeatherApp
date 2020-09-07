var firstTime = true;

function getWeather() {
    let temperature = document.getElementById("temperature");
    let description = document.getElementById("description");
    let location = document.getElementById("location");
    let locationService = document.getElementById("allow-location-service");

    let api = "https://api.openweathermap.org/data/2.5/weather";
    let apiKey = "f146799a557e8ab658304c1b30cc3cfd";
    if (firstTime) {

        location.innerHTML = "Locating...<br>";
        locationService.innerHTML = "Please click \"Allow\" this app to find your location and provide an accurate weather report";
        firstTime = false;
    } else {
        location.innerHTML = locationService.innerHTML = null;
    }


    navigator.geolocation.getCurrentPosition(success, error);


    function success(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;


        let url =
            api +
            "?lat=" +
            latitude +
            "&lon=" +
            longitude +
            "&appid=" +
            apiKey +
            "&units=imperial";


        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let temp = data.main.temp;
                let toCelcius = Math.round((temp - 32) * 5 / 9);
                temperature.innerHTML = toCelcius + "° C";
                location.innerHTML = data.name + "<br>";
                description.innerHTML = data.weather[0].main;
                locationService.innerHTML = null;
                setInterval(function() { getDate(); }, 1);
            });

    }

    function error() {
        location.innerHTML = "Unable to retrieve your location";
    }

}


function getDate() {
    const dayName = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const monthName = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var indicator;

    if (hour.toString().length == 1) {
        hour = '0' + hour;
    }

    if (minute.toString().length == 1) {
        minute = '0' + minute;
    }
    if (hour > "00" && hour < "12") {
        indicator = "AM";
    } else {
        indicator = "PM";
    }

    if (hour == "00") {
        hour = "12";
    }

    if (hour > "12") {
        hour -= 12;
    }

    day = dayName[now.getDay() + 1];
    month = monthName[now.getMonth()];
    var monthDay = now.getDate();
    if (monthDay == "1" || monthDay == "21" || monthDay == "31") {
        monthDay = monthDay + "st";
    } else if (monthDay == "2" || monthDay == "22") {
        monthDay = monthDay + "nd";
    } else if (monthDay == "3" || monthDay == "23") {
        monthDay = monthDay + "rd";
    } else {
        monthDay = monthDay + "th";
    }
    var datetToString = month + ' ' + monthDay + ', ' + year;
    var time = hour + ':' + minute;
    var date = day + ', ' + time + ' ' + indicator;
    var dateOnScreen1 = document.getElementById("date");
    var dateOnScreen2 = document.getElementById("old_date");
    dateOnScreen1.innerHTML = date
    dateOnScreen2.innerHTML = datetToString;

}


setInterval(function() { getWeather(); }, 500);