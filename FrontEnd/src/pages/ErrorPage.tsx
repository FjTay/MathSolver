import { useRouteError } from "react-router-dom";

export default function Errorpage () {
    const error : Error = useRouteError() as Error
    console.error(error)

    return <div>An error has occured !!</div>
}