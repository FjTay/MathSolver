import { getTimeStamp } from "../utils/utils"
import { getUserSolutions, getSolutions } from "./axios"
import { ParamsObject } from "../types/types"
import { APISolution, SolutionContext } from "../contexts/SolutionContext"

export async function handleLoaders (params : ParamsObject, callBack : Function) {
    if (params.dataType === "userSolutions") {
        return userSolutionLoader()
    } else if (params.dataType === "allSolutions"){
        return solutionLoader(callBack)
    }
    return null
}

async function userSolutionLoader() {
    const solutions : APISolution[] = await getUserSolutions()
    return solutions
}

async function solutionLoader(callBack : Function) {
    const startTime = getTimeStamp() as number
    const solutions = await getSolutions()
    const responseTime = getTimeStamp() as number
    const updatedContext : Partial<SolutionContext> = {
        message: `This request was brought to you in ${responseTime - startTime} milliseconds`
    }
    callBack(updatedContext)
    return solutions
}