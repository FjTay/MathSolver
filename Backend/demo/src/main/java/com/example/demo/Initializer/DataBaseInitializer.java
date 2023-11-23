package com.example.demo.Initializer;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.example.demo.Solution.SolutionRepository;

@Component
public class DataBaseInitializer implements ApplicationRunner {
    private final SolutionRepository solutionRepository;

    public DataBaseInitializer(SolutionRepository solutionRepository) {
        this.solutionRepository = solutionRepository;
    }

    @Override
    public void run(ApplicationArguments args) {
        System.out.println("+ + + + + Application started on port 8080 + + + + +");
    }
}