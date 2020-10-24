import React, { useState, useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import Geocode from 'react-geocode';
import openweatherOnecall from '../apis/openweatherOneCall';
import ShowWeather from './weather/ShowWeather';
import ShowDay from './weather/ShowDay';
import Header from './Header';
import ZipcodeInput from './Zipcode_Input';
import Keys from '../config.json';

const App = () => {
    const [currentWeather, setCurrentWeather] = useState({});
    const [dayClickedWeather, setdDayClickedWeather] = useState({});
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [city, setCity] = useState(null);
    const [state, setStateOfUSA] = useState(null);
    const [zip, setZip] = useState(null);
    const [errorCur, setError] = useState(false);

    //uses a call to google api to get lat and long from zipcode. Need these to properly make the call to weather api
    const getLocation = async zipcode => {
        if (!errorCur) {
            Geocode.setApiKey(Keys.keys[0].google);
            await Geocode.fromAddress(zipcode).then(
                response => {
                    const {lat, lng} = response.results[0].geometry.location;
                    const city = response.results[0].address_components[1].long_name;
                    const state = response.results[0].address_components[3].short_name;
                    setLat(lat);
                    setLng(lng);
                    setCity(city);
                    setStateOfUSA(state);
                    setZip(zipcode);
                    setError(false);
                },
                error => {
                    setError(true);
                }
            )
        }
    };

    useEffect(()=> {
        const getWeather = async() => {
            if (lat !== null && lng !== null) {
                const response = await
                openweatherOnecall.get('', {
                    params: {
                        lat: lat,
                        lon: lng,
                        exclude: "minutely",
                        units: "imperial",
                        appid: Keys.keys[0].openweather
                    }
                });
                setCurrentWeather(response.data);
            }
        };
        getWeather();
    }, [lat, lng]);


    //this happens after the getLocation finishes making it's call so we can use the lat and lng to get weather data
    // const getWeather = async () => {
    //     if (!errorCur) {
    //         debugger;
    //         const response = await openweatherOnecall.get('', {
    //             params: {
    //                 lat: latCur,
    //                 lon: lngCur,
    //                 exclude: "minutely",
    //                 units: "imperial",
    //                 appid: Keys.keys[0].openweather
    //             }
    //         });
    //         debugger;
    //         setCurrentWeather(response.data);
    //     }
    //     debugger;
    //
    // };

    const onSearchSubmit = async (zipcode, error) => {
        history.push('/');
        await setError(error);
        await getLocation(zipcode);
    };

    const onDayClick = (dayClicked, day) => {
        setdDayClickedWeather(dayClicked);
        history.push(`/${day}`);
    };

    return (
        <div className="ui container" style={{marginTop: '10px'}}>
            <Router history={history}>
                <Header/>
                <ZipcodeInput onSubmit={onSearchSubmit}/>
                <Switch>
                    <Route path="/" exact render={() =>
                        <ShowWeather
                            allWeather={currentWeather}
                            city={city}
                            state={state}
                            zip={zip}
                            error={errorCur}
                            clickedADay={onDayClick}
                        />}
                    />
                    <Route path="/:day" render={() =>
                        <ShowDay
                            dayWeather={dayClickedWeather}
                            city={city}
                            state={state}
                            zip={zip}
                            error={errorCur}
                            clickedADay={onDayClick}
                        />}
                    />
                </Switch>
            </Router>
        </div>
    );
};

export default App;