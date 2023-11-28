import { useMatches } from "react-router-dom";
import SolutionCard from "./SolutionCard"
import { useContext, useMemo } from "react";
import SideBarClose from "./SideBarClose";
import { AnimatePresence } from "framer-motion";
import { SolutionContext } from "../contexts/SolutionContext";
import { SolutionContextValue } from "../contexts/SolutionContext";
import { APISolution } from "../contexts/SolutionContext";

interface UserSolutionsProps {
    sidebar : string
}

const UserSolutions : React.FC<UserSolutionsProps> = ({ sidebar }) => {

    const { currentSolution, handleSolutionContext } = useContext(SolutionContext) as SolutionContextValue
    const matches = useMatches()
    const solutions : APISolution[] = useMemo(() => matches[1]?.data ?? [],  [matches[1]?.data?.length])

    return (
        <>
            <SideBarClose />
            {sidebar !== "allSolutions" && <button onClick={() => handleSolutionContext({currentID : null})}>Unselect solutions</button>}
            <AnimatePresence>
                {solutions?.map((solution : APISolution, index :  Number) =>
                    <SolutionCard
                        handleSolutionContext={handleSolutionContext}
                        index={index}
                        key={`userSolutionCard-${solution.id}`}
                        show={solutions.some((item : APISolution) => solution.id === item.id)}
                        userSolution={solution}
                        iscurrentSolutionID={solution.id === currentSolution.currentID}
                    />
                )}
            </AnimatePresence>
        </>
    )
}

export default UserSolutions