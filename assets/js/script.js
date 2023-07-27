const weatherFormEl = document.querySelector("#weather-form");
const cityInputEl = document.querySelector("#enterCity");
const containerEl = document.querySelector("#weather-container");
const citySearchTerm = document.querySelector("#city-search-term");

const formSubmitHandler = function (event) {
  event.preventDefault();

  const city = cityInputEl.value.trim();

  if (city) {
    getLocation(city);

    containerEl.textContent = "";
    cityInputEl.textContent = "";
  } else {
    alert("Please enter a city");
  }
};

const getLocation = function (cityName) {
  const locUrl =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    cityName +
    "&limit=1&appid=62af28ccccd9db6d1b5c5a5bc32ebc7e";

  fetch(locUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        getCityWeather(cityName, data[0].lat, data[0].lon);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
};

const getCityWeather = function (locName, cityLat, cityLon) {
  const weatherUrl =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    cityLat +
    "&lon=" +
    cityLon +
    "&appid=62af28ccccd9db6d1b5c5a5bc32ebc7e";

  fetch(weatherUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayWeather(
          locName,
          data.list.main.temp,
          data.list.weather.description,
          data.list.wind.speed,
          data.list.main.humidity
        );
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
};

const displayWeather = function (name, temp, desc, windSpeed, humidity) {
  citySearchTerm.textContent = name;
  const weatherEl = document.createElement("div");
  weatherEl.classList = "list-item flex-row justify-space-between align-center";

  const tempEl = document.createElement("span");
  tempEl.textContent = "The current temperature is " + temp + " Kelvin.";

  const descEl = document.createElement("span");
  descEl.textContent = desc;

  const windEl = document.createElement("span");
  windEl.textContent = "The current wind speed is " + windSpeed + "m/s.";

  const humidityEl = document.createElement("span");
  humidityEl.textContent = "The current humidity is " + humidity + "%";

  weatherEl.appendChild(tempEl);
  weatherEl.appendChild(descEl);
  weatherEl.appendChild(windEl);
  weatherEl.appendChild(humidityEl);

  containerEl.appendChild(weatherEl);
};

weatherFormEl.addEventListener("submit", formSubmitHandler);
