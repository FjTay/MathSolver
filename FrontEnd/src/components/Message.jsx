import { useContext, useMemo } from "react"
import { SolutionContext } from "../contexts/SolutionContext"

const Message = () => {

    const {currentSolution : { updatedAt, message, currentID }} = useContext(SolutionContext)

    const text = useMemo(() =>
        <h3 key={Math.random()}>You're working on Solution N° {currentID}</h3>
    , [currentID])

    const actionMessage = useMemo(() =>
        <h3 className="actionMessage" key={Math.random()}>{message}</h3>
    , [message, updatedAt])
    
    return (
        <div className="messageArea">
            <div>{parseInt(currentID, 10) ? text : null}</div>
            <div>{actionMessage}</div>
        </div>
    )
}

export default Message