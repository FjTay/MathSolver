import axios from "axios";
import { APISolution, ValidPermutation, Id } from "../contexts/SolutionContext";

export async function getSolutions() {
  try {
    const response = await axios.get('http://localhost:8080/api/solutions/results')
    const solutions = response.data.map((solution : APISolution, i : Number) => ({...solution, id: `working-${i}`}))
    return solutions
  } catch (error) {
    return error
  }
}

export async function getUserSolutions() {
  try {
    const response = await axios.get('http://localhost:8080/api/solutions')
    return response.data
  } catch (error) {
    return error
  }
}

export async function postNewSolution (permutation : ValidPermutation) {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/solutions`, 
      {permutation : permutation}, 
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
    return response.data
  } catch (error) {
    return error
  }
}

export async function putSolution (permutation : ValidPermutation, id : Id) {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/solutions/${id}`, 
      {permutation : permutation}, 
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
    return response.data
  } catch (error) {
    return error
  }
}

export async function deleteUserSolution(solutionID : Id) {
  try {
    const response = await axios.delete(`http://localhost:8080/api/solutions/${solutionID}`)
    return solutionID
  } catch (error) {
    return error
  }
}