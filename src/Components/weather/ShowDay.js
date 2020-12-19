import './ShowDay.css';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import history from '../../history';
import { convertUTC } from '../helper_functions/helpers';

const ShowDay = (props) => {

    //makes sure that if there is no data, it pushes to home so that there are no errors thrown.
    useEffect(()=>{
        if(!props.dayWeather.dt) {
            history.push('/');
        }
    }, [props.dayWeather.dt]);

    //takes in the wind direction as an angle and spits out the wind direction.
    const degToCompass = num => {
        const val = Math.floor((num / 22.5) + 0.5);
        const arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        return arr[(val % 16)];
    };

    const renderChosenDay = () => {
        if (props.dayWeather.dt) {
            const {city, state, zip, dayWeather} = props;
            const icon = "http://openweathermap.org/img/w/" + dayWeather.weather[0].icon + ".png";
            const day = convertUTC(`${dayWeather.dt}`, 'weekday', 'long');
            const sunrise = convertUTC(`${dayWeather.sunrise}`, 'time', 'short');
            const sunset = convertUTC(`${dayWeather.sunset}`, 'time', 'short');
            const windDirection = degToCompass(dayWeather.wind_deg);
            const windInformation = `${windDirection} ${Math.round(dayWeather.wind_speed)}mph`;
            return (
                <section className="currentDate" key={dayWeather.dt}>
                    <div className="column50">
                        <div className="location">{`${city}, ${state} ${zip}`}</div>
                        <div className="day">{day}</div>
                        <div className="weatherDescription">{dayWeather.weather[0].description}</div>
                        <div><img className="weatherIcon" src={`${icon}`} alt="weather icon"/> <span
                            className="temperature">{`${Math.round(dayWeather.temp.day)}`}</span><span
                            className="degree">&deg;</span><span className="farenheit">{`F`}</span>
                        </div>
                        <div>
                            <span className="temperatureMax">{`Max Temperature: ${Math.round(dayWeather.temp.max)}`}</span><span
                            className="degreeSmall">&deg;</span><span className="farenheitSmall">{`F   `}</span>
                        </div>
                        <div>
                            <span className="temperatureMin">{`Min Temperature: ${Math.round(dayWeather.temp.min)}`}</span><span
                            className="degreeSmall">&deg;</span><span className="farenheitSmall">{`F`}</span>
                        </div>
                    </div>
                    <div className="column50">
                        <div>{`Clouds: ${Math.round(dayWeather.clouds)}%`}</div>
                        <div>{`Wind: ${windInformation}`}</div>
                        <div>{`Humidity: ${dayWeather.humidity}%`}</div>
                        <div>{`Sunrise: ${sunrise}`}</div>
                        <div>{`Sunset: ${sunset}`}</div>
                    </div>
                </section>
            )
        }
    }
    return(
        <div className="section">
            <h2>Forecast</h2>
            <div className="dayContainer">
                {renderChosenDay()}
            </div>
            <Link to={`/`} className="button">Back To Current Weather</Link>
        </div>
    )

};

export default ShowDay;