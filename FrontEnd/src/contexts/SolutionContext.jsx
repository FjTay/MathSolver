import { createContext, useState } from "react";
import { solution } from "../utils/gameData";
import { getTimeStamp } from "../utils/utils";
import React from "react";

export const SolutionContext = createContext()

export function SolutionContextProvider({ children }) {

    const [currentSolution, setCurrentSolution] = useState({
        ...solution,
        message: "Hello",
        updatedAt: getTimeStamp()
    })

    const handleSolutionContext = (data) => {
        let newData = {...currentSolution}
        Object.entries(data).forEach(([key, value]) => 
            newData = {...newData, [key] : value}
        )
        setCurrentSolution(newData)
    }

    return (
        <SolutionContext.Provider value={{ currentSolution, handleSolutionContext }}>
            {children}
        </SolutionContext.Provider>
    )
}