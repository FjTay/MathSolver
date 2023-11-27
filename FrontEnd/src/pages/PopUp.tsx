import { useContext } from "react"
import { useNavigate, useNavigation } from "react-router-dom"
import { SolutionContext } from "../contexts/SolutionContext"
import Fog from "../components/Fog"
import { SolutionContextValue } from "../contexts/SolutionContext"

interface PopUpProps {}

const PopUp : React.FC<PopUpProps> = () => {

    const { currentSolution : { message } } = useContext(SolutionContext) as SolutionContextValue
    const navigation = useNavigation()
    const navigate = useNavigate()

    return (
        <>
            <Fog zIndex={5}/>
            <div
                key="popUp"
                id="popUp"
            >
                <div
                    id="popClose"
                    onClick={() => navigate("/allSolutions")}
                >&#x2573;</div>
                {navigation.state === "loading" ? <h1>LOADING...</h1> : <h3>{message}</h3>}
            </div>
        </>
    )
}

export default PopUp