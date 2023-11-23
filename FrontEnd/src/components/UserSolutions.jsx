import { useMatches } from "react-router-dom";
import SolutionCard from "./SolutionCard"
import { useContext, useMemo } from "react";
import SideBarClose from "./SideBarClose";
import { AnimatePresence } from "framer-motion";
import { SolutionContext } from "../contexts/SolutionContext";

const UserSolutions = ({ sidebar }) => {

    const { currentSolution, handleSolutionContext } = useContext(SolutionContext)
    const matches = useMatches()
    const solutions = useMemo(() => matches[1]?.data ?? [],  [matches[1]?.data?.length])

    return (
        <>
            <SideBarClose />
                    <>
                        {sidebar !== "allSolutions" && <button onClick={() => handleSolutionContext({currentID : null})}>Unselect solutions</button>}
                        <AnimatePresence>
                        {solutions?.map((solution, index) =>
                            <SolutionCard
                                handleSolutionContext={handleSolutionContext}
                                index={index}
                                key={`userSolutionCard-${solution.id}`}
                                show={solutions.find(item => solution.id === item.id)}
                                userSolution={solution}
                                iscurrentSolutionID={solution.id === currentSolution.currentID}
                            />
                        )}
                        </AnimatePresence>
                    </>
        </>
    )
}

export default UserSolutions