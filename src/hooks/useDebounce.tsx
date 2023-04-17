import { useEffect, useState } from "react"

export const useDebounce = (value: string, delay = 500): string | null => {
    const [debouncedValue, setDebouncedValue] = useState<string | null>(null)

    useEffect(() => {
        const id = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => {
            clearTimeout(id)
        }

    }, [value, delay])

    return debouncedValue
}
