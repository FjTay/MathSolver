import { postNewSolution, putSolution } from "../scripts/axios";
import { ValidPermutation, Id } from "../types/types";

export async function newSolutionAction(permutation : ValidPermutation) {
  const newSolution = await postNewSolution(permutation)
  return newSolution
}

export async function updateSolutionAction(permutation : ValidPermutation, id : Id) {
  const updatedSolution = await putSolution(permutation, id)
  return updatedSolution
}