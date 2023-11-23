import { postNewSolution, putSolution } from "../scripts/solutionHelpers";

export async function newSolutionAction(permutation) {
  const newSolution = await postNewSolution(permutation)
  return newSolution
}

export async function updateSolutionAction(permutation, id) {
  const updatedSolution = await putSolution(permutation, id)
  return updatedSolution
}