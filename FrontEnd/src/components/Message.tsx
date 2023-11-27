import { useContext, useMemo } from "react"
import { SolutionContext } from "../contexts/SolutionContext"
import { SolutionContextValue } from "../contexts/SolutionContext"

interface MessageProps {}

const Message : React.FC<MessageProps> = () => {

    const {currentSolution : { updatedAt, message, currentID }} = useContext(SolutionContext) as SolutionContextValue

    const currentSolution = `You're working on Solution N° ${currentID}`

    const text = useMemo(() =>
        <h3 
            key={Math.random()}
        >{currentSolution}</h3>
    , [currentID])

    const actionMessage = useMemo(() =>
        <h3 className="actionMessage" key={Math.random()}>{message}</h3>
    , [message, updatedAt])
    
    return (
        <div className="messageArea">
            {currentID ? <div>{parseInt(currentID.toString(), 10) ? text : null}</div> : ""}
            <div>{actionMessage}</div>
        </div>
    )
}

export default Message