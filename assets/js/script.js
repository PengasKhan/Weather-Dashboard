const weatherFormEl = document.querySelector('#weather-form')
const cityInputEl = document.querySelector('#enterCity')

const formSubmitHandler = function (event) {
    event.preventDefault();

    const city = cityInputEl.value.trim();

    if (city)
}

const getCityWeather = function (cityLat, cityLon) {
    const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + cityLat + '&lon=' + cityLon + '&appid=62af28ccccd9db6d1b5c5a5bc32ebc7e';
    
    fetch(apiUrl)
    if (response.ok) {
        response.json().then(function (data) {
          displayRepos(data.items, language);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
      .catch(function (error) {
        alert('Unable to connect to OpenWeather');
      });
}

weatherFormEl.addEventListener('submit', formSubmitHandler);