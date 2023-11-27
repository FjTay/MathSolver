import { deleteUserSolution } from "./axios"
import { newSolutionAction, updateSolutionAction } from "../routes/newSolution"
import { getTimeStamp } from "../utils/utils"

export async function handleSolutionAction (request, params, handleSolutionContext) {
    const formData = await request.formData()
    const permutations = Object.fromEntries(formData)
    // Todo :  check what caused why it was necessary to handle this particular case
    // happened after passing the SolutionContext file to Typescript
    if(params.id === "null" || params.id === "undefined") {
        return handleNewSolution(permutations, newSolutionAction, handleSolutionContext)
    } else {
        return handleUpdateSolution(params, permutations, updateSolutionAction, handleSolutionContext)
    }
}

async function handleNewSolution(permutations, action, callBack) {
    const newSolution = await action(Object.values(permutations))
    if(newSolution.id) {
        callBack({
            message: newSolution.isValid ? 
                "GREAT !"
                : "Your solution has been added to your list" , 
            currentID: newSolution.id, 
            currentPermutations : newSolution.permutation,
            isValid : newSolution.isValid,
            updatedAt: getTimeStamp()
        })
    } else {
        callBack({
            message: "You have already attempted this solution",
            updatedAt: getTimeStamp(),
            currentPermutations: permutations
        })
    }
    return newSolution
}

async function handleUpdateSolution (params, permutations, action, callBack) {
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

export async function deleteAction({params : {id}}) {
    await deleteUserSolution(id)
    return null
}