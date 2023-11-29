import { deleteUserSolution } from "./axios"
import { newSolutionAction, updateSolutionAction } from "../routes/newSolution"
import { getTimeStamp } from "../utils/utils"
import { ParamsObject } from "../types/types"
import { APISolution, SolutionContext, ValidPermutation } from "../contexts/SolutionContext"

export async function handleSolutionAction (request : Request, params : ParamsObject, handleSolutionContext : Function) {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    const permutations = Object.values(data) as unknown
    // Todo :  check what caused why it was necessary to handle this particular case
    // happened after passing the SolutionContext file to Typescript
    if(params.id === "null" || params.id === "undefined") {
        return handleNewSolution(permutations as ValidPermutation, newSolutionAction, handleSolutionContext)
    } else {
        return handleUpdateSolution(params, permutations as ValidPermutation, updateSolutionAction, handleSolutionContext)
    }
}

async function handleNewSolution(permutations : ValidPermutation, action : Function, callBack : Function) {
    const apiSolution : APISolution = await action(permutations)
    if(apiSolution.id) {
        const newSolution : SolutionContext = {
            message: apiSolution.isValid ? 
                "GREAT !"
                : "Your solution has been added to your list" , 
            currentID: apiSolution.id, 
            currentPermutations : apiSolution.permutation,
            isValid : apiSolution.isValid,
            updatedAt: getTimeStamp()
        }
        callBack(newSolution)
    } else {
        const contextUpdate : Partial<SolutionContext> = {
            message: "You have already attempted this solution",
            updatedAt: getTimeStamp(),
            currentPermutations: permutations
        }
        callBack(contextUpdate)
    }
    return apiSolution
}

async function handleUpdateSolution (params : ParamsObject, permutations : ValidPermutation, action : Function, callBack : Function) {
    const updatedSolution = await action(Object.values(permutations), params.id)
    if(updatedSolution.id) {
        callBack({
            message: "Your solution has been updated", 
            currentID: updatedSolution.id, 
            currentPermutations : updatedSolution.permutation,
            updatedAt: getTimeStamp(),
            isValid : updatedSolution.isValid
        })
    } else {
        callBack({
            message: "You have already attempted this solution",
            updatedAt: getTimeStamp(),
            currentPermutations: permutations
        })
    }
    return updatedSolution
}

export async function deleteAction({params : {id}} : {params : {id : Number}}) {
    await deleteUserSolution(id)
    return null
}