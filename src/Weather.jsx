import './Weather.css';
import { useState } from 'react';

function App() {

    const apiKey = "cc922dbe3c3188a573ff1966c44decd9";
    const baseUrl = "https://api.openweathermap.org/data/2.5/";
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState('');
    const [weather2, setWeather2] = useState('');


    const search = (evt) => {
        if (evt.key === "Enter") {
            fetch(`${baseUrl}weather?q=${query}&units=metric&APPID=${apiKey}`)
                .then((res) => res.json())
                .then((result) => {
                    console.log(result);
                    setWeather(result);
                    setQuery('');
                });
    
            fetch(`${baseUrl}forecast?q=${query}&units=metric&APPID=${apiKey}`)
                .then((res) => res.json())
                .then((result) => {
                    console.log(result);
                    setWeather2(result);
                    console.log("weather 2" + weather2);
                });
        }
    };
    

    



    const dateBuilder = (d) => {
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

        let day = days[d.getDay()];
        let month = months[d.getMonth()];
        let date = d.getDate();
        let year = d.getFullYear();

        return `${date} ${day} ${month} ${year}`
    }

    const isNight = (time) =>{
        let timestamp = new Date(time*1000);
        console.log("timestamp "+timestamp)
        let hour= timestamp.toLocaleTimeString("it-IT");
        console.log("hour "+hour)
        if(hour>17 || hour <6){
            return true;
        } else {
            return false;
        }
    }

    return (
        <div className={(typeof weather.main != "undefined") ? 
        isNight(weather.timezone)?"app-night":((weather.main.temp > 16) ? "app-warm" : "app-cold") : "app-night"}>
            <div className="main">
                <div className="search-box">
                    <input className="search-bar" type="text" value={query} placeholder="Search..." onChange={e => setQuery(e.target.value)} onKeyPress={search} />
                </div>
                <div>
                    {weather && weather.name && weather.sys ?
                        <div className="location-box">
                            <div className="location">
                                {weather.name}, {weather.sys.country} {" "}
                                
                                <i className="fa fa-map-marker"></i>
                                <br></br>
                                <br></br>
                                <div className="date">
                                    {dateBuilder(new Date())}
                                </div>
                            </div>
                        </div>
                        : null}
                    {weather && weather.main && weather.main.temp ?
                        <div className="weather-box">
                            <div className="temp">
                            <div id="icon"><img id="wicon" src={"http://openweathermap.org/img/w/"+weather.weather[0].icon+".png"} alt="Weather icon" width="100" height="80" /></div>
                                {Math.round(weather.main.temp, 0)}°                                
                            </div>
                            <div className="feels-like">
                                <p>Feels like {Math.round(weather.main.feels_like, 0)}°</p>
                            </div>
                            <div className="weather">
                                {weather.weather[0].main}
                            </div>
                        </div>
                        : null}
                </div>
            </div>

        </div>

    );
}

export default App;
