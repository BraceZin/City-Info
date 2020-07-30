//API info
var api = {
  key: "6594cc410a99c9a4ff8a1753d9236668",
  base: "https://api.openweathermap.org/data/2.5/",
  units:"metric"
}

//Sees if searhbox is clicked and it uses that value.
let searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);
 function setQuery(evt){
  if(evt.keyCode == 13){
    getResults(searchbox.value);
  }
}
function getResults(query){
  //fetches that api
  //https://api.openweathermap.org/data/2.5/weather?q=Brampton&units=metric&APPID=6594cc410a99c9a4ff8a1753d9236668
fetch(`${api.base}weather?q=${query}&units=${api.units}&APPID=${api.key}`)
//Then it retunrs it as JSON
  .then(weather =>{
  return weather.json();
  //It display results with the function
}).then(displayResults);
searchbox.value = ""
searchbox.placeholder = "Search For A City..."
  }
//Displays results
function displayResults (weather) {

  //Finds the city of the api
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country} `;
  let coord = document.querySelector('.location .coord')
 coord.innerText = `Latitude: ${weather.coord.lat} 
 Longitude: ${weather.coord.lon}`
  let state = document.querySelector('.current .state');
state.innerText = `${weather.weather[0].main}`

  let description = document.querySelector('.current .description');
description.innerText =`Description: ${weather.weather[0].description}`
let feel = document.querySelector('.current .feel');
feel.innerText = `Feels like: ${weather.main.feels_like}°c`

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);
//Finds the temp
  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

}
//Makes the date
function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//Finds that day, date, month and year with in built methods in Javascript
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
//Returns the value
  return `Date: ${day} ${date} ${month} ${year}`;
}