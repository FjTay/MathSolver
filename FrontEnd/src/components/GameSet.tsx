import { Form } from "react-router-dom";
import { forwardRef, useContext, useEffect, useImperativeHandle, useRef } from "react";
import { SolutionContext } from "../contexts/SolutionContext";
import { gridItems, gameMapping, GameMappingItem } from "../utils/gameData";
import GameBlock from "./GameBlock";
import { initialContextValue as solutionMapping, SolutionContextValue, SolutionContext as SolutionContextType } from "../types/types"

interface GameSetProps {}

const GameSet = forwardRef<HTMLFormElement, GameSetProps>(({}, ref) => {

    const gameSet = useRef<HTMLFormElement>(null)
    const { currentSolution, handleSolutionContext } = useContext(SolutionContext) as SolutionContextValue

    useImperativeHandle(ref, () => gameSet.current!)

    useEffect(() => {
        gameSet.current?.reset()
    }, [currentSolution.currentID])

    const reset = () => {
        const currentPermutationsKey : keyof SolutionContextType = "currentPermutations"
        const isValidKey : keyof SolutionContextType = "isValid"
        handleSolutionContext({
            [currentPermutationsKey] : solutionMapping.currentPermutations,
            [isValidKey]: false
        })
        gameSet.current?.reset()
    }

    const manageGameBlock = (gameBlock : GameMappingItem, val : String | Number, i : Number) => 
        gameBlock.value ? 
            <div 
                key={`gridItem${i}`} 
                className="gridItem gridGame"
            >{gameBlock.value}</div>
            : <GameBlock
                isValid={currentSolution.isValid}
                gameSet={gameSet}
                value={currentSolution.currentPermutations[gameBlock.index as number] as Number} 
                key={`gameBlock${val}`}
                index={gameBlock.index as Number}
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
                    const currentGameMapping = gameMapping[i + 1]
                    return currentGameMapping ? 
                        manageGameBlock(currentGameMapping, val, i)
                        : <div key={`blank-item${i}`} className="gridItem"></div>
                })}
            </div>
            <div className="formButtons">
                <button type="submit">Submit Solution</button>
                <button onClick={reset}>Reset Game</button>
            </div>
        </Form>
        </>
    )
})

export default GameSet