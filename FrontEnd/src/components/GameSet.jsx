import { Form } from "react-router-dom";
import { forwardRef, useContext, useEffect, useImperativeHandle, useRef } from "react";
import { SolutionContext } from "../contexts/SolutionContext";
import { gridItems, gameMapping } from "../utils/gameData";
import GameBlock from "./GameBlock";
import { initialContextValue as solutionMapping } from "../contexts/SolutionContext";

const GameSet = forwardRef(({ _ }, ref) => {

    const gameSet = useRef(null)
    const { currentSolution, handleSolutionContext } = useContext(SolutionContext)

    useImperativeHandle(ref, () => gameSet.current)

    useEffect(() => {
        gameSet.current.reset()
    }, [currentSolution.currentID])

    const reset = () => {
        handleSolutionContext({
            currentPermutations: solutionMapping.currentPermutations,
            isValid: false
        })
        gameSet.current.reset()
    }

    const manageGameBlock = (gameBlock, val, i) => 
        gameBlock.value ? 
            <div key={`gridItem${i}`} className="gridItem gridGame">{gameBlock.value}</div>
            : <GameBlock 
                isValid={currentSolution.isValid}
                gameSet={gameSet} 
                value={currentSolution.currentPermutations[gameBlock.index]} 
                key={`gameBlock${val}`} 
                index={gameBlock.index}
            />

    return (
        <>
        <Form
            action={`newSolution/${currentSolution.currentID}`}
            method="post"
            ref={gameSet}
        >
            <div className="gridContainer">
                {gridItems.map((val, i) => {
                    return gameMapping[i + 1] ? 
                        manageGameBlock(gameMapping[i + 1], val, i)
                        : <div key={`blank-item${i}`} className="gridItem"></div>
                })}
            </div>
            <div className="formButtons">
                <button type="submit">Submit Solution</button>
                <button onClick={reset} data-testid="reset-button">Reset Game</button>
            </div>
        </Form>
        </>
    )
})

export default GameSet