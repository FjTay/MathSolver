package com.example.demo.Solution;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="api/solutions")
public class SolutionController {

    private final SolutionService solutionService;

    public SolutionController(SolutionService solutionService) {
        this.solutionService = solutionService;
    };

    @CrossOrigin
    @GetMapping
    public List<Solution> getSolutions() {
        return solutionService.getSolutions();
    }

    @CrossOrigin
    @GetMapping("/results")
    public List<Solution> getWorkingSolutions() {
        return solutionService.generateWorkingSolutions();
    }

    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<Solution> getSolutionById(@PathVariable Long id) {
        Solution solution = solutionService.getSolutionById(id);
        if (solution != null) {
            return ResponseEntity.ok(solution);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @CrossOrigin
    @PostMapping
    public Solution findSolution(@RequestBody Solution inputSolution) {
        return solutionService.findMatchingSolution(inputSolution);
    }

    @CrossOrigin
    @DeleteMapping("/{id}")
    public void deleteSolution(@PathVariable("id") Long id) {
        solutionService.deleteSolution((id));
    }

    @CrossOrigin
    @PutMapping("/{id}")
    public ResponseEntity<Solution> updateSolutionById(@PathVariable Long id, @RequestBody Solution newPermutation) {
        Solution updatedSolution = solutionService.updateSolutionById(id, newPermutation);
        if (updatedSolution != null) {
            return ResponseEntity.ok(updatedSolution);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
