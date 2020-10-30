let buttonsSet = document.getElementsByClassName('control');
const ghinfo = document.getElementById('gh');
// let canvas = document.getElementById('resp');
// const weather = document.getElementById('weather');
const weatherByNane = document.getElementById('weatherByName');

ghinfo.onclick = () => {
  let canvas = document.getElementById('resp');
  canvas.innerHTML = '';
  fetch('https://api.github.com/users/Yurii19').then((response) => { return response.json(); }).
    then((data) => {
      console.log(data);
      for (const key in data) {
        canvas.innerHTML += '<b>' + key + '</b> : ' + data[key] + '<hr/>';
      }
    });
};

// weather.onclick = () => {
//   let canvas = document.getElementById('resp');

//   canvas.innerHTML = '';
//   fetch('https://api.openweathermap.org/data/2.5/onecall?lat=50.657768&lon=17.869884&appid=18141911a2204318380aeeac3872a83f&units=metric').
//   then((response) => { return response.json(); }).
//     then((data) => {
//       console.log(data.current.weather);
//       for (const key in data.current) {
//         canvas.innerHTML += '<b>' + key + '</b> : ' + data.current[key] + '<hr/>';
//       }
//     });
// };

weatherByNane.onclick = () => {
  let canvas = document.getElementById('resp');
  let city = document.getElementById('city_name').value;
  // alert(city.value);
  const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ city +'&appid=18141911a2204318380aeeac3872a83f&units=metric';
  canvas.innerHTML = '';
  fetch(url).then((response) => { return response.json(); }).
    then((data) => {
      console.log(data);
      
      if(data.cod !==200 ){
        alert('error, unput correct city name');
        
      } else {
        this.setMainTitle('Weather in '+city);
    }
      const dataToShow = data.main;
      for (const key in dataToShow) {
        canvas.innerHTML += '<b>' + key + '</b> : ' + dataToShow[key] + '<hr/>';
      }
    }).catch(error => alert(error));
};

function setMainTitle(text){
  document.getElementById('main_header').innerHTML = text;
}

function clearMainTitle(){
  document.getElementById('main_header').innerHTML = '';
}