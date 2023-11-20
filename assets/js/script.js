console.log("js is ON");

const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');


const apiKey = '98283a575e014dcdf5df3107b122237e';

search.addEventListener('click', ()=>{
    
    const city = document.querySelector('.search-box input').value;
    if (city == '')
        return;


    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`).then(response => response.json()).then(json => {

        if (json.cod == '404') {
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;

        } else {
            container.style.height = '555px';
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');
        }
        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');
        const weather = json.weather;

        console.log(json);

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = "assets/img/clear.png"
                break;

                case 'Rain':
                    image.src = "assets/img/rain.png"
                    break;
    
                case 'Snow':
                    image.src = "assets/img/snow.png"
                    break;
            
                case 'Clouds':
                    image.src = "assets/img/cloud.png"
                    break;
        
                case 'Mist':
                    image.src = "assets/img/mist.png"
                    break;

                case 'Haze':
                    image.src = "assets/img/rain.png"
                    break;
                
            default:
                image.src = "assets/img/rain.png"
                break;
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;


    });

});