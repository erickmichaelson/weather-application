var cityFormEl = document.querySelector('#city-form');
var cityInputEl = document.querySelector('#city-name');
var repoContainerEl = document.querySelector('#repos-container');
var repoSearchTerm = document.querySelector('#repo-search-term');

var formSubmitHandler = function (event) {
  event.preventDefault();

  var cityName = cityInputEl.value.trim();


  //this if statement checks to make sure there was something inputted into the city input
  if (cityName) {
    getUserRepos(cityName);

    repoContainerEl.textContent = '';
    cityInputEl.value = '';
  } else {
    alert('Please enter a city name');
  }
};


//this is the function that fetches the weather app api and uses and if statement to check for an response
var getUserCities = function (user) {
  var apiUrl = 'http://maps.openweathermap.org/maps/2.0/weather/{op}/{z}/{x}/{y}&appid={9224a31a8f614cd716db93686de7f9c6}';

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayRepos(data, user);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to Weather API');
    });
};


var displayRepos = function (repos, searchTerm) {
  if (repos.length === 0) {
    repoContainerEl.textContent = 'No cities found.';
    return;
  }

  repoSearchTerm.textContent = searchTerm;

  for (var i = 0; i < repos.length; i++) {
    var repoName = repos[i].owner.login + '/' + repos[i].name;

    var repoEl = document.createElement('div');
    repoEl.classList = 'list-item flex-row justify-space-between align-center';

    var titleEl = document.createElement('span');
    titleEl.textContent = repoName;

    repoEl.appendChild(titleEl);

    var statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';

    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    repoEl.appendChild(statusEl);

    repoContainerEl.appendChild(repoEl);
  }
};

cityFormEl.addEventListener('submit', formSubmitHandler);
