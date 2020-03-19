const weatherContainer = document.querySelector(".js-weather"),
    weatherTitle = weatherContainer.querySelector("h2");

const API_KEY = "16529ce8cf2a7e7476b2a4703a94ffb7";
const COORDS = "coords";

function getWeather(lat, lng) {
    URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`
    fetch(URL)
        .then(function(response) {
          return response.json();
      })
        .then(function(json) {
          console.log(json);
          const tempKelvin = json.main.temp;
          const tempCelcius = tempKelvin - 273.15;
          const tempFahren = (tempKelvin - 273.15) * 9/5 + 32; 
          const place = json.name;
          /*
          const icon = json.weather[0].icon;
          imgIcon = `http://openweathermap.org/img/w/${icon}.png`
          const image = new Image();
          image.src = imgIcon;
          weather.innerText = `온도 : ${temperature} 위치: ${place}`
          weather.appendChild(image);
          */
            
          console.log(tempKelvin);
          console.log(place);
          //console.log(weather);
          weatherTitle.innerText = `${tempFahren.toFixed(2)}°F, ${place}`;
          
      });
}
 
function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {   
        //latitude
        //longitude
        latitude: latitude,
        longitude: longitude
    }; 
    saveCoords(coordsObj); 
    getWeather(latitude, longitude);
    console.log(latitude, longitude);
}

function handleGeoError() {
    console.log("Can't access geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS); 
    
    if (loadedCoords === null){
        askForCoords();
    } else{
        
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    
    }
}

function init(){
    loadCoords();
}

init();