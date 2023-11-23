package com.example.demo.Solution;

import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class SolutionService {
    
    private final SolutionRepository solutionRepository;

    public SolutionService(SolutionRepository solutionRepository) {
        this.solutionRepository = solutionRepository;
    }

    public List<Solution> getSolutions() {
        return solutionRepository.findAll();
    }

    public List<Solution> generateWorkingSolutions() {
        int[] refArr = new int[9];
        int[] inputs = {};

        for (int i = 0; i < 9; i++) {
            refArr[i] = i + 1;
        }

        List<Solution> workingSolutions = SolutionHelpers.findSolutions(inputs, refArr);
        return workingSolutions;
    }

    public Solution findMatchingSolution(Solution inputSolution) {
        SolutionHelpers.validateInputSolution(inputSolution);
        List<Solution> allSolutions = getSolutions();
        Optional<Solution> matchingSolution = allSolutions
            .stream()
            .filter(solution -> {
                List<Integer> inputPermutation = inputSolution.getPermutation();
                List<Integer> dbPermutation = solution.getPermutation();

                return inputPermutation.size() == dbPermutation.size() &&
                    IntStream.range(0, inputPermutation.size())
                    .allMatch(i -> inputPermutation.get(i).equals(dbPermutation.get(i)));
            })
            .findFirst();
        if(matchingSolution.isEmpty()) {
            Solution newSolution = new Solution();
            List<Integer> permutations = inputSolution.getPermutation();
            
            newSolution.setIsValid(SolutionHelpers.checkValidity(permutations));
            
            newSolution.setPermutation(permutations);
            
            solutionRepository.save(newSolution);
            return newSolution;
        }
        
        throw new ResponseStatusException(HttpStatus.CONFLICT, "You already have posted this solution");
    }

    public Solution getSolutionById(Long id) {
        Optional<Solution> optionalSolution = solutionRepository.findById(id);
        return optionalSolution.orElse(null);
    }

    public void deleteSolution(Long id) {
		boolean exists = solutionRepository.existsById(id);
		if(!exists) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "The solution with " + id + " does not exist");
		}
		solutionRepository.deleteById(id);
	}

    public Solution updateSolutionById(Long id, Solution newPermutation) {
        Optional <Solution> existingSolution = solutionRepository.findById(id);

        if(existingSolution.isPresent()) {
            Solution solutionToUpdate = existingSolution.get();
            solutionToUpdate.setPermutation(newPermutation.getPermutation());

            List<Integer> permutations = solutionToUpdate.getPermutation();
            
            solutionToUpdate.setIsValid(SolutionHelpers.checkValidity(permutations));

            solutionRepository.save(solutionToUpdate);
            return solutionToUpdate;
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "The solution with " + id + " does not exist");
        }
    }
}
