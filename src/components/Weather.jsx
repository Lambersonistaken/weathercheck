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
      <div className="w-2/4 xl:w-[650px] mx-auto mt-10">
        <input value={city} onChange={handleInput} className="w-full xl:py-5 mx-auto bg-transparent placeholder:text-slate-400 placeholder:font-light text-white text-sm border border-slate-200 rounded-md px-3 py-3 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Check weather..."/>
      </div>

      <div className='w-2/5 xl:w-[350px] mx-auto mt-8'>
        <button onClick={handleSubmit} className='w-full mx-auto px-3 py-3 xl:py-5 bg-gradient-to-r from-gray-200 to-slate-400 text-black font-normal rounded-md hover:opacity-80 transition-opacity duration-300'>Get weather</button>
      </div>

      {weather && (
    <section className='weather-container px-4 py-4 mt-20 flex flex-col items-center justify-center gap-12'>

        
          <div className='basic-city-info flex flex-row w-[289px] lg:w-[400px] 2xl:w-[500px] 2xl:py-4 2xl:gap-32 px-6 py-2 rounded-2xl items-center lg:justify-center lg:gap-16 justify-between bg-gradient-to-br from-zinc-800 hover:opacity-80 transition-opacity duration-300 to-zinc-900 text-white'>
        <div className='flex flex-col gap-4 p-2'>
            <h2 className='text-2xl lg:text-3xl'>{weather.name}</h2>
            <p className='text-slate-300'>{time} • {day}</p>
            <h1 className='text-4xl lg:text-5xl'>{Math.floor(weather.main.temp)}°</h1>
        </div>
        <img width={80} className='lg:w-[120px] 2xl:w-[150px]' src={weather.weather[0].description === "few clouds" ? "../../public/sun-cloudy.svg" : `../../public/${weather.weather[0].main}.svg`} alt="" />
          </div>

          <div className='hourly-weather-info hover:opacity-80 transition-opacity duration-300 w-11/12 bg-gradient-to-br from-slate-800 rounded-2xl to-slate-900 flex flex-row gap-4 items-center justify-center text-white'>
            {forecast && (

            <div className='forecast transition-opacity hover:opacity-80 duration-300'>
              <div className='forecast- flex flex-row gap-10 py-8 px-8 items-center justify-between md:gap-14 lg:gap-20 xl:gap-28 2xl:gap-48'>
                {forecast.map((item, index) => (
                  <div key={index} className='forecast-day flex flex-col gap-8 items-center text-center justify-center'>
                    <p className='2xl:text-2xl'>{new Date(item.dt * 1000).toLocaleDateString("en-US", {
                weekday: "short",
              })}</p>
                    <img className='lg:w-[100px] 2xl:w-[120px]' src={item.weather[0].description === "few clouds" ? "../../public/sun-cloudy.svg" : `../../public/${item.weather[0].main}.svg`} alt="" />
                    <p className='text-2xl 2xl:text-4xl'>{Math.floor(item.main.temp)}°</p>
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
