import axios from "axios";

export async function getSolutions() {
  try {
    const response = await axios.get('http://localhost:8080/api/solutions/results')
    const solutions = response.data.map((solution, i) => ({...solution, id: `working-${i}`}))
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

export async function postNewSolution (permutation) {
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

export async function putSolution (permutation, id) {
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

export async function deleteUserSolution(solutionID) {
  try {
    const response = await axios.delete(`http://localhost:8080/api/solutions/${solutionID}`)
    return solutionID
  } catch (error) {
    return error
  }
}