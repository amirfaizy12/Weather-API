var data;
var date = [];
var displayElm = document.getElementById("weatherCast");
var srcs= [];
async function getWither(x = "cairo") {
    var x = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=245bc45a2a584dd8ad772533241112&q=${x}&days=3`)
    if (x.ok && x.status != 400) {
        data = await x.json();
        console.log(data);

        getSpecialImg();
        console.log(srcs);
        
        display();

    }
}

getWither();
function getSpecialImg(){
    srcs = [];
    for (var i=0; i< 3; i++) {
        console.log("Condition:", src);
        var src = data.forecast.forecastday[i].day.condition.text;
        if(src === "Clear"){
            srcs.push('imgs/113.webp');
        }else if(src.trim() === "Partly Cloudy"){
            srcs.push('imgs/116.png');
        }else if(src.trim() === "Sunny"){
            srcs.push('imgs/113.png');
        }else if(src.trim() === "Overcast"){
            srcs.push('imgs/143.png');
        }else if(src.trim() === "Patchy rain nearby"){
            srcs.push('imgs/176.webp');
        }else{
            srcs.push('imgs/113.webp');
        }
    }
}

var searchInput = document.querySelector("#search");
searchInput.addEventListener("input", async function () {
    date = [];
    await getWither(searchInput.value);
    getdate();
    console.log(convertDatesToDays(date));

});
function getdate() {
    for (var i = 0; i < 3; i++) {
        var d = new Date(data.forecast.forecastday[i].date);
        date.push(d.toLocaleDateString('en-US'));
    }
    console.log(date);
}

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function convertDatesToDays(dates) {
    return dates.map(dateStr => {
        const date = new Date(dateStr); // تحويل النص إلى كائن تاريخ
        return daysOfWeek[date.getDay()]; // استخراج اسم اليوم بناءً على رقمه
    });
}

function display() {
    displayElm.innerHTML = `
    <div class="todayweather weather-card col-4">
        <div class="card-header d-flex justify-content-between">
            <p class="day">${date[0]}</p>
            <p class="date">${data.forecast.forecastday[0].date}</p>
        </div>
        <div class="card-content">
            <h3>${data.location.name}</h3>
            <h2>${data.forecast.forecastday[0].day.maxtemp_c} <sup>o</sup> c</h2>
            <img src="${srcs[0]}" width="90" alt="">
            <p>${data.forecast.forecastday[0].day.condition.text}</p>
        </div> 
        <div class="card-footer">
            <span>
                <img src="imgs/icon-umberella.png" alt="">
                20%
            </span>
            <span>
                <img src="imgs/icon-wind.png" alt="">
                18km/h
            </span>
            <span>
                <img src="imgs/icon-compass.png" alt="">
                East
            </span>
        </div>
    </div>
    <div class="mid-card weather-card text-center col-4">
        <div class="card-header ">
            <p class="day">${date[1]}</p>
        </div>
        <div class="card-content text-center">
            <img src="${srcs[1]}" width="90" alt="">
            <h5>${data.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>c</h5>
            <div class="degree">${data.forecast.forecastday[1].day.mintemp_c} <sup>o</sup></div>
            <p>${data.forecast.forecastday[1].day.condition.text}</p>
        </div> 
            
    </div>
    <div class="weather-card text-center col-4">
        <div class="card-header ">
            <p class="day">${date[2]}</p>
        </div>
        <div class="card-content text-center">
        <img src="${srcs[2]}" width="90" alt="">
            <h5>${data.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>c</h5>
            <div class="degree">${data.forecast.forecastday[2].day.mintemp_c} <sup>o</sup></div>
            <p>${data.forecast.forecastday[2].day.condition.text}</p>
        </div> 
            
    </div>
    `;
}


