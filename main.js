let form = document.querySelector("form")
let input = document.querySelector("input")
let h5 = document.querySelector("h5")
let h6 = document.querySelector("h6")
let logo = document.querySelector(".logo")
let temp = document.querySelector(".temp")
let detail = document.querySelector(".detail")



const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const d = new Date();
let day = weekday[d.getDay()];

console.log(day)



form.addEventListener("submit" , getData)

async function getData(e){
    e.preventDefault()
    try {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=722ad69e0a4e494a8d6111424220812&q=${input.value}&aqi=yes`)
    const data = await response.json()
    console.log(data)
    let country = data.location.country
    let cityName = data.location.name
    let region = data.location.region
    let localtime = data.location.localtime
    let icon = data.current.condition.icon
    let icontext = data.current.condition.text
    let tempData = data.current.temp_c
    let wind = data.current.wind_kph
    let precipitation = data.current.precip_mm
    let pressure = data.current.pressure_mb
    h5.innerText = `${cityName}, ${region}, ${country}`
    h6.innerText = `Local Date & Time :- ${day} ${localtime}`
    logo.innerHTML = ` <img  src="https:${icon}" alt="">
                        <br> ${icontext} `

    temp.innerHTML = `<h1>${tempData} °C</h1>`

    detail.innerHTML = `Wind: ${wind} Kmph <br> Precip: ${precipitation} mm <br> Pressure: ${pressure} mb`
        
    forecast()
    
    }catch(error){
       window.alert("Enter Valid City Name")
    }



    form.reset()
}


let week = document.querySelector(".week")


async function forecast(e){
    // e.preventDefault()

    let res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=c6eaf61fb8eb4eda9de60846220812&q=${input.value}&days=5&aqi=yes&alerts=yes`)
    let forecast_data = await res.json()
    let day = forecast_data.forecast.forecastday
    let nextday = day[1].date
    let nextdayicon = day[1].day.condition.icon
    let nextdaytemp = day[1].day.avgtemp_c
    let afternextday = day[2].date
    let afternextdayicon = day[2].day.condition.icon
    let afternextdaytemp = day[2].day.avgtemp_c
    console.log(day)

     week.innerHTML = `   <div class="day">
     <span class="name">${nextday}</span>
     <i class="full_sun"><img src="https:${nextdayicon}" alt=""></i>
     <span class="temperature">${nextdaytemp}°c</span>
 </div>
 <div class="day">
     <span class="name">${afternextday}</span>
     <i class="full_sun"><img src="${afternextdayicon}""></i>
     <span class="temperature">${afternextdaytemp} °c</span>
 </div>
 `

    console.log(forecast_data)


    
}










