'use client';

import React, { useEffect, useState } from 'react';

export default function Panel({ cityInput }) {
  const [city, setCity] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [filteredTemps, setFilteredTemps] = useState({});

  useEffect(() => {
    const cityInput = "Porto";
    const fetchData = async () => {
      // Fetch city data
      const dataCity = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=bfe5a149c540c0c24b78852de06e5f62`
      );
      const cityData = await dataCity.json();
      setCity(cityData);

      console.log(cityData);

      const lat = cityData.coord.lat;
      const lon = cityData.coord.lon;

      const dataForecast = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=30&units=metric&appid=bfe5a149c540c0c24b78852de06e5f62`
      );
      const forecastData = await dataForecast.json();
      setForecast(forecastData);

      const filtered = filterTemps(forecastData.list);
      setFilteredTemps(filtered);
    };

    fetchData();
  }, [cityInput]);

  const filterTemps = (dataDays) => {
    const result = {};

    dataDays.forEach((data) => {
      const date = data.dt_txt.split(' ')[0]; 
      const temp = data.main.temp;

      if (!result[date]) {
        result[date] = { maxTemp: temp, minTemp: temp };
      }

      if (temp > result[date].maxTemp) {
        result[date].maxTemp = temp;
      }

      if (temp < result[date].minTemp) {
        result[date].minTemp = temp;
      }
    });

    return result;
  };

  if (!city || !forecast) return <div>Loading...</div>;

  return (
    <div className="grid items-center justify-items-center">
      <div>In {city.name}, it is currently {city.main.temp}ºC</div>
      <ul className="grid grid-columns-5 items-center gap-8 sm:pt-20">
        {Object.keys(filteredTemps).map((date) => (
          <li key={date} className=" text-indigo-400">
            {date}: low {filteredTemps[date].minTemp}ºC and high {filteredTemps[date].maxTemp}ºC
          </li>
        ))}
      </ul>
    </div>
  );
}
