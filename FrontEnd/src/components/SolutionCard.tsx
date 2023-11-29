import { useMemo } from "react"
import { motion } from "framer-motion"
import SolutionCardButtonLine from "./SolutionCardButtonLine"
import { useParams } from "react-router-dom"
import { APISolution } from "../types/types"

interface SolutionCardProps {
    handleSolutionContext : Function
    userSolution : APISolution
    iscurrentSolutionID : Boolean
    show : Boolean
    index : Number
}

const SolutionCard : React.FC<SolutionCardProps>= (
    {
        handleSolutionContext,
        userSolution, 
        iscurrentSolutionID, 
        show,
        index
    }) => {

    const { dataType } : { dataType : String} = useParams()
    const { id, permutation, isValid } = userSolution
    const isUserSolutions : Boolean = dataType === "userSolutions"

    const handleSelect = () => {
        isUserSolutions && 
            handleSolutionContext({
                currentID : id, 
                currentPermutations : permutation, 
                isValid: isValid
            })
    }

    const solutionCard = () => {
        const solutionNo = `Solution N° ${id}`
        return (
            <>
                <motion.div
                    data-testid="userSolutionCard"
                    className={`userSolutionCard ${isValid && isUserSolutions ? 'valid' : ''} ${iscurrentSolutionID ? 'selected' : ''}`}
                    key={`userSolution-${id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 * (Number(index) + 1), ease: "easeIn" }}
                >
                    <div className="solutionData" onClick={() => handleSelect()}>
                        {isUserSolutions && <p>{solutionNo}</p>}
                        <div>
                            <ul>
                                {permutation.map((digit, i) => <li key={`solution-card-${i}`}>{digit}</li>)}
                            </ul>
                        </div>
                    </div>
                    <SolutionCardButtonLine
                        handleSolutionContext={handleSolutionContext}
                        iscurrentSolutionID={iscurrentSolutionID}
                        id={id as Number}
                        isUserSolutions={isUserSolutions}
                    />
                </motion.div>
            </>
        )
    }

    const memoizedSolutionCard = useMemo(() => 
        solutionCard()
    , [iscurrentSolutionID, show])

    return (
        <>
            {show ? memoizedSolutionCard : solutionCard()}
        </>
    )
}

export default SolutionCard