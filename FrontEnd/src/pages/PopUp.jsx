import { useContext } from "react"
import { useNavigate, useNavigation } from "react-router-dom"
import { SolutionContext } from "../contexts/SolutionContext"
import Fog from "../components/Fog"

const PopUp = () => {

    const {currentSolution : {message}} = useContext(SolutionContext)
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