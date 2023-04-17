import { ReactElement } from 'react'
import { Forecast } from '../types'

interface ForecastProps {
    forecast: Forecast
}

const Degree = ({ temp }: { temp: number }): ReactElement => {
    return (
        <span>
            {temp}<sup>o</sup>
        </span>
    )
}

export default function ForecastComp({ forecast }: ForecastProps): ReactElement {

    const today = forecast.list[0]

    return (
        <div className="w-full md:max-w-[500px] py-4 md:px-10 h-full lg:h-auto bg-white bg-opacity-20 backdrop-blur-lg rounded-lg drop-shadow-lg">
            <div className="mx-auto w-[300px]">
                <section className="text-center">
                    <h2 className="text-2xl font-black">{forecast.name}<span className="font-thin">, {forecast.country}</span></h2>
                    <h1 className="text-4xl font-extrabold">
                        <Degree temp={Math.round(today.main.temp)} />
                    </h1>
                    <p className="text-sm">
                        {today.weather[0].main} ({today.weather[0].description})
                    </p>
                    <p className="text-sm">
                        H: <Degree temp={Math.ceil(today.main.temp_max)} /> &nbsp;
                        L: <Degree temp={Math.floor(today.main.temp_min)} />
                    </p>
                </section>

                <section className="flex overflow-x-scroll mt-4 pb-2 mb-5">
                    {forecast.list.map((item, index) => (
                        <div key={index} className="inline-block text-center w-[50px] flex-shrink-0">
                            <p className="text-sm">{index === 0 ? 'Now' : new Date(item.dt * 1000).getHours()}</p>
                            <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt={`weather-icon-${item.weather[0].description}`} />
                            <p className="text-sm"><Degree temp={Math.round(item.main.temp)} /></p>
                        </div>
                    ))}
                </section>

                <section className="flex justify-between text-zinc-700">
                    <div className="w-[140px] text-xs font-bold flex flex-col items-center bg-white/20 backdrop-blur-lg rounded drop-shadow-lg py-4 mb-5">

                    </div>
                    <div className="w-[140px] text-xs font-bold flex flex-col items-center bg-white/20 backdrop-blur-lg rounded drop-shadow-lg py-4 mb-5">

                    </div>
                </section>
            </div>
        </div>
    )
}
