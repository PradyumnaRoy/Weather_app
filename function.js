const curDate = document.querySelector("#date");

let weathercon = document.getElementById("weathercon");

// //to find current city
//Async functions always return a promise. If the return value of an async function is not explicitly a promise, it will be implicitly wrapped in a promise. Note: Even though the return value of an async function behaves as if it's wrapped in a Promise.resolve , they are not equivalent.
async function findCity(locationapiURL) {
    const response = await fetch(locationapiURL);
    const data = await response.json();
    const curcity = data.city;
    apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${curcity}&appid=edfe0a1d38ae3847c1c3aad155c8652f`;
    checkWeather (apiurl,curcity)
}

//Built in function to find current location in terms of 
navigator.geolocation.getCurrentPosition((position)=>{
    //this will execute when location will be fetched successfully
    const latitude = position.coords.latitude;
    const longtitude = position.coords.longtitude;
    locationapiURL = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longtitude}&localityLanguage=en`;
    findCity(locationapiURL)
},
(error)=>{
    //This will execute when there will be any error
    console.log("can't retrieve")
})


//to get the current day
const getCurrentDay = () => {
    let currentTime = new Date();
    week = ["SUN","MON","TUES","WED","THUR","FRI","SAT"];
    return week[currentTime.getDay()];
}

//to get the current date
const getCurrentDate = () => {
    months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "June",
            "July",
            "Aug",
            "Sept",
            "Oct",
            "Nov",
            "Dec"
        ]
    let now = new Date();
    let month = now.getMonth() ;// Month indexing is start from 0 also
    let day = now.getDate();
    return `${months[month]} ${day}`;
    
}
//to get the current time
const getCurTime = () => {
    let now = new Date();
    let hours = now.getHours();
    let mins = now.getMinutes();

    let periods = "AM";
    if(hours > 11 ) {
        periods = "PM";
        if(hours > 12 )
            hours -= 12;
    }
    else {
        hours += 12;
    }
    if(mins < 10 ) {
        mins = "0"+mins;
    }
    if(hours < 10 ) {
        hours = "0"+hours;
    }
    return `${hours}:${mins} ${periods}`
}

// Day, Time & date is changing
curDate.innerHTML = getCurrentDay()+" | "+getCurrentDate()+" | "+getCurTime();


// Converting the kelvin temparature to celsius
const  kelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15);
}

//const apiurl = "https://api.openweathermap.org/data/2.5/weather?q="+"Kolkata"+"&appid=2c29bba0be59b9591bd9795931bade2a";

let search = document.querySelector("#search");
let searchimg = document.querySelector("#searchimg");

//Click event is implemented along with api url to take the location & to call the api on that particular location
searchimg.addEventListener("click",()=> {
    let location = search.value;
    apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=2c29bba0be59b9591bd9795931bade2a`;
    checkWeather(apiurl,location);
});



async function checkWeather (apiurl,location) {
    const response = await fetch(apiurl);
    var data = await response.json();
    
    //for chaning the current temparature from kelvin to celsius kelvinToCelsius() function is called
    let celcius = kelvinToCelsius(data.main.temp);
    celcius = celcius.toFixed(1);

    //for chaning the minimum & maximum temparature from kelvin to celsius
    let min = Math.round(kelvinToCelsius(data.main.temp_min));
    let max = Math.round(kelvinToCelsius(data.main.temp_max));
    let tempminmax = `Min ${min}°C | Max ${max}°C`;

    // Here the innerhtml is changing using queryselector
    document.querySelector(".temp").innerHTML = celcius+"°C";
    document.querySelector(".tempminmax").innerHTML = tempminmax;
    // console.log(location)
    document.querySelector(".location").innerHTML = location+","+data.sys.country;
    
    
    //Develop the images according to the weather condition
    let condition = document.querySelector(".condition");
    let weathercon = document.querySelector(".weather-icon");
    if(data.weather[0].main == "Clouds") {
        weathercon.src = "./Images/clouds.png";
        condition.innerHTML = "Clouds";
    }
    else if(data.weather[0].main == "Clear"){
        weathercon.src = "./Images/clear.png";
        condition.innerHTML = "Clear";
    }
    else if(data.weather[0].main == "Rain"){
        weathercon.src = "./Images/rain.png";
        condition.innerHTML = "Rain";
    }
    else if(data.weather[0].main == "Drizzle"){
        weathercon.src = "./Images/drizzle.png";
        condition.innerHTML = "Drizzle";
    }
    else if(data.weather[0].main == "Mist"){
        weathercon.src = "./Images/mist.png";
        condition.innerHTML = "Mist";
    }
    else if(data.weather[0].main == "Haze"){
        weathercon.src = "./Images/haze.png";
        condition.innerHTML = "Haze";
    }
}

