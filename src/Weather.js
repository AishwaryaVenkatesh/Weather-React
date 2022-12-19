import React, { useState } from "react";

import axios from "axios";

export default function SearchEngine() {
  let [city, setCity] = useState(null);
  let [weather, setWeather] = useState(null);

  function updateCity(event) {
    setCity(event.target.value);
  }

  function GetCityData(city) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d346d9980b6a0b4e44b6600cc496e4ff&units=metric`;

    function handleResponse(response) {
      console.log(response.data);
      setWeather(
        <ul>
          <li>Temperature: {Math.round(response.data.main.temp)}°C</li>
          <li>Description: {response.data.weather[0].description} </li>
          <li>Humidity: {Math.round(response.data.main.humidity)}% </li>
          <li>Wind: {Math.round(response.data.wind.speed)}km/h</li>
          {/* <li>Icon: {`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`}</li> */}
        </ul>
      );
    }
    axios.get(url).then(handleResponse);
  }

  function handleSubmit(event) {
    GetCityData(city);
    event.preventDefault();
    // Need to handle empty or invalid city names here
  }

  return (
    <div className="SearchEngine">
      <form onSubmit={handleSubmit}>
        <input type="search" onChange={updateCity} />
        <input type="submit" value="Search" />
      </form>
      <div>{weather}</div>
    </div>
  );
}
