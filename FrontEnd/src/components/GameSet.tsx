import { Form } from 'react-router-dom'
import { forwardRef, useContext, useEffect, useImperativeHandle, useRef } from "react";
import { SolutionContext } from "../contexts/SolutionContext";
import { gridItems, gameMapping, GameMappingItem } from "../utils/gameData";
import GameBlock from "./GameBlock";
import { initialContextValue as solutionMapping } from "../contexts/SolutionContext";
import { SolutionContextValue } from "../contexts/SolutionContext";

interface GameSetProps {}

const GameSet = forwardRef<HTMLFormElement, GameSetProps>(({}, ref) => {

    const gameSet = useRef<HTMLFormElement | null>(null)
    const { currentSolution, handleSolutionContext } = useContext(SolutionContext) as SolutionContextValue

    useImperativeHandle(ref, () => gameSet.current!)

    useEffect(() => {
        gameSet.current?.reset()
    }, [currentSolution.currentID])

    const reset = () => {
        const currentPermutationsKey : keyof SolutionContext = "currentPermutations"
        const isValidKey : keyof SolutionContext = "isValid"
        handleSolutionContext({
            [currentPermutationsKey] : solutionMapping.currentPermutations,
            [isValidKey]: false
        })
        gameSet.current?.reset()
    }

    const manageGameBlock = (gameBlock: GameMappingItem, val: string | number, i: number) => {
        if (gameBlock.value) {
            return (
                <div 
                    key={`gridItem${i}`}
                    className="gridItem gridGame"
                >{gameBlock.value}</div>
            )
        } else {
            const permutationValue = gameBlock.index && currentSolution.currentPermutations[gameBlock.index]
            return (
                <GameBlock
                    isValid={currentSolution.isValid}
                    gameSet={gameSet}
                    value={permutationValue ?? 0}
                    key={`gameBlock${val}`}
                    index={gameBlock.index ?? 0}
                />
            )
        }
    }

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