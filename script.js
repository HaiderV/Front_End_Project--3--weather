// https://geocoding-api.open-meteo.com/v1/search?name=Berlin&count=10&language=en&format=json
// https://wttr.in/Bengaluru?format=j1 for weather description 
// https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=uv_index_max&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m&current=is_day&timezone=auto  for weather details
// https://air-quality-api.open-meteo.com/v1/air-quality?latitude=12.9719&longitude=77.5937&hourly=pm10,pm2_5,carbon_monoxide,carbon_dioxide,nitrogen_dioxide,sulphur_dioxide,ozone&timezone=auto aqi data 



async function weatherDetails (city) {

      let response0 = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`);
      let data0 = await response0.json();
      let latitude = data0.results[0].latitude;
      let longitude = data0.results[0].longitude;


      let response1 = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=uv_index_max&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m&current=is_day&timezone=auto`);
      let data1 = await response1.json();
      let uvIndex = data1.daily.uv_index_max[0];
      let temperature = data1.hourly.temperature_2m[0];
      let humidity = data1.hourly.relative_humidity_2m[0];
      let windSpeed = data1.hourly.wind_speed_10m[0];
      let isDay = data1.current.is_day === 1 ? "day" : "night";
    //   let weatherCode = data1.current.weather_code;


    //   let response2 = await fetch(`https://wttr.in/${city}?format=j1`);
    //   let data2 = await response2.json();
    //   let weatherCode = data2.current_condition[0].weatherDesc[0].value;

      let response3 = await fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&hourly=pm10,pm2_5,carbon_monoxide,carbon_dioxide,nitrogen_dioxide,sulphur_dioxide,ozone&timezone=auto`)
      let data3 = await response3.json();
      let aqi = data3.hourly.pm2_5[0];
      return {
        // weatherCode,
        city,
        isDay,
        uvIndex,
        temperature,
        humidity,
        windSpeed,
        aqi
      }
}

let weather1 = document.getElementById("weather1");
let weather2 = document.getElementById("weather2");
let weather3 = document.getElementById("weather3");
let weather4 = document.getElementById("weather4");

let humidity1 = document.getElementById("humidity1");
let humidity2 = document.getElementById("humidity2");
let humidity3 = document.getElementById("humidity3");
let humidity4 = document.getElementById("humidity4");

let uv1 = document.getElementById("uv1");
let uv2 = document.getElementById("uv2");
let uv3 = document.getElementById("uv3");
let uv4 = document.getElementById("uv4");

let day_night1 = document.getElementById("img1");
let day_night2 = document.getElementById("img2");
let day_night3 = document.getElementById("img3");
let day_night4 = document.getElementById("img4");


(async () => {
    let data = await weatherDetails("New Delhi");
    weather1.innerText = `${data.temperature}°C`;
    humidity1.innerText = `Humidity: ${data.humidity}%`;
    uv1.innerText = `UV Index: ${data.uvIndex}`;
    if(data.isDay === "day"){
        day_night1.src = "sunny.png";
        if (document.getElementById("search_weather").classList.contains("dark_bg")) {
                    document.getElementById("search_weather").classList.remove("dark_bg");
                };
    } else {
        day_night1.src = "moon.png";
        document.getElementById("city_1").classList.add("dark_bg");
    }
})();

(async () => {
    let data = await weatherDetails("Bengaluru");
    weather2.innerText = `${data.temperature}°C`;
    humidity2.innerText = `Humidity: ${data.humidity}%`;
    uv2.innerText = `UV Index: ${data.uvIndex}`;
    if(data.isDay === "day"){
        day_night2.src = "sunny.png";
        if (document.getElementById("search_weather").classList.contains("dark_bg")) {
                    document.getElementById("search_weather").classList.remove("dark_bg");
                };
    } else {
        day_night2.src = "moon.png";
        document.getElementById("city_2").classList.add("dark_bg");
    }
})();

(async () => {
    let data = await weatherDetails("London");
    weather3.innerText = `${data.temperature}°C`;
    humidity3.innerText = `Humidity: ${data.humidity}%`;
    uv3.innerText = `UV Index: ${data.uvIndex}`;
    if(data.isDay === "day"){
        day_night3.src = "sunny.png";
        if (document.getElementById("search_weather").classList.contains("dark_bg")) {
                    document.getElementById("search_weather").classList.remove("dark_bg");
                };
    } else {
        day_night3.src = "moon.png";
        document.getElementById("city_3").classList.add("dark_bg"); 
    }
})();

(async () => {
    let data = await weatherDetails("Paris");
    weather4.innerText = `${data.temperature}°C`;
    humidity4.innerText = `Humidity: ${data.humidity}%`;
    uv4.innerText = `UV Index: ${data.uvIndex}`;
    if(data.isDay === "day"){
        day_night4.src = "sunny.png";
        if (document.getElementById("search_weather").classList.contains("dark_bg")) {
            document.getElementById("search_weather").classList.remove("dark_bg");
        };
    } else {
        day_night4.src = "moon.png";
        document.getElementById("city_4").classList.add("dark_bg");
    }
})();

let cancel_btn = document.getElementById("cancel_btn");

let search_bar = document.getElementById("city_input");
search_bar.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        let search_city = search_bar.value;
        document.getElementById("popular_cities").classList.add("hide");
        cancel_btn.classList.remove("hide");
        document.getElementById("search_city").classList.remove("hide");
        (async () => {
            try {
            let data = await weatherDetails(search_bar.value);
            document.getElementById("search_city_name").innerText = data.city;
            document.getElementById("temperature").innerText = `${data.temperature}°C`;
            document.getElementById("humidity").innerText = `Humidity: ${data.humidity}%`;
            document.getElementById("uv").innerText = `UV Index: ${data.uvIndex}`;
            document.getElementById("aqi").innerText = `Air Quality Index: ${data.aqi}`;
            document.getElementById("wind_speed").innerText = `Wind Speed: ${data.windSpeed} km/h`;
            console.log(data);
            if(data.isDay === "day"){
                document.getElementById("search_img").src = "sunny.png";
                if (document.getElementById("search_weather").classList.contains("dark_bg")) {
                    document.getElementById("search_weather").classList.remove("dark_bg");
                };
            } else {
                document.getElementById("search_img").src = "moon.png";
                document.getElementById("search_weather").classList.add("dark_bg");
            }
            } catch (error) {
                document.getElementById("search_city_name").innerText = "City not found!";
                document.getElementById("temperature").innerText = `--`;
                document.getElementById("humidity").innerText = `--`;
                document.getElementById("uv").innerText = `--`;
                document.getElementById("aqi").innerText = `--`;
                document.getElementById("wind_speed").innerText = `--`;
            }
        })();
    }
})

search_bar.addEventListener("input", () => {
  if (search_bar.value.trim() === "") {
    cancel_btn.classList.add("hide");
    document.getElementById("popular_cities").classList.remove("hide");
    document.getElementById("search_city").classList.add("hide");
  }
});

cancel_btn.addEventListener("click", () => {
    document.getElementById("popular_cities").classList.remove("hide");
    cancel_btn.classList.add("hide");
    document.getElementById("search_city").classList.add("hide");
    search_bar.value = "";
    search_bar.focus();
});