import './ShowDailyList.css';
import React from 'react'
import { convertUTC } from '../helper_functions/helpers';

const showDaily = (props) => {

    //a check to see as the days are being mapped, if it's the current day that it adds an active class
    //to allow the day to stand out in the list.
    const checkActive = day => {
        const {dailyWeather} = props;
        if (day.dt === dailyWeather[0].dt) {
            return 'activeDay';
        }
    };

    const renderDailyList = () => {
        const {dailyWeather} = props;
        return dailyWeather.map( currentDay => {
            const day = convertUTC(`${currentDay.dt}`, 'weekday', 'short');
            const icon = "http://openweathermap.org/img/w/"+ currentDay.weather[0].icon +".png";
            const maxTemp = Math.round(currentDay.temp.max);
            const minTemp = Math.round(currentDay.temp.min);
            const isActive = checkActive(currentDay);
            return (
                <div
                    className={`dailyContainer ${isActive}`}
                    key={currentDay.dt}
                    onClick={() => props.clickedADay(currentDay, day)}
                >
                    <h5>{day}</h5>
                    <img className="weatherIconDaily" src={`${icon}`} alt="weather icon" />
                    <h5><span className="darkenText">{maxTemp}&deg;{`F `}</span>{minTemp}&deg;{`F`}</h5>
                </div>
            )
        });
    };

    return(
        <div className="dailyList">
            {renderDailyList()}
        </div>
    )

};


export default showDaily;