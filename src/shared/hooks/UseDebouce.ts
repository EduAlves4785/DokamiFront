import { useCallback, useRef } from "react"

export const useDebounce = (delay = 300, notDelayinFirstTime = true) => {

    const deboucing = useRef<NodeJS.Timeout>(null)
    const isFirtsTime = useRef(notDelayinFirstTime)

    //O useDebounce é um hook personalizado que cria
    //  uma função de debounce. A função de debounce
    //  é usada para limitar a taxa de execução 
    // de uma função, garantindo que ela só seja 
    // chamada após um certo período de tempo desde
    //  a última vez que foi invocada. Isso é útil 
    // para otimizar o desempenho em situações onde
    //  uma função pode ser chamada com muita 
    // frequência, como em eventos de digitação 
    // ou rolagem.
    const debounce = useCallback((func: () => void) => {
        if (isFirtsTime.current) {
            isFirtsTime.current = false
            func()
        } else {
            if (deboucing.current) {
                clearTimeout(deboucing.current)
            }
            deboucing.current = setTimeout(() => func(), delay)
        }






    }, [delay])

    return { debounce }
}