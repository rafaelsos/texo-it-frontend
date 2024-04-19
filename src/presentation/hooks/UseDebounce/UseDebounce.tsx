import { SetStateAction, useState } from 'react'

let timer: ReturnType<typeof setTimeout>

const debounce = <TFn extends (...args: any[]) => any>(
  callback: TFn,
  timeout: number = 500
) => {
  return (...params: Parameters<TFn>) => {
    clearTimeout(timer)

    timer = setTimeout(() => callback(...params), timeout)
  }
}

export const useStateDebounce = (
  initialValue: any,
  timeout = 500
): [typeof initialValue, (value: SetStateAction<any>) => void] => {
  const [value, setValue] = useState<typeof initialValue>(initialValue)
  const setValueDebounce = debounce(setValue, timeout)

  return [value, setValueDebounce]
}
