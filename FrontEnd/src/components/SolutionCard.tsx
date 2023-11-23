import { useMemo } from "react"
import { motion } from "framer-motion"
import SolutionCardButtonLine from "./SolutionCardButtonLine"
import { useParams } from "react-router-dom"

type UserSolution = {
    id : Number | String
    permutation : Number[]
    isValid : Boolean
}

interface SolutionCardProps {
    handleSolutionContext : Function
    userSolution : UserSolution
    iscurrentSolutionID : Boolean
    show : Boolean
    index : Number
}

const SolutionCard : React.FC<SolutionCardProps> = (
    {
        handleSolutionContext,
        userSolution, 
        iscurrentSolutionID, 
        show,
        index
    }) => {

    const { dataType } = useParams()
    const { id, permutation, isValid } = userSolution
    const isUserSolutions = dataType === "userSolutions"

    const handleSelect = () : void => {
        isUserSolutions && 
            handleSolutionContext({
                currentID : id, 
                currentPermutations : permutation, 
                isValid: isValid
            })
    }

    const solutionCard = () => {
        return (
            <>
                <motion.div
                    className={`userSolutionCard ${isValid && isUserSolutions ? 'valid' : ''} ${iscurrentSolutionID ? 'selected' : ''}`}
                    key={`userSolution-${id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 * (index as number + 1), ease: "easeIn" }}
                >
                    <div className="solutionData" onClick={() => handleSelect()}>
                        {isUserSolutions && <p>Solution N° {id as React.ReactNode}</p>}
                        <div>
                            <ul>
                                {permutation.map((digit, i) => <li key={`solution-card-${i}`}>{digit as React.ReactNode}</li>)}
                            </ul>
                        </div>
                    </div>
                    <SolutionCardButtonLine
                        handleSolutionContext={handleSolutionContext}
                        iscurrentSolutionID={iscurrentSolutionID}
                        id={id as number}
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