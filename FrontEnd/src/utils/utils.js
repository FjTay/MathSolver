export function checkValueAvailability (event, gameSet) {
    const formValues = [...gameSet.current.elements].reduce((acc, elem) => 
        elem.tagName === "INPUT" ? [...acc, elem.value, 10] : acc
    , [])
    return formValues.indexOf(event.key) > -1
}

export function getTimeStamp () {return Math.floor(new Date().getTime())}