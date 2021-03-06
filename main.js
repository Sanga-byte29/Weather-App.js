const api = {
  key: "b341fecc26f5f1040ac9d1ffa66d15ac",
  base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt){
  if(evt.keyCode == 13){//13 means when we press enter key then it will store the value in console
    getResults(searchbox.value);
    console.log(searchbox.value);
  }
}

function getResults (query)
{
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
  .then(weather => {
    return weather.json();//json file will appear..
  }).then(displayResults);
}

function displayResults(weather)
{
  console.log(weather);
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;
  
  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerHTML = `${Math.round(weather.main.temp_min)}°c / ${Math.round
    (weather.main.temp_max)}°c`;

  // let wind = document.querySelector('.wind');
  // wind.innerText = `${weather.main.temp_min}degree / ${weather.main.temp_max}degree`;
  let windSpeed = document.querySelector('.current .windSpeed');
  windSpeed.innerHTML = `${weather.wind.speed} m/s`;
}
function dateBuilder (d){
  let months = ["January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", 
  "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
