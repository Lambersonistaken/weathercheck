/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'

const Weather = () => {

    const [weather, setWeather] = useState(null)
    const [city, setCity] = useState('Istanbul')

    async function fetchData () {

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`)
            const data = await response.json()
            setWeather(data)
            console.log(data)
        }
        catch (error) {
            console.log(error)
        }
        
    }

    useEffect(() => {
        fetchData();
    }, [])

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
        <input value={city} onChange={handleInput} className="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-3 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Check weather..."/>
      </div>

      <div className='w-2/4 mx-auto mt-8'>
        <button onClick={handleSubmit} className='w-full px-3 py-3 bg-gradient-to-r from-gray-200 to-slate-400 text-black font-light rounded-md hover:opacity-80 transition-opacity duration-300'>Get weather</button>
      </div>

      <section className='weather-container px-4 py-4 mt-20 flex flex-col gap-4'>

        <div>
            <div className='basic-city-info w-4/6'>

            </div>

            <div className='hourly-weather-info w-11/12'>

            </div>
        </div>

        <div className='weekly-weather-info w-4/6'>

        </div>

      </section>

    </div>
  )
}

export default Weather
