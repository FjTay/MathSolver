import { getTimeStamp } from "../utils/utils"
import { getUserSolutions, getSolutions } from "./axios"

export async function handleLoaders (params, callBack) {
    if (params.dataType === "userSolutions") {
        return userSolutionLoader()
    } else if (params.dataType === "allSolutions"){
        return solutionLoader(callBack)
    }
    return null
}

async function userSolutionLoader() {
    const solutions = await getUserSolutions()
    return solutions
}

async function solutionLoader(callBack) {
    const startTime = getTimeStamp()
    const solutions = await getSolutions()
    const responseTime = getTimeStamp()
    callBack({message: `This request was brought to you in ${responseTime - startTime} milliseconds`})
    return solutions
}