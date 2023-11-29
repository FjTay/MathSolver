import { getTimeStamp } from "../utils/utils";

type NumberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9]
type PermutationArray<T> = {
    [P in keyof T]: T[P] | null
}
export type ValidPermutation = PermutationArray<NumberArray>
type Message = String
type UpdatedAt = Number
export type Id = String | Number | null
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
export interface ParamsObject {
    id? : Number | String
    dataType? : String
}
export const initialContextValue: SolutionContext = {
    message: "hello",
    updatedAt: getTimeStamp(),
    currentPermutations: Array.from({ length: 9 }, () => null) as ValidPermutation,
    currentID: null,
    isValid: false,
}