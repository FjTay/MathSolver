package com.example.demo.Solution;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.List;

@Entity
@Table
public class Solution {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<Integer> permutation;
    private Boolean isValid;

    public Solution() {
    }

    public Solution(List<Integer> permutation, Boolean isValid) {
        this.permutation = permutation;
        this.isValid = isValid;
    }

    public Long getId() {
        return this.id;
    }

    public Boolean getIsValid() {
        return this.isValid;
    }
    public void setIsValid(boolean isValid) {
        this.isValid = isValid;
    }

    public List<Integer> getPermutation() {
        return this.permutation;
    }

    public void setPermutation(List<Integer> permutation) {
        this.permutation = permutation;
    }

    @Override
    public String toString() {
        return "Solution{" +
                    "id=" + id +
                    ", isValid=" + isValid +
                    ", permutation=" + permutation +
                '}';
    }
}