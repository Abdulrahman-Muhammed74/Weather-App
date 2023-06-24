const apiKey = "b77a40b3c77358821e9d50c87495bc3e"
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;
const searchBox = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");
const inputField = document.querySelector('.input');
const weatherIcon = document.querySelector(".weather-icon")
let weatherDescription;

function convertTime(time24) {
    const [hours, minutes] = time24.split(':');
    let hours12 = parseInt(hours, 10);
    const amPm = hours12 >= 12 ? 'PM' : 'AM';
    hours12 %= 12;
    hours12 = hours12 || 12;
    const time12 = `${hours12}:${minutes} ${amPm}`;
    return time12
}


async function checkWeather(cityName) {
    const response = await fetch(apiUrl + cityName + `&appid=${apiKey}`);
    if (response.status = 404) {
        document.querySelector(".error").style.display = 'block';
        document.querySelector(".weather").style.display = 'none';
    }
    let data = await response.json();
    const sunRise = data.sys.sunrise;
    const sunSet = data.sys.sunset
    const sunSetDate = new Date(sunSet * 1000)
    const sunRiseDate = new Date(sunRise * 1000)

    const sunSetTime24 = `${sunSetDate.getHours()}:${sunSetDate.getMinutes()}`
    const sunsetFinal = convertTime(sunSetTime24);

    const sunRiseTime24 = `${sunRiseDate.getHours()}:${sunRiseDate.getMinutes()}`
    const sunRiseFinal = convertTime(sunRiseTime24);


    data.weather.forEach((element) => {
        weatherDescription = element.description
    });
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".weather-desc").innerHTML = weatherDescription;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + '°C';
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + " Km/h"
    document.querySelector(".sunrise").innerHTML = sunRiseFinal;
    document.querySelector(".sunset").innerHTML = sunsetFinal;

    if (data.weather[0].main === "Clouds") {
        weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main === "Clear") {
        weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main === "Rain") {
        weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main === "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main === "Mist") {
        weatherIcon.src = "images/mist.png";
    }
    document.querySelector(".weather").style.display = 'block'
    document.querySelector(".error").style.display = 'none';




}

inputField.addEventListener("keyup", ({ key }) => {
    if (key === "Enter") {
        checkWeather(searchBox.value);
    }
})

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})

