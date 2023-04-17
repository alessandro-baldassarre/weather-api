import { ChangeEvent, ReactElement, useEffect, useState } from "react"
import ForecastComp from "./components/Forecast"
import Search from "./components/Search"
import { useDebounce } from "./hooks/useDebounce"
import { Option, Forecast } from "./types"



export default function App(): ReactElement {
    const [term, setTerm] = useState<string>("")
    const [options, setOptions] = useState<Option[]>([])
    const [city, setCity] = useState<null | Option>(null)
    const [forecast, setForecast] = useState<null | Forecast>(null)

    const debouncedTerm = useDebounce(term, 1000)

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTerm(e.target.value)
    }

    const onOptionSelect = (option: Option) => {
        setTerm(option.name)
        setCity(option)
        setOptions([])
    }

    const fetchWeatherData = async () => {
        try {
            if (city) {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${import.meta.env.VITE_API_KEY}`)
                const data = await response.json()
                const forecastData = {
                    ...data.city, list: data.list.slice(0, 16)
                }
                setForecast(forecastData)
            }

        } catch (error) {
            console.log(error)

        }
    }


    const fetchGeo = async () => {
        try {
            const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${debouncedTerm}&limit=5&appid=${import.meta.env.VITE_API_KEY}`)
            const data = await response.json()
            setOptions(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (debouncedTerm) {
            fetchGeo()
        }
        else {
            setOptions([])
        }
    }, [debouncedTerm])


    return (
        <main className="grid place-items-center w-screen h-screen bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900">
            {
                forecast
                    ? <ForecastComp forecast={forecast} />
                    : <Search term={term} options={options} onOptionSelect={onOptionSelect} onInputChange={onInputChange} fetchWeatherData={fetchWeatherData} />
            }
        </main>
    )
}
