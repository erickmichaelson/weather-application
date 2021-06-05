var cityFormEl = document.querySelector('#city-form');
var cityInputEl = document.querySelector('#city-name');
var repoContainerEl = document.querySelector('#repos-container');
var repoSearchTerm = document.querySelector('#repo-search-term');
var APIkey = "9224a31a8f614cd716db93686de7f9c6";
var formSubmitHandler = function (event) {
  event.preventDefault();

  var cityName = cityInputEl.value.trim();

console.log(cityName);
  //this if statement checks to make sure there was something inputted into the city input
  if (cityName) {
    getUserCities(cityName);
fiveDayForecast(cityName)
      cityInputEl.value = '';
  } else {
    alert('Please enter a city name');
  }
};


//this is the function that fetches the weather app api and uses and if statement to check for an response
var getUserCities = function (city) {
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=imperial`
  
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log("API response",data)
          displayWeather(data);
          // fiveDayForecast(city);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to Weather API');
    });
};


function fiveDayForecast(city) {
  var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIkey}&units=imperial`
 console.log(apiUrl,"five");
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log("API response",data)
          
          let HTMLstring = '';

          for(let i=0; i<data.list.length; i=i+8) {

             HTMLstring = `<div class="card">
            <p>Temp: ${data.list[i].main.temp}</p>
            <p>Humidity: ${data.list[i].main.humidity}</p>
            <p>Wind Speed: ${data.list[i].wind.speed}</p>
            <p>${data.list[i].weather[0].description}</p>
            <img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png"></img>
            </div>`
          }
       
        });
        console.log(HTMLstring),data.list.length;
        document.getElementById("five-day").innerHTML = HTMLstring;
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    // .catch(function (error) {
    //   alert('Unable to connect to Weather API');
    // });
}


function displayWeather (data) {
  var HTMLstring = `<div class="card">
  <p>Temp: ${data.main.temp}</p>
  <p>Humidity: ${data.main.humidity}</p>
  <p>Wind Speed: ${data.wind.speed}</p>
  <p>${data.weather[0].description}</p>
  <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"></img>
  </div>`
  console.log(HTMLstring);
  document.getElementById("currentweather").innerHTML = HTMLstring
  // if (repos.length === 0) {
  //   repoContainerEl.textContent = 'No cities found.';
  //   return;
  // }

  // repoSearchTerm.textContent = searchTerm;

  // for (var i = 0; i < repos.length; i++) {
  //   var repoName = repos[i].owner.login + '/' + repos[i].name;

  //   var repoEl = document.createElement('div');
  //   repoEl.classList = 'list-item flex-row justify-space-between align-center';

  //   var titleEl = document.createElement('span');
  //   titleEl.textContent = repoName;

  //   repoEl.appendChild(titleEl);

  //   var statusEl = document.createElement('span');
  //   statusEl.classList = 'flex-row align-center';

  //   if (repos[i].open_issues_count > 0) {
  //     statusEl.innerHTML =
  //       "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
  //   } else {
  //     statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
  //   }

  //   repoEl.appendChild(statusEl);

  //   repoContainerEl.appendChild(repoEl);
  // }
};

cityFormEl.addEventListener('submit', formSubmitHandler);
