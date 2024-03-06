import './Weather.css';
import { useState } from 'react';

function App() {

    const apiKey = "cc922dbe3c3188a573ff1966c44decd9";
    const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState('')

    const search = evt => {
        if (evt.key === "Enter") {
            fetch(`${baseUrl}?q=${query}&units=metric&APPID=${apiKey}`).then(res => res.json()).then(result => {
                console.log(result);
                console.log("hello")
                setWeather(result);
                setQuery('')
            }
            )
        }
    }

    const dateBuilder = (d) => {
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

        let day = days[d.getDay()];
        let month = months[d.getMonth()];
        let date = d.getDate();
        let year = d.getFullYear();

        return `${date} ${day} ${month} ${year}`
    }

    return (
        <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? "app-warm" : "app-cold") : "app-cold"}>
            <div className="main">
                <div className="search-box">
                    <input className="search-bar" type="text" value={query} placeholder="Search..." onChange={e => setQuery(e.target.value)} onKeyPress={search} />
                </div>
                <div>
                    {weather && weather.name && weather.sys ?
                        <div className="location-box">
                            <div className="location">
                                {weather.name}, {weather.sys.country}
                                <div className="date">
                                    {dateBuilder(new Date())}
                                </div>
                            </div>
                        </div>
                        : null}
                    {weather && weather.main && weather.main.temp ?
                        <div className="weather-box">
                            <div className="temp">
                                {Math.round(weather.main.temp, 0)}°c 
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
