export function checkValueAvailability (event : React.KeyboardEvent, gameSet : React.RefObject<HTMLFormElement>) : Boolean {
    if(!gameSet.current) {
        return false
    }

    const formValues = [...gameSet.current.elements].reduce<string[]>((acc, elem) => 
        elem.tagName === "INPUT" ? [...acc, (elem as HTMLInputElement).value] : acc
    , [])
    return formValues.indexOf(event.key) > -1
}

export function getTimeStamp () : Number {return Math.floor(new Date().getTime())}