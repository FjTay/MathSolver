import { createContext, useState } from "react";
import { getTimeStamp } from "../utils/utils";
import React from "react";

type NumberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9]
type PermutationArray<T> = {
    [P in keyof T]: T[P] | null
}
type ValidPermutation = PermutationArray<NumberArray>
type Message = String
type UpdatedAt = Number
type Id = String | Number | null
type IsValid = Boolean

export interface SolutionContext {
    message : Message
    updatedAt : UpdatedAt
    currentPermutations : ValidPermutation
    currentID : Id
    isValid : IsValid
}
export interface APISolution {
    id : Id
    permutation: ValidPermutation
    isValid : IsValid
}
export interface SolutionContextValue {
    currentSolution: SolutionContext
    handleSolutionContext: (data: Partial<SolutionContext>) => void
}
interface SolutionContextProviderProps {
    children: React.ReactNode
}

export const initialContextValue: SolutionContext = {
    message: "hello",
    updatedAt: getTimeStamp(),
    currentPermutations: Array.from({ length: 9 }, () => null) as ValidPermutation,
    currentID: null,
    isValid: false,
}

export const SolutionContext = createContext<SolutionContextValue | undefined>(undefined)

export function SolutionContextProvider({ children } : SolutionContextProviderProps) {

    const [currentSolution, setCurrentSolution] = useState<SolutionContext>(initialContextValue)

    const handleSolutionContext = (data: Partial<SolutionContext>) : void => {
        let newData : SolutionContext = {...currentSolution, ...data}
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