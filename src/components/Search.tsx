import { ChangeEvent, ReactElement } from "react"
import { Option } from "../types"

interface SearchProps {
    options: Option[]
    term: string,
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void,
    onOptionSelect: (option: Option) => void,
    fetchWeatherData: () => void,
}

export default function Search({ options, term, onInputChange, onOptionSelect, fetchWeatherData }: SearchProps): ReactElement {
    return (
        <section className="w-full md:max-w-[500px] p-4 flex flex-col gap-3 text-center items-center justify-center md:px-10 h-full lg:h-[500px] bg-white bg-opacity-20 backdrop-blur-lg md:rounded-xl drop-shadow-lg text-white">
            <h1 className="text-4xl font-thin">Weather <span className="font-bold">Forecast</span></h1>
            <p className="text-sm">
                Enter below a place you want to know the weather of and select an option from the dropdown
            </p>

            <div className="flex mt-10 relative">
                <input type="text" className="py-1 px-3 outline-none text-zinc-700 border-2 border-zinc-100" value={term} onChange={onInputChange} />
                <ul className="absolute top-9 bg-white text-zinc-700 rounded-b-md ">
                    {options.map((option, index) => {
                        return (
                            <li key={option.name + '-' + index} className="cursor-pointer hover:bg-zinc-700 hover:text-white px-3" onClick={() => onOptionSelect(option)}>{option.name}</li>
                        )
                    })}
                </ul>
                <button className="rounded-r-md border-2 border-zinc-100 hover:border-black hover:text-black text-zinc-100 px-2 py-1" onClick={fetchWeatherData}>search</button>
            </div>
        </section>
    )
}
