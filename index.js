const currDate = document.getElementById('date');
let cnt = 7;
let apiID = "a2055af730dbdbad41af3b3d6685c62c";
const form = document.getElementById('form');
const search = document.getElementById('search');
const url = (city) => `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiID}&cnt=${cnt}`;

var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wedenesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

const getCurrentDay = () => {

    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    let currentTime = new Date();
    var date = currentTime.getDate();
    var month = currentTime.getMonth();
    var day = weekday[currentTime.getDay()];
    //console.log(weekday[currentTime.getDay()]);
    //console.log(date + " " + months[month]);

    return (date + " " + months[month] + ", " + day);
};
currDate.innerHTML = getCurrentDay();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = search.value;
    if (city) {
        searchWeather();
    }
});

searchWeather = () => {
    this.fetchWeather(document.querySelector(".search").value);
}


fetchWeather = (city) => {
    fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=a2055af730dbdbad41af3b3d6685c62c"
    ).then((response) => {
        if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
        }
        return response.json();
    }).then((data) => this.displayWeather(data));
}

displayWeather = (data) => {
    const { name } = data;
    const { description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
}

async function getWeatherByLocation(city) {
    const resp = await fetch(url(city), {
        origin: "cros"
    });
    const respData = await resp.json();
    addWeatherToPage(respData);
}

function addWeatherToPage(result) {
    const data = result.list
    const resultForecast = document.createElement('div')
    for (let i in data) {
        const temp = Ktoc(data[i].main.temp);
        resultForecast.innerHTML = resultForecast.innerHTML + ` 
        <div class="futureforecast">
            <div class="weatherforecast">
              <div class = "weatherforecastitem">
                <div class = "day">${weekday[i]}</div>
                <img src="http://openweathermap.org/img/wn/${data[i].weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp"> ${temp}&deg;C</div>
              </div>
            </div>
        </div> 
      `;
    }
    //  cleanup   
    main.innerHTML = "";
    main.appendChild(resultForecast);
};

function Ktoc(K) {
    return Math.floor(K - 273.15);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = search.value;
    if (city) {
        getWeatherByLocation(city)
    }
}); 