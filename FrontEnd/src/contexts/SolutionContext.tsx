import { createContext, useState } from "react";
import React from "react";
import { SolutionContextValue, SolutionContext as SolutionContextType, initialContextValue } from "../types/types";

interface SolutionContextProviderProps {
    children: React.ReactNode
}

export const SolutionContext = createContext<SolutionContextValue | undefined>(undefined)

export function SolutionContextProvider({ children } : SolutionContextProviderProps) {

    const [currentSolution, setCurrentSolution] = useState<SolutionContextType>(initialContextValue)

    const handleSolutionContext = (data: Partial<SolutionContextType>) : void => {
        let newData : SolutionContextType = {...currentSolution, ...data}
        setCurrentSolution(newData)
    }

    const contextValue : SolutionContextValue = {
        currentSolution,
        handleSolutionContext
    }

    return (
        <SolutionContext.Provider value={contextValue}>
            {children}
        </SolutionContext.Provider>
    )
}