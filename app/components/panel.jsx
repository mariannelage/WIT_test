'use client';

import React, { useEffect, useState } from 'react';

export default function Panel({ cityInput }) {
  const [city, setCity] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [filteredTemps, setFilteredTemps] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    if (!cityInput) return;  

    const fetchData = async () => {
      setLoading(true);  

      try {
        const cityResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=bfe5a149c540c0c24b78852de06e5f62`
        );

        if (!cityResponse.ok) throw new Error("There was an error getting the city data, check if it is correctly written");

        const cityData = await cityResponse.json();
        setCity(cityData);

        const { lat, lon } = cityData.coord;

        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=30&units=metric&appid=bfe5a149c540c0c24b78852de06e5f62`
        );

        if (!forecastResponse.ok) throw new Error("There was an error getting the forecast, please refresh");

        const forecastData = await forecastResponse.json();
        setForecast(forecastData);

        const filtered = filterTemps(forecastData.list);
        setFilteredTemps(filtered);
      } catch (err) {
        setError(err.message);  
      } finally {
        setLoading(false);  
      }
    };

    fetchData();
  }, [cityInput]);  

  const filterTemps = (dataDays) => {
    return dataDays.reduce((result, data) => {
      const date = data.dt_txt.split(' ')[0]; 
      const temp = data.main.temp;

      if (!result[date]) {
        result[date] = { maxTemp: temp, minTemp: temp };
      } else {
        result[date].maxTemp = Math.max(result[date].maxTemp, temp);
        result[date].minTemp = Math.min(result[date].minTemp, temp);
      }

      return result;
    }, {}); 
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;  
  if (!city || !forecast) return <div>Nothing to show</div>; 

  return (
    <div className="grid items-center justify-items-center">
      <div>In {city.name} it's currently {city.main.temp}ºC</div>
      <ul className="grid grid-cols-2 lg:grid-cols-5 items-center gap-8 sm:mt-10">
        {Object.keys(filteredTemps).map((date) => (
          <li key={date} className="text-indigo-400 h-full">
            <div className="rounded-xl bg-white shadow-md md:max-w-2xl px-4 py-8 h-full">
              {date}: low {filteredTemps[date].minTemp}ºC & high {filteredTemps[date].maxTemp}ºC
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
