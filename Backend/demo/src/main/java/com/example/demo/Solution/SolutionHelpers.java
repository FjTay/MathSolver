package com.example.demo.Solution;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class SolutionHelpers {

    public static List<Solution> findSolutions(int[] inputs, int[] refArr) {
        List<Integer> inputsList = Arrays.stream(inputs).boxed().collect(Collectors.toList());
        List<Integer> numbers = new ArrayList<>();
        for (int num : refArr) {
            boolean found = false;
            for (int input : inputsList) {
                if (num == input) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                numbers.add(num);
            }
        }

        List<List<Integer>> permutations;
        if (inputs.length != refArr.length) {
            permutations = permute(numbers, inputsList, numbers);
        } else {
            permutations = new ArrayList<>();
            permutations.add(inputsList);
        }

        List<Solution> solutions = new ArrayList<>();

        for (List<Integer> permutation : permutations) {

            boolean equals = checkValidity((permutation));

            if (equals) {
                Solution solution = new Solution(permutation, equals);
                solutions.add(solution);
            }
        }
        return solutions;
    }

    public static List<List<Integer>> permute(List<Integer> arr, List<Integer> inputs, List<Integer> numbers) {
        List<List<Integer>> results = new ArrayList<>();
        if (arr.size() == 0) {
            results.add(inputs);
            return results;
        }

        for (int i = 0; i < arr.size(); i++) {
            List<Integer> remain = new ArrayList<>(arr.subList(0, i));
            remain.addAll(arr.subList(i + 1, arr.size()));
            List<List<Integer>> remainingPermutations = permute(remain, inputs, numbers);
            for (List<Integer> permutation : remainingPermutations) {
                List<Integer> result = new ArrayList<>(numbers.size() + 1);
                result.addAll(inputs);
                result.add(arr.get(i));
                result.addAll(permutation);
                results.add(result);
            }
        }
        return results;
    }

    public static void validateInputSolution(Solution inputSolution) {
    List<Integer> inputPermutation = inputSolution.getPermutation();

        if (inputPermutation.size() != 9) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Your Solution must have 9 digits");
        }

        Set<Integer> uniqueElements = new HashSet<>(inputPermutation);
        if (uniqueElements.size() != inputPermutation.size()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Your Solution must have unique digits");
        }

        if (inputPermutation.stream().anyMatch(i -> i < 1 || i > 9)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Your Solution must contain digits between 1 and 9");
        }
    }

    public static Boolean checkValidity(List<Integer> permutations) {
        float a = permutations.get(0);
        float b = permutations.get(1);
        float c = permutations.get(2);
        float d = permutations.get(3);
        float e = permutations.get(4);
        float f = permutations.get(5);
        float g = permutations.get(6);
        float h = permutations.get(7);
        float i = permutations.get(8);

        boolean equals = a + 13f * (b / c) + d + 12f * e - f + (g * h) / i == 87f;

        return equals;
    }
}
