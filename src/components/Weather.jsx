/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import axios from "axios";

const Weather = () => {

    const [weather, setWeather] = useState(null)
    const [city, setCity] = useState("")
    const [forecast, setForecast] = useState(null)
    const date = new Date()
    let time = date.toLocaleTimeString("en-US").slice(0,4)
    let day = date.toLocaleDateString("en-US").slice(0,4)

    async function fetchData () {

        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`)
            setWeather(response.data)
            console.log(response.data)
            const forecast = await axios.get(` https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`)

            const dailyForecast = forecast.data.list.filter((item, index) => index % 8 === 0)
            setForecast(dailyForecast)
            console.log(dailyForecast)
        }
        catch (error) {
            console.log(error)
        }
        
    }   

    function handleInput(e) {
        setCity(e.target.value)
    }


    function handleSubmit(e) {
        e.preventDefault()
        fetchData()
    }

  return (
    <div>
      <div className="w-2/4 mx-auto mt-10">
        <input value={city} onChange={handleInput} className="w-full bg-transparent placeholder:text-slate-400 placeholder:font-light text-white text-sm border border-slate-200 rounded-md px-3 py-3 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Check weather..."/>
      </div>

      <div className='w-2/5 mx-auto mt-8'>
        <button onClick={handleSubmit} className='w-full px-3 py-3 bg-gradient-to-r from-gray-200 to-slate-400 text-black font-normal rounded-md hover:opacity-80 transition-opacity duration-300'>Get weather</button>
      </div>

      {weather && (
    <section className='weather-container px-4 py-4 mt-20 flex flex-col items-center justify-center gap-12'>

        
          <div className='basic-city-info flex flex-row w-[289px] px-6 py-2 rounded-2xl items-center justify-between bg-gradient-to-br from-zinc-800 hover:opacity-80 transition-opacity duration-300 to-zinc-900 text-white'>
        <div className='flex flex-col gap-4 p-2'>
            <h2 className='text-2xl'>{weather.name}</h2>
            <p className='text-slate-300'>{time} • {day}</p>
            <h1 className='text-4xl'>{Math.floor(weather.main.temp)}°</h1>
        </div>
        <img width={80} src={weather.weather[0].description === "few clouds" ? "../../public/sun-cloudy.svg" : `../../public/${weather.weather[0].main}.svg`} alt="" />
          </div>

          <div className='hourly-weather-info w-11/12 bg-gradient-to-br from-slate-800 rounded-2xl to-slate-900 flex flex-row gap-4 items-center justify-center text-white'>
            {forecast.length > 0 && (

            <div className='forecast'>
              <div className='forecast-days flex flex-row gap-12 py-8 px-4 items-center justify-center'>
                {forecast.map((item, index) => (
                  <div key={index} className='forecast-day flex flex-col gap-6 items-center justify-center'>
                    <p >{new Date(item.dt * 1000).toLocaleDateString("en-US", {
                weekday: "short",
              })}</p>
                    <img width={80} src={item.weather[0].description === "few clouds" ? "../../public/sun-cloudy.svg" : `../../public/${item.weather[0].main}.svg`} alt="" />
                    <p>{Math.floor(item.main.temp)}°</p>
                  </div>
                ))}
              </div>
            </div>
          
          )}

          </div>


    </section>
      ) }

      

    </div>
  )
}

export default Weather
